#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
GIS-Point · US ICP (surveying / topographic firms, 11-200 FTE)
Market sizing + unit economics. Reproduces every number in
`us-surveying-market-icp-2026.md`.

Run: python3 analysis/us_market_model.py
"""

# ---------------------------------------------------------------- inputs
# External anchors (public sources — see §10 of the markdown)
FIRMS_TOTAL = 6_191        # SICCODE: active employer companies, NAICS 541370
EMP_TOTAL = 54_324         # employment in those firms
REV_PER_EMP = 150_000      # $ revenue per employee, surveying firms

# Internal facts (cartography P&L 2026 / financial model 2026-2031)
RATE_NOW = 17.4            # $/h blended realised rate
COGS_PCT = 0.439           # cost of delivery as % of revenue
SAL_PCT = 0.352            # delivery salary as % of revenue
CARTO_REV = 1_060_061      # cartography revenue 2026
CARTO_EBIT = 319_866       # cartography EBIT 2026
OPEX_PCT = 0.26            # operating expenses as % of revenue
BILL_HRS = 1_500           # billable hours per delivery FTE per year

# Model assumptions (documented in §4, §5)
OFFICE_SHARE = 0.27        # share of survey-firm staff doing office production
HRS_PER_OFFICE_FTE = 1_600 # productive hours per office FTE per year
OUTSOURCEABLE = 0.45       # share of office work that is offshore-able
SENIORITY_UPLIFT = 1.35    # cost uplift for US-facing delivery staff

# SUSB-shaped size distribution, calibrated so employment reconciles
BANDS = [("1-4", 0.6000, 2.2), ("5-9", 0.1900, 6.7), ("10-19", 0.1200, 13.5),
         ("20-49", 0.0650, 29.0), ("50-99", 0.0160, 68.0),
         ("100-249", 0.0060, 150.0), ("250+", 0.0015, 450.0)]

COST_H = RATE_NOW * COGS_PCT          # $7.64/h
COST_H_SENIOR = COST_H * SENIORITY_UPLIFT

h = lambda t: print("\n" + "=" * 72 + f"\n{t}\n" + "=" * 72)


def universe():
    h("1. UNIVERSE — US employer firms, NAICS 541370")
    print(f"{FIRMS_TOTAL:,} firms · {EMP_TOTAL:,} employees · avg {EMP_TOTAL/FIRMS_TOTAL:.1f}\n")
    print(f"{'band':>10} {'firms':>8} {'employees':>11}")
    counts, total_emp = {}, 0
    for name, share, avg in BANDS:
        f = FIRMS_TOTAL * share
        e = f * avg
        counts[name], total_emp = f, total_emp + e
        print(f"{name:>10} {f:>8,.0f} {e:>11,.0f}")
    print(f"{'TOTAL':>10} {FIRMS_TOTAL:>8,} {total_emp:>11,.0f}"
          f"   (vs actual {EMP_TOTAL:,}, delta {total_emp/EMP_TOTAL-1:+.1%})")

    # 11-200 band: strip 10-employee firms and the 200-249 slice
    firms = counts["10-19"] * 0.85 + counts["20-49"] + counts["50-99"] + counts["100-249"] * 0.80
    emp = (counts["10-19"] * 0.85 * 14.5 + counts["20-49"] * 29
           + counts["50-99"] * 68 + counts["100-249"] * 0.80 * 140)
    print(f"\n>> ICP band 11-200 FTE: {firms:,.0f} firms · {emp:,.0f} employees"
          f"  ({firms/FIRMS_TOTAL:.0%} of firms, {emp/EMP_TOTAL:.0%} of employment)")
    print(f"   combined revenue: ${emp*REV_PER_EMP/1e9:.2f}B/yr")
    return firms, emp


def sam(firms, emp):
    h("2. ADDRESSABLE HOURS & SAM")
    office_fte = emp * OFFICE_SHARE
    hours = office_fte * HRS_PER_OFFICE_FTE
    addr = hours * OUTSOURCEABLE
    print(f"office-production FTE in band : {office_fte:>12,.0f}  ({OFFICE_SHARE:.0%} of staff)")
    print(f"office-production hours/yr    : {hours:>12,.0f}  ({HRS_PER_OFFICE_FTE:,} h/FTE)")
    print(f"outsourceable hours/yr        : {addr:>12,.0f}  ({OUTSOURCEABLE:.0%})\n")
    for r in (20, 22.5, 25):
        print(f"  SAM @ ${r:>5}/h = ${addr*r/1e6:>6,.0f}M/yr"
              f"   ·  wallet per firm ${addr/firms*r:>8,.0f}/yr ({addr/firms:,.0f} h)")

    band_rev = emp * REV_PER_EMP
    internal = band_rev * 0.15 * OUTSOURCEABLE
    print(f"\ncross-check via dollars: ${band_rev/1e9:.2f}B x 15% office labour x {OUTSOURCEABLE:.0%}"
          f" = ${internal/1e6:,.0f}M internal cost")
    print(f"                        -> ${internal*0.42/1e6:,.0f}M at outsourcer price (42% of loaded cost)")
    return addr


def pricing_lever():
    h("3. THE PRICING LEVER — same hours, higher rate")
    hrs = CARTO_REV / RATE_NOW
    print(f"today: {hrs:,.0f} h @ ${RATE_NOW}/h = ${CARTO_REV:,.0f} · COGS ${COST_H:.2f}/h\n")
    print(f"{'rate':>7} {'revenue':>12} {'gross profit':>14} {'EBIT':>12} {'EBIT %':>8}")
    for r in (RATE_NOW, 19.5, 20, 22.5, 25):
        rev, gp = r * hrs, (r - COST_H) * hrs
        ebit = CARTO_EBIT + (r - RATE_NOW) * hrs
        print(f"{r:>7.1f} {rev:>12,.0f} {gp:>14,.0f} {ebit:>12,.0f} {ebit/rev:>8.0%}")
    print(f"\n>> +$1/h on the existing book = +${hrs:,.0f} straight to EBIT")
    print(f">> ${RATE_NOW} -> $22.5 = +${(22.5-RATE_NOW)*hrs:,.0f} EBIT (2x cartography EBIT), zero hires")


def per_fte():
    h("4. UNIT ECONOMICS — per delivery FTE per year")
    print(f"delivery cost ${COST_H:.2f}/h (of which salary ${RATE_NOW*SAL_PCT:.2f}/h)"
          f" · {BILL_HRS:,} billable h/FTE")
    print(f"sanity: {CARTO_REV:,}/{RATE_NOW}/41 FTE = {CARTO_REV/RATE_NOW/41:,.0f} h/FTE (actual)\n")
    for label, ch in (("A · current cost base", COST_H),
                      (f"B · +{SENIORITY_UPLIFT-1:.0%} seniority for US work", COST_H_SENIOR)):
        print(f"-- {label}: ${ch:.2f}/h")
        print(f"   {'rate':>6} {'revenue/FTE':>13} {'GP/FTE':>11} {'GM':>8}")
        for r in (RATE_NOW, 20, 22.5, 25):
            rev, gp = r * BILL_HRS, (r - ch) * BILL_HRS
            print(f"   {r:>6.1f} {rev:>13,.0f} {gp:>11,.0f} {gp/rev:>8.1%}")

    print("\nutilisation break-even (hours of 1,500 needed to cover delivery cost):")
    print(f"   {'rate':>6} " + " ".join(f"{f'${c:.2f}/h':>13}" for c in (COST_H, COST_H_SENIOR, 12.5)))
    for r in (20, 22.5, 25):
        print(f"   {r:>6.1f} " + " ".join(f"{f'{c/r*BILL_HRS:,.0f} ({c/r:.0%})':>13}"
                                          for c in (COST_H, COST_H_SENIOR, 12.5)))


def per_account():
    h("5. ACCOUNT ECONOMICS")
    mix = [("project client", 0.60, 900), ("retainer 1 FTE", 0.30, 1_500),
           ("dedicated 3 FTE", 0.10, 4_500)]
    for r in (20, 22.5, 25):
        arpa = sum(w * hrs * r for _, w, hrs in mix)
        detail = " · ".join(f"{n} ${hrs*r/1000:.0f}K" for n, _, hrs in mix)
        print(f"@${r:>5}/h: {detail}  ->  blended ARPA ${arpa:,.0f}/yr")

    r = 22.5
    arpa = sum(w * hrs * r for _, w, hrs in mix)
    gm = (r - COST_H_SENIOR) / r
    gp_yr = arpa * gm
    print(f"\nat ${r}/h: ARPA ${arpa:,.0f} · GM {gm:.1%} · GP ${gp_yr:,.0f}/yr\n")
    print(f"{'CAC':>9} {'life':>6} {'LTV':>10} {'LTV/CAC':>9} {'payback':>10}")
    for cac in (6_000, 8_000, 12_000):
        for life in (2.5, 3.5):
            print(f"{cac:>9,} {life:>6.1f} {gp_yr*life:>10,.0f} "
                  f"{gp_yr*life/cac:>8.1f}x {cac/(gp_yr/12):>8.1f} mo")
    return arpa, gm


def scenarios(firms, addr, gm):
    h("6. SOM SCENARIOS — US surveying 11-200 only, by 2030 (@ $22.5/h)")
    print(f"{'scenario':>14} {'pen':>5} {'accts':>7} {'ARPA':>9} {'revenue':>11} "
          f"{'FTE':>6} {'GP':>10} {'EBIT':>10} {'EBIT%':>7} {'SAM%':>7}")
    for name, pen, arpa in (("Conservative", 0.02, 26_000), ("Base", 0.04, 32_000),
                            ("Aggressive", 0.08, 45_000)):
        acc = firms * pen
        rev = acc * arpa
        fte = rev / 22.5 / BILL_HRS
        gp, ebit = rev * gm, rev * (gm - OPEX_PCT)
        print(f"{name:>14} {pen:>5.0%} {acc:>7.0f} {arpa:>9,} {rev:>11,.0f} "
              f"{fte:>6.0f} {gp:>10,.0f} {ebit:>10,.0f} {ebit/rev:>7.0%} {rev/(addr*22.5):>7.2%}")

    h("7. WHAT IT TAKES TO FUND THE $6M GOAL")
    for target, label in ((3_000_000, "cartography half of the $6M plan"),
                          (6_000_000, "the entire $6M group goal")):
        print(f"{label}:")
        print(f"   ${target/1e6:.0f}M = {target/(addr*22.5):.2%} of this segment's SAM"
              f" · {target/22.5/BILL_HRS:,.0f} delivery FTE @ $22.5/h"
              f" · {target/32_000:,.0f} accounts @ ARPA $32K")
    print("\n>> The market is not the constraint. Hiring throughput is.")


if __name__ == "__main__":
    firms, emp = universe()
    addr = sam(firms, emp)
    pricing_lever()
    per_fte()
    _, gm = per_account()
    scenarios(firms, addr, gm)
