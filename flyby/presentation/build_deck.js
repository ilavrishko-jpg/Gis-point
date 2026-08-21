// FLY BY / ONS — Pre-Seed 2026 deck
// Rebuilt in the GIS-Point Ltd brand system (Brand Guide v1.1):
//   Font: Arial · Company color #2D2D2D (charcoal) · Accent #08543C (GIS green)
// Content updated with Aug-2026 field data & hardware prototype status.
const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.33 x 7.5

// ---------- brand tokens ----------
const CHAR   = "2D2D2D"; // company charcoal (primary / dark bg)
const GREEN  = "08543C"; // GIS Department green (accent)
const GREENL = "3B9E77"; // lightened green for dark backgrounds
const LIGHT  = "FBFBFA"; // content background (near-white)
const PANEL  = "F2F3F1"; // subtle panel fill on light
const INK    = "2D2D2D"; // body text on light
const MUTE   = "76776F"; // muted grey
const LINE   = "DCDDD8"; // hairline rule on light
const PAPER  = "F5F5F3"; // near-white text on dark
const PAPERM = "A9AAA4"; // muted text on dark
const DLINE  = "45463F"; // hairline rule on dark

const W = 13.33, H = 7.5;
const ML = 0.75;
const CW = W - 2 * ML;
const FONT = "Arial";
const TOTAL = "14";

// ---------- helpers ----------
function light(s) { s.background = { color: LIGHT }; }
function dark(s)  { s.background = { color: CHAR }; }

// header: ONS wordmark left, section right, hairline rule beneath
function header(s, section) {
  s.addText("ONS", { x: ML, y: 0.42, w: 3, h: 0.3, fontSize: 12, bold: true, fontFace: FONT, color: INK, charSpacing: 2, margin: 0 });
  s.addText(section, { x: W - ML - 5, y: 0.42, w: 5, h: 0.3, fontSize: 11, fontFace: FONT, color: MUTE, align: "right", charSpacing: 2, margin: 0 });
  s.addShape(pres.ShapeType.line, { x: ML, y: 0.82, w: CW, h: 0, line: { color: LINE, width: 1 } });
}

function footer(s, num) {
  s.addText("PRE-SEED · 2026", { x: ML, y: H - 0.45, w: 4, h: 0.3, fontSize: 9, fontFace: FONT, color: MUTE, charSpacing: 1.5, margin: 0 });
  s.addText(num + " / " + TOTAL, { x: W - ML - 1.4, y: H - 0.45, w: 1.4, h: 0.3, fontSize: 9, fontFace: FONT, color: MUTE, align: "right", charSpacing: 1.5, margin: 0 });
}

function title(s, text, opts) {
  s.addText(text, Object.assign({
    x: ML, y: 1.15, w: CW, h: 1.0, fontSize: 34, bold: true, fontFace: FONT, color: INK, margin: 0,
  }, opts || {}));
}
function subtitle(s, text, y) {
  s.addText(text, { x: ML, y: y || 2.02, w: CW, h: 0.4, fontSize: 15, fontFace: FONT, color: MUTE, margin: 0 });
}

// big light-weight stat with vertical rule (flat, brand style — no filled boxes)
function statFlat(s, x, y, w, big, label, sub, opts) {
  opts = opts || {};
  if (!opts.first) s.addShape(pres.ShapeType.line, { x: x - 0.28, y: y + 0.1, w: 0, h: 1.55, line: { color: opts.dark ? DLINE : LINE, width: 1 } });
  s.addText(big, { x, y, w, h: 0.95, fontSize: opts.bigSize || 52, fontFace: FONT, color: opts.numColor || GREEN, margin: 0 });
  s.addText(label, { x, y: y + 1.0, w, h: 0.5, fontSize: 12.5, bold: true, fontFace: FONT, color: opts.dark ? PAPER : INK, margin: 0 });
  s.addText(sub, { x, y: y + 1.5, w, h: 0.4, fontSize: 9.5, fontFace: FONT, color: opts.dark ? PAPERM : MUTE, margin: 0 });
}

// ONS grid + drone-path mark (recreated from the brand mark)
function onsMark(s, x, y, sz, stroke, dotColor) {
  s.addShape(pres.ShapeType.rect, { x, y, w: sz, h: sz, fill: { type: "none" }, line: { color: stroke, width: 1.25 } });
  for (let i = 1; i < 4; i++) {
    s.addShape(pres.ShapeType.line, { x: x + (sz / 4) * i, y, w: 0, h: sz, line: { color: stroke, width: 0.75 } });
    s.addShape(pres.ShapeType.line, { x, y: y + (sz / 4) * i, w: sz, h: 0, line: { color: stroke, width: 0.75 } });
  }
  // path dots rising left->right
  const pts = [[0.12, 0.86], [0.3, 0.66], [0.5, 0.55], [0.68, 0.48], [0.84, 0.24]];
  pts.forEach((p, i) => {
    const d = i === 0 ? 0.09 : 0.055;
    s.addShape(pres.ShapeType.ellipse, { x: x + p[0] * sz - d / 2, y: y + p[1] * sz - d / 2, w: d, h: d, fill: { color: dotColor }, line: { type: "none" } });
  });
}

