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
ok("шапка з журналом, годиною і скринінгом",
  head.slice(0, 3).join(",") === "Результат,Головне по ліду,Зустріч (фікс)" &&
  ["Вердикт", "Тип клієнта", "Маршрути", "Гіпотези", "Що надсилаємо", "Пообіцяли",
   "Фолоу-ап надіслано", "Наступне вікно", "Відповіді скринінгу", "Журнал"].every((c) => head.includes(c)),
  head.slice(0, 13).join(","));
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

// Регресія: колонка «Контакт» зі стороннього файлу колись перехоплювала роль
// «Ім'я», через що мінялись ідентифікатори лідів і губились усі нотатки.
const mapAfter = await p2.$$eval(".maprow select", (s) => s.map((x) => x.options[x.selectedIndex].textContent));
const labels = await p2.$$eval(".maprow > span", (s) => s.map((x) => x.firstChild.textContent.trim()));
const mapOf = Object.fromEntries(labels.map((l, i) => [l, mapAfter[i]]));
ok("після імпорту «Контакт» лишився зіставленим на «Ім'я»", mapOf["Контакт"] === "Ім'я", mapOf["Контакт"]);
ok("«Компанія» не поїхала", mapOf["Компанія"] === "Компанія", mapOf["Компанія"]);
ok("«Гачок» не поїхав", mapOf["Гачок / що пропонуємо"] === "Гачок", mapOf["Гачок / що пропонуємо"]);
await p2.click(".sheet-head .iconbtn"); await p2.waitForTimeout(300);
await p2.fill("#q", "Mark Sullivan"); await p2.waitForTimeout(350);
ok("ліди досі шукаються за людиною після імпорту",
  (await p2.$$eval(".row .name", (n) => n.map((x) => x.textContent)))[0] === "OSI Maritime Systems");
await p2.close();

section("[13b] Два контакти однієї компанії — різні записи");
const p4 = await ctx.newPage();
const errors4 = [];
p4.on("pageerror", (e) => errors4.push(String(e)));
await p4.goto(URL); await p4.waitForTimeout(1500);
await p4.fill("#q", "OSI Maritime"); await p4.waitForTimeout(400);
const osiRows = await p4.$$eval(".row .name", (n) => n.map((x) => x.textContent));
ok("в OSI кілька контактів", osiRows.length >= 2, osiRows.length + " рядків");
await p4.$$eval(".row", (rs) => rs[0].click()); await p4.waitForTimeout(400);
await p4.fill(".summary-in", "Нотатка першого контакту");
await p4.waitForTimeout(700);
await p4.click(".sheet-head .iconbtn"); await p4.waitForTimeout(400);
const summaries = await p4.$$eval(".row", (rs) => rs.map((r) => {
  const s = r.querySelector(".summary");
  return s ? s.textContent : "";
}));
ok("нотатка лягла лише на один контакт",
  summaries.filter((x) => x.includes("Нотатка першого")).length === 1,
  JSON.stringify(summaries));
await p4.close();

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

section("[15] Смуга фіксованих годин");
const p3 = await ctx.newPage();
const errors3 = [];
p3.on("pageerror", (e) => errors3.push(String(e)));
await p3.goto(URL); await p3.waitForTimeout(1500);
const tl = () => p3.$$eval("#timeline .tcard .t", (e) => e.map((x) => x.textContent.trim()));
ok("смуга видима — у базі 3 фікс години", !(await p3.$eval("#timeline", (e) => e.classList.contains("hidden"))));
ok("три картки за зростанням", (await tl()).join(",") === "14:30,15:00,15:00", (await tl()).join(","));
ok("перша майбутня позначена «наступна»",
  (await p3.$$eval("#timeline .tcard", (c) => c.map((x) => x.className))).some((c) => c.includes("next")));
ok("ліди лише з датою у смугу не потрапили", (await tl()).length === 3);

// смуга слухається фільтра — це «відфільтрована контактна книга»
await p3.$$eval("#quickChips .chip", (cs) => cs.find((x) => x.textContent.includes("Відмова")).click());
await p3.waitForTimeout(400);
ok("під фільтром без зустрічей смуга ховається",
  await p3.$eval("#timeline", (e) => e.classList.contains("hidden")));
