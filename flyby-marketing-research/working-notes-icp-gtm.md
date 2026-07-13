# FlyBy — ICP, Positioning & Go-To-Market (working draft)

## 1. The problem (crisp statement)
Modern drone warfare runs on GPS/GNSS. In contested airspace, GNSS is the single point of failure:
- **Jamming** denies the signal (drone loses position → drifts, aborts, or crashes).
- **Spoofing** feeds a false signal (drone is silently walked off-course or captured).
Along the Russia–Ukraine front, GNSS denial is now the *default* condition, not the exception. Estimates
in open reporting attribute a large share of drone losses to EW/jamming rather than kinetic defenses.
A drone that cannot navigate without GPS cannot complete an ISR or strike mission in the environment
where it matters most.

**FlyBy's answer:** an optical/visual navigation system that lets a UAV know where it is and fly its
mission *using its camera and onboard compute alone* — no GNSS required, immune to jamming and spoofing
because it emits nothing and trusts no external signal. "Fly under the jamming."

## 2. Why now (timing thesis)
- GNSS denial went from edge-case to baseline in <3 years of high-intensity war.
- Every NATO and allied MoD is now buying "assured PNT" / "alt-PNT" as a top procurement priority.
- Compute (edge AI, cheap cameras) finally makes real-time visual navigation viable on a sub-$500 payload.
- Ukraine is the world's live lab: fastest procurement, fastest feedback loop, most credible proving ground.
- Massive drone volume: hundreds of thousands to millions of units/year create a huge attach market for
  a navigation module/software.

## 3. What FlyBy is (product framing)
A **navigation payload + software stack** that provides GPS-denied positioning via:
- **Visual odometry (VIO)** — dead-reckoning from camera + IMU (relative position, drift-bounded).
- **Visual/terrain-relative navigation (absolute fix)** — matching live camera imagery to a georeferenced
  base map (satellite/aerial) to correct drift and deliver absolute coordinates. This is the defensible core:
  it turns a camera into a "GPS replacement" that outputs lat/long over known terrain.
- Optional **scene/landmark recognition** for terminal guidance on strike drones (DSMAC-style, modernized
  with ML).

Form factor to validate: software SDK + reference hardware module (companion computer + camera), designed to
integrate with common autopilots (PX4/ArduPilot, and closed OEM stacks). GIS-Point's GIS/geospatial DNA
(georeferenced base-map pipelines) is the unfair advantage here.

## 4. Ideal Customer Profile (ICP)
**Primary (design partners / first revenue):**
- Ukrainian drone OEMs building ISR and deep-strike / long-range one-way-attack UAVs. They have volume,
  urgency, budget (via state contracts / Brave1), and a fast integration cycle.
- Government demand signal via **Brave1** (defense-tech cluster) and Ministry of Defence codification lists.

**Secondary (scale / higher ACV):**
- NATO / allied drone manufacturers and prime integrators needing alt-PNT to win MoD tenders.
- Loitering-munition and cruise-style long-range strike programs (highest willingness to pay for terminal
  accuracy under GNSS denial).
- Counter-UAS and ISR platform vendors.

**Tertiary (dual-use, non-dilutive optionality):**
- Civil/commercial GPS-denied autonomy: BVLOS logistics, indoor/industrial inspection, mining, agriculture —
  useful for grant funding and export-control flexibility, NOT the wedge.

### Buyer personas
| Persona | Role | What they care about | Winning message |
|---|---|---|---|
| **Head of R&D / CTO, drone OEM** | Integration owner | Accuracy, drift, SWaP-C, ease of integration, latency | "Drop-in alt-PNT; sub-X m absolute accuracy over your AO with our SDK in weeks." |
| **Program lead / MoD requirements officer** | Requirements & codification | Mission completion rate under EW, TRL, field proof | "Field-proven in Ukraine, jam-proof by design, no emissions." |
| **Founder/CEO of strike-drone startup** | Buyer & champion | Terminal accuracy, cost per unit, supply security | "Hit the target when GPS is gone — at FPV price points." |
| **Grant/fund manager (Brave1, NIF, DIU)** | Non-dilutive capital | Deep tech moat, dual-use, team, defensibility | "Sovereign, jam-proof PNT — a NATO-scale gap Ukraine can own." |

