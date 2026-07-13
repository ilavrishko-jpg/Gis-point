# FlyBy — Financial Model & Funding Ask (working draft)
All figures USD. Market-size top-line to be reconciled with deep-research output; unit economics and
use-of-funds are model-driven and defensible at pre-seed (assumptions stated).

## A. Market sizing — bottom-up (attach model)
FlyBy monetizes as a **per-airframe navigation license** (± hardware). Size = drone volume × attach rate × price.

Assumptions (state as scenario ranges; reconcile drone-volume/price with research):
- Serviceable military/dual-use drones needing alt-PNT per year (ISR + strike + loitering), addressable
  geographies (UA + NATO/allied): **Low 500K / Base 1.5M / High 3M units/yr** (front-line attrition drives volume).
- Realistic FlyBy price per unit (blended SW license + HW/NRE amortized): **$150 / $400 / $900**.
- **Bottom-up TAM (annual):**
  - Low: 500K × $150 = **$75M**
  - Base: 1.5M × $400 = **$600M**
  - High: 3M × $900 = **$2.7B**
- **SAM (3-yr reachable — UA OEMs + early allied):** ~10–15% of Base → **$60–90M/yr**.
- **SOM (Year 3 realistic capture):** ~1–3% of SAM → **$1–3M ARR** (see projections).

> Cross-check against top-down TAM from research (GNSS-denied PNT market, military drone market, alt-PNT
> market CAGRs). Present both; investors want bottom-up primary, top-down sanity check.

## B. Pricing & business model
- **Software license per airframe:** $100–$500/unit depending on capability tier (VIO-only vs full
  absolute nav + terminal guidance).
- **Reference hardware (optional):** companion compute + camera, sold at ~30–40% margin or licensed to OEM
  to self-source.
- **NRE / integration fees:** $25K–$150K per OEM design-in (front-loaded, funds custom AO map tuning).
- **Government grants (non-dilutive):** Brave1, NATO Innovation Fund, EU EDF/EDIRPA, DIU/SBIR — treat as
  runway extenders, not revenue.
- Gross margin target: **software 85%+**, blended **65–75%** including HW/NRE early.

## C. Unit economics (illustrative, per OEM account)
- ACV of a mid-size ISR OEM: 20K units/yr × $300 = **$6M/yr** at full run-rate; realistic Year-1 ramp 1–3K
  units → **$0.3–0.9M**.
- CAC (defense, design-partner motion): dominated by engineering/integration time, ~$50–120K per design-in.
- Payback: <12 months once a program reaches even 2–3K units/yr.
- LTV: high — once embedded in an airframe, multi-year per-unit recurring; switching cost significant.

## D. 3-Year projections (base case, post pre-seed)
| | Y1 (2026–27) | Y2 | Y3 |
|---|---|---|---|
| Design-partner OEMs | 3 | 6 | 12 |
| Paid units (cum/yr) | 2,000 | 25,000 | 120,000 |
| Blended price/unit | $250 | $300 | $350 |
| Product revenue | $0.5M | $2.0M | $6.0M |
| + NRE/integration | $0.3M | $0.6M | $1.0M |
| + Grants (non-dilutive) | $0.8M | $1.0M | $1.0M |
| **Total inflows** | **$1.6M** | **$3.6M** | **$8.0M** |
| Headcount (EOY) | 8 | 16 | 30 |
| Gross margin | 60% | 70% | 75% |
| Net burn (of raise) | high | breakeven-ish | cash-generative |

> These are ambition-calibrated pre-seed projections (defense volume is lumpy but large). Present as a
> scenario, not a promise; the milestone chart matters more than the hockey stick to a pre-seed investor.

## E. The ask — $500K–$1M pre-seed
**Recommendation: raise $750K on a SAFE**, post-money valuation cap **$5–7M** (defense-tech pre-seed norm;
confirm 2025–26 benchmarks from research). Blend with **$0.5–1.0M non-dilutive** (Brave1/NIF/EDF) to reach a
~$1.3–1.75M effective budget without heavy dilution.

Rationale for $750K (not the full $1M dilutive): pre-seed defense rounds are milestone-gated; a tight raise
+ grants preserves ownership and sets up a stronger seed at a higher mark after field proof.

### Use of funds (18-month runway on $750K, extended by grants)
| Bucket | % | $ | What it buys |
|---|---|---|---|
| Engineering (CV/VIO, embedded, integration) | 55% | $412K | 3–4 senior engineers, core nav stack to TRL 6–7 |
| Field testing & hardware | 15% | $113K | Reference HW, flight tests on real AOs, jamming trials |
| Map/data pipeline & compute | 12% | $90K | Base-map ingestion, GPU/edge compute, dataset build |
| GTM / BD / grants | 10% | $75K | Design-partner BD, Brave1/NIF/DIU applications, demos |
| G&A / legal / IP / entity | 8% | $60K | Dual-use structuring, patents, allied-export entity |
| **Total** | 100% | **$750K** | |

### Milestones this round must hit (to unlock seed)
1. **TRL 6–7:** working nav stack demonstrated on a real UAV, on a real AO, under active/simulated jamming.
2. **Hard metric:** absolute-position error target (e.g., ≤10 m CEP) and >X% mission completion under EW.
3. **3 signed design partners** + ≥1 paid integration / LOI from a strike-drone program.
4. **≥1 non-dilutive grant secured** (Brave1 / NIF / EDF).
5. **Codification / Brave1 registration** and a repeatable OEM integration playbook.
> Hitting these de-risks the seed ($3–5M) at a $15–25M cap.

## F. Valuation & benchmark notes (reconcile with research)
- European/UA pre-seed defense-tech: rounds commonly **$0.5–1.5M** at **$4–8M post** caps (2024–26).
- Defense-tech is in a capital super-cycle (NATO spend ↑, NIF €1B, US defense-tech mega-rounds) — narrative
  tailwind for valuation.
- Ukraine-origin + battle-proof is a *premium* signal to defense funds, but a *discount* risk to generalist
  funds (war, export, entity). Target defense-specialist and dual-use investors.

## G. Investor targets (confirm/expand from research)
- **Non-dilutive / strategic:** Brave1 (UA gov cluster grants), NATO Innovation Fund, EU EDF/EDIRPA, US DIU/
  AFWERX/SBIR (via allied path).
- **Defense/dual-use VCs:** D3 (Dare to Defend Democracy), Green Flag Ventures, MITS Capital, Sequoia/a16z
  American Dynamism (later), Project A, Expeditions Fund, In-Q-Tel-style; UA angels & diaspora syndicates.
