#!/usr/bin/env python3
"""Інженерний калькулятор для аеро-модулів оптичної навігації (лише stdlib).

Підкоманди:
  aero       оцінка опору тіла обертання (под/обтічник) за Hoerner + МСА
  window     мінімальний розмір плоского вікна під FOV, кут падіння, відбиття
  gsd        GSD, покриття кадру, змаз, потрібний fps
  thickness  товщина круглого вікна під перепад тиску

Усі результати — інженерні ОЦІНКИ для концептуального етапу, не заміна CFD/випробувань.
"""
from __future__ import annotations

import argparse
import json
import math
import sys

# ---------------------------------------------------------------- атмосфера (МСА)

def isa(alt_m: float) -> dict:
    """Міжнародна стандартна атмосфера, тропосфера/нижня стратосфера (до 20 км)."""
    if alt_m <= 11000:
        T = 288.15 - 0.0065 * alt_m
        p = 101325.0 * (T / 288.15) ** 5.25588
    else:
        T = 216.65
        p = 22632.06 * math.exp(-9.80665 * (alt_m - 11000) / (287.053 * T))
    rho = p / (287.053 * T)
    mu = 1.458e-6 * T ** 1.5 / (T + 110.4)  # Сазерленд
    a = math.sqrt(1.4 * 287.053 * T)
    return {"T_K": T, "p_Pa": p, "rho": rho, "mu": mu, "nu": mu / rho, "a_ms": a}


# ---------------------------------------------------------------- аеро

def body_drag(speed_kmh: float, alt_m: float, length_mm: float, diameter_mm: float,
              base_diameter_mm: float = 0.0, boattail_deg: float | None = None,
              interference: float = 1.0, excrescence: float = 0.10,
              wetted_area_m2: float | None = None, x_window_mm: float | None = None) -> dict:
    atm = isa(alt_m)
    V = speed_kmh / 3.6
    L = length_mm / 1000.0
    D = diameter_mm / 1000.0
    db = base_diameter_mm / 1000.0
    q = 0.5 * atm["rho"] * V ** 2
    mach = V / atm["a_ms"]
    Re = V * L / atm["nu"]
    fr = L / D
    S_front = math.pi * D ** 2 / 4
    S_wet = wetted_area_m2 if wetted_area_m2 else 0.75 * math.pi * D * L  # типово для подів
    Cf = 0.455 / (math.log10(Re) ** 2.58)  # турбулентна пластина (Prandtl–Schlichting)
    FF = 1 + 1.5 / fr ** 1.5 + 7 / fr ** 3  # форм-фактор тіла обертання (Hoerner)
    Cd_fric = Cf * FF * S_wet / S_front  # від площі міделя
    # донний опір (Hoerner): C_Db = 0.029 (db/d)^3 / sqrt(C_Df), від площі міделя
    ratio = db / D if D else 0
    Cd_base = 0.029 * ratio ** 3 / math.sqrt(Cd_fric) if ratio > 0 else 0.0
    Cd_clean = Cd_fric + Cd_base
    Cd_total = Cd_clean * (1 + excrescence) * interference
    drag = q * Cd_total * S_front
    warnings = []
    if fr < 3:
        warnings.append(f"L/D={fr:.1f} < 3: короткий тупий об'єм, сильний тиск-опір — подовжи до 4–7.")
    if fr > 10:
        warnings.append(f"L/D={fr:.1f} > 10: тертя домінує, зайва маса/площа — вкороти, якщо не обмежує мідель.")
    if boattail_deg is not None:
        if boattail_deg > 15:
            warnings.append(f"Хвостовик {boattail_deg}° > 15°: гарантований зрив, бафтинг — зменш до 7–10°.")
        elif boattail_deg > 12:
            warnings.append(f"Хвостовик {boattail_deg}° > 12°: ризик зриву — бажано ≤ 10°.")
    if ratio > 0.5:
        warnings.append(f"Торець {ratio*100:.0f}% D: великий донний опір — зменш до ≤ 30–40% або Kamm-зріз.")
    if mach > 0.6:
        warnings.append(f"M={mach:.2f}: потрібні правило площ і CFD, оцінка Hoerner неточна.")
    out = {
        "atmosphere": {k: float(f"{v:.5g}") for k, v in atm.items()},
        "V_ms": round(V, 2), "Mach": round(mach, 3), "q_Pa": round(q, 1), "Re_L": f"{Re:.3g}",
        "L_over_D": round(fr, 2), "S_front_m2": round(S_front, 5), "S_wet_m2": round(S_wet, 4),
        "Cf": round(Cf, 5), "form_factor": round(FF, 3),
        "Cd_friction": round(Cd_fric, 4), "Cd_base": round(Cd_base, 4),
        "Cd_clean": round(Cd_clean, 4), "Cd_installed": round(Cd_total, 4),
        "drag_N": round(drag, 2), "drag_power_W": round(drag * V, 1),
        "assumptions": {"interference_factor": interference, "excrescence_allowance": excrescence,
                        "turbulent_BL": True},
        "warnings": warnings,
    }
    if x_window_mm:
        x = x_window_mm / 1000.0
        Rex = V * x / atm["nu"]
        delta = 0.37 * x / Rex ** 0.2
        out["boundary_layer_at_window_mm"] = round(delta * 1000, 2)
        out["max_forward_step_mm"] = round(min(0.2, 0.05 * delta * 1000), 3)
    return out


