#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Build the consolidated US mapping-companies dataset.

Generates:
  - companies.csv            : master registry (one row per company)
  - state_size_matrix.csv    : count of companies by HQ state x size bucket
  - summary_by_bucket.csv     : totals per size bucket
  - summary_by_category.csv   : totals per service category

Data was compiled from open sources (LinkedIn, ZoomInfo, RocketReach, PitchBook,
Crunchbase, D&B, company sites, IBISWorld, US Census/BLS) via web research,
June 2026. Employee figures are best-available approximations; see `confidence`.
This is a CURATED REGISTRY of identifiable firms, NOT an exhaustive census.
"""

import csv
import os
from collections import defaultdict, OrderedDict

OUT = os.path.dirname(os.path.abspath(__file__))

# Size buckets. The user asked specifically for 30-100, 200-300, 300-500.
# We also track <30, 100-200, >500 for completeness/context.
BUCKETS = ["<30", "30-100", "100-200", "200-300", "300-500", ">500"]
TARGET_BUCKETS = ["30-100", "200-300", "300-500"]

# Service category tags
# aerial, lidar, mobile, tomography (subsurface/SUE/GPR/geophysics), cartography (incl GIS)

# Each record:
# (company, state, firm_type, emp_estimate, bucket, categories, status, confidence)
#   firm_type: "specialist" (whole firm is mapping/geospatial) or
#              "AEC-division" (large eng/AEC firm; geospatial is one division) or
#              "vendor" (hardware/software maker that also offers services)
COMPANIES = [
    # ---- >500 specialists / national geospatial players ----
    ("NV5 Geospatial (incl. Quantum Spatial/AeroMetric/Photo Science)", "FL", "specialist", "711-1300", ">500", "aerial;lidar;mobile;cartography", "active", "high"),
    ("EagleView Technologies (incl. Pictometry)", "WA", "specialist", "~1300", ">500", "aerial;cartography", "active", "high"),
    ("SAM (Surveying And Mapping, LLC)", "TX", "specialist", "1000-2100", ">500", "aerial;lidar;mobile;tomography", "active", "high"),
    ("DRMP, Inc.", "FL", "specialist", "700-750", ">500", "mobile;lidar;cartography", "active", "high"),
    ("GPRS (Ground Penetrating Radar Systems)", "OH", "specialist", "843-1000+", ">500", "tomography;mobile", "active", "high"),

    # ---- 300-500 ----
    ("Axim Geospatial (Continental Mapping + GISinc + TSG; now NV5)", "WI", "specialist", "340-360", "300-500", "aerial;lidar;mobile;cartography", "active (NV5)", "high"),
    ("Bartlett & West", "KS", "AEC-division", "~459", "300-500", "aerial;lidar;mobile;cartography", "active", "high"),
    ("ESP Associates", "SC", "AEC-division", "300-400", "300-500", "mobile;lidar;tomography", "active", "med"),
    ("ENGEO", "CA", "AEC-division", "~400", "300-500", "tomography", "active", "high"),
    ("RETTEW", "PA", "AEC-division", "321-600", "300-500", "tomography;cartography", "active", "med"),
    ("Ayres Associates", "WI", "AEC-division", "394-488", "300-500", "aerial;lidar;cartography", "active", "med"),

    # ---- 200-300 ----
    ("Cyclomedia Technology (US ops)", "WI", "specialist", "~250", "200-300", "mobile;cartography", "active (NL parent)", "med"),
    ("Bohannan Huston, Inc.", "NM", "AEC-division", "216-260", "200-300", "aerial;lidar;mobile;cartography", "active", "med"),
    ("Control Point Associates", "NJ", "specialist", "~200", "200-300", "mobile;lidar", "active", "med"),
    ("GRW Engineers", "KY", "AEC-division", "~230", "200-300", "aerial;cartography", "active", "med"),
    ("The GEL Group (incl. GEL Geophysics)", "SC", "AEC-division", "201-500", "200-300", "tomography", "active", "med"),
    ("Vexcel Data Program", "CO", "specialist", "183-500", "200-300", "aerial;lidar;cartography", "active (Austria parent)", "low"),

    # ---- 100-200 ----
    ("The Sanborn Map Company", "CO", "specialist", "~180", "100-200", "aerial;lidar;mobile;cartography", "active", "med"),
    ("TWM, Inc. (Thouvenot, Wade & Moerchen)", "IL", "AEC-division", "~181", "100-200", "mobile;cartography", "active", "high"),
    ("Southeastern Surveying & Mapping (SSMC)", "FL", "specialist", "170-200", "100-200", "lidar;mobile;tomography;cartography", "active", "med"),
    ("Pickett & Associates", "FL", "specialist", "119-160", "100-200", "aerial;lidar", "active (ESP sub)", "med"),
    ("GeoDigital", "GA", "specialist", "~131", "100-200", "lidar;cartography", "active", "med"),
    ("Sigma Space Corp.", "MD", "vendor", "~110", "100-200", "lidar", "active (Hexagon)", "med"),
    ("East View Geospatial", "MN", "specialist", "50-200", "100-200", "cartography", "active", "med"),
    ("Locana (formerly Critigen)", "CO", "specialist", "132-201", "100-200", "cartography", "active (TRC)", "med"),
    ("GSSI (Geophysical Survey Systems)", "NH", "vendor", "105-120", "100-200", "tomography", "active", "high"),
    ("4M Analytics (US ops)", "TX", "specialist", "100-200", "100-200", "tomography", "active (Israel parent)", "med"),
    ("Blood Hound", "IN", "specialist", "85-112", "100-200", "tomography", "active", "med"),
    ("Trinity Subsurface", "DE", "specialist", "50-200", "100-200", "tomography", "active", "med"),
    ("Nearmap US, Inc.", "UT", "specialist", "150-200", "100-200", "aerial;cartography", "active (Australia parent)", "med"),
    ("Towill, Inc.", "CA", "specialist", "~100", "100-200", "aerial;lidar;mobile;cartography", "active", "med"),
    ("Spatial Front, Inc.", "MD", "specialist", "40-335", "100-200", "cartography", "active", "low"),
    ("Ascent Geomatics Solutions", "CO", "specialist", "100-500", "100-200", "mobile;cartography", "active", "low"),

    # ---- 30-100 ----
    ("Surdex Corporation (a Bowman company)", "MO", "specialist", "95-114", "30-100", "aerial;lidar;cartography", "active", "med"),
    ("GPI Geospatial (formerly Aerial Cartographics of America)", "FL", "specialist", "90-105", "30-100", "aerial;lidar;mobile", "active (GPI div)", "med"),
    ("Mandli Communications", "WI", "specialist", "90-110", "30-100", "mobile", "active", "med"),
    ("Optimal Geo", "AL", "specialist", "79-100", "30-100", "aerial;lidar", "active (Woolpert)", "med"),
    ("SurvTech Solutions", "FL", "specialist", "93-100", "30-100", "mobile;tomography;cartography", "active", "med"),
    ("Frontier Precision", "ND", "vendor", "86-150", "30-100", "mobile;cartography", "active", "med"),
    ("GIS Surveyors Inc (GSi)", "CA", "specialist", "~70", "30-100", "cartography", "active", "med"),
    ("Geometrics, Inc.", "CA", "vendor", "75-88", "30-100", "tomography", "active", "high"),
    ("TerraSond", "AK", "specialist", "~72", "30-100", "tomography", "active", "med"),
    ("Keystone Aerial Surveys", "PA", "specialist", "59-82", "30-100", "aerial", "active", "med"),
    ("Mercado Consultants", "MD", "AEC-division", "~60", "30-100", "cartography", "active", "med"),
    ("Collier Consulting / Collier Geophysics", "TX", "specialist", "58-61", "30-100", "tomography", "active", "med"),
    ("Kucera International", "OH", "specialist", "52-60", "30-100", "aerial;cartography", "active", "med"),
    ("C Below (Certerra Subsurface Imaging)", "CA", "specialist", "~51", "30-100", "tomography", "active", "med"),
    ("Mount Sopris Instrument Co.", "CO", "vendor", "~51", "30-100", "tomography", "active", "med"),
    ("Bess Utility Solutions", "CA", "specialist", "49-51", "30-100", "mobile;tomography", "active", "med"),
    ("ProStar Geocorp", "CO", "specialist", "~49", "30-100", "tomography;cartography", "active", "med"),
    ("The Atlantic Group (now WGI Geospatial)", "AL", "specialist", "50-100", "30-100", "aerial;lidar", "active (WGI)", "low"),
    ("Blue Marble Geographics", "ME", "vendor", "~49", "30-100", "cartography", "active", "med"),
    ("Pathway Services", "OK", "specialist", "38-51", "30-100", "mobile", "active", "med"),
    ("Aero-Graphics, Inc.", "UT", "specialist", "41-43", "30-100", "aerial;lidar;mobile", "active", "med"),
    ("Cooper Aerial Surveys", "AZ", "specialist", "35-50", "30-100", "aerial;lidar", "active", "med"),
    ("Aerial Data Service (ADS)", "OK", "specialist", "~40", "30-100", "aerial;lidar;cartography", "active", "med"),
    ("Geographic Technologies Group (GTG)", "NC", "specialist", "37-39", "30-100", "cartography", "active", "high"),
    ("Aerial Services, Inc. (ASI)", "IA", "specialist", "36-45", "30-100", "aerial;lidar;cartography", "active", "med"),
    ("Riegl USA", "FL", "vendor", "35-40", "30-100", "lidar", "active (Austria parent)", "med"),
    ("TruePoint Laser Scanning", "OH", "specialist", "~35", "30-100", "mobile;lidar", "active (GPRS)", "med"),
    ("GeoCue Group", "AL", "vendor", "31-36", "30-100", "lidar;mobile", "active", "med"),
    ("NAEVA Geophysics", "VA", "specialist", "31-50", "30-100", "tomography", "active", "med"),
    ("Mason Private Locating", "IN", "specialist", "~31", "30-100", "tomography", "active", "med"),
    ("Martinez Geospatial (MTZ Geo)", "MN", "specialist", "30-60", "30-100", "mobile;cartography", "active", "med"),
    ("The Sidwell Company", "IL", "specialist", "50-100", "30-100", "aerial;cartography", "active", "low"),
    ("Houseal Lavigne Associates", "IL", "specialist", "25-100", "30-100", "cartography", "active", "low"),
    ("DGT Associates", "MA", "specialist", "21-50", "30-100", "tomography", "active", "med"),
    ("Tuck Mapping Solutions", "VA", "specialist", "20-49", "30-100", "aerial;lidar", "active", "med"),
    ("Spatial Data Logic", "NJ", "vendor", "25-50", "30-100", "cartography", "active", "med"),

    # ---- <30 ----
    ("GeoTerra, Inc.", "OR", "specialist", "17-25", "<30", "aerial;lidar;cartography", "active", "med"),
    ("Digital Aerial Solutions (DAS)", "FL", "specialist", "~21", "<30", "aerial;lidar", "active", "med"),
    ("T3 Global Strategies", "PA", "specialist", "~27", "<30", "cartography", "active", "med"),
    ("Phoenix LiDAR Systems", "CA", "vendor", "~26", "<30", "lidar;mobile", "active", "med"),
    ("Geodetics, Inc.", "CA", "vendor", "~15", "<30", "lidar;mobile", "active (AEVEX)", "med"),
    ("LiDARUSA (Fagerman Technologies)", "AL", "vendor", "5-25", "<30", "lidar;mobile", "active", "med"),
    ("Eagle Aerial Solutions", "CA", "specialist", "~14", "<30", "aerial;lidar;cartography", "active", "med"),
    ("Atlas Geographic Data", "NC", "specialist", "21-34", "<30", "cartography", "active", "low"),
    ("Kappa Mapping", "ME", "specialist", "5-9", "<30", "aerial;cartography", "active", "med"),
    ("Air Photographics", "WV", "specialist", "<30", "<30", "aerial", "active", "med"),
    ("Aerial Surveys International", "CO", "specialist", "<30", "<30", "aerial;lidar", "active", "low"),
    ("Aero Photo", "FL", "specialist", "~11", "<30", "aerial", "active", "med"),
    ("Pinnacle Mapping Technologies", "IN", "specialist", "<30", "<30", "aerial;lidar", "active", "low"),
    ("Reality IMT", "TX", "specialist", "2-10", "<30", "mobile", "active", "low"),
    ("Remote Mapping Group", "GA", "specialist", "1-10", "<30", "aerial", "active", "low"),
    ("TerraSurv", "PA", "specialist", "~6", "<30", "cartography", "active", "med"),
    ("David C. Smith & Associates", "OR", "specialist", "10-30", "<30", "aerial;cartography", "active", "med"),
    ("Synergy Mapping", "CO", "specialist", "3-10", "<30", "aerial;cartography", "active", "med"),
    ("CORE GIS", "WA", "specialist", "1-10", "<30", "cartography", "active", "med"),
    ("Four Corners Mapping", "CO", "specialist", "1-5", "<30", "cartography", "active", "med"),
    ("Cartografix", "NV", "specialist", "~1", "<30", "cartography", "active", "med"),
    ("Cairn Cartographics", "MT", "specialist", "~2", "<30", "cartography", "active", "high"),
    ("Tech Maven Geospatial", "FL", "specialist", "11-50", "<30", "cartography", "active", "med"),
    ("Applied Geographics (AppGeo)", "MA", "specialist", "9-20", "<30", "cartography", "active (Sanborn)", "med"),
    ("Bruce Harris & Associates", "IL", "specialist", "16-22", "<30", "cartography", "active", "med"),
    ("geographIT (division of EBA Engineering)", "PA", "specialist", "9-13", "<30", "cartography", "active", "med"),
    ("95West Aerial Mapping (formerly KBM Geospatial)", "ND", "specialist", "<30", "<30", "aerial;lidar", "active", "low"),
    ("Advanced Geosciences (AGI)", "TX", "vendor", "22-25", "<30", "tomography", "active", "med"),
    ("Hager-Richter Geoscience", "NH", "specialist", "10-22", "<30", "tomography", "active", "med"),
    ("GeoView, Inc.", "FL", "specialist", "~17", "<30", "tomography", "active", "high"),
    ("Geophysical Insights", "TX", "vendor", "19-21", "<30", "tomography", "active", "med"),
    ("Infrasense", "MA", "specialist", "~15", "<30", "tomography", "active", "med"),
    ("GB Geotechnics USA", "NY", "specialist", "8-16", "<30", "tomography", "active", "med"),
    ("GeoModel, Inc.", "VA", "specialist", "2-20", "<30", "tomography", "active", "low"),
    ("SubSurface Surveys & Associates", "CA", "specialist", "2-30", "<30", "tomography", "active", "med"),
    ("Olson Engineering", "CO", "specialist", "12-24", "<30", "tomography", "active", "med"),
    ("GeoTomo", "TX", "vendor", "<30", "<30", "tomography", "active", "low"),
    ("Spatial Resolutions", "TX", "specialist", "<30", "<30", "tomography", "active", "low"),

    # ---- Large AEC firms (>500) where geospatial is one division ----
    ("Woolpert, Inc.", "OH", "AEC-division", "2000-3200", ">500", "aerial;lidar;mobile;cartography", "active", "high"),
    ("Dewberry", "VA", "AEC-division", "~2500", ">500", "aerial;lidar;mobile;cartography", "active", "high"),
    ("Michael Baker International", "PA", "AEC-division", "3000-6000", ">500", "aerial;lidar;mobile;cartography", "active", "high"),
    ("McKim & Creed", "NC", "AEC-division", "800-1100", ">500", "aerial;lidar;mobile;tomography", "active", "high"),
    ("Merrick & Company", "CO", "AEC-division", "700-1133", ">500", "aerial;lidar;mobile;cartography", "active", "high"),
    ("Fugro USA", "TX", "AEC-division", ">1000 US", ">500", "aerial;lidar;mobile;tomography", "active (NL parent)", "med"),
    ("GPI / Greenman-Pedersen", "NY", "AEC-division", "~1800", ">500", "aerial;lidar;mobile", "active", "high"),
    ("KCI Technologies", "MD", "AEC-division", "1700-2400", ">500", "aerial;lidar;cartography", "active", "high"),
    ("Colliers Engineering & Design (Maser)", "NJ", "AEC-division", "1745-3500", ">500", "mobile;tomography;cartography", "active", "high"),
    ("Atwell, LLC", "MI", "AEC-division", "1600-2000", ">500", "mobile;cartography", "active", "high"),
    ("WSB", "MN", "AEC-division", "1100-1700", ">500", "aerial;lidar;cartography", "active", "high"),
    ("Mead & Hunt", "WI", "AEC-division", "1200-1414", ">500", "cartography", "active", "high"),
    ("Halff Associates", "TX", "AEC-division", "1000-1300", ">500", "cartography", "active", "high"),
    ("David Evans and Associates (DEA)", "OR", "AEC-division", "1000-1100", ">500", "mobile;lidar;cartography", "active", "high"),
    ("Langan Engineering & Environmental", "NJ", "AEC-division", "~2560", ">500", "mobile;cartography", "active", "high"),
    ("Timmons Group", "VA", "AEC-division", "715-1000", ">500", "cartography", "active", "med"),
    ("ECS Limited", "VA", "AEC-division", "~3000", ">500", "tomography", "active", "high"),
    ("USIC", "IN", "specialist", "10000+", ">500", "tomography", "active", "high"),
    ("National Underground Group", "CA", "specialist", "650-857", ">500", "tomography", "active", "med"),
]

# ---- write companies.csv ----
with open(os.path.join(OUT, "companies.csv"), "w", newline="", encoding="utf-8") as f:
    w = csv.writer(f)
    w.writerow(["Company", "HQ_State", "Firm_Type", "Employees_Estimate",
                "Size_Bucket", "Service_Categories", "Status", "Confidence"])
    for row in COMPANIES:
        w.writerow(row)

# ---- state x bucket matrix ----
states = sorted({r[1] for r in COMPANIES})
matrix = {s: {b: 0 for b in BUCKETS} for s in states}
for (_, st, _ft, _emp, bucket, _cat, _status, _conf) in COMPANIES:
    matrix[st][bucket] += 1

with open(os.path.join(OUT, "state_size_matrix.csv"), "w", newline="", encoding="utf-8") as f:
    w = csv.writer(f)
    w.writerow(["HQ_State"] + BUCKETS + ["TOTAL", "TARGET_BUCKETS(30-100,200-300,300-500)"])
    for s in states:
        counts = [matrix[s][b] for b in BUCKETS]
        total = sum(counts)
        target = sum(matrix[s][b] for b in TARGET_BUCKETS)
        w.writerow([s] + counts + [total, target])
    # totals row
    tot = [sum(matrix[s][b] for s in states) for b in BUCKETS]
    w.writerow(["ALL"] + tot + [sum(tot), sum(matrix[s][b] for s in states for b in TARGET_BUCKETS)])

# ---- summary by bucket ----
bucket_tot = {b: 0 for b in BUCKETS}
for r in COMPANIES:
    bucket_tot[r[4]] += 1
with open(os.path.join(OUT, "summary_by_bucket.csv"), "w", newline="", encoding="utf-8") as f:
    w = csv.writer(f)
    w.writerow(["Size_Bucket", "Company_Count", "Is_Target_Bucket"])
    for b in BUCKETS:
        w.writerow([b, bucket_tot[b], "YES" if b in TARGET_BUCKETS else "no"])
    w.writerow(["ALL", sum(bucket_tot.values()), ""])

# ---- summary by category ----
cat_tot = defaultdict(lambda: {b: 0 for b in BUCKETS})
for (_, _st, _ft, _emp, bucket, cats, _status, _conf) in COMPANIES:
    for c in cats.split(";"):
        cat_tot[c][bucket] += 1
with open(os.path.join(OUT, "summary_by_category.csv"), "w", newline="", encoding="utf-8") as f:
    w = csv.writer(f)
    w.writerow(["Service_Category"] + BUCKETS + ["TOTAL"])
    for c in ["aerial", "lidar", "mobile", "tomography", "cartography"]:
        counts = [cat_tot[c][b] for b in BUCKETS]
        w.writerow([c] + counts + [sum(counts)])

# ---- console summary ----
print("Total companies in registry:", len(COMPANIES))
print("\nBy size bucket:")
for b in BUCKETS:
    flag = "  <-- TARGET" if b in TARGET_BUCKETS else ""
    print(f"  {b:>8}: {bucket_tot[b]:>3}{flag}")
print(f"\nTarget buckets (30-100, 200-300, 300-500) total: "
      f"{sum(bucket_tot[b] for b in TARGET_BUCKETS)}")
print("\nStates represented:", len(states))
print("\nTop states by total firms:")
state_tot = sorted(states, key=lambda s: -sum(matrix[s].values()))
for s in state_tot[:12]:
    print(f"  {s}: total={sum(matrix[s].values())}  "
          f"target={sum(matrix[s][b] for b in TARGET_BUCKETS)}")
print("\nBy service category (counts; firms tagged with multiple):")
for c in ["aerial", "lidar", "mobile", "tomography", "cartography"]:
    print(f"  {c:>11}: {sum(cat_tot[c].values())}")
