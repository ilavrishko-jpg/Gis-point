# FlyBy — Pre-Seed Marketing & Investment Research
### Optical / visual navigation for GPS-denied military UAVs
**Prepared for:** GIS-Point / FlyBy founding team · **Round:** $500K–$1M pre-seed · **Date:** July 2026
**Product:** https://flyby.gis-point.com/ · **Stage:** Pre-revenue / MVP

> **How to read this document.** Every market/competitor number below is tagged by evidence strength.
> `[P]` = primary source (RUSI, NATO STO, peer-reviewed, company press release, Federal Register).
> `[S]` = secondary syndicated market-research firm (directional, ~1.6× cross-firm variance — label as
> "vendor estimate" in the deck). `[M]` = our model/assumption (bottom-up, stated inputs). Refuted or
> unreliable data points were removed in adversarial verification and are listed in the Appendix so you
> never put them in front of an investor.

---

## 0. Executive summary

**The one-liner.** FlyBy turns a drone's camera into a GPS. It gives military UAVs absolute
positioning in GPS/GNSS-denied airspace — immune to jamming and spoofing because it emits nothing and
trusts no external signal — so ISR and strike drones complete the mission when the satellite link is gone.

**Why this is fundable right now:**
- **The problem is quantified and severe.** Ukraine was losing **~10,000 drones/month**, mainly to Russian
  electronic jamming `[P: RUSI 2023]`, and **60–80% of FPV drones fail to reach their target** on parts of
  the front `[P: RUSI Feb 2025]`. GNSS denial is now the *default* battlefield condition.
- **The market is real and compounding.** The **Assured PNT** market — FlyBy's exact category — is
  **~$846M in 2025 → $10.2B by 2035 (28.4% CAGR)**, with **military/defense ~46% of it** `[S: GMInsights]`.
- **Investors are actively funding this exact thesis.** Advanced Navigation raised **$110M** (Mar 2026),
  Auterion **$130M** (Sept 2025) and won a **$50M Pentagon contract for 33,000 visual-navigation strike
  kits for Ukraine**, and ANELLO Photonics raised **$25M** for GPS-denied nav (May 2026) `[P]`.
- **There's a real technical gap to own.** Published GPS-denied visual/terrain nav lands at **~11–20 m
  error** `[P: SPRIN-D/ICRA 2026; MDPI 2026]` — feasible but *not* GPS-grade, and brittle in low-light /
  texture-scarce / seasonal conditions `[P: NATO STO]`. Robustness-under-hard-conditions is the wedge.
- **FlyBy has an unfair advantage:** GIS-Point's georeferenced base-map pipeline (the hard part of turning
  a camera into lat/long) + access to the world's only live GPS-denied combat-testing environment.

**The ask (recommended):** Raise **$750K on a post-money SAFE at a ~$5–6M cap**, stacked with
**$0.5–1.0M non-dilutive** (Brave1 / NATO Innovation Fund / EU) for a ~$1.3–1.75M effective 18-month
budget. Deploy it to reach **TRL 6–7 with a hard field-proven accuracy metric under jamming, 3 design-
partner OEMs, and ≥1 paid integration** — the milestone set that unlocks a $3–5M seed at a 3–4× step-up.

---

## 1. Company & product

**FlyBy** (by **GIS-Point**, a ~50-person Ukrainian geospatial company scaling toward 100) is an
**optical/visual navigation system for UAVs** that provides positioning **without GNSS**. It is designed
for military drones: **ISR, deep-strike / long-range one-way-attack, and other combat UAVs**.

**The product (as we frame it to investors):** a **navigation stack (SDK) + reference hardware module**
that delivers GPS-denied positioning through three layers:

| Layer | Function | Output | Role |
|---|---|---|---|
| **Visual-inertial odometry (VIO)** | Dead-reckon from camera + IMU | Relative motion | Fast, always-on — but drifts without bound over km-scale flight `[P: SPRIN-D]` |
| **Visual / terrain-relative matching** | Match live imagery to a georeferenced base map | **Absolute lat/long** | The defensible core — resets drift, delivers GPS-equivalent coordinates |
| **Scene / landmark recognition** | ML target/landmark ID | Terminal correction | Terminal guidance for strike drones (modernized DSMAC) |

**Why GIS-Point wins this specifically:** the hard, unsexy part of camera-as-GPS is not the neural net —
it's the **georeferenced base-map ingestion, alignment, and matching pipeline**. That is GIS-Point's core
business. FlyBy is a defense application of an existing, differentiated geospatial competence, not a
from-scratch bet.

