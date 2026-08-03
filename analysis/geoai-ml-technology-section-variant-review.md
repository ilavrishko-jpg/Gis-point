# GeoAI & ML section — variant review for `/technology`

**Artifact reviewed:** "GeoAI & ML section — mockups for /technology" (three layout treatments, A / B / C).
**Lens applied:** GIS-Point GTM + tier logic (locked spearhead + offer-ladder) and the single goal that matters here — **moving a lead from the website toward a contract.**
**Scope note:** the copy is identical in all three variants, so the layout choice is judged on salience, tier legibility and conversion structure. The copy gaps (Section 4) apply to all three and are the bigger conversion lever.

---

## 1. Where this section sits in the GTM / tier map

`/technology` is the **IT-Unit / Software & Platforms** page. In the locked GTM:

- The **GIS Department (production partner, green)** is the spearhead and the main front door.
- The **IT Unit (custom GIS software / GeoAI / allgis.io, violet #7C6FCD)** is the **top rung of the offer-ladder** — reached *after* a firm is embedded, or entered directly by pure-software buyers.

So this GeoAI/ML section is **premium-tier, not front-door**. Its job is not to win the first "cheap-vs-freeze" processing decision — that is the green spearhead's job. Its job is to make a technically literate buyer (or an already-embedded client) believe GIS-Point can build and *hand over* production-grade GeoAI, and then give them one obvious next step. That framing decides which layout is right: this is the flagship tier section and should **read as its own distinct tier**, not blend into the page.

---

## 2. The three variants

| | Variant A — Card grid | Variant B — Editorial rail | Variant C — Violet band |
|---|---|---|---|
| **Ground** | White, reuses `featureList` | White/paper, 2 columns, violet rule per item | Tinted violet band |
| **Build cost** | Lowest (reuses block) | Low | Small extra (needs `accent: gis \| it` on featureList) |
| **Salience** | Low — "sits quietly on white" | Lowest — deliberately quiet | Highest — owns its territory |
| **Tier legibility (violet = IT Unit)** | Accent only | Accent only | Full ground = tier is unmistakable |
| **Risk it solves** | none specific | page-overload fatigue | confusion with the stack grid 4 blocks above |
| **Closing "Validation" block** | in-grid | in-rail | runs **wide as the closing argument** |

---

## 3. Recommendation — **Variant C (Violet band)**, then A as the safe fallback, B third

**Why C wins for lead → contract:**

1. **Tier is legible at a glance.** Violet is the IT-Unit token. A full violet ground tells the buyer "this is a distinct, premium tier" before they read a word — which is exactly the GTM intent for the top rung of the ladder. A and B carry violet only as an accent, so the tier signal is weak.
2. **It solves a real comprehension bug.** The mockup notes the section can be mistaken for the stack grid four blocks above. Confusion kills conversion; a buyer who thinks "I already read this" scrolls past. C is the only variant that structurally separates the section.
3. **It gives the objection-handler maximum weight.** "Validation, not black boxes" is the single most conversion-relevant block on the page — it de-risks the purchase ("a number you can check, not a score you have to trust"). C runs it **wide as the closing argument**, right where a CTA belongs. That is the correct conversion shape: build belief, close the objection, then ask for the next step.

**Why A is the safe fallback:** cheapest to build, scannable, visually consistent. But "sits quietly on white" is the wrong optimization for a tier-defining, conversion-critical section, and it is the variant most exposed to the confusable-with-the-grid problem. Choose A only if engineering time is the hard constraint this sprint.

**Why B is third:** its one argument — the audit calls the page overloaded, so go lightest — is real, but overload is better fixed by cutting weak blocks (the plan already deletes the "On the agent layer" band) than by making the flagship tier section timid. Long single-column rails also tend to lose readers on mobile before the closing block.

---

## 4. The bigger conversion lever — fix in all three (copy, not layout)

Layout gets the section *seen*. None of the three variants converts on its own, because the copy has **no exit toward a contract**. These apply to A, B and C equally:

1. **No CTA / no next step (biggest blocker).** A convinced lead has nowhere to go. Add a tier-appropriate close: **"Book a technical session"** or **"See a live demo of allgis.io."** Per brand voice, **not** "free pilot." Without this, the section informs but never converts.
2. **No proof point — violates "proof before claim."** The section is all claim. "Validation, not black boxes" *promises* a measured number but *shows* none. Do **not** substitute an accuracy figure we cannot defend (e.g. the contested "500 km / 4 days / 97.2%" line — that number is not solidly verified and must not go on the page). Instead anchor with a proof we *own*: **allgis.io, our own geospatial SaaS running the same ML pipelines and evaluations in production.** A buyer can open it and check it; there is no metric to defend later. If a benchmark number is ever published here, the metric owner confirms it first.
3. **No down-ladder bridge.** GeoAI/ML is the top rung, reached after embedding via GIS production. A software-curious lead who is not ready for a full custom-AI contract currently bounces. Add a soft bridge — "not ready to build? start with a demo dataset on the production side" — so the lead still enters the funnel instead of leaving.

**Brand-voice compliance (all three pass):** no emojis, no em dashes, no "AI-native," no price-leading, no competitor name-dropping; "reduce cost" is carried by "at the cost of compute instead of headcount," which is defensible without an unverified number. Keep it that way — do not add adjectives to compensate for the missing proof point; add the *number*.

---

## 5. Double analysis — non-stock GeoAI & ML we can propose

"Stock" is what any off-the-shelf GIS or AI vendor already gives every client: a rented dashboard, a black-box score, a model they cannot maintain. Our differentiators are the opposite of all three, and they come from the moat — BSc+ engineers, our own production platform (allgis.io), and a handover model that leaves the client owning everything. Pure-AI shops lack the production QA; pure-production shops lack the ML. We hold both, which is what makes these hard to copy cheaply. Each proposition is read twice: the stock version, and our non-stock version.

| Proposition | Stock in the industry | Our non-stock version | Edge |
|---|---|---|---|
| **You own the agents** | Rented SaaS or a black box licensed back to you forever | Models, pipelines, prompts, tool schemas, governance and evaluations land in your repository; no proprietary framework licensed back | Handover model |
| **Accountable accuracy** | A confidence score you must trust, no threshold agreed, nobody's name on it | Thresholds agreed before anything ships, measured against a benchmark set, a BSc+ engineer signs off | Engineer sign-off |
| **Human-in-the-loop spatial QA** | Automated output shipped as-is, or QA that never touches the ML | Dual review (processor ≠ QA) applied to ML output — the discipline that keeps production rework low, now on the model | Production QA on AI |
| **Embedded, not a portal** | Log in to the vendor's dashboard to see your own data | Delivered as an API or a screen inside your own product, on your stack | Builds into your product |
| **Open standards, no lock-in** | Proprietary format, closed cloud AutoML, export only while you keep paying | PostGIS, OGC, WMS/WFS, your CRS — interoperable with what you already run | GIS-native, open |
| **Governed natural-language access** | A chatbot that answers, and sometimes acts, on its own | Plain-language questions on live spatial data with a human checkpoint before anything consequential is acted on | Safety by design |
| **Standing change monitoring** | A one-off detection project that ends at the invoice | Continuous detection from satellite and drone imagery as a recurring service — subsidence, encroachment, asset and vegetation change, exception-only review | Recurring, not one-off |

Which of these to surface on the page is a merchandising choice, not a build one — the C cards already carry pipelines, detection, prediction, natural-language and agents. The two that are not yet visible and differentiate hardest are **you own the agents** and **accountable accuracy**, which is why C+ leads its proof and closing line with exactly those.

## 6. One-line answer

**Ship Variant C (violet band): it is the only layout that reads as its own tier, avoids being mistaken for the grid above, and puts the trust-closing "Validation" block where a CTA belongs — but its conversion depends on adding the two things all three variants are missing: a tier-appropriate CTA ("book a technical session / see a live allgis.io demo," never "free pilot") and one *owned* proof under the Validation block — allgis.io, our own ML in production, not an accuracy figure we cannot defend.**
