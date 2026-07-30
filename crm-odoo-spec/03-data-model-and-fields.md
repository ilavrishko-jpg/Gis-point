# 03 · Об'єктна модель та поля-дельта

> Тут — **тільки дельта** до §4.2/§5.2 базового ТЗ v1.1. Наявні поля не дублюємо —
> вони вже узгоджені з виконавцем. Технічні імена нових полів наведені так, як їх
> треба створити в Odoo.

## 3.1. Об'єктна модель

| Об'єкт | Odoo-модель | Що це | Скільки | Власник | Дельта |
|--------|-------------|-------|---------|---------|--------|
| 🟢 Contact (компанія) | `res.partner` (`is_company=True`) | **Акаунт. Головний носій стану клієнта** | 1 на клієнта | `account_owner_id`: Lead-gen → Salesperson → AM | 🔴 Account Status, Account Owner, Next Action Date, 4 лічильники |
| 🟢 Contact (особа) | `res.partner` (`is_company=False`, `parent_id`) | Конкретна людина. Дедуп по LinkedIn ID | 2..N (мін. ОПР + Champion) | той самий | 🟢 Decision-Maker Role (5 значень) — є; 🔴 ознака «пішов з компанії» |
| 🟠 CRM Lead | `crm.lead` (`type='lead'`) | Одна спроба залучення | 0..N за історію | Lead-gen (генерує) + Salesperson (закриває) | 🔴 Lifecycle Stage, ICP Tier, gate-поля |
| 🟣 CRM Opportunity | `crm.lead` (`type='opportunity'`) | Один проєкт/контракт | **0..N ОДНОЧАСНО** | Salesperson | 🔴 Estimated Man-Hours, Unit, Offer Type, Client Feedback |
| 🎯 Campaign | `crm.campaign`* | Гіпотеза/стратегія | N | Head of Sales + Marketing | 🔴 очікуваний результат, дата ревізії, Campaign Assets |
| 🔗 LinkedIn Profile | `gis.linkedin.profile` (модель v1.1) | Акаунт лід-гена | N на лід-гена | Lead-gen | 🔴 ліміти і черга |
| 🎯 ICP | `gis.icp` (модель v1.1) | Портрет клієнта | N | Head of Sales | 🔴 Tier, Unit |
| 📊 LeadGenStats | `gis.leadgen.stats` (модель v1.1) | Місячні лічильники | 1 × лід-ген × профіль × місяць | Lead-gen | без змін |

> \* Якщо в Odoo Community `crm.campaign` як окрема модель відсутня в потрібному
> вигляді — використати наявну модель кампаній із v1.1 (у v1.1 «Campaign» описана як
> кастомна модель). Розробник узгоджує з Артемом фактичне ім'я моделі кампаній;
> у цьому ТЗ вона позначена як `crm.campaign`.

### Нові моделі, що додаються цим ТЗ

| Модель | Призначення | Документ |
|--------|-------------|----------|
| `gis.checklist.template` | Шаблон чек-листа (гнучкий, редагований) | [04](./04-checklist-engine.md) |
| `gis.checklist.template.line` | Пункт шаблону | 04 |
| `gis.checklist.instance` | Інстанс чек-листа на конкретному записі | 04 |
| `gis.checklist.instance.line` | Відповідь на пункт | 04 |
| `gis.role.substitution` | Довідник «Role Substitution Map» (19 ролей) | 3.6 |

## 3.2. Поля на `crm.lead` (Lead + Opportunity)

