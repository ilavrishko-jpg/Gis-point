#!/usr/bin/env python3
"""Зводить вивантаження MSPO в один JSON для Стенд-радара.

Робить три речі, яких у вихідних файлах немає:
  * розбирає колонку «Коментар» на Гачок / Сегмент / Пріоритет / Група;
  * відновлює назву компанії з домену пошти там, де клітинка порожня
    (тільки якщо цей домен уже зустрічається в базі з назвою);
  * зводить «Дата зустрічі» та «Час зустрічі» в одне поле з ключем сортування.
"""
import openpyxl, json, re, sys, datetime, pathlib

SRC = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else ".")
OUT = pathlib.Path(__file__).parent / "base.json"

COLUMNS = [
    "Статус", "Компанія", "Стенд", "Зустріч", "Ім'я", "Посада", "Країна",
    "Розмір компанії", "Гачок", "Сегмент", "Пріоритет", "Група", "Збагачення",
    "Email", "LinkedIn URL", "Канал", "Дата останнього фоловапу",
    "Повідомлення (останнє)", "Компанія визначена", "Ресурс",
]

MONTHS = {1:"січ",2:"лют",3:"бер",4:"кві",5:"тра",6:"чер",7:"лип",8:"сер",9:"вер",10:"жов",11:"лис",12:"гру"}

def cell(v):
    if v is None: return ""
    if isinstance(v, datetime.datetime):
        return v.strftime("%d.%m.%Y") if (v.hour or v.minute) == 0 else v.strftime("%d.%m.%Y %H:%M")
    if isinstance(v, datetime.date): return v.strftime("%d.%m.%Y")
    return str(v).strip()

def read(path):
    wb = openpyxl.load_workbook(path, data_only=True)
    ws = wb[wb.sheetnames[0]]
    rows = list(ws.iter_rows(values_only=True))
    hdr = [cell(h) for h in rows[0]]
    out = []
    for r in rows[1:]:
        if not any(c not in (None, "") for c in r): continue
        out.append({hdr[i]: cell(r[i]) for i in range(len(hdr))})
    return out

def split_comment(c):
    """«Гачок: X | Сегмент: Y | Пріоритет: A, Group: P1» -> чотири поля."""
    got = {"Гачок": "", "Сегмент": "", "Пріоритет": "", "Група": ""}
    if not c: return got
    m = re.search(r"Гачок:\s*(.*?)(?=\s*\|\s*Сегмент:|\s*\|\s*Пріоритет:|$)", c, re.S)
    if m: got["Гачок"] = m.group(1).strip()
    m = re.search(r"Сегмент:\s*(.*?)(?=\s*\|\s*Пріоритет:|\s*\|\s*Гачок:|$)", c, re.S)
    if m: got["Сегмент"] = m.group(1).strip()
    m = re.search(r"Пріоритет:\s*([^,|]+)", c)
    if m: got["Пріоритет"] = m.group(1).strip()
    m = re.search(r"Group:\s*([^,|]+)", c)
    if m: got["Група"] = m.group(1).strip()
    if not any(got.values()): got["Гачок"] = c.strip()
    return got

def norm_meeting(v):
    """-> (текст для показу, ключ сортування)."""
    if not v: return "", "9"
    s = str(v).strip()
    t = re.search(r"(\d{1,2}):(\d{2})", s)
    d = re.search(r"(\d{1,2})[.\-/](\d{1,2})", s)
    day = ""
    if d:
        dd, mm = int(d.group(1)), int(d.group(2))
        if mm in MONTHS: day = "%d %s" % (dd, MONTHS[mm])
    time = "%02d:%s" % (int(t.group(1)), t.group(2)) if t else ""
    label = (day + (", " + time if time else "")) if day else s
    return label, ("%s %s" % (d.group(2).zfill(2) + d.group(1).zfill(2) if d else "99", time or "99:99"))

rows, sources = [], []

