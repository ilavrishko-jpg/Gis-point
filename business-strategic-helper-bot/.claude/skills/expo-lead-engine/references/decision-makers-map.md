# Крок 6: карта ЛПР під бізнес-юніт

Принцип: **ЛПР шукається під BU, а не під компанію.** «CEO» — правильна ціль лише в треку `Fast`.
У кожній компанії шукаємо до 4 ролей: ЛПР функції · економічний покупець · чемпіон · гейткіпер.

## BU-1 — Обробка геоданих

| Роль | Типові тайтли |
|---|---|
| **ЛПР (власник функції)** | Head of Data Production · Production Manager · Head of Geospatial · Head of Mapping · GIS Manager · Chief Surveyor · Head of Photogrammetry · Operations Director |
| **Економічний покупець** | COO · Managing Director · VP Delivery · Country Manager |
| **Чемпіон** | Senior Photogrammetrist · LiDAR Processing Lead · Project Manager (geodata) · QA Lead |
| **Гейткіпер** | Procurement · Vendor Manager (в Enterprise) |

Сигнали пошуку: сторінка Team/About, портфоліо проєктів (хто підписаний як керівник), вакансії
«photogrammetry / point cloud / GIS technician», доповіді на профільних конференціях, LinkedIn-пости
про завершені проєкти.

## BU-2 — Розробка ПЗ

| Роль | Типові тайтли |
|---|---|
| **ЛПР** | CTO · VP Engineering · Head of R&D · Head of Software · Director of Engineering · Head of Platform · Head of Product (коли рішення продуктове) |
| **Економічний покупець** | CEO (Fast/Core) · CPO · CIO · Program Director (Enterprise) |
| **Чемпіон** | Tech Lead · Solution Architect · Product Manager · Engineering Manager |
| **Гейткіпер** | Procurement · Security/Compliance (для on-prem і держпроєктів) |

Сигнали пошуку: розділ вакансій (стек = їхні прогалини), GitHub/технічний блог, доповіді на
технічних треках, патенти, changelog продукту, партнерські сторінки.

## BU-3 — Навігаційні рішення для БПЛА (пріоритетний фокус)

| Роль | Типові тайтли |
|---|---|
| **ЛПР (власник напрямку)** | Head of Navigation · Navigation Lead · GNC Lead (Guidance, Navigation & Control) · Head of Autonomy · Head of Avionics · Director of Flight Software · Systems Engineering Manager · Chief Engineer |
| **Керівник ЛПР (коли ЛПР не знайдено або трек Enterprise)** | CTO · VP R&D · VP Engineering · Technical Director · Head of Product (платформа) |
| **Економічний покупець** | CTO · Program Manager (держпрограми) · COO |
| **Чемпіон** | Senior GNC Engineer · Perception / Computer Vision Engineer · Flight Software Engineer · Sensor Fusion Engineer |
| **Гейткіпер** | Export Control / Compliance · Procurement |

Сигнали пошуку: доповіді на конференціях по автономності й навігації, патенти (ключові слова:
terrain referenced navigation, visual odometry, GNSS-denied), наукові публікації, вакансії
«sensor fusion / GNC / VIO», технічні вебінари, участь у програмах МО.

> Якщо в компанії немає окремої навігаційної ролі — це **не мінус, а сигнал**: функція не покрита,
> заходимо на Chief Engineer / CTO з тезою «ця частина зазвичай не покривається власною командою».

## Правило вибору рівня входу
| Трек | Основна ціль | Хто ще потрібен |
|---|---|---|
| `Fast` | Founder / CTO | — |
| `Core` | ЛПР функції | чемпіон (для деталей), економічний покупець (для бюджету) |
| `Divisional` | ЛПР юніта | чемпіон обов'язково |
| `Enterprise` | Чемпіон → через нього на ЛПР | гейткіпер відомий заздалегідь |

## Валідація людини (3 перевірки, всі обов'язкові)
1. **Роль актуальна** — профіль/сторінка оновлені, немає ознак зміни роботи; тенюр ≥6 міс.
2. **Відповідальність збігається з BU** — у описі ролі, доповідях або постах видно саме цю функцію,
   а не суміжну.
3. **Ознака присутності на виставці** — спікер у програмі · згаданий в анонсі компанії · власний пост ·
   у складі делегації. Немає ознаки → `at_expo = unknown`, знижуємо бали доступності.

## Канали контакту (пріоритет)
1. Розмова на стенді (найвища конверсія — використовуємо як основну ціль).
2. LinkedIn з приводом (спільна тема доповіді, анонс компанії, публікація людини).
3. Email — **тільки верифікований**. Патерн `f.last@domain` допустимий із міткою `email_status = pattern`,
   у листі на «pattern» не пишемо чутливого і не масштабуємо розсилку.
4. Через чемпіона/загальний контакт компанії — коли ЛПР не знайдено.

## Що фіксувати в базі після Кроку 6
`full_name`, `title`, `bu_role_type`, `linkedin_url`, `email_status`, `at_expo`, `source_url`, `confidence`.
ЛПР не знайдено → `score_dm ≤ 5` і компанія не може бути тіром A.
