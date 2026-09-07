/**
 * Прогін Стенд-радара в браузері.
 *
 *   npm i playwright && node test/ui.test.mjs
 *
 * Chromium береться з CHROME_PATH або зі стандартної теки Playwright.
 * Сторінка обгортається у <!doctype>…<body> так само, як це робить хостинг
 * артефактів, тож тестується рівно те, що бачить користувач.
 */
import { chromium } from "playwright";
import fs from "fs";
import os from "os";
import path from "path";
import { fileURLToPath } from "url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const CHROME = process.env.CHROME_PATH || "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), "stand-radar-"));
const PAGE = path.join(TMP, "preview.html");
const URL = "file://" + PAGE;

fs.writeFileSync(PAGE,
  '<!doctype html><head><meta charset="utf-8">' +
  '<meta name="viewport" content="width=device-width,initial-scale=1">' +
  "<style>body{margin:0;font:14px system-ui;background:#fafaf9}img{max-width:100%}[hidden]{display:none!important}</style>" +
  "</head><body>" + fs.readFileSync(path.join(HERE, "..", "index.html"), "utf8") + "</body>");

let pass = 0, fail = 0;
const failed = [];
function ok(name, cond, detail = "") {
  if (cond) { pass++; console.log("  ✓", name); }
  else { fail++; failed.push(`${name} — ${detail}`); console.log("  ✗", name, detail); }
}
function section(title) { console.log("\n" + title); }

/** Мінімальний парсер CSV — щоб перевірити, що експорт читається назад. */
function parseCSV(text) {
  const t = text.replace(/^﻿/, "");
  const out = [];
  let row = [], cur = "", quoted = false;
  for (let i = 0; i < t.length; i++) {
    const c = t[i];
    if (quoted) {
      if (c === '"') { if (t[i + 1] === '"') { cur += '"'; i++; } else quoted = false; }
      else cur += c;
    } else if (c === '"') quoted = true;
    else if (c === ",") { row.push(cur); cur = ""; }
    else if (c === "\n") { row.push(cur); out.push(row); row = []; cur = ""; }
    else if (c !== "\r") cur += c;
  }
  if (cur || row.length) { row.push(cur); out.push(row); }
  return out;
}

const browser = await chromium.launch({ executablePath: CHROME });
const ctx = await browser.newContext({ viewport: { width: 400, height: 900 } });
await ctx.grantPermissions(["clipboard-read", "clipboard-write"]);
const p = await ctx.newPage();
const errors = [];
p.on("pageerror", (e) => errors.push(String(e)));

const names = () => p.$$eval(".row .name", (n) => n.map((x) => x.textContent.trim()));
const counter = async () => (await p.textContent("#countLbl")).trim();
const chipByText = (t) => p.$$eval("#quickChips .chip", (cs, t) => {
  const c = cs.find((x) => x.textContent.includes(t));
  if (c) c.click();
  return !!c;
}, t);

await p.goto(URL);
await p.waitForTimeout(1500);

section("[1] Завантаження вшитої бази");
ok("146 записів", (await counter()) === "146 / 146", await counter());
ok("перша сторінка — 60 рядків", (await names()).length === 60);
const chips = await p.$$eval("#quickChips .chip", (c) => c.map((x) => x.textContent));
ok("чіп «Виявити потребу 50»", chips.some((t) => t.includes("Виявити потребу") && t.includes("50")));
ok("чіп «Зустріч підтверджено 21»", chips.some((t) => t.includes("Зустріч підтверджено") && t.includes("21")));
ok("лічильник зустрічей = 22", (await p.textContent("#agendaBadge")) === "22");
ok("зустрічі — вгорі списку", (await p.$$(".row .meetchip")).length >= 8);

section("[2] Пошук");
await p.fill("#q", "Fotokite"); await p.waitForTimeout(300);
ok("за назвою компанії", (await names()).every((x) => /Fotokite/i.test(x)));
await p.fill("#q", "Mark Sullivan"); await p.waitForTimeout(300);
ok("за ім'ям людини", (await names())[0] === "OSI Maritime Systems", JSON.stringify(await names()));
await p.fill("#q", "GNSS"); await p.waitForTimeout(300);
ok("за текстом довідки", (await names()).length > 0);
await p.fill("#q", "7-D32"); await p.waitForTimeout(300);
ok("за кодом стенда 7-D32 → 18", (await names()).length === 18, String((await names()).length));
await p.fill("#q", "Fujiwara"); await p.waitForTimeout(300);
ok("лід без назви компанії шукається за людиною",
  (await names()).length === 1 && (await names())[0].includes("Fujiwara"));
