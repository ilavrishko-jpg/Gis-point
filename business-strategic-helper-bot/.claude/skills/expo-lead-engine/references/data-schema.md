# Схема бази і статуси пайплайну

Дві таблиці. Один рядок `companies` = одна юридична компанія (дедуплікація за доменом).
Один рядок `contacts` = одна людина, прив'язана до `company_id`.

## Статуси пайплайну (`status_stage`)

| Статус | Означає | Крок |
|---|---|---|
| `S0` | Сирий рядок зі списку учасників | — |
| `S1` | Нормалізовано (домен, країна, стенд) | 1 |
| `S2` | Сегментовано, пройшов відсів релевантності | 2 |
| `S3` | Стенд валідовано | 3 |
| `S4` | Розмір валідовано | 4 |
| `S5` | BU і оффер призначено | 5 |
| `S6` | ЛПР знайдено | 6 |
| `S7` | Гіпотезу сформовано | 7 |
| `S8` | Проскоровано, тір присвоєно | 8 |
| `S9` | Аутріч відправлено | 9 |
| `M` | Зустріч підтверджено | 9 |
| `E` | Зустрілись на виставці | 10 |
| `F` | У follow-up | 12 |
| `SQL` | Кваліфікований лід, переданий у продаж | 12 |
| `DQ` | Дискваліфіковано (обов'язково `disqualify_reason`) | будь-який |

Рядок не переходить на наступний статус, поки поля поточного кроку не заповнені (значення `unknown` — валідне заповнення).

## Таблиця `companies`

| Поле | Тип / значення | Крок |
|---|---|---|
| `id` | унікальний | 1 |
| `company` | назва | 1 |
| `domain` | ключ дедуплікації | 1 |
| `country`, `hq_city` | | 1 |
| `exhibitor_catalog_url` | | 1 |
| `stand_hall`, `stand_number` | | 1 |
| `catalog_categories` | категорії з каталогу | 1 |
| `segment_archetype` | UAV-OEM · SENSOR · EO-DATA · SURVEY · GIS-SW · DEF-INT · INFRA · GOV · ACAD · OTHER | 2 |
| `relevance` | H · M · L | 2 |
| `stand_type` | own-large · own-small · national-pavilion · co-exhibitor · speaker-only · catalog-only · delegation-only · unknown | 3 |
| `co_exhibitor_of` | чий стенд | 3 |
| `size_headcount`, `size_source`, `size_band` | | 4 |
| `size_track` | Nurture · Fast · Core · Divisional · Enterprise | 4 |
| `rnd_team_size`, `revenue_band`, `funding_stage`, `ownership` | | 4 |
| `tech_signals` | сенсори, стек, вакансії, патенти | 4 |
| `target_bu` | BU-1 · BU-2 · BU-3 (+ alt) | 5 |
| `offer` | конкретний оффер | 5 |
| `trigger` | факт + джерело | 5 |
| `pain_hypothesis` | | 7 |
| `case_ref` | № кейсу з профілю | 7 |
| `value_metric` | число з кейсу | 7 |
| `first_question` | перше питання на стенді | 7 |
| `hypothesis_confidence` | H · M · L | 7 |
| `score_fit`, `score_size`, `score_access`, `score_dm`, `score_hypothesis`, `score_total` | 0–100 | 8 |
| `tier` | A · B · C | 8 |
| `status_stage` | див. вище | всі |
| `owner` | хто з BD веде | 8 |
| `disqualify_reason` | | будь-який |
| `next_action`, `next_action_date` | | 9+ |
| `notes`, `sources` | | всі |

## Таблиця `contacts`

| Поле | Значення | Крок |
|---|---|---|
| `contact_id`, `company_id` | | 6 |
| `full_name`, `title` | | 6 |
| `bu_role_type` | ЛПР · економічний · чемпіон · гейткіпер | 6 |
| `seniority` | C-level · VP/Director · Head/Manager · Senior IC | 6 |
| `linkedin_url`, `source_url` | | 6 |
| `email`, `email_status` | verified · pattern · unknown | 6 |
| `at_expo` | confirmed · speaker · likely · unknown | 6 |
| `confidence` | H · M · L | 6 |
| `outreach_status` | not-started · connected · replied · booked · met · no-reply | 9+ |
| `last_touch`, `next_touch` | дата | 9+ |
| `notes` | зафіксоване з розмови | 10 |

## Гігієна бази
- Порожнє поле заборонене — пиши `unknown`. Порожнє = «не дійшли руки», `unknown` = «перевірили, не знайшли».
- Кожен рядок має власника (`owner`) з моменту `S8`.
- Один прохід = одна виставка; база копіюється в наступну як джерело збагачення, не як робочий файл.
- Персональні дані видаляємо/архівуємо за запитом суб'єкта; у базі не тримаємо нічого поза бізнес-контекстом.
