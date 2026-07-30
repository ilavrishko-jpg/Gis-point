# 04 · Гнучкий механізм обов'язкових чек-листів

> Це **центральний блок ТЗ**. Замовник вимагає: на кожній стадії (і на кожній
> потрібній взаємодії) менеджер бачить чек-лист того, що треба з'ясувати/зробити;
> **чек-лист обов'язковий** — без його заповнення запис не рухається далі; заповнення
> чек-листа = заповнення картки ліда/угоди/акаунта. Самі чек-листи **редагуються
> бізнесом без розробника** і **з часом змінюються** — тому шаблони мають бути
> даними, а не кодом, і **версіонуватися**.

## 4.1. Вимоги (acceptance-рівень)

| # | Вимога | Як перевіряємо |
|---|--------|----------------|
| CL-1 | Для стадії існує шаблон чек-листа; при вході запису в стадію автоматично створюється **інстанс** чек-листа на цьому записі | Перевести Lead у Communication → на ліді з'явився чек-лист Gate A |
| CL-2 | Чек-лист може бути **гейтом**: доки не заповнені всі обов'язкові пункти — перехід у наступну стадію заблоковано з переліком незаповненого | Спроба Communication → Presale без 4 відповідей Gate A → помилка зі списком |
| CL-3 | Пункт чек-листа може **писати відповідь напряму в поле картки** (`target_field`) | Відповідь на пункт «ОПР доступний» = «Так» → `icp_a1_dm_reachable='yes'` на ліді |
| CL-4 | Head of Sales редагує шаблони через UI (додає/змінює/вимикає пункти, змінює обов'язковість) **без розробника і без релізу** | Змінити текст пункту в Settings → новий інстанс бере новий текст |
| CL-5 | Зміна шаблону **не ламає вже закриті інстанси** (версійність): старі записи зберігають той чек-лист, за яким їх вели | Змінити шаблон → відкрити стару виграну угоду → її чек-лист незмінний |
| CL-6 | Чек-лист прив'язується не тільки до стадії, а й до **взаємодії** (напр. дзвінок «план розвитку», зняття відгуку) через тип тригера | Створити активність типу «План розвитку» → приліпити відповідний чек-лист |
| CL-7 | Прогрес чек-листа видно на формі запису (progress bar, % заповнення) і в списках | На канбані/формі — індикатор completion_rate |
| CL-8 | Гнучкість типів відповіді: так/ні/не з'ясовано, текст, число, дата, вибір зі списку, файл, посилання на запис | Пункт «Біль клієнта» = текст; «ОПР доступний» = yes/no/unknown |

## 4.2. Моделі

### 4.2.1. `gis.checklist.template` — шаблон

| Поле | Тип | Опис |
|------|-----|------|
| `name` | `Char` (required) | Назва, напр. «ГЕЙТ A — стоп-фактори» |
| `code` | `Char` | Технічний код для seed/посилань, напр. `gate_a` |
| `res_model` | `Selection` (required) | На якій сутності діє: `crm.lead` / `res.partner` / `crm.campaign`. (Реалізувати як `Selection` з фіксованим переліком підтримуваних моделей, а не вільний `ir.model`, щоб уникнути помилок мапінгу) |
| `applies_to_type` | `Selection` | Для `crm.lead`: `lead` / `opportunity` / `any` — щоб один шаблон не спливав і на ліді, і на угоді |
| `trigger_type` | `Selection` (required) | `stage_enter` (вхід у стадію) / `status_enter` (вхід у `account_status`) / `interaction` (активність/взаємодія) / `manual` |
| `stage_id` | `Many2one` → `crm.stage` | Заповнюється при `trigger_type='stage_enter'`. До якої стадії прив'язаний |
| `account_status` | `Selection` | Заповнюється при `trigger_type='status_enter'`: `active`/`farming`/`winback`/`churned` |
| `activity_type_id` | `Many2one` → `mail.activity.type` | Заповнюється при `trigger_type='interaction'` |
| `is_gate` | `Boolean` | Якщо `True` — блокує перехід далі, доки не `is_complete` |
| `gate_mode` | `Selection` | `all_required` (усі обов'язкові = заповнені) / `score` (порогова логіка, напр. Gate B: 3/3) |
| `gate_score_threshold` | `Integer` | Для `gate_mode='score'` — мінімум «так» для проходу (напр. 3) |
| `version` | `Integer` (default 1) | Версія шаблону. Інкремент при значущій зміні |
| `active` | `Boolean` (default True) | Архівація без видалення |
| `sequence` | `Integer` | Порядок |
| `note` | `Html` | Інструкція менеджеру (рамка розмови, «що НЕ робити») |
| `line_ids` | `One2many` → `gis.checklist.template.line` | Пункти |
| `owner_group_note` | `Char` | Хто заповнює (Lead-gen / Salesperson / AM) — інформативно |

### 4.2.2. `gis.checklist.template.line` — пункт шаблону

| Поле | Тип | Опис |
|------|-----|------|
| `template_id` | `Many2one` (required, ondelete cascade) | Батько |
| `sequence` | `Integer` | Порядок |
| `name` | `Char` (required) | Питання / що з'ясувати («Хто вирішує, кому віддавати обробку даних?») |
| `help_text` | `Text` | Скрипт / підказка / «як почути Ні» |
| `response_type` | `Selection` (required) | `yes_no_unknown` / `boolean` / `char` / `text` / `integer` / `float` / `date` / `selection` / `many2one` / `attachment` |
| `selection_options` | `Text` | Для `response_type='selection'`: значення через `;` (ключ:лейбл) |
| `comodel` | `Char` | Для `response_type='many2one'`: ім'я моделі (напр. `gis.role.substitution`) |
| `is_required` | `Boolean` | Обов'язковий для проходження гейта |
| `weight` | `Integer` (default 0) | Для `gate_mode='score'`: скільки «балів» дає відповідь «так» (Gate B — по 1 на кожен) |
| `target_field` | `Char` | Технічне ім'я поля на `res_model`, куди писати відповідь (напр. `icp_a1_dm_reachable`, `client_pain`). Порожньо → відповідь живе тільки в інстансі |
| `fail_action` | `Selection` | Що робити при «поганій» відповіді: `none` / `block` (блок гейта) / `to_lost` (авто-Lost) / `to_nurturing` (у Nurturing з датою). Реалізує логіку Gate A (будь-яке «Ні» = Lost) |
| `fail_value` | `Char` | Яке значення вважається «поганим» (напр. `no` для Gate A) |

### 4.2.3. `gis.checklist.instance` — інстанс на записі

| Поле | Тип | Опис |
|------|-----|------|
| `template_id` | `Many2one` (required) | Шаблон, з якого згенеровано |
| `template_version` | `Integer` | Знімок `template.version` на момент створення (для CL-5) |
| `res_model` | `Char` | Модель запису |
| `res_id` | `Integer` | ID запису |
| `lead_id` | `Many2one` → `crm.lead` | Зручне пряме посилання (заповнюється, якщо `res_model='crm.lead'`) |
| `partner_id` | `Many2one` → `res.partner` | Аналогічно для Contact |
| `state` | `Selection` | `draft` / `in_progress` / `done` / `skipped` |
| `completion_rate` | `Float` (compute) | % заповнених обов'язкових пунктів (для progress bar) |
| `is_complete` | `Boolean` (compute, store) | Гейт-логіка: `all_required` → усі required answered; `score` → сума ваг «так» ≥ threshold |
| `score` | `Integer` (compute) | Сума `weight` по відповідях «так» (для `gate_mode='score'`) |
| `line_ids` | `One2many` → `gis.checklist.instance.line` | Відповіді |

### 4.2.4. `gis.checklist.instance.line` — відповідь

| Поле | Тип | Опис |
|------|-----|------|
| `instance_id` | `Many2one` (required, cascade) | Батько |
| `template_line_id` | `Many2one` (required) | З якого пункту |
| `name` | `Char` (related `template_line_id.name`) | Питання (знімок тексту зберігаємо у `question_snapshot` для CL-5) |
| `question_snapshot` | `Char` | Текст питання на момент створення інстансу |
| `response_type` | related | Тип відповіді |
| `value_bool` | `Boolean` | для boolean |
| `value_selection` | `Char` | для yes_no_unknown / selection |
| `value_char` | `Char` | — |
| `value_text` | `Text` | — |
| `value_integer` | `Integer` | — |
| `value_float` | `Float` | — |
| `value_date` | `Date` | — |
| `value_m2o_id` | `Integer` | ID для many2one (зберігаємо як int + comodel, щоб не плодити реальні FK) |
| `attachment_ids` | `Many2many` → `ir.attachment` | для attachment |
| `is_answered` | `Boolean` (compute) | Заповнено відповідно до `response_type` |

## 4.3. Мікшин на записах: `gis.checklist.mixin`

Наслідується у `crm.lead` та `res.partner` (`_inherit = ['crm.lead', 'gis.checklist.mixin']`).

| Поле/метод | Опис |
|------------|------|
| `checklist_instance_ids` | `One2many` (обчислюється через `res_model` + `res_id`, або справжній O2m з `lead_id`/`partner_id`) — усі чек-листи запису |
| `active_checklist_id` | `Many2one` (compute) — обов'язковий чек-лист-гейт поточної стадії/статусу |
| `checklist_gate_passed` | `Boolean` (compute) — `active_checklist_id.is_complete` або `True`, якщо гейта немає |
| `checklist_progress` | `Float` (compute) — % активного чек-листа (для канбану/списку) |
| `_gis_get_current_stage_key()` | helper: повертає (`trigger_type`, `stage_id`/`account_status`) для пошуку шаблону |

## 4.4. Життєвий цикл (алгоритми)

### 4.4.1. Генерація інстансу при вході в стадію (CL-1)

Тригер: `write()` на `crm.lead`, що змінює `stage_id`; на `res.partner`, що змінює
`account_status`; або створення `mail.activity` певного типу.

```
on stage/status change (record, new_key):
    templates = search(gis.checklist.template, [
        ('res_model', '=', record._name),
        ('applies_to_type', 'in', [record.type, 'any']),   # тільки для crm.lead
        ('trigger_type', '=', 'stage_enter' | 'status_enter'),
        (stage_id == new_stage) OR (account_status == new_status),
        ('active', '=', True),
    ])
    for tmpl in templates:
        if not exists(instance where template_id=tmpl AND res_id=record.id AND state != 'skipped'):
            inst = create gis.checklist.instance(
                template_id=tmpl, template_version=tmpl.version,
                res_model, res_id, lead_id/partner_id,
                state='in_progress')
            for tl in tmpl.line_ids:
                create instance.line(
                    template_line_id=tl,
                    question_snapshot=tl.name,
                    # якщо target_field уже має значення на записі — підтягнути його
                    value_* = read(record, tl.target_field) if tl.target_field else empty)
```

> Ідемпотентність: повторний вхід у стадію не створює дубль, якщо активний інстанс
> уже існує. Повернення назад і знову вперед — переюзати наявний інстанс.

### 4.4.2. Двонаправлений мапінг «пункт ↔ поле картки» (CL-3)

- **Запис → інстанс**: при створенні інстансу, якщо `target_field` заповнене,
  беремо поточне значення поля картки як стартову відповідь.
- **Інстанс → запис**: у `write()` на `gis.checklist.instance.line`, якщо у пункту
  є `target_field`, пишемо `value_*` у відповідне поле картки (`record.write({target_field: value})`).
  Це і є «заповнити картку угоди або ліда».
- Конфлікт-політика: остання зміна виграє; поля з `tracking=True` лишають слід у chatter.
- Типова відповідність `response_type ↔ тип поля Odoo` перевіряється при
  збереженні шаблону (`@api.constrains` на `template_line`).

### 4.4.3. Гейтинг переходу (CL-2)

Викликається з єдиної точки блокування переходів (див. [док. 05](./05-automations-and-rules.md), A-05):

```
def _gis_check_stage_gate(record, target_stage):
    # знайти чек-лист-гейт ПОТОЧНОЇ стадії (яку залишаємо)
    gate = active gate checklist for record.current_stage
    if not gate: return OK
    if gate.gate_mode == 'all_required':
        missing = [l.question_snapshot for l in gate.line_ids
                   if l.template_line_id.is_required and not l.is_answered]
        if missing:
            raise UserError("Заповніть обов'язкові пункти чек-листа «%s»: %s"
                            % (gate.template_id.name, ", ".join(missing)))
    elif gate.gate_mode == 'score':
        if gate.score < gate.template_id.gate_score_threshold:
            raise UserError("Чек-лист «%s»: набрано %d із %d. Перехід заблоковано."
                            % (gate.template_id.name, gate.score, threshold))
    # fail_action по пунктах (Gate A: будь-яке 'no' → Lost)
    for l in gate.line_ids:
        if l.value_matches(l.template_line_id.fail_value):
            apply(l.template_line_id.fail_action)  # to_lost / to_nurturing / block
```

Зв'язок з gate-полями: `icp_gate_a_passed` та `icp_gate_b_score` (compute-поля з
[док. 03](./03-data-model-and-fields.md)) можуть обчислюватися **або** напряму від
полів `icp_a*`/`icp_b*`, **або** від чек-лист-інстансу. **Рекомендація:** тримати
compute-поля залежними від реальних полів `icp_a*`/`icp_b*` (бо чек-лист пише саме
в них через `target_field`), а чек-лист використати як UI+гейт-обгортку. Так gate
працює навіть якщо чек-лист вимкнули, і аналітика будується на стабільних полях.

### 4.4.4. Версійність (CL-4, CL-5)

- Шаблони — це `data`, редаговані в UI. Seed-версія вантажиться XML з `noupdate="1"`,
  щоб оновлення модуля **не затирало** правки бізнесу.
- Значуща зміна шаблону (додавання/видалення обов'язкового пункту, зміна гейт-логіки)
  → бізнес інкрементує `version`. Дрібні правки тексту `help_text` версію не міняють.
- Інстанс тримає `template_version` і `question_snapshot` по кожному рядку —
  закриті записи показують той чек-лист, за яким їх вели.
- Опційно (P2): при зростанні `version` для **відкритих** інстансів у не-термінальних
  стадіях можна запропонувати «оновити чек-лист до нової версії» (кнопка), але
  **не автоматично**, щоб не збивати роботу в процесі.

## 4.5. Прив'язка чек-листів до стадій (seed-матриця)

Ключова матриця «стадія → шаблон-гейт». Повний контент — [док. 07](./07-checklist-templates-seed.md).

| Модель | Стадія / статус / взаємодія | Шаблон (`code`) | `is_gate` | `gate_mode` |
|--------|------------------------------|-----------------|-----------|-------------|
| `crm.lead` (lead) | Communication | `gate_a` | ✅ | all_required |
| `crm.lead` (lead) | Nurturing | `nurturing_entry` | ✅ | all_required |
| `crm.lead` (lead) | Presale | `presale_gate_b` | ✅ | score (threshold=3) |
| `crm.lead` (lead) | Lost | `lead_lost` | ✅ | all_required |
| `crm.lead` (opp) | Discovery | `tz_checklist` | ✅ | all_required |
| `crm.lead` (opp) | Contract | `contract_dm_approval` | ✅ | all_required |
| `crm.lead` (opp) | Won | `won_feedback` | ✅ | all_required |
| `crm.lead` (opp) | Lost | `opp_lost` | ✅ | all_required |
| `res.partner` | account_status=farming | `dev_plan` | ✅ | all_required |
| `res.partner` | account_status=winback | `winback` | ✅ | all_required |
| `res.partner` | account_status=churned | `churn_postmortem` | ✅ | all_required |
| `crm.campaign` | state=active | `campaign_assets` | ✅ | all_required |
| `mail.activity` (interaction) | тип «Зняття відгуку» | `feedback_script` | ✅ | all_required |

## 4.6. UI-вимоги

- **На формі `crm.lead` / `res.partner`**: вкладка/секція «Чек-лист стадії» з
  активним інстансом — редагований `one2many` з рядками, progress bar (`completion_rate`),
  бейдж «Гейт: пройдено / не пройдено».
- **Канбан/список**: колонка/бейдж `checklist_progress` (%), колір за станом
  (червоний < 100% на гейт-стадії).
- **Settings → GIS CRM → Чек-листи**: список шаблонів, редактор пунктів. Доступ —
  група `Head of Sales` (див. [док. 06](./06-scoring-analytics-roles.md)).
- **Кнопка «Не застосовно» (skip)** на інстансі — тільки для не-гейтових чек-листів
  і з правом; лишає слід у chatter із причиною.
- Помилка гейта показується як `UserError` з переліком незаповнених пунктів
  (українською), а не мовчазне блокування.

## 4.7. Приклад seed-запису (XML, скорочено)

```xml
<record id="tmpl_gate_a" model="gis.checklist.template">
    <field name="name">ГЕЙТ A — стоп-фактори</field>
    <field name="code">gate_a</field>
    <field name="res_model">crm.lead</field>
    <field name="applies_to_type">lead</field>
    <field name="trigger_type">stage_enter</field>
    <field name="stage_id" ref="crm_stage_communication"/>
    <field name="is_gate" eval="True"/>
    <field name="gate_mode">all_required</field>
    <field name="version" eval="1"/>
    <field name="owner_group_note">Lead-gen</field>
</record>

<record id="tmpl_gate_a_l1" model="gis.checklist.template.line">
    <field name="template_id" ref="tmpl_gate_a"/>
    <field name="sequence" eval="10"/>
    <field name="name">Хто у вас вирішує, кому віддавати обробку даних?</field>
    <field name="help_text">«Ні»: відповідь ухиляється або виводять на людину без бюджету.</field>
    <field name="response_type">yes_no_unknown</field>
    <field name="is_required" eval="True"/>
    <field name="target_field">icp_a1_dm_reachable</field>
    <field name="fail_action">to_lost</field>
    <field name="fail_value">no</field>
</record>
<!-- ... ще 3 пункти icp_a2..icp_a4 ... -->
```

> Файл seed вантажиться з `noupdate="1"`. Після встановлення бізнес редагує ці
> записи в UI; наступні `-u gis_crm` їх не перезапишуть.
