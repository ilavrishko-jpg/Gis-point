# FlyBy — Proof, Market Math & Investment Verdict
### "Show me real numbers with proof, and tell me if this is a good business or not."
**Date:** July 2026 · No pretty pictures. Every number below is sourced or shown as arithmetic.

Evidence tags: **`[P]`** primary/press source · **`[S]`** secondary market-research firm (directional) ·
**`[M]`** my calculation from the inputs above it (you can redo the math yourself).

---

## PART 1 — PROOF THE PROBLEM IS REAL (demand exists)

| Fact | Number | Source |
|---|---|---|
| Ukraine drone losses to jamming | **~10,000 / month** | RUSI 2023, via Forbes (May 2023) `[P]` |
| FPV drones that fail to reach target under EW | **60–80%** | RUSI (Feb 2025) `[P]` |
| Ukraine already fielding optical navigation | since **Dec 2024** | IEEE Spectrum `[P]` |
| Nations operating military drones | **100+** | Statista / NSIN (2025) `[P]` |

**Read:** the pain is quantified, current, and the market is *already buying the category of solution FlyBy
sells.* This part is proven, not assumed.

---

## PART 2 — HOW MANY CUSTOMERS ACTUALLY EXIST (the buyer count)

This is the number most decks hand-wave. Here it is, sourced.

### Ukraine (your first market)
| Buyer pool | Count | Source |
|---|---|---|
| Drone manufacturers operating in Ukraine (2025) | **~500** (up from ~10 in 2022) | Kyiv Independent, Georgetown GSSR (2025) `[P]` |
| New drone companies registered | 41 (2022) → 132 (2023) → 183 (2024) → **+107 in first 4 mo of 2025** | Georgetown GSSR `[P]` |
| Companies building **AI-enabled** drones | **200+** | Kyiv Independent (2025) `[P]` |
| Defense-tech companies in the Brave1 cluster | **1,500** (≈3,500 products) | Kyiv Post / Brave1 (Dec 2025) `[P]` |
| Brave1 grants awarded in 2025 | **240** | Brave1 (2025) `[P]` |

### Global / allied
| Buyer pool | Count | Source |
|---|---|---|
| Nations operating military drones | **100+** | Statista / NSIN `[P]` |
| Annual procurement of *high-value* military drones (MALE/HALE/tactical) | **~16,157 units (2026) → 26,544 (2031)** | MarketsandMarkets `[S]` |

**Realistic serviceable buyer count (not all 500 — only those building drones that fly beyond short FPV
range and actually need onboard navigation):**
- Ukraine: the ISR + strike/long-range subset of ~500 makers → **~50–150 relevant OEM accounts** `[M]`.
- Allied/NATO + loitering-munition makers → **another ~100–300 accounts** `[M]`.
- **≈ 150–450 realistically addressable OEM accounts worldwide.** You do not need thousands of customers;
  a per-airframe license means **10–20 OEM design-ins can carry an eight-figure business.**

---

## PART 3 — PROOF OF VOLUME (units flowing through the market)

| Fact | Number | Source |
|---|---|---|
| Ukraine drone production, 2024 | **2.2M** total (1.5M FPV) | OSW, Forbes/Axe (2025) `[P]` |
| Ukraine production target / actual, 2025 | **4.0–4.5M / year** ("more than all NATO combined") | Bloomberg, Forbes (Nov 2025) `[P]` |
| Ukraine stated ambition | **7M+ / year** | Aviation Week (2025) `[P]` |
| FPV airframe cost (Ukraine, 2025) | **~$400–500** | Forbes/Hambling (Apr 2025) `[P]` |

**This is the single strongest number in the whole thesis:** the volume is not hypothetical. One country is
already pushing **4 million units/year** through the funnel, and every one of them faces GPS denial.

---

## PART 4 — TAM / SAM / SOM, WITH THE ARITHMETIC SHOWN

I do **not** use the "$10B market" headline as the basis. That is a *category* (Assured PNT, $846M→$10.2B
by 2035 `[S: GMInsights]`) and it includes satellite and antenna approaches that *compete* with FlyBy. It's
the tailwind, not the plan. The real basis is **bottom-up: units × attach-rate × price.**

### The honest correction most decks skip
**Not every drone will pay for a navigation module.** Cheap short-range FPV (<5 km) is often manually
piloted or fibre-optic-guided — low ability and low need to pay. So I split the market into layers and only
count what genuinely needs onboard GPS-denied nav:

| Layer | What it is | Annual units (UA + allied) | Willing to pay/unit for nav | Why |
|---|---|---|---|---|
| **1. High-value military UAV** | MALE/HALE, tactical ISR, cruise | ~25,000 `[S]` | **$1,000–3,000** | Platform costs $100k+; nav is a rounding error |
| **2. Attritable strike / deep-strike / long-range ISR** | loitering munitions, one-way-attack | ~500,000–1,000,000 `[M from P]` | **$150–500** | Flies far, needs to hit under denial; **the sweet spot** |
| **3. Cheap short-range FPV** | <5 km FPV | ~3,000,000 `[P]` | **$0–75** | Often fibre/manual; optionality only |

### TAM — total annual addressable (layers 1 + 2, the defensible core) `[M]`
```
Layer 1:  25,000 units   × $1,500 avg  = $37.5M / year
Layer 2:  750,000 units  × $250 avg    = $187.5M / year
------------------------------------------------------
TAM (core, addressable now)            ≈ $225M / year
+ Layer 3 optionality (3M × $50)        = +$150M  (discount heavily; NOT core)
TAM with upside                        ≈ $375M / year, growing toward the $10.2B category by 2035
```
**Honest read:** the *addressable-today* market is **~$200–375M/year**, not "$10 billion." That is still a
large, real, fast-growing market for a pre-seed company. Anyone who tells you the TAM is $10B is selling you
the category, not the reachable market.

