#!/usr/bin/env python3
"""Build the ICP1 USA market table: establishments by state x company size.

Source: US Census County Business Patterns (CBP), the authoritative count of US
business establishments by state, NAICS industry and employment size class.

ICP1 is defined in ./icp1-filter-spec.md. Read that first — it explains which NAICS
codes are core, which are an extended upper bound, and why 500+ sits outside ICP1.

Usage
-----
    python3 fetch_cbp.py                       # core pool (541370), latest year
    python3 fetch_cbp.py --extended            # add 541330 / 541310 / 541990
    python3 fetch_cbp.py --year 2022
    python3 fetch_cbp.py --api-key KEY         # or set CENSUS_API_KEY

A key is optional but recommended; keyless access is rate-limited to 500 calls/day.
Get one free at https://api.census.gov/data/key_signup.html

Outputs (written to ./output/):
    icp1_usa_native.csv      Raw Census size bands. Use this for anything published.
    icp1_usa_requested.csv   The 10-50 / 51-200 / 201-500 / 500+ buckets.
    icp1_usa_tiers.csv       GIS-Point tier bands: 0-10 / 10-30 / 30-200 / 200-500.
    icp1_usa_summary.md      Ranked state table + headline numbers.
"""

from __future__ import annotations

import argparse
import csv
import json
import math
import os
import sys
import urllib.error
import urllib.parse
import urllib.request
from collections import defaultdict
from pathlib import Path

API_ROOT = "https://api.census.gov/data"

# --- ICP1 NAICS pools (see icp1-filter-spec.md section 4) --------------------

CORE_NAICS = {
    "541370": "Surveying and Mapping (except Geophysical) Services",
}

EXTENDED_NAICS = {
    "541330": "Engineering Services",
    "541310": "Architectural Services",
    "541990": "All Other Professional, Scientific & Technical Services",
}

# --- Target bucket definitions ----------------------------------------------
# (label, lower bound inclusive, upper bound inclusive or None for open-ended)

REQUESTED_BUCKETS = [
    ("10-50", 10, 50),
    ("51-200", 51, 200),
    ("201-500", 201, 500),
    ("500+", 501, None),  # outside the ICP1 ceiling — reported, but flagged
]

TIER_BUCKETS = [
    ("T3 0-10 (MINIMIZE)", 0, 10),
    ("T2 10-30 (GROW)", 11, 30),
    ("T1 30-200 (CORE)", 31, 200),
    ("T4 200-500 (GROW)", 201, 500),
    # The tier ladder stops at 500. Without this final catch-all, every
    # establishment above the ICP1 ceiling would vanish from the tier rollup and
    # the tier totals would quietly disagree with the native band totals.
    ("Above ICP1 ceiling (500+)", 501, None),
]

# Establishments below 10 employees are outside every requested bucket but are
# still Tier 3, so they are fetched and reported separately rather than dropped.
BELOW_REQUESTED_FLOOR = 10

# Open-ended top band (1000+) needs a finite ceiling only if a target bucket
# boundary falls inside it. None of ours do, but the allocator needs a value.
OPEN_BAND_CEILING = 10000

STATE_ABBR = {
    "01": "AL", "02": "AK", "04": "AZ", "05": "AR", "06": "CA", "08": "CO",
    "09": "CT", "10": "DE", "11": "DC", "12": "FL", "13": "GA", "15": "HI",
    "16": "ID", "17": "IL", "18": "IN", "19": "IA", "20": "KS", "21": "KY",
    "22": "LA", "23": "ME", "24": "MD", "25": "MA", "26": "MI", "27": "MN",
    "28": "MS", "29": "MO", "30": "MT", "31": "NE", "32": "NV", "33": "NH",
    "34": "NJ", "35": "NM", "36": "NY", "37": "NC", "38": "ND", "39": "OH",
    "40": "OK", "41": "OR", "42": "PA", "44": "RI", "45": "SC", "46": "SD",
    "47": "TN", "48": "TX", "49": "UT", "50": "VT", "51": "VA", "53": "WA",
    "54": "WV", "55": "WI", "56": "WY",
}


# --- Census size-band parsing ------------------------------------------------

def parse_size_label(label: str):
    """Turn an EMPSZES_LABEL into (lo, hi) employee bounds.

    Census phrasing varies by vintage, e.g.
        "Establishments with less than 5 employees"        -> (0, 4)
        "Establishments with 10 to 19 employees"           -> (10, 19)
        "Establishments with 1,000 employees or more"      -> (1000, None)
    Returns None for the "All establishments" total row and anything unparseable,
    so a new vintage's wording can never silently corrupt the buckets.
    """
    text = label.lower().replace(",", "")
    if "all establishments" in text:
        return None

    digits = [int(tok) for tok in text.split() if tok.isdigit()]
    if not digits:
        return None

    if "less than" in text or "fewer than" in text:
        return (0, digits[0] - 1)
    if "or more" in text or "and over" in text or "or over" in text:
        return (digits[0], None)
    if " to " in text and len(digits) >= 2:
        return (digits[0], digits[1])
    return None