---

## 2. The problem (with evidence)

GNSS is the single point of failure in modern drone warfare. In contested airspace it fails two ways:
- **Jamming** — the signal is drowned out; the drone loses position, drifts, aborts, or crashes.
- **Spoofing** — a false signal walks the drone off-course or captures it, silently.

**The scale, quantified from the live war:**
- **~10,000 drones/month** lost by Ukraine, **mainly to Russian electronic jamming** `[P: RUSI 2023 via Forbes, May 2023]`.
- **60–80% of Ukrainian FPV drones fail to reach their target**, driven largely by EW `[P: RUSI, Feb 2025]`.
- Ukraine began **fielding neural-network optical navigation** to let drones finish missions when *all*
  radio and satellite links are jammed — **from Dec 2024** `[P: IEEE Spectrum]`. *This is direct validation
  that FlyBy's approach is the one the front is already reaching for.*
- The competing jam-immune approach — **fibre-optic wire-guided drones** — proves the demand is real but
  is range/logistics-limited (a spool of cable). Optical navigation is the wireless, longer-range answer.

> **Honest caveat for the deck:** the 60–80% FPV failure figure blends *control/video-link* jamming with
> *GNSS* denial. Use it to size the pain, but be precise that FlyBy solves the **navigation** half. This
> nuance builds credibility with technical investors rather than undermining the pitch.

---

## 3. Market opportunity (TAM / SAM / SOM)

No syndicated report sizes "optical/visual UAV navigation" directly — so we present a **top-down proxy**
(the alt-PNT category investors already believe in) **and** a **bottom-up attach model** (the honest,
defensible primary). Lead with bottom-up; use top-down as the tailwind.