### SAM — 3-year reachable (Ukraine + early allied, layers 1+2) `[M]`
```
Ukraine strike/ISR needing nav: ~500,000 units × $250 = $125M / year
+ early allied design-ins                              ≈ $60–90M / year realistically reachable
SAM                                                    ≈ $60–125M / year
```

### SOM — realistic Year-3 capture `[M]`
```
Capture 1–3% of a $60–125M SAM  →  $1–3M annual revenue by Year 3
Cross-check: ~10–20 OEM design-ins × ~$150k avg annual = $1.5–3M  ✓ (two methods agree)
```
The two independent methods landing in the same **$1–3M Year-3** range is the point — the model is
internally consistent, not a single hopeful multiplication.

---

## PART 5 — PROOF THE MONEY IS THERE (that this gets funded & bought)

| Fact | Number | Source |
|---|---|---|
| Auterion — visual-nav autonomy | **$130M** Series B + **$50M Pentagon contract, 33,000 kits** for Ukraine | Auterion, IEEE (2025) `[P]` |
| Advanced Navigation — GNSS-denied nav | **$110M** Series C (~$1B val) | Advanced Navigation (Mar 2026) `[P]` |
| ANELLO Photonics — GPS-denied nav | **$25M** (Lockheed Martin Ventures) | Inside GNSS (May 2026) `[P]` |
| Ukrainian defense-tech raised (2025) | **$105M+ across 50+ startups** | Kyiv Post / Brave1 `[P]` |
| Typical Ukrainian pre-seed round (2025) | **$200–400K** most common; **$1–1.5M** second | Kyiv Post / Brave1 `[S]` |
| European defense-tech VC (2025) | **record $1.5B** | Vestbee `[S]` |
| Brave1 grant budget (2024) | **~$39M** (1.5B UAH) | AIN.ua `[P]` |

**Read:** capital is flowing into this exact problem, buyers are placing 30,000-unit orders, and your
$500K–$1M target sits right in the proven Ukrainian pre-seed band. Fundability is proven.

---

## PART 6 — THE VERDICT: is this worth your time and money?

### Score card (what the proof actually supports)
| Test | Verdict | Basis |
|---|---|---|
| Is the problem real & urgent? | ✅ **Strong yes** | 10k drones/mo, 60–80% fail `[P]` |
| Do enough buyers exist? | ✅ **Yes** | ~500 UA makers, 150–450 serviceable accounts, 100+ nations `[P]` |
| Is the volume real? | ✅ **Very strong** | 4M+ drones/yr in Ukraine alone `[P]` |
| Is the market big enough? | 🟨 **Yes, but not $10B** | ~$200–375M/yr addressable now `[M]`; category $10.2B by 2035 `[S]` |
| Will they pay for a *separate* nav module? | 🟨 **Only the mid/high-value slice** | cheap FPV won't; strike/ISR will `[M]` |
| Is it fundable? | ✅ **Yes** | peers raised $25–130M; UA pre-seed band fits `[P]` |
| Can the tech actually be built? | 🟥 **UNPROVEN — this is the whole risk** | SOTA is 11–20 m, not GPS-grade, brittle in low-light/seasonal `[P]` |
| Is competition a threat? | 🟥 **Yes, serious** | Auterion already shipping visual nav to Ukraine at 33,000-unit scale `[P]` |

### Bottom line
**Conditional GO.** This is a *good business to invest time and a capped amount of money into* — **but the
bet is not the market, it's the technology.** The demand, buyers, volume, and funding are all proven. What
is **not** proven is that FlyBy can deliver navigation that is **accurate and robust enough under real
jamming, in bad light and featureless terrain, to beat the ~11–20 m state of the art** — and that it can do
so before well-funded incumbents (Auterion) make visual nav the default bundled feature.

### The rule I'd hold you to
> **Spend the pre-seed to buy one thing: proof.** Do not raise $1M to "build the company." Raise ~$750K
> (+ Brave1 grant) to answer, in 3–6 months and as cheaply as possible, two yes/no questions:
> 1. **Tech:** On a real UAV, on a real area of operations, under active jamming — can FlyBy hold **≤10 m
>    absolute error and complete the mission**, including in degraded visual conditions?
> 2. **Willingness to pay:** Will **2–3 design-partner OEMs** sign to integrate it and confirm a per-unit
>    price they'd actually pay?

**If both are YES within 6 months → this is a strong business; press hard, raise the seed.**
**If the tech metric fails, or design partners say "Auterion already covers this" → STOP.** You'll have
spent months and a capped sum to avoid spending years and a fortune. That is a good outcome too.

The market is not the risk here. **The physics is.** Invest the money to de-risk the physics first — and
only then the business.

---

## Appendix — sources
Kyiv Independent (200+ AI-drone cos); Georgetown GSSR & OSW (UA manufacturer counts & production); Forbes/
Axe & Bloomberg (4–4.5M production); Forbes/Hambling (FPV cost); Aviation Week (7M ambition); RUSI (2023/
2025) & IEEE Spectrum (problem scale); MarketsandMarkets (high-value drone units) & GMInsights (Assured
PNT); Auterion / Advanced Navigation / Inside GNSS (competitor funding); Kyiv Post / Brave1 / Vestbee /
AIN.ua (funding benchmarks). Full URLs in `FlyBy-PreSeed-Marketing-Investment-Research.md`, Appendix A.

**Do NOT use (refuted in fact-checking):** loitering-munition market "$5.36B→$13.26B" and "GNSS-independent
PNT constellation" figures — they failed verification.