// =====================================================================
// 1 · TITLE  (dark, brand charcoal)
// =====================================================================
{
  const s = pres.addSlide(); dark(s);
  onsMark(s, ML, 2.35, 1.5, GREENL, GREENL);
  s.addText("ONS", { x: ML + 1.95, y: 2.5, w: 5, h: 0.7, fontSize: 46, fontFace: FONT, color: PAPER, charSpacing: 8, margin: 0 });
  s.addText("OPTICAL NAVIGATION SYSTEM", { x: ML + 2.0, y: 3.32, w: 6, h: 0.3, fontSize: 11, fontFace: FONT, color: GREENL, charSpacing: 3, margin: 0 });

  s.addShape(pres.ShapeType.line, { x: ML, y: 4.35, w: 2.2, h: 0, line: { color: GREENL, width: 1.5 } });

  s.addText("When GPS dies, the drone goes blind.", {
    x: ML, y: 4.65, w: 11.4, h: 0.9, fontSize: 34, bold: true, fontFace: FONT, color: PAPER, margin: 0,
  });
  s.addText("Dual-use optical navigation · Field-tested · Pre-Seed · $500K", {
    x: ML, y: 5.7, w: 11, h: 0.4, fontSize: 15, fontFace: FONT, color: GREENL, margin: 0,
  });

  s.addText("GIS-POINT LTD (UK) · 2026", { x: ML, y: H - 0.55, w: 8, h: 0.3, fontSize: 10, fontFace: FONT, color: PAPERM, charSpacing: 1.5, margin: 0 });
}

// =====================================================================
// 2 · PROBLEM
// =====================================================================
{
  const s = pres.addSlide(); light(s);
  header(s, "01 · PROBLEM");
  title(s, "GPS jamming makes every mission a coin flip.");
  subtitle(s, "Jamming is constant — and the demand is already ordered.");

  statFlat(s, ML, 2.75, 3.6, "46,000", "GNSS jamming events recorded", "In conflict zones, 2024 · GPS World", { first: true });
  statFlat(s, ML + 4.05, 2.75, 3.6, "+300%", "YoY growth in jamming incidents", "C4ADS · 2024");
  statFlat(s, ML + 8.1, 2.75, 3.6, "30,000+", "Strike drones ordered, Ukraine", "Zelensky / Umerov · 2025");

  s.addShape(pres.ShapeType.line, { x: ML, y: 5.15, w: CW, h: 0, line: { color: LINE, width: 1 } });
  s.addText([
    { text: "EW jams or spoofs GPS. ", options: { bold: true, color: INK } },
    { text: "Drones lose coordinates, drift off course, crash, or become targets. Every platform without a satellite-independent position source is a single point of failure.", options: { color: MUTE } },
  ], { x: ML, y: 5.4, w: CW, h: 0.9, fontSize: 14, fontFace: FONT, italic: true, margin: 0 });

  footer(s, "02");
}

// =====================================================================
// 3 · WHY NOW
// =====================================================================
{
  const s = pres.addSlide(); light(s);
  header(s, "02 · WHY NOW");
  title(s, "GPS-denied nav is becoming a requirement.");
  subtitle(s, "Capital, regulation, and demand are converging through 2026.");

  statFlat(s, ML, 2.75, 3.6, "5%", "NATO defence-GDP target by 2035", "UK 2.5% by 2027 · Hague Summit 2025", { first: true });
  statFlat(s, ML + 4.05, 2.75, 3.6, "2026", "EU Drone Wall IOC", "GPS-denied nav becomes a spec · EU programme");
  statFlat(s, ML + 8.1, 2.75, 3.6, "30K+", "Strike drones need GPS-denied nav", "Zelensky / Umerov · 2025");

  s.addShape(pres.ShapeType.line, { x: ML, y: 5.15, w: CW, h: 0, line: { color: LINE, width: 1 } });
  s.addText("ReArm Europe €800B + SAFE €150B shown as opportunity pipeline — not market size.", {
    x: ML, y: 5.4, w: CW, h: 0.4, fontSize: 12, fontFace: FONT, italic: true, color: MUTE, margin: 0,
  });
  footer(s, "03");
}

