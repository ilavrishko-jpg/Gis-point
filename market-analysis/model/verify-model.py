# -*- coding: utf-8 -*-
import re
from openpyxl import load_workbook
from openpyxl.utils import column_index_from_string as ci, get_column_letter as gl
wb=load_workbook("/home/user/Gis-point/market-analysis/unit-economics-model.xlsx")
CACHE={}
REF=re.compile(r"(?:'([^']+)'!)?\$?([A-Z]{1,2})\$?(\d+)")
RNG=re.compile(r"(?:'([^']+)'!)?\$?([A-Z]{1,2})\$?(\d+):\$?([A-Z]{1,2})\$?(\d+)")
def val(sheet,col,row,depth=0):
    k=(sheet,col,row)
    if k in CACHE: return CACHE[k]
    if depth>60: raise RecursionError(k)
    c=wb[sheet].cell(row,ci(col)).value
    v=evaluate(c[1:],sheet,depth+1) if isinstance(c,str) and c.startswith("=") else (float(c) if isinstance(c,(int,float)) else 0.0)
    CACHE[k]=v; return v
def evaluate(f,cur,depth=0):
    f=RNG.sub(lambda m:"["+",".join(repr(val(m.group(1) or cur,gl(c),r,depth))
        for c in range(ci(m.group(2)),ci(m.group(4))+1) for r in range(int(m.group(3)),int(m.group(5))+1))+"]",f)
    f=REF.sub(lambda m:repr(val(m.group(1) or cur,m.group(2),int(m.group(3)),depth)),f)
    f=re.sub(r"\bSUM\(","__sum(",f); f=re.sub(r"\bSUMPRODUCT\(","__sp(",f); f=re.sub(r"\bIF\(","__if(",f)
    f=re.sub(r"(?<![<>=!])=(?!=)","==",f).replace("^","**")
    env={"__sum":lambda *a:sum(x for g in a for x in (g if isinstance(g,list) else [g])),
         "__sp":lambda a,b:sum(x*y for x,y in zip(a,b)),"__if":lambda c,a,b:a if c else b}
    return float(eval(f,{"__builtins__":{}},env))
def find(sheet,frag,col=1):
    for r in range(1,120):
        v=wb[sheet].cell(r,col).value
        if isinstance(v,str) and frag.lower() in v.lower(): return r
    raise KeyError(f"{sheet}: {frag!r}")
OK=[0,0]
def chk(lbl,sheet,frag,col,expected,tol=0.02):
    r=find(sheet,frag); v=val(sheet,col,r)
    ok=abs(v-expected)<=max(abs(expected)*tol,0.51); OK[0]+=ok; OK[1]+=1
    print(f"  {'OK  ' if ok else 'FAIL'} {lbl:<50} книга={v:>13,.1f}  очік.={expected:>13,.1f}".replace(","," "))
