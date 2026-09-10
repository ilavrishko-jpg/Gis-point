# USA market research — ICP1 by state and company size

Answers: **how many ICP1 companies are there in each US state, split by company size?**

## Status

The analysis framework is complete and tested. **The numbers are not yet generated** —
`api.census.gov` is blocked by the network egress policy in this Claude Code web session
(confirmed: the proxy returns `403` to `CONNECT api.census.gov:443`, and every other
statistics host — `data.census.gov`, `www2.census.gov`, `api.bls.gov`, `data.gov` — is
blocked too). Only GitHub and PyPI are reachable here.

Nothing in this directory contains estimated or recalled market figures. Run the script from
a machine with open outbound HTTPS and it produces the real table in about 30 seconds.

## Run it

```bash
cd market-research/usa-icp1
python3 fetch_cbp.py                  # core pool: NAICS 541370
python3 fetch_cbp.py --extended       # + engineering / architecture / drone services
```

No dependencies beyond the Python 3 standard library. A Census API key is optional
(keyless access is capped at 500 calls/day; this script makes one call per NAICS code):

```bash
export CENSUS_API_KEY=...             # free: https://api.census.gov/data/key_signup.html
```

## What you get

| File | Contents |
| --- | --- |
| `output/icp1_usa_native.csv` | Raw Census size bands, no interpolation. **Use this for anything you publish.** |
| `output/icp1_usa_requested.csv` | Your four buckets: 10-50 / 51-200 / 201-500 / 500+ |
| `output/icp1_usa_tiers.csv` | Your tier ladder: T3 0-10 / T2 10-30 / T1 30-200 / T4 200-500 |
| `output/icp1_usa_summary.md` | States ranked by in-ICP1 count, plus national totals |

## Three things worth knowing before you read the output

**1. "ICP1" is read as Unit 1, not Tier 1.** Your size split runs to 500+, and Tier 1 alone is
capped at 30–200 people. Unit 1 (GIS/production) is the only ICP spanning 0–500. Unit 2 (IT
Unit) is segmented by market, not headcount, and is excluded so the two GTM motions don't
double-count.

**2. `500+` is outside your own ICP.** Tier 4 stops at 500 people. The script reports the 500+
column but excludes it from the "In-ICP1" total, so it can never quietly inflate a TAM slide.

**3. Census counts establishments, not companies.** A 12-office survey firm counts twelve
times and each office is sized by its own headcount. This *overstates* company count and
*understates* company size. Good for territory planning — each office is a real buying
location with its own production queue. Careful for tier assignment — a 30-person office of a
400-person national firm has a corporate bench and probably fails your "no bench" gate.

Full method, NAICS mapping and the anti-ICP exclusions: **[`icp1-filter-spec.md`](./icp1-filter-spec.md)**.

## Source

- ICP definition: `GisPoint_ICP_Segmentation_v4`, tab `ICP · GIS Dept` (Google Drive)
- Market data: [US Census County Business Patterns](https://www.census.gov/programs-surveys/cbp.html)
  — the authoritative count of US establishments by state, NAICS industry and employment size class.