// =====================================================================
// 4 · SOLUTION
// =====================================================================
{
  const s = pres.addSlide(); light(s);
  header(s, "03 · SOLUTION");
  title(s, "Optical terrain-matching replaces GPS.");
  subtitle(s, "Camera + onboard compute match live terrain to a pre-loaded reference map, fused with IMU.");

  const cards = [
    ["01", "Absolute position, no drift", "Route-corridor map loaded pre-flight. Map-matching gives absolute coordinates — no satellite, no cumulative inertial drift."],
    ["02", "Field-proven accuracy", "17 m median error in real flight tests at ~200 m AGL — better than the 20–50 m mid-strike needs. Down to ~3 m in best conditions."],
    ["03", "Plug-in module", "Feeds the autopilot over MAVLink as an external GPS source. Works with open-standard autopilots (ArduPilot / PX4) — no operator retraining."],
    ["04", "Zero RF signature", "Passive optical sensing only. Nothing radiates, so EW has nothing to detect, jam, or home in on."],
  ];
  cards.forEach((c, i) => {
    const x = ML + (i % 2) * 6.1, y = 2.75 + Math.floor(i / 2) * 1.85;
    s.addText(c[0], { x, y, w: 0.7, h: 0.5, fontSize: 17, fontFace: FONT, color: GREEN, margin: 0 });
    s.addText(c[1], { x: x + 0.75, y: y - 0.02, w: 5.1, h: 0.4, fontSize: 15, bold: true, fontFace: FONT, color: INK, margin: 0 });
    s.addText(c[2], { x: x + 0.75, y: y + 0.4, w: 5.15, h: 1.15, fontSize: 10.5, fontFace: FONT, color: MUTE, margin: 0 });
  });

  s.addShape(pres.ShapeType.line, { x: ML, y: 6.5, w: CW, h: 0, line: { color: LINE, width: 1 } });
  s.addText("Algorithm live and flight-tested on commodity cameras · working MVP in 6–9 months.", {
    x: ML, y: 6.62, w: CW, h: 0.35, fontSize: 11, fontFace: FONT, italic: true, color: MUTE, margin: 0,
  });
  footer(s, "04");
}

// =====================================================================
// 5 · FIELD RESULTS (NEW)
// =====================================================================
{
  const s = pres.addSlide(); light(s);
  header(s, "04 · FIELD RESULTS · AUG 2026");
  title(s, "New test data: we beat the mission spec.");
  subtitle(s, "Real flights, real routes, commodity camera — verified against GPS ground truth.");

  statFlat(s, ML, 2.75, 2.7, "17 m", "Median position error", "Full route, ~200 m AGL, 25 m/s", { first: true });
  statFlat(s, ML + 3.0, 2.75, 2.7, "~3 m", "Best-condition accuracy", "High-texture terrain segments");
  statFlat(s, ML + 6.0, 2.75, 2.7, "300 ms", "Per-frame processing", "Down from 1 s — path to real-time");
  statFlat(s, ML + 9.0, 2.75, 2.85, "20–50 m", "What the mission needs", "Mid-strike req. — already exceeded", { numColor: CHAR, bigSize: 40 });

  s.addShape(pres.ShapeType.rect, { x: ML, y: 5.25, w: CW, h: 1.35, fill: { color: PANEL }, line: { type: "none" } });
  s.addText("WHAT THIS MEANS", { x: ML + 0.3, y: 5.42, w: 5, h: 0.3, fontSize: 10.5, bold: true, fontFace: FONT, color: GREEN, charSpacing: 2, margin: 0 });
  s.addText([
    { text: "Multiple flights at different altitudes matched live video to the reference map at 17 m median error — on a consumer-grade camera. ", options: { color: MUTE } },
    { text: "Mid-strike missions need 20–50 m: we already exceed the requirement, before IMU-fusion tuning and model training on accumulated flight data. Target: ≤5 m CEP at 150–200 km.", options: { color: INK, bold: true } },
  ], { x: ML + 0.3, y: 5.72, w: CW - 0.6, h: 0.8, fontSize: 12, fontFace: FONT, margin: 0 });

  footer(s, "05");
}

// =====================================================================
// 6 · HARDWARE PROTOTYPE (NEW)
// =====================================================================
{
  const s = pres.addSlide(); light(s);
  header(s, "05 · HARDWARE · IN PRODUCTION");
  title(s, "Module chosen — manufacturing started.");
  subtitle(s, "Product-form decision made: integrated hardware module. First prototype batch is in manufacturing now.");

  // left column — inside the module
  s.addText("INSIDE THE MODULE", { x: ML, y: 2.75, w: 5.2, h: 0.3, fontSize: 11, bold: true, fontFace: FONT, color: GREEN, charSpacing: 2, margin: 0 });
  const parts = [
    ["Optical camera", "day-mode now, night-mode on roadmap"],
    ["Onboard compute", "runs the matching algorithm in flight"],
    ["Encrypted map storage", "reference maps stay inside the box — IP protected"],
    ["MAVLink interface", "presents to the autopilot as an external GPS receiver"],
    ["IMU fusion", "uses platform IMU; tolerates 10–20° camera misalignment"],
  ];
  parts.forEach((p, i) => {
    const y = 3.18 + i * 0.66;
    s.addShape(pres.ShapeType.ellipse, { x: ML + 0.02, y: y + 0.07, w: 0.12, h: 0.12, fill: { color: GREEN }, line: { type: "none" } });
    s.addText([
      { text: p[0] + " — ", options: { bold: true, color: INK } },
      { text: p[1], options: { color: MUTE } },
    ], { x: ML + 0.3, y, w: 5.3, h: 0.6, fontSize: 11, fontFace: FONT, margin: 0 });
  });

  // right column — production status panel
  s.addShape(pres.ShapeType.rect, { x: ML + 6.1, y: 2.7, w: 5.73, h: 3.75, fill: { color: PANEL }, line: { type: "none" } });
  s.addText("PRODUCTION STATUS · AUG 2026", { x: ML + 6.4, y: 2.9, w: 5.2, h: 0.3, fontSize: 11, bold: true, fontFace: FONT, color: GREEN, charSpacing: 1.5, margin: 0 });
  const rows = [
    ["NOW", "First prototype units in assembly — 3D-printed enclosure, branded, flight-ready"],
    ["END AUG", "3 units built and flying at a partner test range near Lviv"],
    ["NEXT", "10-unit batch for OEM field trials on partner ISR aircraft (100 km linear routes)"],
    ["BOM", "$1,000–1,500 per unit at prototype volumes — compute, 1 TB storage, camera, power & cooling"],
  ];
  rows.forEach((r, i) => {
    const y = 3.32 + i * 0.76;
    s.addText(r[0], { x: ML + 6.4, y, w: 1.15, h: 0.5, fontSize: 11, bold: true, fontFace: FONT, color: GREEN, margin: 0 });
    s.addText(r[1], { x: ML + 7.55, y, w: 4.1, h: 0.72, fontSize: 10.5, fontFace: FONT, color: INK, margin: 0 });
  });

  s.addText("Why hardware: OEMs asked for a calibrated, install-and-fly box — and onboard encrypted maps beat a web platform on security.", {
    x: ML, y: 6.65, w: CW, h: 0.35, fontSize: 10.5, fontFace: FONT, italic: true, color: MUTE, margin: 0,
  });
  footer(s, "06");
}

