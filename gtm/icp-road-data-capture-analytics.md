# ICP — Road Data Capture & Analytics Contractors

**Segment codename:** RDC (Road Data Contractors)
**For:** GIS-Point — geodata production, GeoAI and managed GIS teams
**Anchor / reference account:** Lehmann + Partner Polska Sp. z o.o. — [pomiarydrogowe.pl](https://www.pomiarydrogowe.pl/uslugi), Konin (PL)
**Version:** 1.0 — 2026-09-10
**Status:** Draft for GTM review. Firmographic ranges are working hypotheses to be validated against the first 20 discovery calls.

---

## 1. One-sentence definition

> A 25–250-person engineering-survey company that **owns a fleet of instrumented measurement vehicles**, wins **multi-year public tenders** to survey national, regional and municipal road networks, and every season captures far more LiDAR, 360° imagery and pavement-profile data than its in-house team can turn into the certified road databanks, condition indices and asset registers its contracts require.

They are not a mapping company that occasionally drives a road. Driving the road **is** the business — and the data exhaust is the product.

---

## 2. Why this segment, and why now

Three structural forces make this the highest-intent geospatial segment in Europe right now:

1. **Regulation creates non-optional volume.** EU Directive [2019/1936](https://eur-lex.europa.eu/EN/legal-content/summary/road-infrastructure-safety-management.html) (amending 2008/96/EC) obliges member states to run a **network-wide road safety assessment across the entire covered network** — the first by 2024, then **at least every five years**. National regimes stack on top: statutory annual and 5-year road inspections in Poland, ZEB cycles in Germany, SCANNER in the UK. The work recurs on a legal clock, not on a budget whim.
2. **Capture capacity has outrun processing capacity.** A modern multi-sensor vehicle collects a full corridor at traffic speed. One vehicle-week can bury a five-person processing team for a month. Every sensor upgrade widens the gap.
3. **Everyone in the segment has announced AI; almost nobody has shipped it.** These firms employ road engineers and geodesists, not ML engineers. Their "AI/KI" page is a roadmap, not a pipeline.

GIS-Point sells exactly into that gap: elastic production capacity, plus the ML layer that makes their extraction semi-automatic.

---

## 3. The anchor account — Lehmann + Partner Polska

The reference the ICP is calibrated on. Everything below generalises from this profile.

| Attribute | Lehmann + Partner Polska |
|---|---|
| Founded | 18 April 2001 |
| HQ | ul. Marii Dąbrowskiej 8, Konin (62-500), PL — a 70k-population city, thin GIS talent pool |
| Group | Subsidiary of LEHMANN+PARTNER GmbH, Erfurt (founded 1990), itself part of the French **Ginger Group** |
| Markets | Poland nationwide, plus support of UK, German and French markets |
| Positioning | "Supplier of road data for road managers at all levels" — builds **digital road data banks** |
| Fleet | Multiple measurement vehicles for surface diagnostics, road-corridor photo registration, cycle-path measurement |
| Group tech | **S.T.I.E.R.** kinematic multi-sensor system — inertial positioning, laser distance sensors for longitudinal profile, surface LiDAR, multiple camera systems; **BASt-certified annually since 2012** |
| Services signature | Road inventory (*ewidencja dróg*), photo registration with road length + axis geometry, road-network reference maps, road books, forest-road records, traffic-organisation designs; laser scanning of the road corridor; traffic-intensity counts incl. rail level crossings; statutory annual and 5-year road inspections (certified **DSN** and **BIKB** methods); bearing capacity and compaction — Proctor, light probe, static/dynamic plates, Benkelman deflectometer; geological and pavement-construction boreholes |
| Software product | **LP-Drogomistrz** field mobile app (Google Play) + remote-support portal — i.e. they ship software, not only reports |
| Clients | GDDKiA-level national roads, voivodeship (ZDW), powiat (ZDP) and gmina road authorities across Poland |
| Group R&D | Dedicated AI ("KI") and R&D programme at the Erfurt parent |

**Why this is a perfect-fit account, in ICP terms:** owns the capture layer, sells a data product rather than a PDF, is bound to statutory recurring cycles, operates from a small talent market, sits inside a multi-country group that will standardise deliverables, and has an explicit AI ambition without an AI production line.

---

## 4. The portrait

### 4.1 The company — "Meet the account"

*Composite portrait, built from the anchor account and the segment around it.*

They have been doing this for twenty-odd years. The founders are road engineers; two of them still sign off on the tricky deliverables personally. The office is in a mid-sized city — not Warsaw, not Berlin — because that is where the founders are from and where the vehicle depot is affordable. Eighty-something people. Half of them are on the road between March and November.

The yard holds four measurement vehicles. One is new, wrapped in company livery, and cost more than the office building; the board approved it after they lost a tender on capture throughput. The vehicles are the pride of the firm and they are photographed on every conference stand.

Their calendar has two halves. **Capture season**: crews leave at 5am, the network gets driven, the drives land on NAS boxes that get couriered back because uploading them is slower. **Processing season**: the same data has to become an asset register with 40 feature classes, a condition index computed to a national standard, a set of road books, and a web viewer the client's engineers will log into. The client is a public authority; the contract has a delivery date and a penalty clause; the specification is 90 pages and differs from last year's.

The processing team is twelve people. It has been twelve people for three years, not by choice — they have had a "GIS specialist / point-cloud technician" advert running since spring, and the two good candidates both took jobs in the capital. Training a new one to production quality takes six months. So in January the whole company is at the screens, including people who should be planning next season's bids.

They know the extraction work is 60–70% of project cost and that most of it is a person clicking on a sign in a point cloud. They have talked about automating it for years. There is a slide about AI. There was a pilot with a university. It classified guardrails at 71% and nobody had time to take it further.

The thing that actually keeps the MD awake: they are bidding conservatively. They are leaving kilometres on the table — not because they cannot drive them, but because they cannot promise to process them.

### 4.2 The champion — technical buyer persona

**"Marek", 41 — Head of Production / Data Processing.** *(Composite persona, not a real individual.)*

- Geodesy degree, 14 years in the firm, promoted out of the processing seat.
- Owns throughput, QC pass rate and the delivery calendar. Does not own the P&L.
- Day looks like: triaging which project slips, re-checking a junior's classification, arguing with a client engineer about whether a drainage grate counts as an asset, re-planning the winter.
- **Measured on:** on-time delivery, rework rate, client acceptance at first submission.
- **Fears:** an outsourcing partner that produces work he has to re-do; leaking a client's data; his best specialists reading "outsourcing" as "redundancy"; being the person who introduced the vendor that caused the penalty.
- **Wants, but will not say it in the first call:** to stop being the bottleneck; to get his seniors off clicking and onto QC and spec design; to have the AI thing finally be real so he can bid bigger.
- **Buys when:** he has seen the work. Not a deck — a paid pilot on *his* data, against *his* specification, benchmarked against *his* team's hours and QC pass rate.

### 4.3 The economic buyer

**Managing Director / Board member / Country MD** — in an 80-person firm, usually a co-owner, often an engineer.
Cares about: **margin per kilometre**, tender win rate, penalty exposure, and whether the group's parent will bless the vendor. Will approve a pilot on Marek's recommendation; will approve a framework agreement only after one clean delivery cycle.

---

## 5. Firmographics

| Dimension | Fit | Notes |
|---|---|---|
| **Headcount** | 25–250; **sweet spot 40–120** | <25 = no recurring volume, no budget. >250 = enterprise motion, procurement, 9–18 month cycles (still worth pursuing, different play) |
| **Revenue** | €3M–€60M | |
| **Age** | 10+ years | Tender track record is a prerequisite to win the contracts that create the pain |
| **Ownership** | Independent engineering firm, **or** national subsidiary of an EU engineering group | Subsidiaries are *high* fit: local delivery pressure + group-level standardisation + an existing appetite for shared service centres |
| **Revenue model** | Tender-driven project services with a statutory recurring cycle | Predictable, seasonal, deadline-bound — the ideal shape for elastic capacity |
| **Client base** | Public road authorities at national / regional / municipal level; motorway concessionaires; rail infrastructure managers | |

### Geography

- **Tier 1 (focus):** Poland, Germany, Czechia, Slovakia, Austria, Hungary, Romania, Baltics, UK, Ireland, Netherlands, Belgium, Nordics
- **Tier 2:** France, Spain, Portugal, Italy, Western Balkans
- **Tier 3 (opportunistic):** Gulf states, Australia/NZ, Canada

Tier 1 wins on time zone, statutory-cycle alignment, and the fact that these markets have local capture firms but almost no local production-scale processing capacity.

---

## 6. How to recognise them — the services signature

Score the fit from their own services page. **Four or more of these = in segment:**

- Road inventory / asset register — *ewidencja dróg*, *Straßenbestandsdaten*, road referencing
- Pavement condition survey and evaluation — ZEB, DSN/BIKB, SCANNER, IRI, rutting, cracking, PCI/PSI
- Mobile mapping / mobile laser scanning of the road corridor / 360° photo registration
- GPR (georadar) pavement layer thickness
- Bearing capacity: FWD, Benkelman deflectometer, static and dynamic plate load, Proctor, light probe
- Traffic counts and classification, including level crossings
- Statutory periodic road inspections (annual / 5-year)
- Road safety audits, network-wide road safety assessment (RISM)
- Bridge and engineering-structure inventory
- **Digital road databank / RMS / PMS with a web viewer and a field mobile app**
- Component inventories: signage, markings, guardrails, poles, drainage, kerbs

The last two are the strongest signals. A firm that ships a **data product and an app** has already accepted that it is a data company — that firm buys production capacity. A firm that ships a PDF report does not.

---

## 7. Technographics

**Capture layer (they own it — never compete here):** proprietary multi-sensor platforms (S.T.I.E.R., ARAN) or OEM systems — Trimble MX9/MX50, RIEGL VMX, Leica Pegasus, Teledyne Optech; Pavemetrics LCMS for surface distress; Ladybug/panoramic and linescan camera rigs; GNSS+IMU (Applanix POS LV, NovAtel), DMI.

**Processing layer (this is where GIS-Point plugs in):** TerraSolid, Trimble Business Center, Orbit 3DM / Bentley, Agisoft Metashape or RealityCapture, Global Mapper, CloudCompare, ArcGIS Pro / QGIS, FME, PostGIS.

**Delivery layer:** road databank, web-GIS viewer, mobile field app, API into the authority's asset-management system, exports to national schemas (and increasingly IFC / CityGML for digital-twin clauses).

**Buying signals hidden in the tech stack:**
- Multiple simultaneous open roles for *point-cloud technician / GIS operator / LiDAR classification*, especially open >60 days
- An "AI" / "KI" / "R&D" page with no shipped product behind it
- A press release about a **new measurement vehicle or sensor upgrade**
- A newly published tender win with kilometre figures
- Job ads mentioning a *new* deliverable type (BIM, IFC, digital twin) they have not sold before

---

## 8. Trigger events, ranked by intent

| # | Trigger | Why it converts | How to detect |
|---|---|---|---|
| 1 | **Won a large network tender** with a fixed delivery date | Capacity gap opens in weeks; budget already allocated in the bid | National tender portals (TED, Poland's e-Zamówienia, GDDKiA/ZDW announcements), company news, LinkedIn |
| 2 | **Bought a new measurement vehicle / sensor** | Capture capacity just jumped; processing did not | Press release, LinkedIn post, trade press, conference stand |
| 3 | **Statutory cycle wave** — RISM network-wide assessment, 5-year national inspections | Non-optional, network-scale, clock-driven | Directive 2019/1936 cycle + national inspection calendars |
| 4 | **End of capture season** (Oct–Dec) | Backlog is now visible and quantified; the winter crunch is the pain, live | Seasonal — run the play every Q4 |
| 5 | **Stalled hiring** — GIS/point-cloud roles open >60 days | They have already tried the in-house answer and it failed | Job boards, careers page, LinkedIn Jobs |
| 6 | **Public AI/automation ambition, no ML team** | Wants the outcome, lacks the function | Website R&D page, conference talks, EU/national R&D grant registers |
| 7 | **Market or country expansion** | New specs, new schemas, new language deliverables, no local staff | New office, new-market press, multilingual site |
| 8 | **Client demands digital twin / BIM / IFC deliverables** | Capability they have never produced | Tender text, job ads, their own service-page changes |
| 9 | **Group/M&A integration** | Parent standardises deliverables across subsidiaries → shared-service thinking | Acquisition news, group structure changes |

---

## 9. Pains — in their language

- *"We can capture ten thousand kilometres a season. We can process three."*
- *"Extraction is most of the project cost and it is a person clicking on a sign."*
- *"Every tender has a different classification schema and a different QC spec."*
- *"We cannot hire point-cloud technicians here, and training one takes six months."*
- *"The penalty clause on a late delivery eats the margin on the whole contract."*
- *"We bid conservatively because we do not know if we can process what we win."*
- *"Our AI pilot has been a pilot for two years."*
- *"Winter is when we should be planning next season. Instead everyone is at a screen."*

---

## 10. Value hypothesis — what GIS-Point is to them

**Positioning line:** *the production back-office and the AI layer behind your measurement fleet.*

They keep the fleet, the certifications, the client relationship, the brand and the sign-off. GIS-Point makes their throughput elastic and their automation real.

| Their pain | GIS-Point capability |
|---|---|
| Extraction backlog after capture season | LiDAR / point-cloud classification and feature extraction to an agreed schema, priced per km, with QC-ready deliverables |
| Every tender has a different spec | Custom classification schemas and QC protocols per contract |
| Terrain and imagery products eat junior time | DTM/DEM/DSM, orthophoto and mosaic, vectorisation, cartography |
| Cannot hire locally | Managed dedicated GIS/IT teams working inside their environment, tools and NDA |
| The road databank and viewer need real software work | Web-GIS, SDI, geodata pipelines, geodata transformation and conversion |
| AI has been a pilot for two years | ML on geodata and LiDAR automation — one extraction class turned into a working detector on their own data |
| New deliverable types (BIM/3D) | CAD, BIM and 2D/3D modelling from captured data |

**What we deliberately do not do:** own capture, hold the public contract, or touch the client relationship. Saying this early kills the "are you going to become our competitor" objection, which is the real reason these firms hesitate.

---

## 11. Buying committee

| Role | Title | Cares about | Play |
|---|---|---|---|
| **Economic buyer** | MD / Board member / Country MD (often co-owner) | Margin per km, win rate, penalty exposure, group approval | Frame as bid capacity: "what would you bid if processing were not the constraint?" |
| **Champion / technical buyer** | Head of Production, Data Processing Manager, Head of Geodesy | Throughput, QC pass rate, not managing another vendor | Paid pilot on their spec, benchmarked against their own hours and QC |
| **User / soft blocker** | Senior GIS and point-cloud specialists | Job security, "our way of doing it" | Position as capacity relief: they move from clicking to QC, spec design and supervision |
| **Blocker** | IT/security, group procurement | GDPR, data residency, public-sector data handling, vendor onboarding | Have the data-handling and residency answer ready before the second call |
| **Influencer** | R&D / innovation lead | Making the AI programme real | Co-authored automation pilot, joint conference material |

---

## 12. Disqualifiers — the say-no test

Do not pursue if any of these hold:

- **Pure cadastral / geodetic surveying firm** with no mobile mapping or diagnostic fleet — no volume, no recurring pain
- **Under ~15 people / single-vehicle owner-operator** — no budget, no repeat volume, high service cost
- **Software vendor** selling road-asset SaaS with no service delivery — they build in-house
- **Already has a 30+ person in-house processing centre in a low-cost location** — that is the competitor, not the customer
- **The road authority itself** (GDDKiA, ZDW, ZDP, National Highways) — real demand, but procurement-bound, 12–18 month cycles, and a different motion; treat as demand-generation influence, not this ICP
- **Defence / classified programmes** with national-only processing mandates
- **Pure prime contractor** that subcontracts 100% and holds no technical staff — nothing for us to extend

---

## 13. Fit score (100 points)

| Signal | Points |
|---|---|
| Owns/operates mobile mapping or pavement-diagnostic vehicles | 25 |
| Active trigger in the last 6 months (tender win, new vehicle, AI announcement, stalled GIS hiring) | 20 |
| Headcount 25–250 | 15 |
| Contracts with public road authorities (national / regional / municipal) | 15 |
| Ships a data product — databank, web viewer, field app — not only a report | 10 |
| Tier 1 geography | 10 |
| Multi-country footprint or group-owned subsidiary | 5 |

**≥ 65** — ICP fit, work it now · **45–64** — nurture, wait for a trigger · **< 45** — out of segment

*Anchor account calibration — Lehmann + Partner Polska: 25 + 20 (group AI programme, small-market hiring) + 15 + 15 + 10 + 10 + 5 = **100**.*

---

## 14. Target account starting list

Companies surfaced during segment research. **All entries need verification** (headcount, fleet, current triggers) before outreach — treat this as a research queue, not a validated list.

**Tier 1 — core fit, verify and work**

| Company | Country | Why listed |
|---|---|---|
| [Lehmann + Partner Polska](https://www.pomiarydrogowe.pl/) | PL | Anchor account — full profile above |
| [LEHMANN+PARTNER GmbH](https://www.lehmann-partner.de/) | DE | Erfurt parent; S.T.I.E.R. system, ZEB, active AI/R&D programme; group-level entry point |
| [Heller Ingenieurgesellschaft mbH](https://www.heller-ig.de/) | DE | ZEB condition survey and evaluation; 25+ years with federal, state, district and municipal road authorities |
| [W.D.M. Limited](https://www.wdm.co.uk/surveying-services/) | UK | Road surveying at network scale; validated road data for asset management |
| [XAIS-PTS](https://xais-pts.co.uk/surveys/) | UK | Pavement investigation and asset-management support across local highways and major infrastructure |
| [Zetica / ZeticaRoad](https://www.zetica.com/services/zeticaroad-surveys/) | UK | GPR road surveys; survey vehicles with panoramic/linescan cameras and mobile laser scanning |
| [DEPHOS Group](https://dephos.com/pl/oferta/98-pomiary-drog) | PL | Road measurement offering |
| [Pracownia Pomiarów Ruchu Drogowego](https://pprd.pl/) | PL | Traffic measurement specialist — adjacent, verify data volume |

**Tier 2 — enterprise motion, different play**

| Company | Country | Note |
|---|---|---|
| [Fugro](https://www.fugro.com/expertise/roads) | NL / global | 24 ARAN vehicles in fleet, 60 systems sold across 18 countries — large, procurement-heavy, but a real processing-capacity buyer at group level |
| Ginger Group | FR | Parent of the Lehmann+Partner group — multi-subsidiary standardisation play if the anchor lands |

**Tier 3 — outside Tier 1 geography, opportunistic**

[Pathway Services](https://www.pathwayservices.com/) (US), [Roadway Asset Services](https://www.roadwayassetservices.com/) (US), [ICC-IMS](https://icc-ims.com/) (US).

**Next research pass:** national road-authority framework-contract award lists (GDDKiA, ZDW, National Highways, Autobahn GmbH, ASFINAG, ŘSD) — the winners of network-scale survey lots are, by definition, this ICP.

---

## 15. Outreach angles

Never open with "we do LiDAR processing". Open on the trigger.

**A — Tender win (highest intent)**
> You just took the [network] lot — [N] km. That is a good win and a hard winter. We are the processing bench behind survey fleets like yours: classification and feature extraction to your schema, your QC, priced per kilometre. Would a 50 km paid pilot on your own spec be useful before the season ends?

**B — New vehicle**
> Congratulations on the [system]. Most firms we work with find the same thing six months later: capture doubled, the processing team did not. That is the gap we fill — without touching your client relationship or your certification.

**C — Stalled hiring**
> You have had a point-cloud technician advert open since spring. We know that market. Instead of one hire in six months, we can put a trained team of four inside your environment and your toolchain in three weeks — and your seniors move from clicking to QC.

**D — The AI angle (for the R&D influencer)**
> Your R&D page has had automated distress detection on it for a while. We build ML on geodata and LiDAR automation. Pick one extraction class — signs, guardrails, kerbs — and in six weeks we will show you a working detector on your data with an accuracy number you can put in a tender.

**The offer that closes this segment:** a **paid pilot on 50–100 km of their own data, against their own specification**, reported with three numbers — hours per km, QC first-pass acceptance rate, and cost per km versus their internal baseline. This segment does not buy from decks. It buys from a delivery it has QC'd itself.

---

## 16. Open questions to validate in the first 20 calls

1. Is the buying trigger really the tender win, or is it the Q4 backlog panic? (Changes the whole outbound calendar.)
2. What is the true internal cost per km of extraction? Without their number, per-km pricing is guesswork.
3. Does the "we will not compete with you" message actually neutralise the competitor fear, or does it need contractual form (non-compete on their client list)?
4. Who really signs — the MD alone, or the group parent? For subsidiaries, is the group the better first door?
5. Is data residency a hard blocker on public-sector road data in DE/PL/UK, and what does it cost to satisfy?
6. Does the AI pilot open doors that the production offer does not — i.e. should GeoAI be the tip of the spear rather than the upsell?

---

## Sources

- [pomiarydrogowe.pl — Lehmann + Partner Polska](https://www.pomiarydrogowe.pl/) · [services page](https://www.pomiarydrogowe.pl/uslugi) · [intersection documentation](http://www.pomiarydrogowe.pl/ewidencja-drog/uslugi-dodatkowe/dokumentacja-skrzyzowan)
- [LEHMANN+PARTNER GmbH — company](https://www.lehmann-partner.de/unternehmen/) · [mobile capture systems](https://www.lehmann-partner.de/messsysteme-mobile-erfassung/) · [condition survey](https://www.lehmann-partner.de/zustandserfassung-mobile-erfassung/) · [AI/KI](https://www.lehmann-partner.de/kuenstliche-intelligenz-k-i/) · [R&D](https://www.lehmann-partner.de/forschung-entwicklung/)
- [Ginger Group — Poland subsidiary](https://www.groupeginger.com/en/ginger-group-agencies-and-subsidiaries-monde/poland) · [Kompass company record](https://pl.kompass.com/c/lehmann-partner-polska-sp-z-o-o/pl129707/) · [LP-Drogomistrz app](https://play.google.com/store/apps/details?id=pl.lehmann.partner.dod)
- [EU Directive 2019/1936 — road infrastructure safety management](https://eur-lex.europa.eu/EN/legal-content/summary/road-infrastructure-safety-management.html) · [full text](https://www.legislation.gov.uk/eudr/2019/1936/article/1) · [ETSC — network-wide road safety assessment methodology](https://etsc.eu/network-wide-road-safety-assessment-methodology-published/)
- [GIS-Point — services](https://gis-point.com/) · [LiDAR & point cloud](https://gis-point.com/gis-production/lidar) · [geospatial industry](https://gis-point.com/industries/geospatial/)
- Segment scan: [Heller](https://www.heller-ig.de/en/services/pavement-condition-survey-and-assessment-zeb-1), [WDM](https://www.wdm.co.uk/surveying-services/), [XAIS-PTS](https://xais-pts.co.uk/surveys/), [Zetica](https://www.zetica.com/services/zeticaroad-surveys/), [Fugro roads](https://www.fugro.com/expertise/roads), [DEPHOS](https://dephos.com/pl/oferta/98-pomiary-drog), [PPRD](https://pprd.pl/004.html), [Pathway Services](https://www.pathwayservices.com/), [Roadway Asset Services](https://www.roadwayassetservices.com/), [ICC-IMS](https://icc-ims.com/services/network-level-pavement-management/pavement-condition-surveys/)

> **Research note:** `pomiarydrogowe.pl`, `lehmann-partner.de` and `gis-point.com` were not directly reachable from the session's network (egress proxy block). Company profiles were reconstructed from indexed search content. Before this ICP is used for outbound, the anchor-account facts and the target list should be re-verified directly against the sites.