await p.fill("#q", "Kate Walsh"); await p.waitForTimeout(300);
ok("контакт із відновленою компанією", (await names())[0] === "OSI Maritime Systems");

section("[3] Режим номера стенда");
await p.fill("#q", ""); await p.click("#numToggle"); await p.waitForTimeout(200);
ok("кнопка 123 активна", await p.$eval("#numToggle", (e) => e.classList.contains("on")));
ok("клавіатура цифрова", (await p.$eval("#q", (e) => e.getAttribute("inputmode"))) === "numeric");
await p.fill("#q", "58"); await p.waitForTimeout(300);
ok("«58» знаходить стенд 7-D58", (await names()).some((x) => x.includes("OSI")));
await p.fill("#q", "747"); await p.waitForTimeout(300);
ok("«747» знаходить стенд 7Z-47", (await names()).some((x) => x.includes("Arkeus")));
await p.fill("#q", "9999"); await p.waitForTimeout(300);
ok("неіснуючий номер → порожньо з підказкою",
  (await names()).length === 0 && (await p.$(".empty")) !== null);
await p.click("#numToggle"); await p.fill("#q", ""); await p.waitForTimeout(300);

section("[4] Фільтри");
await chipByText("Відмова"); await p.waitForTimeout(300);
ok("«Відмова» → 4", (await counter()).startsWith("4 /"), await counter());
await chipByText("Відмова"); await p.waitForTimeout(300);
ok("фільтр знімається", (await counter()) === "146 / 146");
await p.click("#filterBtn"); await p.waitForTimeout(400);
const groups = await p.$$eval(".sheet .eyebrow", (e) => e.map((x) => x.textContent));
ok("розділи Країна / Пріоритет / Сегмент / Джерело",
  ["Країна", "Пріоритет", "Сегмент", "Джерело"].every((s) => groups.includes(s)), JSON.stringify(groups));
await p.$$eval(".sheet .chip", (cs) => { const c = cs.find((x) => x.textContent.startsWith("Канада")); if (c) c.click(); });
await p.waitForTimeout(400);
ok("Канада → 29", (await counter()).startsWith("29 /"), await counter());
await chipByText("Канада"); await p.waitForTimeout(300);
ok("Канада знімається", (await counter()) === "146 / 146");

section("[5] Розклад зустрічей");
await p.click("#agendaBtn"); await p.waitForTimeout(400);
ok("22 зустрічі", (await p.$$(".slot")).length === 22, String((await p.$$(".slot")).length));
const times = await p.$$eval(".slot .time", (e) => e.map((x) => x.textContent.trim()));
ok("відсортовано за часом", times.slice(0, 3).join(",") === "14:30,15:00,15:00", times.slice(0, 4).join(","));
ok("без години — позначено «без часу»", times.slice(3).every((t) => t === "без часу"));
await p.click(".sheet-head .iconbtn"); await p.waitForTimeout(300);

section("[6] Картка ліда");
await p.fill("#q", "Advanced Navigation"); await p.waitForTimeout(300);
await p.click(".row"); await p.waitForTimeout(400);
ok("назва в шапці", (await p.textContent(".lead-name")).includes("Advanced Navigation"));
ok("блок «що з ним робити» наповнений", (await p.textContent(".hintbox")).includes("Нав-алгоритми"));
ok("пріоритет A показано",
  (await p.$$eval(".fact", (e) => e.map((x) => x.textContent))).some((t) => t.includes("Пріоритет A")));
ok("кнопка LinkedIn є",
  (await p.$$eval(".linkbtn small", (e) => e.map((x) => x.textContent))).includes("LinkedIn"));

section("[7] Журнал контактів");
await p.fill(".logadd textarea", "Запис №1: показали демо");
await p.click(".logadd .btn.primary"); await p.waitForTimeout(350);
await p.fill(".logadd textarea", "Запис №2: домовились на дзвінок");
await p.click(".logadd .btn.primary"); await p.waitForTimeout(350);
let entries = await p.$$eval(".logitem .txt", (e) => e.map((x) => x.textContent));
ok("два записи", entries.length === 2, JSON.stringify(entries));
ok("найновіший зверху", entries[0].includes("№2"));
await p.$$eval(".logitem .acts button", (bs) => bs[0].click()); await p.waitForTimeout(250);
await p.fill(".logitem textarea", "Запис №2 (виправлено)");
await p.$$eval(".logitem .btnrow .btn.primary", (bs) => bs[0].click()); await p.waitForTimeout(350);
entries = await p.$$eval(".logitem .txt", (e) => e.map((x) => x.textContent));
ok("запис редагується", entries[0] === "Запис №2 (виправлено)", entries[0]);
p.once("dialog", (d) => d.accept());
await p.$$eval(".logitem .acts button", (bs) => bs[1].click()); await p.waitForTimeout(400);
ok("запис видаляється", (await p.$$(".logitem")).length === 1);