// =====================================================================
// 7 · MOAT
// =====================================================================
{
  const s = pres.addSlide(); light(s);
  header(s, "06 · MOAT");
  title(s, "The approach works — our map IP is the moat.");
  subtitle(s, "Matching algorithms will commoditise. Sovereign, fresh, GIS-grade maps will not.");

  statFlat(s, ML, 2.7, 5.5, "17 m", "ONS — own field result, Aug 2026", "Median error, real flights vs GPS ground truth · target ≤5 m CEP", { first: true });
  statFlat(s, ML + 6.1, 2.7, 5.5, "52 m", "Independent benchmark (Theseus)", "Median, 564 km optical-nav test, Mar 2026 — validates the category, not our metric", { numColor: MUTE });

  s.addShape(pres.ShapeType.line, { x: ML, y: 4.85, w: CW, h: 0, line: { color: LINE, width: 1 } });
  const moats = [
    ["Sovereign map layer", "Own GIS-grade reference maps per theatre — no Maxar lock-in, available where US primes can't go"],
    ["Fresh AO layer", "Annual subscription keeps the area-of-operations layer current as terrain changes"],
    ["Honest confidence", "Position + confidence output and an honest “no fix” — a slot no competitor publishes"],
    ["Career-long nav team", "45+ combined years in geospatial, navigation and UAV systems; national-scale cartography exit"],
  ];
  moats.forEach((m, i) => {
    const x = ML + (i % 4) * 3.05, y = 5.1;
    s.addText(m[0], { x, y, w: 2.8, h: 0.4, fontSize: 12.5, bold: true, fontFace: FONT, color: INK, margin: 0 });
    s.addText(m[1], { x, y: y + 0.42, w: 2.85, h: 1.1, fontSize: 9.5, fontFace: FONT, color: MUTE, margin: 0 });
  });
  footer(s, "07");
}

// =====================================================================
// 8 · MARKET
// =====================================================================
{
  const s = pres.addSlide(); light(s);
  header(s, "07 · MARKET");
  title(s, "A $334M niche inside a $4.8B PNT market.");
  subtitle(s, "≈10,000 nav units per month needed on the UA front alone — validated in 20+ OEM interviews.");

  statFlat(s, ML, 2.75, 3.6, "$4.8B", "TAM · 2030", "Assured-PNT market · 24–29% CAGR · Mordor 2025 / TBRC 2026", { first: true });
  statFlat(s, ML + 4.05, 2.75, 3.6, "$334M", "SAM · 2033", "GPS-denied drone-nav niche, from $149M (2024) · SRI 2026");
  statFlat(s, ML + 8.1, 2.75, 3.6, "$6M", "SOM · Year 1", "2,000 units × $3,000 · bottom-up, ONS est.", { numColor: CHAR });

  s.addShape(pres.ShapeType.rect, { x: ML, y: 5.15, w: CW, h: 1.2, fill: { color: PANEL }, line: { type: "none" } });
  s.addText([
    { text: "Demand signal from the field: ", options: { bold: true, color: INK } },
    { text: "OEM interviews (Jul–Aug 2026) put UA demand at ~10,000 units/month for mid- and deep-strike platforms alone — and ~300 units/month are sellable today through our existing warm OEM network.", options: { color: MUTE } },
  ], { x: ML + 0.3, y: 5.38, w: CW - 0.6, h: 0.85, fontSize: 12.5, fontFace: FONT, margin: 0 });

  footer(s, "08");
}

