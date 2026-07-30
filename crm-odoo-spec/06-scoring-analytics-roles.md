# 06 · Скоринг, аналітика, ролі та права

## 6.1. ICP Tier (нове поле на ICP, Lead, Contact)

Задає пріоритет і ритм дотиків AM у Farming (використовується в A-01, крок 6).

| Тир (`icp_tier`) | Розмір компанії | Потенціал угоди | Пріоритет | Ритм дотиків AM (Farming) |
|------------------|-----------------|-----------------|-----------|---------------------------|
| `a` | 30–100 людей | від £5K / проєкт або ретейнер | Головний двигун. Максимум часу | **21 день** |
| `b` | 10–30 людей | £2–5K | Друга маса. Зростити до A | **42 дні** |
| `c` | 0–10 людей | £0.5–2K | Реактивно і продуктизовано, ≤10% часу | **90 днів**, автоемейл |
| `anti` | будь-який | < £1K разово | Не заходить у воронку | — |

> Ритм дотиків — **дані, не хардкод**: тримати у налаштуванні (напр. `ir.config_parameter`
> або окрема мінімодель `gis.tier.cadence`: `tier`, `farming_days`), щоб бізнес міняв
> без релізу. A-01 читає звідти.

## 6.2. Gate A — стоп-фактори (4 умови, у переписці, стадія Communication)

Реалізується чек-листом `gate_a` ([док. 07](./07-checklist-templates-seed.md)) з
мапінгом у поля `icp_a*`. Будь-яке «Ні» = Lost (A-32). «Не з'ясовано» ≠ «Ні»:
працюємо далі, але в Presale не пускаємо (A-31).

| Поле | Умова | «Ні» → | «Не з'ясовано» → |
|------|-------|--------|------------------|
| `icp_a1_dm_reachable` | Доступний операційний ОПР | Lost | далі, Presale заблоковано |
| `icp_a2_remote_ok` | Віддалено ОК, немає блоку по суверенітету даних | Lost | те саме |
| `icp_a3_deal_potential` | Потенціал ≥£1K + повторюваність | Lost | те саме |
| `icp_a4_standard_stack` | Стандартний стек (AutoCAD/ArcGIS/QGIS/TerraScan/LP360/Revit; LiDAR/CAD/point cloud/vector/ortho) | Lost | те саме |
| `icp_gate_a_passed` | 🔴 compute: усі 4 = «Так» | блокує Communication → Presale | — |

## 6.3. Gate B — умови попиту (3 умови, у живій розмові, стадія Presale)

Реалізується чек-листом `presale_gate_b` (`gate_mode='score'`, threshold=3).

| Поле | Умова | «Ні» означає | Вага |
|------|-------|--------------|------|
| `icp_b1_repeat_volume` | Повторюваний обсяг геоданих | разова робота — не окупаємо вхід | 1 |
| `icp_b2_peak_load` | Змінне/пікове/тендерне навантаження | рівне навантаження — ресурс не потрібен | 1 |
| `icp_b3_no_idle_bench` | Немає простою власної команди | свої інженери без роботи — не візьмуть | 1 |
| `icp_gate_b_score` | 🔴 compute: кількість «Так» | **3/3 → конвертація · 2/3 → Nurturing з датою · ≤1/3 → Lost** | — |

## 6.4. Lifecycle Stage (обчислюване поле, не стадія)

| `lifecycle_stage` | Коли присвоюється | Стадія Odoo |
|-------------------|-------------------|-------------|
| `prospect` | контакт у базі / New | поза CRM / Lead·New |
| `mql` | лід відповів змістовно | Lead·Communication/Nurturing |
| `sql` | presale відбувся, фіт підтверджено | Lead·Presale → конвертація |
| `customer` | перша угода Won | Contact·account_status ≥ active |
| `disqualified` / `dead` | Lead Lost / Opportunity Lost | — |

Compute від `type` + `stage_id` + `won_total` партнера. Для клієнта не опускається
нижче `customer` (правило синхронізації №2).