await p3.$$eval("#quickChips .chip", (cs) => cs.find((x) => x.textContent.includes("Відмова")).click());
await p3.waitForTimeout(400);
ok("смуга повертається", !(await p3.$eval("#timeline", (e) => e.classList.contains("hidden"))));

// власна година: лід без часу в базі має з'явитися у смузі
await p3.fill("#q", "OSI Maritime"); await p3.waitForTimeout(350);
await p3.click(".row"); await p3.waitForTimeout(400);
ok("поле години порожнє, бо в базі лише день", (await p3.$eval(".meet-in", (e) => e.value)) === "");
ok("підказка пояснює, що стоїть лише день",
  (await p3.textContent(".sect .note-inline")).includes("лише день") ||
  (await p3.$$eval(".note-inline", (e) => e.map((x) => x.textContent))).some((t) => t.includes("лише день")));
const soon = new Date(Date.now() + 30 * 60000);
const pad = (n) => String(n).padStart(2, "0");
const localValue = `${soon.getFullYear()}-${pad(soon.getMonth() + 1)}-${pad(soon.getDate())}T${pad(soon.getHours())}:${pad(soon.getMinutes())}`;
await p3.fill(".meet-in", localValue); await p3.waitForTimeout(600);
await p3.click(".sheet-head .iconbtn"); await p3.waitForTimeout(400);
await p3.fill("#q", ""); await p3.waitForTimeout(400);
const cards = await p3.$$eval("#timeline .tcard", (c) => c.map((x) => ({ cls: x.className, txt: x.textContent })));
ok("виставлена година додала лід у смугу", cards.length === 4, cards.length + " карток");
const osi = cards.find((c) => c.txt.includes("OSI"));
ok("лід стоїть першим — зустріч найближча", cards[0].txt.includes("OSI"), cards[0].txt.slice(0, 30));
ok("показано «через N хв»", /через \d+ хв/.test(osi.txt), osi.txt);
ok("картка підсвічена як наступна", osi.cls.includes("next"), osi.cls);
await p3.fill("#q", "OSI Maritime"); await p3.waitForTimeout(350);
ok("година видно в рядку списку як фікс",
  (await p3.$$eval(".row .meetchip", (e) => e.map((x) => x.className))).some((c) => c.includes("fixed")));
// прибрати годину
await p3.click(".row"); await p3.waitForTimeout(400);
await p3.$$eval(".note-inline button", (bs) => { const b = bs.find((x) => x.textContent.includes("Прибрати годину")); if (b) b.click(); });
await p3.waitForTimeout(500);
ok("година прибирається", (await p3.$eval(".meet-in", (e) => e.value)) === "");
await p3.click(".sheet-head .iconbtn"); await p3.waitForTimeout(400);
await p3.fill("#q", ""); await p3.waitForTimeout(400);
ok("смуга повернулась до трьох", (await tl()).length === 3, String((await tl()).length));

section("[16] Голосова нотатка");
await p3.fill("#q", "Arkeus"); await p3.waitForTimeout(350);
await p3.click(".row"); await p3.waitForTimeout(400);
const hasSR = await p3.evaluate(() => !!(window.SpeechRecognition || window.webkitSpeechRecognition));
const tools = await p3.$eval(".logtools", (e) => e.textContent);
ok("порада про мікрофон клавіатури видно одразу",
  (await p3.$$eval(".micnote", (e) => e.map((x) => x.textContent)))
    .some((t) => t.includes("мікрофон на клавіатурі")), tools.slice(0, 60));