// =====================================================================
// 9 · APPLICATIONS
// =====================================================================
{
  const s = pres.addSlide(); light(s);
  header(s, "08 · APPLICATIONS");
  title(s, "Defence beachhead first, civil dual-use next.");
  subtitle(s, "Same software stack across platform classes — once MVP validates.");

  s.addText("PRIMARY · YEARS 1–2", { x: ML, y: 2.7, w: 6, h: 0.3, fontSize: 11, bold: true, fontFace: FONT, color: GREEN, charSpacing: 2, margin: 0 });
  const prim = [
    ["UA UAV OEMs", "Frontline serial-production lines — 280+ leads in pipeline, first replies in"],
    ["Allied defence ministries", "UK MoD · USAF · allied procurement"],
    ["OEM integrators", "Drone primes — Rheinmetall, Northrop"],
  ];
  prim.forEach((p, i) => {
    const x = ML + i * 4.05;
    s.addText(p[0], { x, y: 3.08, w: 3.8, h: 0.35, fontSize: 14, bold: true, fontFace: FONT, color: INK, margin: 0 });
    s.addText(p[1], { x, y: 3.46, w: 3.8, h: 0.72, fontSize: 10.5, fontFace: FONT, color: MUTE, margin: 0 });
    if (i > 0) s.addShape(pres.ShapeType.line, { x: x - 0.2, y: 3.08, w: 0, h: 1.05, line: { color: LINE, width: 1 } });
  });

  s.addShape(pres.ShapeType.line, { x: ML, y: 4.45, w: CW, h: 0, line: { color: LINE, width: 1 } });
  s.addText("EXPANSION · DRONE CLASSES · YEARS 2+", { x: ML, y: 4.65, w: 7, h: 0.3, fontSize: 11, bold: true, fontFace: FONT, color: GREEN, charSpacing: 2, margin: 0 });
  const exp = [
    ["ISR drones", "GPS-denied recon missions"],
    ["Deep-strike UAVs", "Long-range autonomous targeting"],
    ["Light aviation", "GNSS-loss backup navigation"],
    ["Swarm formations", "Coordinated multi-platform ops"],
  ];
  exp.forEach((p, i) => {
    const x = ML + i * 3.05;
    s.addText(p[0], { x, y: 5.05, w: 2.85, h: 0.32, fontSize: 12.5, bold: true, fontFace: FONT, color: INK, margin: 0 });
    s.addText(p[1], { x, y: 5.4, w: 2.85, h: 0.6, fontSize: 9.5, fontFace: FONT, color: MUTE, margin: 0 });
  });

  s.addText("Civil dual-use: Assured PNT · Logistics / BVLOS · Aviation backup · Emergency response.", {
    x: ML, y: 6.3, w: CW, h: 0.35, fontSize: 10.5, fontFace: FONT, italic: true, color: MUTE, margin: 0,
  });
  footer(s, "09");
}

// =====================================================================
// 10 · BUSINESS MODEL
// =====================================================================
{
  const s = pres.addSlide(); light(s);
  header(s, "09 · BUSINESS MODEL");
  title(s, "Module plus recurring map subscription.");
  subtitle(s, "Pricing validated in 20+ OEM & operator interviews, Jul–Aug 2026.");

  const cols = [
    ["$3,000", "Module + annual maps", "Per-unit benchmark price + recurring map subscription. BOM $1.0–1.5K leaves hardware margin plus software-grade recurring revenue."],
    ["3–5 m", "Premium accuracy tier", "Correctors / last-mile precision for platforms where accuracy beats price — the price-insensitive segment."],
    ["Royalty", "OEM integrators", "Per-platform royalty + IP licensing for primes integrating the stack at scale."],
  ];
  cols.forEach((c, i) => {
    const x = ML + i * 4.05;
    if (i > 0) s.addShape(pres.ShapeType.line, { x: x - 0.2, y: 2.85, w: 0, h: 2.1, line: { color: LINE, width: 1 } });
    s.addText(c[1], { x, y: 2.8, w: 3.8, h: 0.35, fontSize: 11, bold: true, fontFace: FONT, color: MUTE, charSpacing: 0.5, margin: 0 });
    s.addText(c[0], { x, y: 3.15, w: 3.8, h: 0.75, fontSize: 40, fontFace: FONT, color: GREEN, margin: 0 });
    s.addText(c[2], { x, y: 3.95, w: 3.8, h: 1.0, fontSize: 10.5, fontFace: FONT, color: MUTE, margin: 0 });
  });

  s.addShape(pres.ShapeType.rect, { x: ML, y: 5.35, w: CW, h: 1.0, fill: { color: PANEL }, line: { type: "none" } });
  s.addText([
    { text: "Y1 benchmark: 2,000 units × $3,000 = $6M. ", options: { bold: true, color: INK } },
    { text: "Interviews confirm a two-tier market — price-critical mass (mid-strike) and price-insensitive precision — and the module + subscription model serves both.", options: { color: MUTE } },
  ], { x: ML + 0.3, y: 5.55, w: CW - 0.6, h: 0.7, fontSize: 12, fontFace: FONT, margin: 0 });

  footer(s, "10");
}