# ---------------------------------------------------------------- вікно

def fresnel_unpolarized(theta_deg: float, n: float) -> float:
    ti = math.radians(theta_deg)
    st = math.sin(ti) / n
    if st >= 1:
        return 1.0
    tt = math.asin(st)
    ci, ct = math.cos(ti), math.cos(tt)
    rs = ((ci - n * ct) / (ci + n * ct)) ** 2
    rp = ((ct - n * ci) / (ct + n * ci)) ** 2
    return 0.5 * (rs + rp)


def window_size(fov_deg: float, aperture_mm: float, distance_mm: float, margin_deg: float = 4.0,
                frame_mm: float = 4.0, n: float = 1.77, look_deg: float = 0.0,
                fov_v_deg: float | None = None, dome_radius_mm: float = 0.0) -> dict:
    def axis(fov):
        half = math.radians(fov / 2 + margin_deg)
        clear = aperture_mm + 2 * distance_mm * math.tan(half)
        return clear, clear + 2 * frame_mm
    ch, wh = axis(fov_deg)
    res = {"clear_aperture_h_mm": round(ch, 1), "window_h_mm": round(wh, 1)}
    if fov_v_deg:
        cv, wv = axis(fov_v_deg)
        res.update({"clear_aperture_v_mm": round(cv, 1), "window_v_mm": round(wv, 1)})
    inc = look_deg + fov_deg / 2 + margin_deg
    R0 = fresnel_unpolarized(0, n)
    Re_ = fresnel_unpolarized(inc, n)
    res.update({
        "max_incidence_deg": round(inc, 1),
        "reflect_per_surface_uncoated_center_pct": round(R0 * 100, 2),
        "reflect_per_surface_uncoated_edge_pct": round(Re_ * 100, 2),
        "note_AR": "AR-покриття зводить до ~0.3–1% на поверхню в розрахунковому діапазоні кутів",
    })
    w = []
    if inc > 50:
        w.append(f"Кут падіння на краю {inc:.0f}° > 50°: різке зростання відбиття/аберацій — "
                 "нахили вікно до осі погляду або розглянь концентричний купол.")
    if distance_mm > 2 * aperture_mm:
        w.append("Об'єктив далеко від вікна — вікно і опір ростуть; підсунь ближче.")
    if dome_radius_mm:
        w.append(f"Купол R={dome_radius_mm} мм: центр кривизни має збігатися із зіницею входу "
                 f"(допуск ~±{0.02*dome_radius_mm:.1f} мм), інакше дефокус/кома.")
    res["warnings"] = w
    return res


# ---------------------------------------------------------------- GSD

def gsd_calc(alt_m: float, focal_mm: float, pixel_um: float, res_px: tuple[int, int],
             speed_kmh: float = 0.0, exposure_ms: float = 1.0, overlap: float = 0.7) -> dict:
    gsd = alt_m * (pixel_um * 1e-6) / (focal_mm * 1e-3)
    w_px, h_px = res_px
    sensor_w = w_px * pixel_um / 1000
    sensor_h = h_px * pixel_um / 1000
    fov_h = 2 * math.degrees(math.atan(sensor_w / 2 / focal_mm))
    fov_v = 2 * math.degrees(math.atan(sensor_h / 2 / focal_mm))
    out = {"GSD_m": round(gsd, 4), "footprint_m": [round(gsd * w_px, 1), round(gsd * h_px, 1)],
           "sensor_mm": [round(sensor_w, 2), round(sensor_h, 2)],
           "FOV_deg": [round(fov_h, 1), round(fov_v, 1)]}
    if speed_kmh:
        V = speed_kmh / 3.6
        blur = V * exposure_ms / 1000 / gsd
        along = gsd * h_px  # вважаємо коротку сторону кадру вздовж польоту
        fps = V / (along * (1 - overlap))
        out.update({"blur_px": round(blur, 3),
                    "max_exposure_ms_for_0.5px": round(0.5 * gsd / V * 1000, 3),
                    f"min_fps_for_{int(overlap*100)}pct_overlap": round(fps, 2)})
        if blur > 0.5:
            out["warning"] = "Змаз > 0.5 px: скороти експозицію, збільш висоту/GSD або додай підсвітку/чутливість."
    return out


# ---------------------------------------------------------------- товщина вікна