def allocate(band_lo: int, band_hi, count: float, buckets):
    """Spread a Census band's establishment count across overlapping target buckets.

    Where a band sits entirely inside one bucket the count moves whole. Where a
    bucket boundary cuts a band, the count is split log-uniformly: firm-size
    distributions are Pareto-like, so assuming uniform density in log space is a
    markedly better approximation than uniform density in linear space.

    Returns {bucket_label: allocated_count}.
    """
    hi = OPEN_BAND_CEILING if band_hi is None else band_hi
    lo = max(band_lo, 1)  # log(0) is undefined; a 0-employee establishment is size 1
    hi = max(hi, lo)

    if hi == lo:
        weights = {lo: 1.0}
        span = None
    else:
        span = math.log(hi + 1) - math.log(lo)

    out = {}
    for label, b_lo, b_hi in buckets:
        b_high = OPEN_BAND_CEILING if b_hi is None else b_hi
        overlap_lo = max(lo, b_lo)
        overlap_hi = min(hi, b_high)
        if overlap_hi < overlap_lo:
            continue
        if span is None:
            share = 1.0
        else:
            share = (math.log(overlap_hi + 1) - math.log(overlap_lo)) / span
        if share > 0:
            out[label] = out.get(label, 0.0) + count * share
    return out


# --- Census API --------------------------------------------------------------

def naics_variable(year: int) -> str:
    """CBP switched its NAICS vintage variable in 2023."""
    return "NAICS2022" if year >= 2023 else "NAICS2017"


def fetch(year: int, naics: str, api_key: str | None):
    """Pull every state x employment-size-class row for one NAICS code."""
    var = naics_variable(year)
    params = {
        "get": "NAME,ESTAB,EMPSZES_LABEL",
        "for": "state:*",
        var: naics,
        "EMPSZES": "*",
    }
    if api_key:
        params["key"] = api_key

    url = f"{API_ROOT}/{year}/cbp?" + urllib.parse.urlencode(params)
    try:
        with urllib.request.urlopen(url, timeout=120) as resp:
            payload = json.loads(resp.read().decode())
    except urllib.error.HTTPError as exc:
        body = exc.read().decode(errors="replace")[:400]
        raise SystemExit(
            f"Census API returned HTTP {exc.code} for NAICS {naics}, year {year}.\n"
            f"  URL:  {url.split('&key=')[0]}\n"
            f"  Body: {body}\n"
            f"  If this is a 404, that year may not be published yet — try --year 2022."
        ) from exc
    except urllib.error.URLError as exc:
        raise SystemExit(
            f"Could not reach api.census.gov: {exc.reason}\n"
            f"  This host is blocked by the egress policy inside Claude Code web sessions.\n"
            f"  Run this script from a machine with open outbound HTTPS, or have\n"
            f"  api.census.gov allowlisted for the environment."
        ) from exc

    header, *rows = payload
    return [dict(zip(header, row)) for row in rows]


# --- Aggregation -------------------------------------------------------------

def build(year: int, naics_map: dict, api_key: str | None):
    """Returns (native, requested, tiers, suppressed) keyed by state."""
    native = defaultdict(lambda: defaultdict(float))
    requested = defaultdict(lambda: defaultdict(float))
    tiers = defaultdict(lambda: defaultdict(float))
    below_floor = defaultdict(float)
    suppressed = []

    for naics, title in naics_map.items():
        print(f"  fetching {naics} — {title} ...", file=sys.stderr)
        for row in fetch(year, naics, api_key):
            label = row.get("EMPSZES_LABEL", "")
            bounds = parse_size_label(label)
            if bounds is None:
                continue  # the "All establishments" total row

            state_fips = row.get("state", "")
            state = STATE_ABBR.get(state_fips)
            if state is None:
                continue  # territories: PR, VI etc. are outside the USA scope

            raw = row.get("ESTAB")
            try:
                count = float(raw)
            except (TypeError, ValueError):
                suppressed.append((state, naics, label))
                continue
            if count <= 0:
                continue

            lo, hi = bounds
            native[state][label] += count

            if hi is not None and hi < BELOW_REQUESTED_FLOOR:
                below_floor[state] += count
            else:
                for bucket, alloc in allocate(lo, hi, count, REQUESTED_BUCKETS).items():
                    requested[state][bucket] += alloc

            for bucket, alloc in allocate(lo, hi, count, TIER_BUCKETS).items():
                tiers[state][bucket] += alloc

    for state, count in below_floor.items():
        requested[state]["<10 (below your buckets)"] = count

    return native, requested, tiers, suppressed


def write_csv(path: Path, rows_by_state: dict, columns: list[str]):
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", newline="") as fh:
        writer = csv.writer(fh)
        writer.writerow(["State"] + columns + ["Total"])
        for state in sorted(rows_by_state):
            values = [round(rows_by_state[state].get(col, 0.0)) for col in columns]
            writer.writerow([state] + values + [sum(values)])
        totals = [
            round(sum(rows_by_state[s].get(col, 0.0) for s in rows_by_state))
            for col in columns
        ]
        writer.writerow(["USA"] + totals + [sum(totals)])
    print(f"  wrote {path}", file=sys.stderr)


