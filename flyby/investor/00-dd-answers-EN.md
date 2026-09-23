# FLY BY / GIS-Point Ltd — Response to Due Diligence Questionnaire

**Stage:** pre-seed · **Round:** $1M · **Date:** [FILL: date]
**Prepared by:** Ievgen Lavrishko, CEO, GIS-Point Ltd (Companies House No. 15059660)

> **Working instructions — delete this block before sending.**
> Every `[FILL: …]` must be replaced with verified data. Do not estimate, do not round in our
> favour, do not send with placeholders remaining. Where the honest answer is "we do not have
> this yet", keep the **(C)** marker and the date — that is a valid pre-seed answer and is far
> safer than a number we cannot defend.

---

## How to read this response

We have marked every answer:

- **(A)** — answered here, with data we can evidence today.
- **(B)** — supporting documents in the data room by **[FILL: date]**.
- **(C)** — does not exist yet. We say so explicitly, with the date and the conditions under
  which it will exist.

We are a pre-seed company. Several items below are **(C)**. We would rather show you an
accurate map of what exists than a confident one that does not survive verification.

---

## 1. Corporate structure and ownership

**1.1 Entities, IP, employment, investment**

- Entities: [FILL: GIS-Point Ltd (UK) only / UK Ltd + Ukrainian entity — give name, registration
  number, and ownership relationship]. **(A)**
- IP ownership: [FILL: which entity owns the algorithm, source code, and map data]. **(A)**
- Employment contracts held by: [FILL]. Investment to be received by: [FILL — normally the UK
  entity; state clearly]. **(A)**
- IP currently in Ukraine: [FILL: none / list it]. Transfer mechanism and timing:
  [FILL: IP assignment agreement + date, or "not applicable"]. **(A/B)**

**1.2 Other business lines**

[FILL: Does GIS-Point Ltd run any activity other than FLY BY — e.g. legacy geospatial services?]
If yes, state: separate cost centres, separate contracts, no shared IP, and how staff time is
allocated. If FLY BY is the only activity, say so in one sentence. **(A)**

**1.3 Cap table, instruments, vesting, IP assignments**

- Cap table: [FILL — shareholders, %, share class]. **(B)**
- Instruments issued to date: [FILL: SAFEs / convertibles / options / none]. **(A)**
- Founder vesting: [FILL: in place — terms / not yet in place — date it will be]. **(A)**
- IP assignments: [FILL: signed by all founders, employees and contractors / list any gaps and
  the date they will be closed]. **(A)**

> Note for internal use: if vesting or any IP assignment is missing, put it in place before
> sending this response, and answer "in place since [date]". Do not answer "we intend to".

---

## 2. Team

**2.1 Composition, location, continuity**

- Founders full-time: [FILL: which of the three are full-time; if any is part-time, state their
  hours and when they go full-time]. **(A)**
- Team beyond founders: [FILL: N employees, M contractors, roles]. **(A)**
- Locations: [FILL: by country/city]. **(A)**
- Mobilisation exposure for Ukraine-based staff: [FILL: how many are of mobilisation age, how
  many hold reservations/booking, what the actual exposure is]. **(A)**
- Continuity plan: [FILL: code and map data redundancy, documented handover, who can continue
  each critical function, whether any function is single-person]. **(A)**

> This question is asked because single-person dependency on a Ukraine-based engineer is a
> realistic failure mode. Answer it directly, including where we are exposed.

**2.2 Founders' previous companies**

*CEO's cartography company (2016–2023):*
- Outcome: [FILL: closed / sold / dormant — and the date]. **(A)**
- Who owns its IP and data today: [FILL]. **(A)**
- Non-competes applicable: [FILL: none / describe]. **(A)**
- Does any of that IP or data underpin FLY BY: [FILL: **direct yes/no**. If yes — describe
  exactly what, and the assignment or licence that gives GIS-Point Ltd the right to use it].
  **(A)**

*Chief Scientist's prior UAV company:*
- Outcome: [FILL]. **(A)**
- Who owns its IP and data today: [FILL]. **(A)**
- Non-competes applicable: [FILL]. **(A)**
- Does any of that IP or data underpin FLY BY: [FILL — same requirement as above]. **(A)**

---

## 3. Product and technology

### 3.1 Accuracy result — test conditions and provenance

**Before answering, reconcile the metric.** Our September 2026 deck states *15 m **median***
error under jamming and spoofing; this questionnaire refers to a *15 m **RMSE*** result. Same
number, different statistic. Establish which label is correct and state the transition
explicitly — "the figure you saw described as RMSE is [X]; the deck figure is the median of
the same run" — rather than silently substituting one for the other.