## 6.5. Forecast Weight за стадіями Opportunity

| Стадія | Вага, % | Для існуючого клієнта, % |
|--------|---------|--------------------------|
| New | 0 | 0 |
| Discovery | 20 | 35 |
| Proposal/Quotation | 40 | 55 |
| Pilot | 60 | 75 |
| Contract | 80 | 90 |
| Project / Won | 100 | 100 |

Реалізація: `probability` на `crm.stage` або окреме поле + автозаповнення при зміні
стадії. «Для існуючого клієнта» — коли `partner.won_total ≥ 1` (вища база довіри).

## 6.6. 🔴 Account Health (нове, замінник product-usage-сигналу)

Compute-поле `account_health` на Contact, перерахунок місячно (cron) + при зміні
залежностей. Бали → колір.

| Фактор | Вага | 🟢 Зелений | 🟡 Жовтий | 🔴 Червоний |
|--------|------|-----------|-----------|-------------|
| Свіжість (днів з останнього проєкту) | 30% | < 90 | 90–180 | > 180 |
| Частота (проєктів за 12 міс) | 25% | ≥ 3 | 1–2 | 0 |
| Тренд виручки рік-до-року | 20% | зростає | стабільно | падає |
| Client Feedback (останній) | 15% | ≥ 8/10 | 6–7 | < 6 або немає |
| Глибина відносин (# контактів з ролями) | 10% | ≥ 3 | 2 | 1 |
| **ПІДСУМОК** | 100% | ≥ 75 балів | 50–74 | < 50 → пріоритетна задача AM (A-27) |

Кожен фактор → 0/50/100 балів × вага; сума → колір за порогами. Формулу винести
в метод `_compute_account_health`, пороги — параметризовані.

## 6.7. Аналітика (дельта до §9.2 v1.1)

> На Community — **Pivot/Graph view + збережені фільтри/групування**, не дашборди
> Enterprise. Кожен рядок нижче = збережена дія (`ir.actions.act_window`) з
> преднастроєним view.

**🟢 Вже в v1.1 (не переробляти):** воронка лідів по стадіях; воронка угод; по
lead-gen (requests/connected/replies/SQL); по sales; воронка по Campaign; conversion
Lead→Opp→Won; Lost analysis; UTM; по ICP.

**🔴 ДОДАТИ:**

| Звіт | Розрізи | Для кого | Частота |
|------|---------|----------|---------|
| **Orphan Rate** — % Contact без власника/статусу/простроченою датою | Власник | CEO + Head of Sales | 🔴 Щодня |
| **% Farming → нова угода за 6 міс** — 🔴 ГОЛОВНИЙ KPI AM | ICP Tier · AM | Head of Sales | Місяць |
| Середній час від закриття проєкту до наступної угоди | ICP Tier · AM | CEO | Квартал |
| Середня кількість угод на Contact | ICP Tier · Unit | CEO | Квартал |
| % Contact з обома юнітами (Production + Software) | ICP Tier | CEO | Квартал |
| Net Revenue Retention — виручка бази рік-до-року | ICP Tier | CEO | Квартал |
| Account Health розподіл (зел/жовт/черв) | AM · ICP Tier | Head of Sales | Місяць |
| Churn Rate · % керованих втрат · % повернутих із Churned | Причина · країна | CEO | Квартал |
| % угод із знятим Client Feedback | Salesperson · AM | Head of Sales | Місяць |
| % Lost, що повернулись у пайплайн за 12 міс | Lost Reason | Head of Sales | Квартал |
| % угод, де ТЗ писали ми (`tz_authored_by_us`) | Unit | CEO | Квартал |
| % угод з Pilot · CVR Pilot → Contract | Unit · ICP Tier | CEO | Квартал |
| Відхилення Actual vs Estimated Man-Hours · маржа проєкту | PM · тип | CEO | Місяць |
| Accept/reply rate по гіпотезі (Campaign) | Campaign · Profile | Head of Sales | Тиждень |
| # заблокованих LinkedIn-профілів і втрачена ємність черги | Profile | Head of Sales | Тиждень |
| # рекомендацій від акаунтів | AM · ICP Tier | CEO | Квартал |

## 6.8. Ролі, security groups, record rules

### Групи (`res.groups`) у категорії «GIS CRM»

| Група | Наслідує | Головні права |
|-------|----------|---------------|
| `group_gis_leadgen` | Sales/User: Own Documents | CRUD своїх Lead; редагування gate-полів A; не бачить фінансів угод |
| `group_gis_salesperson` | Sales/User: All Documents | CRUD Opportunity; конвертація; Quotation |
| `group_gis_presale` | Sales/User: Own | читання угод у Discovery/Pilot; `estimated_man_hours` |
| `group_gis_am` | Sales/User: All | Contact (account_*), Client Feedback, Фаза 3; знімає відгук |
| `group_gis_pm` | Project/User | Opportunity·Project (контрольні точки); НЕ знімає відгук |
| `group_gis_head_sales` | Sales/Manager + усе вище | редагування **шаблонів чек-листів**, порогів знижок, ритму дотиків; звіт «Сироти» |
| `group_gis_head_production` | Project/Manager | маржа, утилізація, ескалації по нормо-годинах |
| `group_gis_finance` | Accounting | інвойси, Contract/Project фінанси |
| `group_gis_ceo` | усе (read) + пороги CEO | ціни вище порога, стратегічні акаунти |

### Record rules (ключові)

- Lead-gen бачить свої Lead (`user_id = uid`) + Nurturing своєї команди.
- Salesperson бачить Opportunity своєї команди.
- AM бачить Contact, де `account_owner_id = uid` (+ read по команді).
- Тільки `group_gis_head_sales` має write на `gis.checklist.template*`.
- Клієнт (`Customer`) захищений від холодних сіквенсів (A-19) — на рівні дії, не rule.

### RACI по ролях (звід)

| Роль | Мета | Володіє стадіями | Головний KPI | Що НЕ робить |
|------|------|------------------|--------------|--------------|
| Marketing | Матеріали під гіпотезу до запуску | Фаза 0 · Campaign Assets | % кампаній з повним набором · трафік · заявки | Не веде переговори/кваліфікацію |
| Lead-gen | Лід до presale | Lead: New→Presale | # presale/міс · CVR accept→presale · accept rate по гіпотезі | Не веде переговори, не називає ціну |
| Salesperson | SQL → контракт | Opportunity: New→Won/Lost | Підписана виручка · Win Rate · Цикл | 🔴 Не веде клієнта після Won — це AM |
| Pre-Sale Engineer | Оцінка, якій можна вірити | Discovery, Pilot (підтримка) | Точність нормо-годин · CVR Discovery→Proposal | Не веде комерцію |
| PM | Проєкт у термін і в маржі | Opportunity·Project | % у термін · відхилення н/г · маржа | 🔴 Не знімає відгук клієнта |
| 🔴 Account Manager | Клієнт не виходить із системи і повертається | Won (відгук) · Contact: Active→Churned | 🔴 % Farming→нова угода за 6 міс · NRR · Orphan Rate=0 по своїх | Не веде переговори по нових — передає Salesperson |
| Head of Sales | Воронка заповнена і чиста, Zero-Orphan, пороги знижок | всі, контроль | Виконання плану % · Orphan Rate<2% · CVR | Не веде власні угоди >20% часу |
| Head of Production | Баланс завантаження, маржа | Project, контроль | Маржа портфеля · утилізація · % у термін | Не спілкується по комерції |
| Finance/1С | Своєчасний інвойс, факт | Contract, Project | % інвойсів до 5 числа · DSO | — |
| CEO | Ціни вище порога, стратегічні акаунти, квартальні розбори | ескалації | Виконання плану групи % | Не вузьке місце в операційці |