// =====================================================================
// 11 · ROADMAP
// =====================================================================
{
  const s = pres.addSlide(); light(s);
  header(s, "10 · ROADMAP");
  title(s, "Hardware in production, MVP in 6–9 months.");
  subtitle(s, "Each phase converts capital into measurable validation. Path to Seed is clear.");

  const phases = [
    ["PHASE 1 · DONE", "Core algorithm", ["Map-matching algorithm live", "Field flights: 17 m median, ~3 m best", "300 ms/frame processing"], "Bootstrapped"],
    ["PHASE 2 · NOW", "Hardware prototypes", ["First units in manufacturing", "3 units flying by end of Aug", "MAVLink external-GPS integration", "Test range secured (Lviv)"], "Pre-Seed $500K"],
    ["PHASE 3 · M6–M9", "Working MVP", ["GPS-free flight validated", "≤5 m CEP target met", "10-unit batch in OEM trials", "Night-mode prototype"], "+ UK DASA Open Call"],
    ["PHASE 4 · M9–M12", "Seed round", ["LOI × 3–5 from UA OEMs", "DASA / DIANA decision", "Seed raise launched"], "Seed $3M–$3.5M target"],
  ];
  phases.forEach((p, i) => {
    const x = ML + i * 3.05, w = 2.85;
    const isNow = i === 1;
    if (isNow) s.addShape(pres.ShapeType.rect, { x: x - 0.12, y: 2.68, w: w + 0.24, h: 3.6, fill: { color: PANEL }, line: { type: "none" } });
    s.addText(p[0], { x, y: 2.82, w, h: 0.3, fontSize: 9.5, bold: true, fontFace: FONT, color: isNow ? GREEN : MUTE, charSpacing: 1, margin: 0 });
    s.addText(p[1], { x, y: 3.12, w, h: 0.4, fontSize: 15, bold: true, fontFace: FONT, color: INK, margin: 0 });
    s.addShape(pres.ShapeType.line, { x, y: 3.6, w: 0.5, h: 0, line: { color: GREEN, width: 1.5 } });
    s.addText(p[2].map((t, j) => ({ text: t, options: { bullet: { code: "2022", indent: 12 }, breakLine: j < p[2].length - 1, color: INK } })),
      { x, y: 3.78, w: w - 0.05, h: 1.9, fontSize: 9.5, fontFace: FONT, paraSpaceAfter: 5, margin: 0 });
    s.addText(p[3], { x, y: 5.85, w, h: 0.35, fontSize: 10, bold: true, fontFace: FONT, color: GREEN, margin: 0 });
  });
  footer(s, "11");
}

// =====================================================================
// 12 · TEAM
// =====================================================================
{
  const s = pres.addSlide(); light(s);
  header(s, "11 · TEAM");
  title(s, "Three founders. Five years together.");
  subtitle(s, "45+ combined years in geospatial, navigation, and UAV systems.");

  const team = [
    ["E", "Eugene", "CEO · Co-Founder", "20+ YEARS GEOSPATIAL", "Built a national-scale cartography company 2016–2023. Founded GIS-POINT (UK), maker of FLY BY."],
    ["A", "Andrew", "CTO · Co-Founder", "FULL-STACK ENGINEERING", "10+ years scalable software systems. Owner of ONS algorithms — map-matching, IMU fusion, autopilot integration."],
    ["D", "Dr. Alex", "Chief Scientific Advisor · Co-Founder", "30 YEARS · PRIOR EXIT", "PhD, 30+ years navigation & UAV systems. Built and exited a prior UAV company. Chair, All-Ukrainian AeroGeodetic Association."],
  ];
  team.forEach((t, i) => {
    const x = ML + i * 4.05;
    if (i > 0) s.addShape(pres.ShapeType.line, { x: x - 0.2, y: 2.8, w: 0, h: 3.0, line: { color: LINE, width: 1 } });
    s.addShape(pres.ShapeType.ellipse, { x, y: 2.8, w: 0.8, h: 0.8, fill: { type: "none" }, line: { color: GREEN, width: 1.25 } });
    s.addText(t[0], { x, y: 2.8, w: 0.8, h: 0.8, fontSize: 26, bold: true, fontFace: FONT, color: GREEN, align: "center", valign: "middle", margin: 0 });
    s.addText(t[3], { x, y: 3.78, w: 3.8, h: 0.28, fontSize: 9, bold: true, fontFace: FONT, color: GREEN, charSpacing: 1.5, margin: 0 });
    s.addText(t[1], { x, y: 4.08, w: 3.8, h: 0.4, fontSize: 18, bold: true, fontFace: FONT, color: INK, margin: 0 });
    s.addText(t[2], { x, y: 4.5, w: 3.8, h: 0.3, fontSize: 10.5, fontFace: FONT, color: MUTE, margin: 0 });
    s.addText(t[4], { x, y: 4.85, w: 3.8, h: 1.0, fontSize: 10, fontFace: FONT, color: MUTE, margin: 0 });
  });

  s.addShape(pres.ShapeType.line, { x: ML, y: 6.1, w: CW, h: 0, line: { color: LINE, width: 1 } });
  s.addText("Together since 2021 — the team that builds the maps now builds the navigation. Lean, capital-efficient.", {
    x: ML, y: 6.22, w: CW, h: 0.35, fontSize: 10.5, fontFace: FONT, italic: true, color: MUTE, margin: 0,
  });
  footer(s, "12");
}