| Код | Поле (`technical_name`) | Тип Odoo | Значення / примітка | Обов'язкове на стадії |
|-----|-------------------------|----------|---------------------|-----------------------|
| D-02 | `lifecycle_stage` | `Selection` (compute, store) | `prospect` / `mql` / `sql` / `customer` / `disqualified` / `dead` | авто |
| D-03 | `icp_tier` | `Selection` | `a` / `b` / `c` / `anti` | New (Lead) |
| D-20 | `reason_for_pause` | `Selection` | список F (Reason for Pause) | Nurturing |
| D-25 | `icp_a1_dm_reachable` | `Selection` | `yes`/`no`/`unknown` (дефолт `unknown`). Gate A — доступний операційний ОПР | Communication |
| D-25 | `icp_a2_remote_ok` | `Selection` | `yes`/`no`/`unknown`. Gate A — віддалено ОК, немає блоку по даних | Communication |
| D-25 | `icp_a3_deal_potential` | `Selection` | `yes`/`no`/`unknown`. Gate A — потенціал ≥£1K + повторюваність | Communication |
| D-25 | `icp_a4_standard_stack` | `Selection` | `yes`/`no`/`unknown`. Gate A — стандартний стек | Communication |
| D-25 | `icp_gate_a_passed` | `Boolean` (compute, store) | `True`, якщо всі 4 `icp_a*` = `yes`. Блокує перехід у Presale | авто |
| D-26 | `icp_b1_repeat_volume` | `Selection` | `yes`/`no`/`unknown`. Gate B — повторюваний обсяг геоданих | Presale |
| D-26 | `icp_b2_peak_load` | `Selection` | `yes`/`no`/`unknown`. Gate B — пікове/тендерне навантаження | Presale |
| D-26 | `icp_b3_no_idle_bench` | `Selection` | `yes`/`no`/`unknown`. Gate B — немає простою власної команди | Presale |
| D-26 | `icp_gate_b_score` | `Integer` (compute, store) | Кількість `yes` серед `icp_b*`. 3→конвертація · 2→Nurturing · ≤1→Lost | авто |
| D-01 | `client_pain` | `Text` | Біль клієнта СЛОВАМИ КЛІЄНТА, не нашими | Presale |
| D-01 | `substituted_role_id` | `Many2one` → `gis.role.substitution` | З довідника Role Substitution Map (19 позицій) | Presale |
| D-09 | `dm_on_presale` | `Boolean` | ОПР був на presale | Presale |
| D-11 | `unit` | `Selection` | `production` (Production Partner) / `software` (Software Technology Partner) | New (Opp) |
| D-11 | `estimated_man_hours` | `Float` | Оцінка Pre-Sale Engineer | Discovery |
| D-11 | `tz_received` | `Boolean` + `Attachment` (`message_main_attachment_id`/окреме `ir.attachment`) | ТЗ отримано | Discovery |
| D-11 | `tz_authored_by_us` | `Boolean` | ТЗ писали ми — метрика доданої вартості | Discovery |
| D-11 | `offer_type` | `Selection` | `pilot` / `fixed_scope` / `dedicated_team` / `platform` | Proposal |
| D-09 | `dm_approved_proposal` | `Boolean` + `Date` (`dm_approved_date`) | 🔴 ГЕЙТ входу в Contract | Contract |
| D-10 | `client_feedback_score` | `Integer` (1–10) + `client_feedback_text` `Text` | 🔴 ГЕЙТ входу в Won. Знімає AM, НЕ PM | Won |
| D-12 | `reengagement_date` | `Date` | 🔴 Обов'язкова при Lost | Lost |
| D-11 | `actual_man_hours` | `Float` | Відхилення >20% → червоний + ескалація | Project |
| — | `client_team_size` | `Integer` | Розмір команди клієнта (знімається вже на Presale) | Presale/Discovery |
| — | `client_used_outsourcing` | `Boolean` | Чи брав аутсорс | Presale/Discovery |
| — | `urgency` | `Selection` | `low`/`medium`/`high`/`critical` | Presale |
| — | `lead_source_type` | `Selection` | `cold` / `upsell` / `crosssell` (для Lead, створеного з Фази 3, крок 34) | New (Lead) |

> **Lost Reason / Lost Stage** — стандартні механізми Odoo (`crm.lost.reason`,
> `lost_reason_id`), розширюємо словник значеннями зі списку F (док. 07). Окреме
> текстове поле-коментар до Lost — `lost_feedback` (`Text`), обов'язкове (Lead ≥1
> символ; Opportunity ≥50 символів — валідатор).

## 3.3. Поля на `res.partner` (Contact / Акаунт)

