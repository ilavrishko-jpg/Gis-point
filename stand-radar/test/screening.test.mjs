/**
 * Перевірки скорингу та вибору набору питань.
 *   node test/screening.test.mjs
 * Модуль браузерний (вішається на window), тож підсовуємо йому фальшивий window.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const src = fs.readFileSync(path.join(HERE, "..", "screening.js"), "utf8");
const sandbox = { window: {} };
new Function("window", src).call(sandbox, sandbox.window);
const S = sandbox.window.SR_SCREENING;

let pass = 0, fail = 0;
const failed = [];
function ok(name, cond, detail = "") {
  if (cond) { pass++; console.log("  ✓", name); }
  else { fail++; failed.push(`${name} — ${detail}`); console.log("  ✗", name, detail); }
}
const inMonths = (n) => {
  const d = new Date();
  d.setMonth(d.getMonth() + n);
  return d.toISOString().slice(0, 10);
};
const A = (value, flag) => ({ value, flag });

console.log("[Набори питань]");
S.CLIENT_TYPES.forEach((t) => {
  const qs = S.getQuestionsFor(t.id);
  if (t.exitOnly) {
    ok(`${t.id}: питань немає, це екран виходу`, qs.length === 0);
  } else {
    ok(`${t.id}: ${qs.length} питань, у межах 3–5`, qs.length >= 3 && qs.length <= 5, String(qs.length));
    ok(`${t.id}: порядок зростає`, qs.every((q, i) => q.order === i + 1));
    ok(`${t.id}: у кожного питання є англійський текст і підказка`,
      qs.every((q) => q.textEn && q.hintUa));
  }
});
ok("невідомий тип дає порожній набір, а не падіння", S.getQuestionsFor("NO_SUCH").length === 0);
ok("UAV_OEM починається з питання про обсяг",
  S.getQuestionsFor("UAV_OEM")[0].textEn.startsWith("How many units"));

console.log("\n[passWhen по типах відповіді]");
const oem = Object.fromEntries(S.getQuestionsFor("UAV_OEM").map((q) => [q.id, q]));
ok("number: 100 проходить поріг >= 100", S.passes(oem.oem_units, A(100)));
ok("number: 99 не проходить", !S.passes(oem.oem_units, A(99)));
ok("number: приймає “500 units” рядком", S.passes(oem.oem_units, A("500 units")));
ok("single: own_dev проходить", S.passes(oem.oem_today, A("own_dev")));
ok("single: live_with_it не проходить", !S.passes(oem.oem_today, A("live_with_it")));
ok("text без галочки не проходить", !S.passes(oem.oem_envelope, A("1200 g, 40 W")));
ok("text з галочкою проходить", S.passes(oem.oem_envelope, A("1200 g, 40 W", true)));
ok("порожній text з галочкою не проходить", !S.passes(oem.oem_envelope, A("   ", true)));
ok("date у межах 12 місяців проходить", S.passes(oem.oem_window, A(inMonths(6))));
ok("date за 13 місяців не проходить", !S.passes(oem.oem_window, A(inMonths(13))));
ok("date у минулому не проходить", !S.passes(oem.oem_window, A(inMonths(-2))));
const geo = Object.fromEntries(S.getQuestionsFor("GEO_INHOUSE").map((q) => [q.id, q]));
ok("date без вікна приймає будь-яку конкретну дату", S.passes(geo.geo_window, A(inMonths(20))));
ok("date без вікна не приймає порожнє", !S.passes(geo.geo_window, A("")));
ok("text без passFlag проходить будь-якою відповіддю",
  S.passes(Object.fromEntries(S.getQuestionsFor("STAFF_GAP").map((q) => [q.id, q])).gap_rules, A("EU only")));

console.log("\n[Скоринг і вердикт]");
// 3 гіпотези -> CONTACT
let r = S.score("UAV_OEM", {
  oem_units: A(500),                       // H3
  oem_today: A("own_dev"),                 // H1
  oem_envelope: A("1200 g", true)          // H4
});
ok("3 гіпотези -> CONTACT", r.verdict === "CONTACT" && r.count === 3, `${r.count} / ${r.verdict}`);

// рівно 4 гіпотези -> LEAD
r = S.score("UAV_OEM", {
  oem_units: A(500),                       // H3
  oem_today: A("own_dev"),                 // H1
  oem_envelope: A("1200 g", true),         // H4
  oem_thirdparty: A("Septentrio", true)    // H2
});
ok("рівно 4 гіпотези -> LEAD", r.verdict === "LEAD" && r.count === 4, `${r.count} / ${r.verdict}`);
ok("гіпотези віддаються списком", r.hypotheses.join(",") === "H1,H2,H3,H4", r.hypotheses.join(","));

// 6 гіпотез -> HOT
r = S.score("UAV_OEM", {
  oem_units: A(500), oem_today: A("bought_module"),
  oem_envelope: A("1200 g", true), oem_thirdparty: A("Septentrio", true),
  oem_window: A(inMonths(4))
}, { paidPilot: true });
ok("6 гіпотез -> HOT", r.verdict === "HOT" && r.count === 6, `${r.count} / ${r.verdict}`);
ok("маршрут K для виробника", r.routes.join(",") === "K", r.routes.join(","));
ok("фолоу-ап K про специфікацію і eval unit",
  r.followUp[0].includes("специфікації") && r.followUp[0].includes("eval unit"), r.followUp[0]);

// дискваліфікатор при 5 гіпотезах -> STOP
r = S.score("UAV_OEM", {
  oem_units: A(500), oem_today: A("not_a_problem"),
  oem_envelope: A("1200 g", true), oem_thirdparty: A("Septentrio", true),
  oem_window: A(inMonths(4))
}, { paidPilot: true });
ok("дискваліфікатор перебиває бал -> STOP", r.verdict === "STOP", `${r.count} / ${r.verdict}`);
ok("дискваліфікатор названий", r.disqualifier && r.disqualifier.questionId === "oem_today");
ok("на STOP нічого не надсилаємо", r.followUp[0] === "нічого не надсилаємо", r.followUp[0]);

// гіпотеза зараховується один раз
r = S.score("STAFF_GAP", {
  gap_hiring: A("GIS developer", true),        // H1
  gap_shorthanded: A("push_deadline"),         // H1 знову
  gap_ownsoft: A("build_in_house")             // H1 втретє
});
ok("H1 не рахується тричі", r.count === 1 && r.hypotheses.join(",") === "H1", r.hypotheses.join(","));
ok("найгарячіший сигнал позначено", r.hotSignals.indexOf("gap_shorthanded") > -1, JSON.stringify(r.hotSignals));

// дискваліфікатор геосервісу пропонує інший тип
r = S.score("GEO_INHOUSE", { geo_people: A(20), geo_deliver: A("capture_only") });
ok("capture_only -> STOP", r.verdict === "STOP");
ok("пропонує змінити тип на GEO_CAPTURE_ONLY", r.disqualifier.suggestType === "GEO_CAPTURE_ONLY");

// гео-фільтр не додає бал, але позначається
r = S.score("GEO_INHOUSE", { geo_people: A(20), geo_market: A("OTHER"), geo_who: A("field_engineers") });
ok("гео-фільтр не дає гіпотези", r.hypotheses.indexOf("H0") === -1);
ok("провал гео-фільтра позначено", r.geoFilterFailed === true);

// крос-продаж додає маршрут H
r = S.score("UAV_OEM", { oem_units: A(500) }, { crossSellDone: true });
ok("крос-продаж додає маршрут H", r.routes.join(",") === "K,H", r.routes.join(","));
ok("два маршрути -> дві рекомендації", r.followUp.length === 2, String(r.followUp.length));

// типи-виходи
r = S.score("OUT_OF_SCOPE", {});
ok("OUT_OF_SCOPE -> маршрут X", r.routes.join(",") === "X");
ok("порожній набір -> CONTACT без падіння", r.verdict === "CONTACT");

console.log("\n[Правила комунікації]");
const allText = JSON.stringify(S.CLIENT_TYPES) + JSON.stringify(S.CROSS_SELL) + JSON.stringify(S.H6_QUESTION);
ok("ніде не сказано “IT” замість software development",
  !/\bIT\b|ІТ-аутсорс|IT-аутсорс/.test(allText));
ok("є фраза про звірку ТТХ з інженерами",
  allText.includes("I'll confirm that with our engineering team"));
// Шукаємо саме називання цін, а не згадку правила «ставки не називаємо».
const priceTalk = allText.replace(/Ставки й ціни не називаємо[^"]*/g, "");
ok("ніде не називаються ціни, ставки чи знижки",
  !/(ці́?н[аиуої]|ставк|знижк|прайс|\bprice|\bpricing\b|\brates?\b|\bdiscount|\bhourly\b|per hour|[$€£])/i.test(priceTalk),
  (priceTalk.match(/.{0,40}(ці́?н[аиуої]|ставк|знижк|\bprice|\brates?\b)[^"]{0,30}/i) || [""])[0]);
ok("правило про ставки лишається як застереження продавцю",
  allText.includes("Ставки й ціни не називаємо"));

console.log(`\n═══ ${pass} пройдено, ${fail} провалено ═══`);
if (fail) { failed.forEach((f) => console.log("  -", f)); process.exit(1); }