// =====================================================================
// 13 · ASK
// =====================================================================
{
  const s = pres.addSlide(); light(s);
  header(s, "12 · ASK");
  title(s, "Pre-Seed: $500K from prototype to MVP.");
  subtitle(s, "SAFE · $2.25M valuation cap · 20% discount · founders co-investing alongside.");

  // left — use of funds
  s.addText("USE OF FUNDS", { x: ML, y: 2.75, w: 5, h: 0.3, fontSize: 11, bold: true, fontFace: FONT, color: GREEN, charSpacing: 2, margin: 0 });
  const funds = [
    [40, "Engineering — algorithm, sensor fusion, integration"],
    [20, "Field testing & prototype manufacturing"],
    [15, "Geo-data — SCOUT map layer"],
    [10, "Legal & IP — patents UK + EU"],
    [10, "Compute & tooling — dev infrastructure"],
    [5,  "Operations & travel"],
  ];
  funds.forEach((f, i) => {
    const y = 3.2 + i * 0.55;
    const bw = 2.6 * (f[0] / 40);
    s.addShape(pres.ShapeType.rect, { x: ML, y: y + 0.04, w: 2.6, h: 0.26, fill: { color: PANEL }, line: { type: "none" } });
    s.addShape(pres.ShapeType.rect, { x: ML, y: y + 0.04, w: Math.max(bw, 0.4), h: 0.26, fill: { color: GREEN }, line: { type: "none" } });
    s.addText(f[0] + "%", { x: ML + 0.08, y: y + 0.04, w: 0.8, h: 0.26, fontSize: 10, bold: true, fontFace: FONT, color: "FFFFFF", valign: "middle", margin: 0 });
    s.addText(f[1], { x: ML + 2.8, y: y + 0.02, w: 3.1, h: 0.5, fontSize: 9.5, fontFace: FONT, color: INK, margin: 0 });
  });

  // right — momentum panel
  s.addShape(pres.ShapeType.rect, { x: ML + 7.1, y: 2.7, w: 4.73, h: 3.75, fill: { color: PANEL }, line: { type: "none" } });
  s.addText("MOMENTUM & NON-DILUTIVE PIPELINE", { x: ML + 7.4, y: 2.9, w: 4.2, h: 0.3, fontSize: 10.5, bold: true, fontFace: FONT, color: GREEN, charSpacing: 1, margin: 0 });
  const mom = [
    ["41", "accelerator & VC applications submitted (US, EU, UA) — decisions from late Sep 2026"],
    ["280+", "OEM leads in outreach; first interested replies, expo meetings booked (MSPO Poland, Sep)"],
    ["£350K", "UK DASA Open Call — defence-tech, planned"],
    ["€150K+", "NATO DIANA / EU dual-use grants — co-bid with UA partner, planned"],
  ];
  mom.forEach((m, i) => {
    const y = 3.32 + i * 0.78;
    s.addText(m[0], { x: ML + 7.4, y, w: 1.2, h: 0.5, fontSize: 17, bold: true, fontFace: FONT, color: GREEN, margin: 0 });
    s.addText(m[1], { x: ML + 8.65, y: y + 0.02, w: 3.05, h: 0.78, fontSize: 9.5, fontFace: FONT, color: INK, margin: 0 });
  });

  s.addText("6–9 months from close to working MVP: GPS-free flight validated, ≤5 m CEP target, 10-unit OEM trial fleet.", {
    x: ML, y: 6.62, w: CW, h: 0.35, fontSize: 10.5, fontFace: FONT, italic: true, color: MUTE, margin: 0,
  });
  footer(s, "13");
}

