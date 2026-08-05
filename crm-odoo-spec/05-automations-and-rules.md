# 05 · Автоматизації, тригери та constraints

Реалізація — через `base_automation` (Community), власні Server Actions
(`ir.actions.server`, Python code) та `ir.cron`. 🔴 P0 = без цього система не
працює. 🟢 = вже є в v1.1, тут лише фіксуємо/уточнюємо.

## 5.1. Реєстр автоматизацій

| # | Пріор. | Тригер | Умова | Дія | Власник | SLA |
|---|--------|--------|-------|-----|---------|-----|
| **A-01** | 🔴 P0 | `write()` Opportunity → Won або Lost | `open_opportunities=0 AND won_total≥1` | Contact → Farming · Account Owner · Next Action Date за тиром · задача AM · підписка на AM-розсилку | Account Manager | 3 роб. дні |
| **A-02** | 🔴 P0 | cron щодня 07:00 | Contact ≥ Qualified І (немає власника АБО статусу АБО `next_action_date < today`) | Звіт «Сироти» → Head of Sales + задача відповідальному | Head of Sales | 24 год |
| **A-03** | 🔴 P0 | save Contact у farming/winback/churned | `next_action_date` порожня/у минулому | `@api.constrains` — блок збереження | Owner | миттєво |
| **A-04** | 🔴 P0 | save Lead у Nurturing | `next_follow_up_date` порожня/у минулому | `@api.constrains` — блок збереження | Lead-gen | миттєво |
| **A-05** | 🔴 P0 | `write()` зміна `stage_id` (Lead/Opp) | Не заповнені обов'язкові поля стадії (§4.3 + дельта) **або чек-лист-гейт не пройдено** | `UserError`: «Заповніть: X, Y, Z» (див. [док. 04](./04-checklist-engine.md), 4.4.3) | Owner | миттєво |
| **A-06** | 🔴 P0 | перехід Opportunity → Contract | `dm_approved_proposal = False` | Блок переходу | Salesperson | миттєво |
| **A-07** | 🔴 P0 | перехід Opportunity → Won | `client_feedback_score` або `next_potential_project` порожні | Блок переходу | Account Manager | миттєво |
| **A-08** | 🔴 P0 | закриття Opportunity як Lost | `lost_reason_id`, `lost_feedback` (≥50) або `reengagement_date` порожні | Блок | Salesperson | миттєво |
| **A-31** | 🔴 P0 | перехід Lead → Presale | `icp_gate_a_passed = False` | Блок + перелік неперевірених умов | Lead-gen | миттєво |
| **A-32** | 🔴 P0 | будь-яке поле Gate A = `no` | — | Авто-перехід Lead → Lost, причина = назва умови (структурна перешкода) | Lead-gen | миттєво |
| **A-33** | 🔴 P0 | конвертація Lead → Opportunity | `icp_gate_b_score < 3` | ≤1 → блок + пропозиція Lost; 2 → блок + пропозиція Nurturing з датою | Lead-gen | миттєво |
| **A-09** | P1 | cron щодня | Contact farming, 180 днів без нової Opp | Contact → Win-back + задача win-back | Account Manager | 7 днів |
| **A-10** | P1 | cron щодня | Contact winback, 365 днів | Contact → Churned + обов'язковий пост-мортем | Account Manager | 7 днів |
| **A-11** | P1 | cron щодня | Contact churned, 180 днів | 🔁 Contact → Farming + задача AM. **КОЛО ЗАМИКАЄТЬСЯ** | Account Manager | 3 роб. дні |
| **A-12** | P1 | cron щодня | Настала `next_action_date` на Contact | Задача AM «Дотик по акаунту» | Account Manager | 3 дні |
| **A-13** | P1 | cron щодня | Настала `next_follow_up_date` на Lead у Nurturing | Задача Lead-gen + реактивація в Communication | Lead-gen | 3 дні |
| **A-14** | P1 | пропущено 2 планових дотики поспіль | Contact active/farming | Ескалація Head of Sales + акаунт у тижневий огляд | Head of Sales | тиждень |
| **A-15** | P1 | перехід Campaign → Active | `assets_ready = False` | 🔴 Блок. Кампанія без матеріалів працює проти нас | Marketing | миттєво |
| **A-16** | P1 | конвертація Lead → Opportunity | Contact з таким доменом уже існує | Opportunity чіпляється до наявного Contact, новий НЕ створюється | Система | миттєво |
| **A-17** | P1 | webhook LinkedIn Helper: accepted | LinkedIn ID уже в базі | 🟢 Новий Lead не створюється, логується спроба (v1.1 §7.1) | Система | миттєво |
| **A-18** | P1 | Lead у Nurturing, Decision-Maker Role=Colleague | — | 🟢 «no push» — sequence не запускається (v1.1 §8.2) | Система | миттєво |
| **A-19** | P1 | Contact=Customer потрапляє у холодний сіквенс | — | 🔴 Блок. Клієнта не бомбити холодним аутрічем | Система | миттєво |
| **A-20** | P2 | Lead у New >3 днів | Немає активності | Задача Lead-gen | Lead-gen | 24 год |
| **A-21** | P2 | Opportunity у Discovery 7/14 днів | ТЗ не отримано | 🟢 7д: задача «Допомога з ТЗ»; 🔴 14д: ескалація | Salesperson | 3 дні |
| **A-22** | P2 | Opportunity у Proposal 7/14/21 день | Немає реакції | 7д нагадування · 14д автофоловап · 21д → Nurturing L3, угоду закрити як провалену «пропав клієнт» | Salesperson | за схемою |
| **A-23** | P2 | Opportunity → Contract | — | Задача «Підписати договір» 3 дні, прострочення → ескалація | Salesperson | 3 дні |
| **A-24** | P2 | знижка вище порога | перехід у Contract | Блок переходу без погодження Head of Sales | Head of Sales | 2 дні |
| **A-25** | P2 | 1 число місяця | є Opportunity у Project | Нагадування PM (рапорт) і Finance (інвойс до 5 числа) | PM/Finance | 5 днів |
| **A-26** | P2 | `actual_man_hours > estimated_man_hours × 1.2` | Opportunity у Project | Project Health → червоний + ескалація Head of Production | PM | 3 дні |
| **A-27** | P2 | `account_health` → червоний | Contact active/farming | Пріоритетна задача AM + видимість Head of Sales | Account Manager | 5 днів |
| **A-28** | P2 | email відбивається / LinkedIn неактивний | Contact ≥ Customer | Задача «Знайти нову контактну особу». Акаунт НЕ втрачається | Account Manager | 14 днів |
| **A-29** | P2 | Opportunity закрито з `client_feedback_score ≥ 8` | — | Задача «Запросити рекомендацію або згоду на кейс» | Account Manager | 14 днів |
| **A-30** | P2 | LinkedIn Profile заблоковано | — | Задача Lead-gen + перерозподіл черги на інші профілі | Lead-gen | 24 год |

