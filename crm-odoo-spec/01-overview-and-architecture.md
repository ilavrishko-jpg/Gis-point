# 01 · Огляд та архітектура

## 1.1. Платформа та обмеження

| Параметр | Значення |
|----------|----------|
| Платформа | **Odoo 18 Community Edition** |
| Базовий модуль | `crm` (Leads/Opportunities), `contacts` (`res.partner`), `sales_team`, `mail` (activities), `sale_management` (Quotation) |
| Форма реалізації | Окремий кастомний модуль `gis_crm` (одне ім'я модуля-обгортки над усіма розширеннями). Розширюємо `crm.lead`, `res.partner` через `_inherit`; нові моделі — у власному просторі імен `gis.*` |
| Заборона | **Enterprise-only** можливості (dashboards зі Studio, офіційні `base_automation` дії, що є тільки в Enterprise) не використовуємо. Аналітика — через **Pivot/Graph view** та збережені фільтри. Автоматизації — через модуль **`base_automation`** (є в Community) + власні Server Actions + `ir.cron` |
| Мова інтерфейсу | Українська (основна) + англійська. Технічні `Selection`-ключі — англійською; `string`/labels — українською |
| Валюта прикладів | GBP (£) — як у джерелі. Реальна валюта задається в компанії |

> **Важливо для розробника.** У Odoo 18 і leads, і opportunities — це одна модель
> `crm.lead`, розрізнення полем `type` (`lead` / `opportunity`). Усе, що в цьому
> ТЗ називається «Lead» — це `crm.lead` з `type='lead'`; «Opportunity» — той самий
> `crm.lead` з `type='opportunity'`. «Contact / Акаунт» — це `res.partner`
> (компанія, `is_company=True`), «Contact / особа» — `res.partner` (`is_company=False`,
> `parent_id` = компанія).

## 1.2. Архітектура: три рівні, чотири фази

```
КОНТАКТ (людина, res.partner is_company=False)
   └── belongs to ─→ АКАУНТ / CONTACT-компанія (res.partner is_company=True)  ← носій СТАНУ клієнта
                          ├── LEAD  (crm.lead type=lead)         — одна спроба залучення
                          └── OPPORTUNITY (crm.lead type=opportunity) — один проєкт / контракт

Фаза 0 · ПОПИТ      (поза Odoo + модель Campaign)          → має вихід
Фаза 1 · LEAD       (crm.lead type=lead)                    → має вихід
Фаза 2 · OPPORTUNITY(crm.lead type=opportunity)             → має вихід
Фаза 3 · АКАУНТ     (res.partner, account_status)           → виходу НЕМАЄ: ходить по колу, поки існує компанія
```

- **Фази 1–2 лінійні і мають вихід** (Won/Lost/конвертація).
- **Фаза 3 циклічна**: `Active → Farming → Win-back → Churned → (через 180 днів) → Farming`.
  Жоден акаунт не «випадає» з системи назавжди.

Повна послідовність — 38 кроків (див. вкладку «Наскрізний процес», відтворена у
[`02-funnel-map-stages.md`](./02-funnel-map-stages.md), розділ 2.1).

## 1.3. Стадії в CRM (17 у канбані + 4 статуси акаунта)

| Рівень | Стадії | Технічно |
|--------|--------|----------|
| Lead (`crm.lead type=lead`) | `New` → `Communication` → **`Nurturing`** → `Presale` → `Lost/Disqualified` | `crm.stage` для лід-пайплайну |
| Opportunity (`crm.lead type=opportunity`) | `New` → `Discovery` → `Pilot` → `Proposal/Quotation` → `Contract` → `Project` → `Won` → `Lost` | `crm.stage` для угод |
| Account (`res.partner`) | `Active` → `Farming` → `Win-back` → `Churned` | Поле `account_status` (Selection), **не** `crm.stage` |

> `Nurturing` — **повноцінна стадія лід-пайплайну** (усуваємо суперечність v1.1,
> де §8.1 посилалась на «Nursing», а §4.1 її не містив).

**Розділення пайплайнів.** Lead і Opportunity — різні `crm.team`/пайплайни або
різні набори `crm.stage`, відфільтровані за `type`. Стадії Lead не мають
з'являтися у канбані Opportunity і навпаки. Реалізація — стандартна для Odoo:
`crm.stage` із прив'язкою до `team_id` + фільтр за `type` у діях вікна.

## 1.4. Глосарій

| Термін | Визначення |
|--------|-----------|
| **Lead-gen** | Роль: генерує ліда і доводить до presale. Поле `user_id` на Lead у v1.1 = ця роль на етапі Lead |
| **Salesperson** | Роль: конвертує SQL у контракт. Власник Opportunity |
| **Pre-Sale Engineer** | Роль: оцінка нормо-годин, технічна експертиза до підписання |
| **PM** | Роль: виконання проєкту. Детальний PM — поза Odoo (v1.1 §14) |
| **Account Manager (AM)** | 🔴 **Нова роль.** Утримання і розвиток акаунта у Фазі 3. Знімає відгук клієнта |
| **ICP** | Ideal Customer Profile — портрет ідеального клієнта. Модель у Odoo |
| **ICP Tier** | 🔴 Клас клієнта A/B/C/Anti-ICP. Задає пріоритет і ритм дотиків |
| **Unit** | Юніт-виконавець: `Production Partner` (ГІС/зйомка/обробка) або `Software Technology Partner` (ІТ/BIM/платформи) |
| **Lifecycle Stage** | 🔴 Обчислюване поле Prospect/MQL/SQL/Customer/… — мова для звірки з ринковими бенчмарками. **Поле, не стадія** |
| **Gate A** | 🔴 Стоп-фактори (4 умови), перевіряються в переписці на стадії Communication. Будь-яке «Ні» = Lost |
| **Gate B** | 🔴 Умови попиту (3 умови), з'ясовуються тільки в живій розмові на Presale. 3/3 → конвертація, 2/3 → Nurturing, ≤1/3 → Lost |
| **Pilot / Proof Batch / PoV** | Платний або безкоштовний пілот на даних клієнта |
| **Account Status** | 🔴 Поле на Contact: Active/Farming/Win-back/Churned. Обчислюється від лічильників угод |
| **Zero-Orphan** | 🔴 Правило: жоден Contact ≥ Customer не існує без власника/статусу/дати наступної дії |
| **Farming** | 🔴 Стан акаунта без відкритих угод, але ≥1 виграна. Найтепліший лід у базі |
| **Чек-лист стадії** | 🔴 Обов'язковий набір пунктів, які менеджер має заповнити на стадії; гейтить перехід далі. Шаблони гнучкі (див. [док. 04](./04-checklist-engine.md)) |

## 1.5. Обсяг робіт (Scope)

### У обсязі MVP (P0 + критичний P1)
1. Нові поля-дельта на `crm.lead`, `res.partner`, `crm.campaign`, ICP, Profile
   (див. [док. 03](./03-data-model-and-fields.md)).
2. Стадія `Nurturing`; 4 статуси акаунта на Contact.
3. **Гнучкий механізм обов'язкових чек-листів** (`gis.checklist.*`) — [док. 04](./04-checklist-engine.md).
4. Гейти переходів (Gate A, Gate B, чек-лист-гейти, обов'язкові поля) — блокування
   `write` при незаповнених умовах.
5. Автоматизації P0: `A-01` (тригер нуль-угод → Farming), `A-02` (Zero-Orphan cron),
   `A-03…A-08`, `A-31…A-33` — [док. 05](./05-automations-and-rules.md).
6. Обчислювані лічильники на Contact (`open_opportunities`, `active_projects`,
   `won_total`, `last_project_end_date`) + `account_status`.
7. Ролі та права (`06`), фіксовані Selection-списки причин (`07`).

### У обсязі повного впровадження (решта P1 + P2)
8. Автоматизації P1/P2 (`A-09…A-30`): переходи Farming→Win-back→Churned→Farming,
   нагадування, ескалації, SLA-задачі.
9. Account Health, Forecast Weight, розширена аналітика.
10. Campaign Assets гейт (Фаза 0), ліміти LinkedIn Profile.

### Поза обсягом Odoo (свідомо)
- Sequence-повідомлення в LinkedIn Helper (трекінг у Odoo відкладено — v1.1, Етап 4).
- Детальний Project Management (виконання) — живе в Plane / трекері (v1.1 §14).
  Odoo тримає лише контрольні точки стадії `Project`.
- Збір бази (Sales Navigator / Apollo / Clay) — поза Odoo.

## 1.6. Нефункціональні вимоги

| Вимога | Деталь |
|--------|--------|
| Продуктивність | Обчислювані лічильники на Contact мають бути `store=True` + перерахунок точковими тригерами (не повний rescan). Cron-и — батчами по `limit`, ідемпотентні |
| Ідемпотентність | Усі cron-автоматизації переходів мають бути безпечними при повторному запуску (перевірка поточного стану перед зміною) |
| Аудит | Ключові поля (`account_status`, `account_owner_id`, `next_action_date`, стадії, gate-поля) — з `tracking=True` для history у chatter |
| Локалізація дат | Робочі дні (`+3 роб. дні`, SLA) рахувати з урахуванням календаря компанії (`resource.calendar`), а не календарних днів, де в джерелі сказано «роб. дні» |
| Безпека | Record rules за командами/ролями (док. 06). Клієнт (`Customer`) не може потрапити в холодний сіквенс (A-19) |
| Розширюваність | Чек-листи, фіксовані списки причин, ритм дотиків за тиром — **дані, а не код**. Редагуються бізнесом через UI без релізу |
| Міграція | Наявні Contact без `account_status` після встановлення модуля отримують статус через one-time init-скрипт (`post_init_hook`) за таблицею істинності (док. 05, 5.3) |

## 1.7. Що взято з v1.1 без змін (не переробляти)

- Стадії Lead і Opportunity, обов'язкові поля з блокуванням переходів (§4.3).
- Дедуплікація по LinkedIn ID; `Responsible` = перший, хто вніс.
- Розділення полів Lead-gen / Salesperson.
- Аналітика по `Stage Change Date` (лід зі січня, що дійшов до контракту в травні —
  це контракт травня).
- Моделі ICP / Campaign / Profile / LeadGenStats.
- Правило §4.4: один Lead = один проєкт; повторна співпраця = новий Lead.
- Принцип «усе через поля, теги не використовуємо».
- Логіка «no push» для `Decision-Maker Role = Colleague` (§8.2).
- Webhook LinkedIn Helper: connection accepted → створення Lead у New (§7.1, варіант B).