section("[8] Підсумок і результат розмови");
await p.fill(".summary-in", "Чекає КП до 15.09");
await p.click(".sbtn.hot"); await p.waitForTimeout(400);
ok("статус «Гарячий» активний", await p.$eval(".sbtn.hot", (e) => e.classList.contains("on")));
await p.click(".sheet-head .iconbtn"); await p.waitForTimeout(400);
ok("картка закрилась", (await p.$$(".sheet")).length === 0);
ok("підсумок видно в списку", (await p.textContent(".row .summary")).includes("Чекає КП"));
ok("лічильник записів у рядку",
  (await p.$$eval(".row .tierbadge", (e) => e.map((x) => x.textContent))).some((t) => t.includes("зап.")));
await p.fill("#q", ""); await p.waitForTimeout(300);
ok("прогрес оновився", (await p.textContent("#progress .lbl")).includes("1 / 146"));

section("[9] Кнопка «назад» браузера");
await p.click(".row"); await p.waitForTimeout(350);
ok("картка відкрита", (await p.$$(".sheet")).length === 1);
await p.goBack(); await p.waitForTimeout(400);
ok("«назад» закриває картку, а не сторінку",
  (await p.$$(".sheet")).length === 0 && (await p.$$(".row")).length > 0);

section("[10] Збереження після перезавантаження");
await p.reload(); await p.waitForTimeout(1500);
ok("база лишилась", (await counter()) === "146 / 146");
await p.fill("#q", "Advanced Navigation"); await p.waitForTimeout(350);
ok("підсумок пережив перезавантаження", (await p.textContent(".row .summary")).includes("Чекає КП"));
await p.click(".row"); await p.waitForTimeout(400);
ok("журнал пережив перезавантаження", (await p.$$(".logitem")).length === 1);
ok("статус пережив перезавантаження", await p.$eval(".sbtn.hot", (e) => e.classList.contains("on")));
await p.click(".sheet-head .iconbtn"); await p.waitForTimeout(300);

section("[11] Експорт CSV");
for (const [query, status] of [["Arkeus", "talked"], ["Clavister", "no"]]) {
  await p.fill("#q", query); await p.waitForTimeout(320);
  await p.click(".row"); await p.waitForTimeout(350);
  await p.fill(".logadd textarea", `Журнал ${query}: "цитата", кома`);
  await p.click(".logadd .btn.primary"); await p.waitForTimeout(280);
  await p.fill(".summary-in", `Підсумок ${query}`);
  await p.click(`.sbtn.${status}`); await p.waitForTimeout(320);
  await p.click(".sheet-head .iconbtn"); await p.waitForTimeout(250);
}
await p.fill("#q", ""); await p.waitForTimeout(300);
ok("прогрес 3 / 146", (await p.textContent("#progress .lbl")).includes("3 / 146"));
await p.click("#menuBtn"); await p.waitForTimeout(400);
await p.$$eval(".sheet .btn", (bs) => bs.find((x) => x.textContent.includes("Скопіювати CSV")).click());
await p.waitForTimeout(600);
const csv = await p.evaluate(() => navigator.clipboard.readText());
const table = parseCSV(csv);
const head = table[0];
ok("BOM на початку — Excel відкриє кирилицю", csv.charCodeAt(0) === 0xFEFF);
ok("шапка з журналом", head.slice(0, 6).join(",") === "Результат,Головне по ліду,Журнал,Записів,Хто,Оновлено", head.slice(0, 6).join(","));
ok("усі колонки бази поруч", head.length >= 26, head.length + " колонок");
ok("шапка + 3 ліда", table.length === 4, table.length + " рядків");
ok("однакова кількість колонок у всіх рядках", new Set(table.map((r) => r.length)).size === 1);
const at = Object.fromEntries(head.map((h, i) => [h, i]));
const byCompany = Object.fromEntries(table.slice(1).map((r) => [r[at["Компанія"]], r]));
ok("Advanced Navigation → Гарячий", byCompany["Advanced Navigation"][at["Результат"]] === "Гарячий");
ok("Arkeus → Поговорили", byCompany["Arkeus"][at["Результат"]] === "Поговорили");
ok("Clavister → Не цікаво", byCompany["Clavister"][at["Результат"]] === "Не цікаво");
ok("підсумок у своїй колонці", byCompany["Arkeus"][at["Головне по ліду"]] === "Підсумок Arkeus");
ok("лапки в журналі не зламали CSV", byCompany["Arkeus"][at["Журнал"]].includes('"цитата"'));
ok("дані бази поруч із нотатками", byCompany["Arkeus"][at["Стенд"]] === "7-B01, 7Z-47");
ok("гачок з бази в експорті", byCompany["Arkeus"][at["Гачок"]].length > 10);
ok("кнопки «Зберегти файл» немає без capability",
  !(await p.$$eval(".sheet .btn", (e) => e.map((x) => x.textContent))).some((t) => t.includes("Зберегти файл")));

