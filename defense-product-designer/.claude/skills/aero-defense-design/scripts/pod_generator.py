#!/usr/bin/env python3
"""Параметричний генератор аеро-поду з оптичним вікном (лише stdlib).

Будує тіло обертання (ніс · циліндр · хвостовик), плоску фасету з вікном знизу з пологими
рампами (без уступів), кріплення (пілон / сідло під фюзеляж / хомути БПЛА) і видає:
  <out>.svg          технічне креслення: вид збоку + спереду, конус FOV, потік, розміри, метрики
  <out>.scad         OpenSCAD-модель (F6 → експорт STL; STEP — через FreeCAD)
  <out>_profile.csv  профіль r(x) для сплайна в CAD (SolidWorks/Fusion/Onshape)
  <out>.json         метрики і попередження

Приклад:
  python3 pod_generator.py --length 600 --diameter 140 --nose vonkarman --nose-frac 0.28 \
     --tail-frac 0.30 --boattail-deg 10 --window-pos 0.45 --window-dia 40 --fov-deg 60 \
     --mount pylon --speed-kmh 180 --alt-m 1500 --out out/pod_v1
"""
from __future__ import annotations

import argparse
import json
import math
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from aero_optics_calc import body_drag  # noqa: E402

N = 240
GUNSHIP = "#4F5356"


# ---------------------------------------------------------------- геометрія

