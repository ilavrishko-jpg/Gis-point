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
| `output/icp1_usa_tier1.csv` | **The answer: ICP1 (30–200) per state**, with below/above splits |
| `output/icp1_usa_requested.csv` | Your four buckets: 10-50 / 51-200 / 201-500 / 500+ |
| `output/icp1_usa_tiers.csv` | Full tier ladder: T3 0-10 / T2 10-30 / T1 30-200 / T4 200-500 |
| `output/icp1_usa_native.csv` | Raw Census size bands, no interpolation. **Use this for anything you publish.** |
| `output/icp1_usa_summary.md` | States ranked by ICP1 count with running cumulative %, plus national totals |

## Three things worth knowing before you read the output

**1. ICP1 = Tier 1: 30–200 people.** ~$3M–$60M revenue, from $5K per project or a retainer,
54% of your revenue. That is the headline number. Tiers 2, 3 and 4 are reported around it for
context but are not the target. Unit 2 (IT Unit) is excluded entirely.

**2. The headline number is not the sum of your buckets.** `51-200` sits entirely inside
Tier 1, but `10-50` straddles the Tier 1 floor at 30 people, and `201-500` / `500+` are outside
it. So the script computes the 30–200 cut directly from the Census bands and reports it in its
own column, with your four buckets alongside as the full distribution.

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
