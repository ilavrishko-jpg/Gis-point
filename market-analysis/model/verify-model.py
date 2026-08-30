# -*- coding: utf-8 -*-
import re
from openpyxl import load_workbook
from openpyxl.utils import column_index_from_string as ci, get_column_letter as gl
wb=load_workbook("/home/user/Gis-point/market-analysis/unit-economics-model.xlsx")
C={}
REF=re.compile(r"(?:'([^']+)'!)?\$?([A-Z]{1,2})\$?(\d+)")
RNG=re.compile(r"(?:'([^']+)'!)?\$?([A-Z]{1,2})\$?(\d+):\$?([A-Z]{1,2})\$?(\d+)")
def val(sh,col,row,d=0):
    k=(sh,col,row)
    if k in C: return C[k]
    if d>60: raise RecursionError(k)
    c=wb[sh].cell(row,ci(col)).value
    v=ev(c[1:],sh,d+1) if isinstance(c,str) and c.startswith("=") else (float(c) if isinstance(c,(int,float)) else 0.0)
    C[k]=v; return v
def ev(f,cur,d=0):
    f=RNG.sub(lambda m:"["+",".join(repr(val(m.group(1) or cur,gl(c),r,d)) for c in range(ci(m.group(2)),ci(m.group(4))+1) for r in range(int(m.group(3)),int(m.group(5))+1))+"]",f)
    f=REF.sub(lambda m:repr(val(m.group(1) or cur,m.group(2),int(m.group(3)),d)),f)
    f=re.sub(r"\bSUM\(","__s(",f); f=re.sub(r"\bSUMPRODUCT\(","__sp(",f); f=re.sub(r"\bIF\(","__if(",f)
    f=re.sub(r"(?<![<>=!])=(?!=)","==",f).replace("^","**")
    return float(eval(f,{"__builtins__":{}},{"__s":lambda *a:sum(x for g in a for x in (g if isinstance(g,list) else [g])),
        "__sp":lambda a,b:sum(x*y for x,y in zip(a,b)),"__if":lambda c,a,b:a if c else b}))
def find(sh,frag,col=1):
    for r in range(1,140):
        v=wb[sh].cell(r,col).value
        if isinstance(v,str) and frag.lower() in v.lower(): return r
    raise KeyError(f"{sh}:{frag}")
OK=[0,0]
def chk(l,sh,frag,col,exp,tol=.02,occ=0):
    rows=[r for r in range(1,140) if isinstance(wb[sh].cell(r,1).value,str) and frag.lower() in wb[sh].cell(r,1).value.lower()]
    r=rows[occ]; v=val(sh,col,r)
    ok=abs(v-exp)<=max(abs(exp)*tol,.51); OK[0]+=ok; OK[1]+=1
    print(f"  {'OK  ' if ok else 'FAIL'} {l:<52}книга={v:>12,.1f}  очік.={exp:>12,.1f}".replace(","," "))
U="2.Юніт-економіка"; P="5.P&L 2026-2029"; S="6.Сценарії"; M="3.Ринки"; D="4.Матриця рішення"
print("A. Геодезія — «важка» (B) проти «легкої» (C) структури")
chk("Фіксовані витрати, важка",U,"Фіксовані витрати","B",2_103_000); chk("Фіксовані витрати, легка",U,"Фіксовані витрати","C",1_512_000)
chk("Беззбитковість, днів — важка",U,"Точка беззбитковості, днів","B",167); chk("Беззбитковість, днів — легка",U,"Точка беззбитковості, днів","C",118)
chk("Беззбитковість % util — важка",U,"% utilization","B",0.726); chk("Беззбитковість % util — легка",U,"% utilization","C",0.513)
chk("@62% ВП — важка (ЗБИТОК)",U,"@62%: ВАЛОВИЙ","B",-306_240); chk("@62% ВП — легка",U,"@62%: ВАЛОВИЙ","C",313_280)
chk("@75% ВП — важка",U,"@75%: ВАЛОВИЙ","B",70_500); chk("@75% ВП — легка",U,"@75%: ВАЛОВИЙ","C",696_000)
chk("Різниця структур при 62%",U,"Різниця «легка»","B",619_520)
print("B. Геологія — днів до беззбитковості (>210 = недосяжно)")
for rate,e1,e2,e3 in [(13000,464,360,300),(16000,329,255,213),(20000,237,184,153),(29000,146,113,94)]:
    rows=[r for r in range(1,140) if wb[U].cell(r,1).value==rate]
    r=rows[0]
    for col,exp,nm in (("C",e1,"повна"),("D",e2,"самортизована"),("E",e3,"мінімальна")):
        v=val(U,col,r); ok=abs(v-exp)<=max(exp*.02,.51); OK[0]+=ok; OK[1]+=1
        print(f"  {'OK  ' if ok else 'FAIL'} {f'@{rate} грн/день, {nm}':<52}книга={v:>12,.0f}  очік.={exp:>12,.0f}".replace(","," "))
print("C. IT")
chk("Повна вартість інженера, $/рік",U,"Повна вартість інженера","B",51_528)
chk("Собівартість години, $",U,"Собівартість 1 оплачуваної","B",35.3)
chk("Внутрішній T&M $26: ВП/інженера",U,"Внутрішній UA, T&M","E",-13_594)
chk("Держ/донорські $38: ВП/інженера",U,"Внутрішній UA, держ","E",3_914)
print("D. Підписки")
chk("D1 LTV",U,"D1 SaaS","B",91_000); chk("D1 LTV/CAC",U,"D1 SaaS","C",10.7); chk("D1 payback",U,"D1 SaaS","D",9.3)
chk("D2 LTV/CAC",U,"D2 DaaS","C",13.3); chk("D2 payback",U,"D2 DaaS","D",4.5)
chk("D3 LTV/CAC (провальний)",U,"D3 Агро","C",1.8); chk("D3 payback",U,"D3 Агро","D",30.5)
print("Ринки")
chk("M6 ВП 2029",M,"M6","J",49.6,.03); chk("M1 ВП 2029",M,"M1","J",22.6,.03)
chk("M2 геологія ВП 2029",M,"M2","J",3.6,.05)
chk("РАЗОМ TAM 2026",M,"РАЗОМ","B",13_140); chk("РАЗОМ FTE",M,"РАЗОМ","K",114)
print("Матриця")
chk("M6 бал",D,"M6","G",4.60); chk("M2 геологія бал",D,"M2","G",2.35); chk("M4 агро бал",D,"M4","G",2.50)
print("P&L")
chk("База 2026: виручка",P,"РАЗОМ","C",109.0,.02,0); chk("База 2026: валовий прибуток",P,"РАЗОМ","E",14.7,.02,0)
chk("Ціль 2029: виручка",P,"РАЗОМ","C",260.0,.02,1); chk("Ціль 2029: валовий прибуток",P,"РАЗОМ","E",120.5,.02,1)
chk("Ціль 2029: GM",P,"РАЗОМ","D",0.463,.02,1); chk("Ціль 2029: ВП на 1 FTE",P,"РАЗОМ","F",23_388,.02,1)
chk("База 2026: EBITDA",P,"EBITDA","C",-2.7,.05,0); chk("Ціль 2029: EBITDA",P,"EBITDA","C",50.2,.03,1)
print("Сценарії")
for f,e in [("A. Війна",260),("B. Перемир",481),("C. Ескалац",130),("ОЧІКУВАНЕ",289)]:
    chk(f"{f}: виручка 2029",S,f,"D",e,.02)
print(f"\n{'='*76}\nРЕЗУЛЬТАТ: {OK[0]}/{OK[1]} перевірок пройдено")
