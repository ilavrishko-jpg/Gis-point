# 02 · Карта воронок як канон стадій

Цей документ — машинно-точне відтворення вкладки **«Карта воронок»**. Він є
**єдиним джерелом істини** про стадії, власників, гейти та переходи. Кожна стадія
має код (`L1…C4`), який використовується для звірки в решті ТЗ.

## 2.1. Наскрізний процес — 38 кроків (довідково)

Легенда: 🔴 = немає в старому ТЗ (додаємо) · 🟡 = є, але треба уточнити · 🟢 = є і працює.

| Фаза | # | Крок | Хто | Де живе | Що фіксується |
|------|---|------|-----|---------|---------------|
| 0 Попит | 1 | Вибір ICP і тиру під квартал | Head of Sales | ICP (Odoo) | № ICP, критерії, 🔴 Tier, 🔴 Unit |
| 0 | 2 | Формування гіпотези (кампанії) | Head of Sales + Marketing | Campaign | Назва, тип, 🔴 очікуваний результат, 🔴 дата ревізії |
| 0 | 3 | 🔴 Підготовка матеріалів під гіпотезу | Marketing | 🔴 Campaign Assets | Пост, кейс, сторінка, лід-магніт, профіль — посилання + готовність |
| 0 | 4 | Збір бази під гіпотезу | Lead-gen | Sales Nav/Apollo | # контактів, розподіл по тиру і GEO |
| 0 | 5 | Збагачення контактів | Lead-gen | Snov.io → Clay | Email, розмір, індустрія, країна |
| 0 | 6 | 🔴 Розподіл бази по LinkedIn-профілях з лімітами | Lead-gen | Profile | 🔴 ліміти, черга, статус профілю |
| 0 | 7 | Запуск ланцюга в LinkedIn Helper | Lead-gen | LinkedIn Helper | Requests sent → LeadGenStats |
| 0 | 8 | Інвайт надіслано — у CRM НЕ потрапляє | — | LinkedIn Helper | Лічильники |
| 0 | 9 | 🔴 Інвайт не прийнято 30 днів → пул рециклу | Lead-gen | список | Контакт → інша гіпотеза, не згорає |
| 1 Lead | 10 | Інвайт ПРИЙНЯТО → webhook → Lead у New | Авто | crm.lead | Name, Position, Company, Country, LinkedIn URL/ID, Profile, Lead-gen, Campaign, Resource |
| 1 | 11 | Лід-ген дозаповнює картку | Lead-gen | crm.lead | Resource, Industry, Position, Company Size, Decision-Maker Role, 🔴 ICP Tier |
| 1 | 12 | Sequence у LinkedIn Helper | LinkedIn Helper | LinkedIn Helper | Не трекається на MVP |
| 1 | 13 | Клієнт відповів → Communication | Lead-gen | crm.lead | Status: Hot/Interested/Booking/Negotiation/Not now |
| 1 | 14 | 🔴 Lifecycle = MQL | Авто | crm.lead | Обчислюване поле |
| 1 | 15 | 🔴 ГЕЙТ A — 4 стоп-фактори в переписці | Lead-gen | crm.lead | 4 поля `icp_a*` = Так/Ні/Не з'ясовано |
| 1 | 16 | 🔴 Немає відповіді / «не зараз» → Nurturing | Lead-gen | crm.lead | Стадія Nurturing + обов'язкова Next Follow-up Date |
| 1 | 17 | Зрощення: контентні дотики | Lead-gen | LinkedIn+Email | Last/Next Follow-up Date, «no push» для Colleague |
| 1 | 18 | Домовились на дзвінок → Presale | Lead-gen | crm.lead | Presale Date, ICP, Trigger |
| 1 | 19 | Presale · 🔴 ГЕЙТ B — 3 умови попиту | Salesperson + Pre-Sale | crm.lead → Opportunity | 3 поля `icp_b*` + біль, ОПР, розмір команди, аутсорс, терміновість |
| 1 | 20 | 🔴 Lifecycle = SQL | Авто | crm.lead | Обчислюване поле |
| 1 | 21 | Конвертація: Lead → Contact + Opportunity | Salesperson | Odoo | Lead → converted; 🔴 якщо домен існує — чіпляємо до наявного Contact |
| 2 Opp | 22 | New → Discovery: запит і отримання ТЗ | Salesperson | Opportunity | ТЗ отримано (Y/N + файл), 🔴 «ТЗ писали ми» |
| 2 | 23 | Proposal / Quotation | Salesperson | Opportunity + Sales | Quotation, Expected Revenue, 🔴 нормо-години |
| 2 | 24 | 🔴 Підтвердження від ОПР перед контрактом | Salesperson | Opportunity | Y/N + дата + чи бачив пропозицію |
| 2 | 25 | Pilot (опційно) | Salesperson + PM | Opportunity | Pilot Start/End/Result |
| 2 | 26 | Contract | Salesperson + Finance | Opportunity + SO | Contract Signed Date, сума, терміни |
| 2 | 27 | Project — виконання | PM | Opportunity + Plane/1С | Старт, PM, нормо-години, рапорт, інвойс |
| 2 | 28 | 🔴 Перед закриттям: відгук клієнта + план далі | **Account Manager (НЕ PM)** | Contact + Opportunity | 🔴 Client Feedback (1–10 + текст), 🔴 Next Potential Project, згода на кейс |
| 2 | 29 | Won або Lost | Salesperson | Opportunity | Lost Reason + Lost Stage, 🔴 дата повторного заходу |
| 3 Акаунт | 30 | 🔴 Перерахунок стану акаунта | Авто | Contact | `open_opportunities`, `active_projects`, `won_total`, `last_project_end_date` |
| 3 | 31 | 🔴 Є ще відкриті угоди → Contact лишається Active | Авто | Contact | — |
| 3 | 32 | 🔴 **Відкритих 0, виграна ≥1 → Farming** | Авто | Contact | 🔴 Account Owner, Next Action Date за тиром (A+21/B+42/C+90), задача AM 3 роб. дні |
| 3 | 33 | 🔴 Фармінг: розмова «план розвитку» | Account Manager | Contact | Reason for No Deals, Next Potential Project, запит рекомендації |
| 3 | 34 | 🔴 Сигнал → створюється НОВИЙ Lead | AM → Salesperson | crm.lead | Lead Source = Up-sell/Cross-sell, одразу Communication/Presale |
| 3 | 35 | 🔴 180 днів без проєкту → Win-back | Авто | Contact | Причина простою, win-back спроба + дата |
| 3 | 36 | 🔴 365 днів → Churned + пост-мортем | Account Manager | Contact | Churn Reason, керована/неминуча, дата +180 днів |
| 3 | 37 | 🔴 Через 180 днів з Churned → назад у Farming | Авто | Contact | Нова задача AM. КОЛО ЗАМИКАЄТЬСЯ |
| 3 | 38 | 🔴 Zero-Orphan: щоденна перевірка 07:00 | Система → Head of Sales | Odoo | Порушники → звіт «Сироти», SLA 24 год |