- Metric and figure: **15 m median horizontal error under jamming and spoofing**, best fix 3 m,
  target 5 m on a map base under 12 months old. [FILL: add the RMSE for the same run if it
  exists, so both statistics are on the table]. **(A)**
- Operating envelope in which this was achieved: **110–1500 m AGL, up to 110 m/s (≈400 km/h)**;
  below 150 m AGL the solution runs on visual odometry. **(A)**
- Number of flights: [FILL]. Total distance: [FILL] km. Total duration: [FILL]. **(A)**
- Airframe(s): [FILL: type, MTOW, fixed-wing/multirotor]. **(A)**
- Terrain types covered: [FILL]. Altitudes: [FILL] m AGL. Seasons: [FILL]. **(A)**
- Ground truth method: [FILL: RTK GNSS log / post-processed GNSS / other — and its own accuracy].
  **(A)**
- Who ran the tests: [FILL]. Who witnessed them: [FILL — if no independent witness, say
  "internal team only, no independent witness"]. **(A)**
- EW conditions: measured in flight in Ukraine under live jamming and spoofing, with GPS
  excluded from the solution. [FILL — **then answer the precise question they asked**: was this
  front-line EW or a test-range emitter? Whose emitter? "Live jamming" and "front-line EW" are
  not the same claim and they will press on the difference]. **(A)**