## 5.2. 🔴 A-01 — тригер «нуль відкритих угод» (детальний псевдокод)

Головна автоматизація системи. Server Action на `crm.lead` (`type=opportunity`),
тригер `base_automation` = on write при зміні `stage_id` на Won або Lost.

```python
# Тригер: write() на crm.lead (type=opportunity) при зміні stage_id на Won/Lost
def gis_recompute_account_on_stage(opportunity):
    # Крок 1
    partner = opportunity.partner_id
    if not partner:
        return                                   # угода без партнера — вийти

    company = partner.commercial_partner_id      # завжди працюємо на рівні компанії/акаунта

    # Крок 2: лічильники (див. док. 03, поля D-06 — обчислювані store)
    open_stages = ['New', 'Discovery', 'Proposal', 'Pilot', 'Contract', 'Project']
    company.open_opportunities = count(crm.lead
        where partner_id child_of company
          AND type == 'opportunity'
          AND stage_id.name in open_stages
          AND active == True)

    # Крок 3
    company.won_total = count(... AND stage_id.name == 'Won')
    company.active_projects = count(... AND stage_id.name == 'Project')
    company.last_project_end_date = max(date_closed where stage == 'Won')

    # Крок 4: гейт головного тригера
    if not (company.open_opportunities == 0 and company.won_total >= 1):
        return                                   # ELSE — нічого не змінювати

    # Крок 5
    company.account_status = 'farming'
    if not company.account_owner_id:
        company.account_owner_id = default_account_manager()   # або по правилу розподілу

    # Крок 6: ритм за тиром
    delta = {'a': 21, 'b': 42, 'c': 90}.get(company.icp_tier, 42)
    company.next_action_date = today() + working_days(delta)    # роб. дні за календарем компанії

    # Крок 7: задача AM
    create mail.activity(
        res_model='res.partner', res_id=company.id,
        summary='План розвитку акаунта — останній проєкт завершено',
        user_id=company.account_owner_id,
        date_deadline=today() + working_days(3))

    # Крок 8: задача не закривається, поки не заповнені (реалізується чек-листом dev_plan, док. 04/07):
    #   client_feedback (на угоді), next_potential_project, reason_for_no_deals, next_action_date

    # Крок 9: підписка на AM-розсилку за напрямком (ГІС або ІТ), НЕ холодний сіквенс
    subscribe_am_newsletter(company, unit=opportunity.unit)
```

**Симетричне правило (перерахунок при будь-якій зміні):** якщо відкритих 0 і
партнер **був** клієнтом (`won_total≥1`) → `farming`; якщо відкритих 0 і клієнтом
**не був** → стан живе в Lead·Nurturing (акаунт не чіпаємо); якщо відкритих >0 →
нічого не змінюється.

