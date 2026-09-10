# ICP1 → machine-runnable filter spec (USA)

Source of truth: **`GisPoint_ICP_Segmentation_v4`**, tab **`ICP · GIS Dept`** (Google Drive,
`1DAV-8NoBiYi3Sr6O1COoI8DE2j3IAZ00zf9NubXaAFg`).

**ICP1 = Tier 1 of the GIS/production unit: 30–200 people, ~$3M–$60M, from $5K per project
or a retainer — 54% of revenue.** (Confirmed with Ievgen, 10 Sep 2026.)

Everything else is scope context, not the target: Tier 2 (10–30), Tier 3 (0–10) and Tier 4
(200–500) are reported so you can see what sits either side of the core, but the headline
number is Tier 1 only. Unit 2 (IT Unit — GeoTech SaaS / AgriTech / Defence) is segmented by
*market segment* rather than headcount and is out of scope entirely.

---

## 1. What ICP1 actually says

| Attribute | Value (verbatim from the workbook) |
| --- | --- |
| Industry | Surveying / Geospatial / GIS / AEC / Architecture bureaus (production geospatial firms) |
| Sub-industry | Drone-LiDAR, topo/geodetic survey, GIS consultancies, Scan-to-BIM, CAD-to-GIS, mobile mapping, heritage |
| Geography | USA, Canada, DACH, UK |
| **→ ICP1 · Tier 1 (CORE)** | **30–200 people · ~$3M–$60M · from $5K/project or retainer · 54% of revenue** |
| Tier 2 (GROW) | 10–30 people · ~$1M–$10M · $2–5K |
| Tier 3 (MINIMIZE) | 0–10 people · <$2M · $0.5–2K · no outbound, productise, ≤10% of time |
| Tier 4 (GROW) | 200–500 people · ~$5M+ · from $5K |

Tier 1's motion is dedicated team / retainer, multi-touch, with QBRs — which is why the
30–200 band is the one worth sizing precisely. Reference accounts in this band: GEODROM
($255K), Airborne Hydro Mapping ($216K), GEO net solution ($132K), MDP GEO ($103K),
GeoFly ($101K), GlobeZenit ($81K).

## 2. Qualification — must pass ALL seven

1. **Volume** — high, repeatable geodata processing (LiDAR / point cloud / vectorisation / Scan-to-BIM)
2. **Variable load** — peak/tender-driven demand that is hard to cover with headcount
3. **Reachable DM** — an operational decision-maker exists (Head of Production / GIS Mgr / BIM Mgr / MD)
4. **No bench** — no or insufficient in-house processing bench
5. **Remote-OK** — accepts remote processing
6. **Deal size** — ≥ £5K with recurring potential
7. **Standard stack** — AutoCAD / ArcGIS / QGIS / TerraScan / LP360 / Revit

## 3. Anti-ICP — any one disqualifies

- One-off work under £5K
- Idle in-house bench (spare capacity = no pain)
- "All in-house" culture
- Data-sovereignty rules that forbid offshore processing
- Partner-rate hunters (price-only, no volume)
- Out of capability: project BIM / MEP / structural / true clash detection

Redirects: field capture / on-site → Мірничий (UA). Defence → warm intro only. Finished-SaaS
buyers → not a fit.

---

## 4. NAICS translation

The US Census codes business establishments by NAICS. ICP1 maps as follows.

### Core pool — counts as ICP1 with no haircut

| NAICS | Title | Why it is core |
| --- | --- | --- |
| **541370** | Surveying and Mapping (except Geophysical) Services | Exactly ICP1's sub-industry list: topo/geodetic survey, aerial/drone mapping, mobile mapping, cartography, LiDAR production. This is the ICP1 home code. |

### Extended pool — real ICP1 demand, but only a slice of the code qualifies

Each of these needs a **fit rate** because the NAICS code is much broader than ICP1. The fit
rate is an explicit, tunable assumption — it is *not* a measured value. Set it from your own
win data before quoting any extended number externally.