if (hasSR) {
  ok("кнопка «Диктувати» є", tools.includes("Диктувати"), tools);
  ok("перемикач мови є", (await p3.$$(".langbtn")).length === 1);
  const before = await p3.$eval(".langbtn", (e) => e.textContent);
  await p3.click(".langbtn"); await p3.waitForTimeout(250);
  const after = await p3.$eval(".langbtn", (e) => e.textContent);
  ok("мова перемикається УКР ↔ ENG", before !== after, `${before} -> ${after}`);
  // без мікрофона апка мусить пояснити причину і повернути кнопку в спокій
  await p3.click(".micbtn"); await p3.waitForTimeout(1800);
  const note = await p3.$eval(".micnote", (e) => e.textContent);
  ok("невдача пояснена словами, а не мовчанням", note.length > 15 && /мікрофон|розпізна/i.test(note), note.slice(0, 80));
  ok("кнопка повернулась у стан спокою",
    (await p3.$eval(".micbtn", (e) => e.textContent)).includes("Диктувати") &&
    !(await p3.$eval(".micbtn", (e) => e.classList.contains("rec"))));
  // діагностика
  await p3.click(".difflink"); await p3.waitForTimeout(1800);
  const diag = await p3.$eval(".micnote", (e) => e.textContent);
  ok("звіт діагностики перелічує умови",
    diag.includes("вбудованому вікні") && diag.includes("Розпізнавання мови") &&
    diag.includes("Дозвіл на мікрофон") && diag.includes("Висновок"), diag.slice(0, 90));
} else {
  ok("без підтримки — чесне пояснення замість мертвої кнопки",
    tools.includes("Chrome") && tools.includes("Safari"), tools);
}
ok("поле журналу лишається робочим", (await p3.$$(".logadd textarea")).length === 1);
const before = (await p3.$$(".logitem")).length;
await p3.fill(".logadd textarea", "Надруковано вручну");
await p3.click(".logadd .btn.primary"); await p3.waitForTimeout(400);
ok("запис друком додається попри блок диктування",
  (await p3.$$(".logitem")).length === before + 1 &&
  (await p3.$$eval(".logitem .txt", (e) => e.map((x) => x.textContent))).includes("Надруковано вручну"),
  `${before} -> ${(await p3.$$(".logitem")).length}`);
await p3.close();

section("[17] Сценарії розмови");
const p5 = await ctx.newPage();
const errors5 = [];
p5.on("pageerror", (e) => errors5.push(String(e)));
await p5.goto(URL); await p5.waitForTimeout(1500);

// лід з бази FlyBy -> технічний сценарій
await p5.fill("#q", "Beyond Vision"); await p5.waitForTimeout(400);
await p5.click(".row"); await p5.waitForTimeout(400);
const pbHead = await p5.$$eval(".pb-head .eyebrow", (e) => e.map((x) => x.textContent));
ok("лід FlyBy отримав технічний сценарій",
  pbHead[0].includes("виробник БПЛА"), pbHead[0]);
const pbGroups = await p5.$$eval(".pb-group summary", (e) => e.map((x) => x.textContent));
ok("чотири групи питань", pbGroups.length === 4, JSON.stringify(pbGroups));
ok("є група про технічні характеристики", pbGroups.includes("Технічні характеристики"));
ok("є група про того, хто вирішує", pbGroups.includes("Хто вирішує"));
await p5.$$eval(".pb-group summary", (e) => e.forEach((x) => x.click()));
await p5.waitForTimeout(300);
const qs = await p5.$$eval(".pb-list li", (e) => e.map((x) => x.textContent));
ok("питання видно без мережі", qs.length >= 14, qs.length + " питань");
ok("питання про висоту польоту під наші межі", qs.some((q) => q.includes("110–280")), "");
ok("питання про автопілот", qs.some((q) => q.includes("автопілот")));
ok("питання про ліцензію на платформу", qs.some((q) => q.includes("платформ")));
ok("активна вкладка — FlyBy",
  (await p5.$eval(".pb-tab.on", (e) => e.textContent)) === "FlyBy");

// лід з ІТ-бази -> сценарій виявлення потреби
await p5.click(".sheet-head .iconbtn"); await p5.waitForTimeout(300);
await p5.fill("#q", "Advanced Navigation"); await p5.waitForTimeout(400);
await p5.click(".row"); await p5.waitForTimeout(400);
ok("лід ІТ-бази отримав сценарій виявлення потреби",
  (await p5.$eval(".pb-head .eyebrow", (e) => e.textContent)).includes("виявити потребу"),
  await p5.$eval(".pb-head .eyebrow", (e) => e.textContent));