# ---- ІТ-юніт ----
it = read(SRC / "3e2ef633-MSPO_IT_unit.xlsx")
dom2comp = {}
for r in it:
    e, c = r.get("Email", ""), r.get("Компанія", "")
    if e and c and "@" in e:
        dom2comp.setdefault(e.split("@")[1].lower(), {})[c] = dom2comp.get(e.split("@")[1].lower(), {}).get(c, 0) + 1

derived_known = derived_domain = 0
for r in it:
    out = {c: "" for c in COLUMNS}
    out.update(split_comment(r.get("Коментар", "")))
    company, how = r.get("Компанія", ""), ""
    if not company and r.get("Email") and "@" in r["Email"]:
        dom = r["Email"].split("@")[1].lower()
        if dom in dom2comp:
            company = max(dom2comp[dom].items(), key=lambda kv: kv[1])[0]
            how = "з домену пошти"; derived_known += 1
        else:
            company = dom; how = "домен пошти (назви немає в базі)"; derived_domain += 1
    meet, mkey = norm_meeting(r.get("Дата зустрічі", ""))
    out.update({
        "Статус": r.get("Статус", "") or "Без статусу",
        "Компанія": company or (r.get("Ім'я", "") + " (без компанії)"),
        "Стенд": r.get("Стенд", ""), "Зустріч": meet,
        "Ім'я": r.get("Ім'я", ""), "Посада": r.get("Посада", ""),
        "Країна": r.get("Країна", ""), "Розмір компанії": r.get("Розмір компанії", ""),
        "Збагачення": r.get("Збагачення", ""), "Email": r.get("Email", ""),
        "LinkedIn URL": r.get("LinkedIn URL", ""), "Канал": "",
        "Дата останнього фоловапу": r.get("Дата останнього фоловапу", ""),
        "Повідомлення (останнє)": r.get("Повідомлення (останнє)", ""),
        "Компанія визначена": how, "Ресурс": r.get("Ресурс", ""),
    })
    out["__source"] = "ІТ-аутсорсинг"; out["__mkey"] = mkey
    rows.append(out)
sources.append(("ІТ-аутсорсинг", len(it)))

# ---- FlyBy ----
fb = read(SRC / "82a92221-MSPO_Flyby.xlsx")
for r in fb:
    meet, mkey = norm_meeting(r.get("Час зустрічі", ""))
    out = {c: "" for c in COLUMNS}
    out.update({
        "Статус": r.get("Статус", "") or "Без статусу",
        "Компанія": r.get("Компанія", ""), "Стенд": r.get("Стенд", ""),
        "Зустріч": meet, "Ім'я": r.get("Контакт", ""), "Посада": r.get("Посада", ""),
        "Збагачення": r.get("Збагачення", ""), "Канал": r.get("Канал", ""),
        "Повідомлення (останнє)": r.get("Останнє повідомлення клієнта", ""),
        "Ресурс": "MSPO 2026 (FlyBy)",
    })
    out["__source"] = "FlyBy"; out["__mkey"] = mkey
    rows.append(out)
sources.append(("FlyBy", len(fb)))

payload = {
    "version": 20260907001,
    "label": "MSPO 2026",
    "columns": COLUMNS,
    "map": {
        "company": "Компанія", "stand": "Стенд", "country": "Країна",
        "person": "Ім'я", "role": "Посада", "email": "Email",
        "website": "LinkedIn URL", "tier": "Пріоритет", "segment": "Сегмент",
        "offer": "Гачок", "note": "Збагачення",
        "pstatus": "Статус", "meet": "Зустріч",
    },
    "rows": rows,
}
OUT.write_text(json.dumps(payload, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")

print("рядків:", len(rows), "| джерела:", sources)
print("компанію відновлено з відомого домену:", derived_known, "| показано домен:", derived_domain)
print("з зустріччю:", sum(1 for r in rows if r["Зустріч"]))
print("файл:", OUT, OUT.stat().st_size, "байт")