section("[12] Ручне зіставлення колонок");
const mapped = await p.$$eval(".maprow select", (s) => s.map((x) => x.options[x.selectedIndex].textContent));
ok("Компанія → Компанія", mapped[0] === "Компанія", mapped[0]);
ok("Гачок зіставлено", mapped.includes("Гачок"));
ok("Статус з бази зіставлено", mapped.includes("Статус"));
await p.close();

section("[13] Імпорт файлу поверх вшитої бази");
const extra = path.join(TMP, "extra.csv");
fs.writeFileSync(extra,
  "Компанія;Стенд;Країна;Контакт;Пріоритет;Пропозиція\n" +
  "Test Alpha Sp;3-A11;Польща;Jan Nowak;A;Пілот на 2 борти\n" +
  "Test Beta Oy;4-B22;Фінляндія;Aino Virtanen;B;Обробка LiDAR\n");
const p2 = await ctx.newPage();
const errors2 = [];
p2.on("pageerror", (e) => errors2.push(String(e)));
await p2.goto(URL); await p2.waitForTimeout(1500);
await p2.setInputFiles("#fileInput", extra); await p2.waitForTimeout(1200);
ok("додано 2 записи", (await p2.textContent("#countLbl")).trim() === "148 / 148", await p2.textContent("#countLbl"));
await p2.fill("#q", "Test Alpha"); await p2.waitForTimeout(350);
ok("імпортований лід знаходиться", (await p2.$$eval(".row .name", (n) => n.map((x) => x.textContent)))[0] === "Test Alpha Sp");
await p2.click(".row"); await p2.waitForTimeout(400);
ok("поля імпорту зіставились", (await p2.textContent(".hintbox")).includes("Пілот на 2 борти"));
await p2.click(".sheet-head .iconbtn"); await p2.waitForTimeout(300);
await p2.fill("#q", ""); await p2.click("#menuBtn"); await p2.waitForTimeout(400);
const sources = await p2.$$eval(".srcrow", (e) => e.map((x) => x.textContent));
ok("три джерела", sources.length === 3, JSON.stringify(sources));
ok("вшиті джерела не зламались",
  sources.some((s) => s.includes("ІТ-аутсорсинг")) && sources.some((s) => s.includes("FlyBy")));
await p2.$$eval(".srcrow .x", (bs) => bs[2].click()); await p2.waitForTimeout(800);
ok("джерело прибирається", (await p2.textContent("#countLbl")).trim() === "146 / 146");
await p2.close();

section("[14] Обидві теми");
for (const scheme of ["dark", "light"]) {
  const themed = await browser.newContext({ viewport: { width: 400, height: 900 }, colorScheme: scheme });
  const pt = await themed.newPage();
  const themeErrors = [];
  pt.on("pageerror", (e) => themeErrors.push(String(e)));
  await pt.goto(URL); await pt.waitForTimeout(1400);
  const bg = await pt.evaluate(() => getComputedStyle(document.body).backgroundColor);
  const fg = await pt.evaluate(() => getComputedStyle(document.querySelector(".row .name")).color);
  const badge = await pt.evaluate(() => getComputedStyle(document.querySelector(".pbadge")).backgroundColor);
  const wantBg = scheme === "dark" ? "rgb(12, 22, 20)" : "rgb(241, 244, 241)";
  const wantFg = scheme === "dark" ? "rgb(232, 239, 235)" : "rgb(18, 33, 29)";
  ok(`${scheme}: фон`, bg === wantBg, bg);
  ok(`${scheme}: текст`, fg === wantFg, fg);
  ok(`${scheme}: бейдж має свій фон`, badge !== "rgba(0, 0, 0, 0)", badge);
  ok(`${scheme}: без помилок`, themeErrors.length === 0, JSON.stringify(themeErrors));
  await themed.close();
}

section("[15] Помилки виконання");
ok("без винятків на основній сторінці", errors.length === 0, JSON.stringify(errors));
ok("без винятків на сторінці імпорту", errors2.length === 0, JSON.stringify(errors2));

await browser.close();
fs.rmSync(TMP, { recursive: true, force: true });

console.log(`\n═══ ${pass} пройдено, ${fail} провалено ═══`);
if (fail) {
  console.log("ПРОВАЛЕНІ:");
  failed.forEach((f) => console.log("  -", f));
  process.exit(1);
}