const itGroups = await p5.$$eval(".pb-group summary", (e) => e.map((x) => x.textContent));
ok("є група про дотик через карти", itGroups.includes("Дотик через карти й навігацію"), JSON.stringify(itGroups));
ok("є група про того, хто відповідає за розробку", itGroups.includes("Хто відповідає за розробку"));
await p5.$$eval(".pb-group summary", (e) => e.forEach((x) => x.click()));
await p5.waitForTimeout(300);
const itQs = await p5.$$eval(".pb-list li", (e) => e.map((x) => x.textContent));
ok("питання про гео в їхньому продукті", itQs.some((q) => q.includes("координати") || q.includes("гео-дані")));
ok("питання про вакансії як сигнал", itQs.some((q) => q.includes("вакансії")));

// ручний перехід на інший сценарій зберігається
await p5.$$eval(".pb-tab", (b) => b.find((x) => x.textContent === "FlyBy").click());
await p5.waitForTimeout(500);
ok("сценарій перемикається вручну",
  (await p5.$eval(".pb-head .eyebrow", (e) => e.textContent)).includes("виробник БПЛА"));
await p5.click(".sheet-head .iconbtn"); await p5.waitForTimeout(300);
await p5.click(".row"); await p5.waitForTimeout(450);
ok("вибір сценарію запамʼятався",
  (await p5.$eval(".pb-head .eyebrow", (e) => e.textContent)).includes("виробник БПЛА"));
await p5.$$eval(".pb-tab", (b) => b.find((x) => x.textContent === "FlyBy").click());
await p5.waitForTimeout(450);
ok("повторний тап знімає ручний вибір",
  (await p5.$eval(".pb-head .eyebrow", (e) => e.textContent)).includes("виявити потребу"));

// довідка про нас
await p5.click(".sheet-head .iconbtn"); await p5.waitForTimeout(300);
await p5.fill("#q", ""); await p5.click("#menuBtn"); await p5.waitForTimeout(400);
const briefs = await p5.$$eval("textarea.brief", (e) => e.map((x) => x.value));
ok("дві довідки в меню", briefs.length === 2, briefs.length + "");
ok("довідка FlyBy має реальні цифри з флаєра",
  briefs[0].includes("13.2") && briefs[0].includes("110–280") && briefs[0].includes("3.34"),
  briefs[0].slice(0, 80));
ok("довідка ІТ називає гео-спеціалізацію",
  briefs[1].includes("SAR") && briefs[1].includes("ENC") && briefs[1].includes("FLY BY"),
  briefs[1].slice(0, 80));
await p5.fill("textarea.brief", "Змінений текст довідки");
await p5.$eval("textarea.brief", (e) => e.blur());
await p5.waitForTimeout(500);
await p5.reload(); await p5.waitForTimeout(1500);
await p5.click("#menuBtn"); await p5.waitForTimeout(400);
ok("правка довідки переживає перезавантаження",
  (await p5.$$eval("textarea.brief", (e) => e.map((x) => x.value)))[0] === "Змінений текст довідки");
await p5.close();

section("[18] Скринінг ліда");
const p6 = await ctx.newPage();
const errors6 = [];
p6.on("pageerror", (e) => errors6.push(String(e)));
await p6.goto(URL); await p6.waitForTimeout(1500);
const scrText = () => p6.$eval(".scr-q", (e) => e.textContent);
const optClick = (label) => p6.$$eval(".opt", (bs, l) => {
  const b = bs.find((x) => x.textContent.includes(l));
  if (b) b.click();
  return !!b;
}, label);

await p6.fill("#q", "STARK Defence"); await p6.waitForTimeout(400);
await p6.click(".row"); await p6.waitForTimeout(450);
ok("у картці є блок скринінгу",
  (await p6.$$eval(".eyebrow", (e) => e.map((x) => x.textContent))).includes("Скринінг"));
await p6.locator(".sheet").last().getByText("Почати скринінг", { exact: true }).click();
await p6.waitForTimeout(450);

// вибір типу
const types = await p6.$$eval(".type-name", (e) => e.map((x) => x.textContent));
ok("сім типів клієнта", types.length === 7, JSON.stringify(types));
ok("лід з бази FlyBy отримав підказку типу",
  (await p6.$$(".type-sug")).length === 1);
await p6.$$eval(".type-btn", (bs) => bs.find((x) => x.textContent.includes("Виробник БПЛА")).click());
await p6.waitForTimeout(400);

// набір питань
ok("перше питання UAV_OEM англійською",
  (await scrText()).startsWith("How many units do you ship a year"), await scrText());