| Код | Поле | Тип Odoo | Значення / примітка | Обов'язкове |
|-----|------|----------|---------------------|-------------|
| D-05 | `account_status` | `Selection` | `active` / `farming` / `winback` / `churned` | завжди для клієнтів |
| D-05 | `account_owner_id` | `Many2one` → `res.users` | Account Manager. **НІКОЛИ не порожньо для ≥ Customer** | завжди |
| D-05 | `next_action_date` | `Date` | Валідація ≥ сьогодні. Блокування збереження | завжди |
| D-03 | `icp_tier` | `Selection` | `a`/`b`/`c`. Протягується з Lead | завжди |
| D-06 | `open_opportunities` | `Integer` (compute, store) | count відкритих Opportunity (стадії New–Contract) | авто |
| D-06 | `active_projects` | `Integer` (compute, store) | count Opportunity у стадії Project | авто |
| D-06 | `won_total` | `Integer` (compute, store) | count Opportunity = Won | авто |
| D-06 | `last_project_end_date` | `Date` (compute, store) | max `date_closed` по Won | авто |
| D-21 | `account_health` | `Selection` (compute, store) | `green`/`yellow`/`red`. Формула — [док. 06](./06-scoring-analytics-roles.md), 6.4 | перерахунок місячно |
| D-10 | `next_potential_project` | `Selection` (`yes`/`no`/`unknown`) + `next_potential_date` `Date` | Є/Немає/Невідомо + очікуваний період | Won, Farming |
| D-05 | `reason_for_no_deals` | `Selection` | список F (Reason for No Deals) | Farming |
| — | `reason_for_dormancy` | `Selection` | причина простою | Win-back |
| — | `winback_attempt` | `Boolean` + `winback_attempt_date` `Date` | win-back спроба | Win-back |
| — | `churn_reason` | `Selection` + `churn_comment` `Text` | список F (Churn Reason) | Churned |
| — | `churn_manageable` | `Selection` (`manageable`/`inevitable`) | керована/неминуча втрата | Churned |
| D-24 | `contact_left_company` | `Boolean` | На особі (`is_company=False`). `True` → задача знайти заміну. **Акаунт НЕ втрачається** | коли виявлено |
| D-21 | `referral_given` | `Boolean` + `referral_date` `Date` | — | Farming |
| — | `decision_maker_role` | `Selection` (5 значень, [v1.1]) | на особі. `Colleague` → «no push» | — |

> **Правило синхронізації `icp_tier`.** При конвертації Lead → Opportunity/Contact
> `icp_tier` протягується з Lead на створюваний/наявний `res.partner`, якщо на
> партнері він ще порожній. Якщо вже заданий — не перезаписуємо (пріоритет —
> ручне рішення AM).

## 3.4. Поля на `crm.campaign`

| Код | Поле | Тип | Примітка | Обов'язкове |
|-----|------|-----|----------|-------------|
| D-14 | `expected_result` | `Integer` | # зустрічей, які має дати кампанія | Draft |
| D-14 | `review_date` | `Date` | Коли переглядаємо результат гіпотези | Draft |
| D-14 | `state` | `Selection` | `draft`/`ready`/`active`/`closed` | — |
| D-14 | `asset_ids` | `One2many` → `gis.campaign.asset` | Пост LinkedIn / кейс / сторінка послуги / лід-магніт / профіль — посилання + `is_ready` `Boolean` | 🔴 ГЕЙТ переводу в Active |
| D-14 | `assets_ready` | `Boolean` (compute) | `True`, якщо мінімальний набір `asset_ids.is_ready` виконано | авто (гейт A-15) |

`gis.campaign.asset`: `campaign_id` (M2o), `asset_type` (Selection: `linkedin_post`/
`site_case`/`service_page`/`lead_magnet`/`profile_updated`), `url` (Char),
`is_ready` (Boolean).

## 3.5. Поля на ICP та LinkedIn Profile

**`gis.icp`:**

| Код | Поле | Тип | Значення |
|-----|------|-----|----------|
| D-13 | `tier` | `Selection` | `a`/`b`/`c` |
| D-13 | `unit` | `Selection` | `production`/`software` |

