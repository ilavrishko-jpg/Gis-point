# Крок 6: карта ЛПР під юніт

Принцип: **ЛПР шукається під юніт і під індустрію**, а не «CEO компанії».
Канон buyer'ів: **Head of Production / Ops Director / GIS Manager** (Unit 1) ·
**CTO / Head of Product / Founder** (Unit 2).

У кожній компанії шукаємо до 4 ролей: **ЛПР** · **економічний покупець** · **чемпіон** · **гейткіпер**.

## Unit 1 · GIS Engine (обробка геоданих, Scan-to-BIM)

| Роль | Типові тайтли |
|---|---|
| **ЛПР** | Head of Production · Production Manager · Operations Director · GIS Manager · Head of Geospatial · Chief Surveyor · Head of Mapping · BIM Coordinator (AEC) · Technical Director (AEC) · Asset/GIS Manager (utilities) |
| **Економічний покупець** | COO · Managing Director · Country Manager · VP Delivery |
| **Чемпіон** | Senior Photogrammetrist · Point Cloud Operator · LiDAR Processing Lead · Project Manager · QA Lead |
| **Гейткіпер** | Procurement · Vendor Manager (500+) |

Сигнали пошуку: сторінка Team/About · портфоліо (хто підписаний керівником проєкту) ·
вакансії GIS Analyst / Point Cloud Operator / Survey Tech / BIM Coordinator · пости про виграні тендери.

## Unit 2 · IT / GeoAI Engine (софт, автоматизація, платформи)

| Роль | Типові тайтли |
|---|---|
| **ЛПР** | CTO · Head of Technology · VP Engineering · Head of R&D · Head of Product · Director of Engineering · Head of Platform · Founder (10–30) |
| **Економічний покупець** | CEO · CPO · CIO · Program Director (500+) |
| **Чемпіон** | Lead Developer · Product Owner · GIS Analyst · Solution Architect · Engineering Manager |
| **Гейткіпер** | Procurement · Security / Compliance (on-prem, держпроєкти) |

Сигнали пошуку: вакансії (стек = їхні прогалини — легасі Esri, ArcObjects, ArcGIS Server 10.x,
ArcGIS JS API 3.x) · технічний блог · GitHub · доповіді на технічних треках · changelog продукту.

## UAV / Drone manufacturers і DefenseTech ⚠

**Канон:** buyer — **CTO / Co-founder**; тригер — нова product-line або раунд.
**Defence — тільки warm-intro, ніколи cold** (стосується письмових дотиків).

| Роль | Типові тайтли (для пошуку в делегації та програмі) |
|---|---|
| **ЛПР напрямку** | Head of Navigation · Navigation Lead · GNC Lead (Guidance, Navigation & Control) · Head of Autonomy · Head of Avionics · Director of Flight Software · Systems Engineering Manager · Chief Engineer |
| **Керівник ЛПР** (і цільова особа за каноном) | **CTO · Co-founder** · VP R&D · Technical Director |
| **Чемпіон** | Senior GNC Engineer · Perception / Computer Vision Engineer · Sensor Fusion Engineer · Flight Software Engineer |
| **Гейткіпер** | Export Control / Compliance · Procurement |

**Наша амуніція для цієї розмови:** кейс `uav-geolocation-gps-denied` — **медіанна похибка 3,34 м проти
RTK · 154 зі 155 кадрів локалізовано · <1 сек на фото** (verified, підтверджено 01.09.2026), і крос-лінк
на проєкт FLY BY.

**Якщо навігаційної ролі в компанії немає** — це сигнал, що функція не покрита власною командою.
Заходимо на Chief Engineer / CTO, але **тільки в живій розмові на стенді**; письмовий cold — ні.

Сигнали пошуку: доповіді про автономність і роботу без GNSS · патенти (terrain referenced navigation,
visual odometry, GNSS-denied) · публікації · вакансії sensor fusion / GNC / VIO · участь у DIANA/NATO, Brave1.

## Рівень входу за розміром

| Розмір | Основна ціль | Хто ще потрібен |
|---|---|---|
| 10–30 | Founder / CTO | — |
| **30–200 (ядро)** | ЛПР функції | чемпіон (деталі) + економічний покупець (бюджет) |
| 200–500 | ЛПР юніта/дивізіону | чемпіон обов'язково |
| 500+ | Чемпіон → через нього на ЛПР | гейткіпер відомий заздалегідь |

**HC = 1 (соло):** ICP Fit override = 0, DM cap = 2. Одна людина ≠ «Tier-1 угода + C-level».

## Валідація людини — 3 перевірки (усі обов'язкові)
1. **Роль актуальна** — профіль/сторінка оновлені, тенюр ≥6 міс, немає ознак зміни роботи.
2. **Відповідальність збігається з юнітом** — у ролі, доповідях чи постах видно саме цю функцію.
3. **Ознака присутності на виставці** — спікер у програмі · згаданий в анонсі · власний пост ·
   у складі делегації. Немає ознаки → `at_expo = unknown`, Access знижується.

## Канали контакту (Intent-2b)

| Стан | Бали | Коментар |
|---|---|---|
| ≥1 ЛПР з верифікованим email **або підтвердженим LinkedIn-маршрутом** | 25 | Підтверджена присутність ЛПР на стенді зараховується як маршрут |
| ЛПР знайдений, каналу немає | 15 | Ціль — знайти його на стенді |
| ЛПР немає | 0 | Компанія не може бути Tier 1 |

**Email за патерном** (`f.last@domain`) — лише з міткою `email_status = pattern`. Це гіпотеза для
верифікації, не контакт: на «pattern» не пишемо чутливого і не масштабуємо розсилку.
Перед виставкою маємо ціль — **верифікований email або підтверджений LinkedIn-маршрут** (гейт G6).

## Що фіксувати після Кроку 6
`full_name` · `title` · `bu_role_type` · `linkedin_url` · `email` + `email_status` · `at_expo` ·
`source_url` · `confidence`.