ok("прогрес 1 / 5", (await p6.$eval(".scr-progress", (e) => e.textContent)) === "1 / 5");
ok("є українська підказка під питанням",
  (await p6.$eval(".scr-hint", (e) => e.textContent)).includes("tens, hundreds"));
await p6.fill(".scr-in", "500");
await p6.$$eval(".scr-nav .btn", (bs) => bs.find((x) => x.textContent === "Далі").click());
await p6.waitForTimeout(350);
ok("друге питання — про бортове рішення",
  (await scrText()).startsWith("Today, how do you solve that on board"), await scrText());
ok("дискваліфікаційний варіант позначено", (await p6.$$(".opt-stop")).length === 1);

// назад не втрачає відповідь
await p6.$$eval(".scr-nav .btn", (bs) => bs.find((x) => x.textContent === "Назад").click());
await p6.waitForTimeout(350);
ok("назад повертає введене", (await p6.$eval(".scr-in", (e) => e.value)) === "500");
await p6.$$eval(".scr-nav .btn", (bs) => bs.find((x) => x.textContent === "Далі").click());
await p6.waitForTimeout(350);

// проходимо набір до кінця з 6 гіпотезами
await optClick("own development"); await p6.waitForTimeout(350);
ok("вибір варіанта веде далі сам",
  (await scrText()).startsWith("What's the hard ceiling"), await scrText());
ok("підказка нагадує не обіцяти ТТХ",
  (await p6.$eval(".scr-hint", (e) => e.textContent)).includes("engineering team"));
await p6.fill(".scr-field textarea", "1200 g, 40 W, 60 mm");
await p6.locator(".scr-field .flagbox input").last().click();
await p6.$$eval(".scr-nav .btn", (bs) => bs.find((x) => x.textContent === "Далі").click());
await p6.waitForTimeout(350);
await p6.fill(".scr-field textarea", "Septentrio, picked on size");
await p6.locator(".scr-field .flagbox input").last().click();
await p6.$$eval(".scr-nav .btn", (bs) => bs.find((x) => x.textContent === "Далі").click());
await p6.waitForTimeout(350);
ok("останнє питання — про вікно ревізії",
  (await scrText()).startsWith("When's your next platform revision"), await scrText());
const soonDate = new Date(Date.now() + 90 * 864e5).toISOString().slice(0, 10);
await p6.fill(".scr-in", soonDate);
await p6.$$eval(".scr-nav .btn", (bs) => bs.find((x) => x.textContent === "Далі").click());
await p6.waitForTimeout(350);
ok("тумблер H6 про платний пілот",
  (await scrText()).includes("paid evaluation"), await scrText());
await optClick("Yes"); await p6.waitForTimeout(400);

// фінальний екран
ok("вердикт HOT", (await p6.$eval(".verdict-l", (e) => e.textContent)) === "HOT",
  await p6.$eval(".verdict-l", (e) => e.textContent));
const hyps = await p6.$$eval(".hyp-row.on .hyp-k", (e) => e.map((x) => x.textContent));
ok("усі шість гіпотез підтверджені", hyps.length === 6, hyps.join(","));
ok("рекомендація маршруту K",
  (await p6.$eval(".followup li", (e) => e.textContent)).includes("eval unit"),
  await p6.$eval(".followup li", (e) => e.textContent));
await p6.locator(".scr .summary-in, .sect .summary-in").last().fill("Специфікація до пʼятниці");
await p6.$$eval(".scr-nav .btn", (bs) => bs.find((x) => x.textContent === "Зберегти").click());
await p6.waitForTimeout(600);
ok("картка показує збережений вердикт",
  (await p6.$eval(".verdict-l", (e) => e.textContent)) === "HOT");
ok("обіцянка збережена",
  (await p6.$$eval(".note-inline", (e) => e.map((x) => x.textContent))).some((t) => t.includes("Специфікація до")));
ok("скринінг лягає в журнал",
  (await p6.$$eval(".logitem .txt", (e) => e.map((x) => x.textContent))).some((t) => t.includes("Скринінг: HOT")));
await p6.click(".sheet-head .iconbtn"); await p6.waitForTimeout(400);
ok("вердикт видно у списку",
  (await p6.$$eval(".row .vbadge", (e) => e.map((x) => x.textContent))).includes("HOT"));