## 5.3. 🔴 Обчислювані лічильники Contact (реалізація D-06)

- `open_opportunities`, `active_projects`, `won_total`, `last_project_end_date` —
  `compute` зі `store=True`, `@api.depends` на дочірніх `crm.lead`
  (`partner_id`, `stage_id`, `type`, `active`, `date_closed`).
- Через відсутність прямого `@api.depends` на «кількість дочірніх з умовою», покрити
  перерахунок ще й Server Action A-01 (write на Won/Lost) — щоб гарантовано ловити
  зміни стадій. Обидва механізми дають однаковий результат (ідемпотентно).
- `post_init_hook`: одноразовий перерахунок для всіх наявних Contact за таблицею
  істинності ([док. 03](./03-data-model-and-fields.md), 3.8), щоб мігрувати поточну базу.

## 5.4. 🔴 Zero-Orphan (A-02) — деталізація

**Правило.** Жоден Contact зі статусом ≥ Customer не існує без трьох атрибутів:
`account_owner_id ≠ порожньо`, `account_status ≠ порожньо`, `next_action_date ≠
порожньо і ≥ сьогодні`.

**Реалізація — два рівні:**
1. `@api.constrains('account_status','account_owner_id','next_action_date')` на
   `res.partner` — не дає зберегти запис-порушник (миттєвий рівень, A-03).
2. `ir.cron` щодня о 07:00 — ловить порушників, що виникли не через форму
   (масові дії, імпорт, зміна дат часом):

```python
def cron_zero_orphan():
    violators = res.partner.search([
        ('lifecycle_stage', 'in', ['customer']),         # ≥ Qualified/Customer
        '|', '|',
            ('account_owner_id', '=', False),
            ('account_status', '=', False),
            ('next_action_date', '<', today()),
    ])
    for p in violators:
        classify(p)  # тип 1: без власника / тип 2: прострочена дата / тип 3: мертвий контакт
        create mail.activity(user_id=p.account_owner_id or head_of_sales,
                             summary='Сирота: %s' % reason, date_deadline=today()+1)
    build_report(violators)  # звіт Head of Sales
```

**Три типи сиріт:** (1) без власника — людина звільнилась/акаунт не передали;
(2) прострочена `next_action_date` — забули; (3) мертвий контакт — email
відбивається / LinkedIn неактивний → задача знайти нову контактну особу, **акаунт
НЕ втрачається** (A-28).

**Метрика Orphan Rate** = `# порушників / # активних акаунтів`. Ціль **< 2%**.
Реалізується як збережений Pivot/фільтр; дивимось на тижневій зустрічі. SLA
виправлення — 24 год; повторне порушення по тому ж акаунту — на тижневу зустріч.

## 5.5. Єдина точка блокування переходів (A-05, A-06, A-07, A-08, A-31, A-33)

Усі блокування переходів стадій реалізувати в **одному** перевизначеному `write()`
на `crm.lead` (і окремо на `res.partner` для `account_status`), який:
1. Визначає `target_stage`/`target_status`.
2. Викликає перевірку обов'язкових полів стадії (§4.3 v1.1 + дельта з [док. 03](./03-data-model-and-fields.md)).
3. Викликає перевірку чек-лист-гейта поточної стадії ([док. 04](./04-checklist-engine.md), 4.4.3).
4. Викликає спец-гейти: Gate A (`icp_gate_a_passed`) для Presale, Gate B
   (`icp_gate_b_score`) для конвертації, ОПР для Contract, Feedback для Won.
5. Кидає `UserError` з людиночитним переліком незаповненого (українською).

> Не розкидати перевірки по багатьох `base_automation`-правилах з дією «блокувати» —
> це важко супроводжувати. Одна точка + декларативна таблиця обов'язкових полів
> (можна винести у той самий чек-лист-механізм).

## 5.6. Cron-задачі (зведення)

| Cron | Розклад | Дія | Автоматизації |
|------|---------|-----|---------------|
| `cron_zero_orphan` | щодня 07:00 | звіт «Сироти» + задачі | A-02 |
| `cron_account_lifecycle` | щодня | Farming→Win-back (180д), Win-back→Churned (365д), Churned→Farming (180д) | A-09, A-10, A-11 |
| `cron_due_actions` | щодня | задачі по настанню `next_action_date` (Contact) і `next_follow_up_date` (Lead) | A-12, A-13 |
| `cron_stale_stages` | щодня | New>3д, Discovery 7/14д, Proposal 7/14/21д | A-20, A-21, A-22 |
| `cron_monthly_billing` | 1 число | нагадування PM/Finance | A-25 |

Усі cron-и: батчами (`limit`), ідемпотентні (перевірка поточного стану перед
зміною), логування кількості оброблених записів.