MATERIALS_MR_MPA = {  # типовий модуль розриву (MR), МПа — уточнюй у постачальника
    "nbk7": 40, "fused_silica": 50, "sapphire": 400, "gorilla": 400, "germanium": 72,
    "zns": 100, "znse": 55, "silicon": 125, "caf2": 37, "polycarbonate": 90,
}
MATERIALS_N = {"nbk7": 1.517, "fused_silica": 1.458, "sapphire": 1.77, "gorilla": 1.50,
               "germanium": 4.0, "zns": 2.2, "znse": 2.4, "silicon": 3.42, "caf2": 1.43,
               "polycarbonate": 1.585}


def window_thickness(diameter_mm: float, pressure_kpa: float, material: str, sf: float = 4.0,
                     clamped: bool = False) -> dict:
    mr = MATERIALS_MR_MPA[material]
    k = 0.75 if clamped else 1.125
    r = diameter_mm / 2
    t = math.sqrt(k * (pressure_kpa / 1000) * r ** 2 * sf / mr)  # мм (МПа·мм²/МПа)
    return {"material": material, "MR_MPa": mr, "support": "clamped" if clamped else "simply_supported",
            "SF": sf, "min_thickness_mm": round(t, 2),
            "recommended_mm": round(max(t * 1.2, 1.0), 1),
            "note": "Додай запас на ерозію/удар птаха/град; для сапфіру часто 2–4 мм з умов удару, не тиску."}


# ---------------------------------------------------------------- CLI

def main(argv=None):
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sp = p.add_subparsers(dest="cmd", required=True)

    a = sp.add_parser("aero", help="опір тіла обертання")
    a.add_argument("--speed-kmh", type=float, required=True)
    a.add_argument("--alt-m", type=float, default=0)
    a.add_argument("--length-mm", type=float, required=True)
    a.add_argument("--diameter-mm", type=float, required=True)
    a.add_argument("--base-diameter-mm", type=float, default=0)
    a.add_argument("--boattail-deg", type=float)
    a.add_argument("--interference", type=float, default=1.0,
                   help="1.0 ізольовано; 1.2–1.4 пілон з галтелями; 1.5–2.0 без галтелей/під фюзеляжем")
    a.add_argument("--excrescence", type=float, default=0.10, help="надбавка на вікно/шви/кріплення (частка)")
    a.add_argument("--x-window-mm", type=float, help="відстань вікна від носа — для δ граничного шару")

    w = sp.add_parser("window", help="розмір плоского вікна")
    w.add_argument("--fov-deg", type=float, required=True, help="FOV по горизонталі (або діагоналі)")
    w.add_argument("--fov-v-deg", type=float)
    w.add_argument("--aperture-mm", type=float, required=True)
    w.add_argument("--distance-mm", type=float, required=True)
    w.add_argument("--margin-deg", type=float, default=4)
    w.add_argument("--frame-mm", type=float, default=4)
    w.add_argument("--material", default="sapphire", choices=list(MATERIALS_N))
    w.add_argument("--look-deg", type=float, default=0, help="нахил осі погляду від нормалі вікна")
    w.add_argument("--dome-radius-mm", type=float, default=0)

    g = sp.add_parser("gsd", help="GSD/змаз/fps")
    g.add_argument("--alt-m", type=float, required=True)
    g.add_argument("--focal-mm", type=float, required=True)
    g.add_argument("--pixel-um", type=float, required=True)
    g.add_argument("--res-px", type=int, nargs=2, required=True)
    g.add_argument("--speed-kmh", type=float, default=0)
    g.add_argument("--exposure-ms", type=float, default=1.0)
    g.add_argument("--overlap", type=float, default=0.7)

    t = sp.add_parser("thickness", help="товщина круглого вікна")
    t.add_argument("--diameter-mm", type=float, required=True)
    t.add_argument("--pressure-kpa", type=float, required=True,
                   help="макс. перепад: тиск + q (аеро) — наприклад 30–60 кПа")
    t.add_argument("--material", default="sapphire", choices=list(MATERIALS_MR_MPA))
    t.add_argument("--sf", type=float, default=4.0)
    t.add_argument("--clamped", action="store_true")

    args = p.parse_args(argv)
    if args.cmd == "aero":
        r = body_drag(args.speed_kmh, args.alt_m, args.length_mm, args.diameter_mm,
                      args.base_diameter_mm, args.boattail_deg, args.interference,
                      args.excrescence, x_window_mm=args.x_window_mm)
    elif args.cmd == "window":
        r = window_size(args.fov_deg, args.aperture_mm, args.distance_mm, args.margin_deg,
                        args.frame_mm, MATERIALS_N[args.material], args.look_deg,
                        args.fov_v_deg, args.dome_radius_mm)
    elif args.cmd == "gsd":
        r = gsd_calc(args.alt_m, args.focal_mm, args.pixel_um, tuple(args.res_px),
                     args.speed_kmh, args.exposure_ms, args.overlap)
    else:
        r = window_thickness(args.diameter_mm, args.pressure_kpa, args.material, args.sf, args.clamped)
    json.dump(r, sys.stdout, ensure_ascii=False, indent=2)
    print()


if __name__ == "__main__":
    main()