**`gis.linkedin.profile`:**

| Код | Поле | Тип | Значення |
|-----|------|-----|----------|
| D-16 | `daily_invite_limit` | `Integer` | Денний ліміт інвайтів |
| D-16 | `weekly_invite_limit` | `Integer` | Тижневий ліміт інвайтів |
| D-16 | `current_queue` | `Integer` (compute) | Скільки контактів чекає на цьому профілі |

## 3.6. Довідник `gis.role.substitution` (Role Substitution Map)

Модель-довідник ролей клієнта, які GIS-Point заміщає (19 позицій по 6 відділах).
Seed-дані завантажуються з файлу `GIS-Point_Client_Role_Substitution_Map.xlsx`.

| Поле | Тип | Примітка |
|------|-----|----------|
| `name` | `Char` | Назва ролі |
| `department` | `Selection`/`Char` | Відділ клієнта |
| `unit` | `Selection` | `production`/`software` — до якого юніта тяжіє |
| `active` | `Boolean` | — |

## 3.7. Правила синхронізації (обов'язкові до реалізації)

| # | Правило | Логіка |
|---|---------|--------|
| 1 | 🔴 `account_status` обчислюється від Opportunity | `active` якщо ≥1 відкрита Opp або активний проєкт; `farming` якщо 0 відкритих і ≥1 won; `winback` після 180 днів; `churned` після 365. Реалізація — [док. 05](./05-automations-and-rules.md) |
| 2 | 🔴 `account_status` **НІКОЛИ не регресує нижче Customer** | Як тільки `won_total ≥ 1` — Contact назавжди клієнт. Може стати farming/winback/churned, але ніколи назад у `prospect`. `lifecycle_stage` для клієнта не опускається нижче `customer` |
| 3 | 🟢 Один Lead = один проєкт (v1.1 §4.4) | Повторна співпраця = НОВИЙ Lead, прив'язаний до наявного Contact. Старий не реактивується |
| 4 | 🟢 Дедуп особи по LinkedIn ID | `Responsible` = перший, хто вніс. 🔴 **ДОДАТИ 2-й рівень**: дедуп компанії по домену (`res.partner.website`/email-домен). Інакше два контакти з однієї компанії → два незв'язані акаунти (див. A-16) |
| 5 | 🟢 Аналітика по `Stage Change Date` | Лід зі січня, що дійшов до контракту в травні — контракт травня. Використовуємо `date_last_stage_update` / лог стадій |
| 6 | 🟢 Усе через поля, теги не використовуємо | Поля дозволяють блокувати переходи, теги — ні |
| 7 | 🔴 Lead-gen ≠ Salesperson ≠ Account Manager | Три РІЗНІ поля. На Lead — `user_id` (Lead-gen на етапі Lead). На Opportunity — `user_id` (Salesperson). На Contact — `account_owner_id` (AM) |

## 3.8. Таблиця істинності `account_status` (канон)

Реалізує правило синхронізації №1. Розробник кодує саме цю таблицю.

| `open_opportunities` (New–Contract) | `active_projects` (Project) | `won_total` (історія) | → `account_status` | Власник |
|--------------------------------------|------------------------------|------------------------|--------------------|---------|
| будь-що | > 0 | ≥ 1 | `active` (C1) | Account Manager |
| > 0 | 0 | ≥ 1 | `active` (C1) | AM (+ Salesperson по угоді) |
| 0 | 0 | ≥ 1, останній проєкт < 180 днів | 🔴 `farming` (C2) | Account Manager |
| 0 | 0 | ≥ 1, останній проєкт 180–365 днів | `winback` (C3) | Account Manager |
| 0 | 0 | ≥ 1, > 365 днів, win-back без результату | `churned` (C4) | Account Manager |
| > 0 | 0 | 0 (ще не клієнт) | — (стан живе в Opportunity) | Salesperson |
| 0 | 0 | 0 (ще не клієнт) | — (стан живе в Lead · Nurturing) | Lead-gen |
