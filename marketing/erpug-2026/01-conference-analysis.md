# ERPUG 2026 — conference analysis & industry insights

Source: auto-generated transcript of the day-2 afternoon sessions of ERPUG 2026 (European Road Profile Users' Group).
The transcript is noisy (speech-to-text errors), so **names, numbers and product names marked ⚠ must be checked
against the official slides/proceedings before anything is published externally.**

---

## 1. What was presented (session by session)

### 1.1 Multi-purpose survey systems + same-day IRI certification (most likely TopoDOT / Certainty 3D ⚠)
- Core message: **one survey run should feed many analyses** — pavement condition, digital inputs for asset
  management, data assessment, geotechnical/geologic consent work, implementation assessment.
- Economic framing: with tight public budgets, a system that delivers *several* analyses from the *same*
  investment and the *same* drive is "better use of our financial resources — everyone wins".
  "Not only focus on the ground, but also *under* the ground" (surface + subsurface, i.e. GPR-type data ⚠).
- Claim: **250+ software application tools** available for demo — "tip of the iceberg".
- **IRI certification at NCAT** (National Center for Asphalt Technology, Auburn University, USA) together with a
  US Department of Transportation team: equipment supplied/operated and data processed by the vendor; the systems
  passed on every test section — dense-graded asphalt, SMA ⚠, open-graded friction courses — meeting
  **AASHTO R 56 and R 57**.
- Operational proof point: **capture → process → deliver within one day (≈10 hours)**; nobody could leave the site
  without results. Contrast drawn with slower certification regimes in Europe.
- Next: further certification target (≈450 km ⚠) and **UK PAS 2161 assessment (levels/tiers 1–5)** with a partner team.

### 1.2 Modernising a national condition-survey process (German-style "ZEB"-type process ⚠)
- Existing national process has been around for years, "not bad, but small changes can improve it a lot".
- Transverse evenness: **surface lidar / line scanner** with ~1,800 points per scan line at 2 mm spacing, but the
  standard process **reduces it to 32 points per profile** — huge data waste. Full data allows rut/evenness
  analysis of the whole surface, detection of construction defects (e.g. paver/joint artefacts).
- Positioning: current requirement is loose (≈95% within 10 m). Modern GNSS/INS gives **cm-level** in open sky and
  controlled drift in tunnels. Multi-pass surveys can be co-registered with 3D data → georeferenced surface images.
- Recommendations (the "upgrade path"):
  1. **Proper GNSS/INS positioning** → real georeferenced objects in a global coordinate system.
  2. **Panoramic (360°) camera** instead of only forward-facing — users are used to Street-View-like imagery,
     and objects beyond the road corridor become analysable.
  3. **3D mobile laser scanning** (≈2 M points/s class) → as-built vs. design checks, bridge clearance,
     guardrail height, drainage, road furniture — "makes the data much more versatile, not only road condition".
  4. **AI on images + depth/3D** → objects located in the real world, with **human in the loop** for QA.

### 1.3 Vaisala Xweather — RoadAI: smartphone computer vision, "where are we now, where are we going" (Lucas ⚠)
- Operational since 2018; ~**500 road authorities** (US, Europe, Australia, Middle East);
  ~**7.5 million km analysed per year**.
- Phone on windscreen, press play; AI maps potholes, cracks, ravelling, line markings, signs, guardrails, flooding.
  **Same-day results** with a stable mobile connection.
- Repeatability study: 40 km, two RoadAI vehicles vs. two engineers doing visual inspection — AI was
  substantially more repeatable (transcript says "103%" ⚠). Customers migrate from manual visual inspection
  to AI for **objective, repeatable** data.
- **UK PAS 2161**: DfT England created a national test on accuracy/repeatability, invited vendors, and
  publishes an **approved technology list** local authorities must pick from → creates demand and forces
  vendors to meet a standard.
- New use cases: **bike lanes** (Helsinki modal-shift goals), **gravel roads** (Finland may downgrade
  deteriorated paved roads to gravel).
- Future: **no single technology wins** → fuse computer vision + **connected-vehicle roughness data** +
  **weather** (Vaisala's 1936 heritage) + **AI agents**, with the engineer as final decision-maker.
- Honest about limits: smartphone GPS ≈ 3 m (1 Hz); add external GNSS for better; results aggregated to
  segments, so it is a network-level tool, not a project-level one.

### 1.4 Pavemetrics — LCMS & software V5
- LCMS = 3D laser profiling, ~1 mm accuracy at highway speed, >100 M points/s ⚠, **~3 GB per km**.
  Many processing modules → long processing times; clients want faster delivery and lower labour.
- **V5**: multi-core + **GPU processing → 3–6× faster**; new file format **~40% better compression**
  (≈2× effective storage); new **AI surface-defect (crack) detection**; new **ravelling** measurement;
  new higher-accuracy cameras coming.

### 1.5 ARRB (Australian Road Research Board) — new survey vehicle "Salus" ⚠
- Owned by Australian road agencies, 30+ years of network surveys; legacy fleet end-of-life.
- Client asks: **faster access to data**, ability to **merge with other data** for better deterioration models,
  low cost with high accuracy. Legacy archive ≈ 20 PB ⚠.
- Design: modular (LCMS + other sensors), **automated route planning** (minimum driving), tablet with
  **live QA during capture**, **on-board processing**, upload via **Starlink / 4G / 5G**, cloud DB + AI tools +
  web portal. Result: **capture → visible in portal in 2–3 days** (goal was <1 week).
- Practical engineering: self-cleaning camera housing (water + compressed air, tech borrowed from defence),
  designed for remote outback operations.

### 1.6 Community / organisation
- **ERPUG 2027 will be held on board the SS Rotterdam** (Rotterdam, NL) — whole conference + exhibition on the ship,
  explicitly building a bridge to the US sister organisation (RPUG).
- Organisers run an anonymous presenter evaluation poll → programme is user-driven.

---

## 2. Cross-cutting insights (what the room agreed on)

| # | Insight | Evidence from the day |
|---|---------|-----------------------|
| 1 | **Speed of delivery is now a primary buying criterion.** | Same-day IRI certification; RoadAI same-day; Pavemetrics V5 3–6× faster; ARRB 2–3 days to portal. |
| 2 | **"Survey once, use many times."** Budgets force multi-purpose data. | Multi-analysis pitch; 3D lidar for as-built, clearances, guardrails; ARRB merging datasets. |
| 3 | **Certification & standardisation are the market gate.** | NCAT / AASHTO R56–R57; UK PAS 2161 approved-technology list. |
| 4 | **Data volume is the new bottleneck** (storage, transfer, processing). | 3 GB/km, 20 PB archives, compression, GPU, edge processing, Starlink upload. |
| 5 | **Positioning quality is underrated** and unlocks digital twins. | 10 m tolerance vs. cm-level GNSS/INS; smartphone 3 m caveat. |
| 6 | **AI is everywhere, but the human stays in the loop.** | Human QA in national process; RoadAI "engineer has final control". |
| 7 | **Tiered technology stack:** low-cost frequent monitoring + high-accuracy periodic surveys. | Smartphone CV + connected cars for network trends; LCMS/lidar for engineering-grade data. |
| 8 | **Scope is widening** beyond motorways. | Bike lanes, gravel roads, urban streets, subsurface. |
| 9 | **Data fusion is the future product**, not a single sensor. | CV + roughness + weather + 3D + AI agents. |

## 3. Where the industry is going (2026 → 2030)

1. **From periodic surveys to continuous monitoring.** Network-level condition refreshed weekly/monthly from
   smartphones, fleets and connected vehicles; high-end vehicles used for calibration and engineering detail.
2. **From condition data to road digital twins.** Georeferenced 3D + panoramic imagery + condition layers in one
   GIS model; as-built checks, clearances, assets, drainage — reused by many departments.
3. **Edge + cloud pipelines.** Processing on board, satellite/5G upload, cloud portals; "days, not weeks".
4. **Standards-driven procurement.** PAS 2161-style approved lists and AASHTO/CEN certification will spread;
   vendors without certified, repeatable results get filtered out.
5. **AI agents on top of road data.** Natural-language questions, automatic work-order proposals, budget scenarios —
   with engineers signing off.
6. **Predictive maintenance via fusion.** Condition × traffic × weather × subsurface → deterioration models and
   preventive treatment planning.
7. **Value-for-money narrative.** Every survey must justify itself across several use cases and departments.

## 4. Implications for GIS-Point

- **Opportunity:** GIS-Point sits exactly where the industry is heading — at the *integration* layer (survey data →
  GIS → decisions). The winners won't be the ones with one sensor; they'll be the ones who **fuse data and deliver
  answers fast**.
- **Threat:** low-cost smartphone AI commoditises basic visual condition surveys. Competing on "we drive and film"
  alone will lose on price.
- **Gap to close:** certifications/benchmarks (IRI per AASHTO R56/R57 or EN equivalents, PAS 2161-type tests),
  documented repeatability, and published turnaround times.
- See [`02-gis-point-marketing-playbook.md`](./02-gis-point-marketing-playbook.md) for messaging and lead-gen plan.
