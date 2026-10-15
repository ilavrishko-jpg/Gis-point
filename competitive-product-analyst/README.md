# Competitor Analyst — агент конкурентного аналізу (Software + Hardware)

Повноцінний агент, який за **списком компаній** проводить конкурентний аналіз і видає звіт так,
як його зробив би сильний менеджер-аналітик конкурентних продуктів. Побудований на наборі навичок
[`SKILLSET.md`](./SKILLSET.md).

## Що робить
- Приймає список компаній/продуктів (+ контекст).
- Для кожної: збирає розвіддані (OSINT), робить teardown продукту (software і/або hardware),
  зводить у порівняльні матриці й SWOT, готує battlecards.
- Видає єдиний **звіт**: executive summary → ландшафт ринку → матриця → профілі → рекомендації →
  план моніторингу → джерела.

## Архітектура пакета
```
competitive-product-analyst/
├── SKILLSET.md                     # база знань: 14 блоків навичок аналітика
├── README.md                       # цей файл — як запускати
├── inputs.example.md               # шаблон вхідних даних
├── templates/report-template.md    # формат фінального звіту
├── reports/                        # сюди агент складає готові звіти
└── .claude/
    ├── agents/competitor-analyst.md        # агент-оркестратор (8-кроковий процес)
    └── skills/
        ├── competitor-recon/               # крок Collect — збір розвідданих
        ├── product-teardown/               # крок Teardown — розбір software/hardware
        ├── comparison-frameworks/          # крок Structure — матриці/SWOT/positioning
        └── analyst-report/                 # крок Deliver — збірка звіту
```

## Як запустити
**Варіант A — через Claude Code (агент):**
1. Переконайся, що Claude Code бачить `.claude/` цього пакета (запускай із теки
   `competitive-product-analyst/`, або скопіюй `.claude/agents/*` і `.claude/skills/*` у робочий
   `.claude/` репозиторію).
2. Виклич агента, передавши список: напр.
   > «Використай competitor-analyst: проаналізуй Trimble, Leica, Emlid. Наш продукт — ГІС + RTK GNSS,
   > ринок ЄС. Глибина standard. Вихід — звіт + battlecards.»
3. Агент створить todo-список (по компанії + синтез), пройде 8 кроків і збереже звіт у `reports/`.

**Варіант B — як промпт-інструкція:** дай моделі `SKILLSET.md` + `.claude/agents/competitor-analyst.md`
як системний контекст і встав список компаній із `inputs.example.md`.

## Робочий процес агента (8 кроків)
`Scope → Collect (recon) → Teardown/Trial → Structure (frameworks) → Verify → Synthesize →
Deliver (report) → Monitor`

Деталі кожного кроку — у `.claude/agents/competitor-analyst.md` і відповідних навичках.

## Гарантії якості (агент перевіряє перед видачею)
- Кожен конкурент: SWOT + позиція на карті + ≥1 battlecard-контраргумент.
- Наскрізна матриця **за сценаріями (JTBD)**, а не за сирими фічами.
- Кожен факт — джерело + дата; оцінки помічені `[оцінка]`; прогалини даних — явні.
- Executive summary ≤1 стор. і завершується рекомендаціями Now/Next/Watch.

## Етика й межі
Лише легальні методи: публічний OSINT, куплені зразки, офіційні демо/тріали, публічні teardown.
Без соціальної інженерії, порушення NDA чи промислового шпигунства. Бракує даних — пишемо
«невідомо», а не вигадуємо.