> If there was no independent witness, say so and propose the remedy: an independently witnessed
> test is in scope for this round at milestone [FILL: M#], with [FILL: proposed witness].

### 3.2 Maximum error, drift, and the cited benchmark

- Maximum observed error: [FILL] m, over [FILL] km. **(A)**
- Error growth over distance: [FILL: describe the observed relationship — our claim is that error
  is bounded by map-match quality rather than accumulating with time, which is the core
  difference from pure INS. Support it with the data or state that the dataset is too short to
  demonstrate it]. **(A)**
- **Comparability to the 51.95 m / 564 km benchmark we cited:** [FILL — the honest answer is
  almost certainly "no, not directly comparable", because our longest continuous run is
  [FILL] km against 564 km. State that plainly, explain that we cited it as context for the
  class of problem rather than as a like-for-like result, and either restate the comparison
  correctly or withdraw it]. **(A)**

### 3.3 Degraded conditions and failure behaviour

- Featureless or changing terrain (water, continuous forest, snow, freshly ploughed fields):
  [FILL: quantified degradation if measured; if not measured, say "not yet quantified"]. **(A/C)**
- Bad weather, cloud below flight altitude, smoke: optical matching does not function.
  [FILL: what the system does in that state — hold on INS, flag invalid, hand back to autopilot].
  **(A)**
- Map-match failure behaviour: [FILL: detection method, what is reported to the autopilot,
  recovery behaviour]. **(A)**
- Night channel sensor basis: [FILL: thermal / low-light / SWIR — and why]. **(A/C)**
- Is a daylight-only product viable for our customers: [FILL — honest commercial answer. If a
  meaningful share of target missions are daylight, give the share and the source of that
  figure. If we do not know, say we are asking OEMs this question now]. **(A/C)**

### 3.4 TRL, demo, autopilot integration

- TRL 4 assessed by: [FILL: self-assessed / [named body]]. **(A)**

  > Note: our public material describes the algorithm as "flight-tested", which normally implies
  > TRL 5–6, while this response states TRL 4. Reconcile these before sending and use one
  > consistent claim.

- Missing for TRL 6: [FILL: list concretely — e.g. integrated module in representative airframe,
  demonstrated in relevant environment, independent witness]. **(A)**
- Demo witness: [FILL: proposed witness and date, or "to be agreed with you"]. **(A/C)**
- **EKF3 handover — what is currently failing:** [FILL: precise technical description — e.g.
  behaviour on source switching, timing/latency of the position message, covariance or accuracy
  fields rejected by the estimator, yaw/heading source conflict. Be specific; this is the
  question where technical credibility is won or lost]. **(A)**
- Plan B: [FILL: alternative injection path or estimator configuration]. **(A)**
- Other autopilots: PX4 [FILL: supported / planned, date]. Proprietary Ukrainian autopilots
  [FILL: which, status of any conversation]. **(A/C)**

### 3.5 Compute and latency

- Current compute platform: [FILL: exact module]. **(A)**
- Current per-frame latency: [FILL] ms — and state whether this is **latency** (frame to position
  output) or **throughput** (one frame processed every N ms). These are different and the
  distinction matters for the autopilot. **(A)**

  > You were previously given 716 ms current / 200 ms target. Our September 2026 deck states
  > **100–200 ms** as achieved. If that is genuine progress, present it as news with a date and
  > an explanation of what produced it. If the 716 ms figure applied to a different configuration
  > or different hardware, say exactly that. Unexplained, it reads as figures that move
  > depending on the audience.

- Path from [FILL] ms to 200 ms: [FILL: the specific levers — algorithmic changes, resolution or
  search-window reduction, hardware acceleration, change of compute platform — with expected
  contribution of each]. **(A)**
- Sub-60 ms for jet drones on airframe-compatible hardware: [FILL: honest assessment. If it is
  not demonstrated, say it is a target and state what would have to be true — e.g. a specific
  accelerator, a reduced-scope matching mode — rather than asserting feasibility]. **(A/C)**

### 3.6 Integration effort on a new airframe

- Typical integration time: [FILL: person-days / calendar weeks, and whether this is measured or
  estimated]. **(A/C)**
- Split of work with the OEM: [FILL: what we deliver — module/SDK/documentation; what the OEM
  does — mounting, power, camera, autopilot configuration, flight testing]. **(A)**

### 3.7 Captured module — exposure and protection

- What an adversary could extract: [FILL: honest assessment — firmware, matching algorithm,
  on-board map package for the flown corridor, configuration]. **(A)**
- Protections in place today: [FILL: encryption at rest, secure boot, key storage, tamper
  response, map scoping to mission corridor only — state what exists **now** versus what is
  planned]. **(A/C)**

> Do not overstate here. "Currently no anti-tamper; map package is scoped to the mission
> corridor; hardening is planned at [M#]" is a credible pre-seed answer.

---

## 4. Dependencies and supply chain

### 4.1 Hardware

| Component | Supplier | Country of origin | Second source | Lead time |
|---|---|---|---|---|
| Camera | [FILL] | [FILL] | [FILL] | [FILL] |
| Compute | [FILL] | [FILL] | [FILL] | [FILL] |
| IMU | [FILL] | [FILL] | [FILL] | [FILL] |

- **PRC-origin parts:** [FILL: **direct yes/no per component.** If yes, name them and give the
  replacement plan and timeline — for EU/UK defence funding and for most OEM customers this is a
  qualifying issue, and it is better raised by us than found by you]. **(A)**
- BOM cost today: [FILL] per unit. At 600 units/month: [FILL] per unit. **(A/C)**
- Assembly location: [FILL]. Capacity: [FILL] units/month, constrained by [FILL]. **(A/C)**

### 4.2 Map data

- Imagery supplier: [FILL]. DTM/DSM supplier: [FILL]. **(A)**
- Licence type and cost: [FILL]. **(A)**
- **Does the licence permit onboard use in military products:** [FILL — this must be answered
  from the licence text, not from assumption. If it does not, state the alternative source we
  are moving to and when]. **(A)**
- Update frequency: [FILL]. **(A)**
- Who prepares the map package per mission: [FILL: us / the OEM / the operator — and how long it
  takes]. **(A)**
- If the supplier cuts access: [FILL: alternative sources, switching effort, whether the matching
  algorithm is source-agnostic]. **(A)**

### 4.3 ML models and cloud dependencies

- ML models used: [FILL: yes/no. If yes — what for, trained on what, and our rights to that
  training data]. **(A)**
- Non-European clouds or APIs in the product or the map pipeline: [FILL: yes/no, which, and
  whether the onboard system has any runtime dependency on them]. **(A)**

---

## 5. Market, traction and pilots

### 5.1 The 600 units/month pipeline

> This is the question most likely to be verified. Give the real status per line, including
> "verbal" where that is the truth. A short honest list is worth more than a long soft one.

| Manufacturer | Contact & role | Platform | Volume | Last contact | Status |
|---|---|---|---|---|---|
| [FILL] | [FILL] | [FILL] | [FILL] | [FILL] | [contract / paid pilot / trial / LOI / **verbal**] |
| [FILL] | [FILL] | [FILL] | [FILL] | [FILL] | [FILL] |

- Supporting documents in the data room: [FILL: which lines have written evidence; explicitly
  note which have none]. **(B)**
- First LOI expected: [FILL: name the counterparty and the date, or state that no LOI is in
  negotiation yet]. **(A/C)**

### 5.2 OEM flights to date

- Has any OEM flown FLY BY on its own airframe: [FILL: **yes/no**]. **(A)**
- All pilots and trials to date: [FILL: table of date, counterparty, paid/unpaid, units
  delivered, result. If the answer is none, state "none to date"]. **(A/C)**

### 5.3 Pilots planned with this round

| Customer | Timing | Success criteria | Paid? |
|---|---|---|---|
| [FILL] | [FILL] | [FILL — quantified: accuracy, availability, integration time] | [FILL] |

**(A/C)**

### 5.4 Procurement routes

*Ukraine* — outline, to be confirmed against current requirements: [FILL and verify]
- Brave1 cluster: [FILL: our status — registered / grant applied / not engaged].
- DOT-Chain Defence marketplace: [FILL: status and what admission requires for our product class].
- Codification / NATO stock number: [FILL: status, expected timeline, who is advising us].

*EU and UK:* [FILL: route per market — direct to OEM as a component supplier vs. national defence
procurement; whether our sale is B2B to the airframe manufacturer rather than to a ministry,
which changes the applicable route]. **(A/C)**

### 5.5 Competition and price justification

- Ukrainian competitors: [FILL: names, claimed accuracy, price where known, and the source of
  that information]. **(A)**
- Why an OEM pays $4,000 for FLY BY: [FILL: the argument must be in the OEM's terms — mission
  completion rate under GNSS denial, aircraft recovered, no RF emission therefore no additional
  signature, no change to operator workflow. Tie it to the cost of a lost airframe and payload].
  **(A)**
- Civil operator testing: [FILL: yes — who and result / no, not yet]. **(A/C)**

---

## 6. Commercial

**6.1 Pricing and margin**

- Module price vs. licence-only price: [FILL: both figures and what each includes]. **(A)**
- Gross margin today: [FILL]%. At scale: [FILL]% at [FILL] units/month. **(A/C)**

**6.2 Use of proceeds and runway**

| Milestone | Deliverable | Budget | Target date |
|---|---|---|---|
| M1 | [FILL] | [FILL] | [FILL] |
| M2 | [FILL] | [FILL] | [FILL] |
| M3 | [FILL] | [FILL] | [FILL] |
| M4 | [FILL] | [FILL] | [FILL] |

- Monthly burn: [FILL]. Runway after M4: [FILL] months. **(A)**
- If the round slips or only part of $1M is raised: [FILL: state the minimum viable amount, which
  milestones survive at that amount, and what is cut. Investors read the absence of this answer
  as the absence of the plan]. **(A)**

**6.3 DIANA, DASA, EU4UA**

| Programme | Status | Deadline | Takes IP or equity? |
|---|---|---|---|
| DIANA | [FILL] | [FILL] | [FILL] |
| DASA | [FILL] | [FILL] | [FILL] |
| EU4UA | [FILL] | [FILL] | [FILL] |

**(A/C)**

---

## 7. Export control

- Classification under Ukrainian rules: [FILL]. **(A/C)**
- Classification under EU dual-use rules: [FILL]. **(A/C)**
- Classification under UK rules: [FILL]. **(A/C)**
- Can modules built in Ukraine be exported to EU OEMs today: [FILL: yes/no and under what
  conditions]. **(A/C)**
- Is the classification documented in writing: [FILL: yes — by whom and when / **no — a written
  classification opinion has been commissioned from [FILL] and is expected [FILL date]**]. **(A/C)**

> At pre-seed, "we have commissioned a written classification and expect it on [date]" is an
> acceptable answer. "We have not considered it" is not. If no opinion has been commissioned,
> commission one before sending this response.

---

## 8. Financing

- Committed so far: [FILL: amount and from whom, or "no commitments to date"]. **(A)**
- Founder contribution: [FILL: cash and/or documented sweat equity]. **(A)**
- Target close date: [FILL]. **(A)**
- Strategic investors involved: [FILL: yes — who and what they bring / no]. **(A)**

---

## Data room

Access will be issued to both recipients on [FILL: date]. Contents: [FILL: list — corporate
documents, cap table, IP assignments, flight test logs, BOM, map data licence, OEM correspondence,
financial model].

**Contact:** Ievgen Lavrishko, CEO, GIS-Point Ltd
[FILL: verified email — confirm the correct domain before sending] · [FILL: phone]
41 Devonshire Street, London, W1G 7AJ · Companies House No. 15059660