## 5. Positioning statement
> For **military drone makers who lose missions to GPS jamming and spoofing**, FlyBy is an **optical
> navigation system** that delivers **absolute GPS-denied positioning from the drone's own camera**.
> Unlike **INS/IMU-only dead-reckoning (drifts) or RF-based alt-PNT (still jammable/emitting)**, FlyBy is
> **passive, emission-free, and self-correcting against a base map** — so the drone completes the mission
> when the signal is gone.

**Category to own:** "Passive optical PNT for GNSS-denied UAVs" (a.k.a. camera-as-GPS).

### Competitive framing (fill funding/figures from research)
| Alternative | How it fails / limits | FlyBy edge |
|---|---|---|
| GNSS + anti-jam antenna (CRPA) | Still an RF signal; defeatable; adds cost/SWaP | Passive, unjammable by definition |
| INS/IMU dead-reckoning (Honeywell, Safran, ANELLO) | Drift grows unbounded over time/distance | Absolute fix from terrain resets drift |
| RF alt-PNT / eLORAN / signals-of-opportunity | Emits or depends on external infra; jammable | Fully self-contained, no infra |
| Terrain-following radar / lidar | Active emission, heavier, costlier | Passive camera, low SWaP-C, cheap |
| Big-defense autonomy (Shield AI Hivemind, Anduril) | Platform-locked, expensive, not sold as a module | Hardware-agnostic module at drone-attach price |
| Visual-nav peers (Sightec, etc.) | (confirm funding/TRL/geo focus in research) | Ukraine-proven + GIS-Point map pipeline |

## 6. Go-to-market motion
**Phase 0 (now → 6 mo): Prove it on the front.**
- 2–3 design-partner OEMs in Ukraine. Free/subsidized integration in exchange for flight data + testimonial.
- Target a hard metric: mission-completion rate and absolute-position error under active jamming, on a real AO.
- Register/codify with Brave1; apply for Brave1 grant + NATO Innovation Fund / EU defense non-dilutive.

**Phase 1 (6–18 mo): First paid integrations + reference design.**
- Convert design partners to per-unit license / module sales. Land 1 flagship strike-drone program.
- Publish a credible field-proof result (anonymized). Use it as the wedge into allied OEMs.

**Phase 2 (18–36 mo): Scale via OEM licensing + allied expansion.**
- License the software stack per airframe; sell reference hardware or certify third-party HW.
- Expand to NATO/allied OEMs and DIU/AFWERX (US) and EDF (EU) programs; pursue framework contracts.

**Sales model:** land-and-expand via OEMs (not direct-to-MoD initially). Revenue = per-unit license
(software) + optional hardware margin + NRE/integration fees + government grants (non-dilutive).

## 7. Moat / defensibility
1. **Georeferenced base-map + matching pipeline** (GIS-Point core competence) — hard to replicate, improves
   with data.
2. **Battle-tested tuning data** from Ukrainian front — a proprietary dataset no Western competitor can get.
3. **Autopilot integrations & OEM design-ins** — switching cost once embedded in an airframe.
4. **Speed & sovereignty** — a Ukrainian jam-proof PNT is strategically attractive to allied buyers hedging
   supply chains.

## 8. Key risks & mitigations (investor will ask)
| Risk | Mitigation |
|---|---|
| Accuracy under degraded visuals (night, clouds, featureless terrain) | Sensor fusion (thermal/IR), IMU coasting, map priors; scope initial AO to feasible conditions |
| Long integration/sales cycles in defense | Start with fast Ukrainian OEM cycle + grants for runway |
| Export controls / dual-use classification | Dual-use civil path; structure IP and entity for allied export |
| Incumbents/well-funded autonomy players move down-market | Module-level, HW-agnostic, price/speed advantage; own the map-matching niche |
| Key-person / small team | Use raise to hire CV/embedded talent; advisory from defense operators |
