# Milestone M1 — Field-Validated Integrated Prototype (TRL 4 → 6)

**Product:** GPS-denied absolute geolocation for aerial platforms — position derived by
matching live "fly-by" optical imagery against a georeferenced reference map, independent of GNSS.
**Status at start of M1:** algorithms proven, **5–10 m absolute accuracy**, ~TRL 4 (lab / representative data).
**Owner (product):** _CEO / founder_ · **This document owner:** _COO / program lead_
**Horizon:** ~4–6 months (three sprints) · **Language of record:** English (NATO/STANAG-aligned); UA summary on request.

> Assumptions to confirm (they change cost/timeline, not the shape of the plan):
> A1. Target platform = multirotor **and** fixed-wing UAV, MTOW class 5–25 kg.
> A2. Positioning must run **real-time onboard** (not post-flight), ≥5 Hz, latency < 200 ms.
> A3. Payload budget: **< 500 g, < 15 W, single edge module + camera + IMU.**
> A4. Reference map is pre-built for the test area from satellite/aerial ortho imagery.
> A5. No end-user design partner or non-dilutive grant is locked yet.

---

## 1. Why this is the right milestone (and the one enemy)

The single thing that kills this product is **doubt that it holds accuracy in the air, with GPS off,
on real hardware, repeatably.** Everything before M1 (algorithms, 5–10 m) is a lab claim. Everything
after M1 (production, sales, scale) is unlocked *only* by a credible field result. So M1 is not
"build more" — it is **convert a lab claim into fielded, witnessed evidence.**

**One-line strategy for M1:** *Fly the smallest honest payload that runs our algorithm onboard, and
prove ≤10 m GPS-denied accuracy against RTK ground truth in front of an end user.*

---

## 2. Definition of Done — the go/no-go gate (exit criteria)

M1 is **complete** only when ALL of the following are true and documented:

| # | Exit criterion | Target |
|---|---|---|
| G1 | Self-contained payload (compute + camera + IMU) integrated and flying on the target platform | 1 airworthy unit |
| G2 | Positioning runs **onboard, real-time**, GPS physically OFF | ≥5 Hz, latency < 200 ms |
| G3 | **Absolute accuracy held vs RTK ground truth** across the campaign | median ≤ 10 m; goal ≤ 5 m; 95th pct ≤ 15 m |
| G4 | Repeatability across conditions | ≥ 8 sorties · ≥ 3 terrain types · ≥ 2 altitudes · day |
| G5 | Robustness envelope characterized (where it fails is *known*, not surprising) | documented degradation curve |
| G6 | Repeatable, third-party-runnable **test protocol + report** | 1 signed report |
| G7 | **End-user validation:** letter of interest / test endorsement from a unit or integrator | ≥ 1 |

> Critical Number for M1 (the one number the whole team watches):
> **median absolute position error (m), GPS-denied, onboard, real-time.** Start 5–10 (lab) → hold ≤10 in the field.

---

## 3. Workstreams, owners, and deliverables

Six parallel workstreams. Each has one owner (single wringable neck), a trigger, and a hard deliverable.

### WS1 — Hardware payload (SWaP-C) · owner: _HW lead_
- Select edge compute: baseline **NVIDIA Jetson Orin NX/Nano** (TensorRT path) vs. lower-power alt; decide on measured inference budget.
- Select camera: **global-shutter EO**, lens FOV/GSD matched to altitude; evaluate day-only first, IR/low-light as a later variant.
- Integrate a **tactical-grade IMU** + hardware time-sync (PPS/trigger) — timing error is the silent accuracy killer.
- Mechanical: mount, vibration isolation, thermal path, connectors; ruggedization targets referenced to **MIL-STD-810** (vibration/thermal) and **MIL-STD-461** (EMI) — characterize now, certify later.
- **Deliverable:** 2 integrated payload units (1 fly, 1 spare/bench) + interface control document (ICD).

### WS2 — Software on the edge (real-time integration) · owner: _SW/embedded lead_
- Port algorithm to the edge module; optimize (quantization/TensorRT), hit the **latency & rate budget** (A2).
- **Sensor fusion:** map-matching (absolute) + visual-inertial odometry (relative) + IMU → a filter (EKF/factor-graph) that stays bounded between map fixes and rejects bad matches.
- Fail-safe behavior: confidence/health output, graceful degradation, "I am lost" flag — a defense user must trust the *uncertainty*, not just the estimate.
- **Deliverable:** flashed onboard build hitting G2, with logged confidence + telemetry.

### WS3 — Reference map & data pipeline · owner: _Geo/data lead (natural fit for GIS-Point core team)_
- Build georeferenced reference layer for the test area from best-available ortho imagery; define update/staleness policy (seasonal change, new structures).
- **Ground-truth rig:** onboard RTK-GNSS logger (used ONLY as truth, never as input) + time-aligned logging harness.
- Data management: raw flight logs, labeled datasets, versioned map tiles — this becomes your durable moat.
- **Deliverable:** test-area map package + ground-truth logging kit + data schema.