U="2.Юніт-економіка"; P="5.P&L 2026-2029"; S="6.Сценарії"; M="3.Ринки"; D="4.Матриця рішення"
print("A. Геодезична бригада (виручка C, витрати D, ВП E, GM F, ВП/FTE G)")
chk("Поточний стан: виручка",U,"Поточний стан: util 62","C",2_566_800)
chk("Поточний стан: валовий прибуток",U,"Поточний стан: util 62","E",264_160)
chk("Поточний стан: GM",U,"Поточний стан: util 62","F",0.1029)
chk("Ціль-2 (util 75% + ціна 22к): ВП",U,"Ціль-2: util 75%","E",1_450_500)
chk("Ціль-2: ВП на 1 FTE, $",U,"Ціль-2: util 75%","G",13_431)
chk("Стрес util 50%: ВП",U,"Стрес: util 50%","E",-424_000)
chk("Точка беззбитковості, днів",U,"Точка беззбитковості","B",126.7)
print("B. Бурова бригада")
chk("Поточний стан: ВП (збиток)",U,"Поточний стан: util 55","E",-316_020)
chk("Ціль-1 util 70%: ВП",U,"Ціль-1: util 70%","E",413_520)
chk("Ціль-2 util 70% + 38к: ВП",U,"Ціль-2: util 70%","E",1_189_680)
chk("Стрес util 45%: ВП",U,"Стрес: util 45%","E",-968_700)
print("C. IT-інженер")
chk("Повна вартість інженера, $/рік",U,"Повна вартість інженера","B",51_528)
chk("Собівартість оплачуваної години, $",U,"Собівартість 1 оплачуваної","B",35.3)
chk("Внутрішній UA $26/год: ВП/інженера",U,"Внутрішній UA, T&M","E",-13_594)
chk("Внутрішній UA $26/год: GM",U,"Внутрішній UA, T&M","D",-0.36)
chk("Експорт EU $55/год: ВП/інженера",U,"Експорт EU","E",28_717)
chk("Експорт US $68/год: ВП/інженера",U,"Експорт US","E",47_684)
print("D. Підписки")
chk("D1 SaaS: LTV",U,"D1 Вертикальний SaaS","B",91_000)
chk("D1 SaaS: LTV/CAC",U,"D1 Вертикальний SaaS","C",10.7)
chk("D1 SaaS: payback, міс",U,"D1 Вертикальний SaaS","D",9.3)
chk("D2 DaaS: LTV/CAC",U,"D2 DaaS","C",13.3)
chk("D2 DaaS: payback, міс",U,"D2 DaaS","D",4.5)
chk("D3 Агро: LTV/CAC (провальний)",U,"D3 Агро","C",1.8)
chk("D3 Агро: payback, міс",U,"D3 Агро","D",30.5)
print("Ринки")
chk("M6 Мережі: ВП 2029, млн грн",M,"M6","J",52.0,0.03)
chk("M10 Експорт: ВП 2029, млн грн",M,"M10","J",84.7,0.03)
chk("РАЗОМ TAM 2026, млн грн",M,"РАЗОМ","B",27_540)
chk("РАЗОМ FTE щоб узяти весь SOM",M,"РАЗОМ","K",171)
print("Матриця рішення")
chk("M6 зважений бал",D,"M6","G",4.60)
chk("M10 зважений бал",D,"M10","G",3.75)
chk("M4 агро зважений бал",D,"M4","G",2.50)
print("P&L")
for lbl,frag,col,exp in [("База 2026: виручка, млн грн","РАЗОМ","C",113.0),
    ("База 2026: валовий прибуток, млн","РАЗОМ","E",15.2),("База 2026: ВП/FTE, $","РАЗОМ","F",6_773)]:
    chk(lbl,P,frag,col,exp)
r1=find(P,"РАЗОМ"); r2=[r for r in range(r1+1,60) if isinstance(wb[P].cell(r,1).value,str) and "РАЗОМ" in wb[P].cell(r,1).value][0]
for lbl,col,exp in [("Ціль 2029: виручка, млн грн","C",344.0),("Ціль 2029: валовий прибуток, млн","E",149.0),
                    ("Ціль 2029: GM","D",0.433),("Ціль 2029: ВП на 1 FTE, $","F",28_940)]:
    v=val(P,col,r2); ok=abs(v-exp)<=max(abs(exp)*0.02,0.51); OK[0]+=ok; OK[1]+=1
    print(f"  {'OK  ' if ok else 'FAIL'} {lbl:<50} книга={v:>13,.1f}  очік.={exp:>13,.1f}".replace(","," "))
eb=[r for r in range(1,60) if isinstance(wb[P].cell(r,1).value,str) and "EBITDA" in str(wb[P].cell(r,1).value)]
for i,(lbl,exp) in enumerate([("База 2026: EBITDA, млн грн",-2.8),("Ціль 2029: EBITDA, млн грн",59.6)]):
    v=val(P,"C",eb[i]); ok=abs(v-exp)<=max(abs(exp)*0.03,0.51); OK[0]+=ok; OK[1]+=1
    print(f"  {'OK  ' if ok else 'FAIL'} {lbl:<50} книга={v:>13,.1f}  очік.={exp:>13,.1f}".replace(","," "))
print("Сценарії")
for frag,exp in [("A. Війна",344),("B. Перемир",549),("C. Ескалац",227),("ОЧІКУВАНЕ",372)]:
    chk(f"{frag}: виручка 2029, млн грн",S,frag,"E",exp,0.02)
print(f"\n{'='*72}\nРЕЗУЛЬТАТ: {OK[0]}/{OK[1]} перевірок пройдено")