def write_summary(path: Path, requested: dict, tiers: dict, year: int,
                  naics_map: dict, suppressed: list):
    icp_cols = ["10-50", "51-200", "201-500"]
    ranked = sorted(
        requested,
        key=lambda s: sum(requested[s].get(c, 0.0) for c in icp_cols),
        reverse=True,
    )

    lines = [
        "# ICP1 — USA market size by state",
        "",
        f"Source: US Census County Business Patterns {year}. "
        f"NAICS: {', '.join(sorted(naics_map))}.",
        "",
        "`In-ICP1` = the 10-50, 51-200 and 201-500 buckets summed. The 500+ column is "
        "shown but excluded from that total, because the ICP1 tier ladder stops at 500 "
        "people (see icp1-filter-spec.md).",
        "",
        "| Rank | State | 10-50 | 51-200 | 201-500 | **In-ICP1** | 500+ (out) | <10 (T3) |",
        "| ---: | :--- | ---: | ---: | ---: | ---: | ---: | ---: |",
    ]
    for i, state in enumerate(ranked, 1):
        row = requested[state]
        in_icp = sum(row.get(c, 0.0) for c in icp_cols)
        lines.append(
            f"| {i} | {state} "
            f"| {round(row.get('10-50', 0)):,} "
            f"| {round(row.get('51-200', 0)):,} "
            f"| {round(row.get('201-500', 0)):,} "
            f"| **{round(in_icp):,}** "
            f"| {round(row.get('500+', 0)):,} "
            f"| {round(row.get('<10 (below your buckets)', 0)):,} |"
        )

    national = {
        c: sum(requested[s].get(c, 0.0) for s in requested)
        for c in icp_cols + ["500+", "<10 (below your buckets)"]
    }
    total_in_icp = sum(national[c] for c in icp_cols)
    lines += [
        "",
        "## National",
        "",
        f"- **In-ICP1 establishments (10–500 people): {round(total_in_icp):,}**",
        f"- 10–50: {round(national['10-50']):,}",
        f"- 51–200: {round(national['51-200']):,}",
        f"- 201–500: {round(national['201-500']):,}",
        f"- 500+ (outside ICP1): {round(national['500+']):,}",
        f"- <10 (Tier 3, minimise): {round(national['<10 (below your buckets)']):,}",
        "",
        "## By GIS-Point tier",
        "",
        "| Tier | Establishments |",
        "| :--- | ---: |",
    ]
    for label, _, _ in TIER_BUCKETS:
        total = sum(tiers[s].get(label, 0.0) for s in tiers)
        lines.append(f"| {label} | {round(total):,} |")

    if suppressed:
        lines += [
            "",
            f"## Suppressed cells: {len(suppressed)}",
            "",
            "Census withholds cells that would disclose an individual business. These are "
            "excluded from the totals above rather than counted as zero, so small-state "
            "figures in narrow bands are a floor, not an exact count.",
        ]

    path.write_text("\n".join(lines) + "\n")
    print(f"  wrote {path}", file=sys.stderr)


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--year", type=int, default=2023,
                    help="CBP reference year (default: 2023)")
    ap.add_argument("--extended", action="store_true",
                    help="include the extended NAICS pool (upper bound, needs a fit rate)")
    ap.add_argument("--api-key", default=os.environ.get("CENSUS_API_KEY"),
                    help="Census API key (or set CENSUS_API_KEY)")
    ap.add_argument("--out", type=Path, default=Path(__file__).parent / "output")
    args = ap.parse_args()

    naics_map = dict(CORE_NAICS)
    if args.extended:
        naics_map.update(EXTENDED_NAICS)
        print("NOTE: extended pool is an UPPER BOUND. Apply a fit rate from your win "
              "data before quoting it — see icp1-filter-spec.md section 4.", file=sys.stderr)

    print(f"Fetching CBP {args.year} for {len(naics_map)} NAICS code(s):", file=sys.stderr)
    native, requested, tiers, suppressed = build(args.year, naics_map, args.api_key)

    if not requested:
        raise SystemExit("No rows returned — check the year and NAICS vintage.")

    native_cols = sorted(
        {c for state in native.values() for c in state},
        key=lambda label: (parse_size_label(label) or (0, 0))[0],
    )
    write_csv(args.out / "icp1_usa_native.csv", native, native_cols)
    write_csv(args.out / "icp1_usa_requested.csv", requested,
              [b[0] for b in REQUESTED_BUCKETS] + ["<10 (below your buckets)"])
    write_csv(args.out / "icp1_usa_tiers.csv", tiers, [b[0] for b in TIER_BUCKETS])
    write_summary(args.out / "icp1_usa_summary.md", requested, tiers,
                  args.year, naics_map, suppressed)

    print("Done.", file=sys.stderr)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