| NAICS | Title | ICP1 slice | Why the haircut |
| --- | --- | --- | --- |
| 541330 | Engineering Services | Civil/infra firms running an in-house survey or point-cloud production line | Very large code dominated by MEP, structural and process engineering — all explicitly anti-ICP ("project BIM/MEP/structural"). Only the survey/geomatics-bearing minority fits. |
| 541310 | Architectural Services | Scan-to-BIM and heritage practices | Most architecture practices buy design services, not point-cloud production. Fits only where a scan-to-BIM line exists. |
| 541990 | All Other Professional, Scientific & Technical Services | Independent drone/UAV data-service providers | Catch-all code; drone service providers land here inconsistently. |

### Explicitly excluded

| NAICS | Title | Why out |
| --- | --- | --- |
| 541360 | Geophysical Surveying and Mapping Services | Seismic/magnetic survey for oil & gas — different workflow, not point-cloud/CAD production. |
| 541320 | Landscape Architectural Services | No geodata processing volume. |
| 541511 | Custom Computer Programming Services | This is **Unit 2 (IT Unit)**, a separate ICP. Counting it here would double-count the two GTM motions. |
| 541350 | Building Inspection Services | No processing volume; not a production geospatial firm. |

**Recommendation:** lead with the 541370 core number. It is a clean, defensible,
single-source figure. Treat the extended pool as an upper bound, clearly labelled.

---

## 4b. Two segments added 10 Sep 2026

### Road / corridor mobile mapping — a qualifier, not a new code

Firms capturing road networks at scale (mobile LiDAR + panoramic imagery, highway asset
inventory, right-of-way feature extraction). **These file under NAICS 541370 and are already
inside the core pool** — adding a code for them would double-count. Treat this as a filter
applied *on top of* the core pool.

How to identify them in a list — any two of:

- Owns or operates a mobile mapping vehicle system (Trimble MX series, Leica Pegasus, Riegl VMX, Topcon IP-S3)
- Site language: "mobile LiDAR", "360° panoramic imagery", "right-of-way", "highway asset inventory", "roadway asset data collection", "pavement condition"
- DOT / county / municipal roadway contracts, or LPA / HPMS deliverables
- Sells feature extraction or asset inventory as a deliverable, not just the raw point cloud

**Why this is the strongest sub-segment for us.** Corridor capture generates enormous,
*repeating* classification and feature-extraction volume — hundreds of miles per campaign,
re-flown on a cycle. That is exactly the "high, repeatable processing volume" and "variable,
peak-driven load" the qualification gates ask for, matched to the powerline/utility corridor
and MMS classification lines we already sell. The catch is that the same profile attracts
in-house automation, so the "no bench" gate does the real filtering here.

### Facilities-based broadband operators — a genuinely new pool

Internet providers that **own their outside plant** (fiber, conduit, poles, ducts) and run
utility assets, up to 500 people.

| NAICS | Title | Vintage |
| --- | --- | --- |
| **517111** | Wired Telecommunications Carriers | NAICS 2022 (CBP 2023+) |
| **517311** | Wired Telecommunications Carriers | NAICS 2017 (CBP ≤2022) |

The code was renumbered between CBP vintages; the script sends the right one for the year.

**Excluded on purpose:**

| Excluded | Why |
| --- | --- |
| 517121 Telecommunications Resellers | No plant. No assets means no as-built backlog — nothing to map. |
| 517112 Wireless Carriers | Tower/spectrum assets, not linear plant; different workflow. |
| The national carriers | AT&T, Verizon, Comcast, Charter, Lumen, Frontier and peers are all far above the 500-person ceiling. |

Who is actually left: rural ILECs, municipal broadband utilities, regional fiber overbuilders,
and electric co-operatives running broadband subsidiaries.

