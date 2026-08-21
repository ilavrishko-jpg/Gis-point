# FLY BY / ONS Pre-Seed 2026 deck — v2 (2026-08-21)

Redesigned and updated version of `Fly_By_ONS_PreSeed_2026.pdf`, rebuilt from scratch
(dark defence-tech visual system, 15 slides) with August 2026 field data and project status.

## What changed vs v1

**New slide — Field results (Aug 2026)**
- 17 m median position error on real flight routes (~200 m AGL, 25 m/s), verified against GPS ground truth
- ~3 m accuracy in best conditions; commodity (GoPro-grade) camera
- Processing improved from ~1 s to ~300 ms per frame
- Framed against the mission requirement (20–50 m for mid-strike) — already exceeded; target stays ≤5 m CEP

**New slide — Hardware prototype in production**
- Product-form decision made: integrated hardware module (camera + onboard compute +
  encrypted map storage + MAVLink interface presenting as an external GPS receiver)
- First prototype units in manufacturing (3D-printed enclosure); 3 units targeted by end of August,
  10-unit batch for OEM field trials; test range near Lviv secured
- BOM $1,000–1,500 per unit at prototype volumes

**Updated slides**
- Solution: replaced the generic "3–30 m combat-tested" claim with the measured 17 m median result
- Moat: own field result (17 m) now clearly separated from the independent Theseus benchmark
  (52 m / 564 km) — the benchmark validates the category, it is not an ONS metric
- Market: added demand validation from 20+ OEM interviews (~10,000 units/month UA demand,
  ~300 units/month sellable through the warm network)
- Business model: module + annual map subscription, BOM-based margin note, two-tier market framing
- Roadmap: Phase 1 marked done with real metrics; Phase 2 = hardware prototypes in production (now)
- Ask: added momentum block — 41 accelerator/VC applications submitted, 280+ OEM leads in outreach,
  MSPO Poland expo meetings booked; DASA/DIANA non-dilutive pipeline retained
- Competition appendix: refreshed to the Aug 2026 landscape (Theseus, Vermeer, Asio, Twist, Delian)
  with the sovereign-map / transparent-CEP / honest-confidence positioning

Sources: weekly FlyBy R&D syncs (5–18 Aug 2026), Product Brief (PRD) v1.1, competitive
analysis report 2026-08-14, founders' alignment doc (7 Aug 2026).