// дискваліфікатор обриває набір
await p6.fill("#q", "Beyond Vision"); await p6.waitForTimeout(400);
await p6.click(".row"); await p6.waitForTimeout(450);
await p6.locator(".sheet").last().getByText("Почати скринінг", { exact: true }).click();
await p6.waitForTimeout(450);
await p6.$$eval(".type-btn", (bs) => bs.find((x) => x.textContent.includes("Геосервіс, обробка в себе")).click());
await p6.waitForTimeout(400);
ok("набір GEO_INHOUSE на 5 питань",
  (await p6.$eval(".scr-progress", (e) => e.textContent)) === "1 / 5");
await p6.fill(".scr-in", "40");
await p6.$$eval(".scr-nav .btn", (bs) => bs.find((x) => x.textContent === "Далі").click());
await p6.waitForTimeout(350);
await optClick("US / Canada"); await p6.waitForTimeout(350);
ok("третє питання — про дельверабли",
  (await scrText()).startsWith("What do you actually deliver"), await scrText());
await optClick("capture only"); await p6.waitForTimeout(500);
ok("дискваліфікатор обриває набір і дає STOP",
  (await p6.$eval(".verdict-l", (e) => e.textContent)) === "STOP");
ok("пропонує змінити тип",
  (await p6.$$eval(".btn", (e) => e.map((x) => x.textContent))).some((t) => t.includes("Тільки польовий збір")));
ok("три готові фрази на вихід",
  (await p6.locator(".sheet").last().locator(".pb-group").count()) === 3,
  String(await p6.locator(".sheet").last().locator(".pb-group").count()));
await p6.$$eval(".btn", (bs) => bs.find((x) => x.textContent.includes("Зберегти візитку")).click());
await p6.waitForTimeout(600);
ok("STOP збережено в картці",
  (await p6.$eval(".verdict-l", (e) => e.textContent)) === "STOP");
ok("на STOP нічого не надсилаємо",
  (await p6.$eval(".followup li", (e) => e.textContent)).includes("нічого не надсилаємо"));

// зміна типу миттєво міняє набір
await p6.locator(".sheet").last().getByText("Пройти ще раз", { exact: true }).click();
await p6.waitForTimeout(450);
await p6.$$eval(".type-btn", (bs) => bs.find((x) => x.textContent.includes("Дефіцит людей")).click());
await p6.waitForTimeout(400);
ok("тип змінено — набір інший",
  (await scrText()).startsWith("What's your team hiring for"), await scrText());
// регресія: закриття вкладеного екрана не має забирати з собою картку ліда
ok("два екрани відкриті одночасно", (await p6.$$(".sheet")).length === 2,
  String((await p6.$$(".sheet")).length));
await p6.locator(".sheet").last().locator(".sheet-head .iconbtn").click();
await p6.waitForTimeout(500);
ok("закрився лише скринінг, картка лишилась", (await p6.$$(".sheet")).length === 1,
  String((await p6.$$(".sheet")).length));
await p6.click(".sheet-head .iconbtn"); await p6.waitForTimeout(400);
ok("картка теж закривається", (await p6.$$(".sheet")).length === 0);
ok("без винятків у скринінгу", errors6.length === 0, JSON.stringify(errors6));
await p6.close();

section("[19] Помилки виконання");
ok("без винятків на основній сторінці", errors.length === 0, JSON.stringify(errors));
ok("без винятків на сторінці імпорту", errors2.length === 0, JSON.stringify(errors2));
ok("без винятків на сторінці смуги годин", errors3.length === 0, JSON.stringify(errors3));
ok("без винятків на сторінці контактів компанії", errors4.length === 0, JSON.stringify(errors4));
ok("без винятків на сторінці сценаріїв", errors5.length === 0, JSON.stringify(errors5));
ok("без винятків на сторінці скринінгу", errors6.length === 0, JSON.stringify(errors6));

await browser.close();
fs.rmSync(TMP, { recursive: true, force: true });

console.log(`\n═══ ${pass} пройдено, ${fail} провалено ═══`);
if (fail) {
  console.log("ПРОВАЛЕНІ:");
  failed.forEach((f) => console.log("  -", f));
  process.exit(1);
}