### 3.1 Top-down (category proxy) `[S]`
| Market | 2025 | Forecast | CAGR | Relevance |
|---|---|---|---|---|
| **Assured PNT** (FlyBy's category) | **$846M** | **$10.2B by 2035** | **28.4%** | Military ~**46%** of it `[S: GMInsights]` |
| PNT Solution | $1.56B | $2.6B by 2030 | 10.7% | Adjacent corroboration `[S: R&M/TBRC]` |
| LEO PNT | $0.07B | $0.57B by 2030 | 53.9% | Competing satellite approach — context only `[S: MarketsandMarkets]` |

→ **Implied defense Assured-PNT slice ≈ $390M (2025) growing toward multi-billion by 2035.** Treat these
as *vendor estimates* (opaque methods, cross-firm variance). They set the tailwind, not the plan.

### 3.2 Bottom-up (attach model — our primary) `[M]`
FlyBy monetizes as a **per-airframe navigation license (± hardware)**. Market = drone volume × attach × price.

| Scenario | Addressable UAVs/yr needing alt-PNT (UA + allied) | FlyBy blended price/unit | **Annual TAM** |
|---|---|---|---|
| Conservative | 500,000 | $150 | **$75M** |
| **Base** | **1,500,000** | **$400** | **$600M** |
| Aggressive | 3,000,000 | $900 | **$2.7B** |

- **SAM (3-yr reachable — UA OEMs + early allied):** ~10–15% of base → **$60–90M/yr**.
- **SOM (Year-3 realistic capture):** ~1–3% of SAM → **$1–3M revenue** (see §9).

> Volume rationale: front-line attrition means drones are consumed by the hundreds of thousands per year;
> even a modest per-unit nav license against that volume is a large, recurring market. This is why a
> *module* beats a *platform* here — you attach to everyone's airframe.

---

## 4. Competitive landscape

Heavy, current investor appetite validates the category — and the funded leaders are mostly **inertial /
optical-gyro**, leaving the **camera-primary, map-matching, low-SWaP-C, drone-attach-price** lane open.

| Company | Approach | Recent funding | Position vs FlyBy |
|---|---|---|---|
| **Auterion** | Drone autonomy OS + visual nav / terminal guidance | **$130M Series B**, >$600M val (Sept 2025); **$50M Pentagon deal, 33,000 kits for Ukraine** `[P]` | Platform player, not a drop-in nav module; validates buyer & battlefield. Partner/channel as much as rival. |
| **Advanced Navigation** | Multi-sensor **inertial**-centric GNSS-denied fusion (AdNav) | **$110M Series C**, ~$1B val (Mar 2026) `[P]` | Inertial core → drifts without absolute fix; premium/industrial. FlyBy's map-matching is complementary/differentiated. |
| **ANELLO Photonics** | **SiPhOG optical-gyro** INS, no cameras | **$25M Series B-2**, Lockheed Martin Ventures (May 2026) `[P]` | Optical *gyro* (IMU), not optical *vision*. Different physics; also drift-bounded, not absolute. |
| **Sightec** | Camera-primary visual navigation | Limited public data (source unreliable) | Closest *approach* analog — differentiate on Ukraine proof + GIS map pipeline + price. |
| **Shield AI / Anduril** | Big-defense autonomy (Hivemind / Lattice) | Mega-funded | Platform-locked, expensive, not sold as a low-cost attach module. FlyBy competes on price/SWaP/agnosticism. |
| **Honeywell / Safran** | Tactical-grade INS | Incumbent | Expensive, heavy; dead-reckoning drifts. FlyBy is the cheap absolute-fix layer. |

**The gap FlyBy targets:** the funded winners solve *relative* drift (inertial/gyro) or sell *platforms*.
Almost none deliver a **cheap, passive, camera-based *absolute* fix** against a georeferenced map at
FPV-attach price points — the exact thing the Ukrainian front is manually building today.

---

## 5. Technology, differentiation & moat

**Technical feasibility is established, GPS-grade accuracy is not — and that's the opportunity** `[P]`:
- Vision-based nav is "independent of external localization, safe against jamming/spoofing, needs no radio
  infrastructure" `[P: NATO STO / Fraunhofer FKIE]`.
- Benchmarks: **RMSE < 11 m** over km-scale flight (SPRIN-D Challenge winner, ICRA 2026); **19.5 m** mean
  error for a training-free visual localizer on rural low-altitude flight (MDPI Drones, 2026) `[P]`.
- **VIO alone "drifts without bound"** — you *need* the absolute map-matching fix `[P: SPRIN-D]`. This is
  precisely FlyBy's core layer.
- Open gap: **robustness collapses** in low-light, texture-scarce, and seasonal/appearance-change
  conditions `[P: NATO STO]`. **Whoever solves robustness wins.**

**FlyBy's moat (in priority order):**
1. **Georeferenced base-map + matching pipeline** — GIS-Point's core competence; hard to replicate, compounds with data.
2. **Battle-tested tuning dataset** from the Ukrainian front — a proprietary asset no Western competitor can obtain.
3. **OEM design-ins & autopilot integrations** (PX4/ArduPilot + closed stacks) — switching cost once embedded.
4. **Speed + sovereignty** — a jam-proof, non-US PNT source is strategically attractive to allied buyers hedging supply chains.

---

## 6. ICP, buyer personas & positioning

### Ideal Customer Profile
- **Primary (design partners / first revenue):** Ukrainian drone OEMs building ISR and deep-strike UAVs —
  volume, urgency, budget (state contracts + Brave1), fastest integration cycle on earth.
- **Secondary (scale / higher ACV):** NATO/allied drone manufacturers & prime integrators needing alt-PNT
  to win MoD tenders; loitering-munition/long-range strike programs (highest willingness to pay).
- **Tertiary (dual-use optionality):** commercial GPS-denied autonomy (BVLOS logistics, inspection, mining,
  agriculture) — a grant-funding and export-flexibility hedge, **not** the wedge.

### Buyer personas
| Persona | Cares about | Winning message |
|---|---|---|
| **CTO / Head of R&D, drone OEM** | Accuracy, drift, SWaP-C, integration effort, latency | "Drop-in alt-PNT; absolute lat/long over your AO, integrated in weeks via our SDK." |
| **MoD requirements / codification officer** | Mission completion under EW, TRL, field proof | "Field-proven in Ukraine, jam-proof by design, zero emissions." |
| **Strike-drone startup founder** | Terminal accuracy, unit cost, supply security | "Hit the target when GPS is gone — at FPV price points." |
| **Grant / fund manager (Brave1, NIF, DIU)** | Deep-tech moat, dual-use, team, defensibility | "Sovereign, jam-proof PNT — a NATO-scale gap Ukraine can own." |

### Positioning statement
> For **military drone makers who lose missions to GPS jamming and spoofing**, FlyBy is an **optical
> navigation system** that delivers **absolute GPS-denied positioning from the drone's own camera**.
> Unlike **INS/IMU dead-reckoning (drifts) or RF-based alt-PNT (still jammable/emitting)**, FlyBy is
> **passive, emission-free, and self-correcting against a base map** — so the drone completes the mission
> when the signal is gone.

**Category to own:** *Passive optical PNT for GNSS-denied UAVs — "camera-as-GPS."*

---

## 7. Go-to-market strategy

**Motion:** land-and-expand through OEMs (not direct-to-MoD initially). Revenue = per-unit software license
+ optional hardware margin + NRE/integration fees + non-dilutive grants.

- **Phase 0 (0–6 mo) — Prove it on the front.** 2–3 Ukrainian design-partner OEMs; subsidized integration
  in exchange for flight data + testimonial. Hit a hard metric (absolute-position error & mission-completion
  under active jamming) on a real AO. Register with **Brave1**; file for grants.
- **Phase 1 (6–18 mo) — First paid integrations + reference design.** Convert design partners to per-unit
  licenses; land one flagship strike-drone program; publish an (anonymized) field-proof result as the wedge.
- **Phase 2 (18–36 mo) — Scale via OEM licensing + allied expansion.** License the stack per airframe;
  expand to NATO/allied OEMs and DIU/AFWERX (US) / EDF (EU) programs; pursue framework contracts.

---

## 8. Business model & unit economics

**Pricing:**
- **Software license / airframe:** $100–$500 (tiered: VIO-only → full absolute nav + terminal guidance).
- **Reference hardware (optional):** companion compute + camera at ~30–40% margin, or licensed to OEM to self-source.
- **NRE / integration:** $25K–$150K per OEM design-in (front-loaded; funds custom AO map tuning).
- **Grants (non-dilutive):** Brave1 / NIF / EDF / DIU — runway extenders, not revenue.
- **Gross margin:** software 85%+; blended 65–75% early (HW/NRE-heavy).

**Unit economics (per OEM account, illustrative `[M]`):**
- Mid-size ISR OEM at run-rate: 20K units/yr × $300 = **$6M/yr ACV**; realistic Y1 ramp 1–3K units → $0.3–0.9M.
- **CAC:** engineering-dominated, ~$50–120K per design-in.
- **Payback:** <12 months once a program reaches even 2–3K units/yr.
- **LTV:** high and multi-year once embedded in an airframe — significant switching cost.

---

## 9. Financial projections (base case, post-raise) `[M]`

| | Y1 (26–27) | Y2 | Y3 |
|---|---|---|---|
| Design-partner OEMs | 3 | 6 | 12 |
| Paid units / yr | 2,000 | 25,000 | 120,000 |
| Blended price/unit | $250 | $300 | $350 |
| Product revenue | $0.5M | $2.0M | $6.0M |
| + NRE / integration | $0.3M | $0.6M | $1.0M |
| + Grants (non-dilutive) | $0.8M | $1.0M | $1.0M |
| **Total inflows** | **$1.6M** | **$3.6M** | **$8.0M** |
| Headcount (EOY) | 8 | 16 | 30 |
| Gross margin | 60% | 70% | 75% |

> Present these as an **ambition-calibrated scenario**, not a promise. At pre-seed, the **milestone chart
> (§10) carries more weight than the revenue hockey-stick.** Defense volume is lumpy but very large.

---

## 10. The ask — funding, valuation, use of funds, milestones

### Recommendation
**Raise $750K on a post-money SAFE, valuation cap ~$5–6M**, blended with **$0.5–1.0M non-dilutive**
(Brave1/NIF/EDF) → **~$1.3–1.75M effective budget, ~18-month runway**.

*Why $750K and not the full $1M dilutive:* Ukrainian pre-seed defense rounds are milestone-gated and
typically **$200K–$400K (most common) or $1M–$1.5M (second most common)** `[S: Brave1/Kyiv Post 2025]`.
A tight raise + grants preserves ownership and sets up a stronger, higher-mark seed after field proof.
If a lead pushes for the full $1M, take it *only* to pull forward hiring/field trials — not to lower the bar.

### Use of funds ($750K, 18 months; extended by grants)
| Bucket | % | $ | Buys |
|---|---|---|---|
| Engineering (CV/VIO, embedded, integration) | 55% | $412K | 3–4 senior engineers; nav stack to TRL 6–7 |
| Field testing & hardware | 15% | $113K | Reference HW; flight & jamming trials on real AOs |
| Map / data pipeline & compute | 12% | $90K | Base-map ingestion; GPU/edge compute; dataset build |
| GTM / BD / grants | 10% | $75K | Design-partner BD; Brave1/NIF/DIU applications; demos |
| G&A / legal / IP / entity | 8% | $60K | Dual-use structuring; patents; allied-export entity |
| **Total** | **100%** | **$750K** | |

### Milestones this round must hit (to unlock the seed)
1. **TRL 6–7** — nav stack demonstrated on a real UAV, on a real AO, under active/simulated jamming.
2. **Hard metric** — target ≤10 m absolute error and >X% mission completion under EW (beat the ~11–20 m
   published benchmarks *under harder conditions*).
3. **3 signed design partners** + ≥1 paid integration / LOI from a strike-drone program.
4. **≥1 non-dilutive grant secured** (Brave1 / NIF / EDF).
5. **Brave1 registration / codification** + a repeatable OEM integration playbook.

→ Hitting these de-risks a **$3–5M seed at a ~$15–25M cap** (3–4× step-up).

---

## 11. Funding sources & investor targets

**Non-dilutive / strategic (pursue in parallel — dilution-free runway):**
- **Brave1** — Ukraine's state defense-tech cluster. 2024 budget ~1.5B UAH (**~$39M**); grant tiers scaled
  from $5–25K (2023) to **$50K+** `[S]`. Grants + codification + procurement on-ramp. **File immediately.**
- **NATO Innovation Fund** (€1B deep-tech/defense) and **EU EDF / EDIRPA** — allied deep-tech capital.
- **US DIU / AFWERX / SBIR** — via an allied/US-entity path (see §12).

**Dilutive (target defense/dual-use specialists, not generalists):**
- Ukrainian & diaspora defense angels/syndicates; European defense-tech VCs (D3 / Dare to Defend Democracy,
  Green Flag Ventures, MITS Capital, Project A, and similar). American Dynamism-style US funds later.

**Market tailwind for the raise:** Ukrainian defense-tech went **~$5M (2023) → $59M (2024) → $105M+ across
50+ startups (2025)** `[S: Brave1/Kyiv Post]`; **European defense-tech VC hit a record $1.5B in 2025** `[S]`.
Capital is flowing into exactly this sector — position FlyBy as the picks-and-shovels navigation layer.

---

## 12. Regulatory, export & procurement

- **Procurement route:** in Ukraine, sell through OEMs + **Brave1 codification / MoD fast-track**; abroad,
  through prime integrators winning MoD tenders. Avoid slow direct-to-government motions early.
- **Export controls:** the **Aug 27, 2025 ITAR final rule** decontrolled most GNSS anti-jam/anti-spoof
  systems and moved CRPAs to the (less-restrictive) EAR, effective **Sept 15, 2025** `[P: Federal Register]`.
  *Caveat:* this primarily benefits **US** manufacturers; FlyBy's optical approach is a GNSS *substitute*,
  not an anti-jam add-on, so treat this as favorable-climate framing, **not** a direct FlyBy exemption.
- **Dual-use structuring:** maintain a civil GPS-denied-autonomy use case and structure IP/entity for
  allied export from day one — it widens grant eligibility and de-risks the export conversation with investors.

---

## 13. Risks & mitigations

| Risk | Mitigation |
|---|---|
| **Accuracy/robustness** in night, cloud, featureless terrain (the known open gap) | Sensor fusion (thermal/IR) + IMU coasting + map priors; scope initial AO to feasible conditions; make robustness the core R&D milestone |
| **Not yet GPS-grade** (~11–20 m benchmarks) | Position as *mission-completion under denial*, not survey-grade; ≤10 m is decisive for ISR/terminal guidance |
| **Long defense sales cycles** | Start with the fast Ukrainian OEM loop + grants for runway |
| **Export / dual-use classification** | Civil path + allied-export entity + early legal structuring |
| **Well-funded incumbents move down-market** | Own the camera-primary map-matching niche at low SWaP-C/price; battlefield dataset moat |
| **Key-person / small team** | Use the raise to hire CV/embedded talent; add defense-operator advisors |
| **Market-size skepticism** (proxy TAM) | Lead with bottom-up attach model; label syndicated figures as vendor estimates |

---

## 14. Investor narrative (pitch spine)

1. **Hook:** "In the war that's rewriting airpower, the #1 killer of drones isn't missiles — it's jamming.
   ~10,000 a month." `[P]`
2. **Problem:** GPS is the single point of failure; 60–80% of FPVs miss under EW. `[P]`
3. **Insight:** the front is already reaching for optical navigation (since Dec 2024) — but it's brittle and
   not GPS-grade. `[P]`
4. **Solution:** FlyBy — camera-as-GPS. Passive, jam-proof, absolute positioning via our georeferenced
   map-matching pipeline.
5. **Why us:** GIS-Point's map pipeline + the only live GPS-denied combat proving ground on earth.
6. **Market:** Assured PNT $846M → $10.2B, military 46%; bottom-up attach TAM $600M+ base. `[S][M]`
7. **Traction plan:** 3 design partners → field-proof metric → paid integrations → allied scale.
8. **Ask:** $750K SAFE + non-dilutive stack → TRL 6–7 + field proof → $3–5M seed.

---

## 15. Action plan — next 90 days

| # | Action | Owner | Outcome |
|---|---|---|---|
| 1 | Register FlyBy with **Brave1**; file grant application | Founder/BD | Non-dilutive on-ramp + codification |
| 2 | Sign **2–3 design-partner OEM** LOIs (free/subsidized integration for data) | Founder | Field access + testimonials |
| 3 | Define & instrument the **hard accuracy/mission-completion metric** on a real AO | CTO | The single number that sells the seed |
| 4 | Build the **pre-seed data room** (this report + model + demo video + one-pager) | Founder | Investor-ready |
| 5 | Draft **$750K SAFE** (cap ~$5–6M); shortlist defense/dual-use angels + NIF/EDF | Founder | Round mechanics ready |
| 6 | Structure **dual-use IP / allied-export entity** | Legal | De-risk export conversation |

---

## Appendix A — Sources (verified)

**Problem scale `[P]`:** RUSI, *Tactical Developments During the Third Year of the Russo-Ukrainian War*
(Feb 2025); Forbes/Hambling citing RUSI, "10,000 per month" (May 2023); IEEE Spectrum, Ukraine killer
drones / neural-net optical navigation (2025).
**Market size `[S]`:** GMInsights, Assured PNT Market (2025→2035, 28.4% CAGR, 46.2% mil share);
Research and Markets/TBRC, PNT Solution ($1.56B 2025→$2.6B 2030); MarketsandMarkets, LEO PNT
($0.07B→$0.57B, 53.9% CAGR).
**Competitors `[P]`:** Advanced Navigation ($110M Series C, Mar 2026); Auterion ($130M Series B + $50M
Pentagon/33,000-kit contract, Sept 2025); ANELLO Photonics ($25M Series B-2, May 2026, Inside GNSS).
**Technology `[P]`:** NATO STO MP-SET-275-04 (Fraunhofer FKIE); arXiv 2510.01348 (SPRIN-D winner, ICRA
2026, RMSE <11 m); MDPI Drones 10(2)/97 (NaviLoc, 19.5 m).
**Funding benchmarks `[S]`:** Kyiv Post / Brave1 (2025 Ukrainian defense-tech $105M+, round-size mix);
AIN.ua (Brave1 2024 ~$39M budget, grant tiers); Vestbee (European defense-tech record $1.5B, 2025).
**Regulatory `[P]`:** Federal Register 2025-16382, ITAR USML revisions (Aug 27, 2025; CRPA→EAR Sept 15, 2025).

## Appendix B — Do NOT use (refuted / unreliable in verification)
- ❌ "Loitering-munition market $5.36B (2025)→$13.26B (2030), 19.9% CAGR" — **refuted (1–2 vote)**.
- ❌ "GNSS-Independent PNT Constellation market $2.54B (2024)→$4.87B (2029)" — **refuted (0–3 vote)**.
- ⚠️ Crunchbase/Sightec, emergenresearch military-drones, several blog aggregators — **unreliable**, excluded.

## Appendix C — Evidence-strength & assumptions notes
- All `[S]` market figures are **secondary syndicated research** with opaque methods and ~1.6× cross-firm
  variance — present as "vendor estimates."
- The **Assured/LEO/PNT-Solution markets include competing satellite/inertial/anti-jam approaches** — they
  are a *proxy* for the tailwind, not FlyBy's precise addressable market. The true optical-UAV-nav SAM is a
  subset **not sized by any surviving source** — hence the bottom-up model is the primary basis.
- All `[M]` figures (attach volumes, pricing, projections, unit economics) are **founder-model assumptions**
  with inputs stated; replace with real design-partner data as it arrives.
- Accuracy benchmarks (11–20 m) are individual competition/paper results, not a standardized industry
  benchmark; FlyBy's MVP metric must be measured, not assumed.