### WS4 — Field-test campaign · owner: _COO / test director_
- Secure a **legal test range** and airspace clearance. In Ukraine this means coordination with the relevant military/aviation authority and, ideally, running under a **Brave1**-type test window or an existing unit's range.
- Write the **Test & Evaluation plan**: sortie matrix (terrain × altitude × speed × light), acceptance thresholds tied to G3–G5, safety case, abort criteria.
- Execute in 3 waves: (1) bench + tethered/short hops, (2) controlled sorties, (3) witnessed demo with the end user present.
- **Deliverable:** completed sortie matrix + signed test report (G6).

### WS5 — End user, compliance & IP · owner: _CEO + COO_
- Land **1 design-partner end user** (a UAV unit or a platform integrator) — they define "good enough," open the range, and become your first reference and codification sponsor.
- Compliance runway (start now, finish post-M1): Ukrainian **MoD codification** path, **NATO STANAG** interoperability targets (e.g., STANAG 4586 for UAS interfaces), and export/dual-use posture.
- **IP:** file provisional protection on the map-matching + fusion method *before* any public demo; put NDAs around test data.
- **Deliverable:** signed LOI/endorsement (G7) + IP filing + compliance roadmap 1-pager.

### WS6 — Team & funding · owner: _CEO_
- Minimum team to clear M1: HW lead, embedded/SW lead, geo/data lead (in-house), test director (COO), + 1–2 engineers. Hire the gap (most startups here are short an **embedded real-time** engineer).
- **Non-dilutive first:** Brave1 grants, NATO DIANA / NIF, EU/defense innovation funds — M1 evidence is exactly what they fund. Model a lean M1 budget (hardware, range, salaries, contingency 20%).
- **Deliverable:** M1 budget + funding pipeline with ≥ 2 live applications.

---

## 4. Timeline (three sprints)

| Sprint | Weeks | Theme | Gate at end |
|---|---|---|---|
| **S1 — Build the box** | 1–7 | Select & integrate HW (WS1), port algo to edge (WS2), map + ground-truth rig (WS3). Secure range + design partner in parallel (WS4/WS5). | **Bench proof:** algorithm runs onboard on recorded flight data at rate/latency, GPS off. |
| **S2 — Fly the box** | 8–15 | Controlled sorties; fusion tuning; robustness envelope; iterate HW/SW on real failures. | **Controlled-flight proof:** median ≤10 m across ≥5 sorties, ≥2 terrains. |
| **S3 — Prove & witness** | 16–22 | Full sortie matrix; witnessed demo with end user; test report; LOI; IP filing. | **M1 gate (Section 2):** all of G1–G7. |

> Dependencies: WS1→WS2 (need the box to optimize on it), WS3 is needed before any accuracy claim, WS4 range clearance is the **long-lead item — start day 1.**

---

## 5. Top risks & mitigations

| Risk | Why it bites | Mitigation |
|---|---|---|
| Accuracy degrades in air (vibration, motion blur, timing) | Lab ≠ flight; sync error alone can add meters | Hardware time-sync + global shutter early; bench-shake test before flying |
| Range/airspace access slips | Long-lead, external, wartime constraints | Owned by COO from day 1; two fallback sites; run under partner/Brave1 window |
| Map staleness / new terrain fails matching | Real world changes; enemy terrain is unmapped | Characterize degradation (G5); define map-update SLA; don't over-claim coverage |
| No design partner → no witnessed result | Self-reported demos don't sell in defense | CEO owns partner pursuit in S1; grant + demo are the bait |
| Embedded real-time talent gap | Edge optimization is the hardest hire | Hire/contract in week 1; de-risk with Jetson+TensorRT known path |
| Scope creep to IR/night/production | Kills the milestone by diluting focus | Day-only, single platform for M1; everything else is M2 |

---

## 6. What M1 explicitly does NOT include (say-no list)

IR/night operation · multi-platform SDK · production ruggedization/certification · on-the-fly map building ·
swarm/multi-sensor fusion · full MoD codification. **All of these are M2+.** M1 buys the *right* to do them.

---

## 7. After the gate — what M1 unlocks (preview of M2)

Witnessed ≤10 m GPS-denied result → (a) real procurement conversations & codification, (b) a fundable
Series-A / defense-fund story, (c) the night/IR + multi-platform roadmap, (d) pilot deployments with the
design-partner unit. **Do not start M2 until the M1 gate is signed.**

---

### One-line status to carry into every weekly review
> "Median GPS-denied onboard error today = **__ m** | sorties done **__/8** | range access **[secured/pending]** | design partner **[signed/in talks]**."