## 2.2. Атрибути стадій (головна таблиця)

Нижче — по кожній стадії 15 атрибутів з «Карти воронок». Розробник читає рядки
**СУТНІСТЬ ODOO**, **GATE CRITERIA**, **AUTOMATIONS & SLA**, **EXIT PATHS**,
**HOW/чек-лист** — це прямі вимоги до реалізації. Решта (WHY/JOB PURPOSE/METRICS)
— контекст для розуміння.

### ФАЗА 0 · ПОПИТ (поза Odoo, крім Campaign)

| Атрибут | 0.1 Гіпотеза + контент | 0.2 База + збагачення | 0.3 Кампанія в роботі |
|---------|------------------------|-----------------------|-----------------------|
| Сутність Odoo | `crm.campaign` (Draft→Ready→Active) | поза Odoo (Sales Nav/Apollo) | поза Odoo (LinkedIn Helper) + `LeadGenStats` |
| Хто | Head of Sales + Marketing | Lead-gen | Lead-gen |
| Lifecycle | — | — | Prospect |
| **Gate criteria (вхід)** | Campaign Name, Type, Опис; 🔴 Очікуваний результат (# зустрічей); 🔴 Дата ревізії; 🔴 **Campaign Assets — мінімальний набір готовий (checkbox)**; 🔴 Sequence написаний | Country ∈ {USA, CA, DACH, UK}; Company Size; Industry; ICP Tier; 🔴 Profile призначено з урахуванням ліміту | 🔴 Ліміт профілю не перевищено; Campaign = Active |
| Scoring | ICP Tier A/B/C | ICP Tier (A,B — у роботу; C — реактивно) | — |
| Automations & SLA | 🔴 **A-15**: Campaign не переводиться в Active, поки Campaign Assets не заповнені | Дедуп по домену і LinkedIn ID ДО завантаження; якщо компанія = Customer → маршрут на AM, не в холодний аутріч | 🔴 **A-30**: профіль заблоковано → задача Lead-gen + перерозподіл черги; 🔴 **A-01(recycle)**: інвайт без accept 30 днів → у пул рециклу |
| Exit paths | → 0.2 | → 0.3 | → L1 New (accept) · → пул рециклу (немає accept) |
| Чек-лист | Campaign Brief (P1) | Research Guide (P1) | SDR Playbook (🔴 P0) |

### ФАЗА 1 · CRM LEAD (`crm.lead type=lead`)

| Атрибут | L1 New | L2 Communication | L3 🔴 Nurturing | L4 Presale | L5 Lost/Disqualified |
|---------|--------|------------------|-----------------|------------|----------------------|
| Стадія Odoo | `crm.lead · New` | `· Communication` | `· Nurturing` | `· Presale` | `· Lost (lost-mark)` |
| Хто | Lead-gen | Lead-gen | Lead-gen (авто-цикл) | Lead-gen → Salesperson + Pre-Sale | Lead-gen |
| Lifecycle | Prospect | 🔴 MQL | 🔴 MQL | 🔴 SQL | Disqualified |
| **Gate criteria (вхід)** | [v1.1 §4.3] Resource, Industry, Position, Company Size, Decision-Maker Role; 🔴 **ICP Tier** | [v1.1] усе з L1 + ICP, Trigger; 🔴 **Lifecycle=MQL (авто)** | 🔴 **Reason for Pause ≠ порожньо**; 🔴 **Next Follow-up Date ≠ порожньо і В МАЙБУТНЬОМУ** (блок збереження); Owner ≠ порожньо | [v1.1] усе + Priority/Score, Status; 🔴 **біль клієнта (текст), сервіс/роль яку заміщаємо, чи був ОПР на дзвінку** | [v1.1] Lost Reason; 🔴 **коментар обов'язковий** |
| Scoring | ICP Tier (з бази) | 🔴 Lifecycle=MQL; 🔴 **ГЕЙТ A** (4 умови в переписці): будь-яке «Ні» = Lost | — | 🔴 Lifecycle=SQL; 🔴 **ГЕЙТ B** (3 умови в розмові): 3/3→конверсія, 2/3→Nurturing, ≤1/3→Lost; Priority 1–4⭐ | % дискваліфікації |
| Automations & SLA | [v1.1] Дедуп LinkedIn ID; 🔴 **A-20**: New >3 днів без активності → задача | 🔴 **A-13/Status=Not now** → авто в L3 Nurturing з датою; 🔴 14 днів без активності → задача + видимість Head of Sales | 🔴 **A-04**: блок збереження без Next Follow-up Date; 🔴 **A-13**: дата настала → авто-задача; [v1.1] «no push» для Colleague | [v1.1] конвертація створює Contact+Opportunity; 🔴 **A-16**: якщо домен існує — Opportunity до наявного Contact; 🔴 no-show → авто в L3 | 🔴 **A-32**: авто-виключення з сіквенсів; 🔴 блок повторного додавання того ж LinkedIn ID на 12 міс |
| Exit paths | → L2 · → L3 · → L5 | → L4 · → L3 · → L5 | → L2 (реактивація) · → L4 (сам написав) · → L5 | → O1 New (конвертація) · → L3 · → L5 | → Архів (перегляд через 12 міс) |
| Чек-лист (гейт) | SDR: «обробка нового ліда» | **Чек-лист ГЕЙТ A** (розділ A) | Контент-план нертюру | **Чек-лист Presale + ГЕЙТ B** (розділ B) | Фіксований список причин Lost (розділ F) |

### ФАЗА 2 · OPPORTUNITY (`crm.lead type=opportunity`)

| Атрибут | O1 New | O2 Discovery | O3 Pilot | O4 Proposal/Quotation | O5 Contract | O6 Project | O7 Won | O8 Lost |
|---------|--------|-------------|----------|----------------------|-------------|-----------|--------|---------|
| Стадія Odoo | `New` | `Discovery` | `Pilot` | `Proposal/Quotation` | `Contract` | `Project` | `Won` | `Lost` |
| Хто | Salesperson | Salesperson + Pre-Sale | Salesperson + PM | Salesperson | Salesperson + Finance + Law | Head of Delivery + PM | Salesperson → AM | Salesperson |
| Lifecycle | Opportunity | Opportunity | Opportunity | Opportunity | Opportunity | Customer | Customer | Dead opportunity |
| Account Status | Active | Active | Active | Active | Active | Active | Active → перераховується | Farming або Nurture |
| **Gate criteria (вхід)** | [v1.1] поля Block A–E з ліда; 🔴 **Unit**; 🔴 Close Date заборонено раніше O2 | 🔴 **ТЗ отримано (Y/N+файл); ТЗ писали ми (Y/N); Estimated Man-Hours/Deal size; розмір команди клієнта; чи брав аутсорс; терміновість; Close Date** | [v1.1] Pilot Start/End/Result; 🔴 **критерії успіху письмово; платний/безкоштовний (+сума)** | [v1.1] Quotation, Expected Revenue; 🔴 **Offer Type; Unit (GIS/BIM/IT); дата очікуваної відповіді** | 🔴 **ГЕЙТ: ОПР погодив пропозицію (Y/N+дата)**; [v1.1] Contract Signed Date; 🔴 умови оплати; дата старту/завершення; знижка вище порога → погодження Head of Sales | 🔴 **PM призначено; Account Manager призначено; Handover checklist=100%; нормо-години план; 1С сповіщено**; проєкт → Plane | 🔴 **Client Feedback (1–10+текст) — БЕЗ НЬОГО НЕ ЗАКРИВАЄТЬСЯ; Next Potential Project; Next Action Date на Contact ≠ порожньо; фінальна сума, маржа** | [v1.1] Lost Reason + Lost Stage; 🔴 **коментар ≥50 символів; дата повторного заходу ≠ порожньо** |
| Scoring (forecast) | 0% | 20% (35% для існуючого) | 60% (75%) | 40% (55%) | 80% (90%) | 🔴 Project Health зел/жовт/черв | 100% | N/A |
| Automations & SLA | 🔴 **A-01(recycle)/A-19**; 🔴 задача Salesperson «Прийняти угоду» 24 год | [v1.1 **A-21**] 7 днів без ТЗ → задача; 🔴 14 днів → ескалація | [v1.1] Lost Stage=Pilot; 🔴 пілот завершено → задача «Презентувати результати» 5 днів | 🔴 **A-22**: 7д нагадування · 14д автофоловап · 21д → Nurturing L3, угоду закрити «пропав клієнт» | 🔴 **A-06/A-23**: блок переходу без підтвердження ОПР; задача «Підписати» 3 дні → ескалація; **A-24** знижка вище порога | 🔴 **A-25**: 1 число → нагадування PM (рапорт) + Finance (інвойс до 5); 🔴 **A-26**: відхилення нормо-годин >20% → червоний + ескалація | 🔴 **A-07**: блок Won без Client Feedback/Next Potential Project; 🔴 **A-01** перерахунок Contact; 🔴 **A-29** feedback≥8 → задача «рекомендація/кейс» | 🔴 **A-08**: блок Lost без Lost Reason/коментаря/Re-engagement Date |
| Exit paths | → O2 · → O8 | → O3/O4 · → O8 | → O4/O5 · → O8 (Lost Stage=Pilot) · → L3 | → O3 · → O5 · → O8 · → L3 | → O6 · → O8 | → O7 · → O8 | → C1 Active (є ще угоди) · → C2 Farming (більше немає) | → C2 Farming (був клієнт) · → L3 Nurturing (не був) |
| Чек-лист (гейт) | Гайд Salesperson | **Чек-лист ТЗ** (розділ C) | Pilot Playbook | Прайс/знижки | Шаблони договорів | PM Handbook (handover) | **Скрипт зняття відгуку** (розділ E) | Пост-мортем програшу (розділ G) |

> **Порядок стадій у канбані Opportunity** (за «Картою воронок»): New → **Discovery
> → Pilot → Proposal** (у джерелі Pilot стоїть перед Proposal як важіль на більшу
> угоду; forecast weight Pilot=60% > Proposal=40%). Exit paths підтверджують обидва
> напрями: Discovery → Pilot **або** одразу → Proposal; Proposal → Pilot **або** →
> Contract. Реалізувати як вільні переходи між стадіями (Odoo дозволяє), не як
> жорсткий лінійний ланцюг.

### ФАЗА 3 · 🔴 АКАУНТ (`res.partner`, поле `account_status`)

| Атрибут | C1 Active | C2 🔴 Farming | C3 Win-back | C4 Churned |
|---------|-----------|---------------|-------------|------------|
| Сутність | `res.partner · account_status='active'` | `='farming'` | `='winback'` | `='churned'` |
| Хто | Account Manager | Account Manager | Account Manager | Account Manager |
| Lifecycle | Customer | Customer | Customer | Churned |
| **Gate criteria** | 🔴 ≥1 відкрита Opportunity АБО активний проєкт; 🔴 **Account Owner ≠ порожньо; Next Action Date ≠ порожньо і в майбутньому** | 🔴 **Next Action Date ≠ порожньо і В МАЙБУТНЬОМУ (жорстка валідація); Account Owner ≠ порожньо; Reason for No Deals; Next Potential Project** | 🔴 **Reason for Dormancy; Win-back спроба (Y/N+дата); Next Action Date ≠ порожньо** | 🔴 **Churn Reason + коментар; керована/неминуча; дата повторного заходу ≠ порожньо** |
| Scoring | 🔴 Account Health зел/жовт/черв | 🔴 Account Health (червоний = ризик → пріоритетний дотик) | 🔴 Account Health = червоний за замовчуванням | — |
| Automations & SLA | 🔴 **A-27**: Health→червоний → пріоритетна задача AM; 🔴 **A-28**: email відбивається → «знайти нову контактну особу», акаунт НЕ втрачається | 🔴 **A-03**: блок збереження без Next Action Date; 🔴 **A-12**: дата настала → задача AM; 🔴 **A-09**: 180 днів без угоди → C3; підписка на AM-розсилку, НЕ холодний сіквенс | 🔴 **A-09**: 180 днів без угоди → авто-вхід + задача AM; квартальна win-back кампанія; 🔴 **A-10**: 365 днів без результату → C4 | 🔴 **A-11**: через 180 днів Contact АВТОМАТИЧНО → C2 Farming з новою задачею. Жоден акаунт не лишається в Churned назавжди |
| Exit paths | → C2 Farming (робота закінчилась) · → новий Lead (сигнал) | → новий Lead (сигнал) · → C1 Active · → C3 Win-back (180 днів) | → новий Lead (повернувся) · → C1 · → C4 Churned (365 днів) | 🔁 → C2 Farming (через 180 днів — КОЛО ЗАМИКАЄТЬСЯ) |
| Чек-лист (гейт) | Account Management Handbook | **Скрипт «план розвитку»** (розділ D) — 🔴 ядро Фази 3 | Win-back Playbook | Пост-мортем клієнта (розділ G) |

## 2.3. Обов'язкова вимога замовника до чек-листів (дослівно)

> «Чек-листи формуємо поле **обов'язкове**, відповідно кожної стадії та потрібної
> взаємодії, менеджер все дізнавався що потрібно в тій стадії і згідно попередньо
> напрацьованих шаблонів чек-листів, але вони будуть змінюватися — тому тут має
> бути **гнучкість**.»
>
> З рядка HOW «Карти воронок» (стадія D): «чек-лист на цих фазах зробити
> **обовʼязковим**, задача менеджера — витягти інформацію згідно чек-листу стадії
> та заповнити картку угоди або ліда».

**Наслідок для реалізації:** гейти переходів стадій (рядок GATE CRITERIA вище)
реалізуються **не окремими розкиданими перевірками полів, а через єдиний механізм
чек-листів** ([док. 04](./04-checklist-engine.md)). Кожен рядок GATE CRITERIA
вище — це пункт(и) відповідного чек-листа стадії. Пункт чек-листа може писати
відповідь напряму у поле картки (`target_field`), тому «заповнити картку» і
«пройти чек-лист» — одна дія.