// =====================================================================
// 14 · EXIT (dark close)
// =====================================================================
{
  const s = pres.addSlide(); dark(s);
  s.addText("ONS", { x: ML, y: 0.42, w: 3, h: 0.3, fontSize: 12, bold: true, fontFace: FONT, color: PAPER, charSpacing: 2, margin: 0 });
  s.addText("13 · EXIT", { x: W - ML - 5, y: 0.42, w: 5, h: 0.3, fontSize: 11, fontFace: FONT, color: PAPERM, align: "right", charSpacing: 2, margin: 0 });
  s.addShape(pres.ShapeType.line, { x: ML, y: 0.82, w: CW, h: 0, line: { color: DLINE, width: 1 } });

  s.addText("Defence-nav M&A is funding the path to exit.", { x: ML, y: 1.15, w: CW, h: 0.9, fontSize: 34, bold: true, fontFace: FONT, color: PAPER, margin: 0 });
  s.addText("Active M&A and capital flows in defence-tech navigation.", { x: ML, y: 2.02, w: CW, h: 0.4, fontSize: 15, fontFace: FONT, color: PAPERM, margin: 0 });

  const exits = [
    ["01", "Strategic acquisition by drone prime", "Anduril, Shield AI, Northrop, Rheinmetall — actively acquiring nav stacks.", "Auterion $130M Series B · ~$600M val"],
    ["02", "Acquisition by avionics / defence integrator", "Garmin, Honeywell, BAE, Leonardo — building GPS-denied product lines.", "Xona $320M raised · Asio $15M + Anduril"],
    ["03", "Series A → B → IPO path", "If beachhead converts to $20M+ ARR by Y4 — defence-tech IPO window.", "Anello $25M + $20M DoD APFIT"],
  ];
  exits.forEach((e, i) => {
    const y = 2.95 + i * 1.25;
    s.addText(e[0], { x: ML, y, w: 0.7, h: 0.5, fontSize: 17, fontFace: FONT, color: GREENL, margin: 0 });
    s.addText(e[1], { x: ML + 0.75, y: y - 0.02, w: 7.0, h: 0.4, fontSize: 15, bold: true, fontFace: FONT, color: PAPER, margin: 0 });
    s.addText(e[2], { x: ML + 0.75, y: y + 0.38, w: 7.0, h: 0.5, fontSize: 10.5, fontFace: FONT, color: PAPERM, margin: 0 });
    s.addText(e[3], { x: ML + 8.0, y: y, w: 3.85, h: 0.7, fontSize: 10.5, italic: true, fontFace: FONT, color: GREENL, valign: "top", margin: 0 });
    if (i < 2) s.addShape(pres.ShapeType.line, { x: ML, y: y + 1.0, w: CW, h: 0, line: { color: DLINE, width: 1 } });
  });

  s.addText("PRE-SEED · 2026", { x: ML, y: H - 0.45, w: 4, h: 0.3, fontSize: 9, fontFace: FONT, color: PAPERM, charSpacing: 1.5, margin: 0 });
  s.addText("14 / " + TOTAL, { x: W - ML - 1.4, y: H - 0.45, w: 1.4, h: 0.3, fontSize: 9, fontFace: FONT, color: PAPERM, align: "right", charSpacing: 1.5, margin: 0 });
}

// =====================================================================
// 15 · APPENDIX · COMPETITION
// =====================================================================
{
  const s = pres.addSlide(); light(s);
  header(s, "APPENDIX · COMPETITION · AUG 2026");
  title(s, "Nobody owns the map + honesty slot.", { fontSize: 32 });
  subtitle(s, "Landscape scan, Aug 2026 — nobody offers a sovereign fresh map with a transparent CEP.", 1.95);

  const rows = [
    ["Company", "HQ", "Funding / traction", "Accuracy (denied)", "Position vs ONS"],
    ["Theseus", "USA", "$4.3M seed · SOCOM", "52 m median / 564 km", "Closest direct comp — same approach, no own map, no confidence output"],
    ["Vermeer", "US–UA", "$10M Series A (Draper)", "not disclosed", "Combat-proven kit at ~$20K/unit — not attritable-priced"],
    ["Asio Tech", "Israel", "$15M + Anduril · 10K combat hrs", "drift-free, CEP n/d", "Premium module benchmark — CEP & price not published"],
    ["Twist Robotics", "Ukraine", "500K km · ~25K sorties", "~20 m, no cumulative drift", "Mass UA incumbent — we beat on accuracy target & fresh map"],
    ["Delian", "Greece", "~$20M", "≤15 m, ≤0.1% error", "Deep-strike focus — adjacent to our phase 2"],
    ["ONS / FLY BY", "UK–UA", "$500K Pre-Seed (this round)", "17 m field-tested · ≤5 m target", "Sovereign fresh map IP + honest confidence + attritable price"],
  ];
  const colX = [ML, ML + 2.1, ML + 3.15, ML + 5.85, ML + 8.0];
  const colW = [2.0, 0.95, 2.6, 2.05, 3.9];
  let y = 2.55;
  rows.forEach((r, ri) => {
    const isHead = ri === 0, isOns = ri === rows.length - 1;
    const rh = isHead ? 0.34 : 0.56;
    if (isOns) s.addShape(pres.ShapeType.rect, { x: ML - 0.12, y: y - 0.04, w: CW + 0.24, h: rh + 0.06, fill: { color: PANEL }, line: { type: "none" } });
    r.forEach((cell, ci) => {
      s.addText(cell, {
        x: colX[ci], y, w: colW[ci], h: rh, margin: 0, fontFace: FONT,
        fontSize: isHead ? 10 : 9.5,
        bold: isHead || (!isHead && ci === 0),
        color: isHead ? MUTE : isOns ? (ci === 0 ? GREEN : INK) : (ci === 0 ? INK : MUTE),
        charSpacing: isHead ? 1 : 0,
        valign: "middle",
      });
    });
    if (isHead) s.addShape(pres.ShapeType.line, { x: ML, y: y + rh, w: CW, h: 0, line: { color: LINE, width: 1 } });
    y += rh + (isHead ? 0.12 : 0.06);
  });

  s.addText("Sources: open reporting Aug 2026 (Theseus field report, Brave1, Draper, company disclosures). Independent benchmarks are not ONS results.", {
    x: ML, y: 6.78, w: CW, h: 0.28, fontSize: 9, fontFace: FONT, italic: true, color: MUTE, margin: 0,
  });
  footer(s, "A");
}

pres.writeFile({ fileName: "FlyBy_ONS_PreSeed_2026_v2.pptx" }).then(() => console.log("written"));