def make_profile(L, D, nose, nose_frac, tail_frac, boattail_deg, base_dia):
    R = D / 2
    Ln = R if nose == "hemisphere" else nose_frac * L
    Lt = tail_frac * L
    Lc = L - Ln - Lt
    if Lc < 0:
        raise SystemExit("nose-frac + tail-frac занадто великі для цієї довжини")
    # хвостовик: плавний (G1) вхід на перших 30 % довжини, далі конус з кутом θ
    Lb = 0.3 * Lt
    if base_dia is not None:
        dR = R - base_dia / 2
        k = dR / (Lt - Lb / 2)
    else:
        k = math.tan(math.radians(boattail_deg))
        dR = min(R, k * (Lt - Lb / 2))
        k = dR / (Lt - Lb / 2)
    rb = R - dR

    def r(x):
        if x <= Ln:
            if nose == "ellipse":
                return R * math.sqrt(max(0.0, 1 - ((Ln - x) / Ln) ** 2))
            if nose == "vonkarman":
                th = math.acos(max(-1.0, min(1.0, 1 - 2 * x / Ln)))
                return R / math.sqrt(math.pi) * math.sqrt(max(0.0, th - math.sin(2 * th) / 2))
            if nose == "ogive":
                rho = (R ** 2 + Ln ** 2) / (2 * R)
                return math.sqrt(max(0.0, rho ** 2 - (Ln - x) ** 2)) + R - rho
            if nose == "hemisphere":
                return math.sqrt(max(0.0, R ** 2 - (R - x) ** 2))
        if x <= Ln + Lc:
            return R
        u = x - Ln - Lc
        drop = k * u * u / (2 * Lb) if u <= Lb else k * (Lb / 2 + u - Lb)
        return max(0.0, R - drop)

    # щільніша сітка біля носа
    xs = sorted(set([Ln * (1 - math.cos(math.pi / 2 * i / (N // 3))) for i in range(N // 3 + 1)] +
                    [Ln + (L - Ln) * i / (2 * N // 3) for i in range(2 * N // 3 + 1)]))
    pts = [(x, r(x)) for x in xs]
    return pts, dict(R=R, Ln=Ln, Lc=Lc, Lt=Lt, rb=rb, dR=dR), r


def integrate(pts):
    vol = wet = 0.0
    max_tail_slope = 0.0
    for (x0, r0), (x1, r1) in zip(pts, pts[1:]):
        dx = x1 - x0
        if dx <= 0:
            continue
        vol += math.pi * (r0 * r0 + r0 * r1 + r1 * r1) / 3 * dx
        wet += math.pi * (r0 + r1) * math.hypot(dx, r1 - r0)
        if r1 < r0:
            max_tail_slope = max(max_tail_slope, (r0 - r1) / dx)
    return vol, wet, math.degrees(math.atan(max_tail_slope))


def naca00(c, t, n=40):
    up = []
    for i in range(n + 1):
        x = c * (1 - math.cos(math.pi * i / n)) / 2
        xc = x / c
        y = 5 * t * c * (0.2969 * math.sqrt(xc) - 0.1260 * xc - 0.3516 * xc ** 2 + 0.2843 * xc ** 3 - 0.1036 * xc ** 4)
        up.append((x, y))
    return up + [(x, -y) for x, y in reversed(up[1:-1])]


# ---------------------------------------------------------------- SVG

def svg_drawing(a, pts, g, win, mount, metrics, warnings):
    L, R = a.length, g["R"]
    s = 820.0 / L  # px/мм
    mh = mount.get("height", 0) if mount["type"] != "clamp" else 6 + mount["tube"] + 8
    zt = R + mh + 0.45 * R  # рівень розмірних ліній
    reach = 0.42 * L
    ox, oy = 140, 110 + (zt + 0.35 * R) * s + 20  # вісь виду збоку
    fs = min(s, 120.0 / R)
    cx = ox + L * s + 110 + (R + mh) * fs
    W = int(cx + (R + 20) * fs + 60)
    hm_ = math.radians(a.fov_deg / 2 + a.margin_deg)
    lk_ = math.radians(a.look_deg)
    deep = 1.0 if abs(lk_) < hm_ else max(math.cos(lk_ - hm_), math.cos(lk_ + hm_))
    side_bottom = oy + (win["plane_r"] + reach * deep + 30) * s
    H = int(max(side_bottom, oy + 2.2 * R * s) + 320)
    X = lambda x: ox + x * s
    Y = lambda z: oy - z * s
    o = []
    o.append(f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}" '
             'font-family="Helvetica, Arial, sans-serif">')
    o.append('<defs><marker id="ar" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">'
             '<path d="M0,0 L8,4 L0,8 z" fill="#222"/></marker>'
             '<marker id="fl" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">'
             '<path d="M0,1 L9,5 L0,9" fill="none" stroke="#3BA7C9" stroke-width="1.5"/></marker></defs>')
    o.append(f'<rect width="{W}" height="{H}" fill="#F4F5F6"/>')
    o.append(f'<text x="40" y="44" font-size="22" font-weight="700" fill="#1B1D1F">{a.title}</text>')
    o.append(f'<text x="40" y="68" font-size="13" fill="#555">ВИД ЗБОКУ · масштаб {s:.3f} px/мм · '
             'потік зліва направо · вісь X — по польоту</text>')

    # потік
    for k in (-1.4, -0.7, 0, 0.7, 1.4):
        y = Y(k * R)
        o.append(f'<line x1="40" y1="{y:.1f}" x2="{ox-20:.1f}" y2="{y:.1f}" stroke="#3BA7C9" '
                 'stroke-width="1.5" marker-end="url(#fl)"/>')
    o.append(f'<text x="40" y="{Y(1.9*R):.1f}" font-size="12" fill="#3BA7C9">V∞</text>')

    # FOV
    xw, zf = win["x"], -win["plane_r"]
    look = math.radians(a.look_deg)
    h = math.radians(a.fov_deg / 2)
    p1 = (xw - reach * math.sin(look - h), zf - reach * math.cos(look - h))
    p2 = (xw - reach * math.sin(look + h), zf - reach * math.cos(look + h))
    o.append(f'<path d="M{X(xw):.1f},{Y(zf):.1f} L{X(p1[0]):.1f},{Y(p1[1]):.1f} L{X(p2[0]):.1f},{Y(p2[1]):.1f} z" '
             'fill="#3BA7C9" fill-opacity="0.12" stroke="#3BA7C9" stroke-dasharray="6 4"/>')
    hm = h + math.radians(a.margin_deg)
    for sgn in (-1, 1):
        q = (xw - reach * math.sin(look + sgn * hm), zf - reach * math.cos(look + sgn * hm))
        o.append(f'<line x1="{X(xw):.1f}" y1="{Y(zf):.1f}" x2="{X(q[0]):.1f}" y2="{Y(q[1]):.1f}" '
                 'stroke="#C9783B" stroke-width="1" stroke-dasharray="2 4"/>')
    o.append(f'<text x="{X(max(p1[0], p2[0]))+8:.1f}" y="{Y(min(p1[1], p2[1])):.1f}" font-size="12" fill="#2A7F99">'
             f'FOV {a.fov_deg:.0f}° (+{a.margin_deg:.0f}° запас)</text>')

    # кріплення (позаду тіла)
    if mount["type"] == "pylon":
        c, x0, top = mount["chord"], mount["x0"], R + mount["height"]
        sweep = 0.25 * c
        o.append(f'<path d="M{X(x0):.1f},{Y(0):.1f} L{X(x0+sweep):.1f},{Y(top):.1f} '
                 f'L{X(x0+c+sweep*0.6):.1f},{Y(top):.1f} L{X(x0+c):.1f},{Y(0):.1f} z" fill="#3E4245"/>')
        o.append(f'<line x1="{X(x0+sweep-10):.1f}" y1="{Y(top):.1f}" x2="{X(x0+c+sweep*0.6+10):.1f}" '
                 f'y2="{Y(top):.1f}" stroke="#222" stroke-width="2"/>')
        o.append(f'<text x="{X(x0+c+sweep*0.6+16):.1f}" y="{Y(top)+4:.1f}" font-size="12" fill="#333">'
                 'інтерфейс ЛА (вушка/планка)</text>')
    elif mount["type"] == "belly":
        x0, x1, top = mount["x0"], mount["x1"], R + mount["height"]
        o.append(f'<path d="M{X(x0-30):.1f},{Y(R*0.6):.1f} L{X(x0):.1f},{Y(top):.1f} L{X(x1):.1f},{Y(top):.1f} '
                 f'L{X(x1+40):.1f},{Y(R*0.6):.1f} z" fill="#3E4245"/>')
        o.append(f'<line x1="{X(x0-60):.1f}" y1="{Y(top):.1f}" x2="{X(x1+80):.1f}" y2="{Y(top):.1f}" '
                 'stroke="#222" stroke-width="2" stroke-dasharray="10 5"/>')
        o.append(f'<text x="{X(x1+86):.1f}" y="{Y(top)+4:.1f}" font-size="12" fill="#333">обшивка ЛА</text>')
    else:
        tb = mount["tube"]
        ty = R + 6 + tb / 2 + 4  # вісь штанги
        o.append(f'<rect x="{X(-40):.1f}" y="{Y(ty+tb/2):.1f}" width="{(L+80)*s:.1f}" '
                 f'height="{tb*s:.1f}" fill="#9AA0A4" fill-opacity="0.5"/>')
        for xc in mount["xs"]:  # сідло на поді + хомут навколо штанги
            o.append(f'<path d="M{X(xc-22):.1f},{Y(R-4):.1f} L{X(xc-12):.1f},{Y(ty):.1f} L{X(xc+12):.1f},{Y(ty):.1f} '
                     f'L{X(xc+22):.1f},{Y(R-4):.1f} z" fill="#3E4245"/>')
            o.append(f'<rect x="{X(xc-12):.1f}" y="{Y(ty+tb/2+4):.1f}" width="{24*s:.1f}" height="{(tb+8)*s:.1f}" '
                     'rx="3" fill="#2E3133"/>')
        o.append(f'<text x="{X(L+48):.1f}" y="{Y(ty)+4:.1f}" font-size="12" fill="#333">штанга/рама БПЛА</text>')

    # тіло
    up = " ".join(f"{X(x):.1f},{Y(r):.1f}" for x, r in pts)
    dn = " ".join(f"{X(x):.1f},{Y(-r):.1f}" for x, r in reversed(pts))
    o.append(f'<polygon points="{up} {dn}" fill="{GUNSHIP}" stroke="#2B2E30" stroke-width="1.2"/>')
    # світлова лінія вздовж потоку
    hl = " ".join(f"{X(x):.1f},{Y(r*0.55):.1f}" for x, r in pts if x > g["Ln"] * 0.35)
    o.append(f'<polyline points="{hl}" fill="none" stroke="#6E7477" stroke-width="1"/>')
    # фасета вікна знизу (з рампами)
    fx = win["facet_x"]
    o.append(f'<polygon points="{X(fx[0]):.1f},{Y(-win["r_at"](fx[0])):.1f} {X(fx[1]):.1f},{Y(zf):.1f} '
             f'{X(fx[2]):.1f},{Y(zf):.1f} {X(fx[3]):.1f},{Y(-win["r_at"](fx[3])):.1f}" fill="#1A1A1A"/>')
    o.append(f'<line x1="{X(xw-a.window_dia/2):.1f}" y1="{Y(zf):.1f}" x2="{X(xw+a.window_dia/2):.1f}" '
             f'y2="{Y(zf):.1f}" stroke="#7FD3EA" stroke-width="3"/>')
    o.append(f'<line x1="{X(0)-10:.1f}" y1="{Y(0):.1f}" x2="{X(L)+20:.1f}" y2="{Y(0):.1f}" stroke="#999" '
             'stroke-dasharray="14 4 2 4"/>')

    # розміри
    def dim_h(x0, x1, z, label):
        o.append(f'<line x1="{X(x0):.1f}" y1="{Y(z):.1f}" x2="{X(x1):.1f}" y2="{Y(z):.1f}" stroke="#222" '
                 'marker-start="url(#ar)" marker-end="url(#ar)"/>')
        o.append(f'<text x="{(X(x0)+X(x1))/2:.1f}" y="{Y(z)-5:.1f}" font-size="12" text-anchor="middle" '
                 f'fill="#222">{label}</text>')
    dim_h(0, L, zt + 0.35 * R, f"L = {L:.0f}")
    dim_h(0, g["Ln"], zt, f"ніс {g['Ln']:.0f}")
    if g["Lc"] > 1:
        dim_h(g["Ln"], g["Ln"] + g["Lc"], zt, f"циліндр {g['Lc']:.0f}")
    dim_h(L - g["Lt"], L, zt, f"хвіст {g['Lt']:.0f}")
    o.append(f'<line x1="{X(L)+40:.1f}" y1="{Y(R):.1f}" x2="{X(L)+40:.1f}" y2="{Y(-R):.1f}" stroke="#222" '
             'marker-start="url(#ar)" marker-end="url(#ar)"/>')
    o.append(f'<text x="{X(L)+48:.1f}" y="{Y(0)+4:.1f}" font-size="12" fill="#222">Ø{a.diameter:.0f}</text>')
    o.append(f'<text x="{X(L-g["Lt"]*0.5):.1f}" y="{Y(-R)+26:.1f}" font-size="12" fill="#222" '
             f'text-anchor="middle">хвостовик max {metrics["boattail_max_deg"]:.1f}° · торець Ø{2*g["rb"]:.0f}</text>')
    o.append(f'<text x="{X(xw)-14:.1f}" y="{Y(zf)+22:.1f}" font-size="12" fill="#111" text-anchor="end" '
             f'font-weight="700">вікно Ø{a.window_dia:.0f} @ {xw:.0f} мм</text>')

    # вид спереду
    cy = oy
    o.append(f'<text x="{cx}" y="{cy+(R+20)*fs+28:.1f}" font-size="13" fill="#555" text-anchor="middle">ВИД СПЕРЕДУ</text>')
    if mount["type"] == "pylon":
        t, hh = mount["thick"], mount["height"]
        o.append(f'<rect x="{cx-t/2*fs:.1f}" y="{cy-(R+hh)*fs:.1f}" width="{t*fs:.1f}" height="{(R+hh)*fs:.1f}" fill="#3E4245"/>')
    elif mount["type"] == "belly":
        wd, hh = 0.6 * a.diameter, mount["height"]
        o.append(f'<path d="M{cx-wd/2*fs-12:.1f},{cy-R*0.6*fs:.1f} L{cx-wd/2*fs:.1f},{cy-(R+hh)*fs:.1f} '
                 f'L{cx+wd/2*fs:.1f},{cy-(R+hh)*fs:.1f} L{cx+wd/2*fs+12:.1f},{cy-R*0.6*fs:.1f} z" fill="#3E4245"/>')
    else:
        tb = mount["tube"]
        tyc = cy - (R + 6 + tb / 2 + 4) * fs
        o.append(f'<path d="M{cx-0.35*R*fs:.1f},{cy-(R-6)*fs:.1f} L{cx-tb/2*fs:.1f},{tyc:.1f} L{cx+tb/2*fs:.1f},{tyc:.1f} '
                 f'L{cx+0.35*R*fs:.1f},{cy-(R-6)*fs:.1f} z" fill="#3E4245"/>')
        o.append(f'<circle cx="{cx}" cy="{tyc:.1f}" r="{(tb/2+4)*fs:.1f}" fill="#2E3133"/>')
        o.append(f'<circle cx="{cx}" cy="{tyc:.1f}" r="{tb/2*fs:.1f}" fill="#9AA0A4"/>')
    yflat = win["plane_r"]
    half = math.sqrt(max(0, R * R - yflat * yflat))
    ang = math.degrees(math.atan2(yflat, half))
    # коло з хордою знизу
    o.append(f'<path d="M{cx-half*fs:.1f},{cy+yflat*fs:.1f} A{R*fs:.1f},{R*fs:.1f} 0 1 1 {cx+half*fs:.1f},{cy+yflat*fs:.1f} z" '
             f'fill="{GUNSHIP}" stroke="#2B2E30"/>')
    o.append(f'<line x1="{cx-half*fs:.1f}" y1="{cy+yflat*fs:.1f}" x2="{cx+half*fs:.1f}" y2="{cy+yflat*fs:.1f}" '
             'stroke="#1A1A1A" stroke-width="5"/>')
    o.append(f'<line x1="{cx-a.window_dia/2*fs:.1f}" y1="{cy+yflat*fs:.1f}" x2="{cx+a.window_dia/2*fs:.1f}" '
             f'y2="{cy+yflat*fs:.1f}" stroke="#7FD3EA" stroke-width="3"/>')
    o.append(f'<circle cx="{cx}" cy="{cy}" r="{g["rb"]*fs:.1f}" fill="none" stroke="#999" stroke-dasharray="3 3"/>')
    del ang

    # таблиця метрик
    ty = H - 300
    o.append(f'<rect x="30" y="{ty}" width="{W-60}" height="280" fill="#FFFFFF" stroke="#C9CDD0"/>')
    o.append(f'<text x="50" y="{ty+28}" font-size="15" font-weight="700" fill="#1B1D1F">ПАРАМЕТРИ</text>')
    rows = [
        ("Ніс", f"{a.nose} · {g['Ln']:.0f} мм"), ("L/D", f"{metrics['L_over_D']:.2f}"),
        ("Об'єм", f"{metrics['volume_l']:.2f} л"), ("Змочена площа", f"{metrics['wetted_area_m2']:.4f} м²"),
        ("Мідель", f"{metrics['frontal_area_m2']*1e4:.1f} см²"),
        ("Хвостовик max", f"{metrics['boattail_max_deg']:.1f}°"),
        ("Торець", f"Ø{2*g['rb']:.0f} мм ({metrics['base_ratio']*100:.0f}% D)"),
        ("Вікно", f"Ø{a.window_dia:.0f} · фасета {win['facet_len']:.0f} мм · глибина {win['depth']:.1f} мм"),
        ("Рампи фасети", f"≤ {a.ramp_deg:.0f}°"), ("Кріплення", mount["type"]),
    ]
    if "drag" in metrics:
        d = metrics["drag"]
        rows += [("Швидкість/висота", f"{a.speed_kmh:.0f} км/год · {a.alt_m:.0f} м"),
                 ("Cd встановл.", f"{d['Cd_installed']:.3f}"),
                 ("Опір", f"{d['drag_N']:.1f} Н · {d['drag_power_W']:.0f} Вт")]
    for i, (k, v) in enumerate(rows):
        col, row = divmod(i, 7)
        x = 50 + col * 400
        y = ty + 56 + row * 26
        o.append(f'<text x="{x}" y="{y}" font-size="12.5" fill="#666">{k}</text>')
        o.append(f'<text x="{x+130}" y="{y}" font-size="12.5" fill="#111" font-weight="600">{v}</text>')
    o.append(f'<text x="{W-430}" y="{ty+28}" font-size="15" font-weight="700" fill="#B5462B">ПОПЕРЕДЖЕННЯ</text>')
    wy = ty + 52
    for wtxt in (warnings or ["— немає критичних"])[:8]:
        for line in _wrap(wtxt, 52):
            o.append(f'<text x="{W-430}" y="{wy}" font-size="11.5" fill="#333">{line}</text>')
            wy += 16
        wy += 4
    o.append(f'<text x="{W-40}" y="{H-8}" font-size="10" fill="#999" text-anchor="end">'
             'aero-defense-design · концептуальна оцінка, не заміна CFD/випробувань</text>')
    o.append("</svg>")
    return "\n".join(o)


def _wrap(t, n):
    words, lines, cur = t.split(), [], ""
    for w in words:
        if len(cur) + len(w) + 1 > n:
            lines.append(cur)
            cur = w
        else:
            cur = f"{cur} {w}".strip()
    if cur:
        lines.append(cur)
    return [l.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;") for l in lines]


# ---------------------------------------------------------------- SCAD

def scad_model(a, pts, g, win, mount):
    poly = [[round(r, 3), round(x, 3)] for x, r in pts]
    if poly[0][0] > 0:
        poly.insert(0, [0, 0])
    if poly[-1][0] > 0:
        poly.append([0, round(a.length, 3)])
    R = g["R"]
    fx = win["facet_x"]
    zf = -win["plane_r"]
    cut = [[fx[0], -R - 60], [fx[0], -win["r_at"](fx[0]) - 0.01], [fx[1], zf], [fx[2], zf],
           [fx[3], -win["r_at"](fx[3]) - 0.01], [fx[3], -R - 60]]
    s = [f"// {a.title} — згенеровано aero-defense-design/pod_generator.py",
         "// Вісь X — напрям польоту (ніс у X=0, потік у +X). Одиниці — мм.",
         "$fn = 128;", f"profile = {json.dumps(poly)};", f"facet_cut = {json.dumps([[round(p, 3) for p in q] for q in cut])};",
         "module body() { rotate([0,90,0]) rotate_extrude() polygon(profile); }",
         f"module facet() {{ rotate([90,0,0]) linear_extrude(height={2*R+20:.1f}, center=true) polygon(facet_cut); }}"]
    if mount["type"] == "pylon":
        prof = naca00(mount["chord"], mount["thick"] / mount["chord"])
        s.append(f"pylon_prof = {json.dumps([[round(x, 3), round(y, 3)] for x, y in prof])};")
        s.append(f"module mount() {{ translate([{mount['x0']:.2f},0,0]) "
                 f"linear_extrude(height={R + mount['height']:.2f}) polygon(pylon_prof); }}")
    elif mount["type"] == "belly":
        wd = 0.6 * a.diameter
        s.append(f"module mount() {{ hull() {{ translate([{mount['x0']-30:.1f},{-wd/2-8:.1f},0]) cube([{mount['x1']-mount['x0']+70:.1f},{wd+16:.1f},1]); "
                 f"translate([{mount['x0']:.1f},{-wd/2:.1f},{R+mount['height']-1:.1f}]) cube([{mount['x1']-mount['x0']:.1f},{wd:.1f},1]); }} }}")
    else:
        tb = mount["tube"]
        tz = R + 6 + tb / 2 + 4
        parts = " ".join(
            f"hull() {{ translate([{xc-22:.1f},{-0.35*R:.1f},{R-8:.1f}]) cube([44,{0.7*R:.1f},1]); "
            f"translate([{xc-12:.1f},{-tb/2:.1f},{tz-1:.1f}]) cube([24,{tb:.1f},1]); }} "
            f"translate([{xc-12:.1f},0,{tz:.1f}]) rotate([0,90,0]) difference() {{ cylinder(r={tb/2+4:.1f}, h=24); "
            f"translate([0,0,-1]) cylinder(r={tb/2:.1f}, h=26); }}" for xc in mount["xs"])
        s.append(f"module mount() {{ {parts} }}")
        s.append(f'%translate([-40,0,{tz:.1f}]) rotate([0,90,0]) cylinder(d={tb:.1f}, h={a.length+80:.1f}); // штанга БПЛА')
    s.append(f"module window() {{ translate([{win['x']:.2f},0,{zf-1:.3f}]) cylinder(d={a.window_dia:.2f}, h=3); }}")
    s.append("skin_t = 0.8; // товщина чорної оптичної вставки (фасета + рампи)")
    s.append("module skin() { intersection() { body(); difference() { translate([0,0,skin_t]) facet(); facet(); } } }")
    s.append(f'color("{GUNSHIP}") difference() {{ union() {{ body(); mount(); }} translate([0,0,skin_t]) facet(); }}')
    s.append('color("#1A1A1A") difference() { skin(); window(); }')
    s.append('color([0.5,0.82,0.92,0.75]) intersection() { skin(); window(); }')
    return "\n".join(s) + "\n"


# ---------------------------------------------------------------- main

def main(argv=None):
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("--length", type=float, required=True, help="мм")
    p.add_argument("--diameter", type=float, required=True, help="мм (мідель)")
    p.add_argument("--nose", choices=["ellipse", "vonkarman", "ogive", "hemisphere"], default="ellipse")
    p.add_argument("--nose-frac", type=float, default=0.25)
    p.add_argument("--tail-frac", type=float, default=0.38)
    p.add_argument("--boattail-deg", type=float, default=10.0, help="макс. половинний кут хвостовика")
    p.add_argument("--base-dia", type=float, help="задати діаметр торця напряму (перекриває кут)")
    p.add_argument("--window-pos", type=float, default=0.45, help="центр вікна, частка L від носа")
    p.add_argument("--window-dia", type=float, default=40.0, help="світловий діаметр вікна, мм")
    p.add_argument("--frame", type=float, default=6.0, help="рамка/ущільнення по периметру, мм")
    p.add_argument("--ramp-deg", type=float, default=8.0, help="кут рамп фасети")
    p.add_argument("--fov-deg", type=float, default=60.0)
    p.add_argument("--margin-deg", type=float, default=4.0)
    p.add_argument("--look-deg", type=float, default=0.0, help="0 = надир, + = нахил вперед")
    p.add_argument("--mount", choices=["pylon", "belly", "clamp"], default="pylon")
    p.add_argument("--speed-kmh", type=float)
    p.add_argument("--alt-m", type=float, default=0.0)
    p.add_argument("--title", default="AERO NAV POD — концепт")
    p.add_argument("--out", default="out/pod")
    a = p.parse_args(argv)

    L, D = a.length, a.diameter
    pts, g, rfun = make_profile(L, D, a.nose, a.nose_frac, a.tail_frac, a.boattail_deg, a.base_dia)
    R = g["R"]
    vol, wet, bt = integrate(pts)
    warnings = []

    # вікно і фасета
    xw = a.window_pos * L
    wf = a.window_dia + 2 * a.frame
    rw = min(rfun(min(L, max(0, xw + dx))) for dx in (-wf / 2, 0, wf / 2))
    if wf / 2 >= rw:
        raise SystemExit("Вікно ширше за тіло в цьому місці — зменш вікно або посунь його")
    plane_r = math.sqrt(rw * rw - (wf / 2) ** 2)
    depth = R - plane_r
    ramp = depth / math.tan(math.radians(a.ramp_deg))
    fx = [xw - wf / 2 - ramp, xw - wf / 2, xw + wf / 2, xw + wf / 2 + ramp]
    fx[0] = max(fx[0], 1.0)
    fx[3] = min(fx[3], L - 1.0)
    win = dict(x=xw, plane_r=plane_r, depth=depth, facet_x=fx, facet_len=fx[3] - fx[0], r_at=rfun)

    slope_w = max(abs(rfun(min(L, xw + d) ) - rfun(max(0, xw + d - 2))) / 2 for d in (-wf / 2, 0, wf / 2))
    if math.degrees(math.atan(slope_w)) > 3:
        warnings.append("Вікно виходить за циліндричну частину: фасета на кривині — посунь у зону циліндра.")
    if xw < g["Ln"] * 0.9:
        warnings.append("Вікно на носі: бруд, комахи, лід і дощова ерозія максимальні — краще циліндр.")
    if fx[3] > L - g["Lt"] * 0.5:
        warnings.append("Фасета в другій половині хвостовика: ризик зриву потоку перед/над вікном.")
    if bt > 12.05:
        warnings.append(f"Хвостовик {bt:.1f}° > 12°: зрив і бафтинг — подовж хвіст або збільш торець (Kamm).")
    base_ratio = g["rb"] / R
    if base_ratio > 0.45:
        lt_need = (R - 0.35 * R) / (math.tan(math.radians(min(bt, 12) or 10)) * 0.85)
        warnings.append(f"Торець {base_ratio*100:.0f}% D — помітний донний опір. Для торця 35% D при "
                        f"{min(bt, 12):.0f}° потрібен хвіст ≈ {lt_need:.0f} мм (tail-frac {lt_need/L:.2f}) або Kamm-зріз.")
    if L / D < 3:
        warnings.append("L/D < 3: дуже коротке тіло, великий тиск-опір.")
    if a.look_deg + a.fov_deg / 2 + a.margin_deg > 50:
        warnings.append("Кут падіння на вікні > 50°: нахили фасету під вісь погляду або використай купол.")
    if a.nose == "vonkarman" and (a.speed_kmh or 0) and a.speed_kmh < 300:
        warnings.append("von Kármán на < 300 км/год — суто стилістичний вибір; еліптичний ніс дасть той самий опір і більше об'єму.")

    # кріплення
    if a.mount == "pylon":
        chord = 0.42 * L
        thick = min(0.12 * chord, 0.3 * D)
        mount = dict(type="pylon", chord=chord, thick=thick, height=0.45 * D, x0=max(g["Ln"] * 0.8, 0.22 * L))
        if mount["x0"] + chord > L - g["Lt"] * 0.4:
            warnings.append("Задня кромка пілона заходить на хвостовик — інтерференція, скороти хорду.")
        interference = 1.25
    elif a.mount == "belly":
        mount = dict(type="belly", x0=0.28 * L, x1=0.70 * L, height=0.12 * D)
        interference = 1.5
    else:
        mount = dict(type="clamp", xs=[0.36 * L, 0.64 * L], tube=max(16.0, 0.18 * D))
        interference = 1.4

    metrics = dict(L_over_D=L / D, volume_l=vol / 1e6, wetted_area_m2=wet / 1e6,
                   frontal_area_m2=math.pi * R * R / 1e6, boattail_max_deg=bt, base_ratio=base_ratio,
                   nose_len_mm=g["Ln"], body_len_mm=g["Lc"], tail_len_mm=g["Lt"], base_dia_mm=2 * g["rb"],
                   window=dict(x_mm=xw, dia_mm=a.window_dia, facet_len_mm=win["facet_len"],
                               facet_depth_mm=depth, ramp_deg=a.ramp_deg),
                   mount=a.mount)
    if a.speed_kmh:
        d = body_drag(a.speed_kmh, a.alt_m, L, D, 2 * g["rb"], bt, interference, 0.10,
                      wetted_area_m2=wet / 1e6, x_window_mm=xw)
        metrics["drag"] = {k: d[k] for k in ("Mach", "q_Pa", "Re_L", "Cd_friction", "Cd_base", "Cd_installed",
                                              "drag_N", "drag_power_W", "boundary_layer_at_window_mm")}
        warnings += [w for w in d["warnings"] if not w.startswith(("Торець", "Хвостовик", "L/D"))]

    os.makedirs(os.path.dirname(os.path.abspath(a.out)), exist_ok=True)
    with open(a.out + ".svg", "w", encoding="utf-8") as f:
        f.write(svg_drawing(a, pts, g, win, mount, metrics, warnings))
    with open(a.out + ".scad", "w", encoding="utf-8") as f:
        f.write(scad_model(a, pts, g, win, mount))
    with open(a.out + "_profile.csv", "w", encoding="utf-8") as f:
        f.write("x_mm,r_mm\n" + "".join(f"{x:.3f},{r:.3f}\n" for x, r in pts))
    metrics["warnings"] = warnings
    with open(a.out + ".json", "w", encoding="utf-8") as f:
        json.dump(metrics, f, ensure_ascii=False, indent=2)
    print(json.dumps(metrics, ensure_ascii=False, indent=2))
    print(f"\n→ {a.out}.svg  {a.out}.scad  {a.out}_profile.csv  {a.out}.json")


if __name__ == "__main__":
    main()