**What we sell them.** Owning linear plant creates a permanent as-built documentation problem:
network records in CAD or on paper, no authoritative GIS asset database, locate requests
answered by hand. That maps onto the Utility Database Development / Utility Mapping & Asset
Management (PAS128) line and the Utility Surveyor role in the substitution map. Federal
broadband build-out funding has been forcing exactly this documentation work.

**Two anti-ICP risks that bite harder here than in the core pool:**

1. **Route to market.** Operators often buy this through their engineering or OSP contractor
   rather than direct — so the contractor may be the real account, and the operator only the
   end client. Qualify who actually holds the budget before working the operator.
2. **Data sovereignty.** Critical-infrastructure network records carry restrictions that can
   forbid offshore processing outright. This is an explicit anti-ICP gate and it disqualifies
   more accounts in this segment than anywhere else. Test it early — it is cheap to ask and
   expensive to discover late.

---

## 5. Size buckets

You asked for `10-15 / 51-200 / 201-500 / 500+`. Two things to flag:

1. **`10-15` is read as `10-50`.** As written it leaves 16–50 unassigned while the next bucket
   starts at 51, so it is almost certainly a typo for the standard 10–50 (LinkedIn's 11–50)
   band. Say the word if you actually meant 10–15 and the script takes it.
2. **Only part of this range is ICP1.** With ICP1 fixed at Tier 1 (30–200), your four buckets
   land like this:

   | Bucket | Relationship to ICP1 |
   | --- | --- |
   | `10-50` | **Straddles.** 30–50 is ICP1; 10–29 is Tier 2. |
   | `51-200` | **Entirely ICP1.** |
   | `201-500` | Outside — Tier 4. |
   | `500+` | Outside every tier. |

   So the headline ICP1 number is *not* the sum of any subset of these buckets. The script
   computes it directly from the Census bands as a clean 30–200 cut and reports it in its own
   column, with the four buckets alongside for the full distribution.

### Census bands vs. your buckets

Census publishes establishments in fixed employment-size classes that do **not** line up with
your buckets:

```
Census:  <5 | 5-9 | 10-19 | 20-49 | 50-99 | 100-249 | 250-499 | 500-999 | 1000+
Yours:        |<-- 10-50 -->|<--- 51-200 --->|<-- 201-500 -->|<--- 500+ --->|
```

- `10-50` ≈ Census `10-19` + `20-49` — clean, off only by the single 50-employee boundary.
- `51-200` straddles Census `50-99` + part of `100-249`.
- `201-500` takes the rest of `100-249` plus `250-499`.
- `500+` = `500-999` + `1000+` — clean.

The script therefore emits **both**:

- **`native`** — raw Census bands, no interpolation. Use this for anything you publish.
- **`requested`** — your four buckets, splitting the `100-249` band at 200 by log-uniform
  interpolation within the band (firm-size distributions are Pareto-like, so log-uniform beats
  linear). The split factor is a single documented constant in the script, not a hidden fudge.

### Also emitted: the full tier ladder

Your pricing and motion are driven by the tier ladder, not by the LinkedIn buckets, so the
script also rolls up to `0-10 / 10-30 / 30-200 / 200-500` (Tier 3 / 2 / 1 / 4) plus an
"above ICP1" catch-all so the totals reconcile. Tier 1 is marked in the output. This is the
cut that tells you where the $5K+ retainer money actually sits, and it shows how much Tier 2
upgrade pipeline sits just below the ICP1 floor.

---

## 6. A caveat that matters for territory planning

Census counts **establishments** (physical locations), not **companies**. A 12-office survey
firm counts 12 times, once per state it operates in, and each office is sized by *its own*
headcount — so a 400-person national firm can appear as twelve 30-person establishments.

Directional effect: establishment counts **overstate** company counts and **understate**
company size. This works in your favour for territory planning (an office with its own
production queue is a real buying location) but against you for tier assignment (a 30-person
office of a 400-person firm has a corporate bench and may fail the "no bench" gate).

Census also suppresses cells that would disclose an individual business — small states in
narrow size bands come back as `0` or null. The script flags suppressed cells rather than
silently treating them as zero.
