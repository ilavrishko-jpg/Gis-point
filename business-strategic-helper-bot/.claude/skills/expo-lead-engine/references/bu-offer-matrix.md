# Крок 5: ICP-клас × розмір → юніт → оффер → тригер

> Правило №1: **один акаунт = один юніт у першій розмові.** IT і ГІС офери не змішуються на одному
> акаунті — це канон (рішення 11.08.2026), а не стилістика.
> Правило №2: **холодний вхід — тільки data-led (Unit 1 / PROCESS).** IT-драбина — це «куди ведемо»,
> не другий холодний мотор.

## Матриця вибору юніта

| ICP-клас | 10–30 | 30–200 (ядро) | 200–500 | 500+ |
|---|---|---|---|---|
| **Unit 1 · GIS/Survey/LiDAR** | U1 · demo dataset → O1 | **U1 · O1/O2 → dedicated team** | U1 у виробничий дивізіон | U1 expand-only |
| **Unit 1 · AEC / Scan-to-BIM** | U1 · demo scan | **U1 · Scan-to-BIM → O7** | U1 у BIM-департамент | expand-only |
| **Unit 2 · IT-GEO** | U2 · Discovery Sprint (**за гейтом: warm/inbound**) | **U2 · Discovery → Automation** | U2 у продуктову лінійку | U2 через чемпіона |
| **Energy / Utilities** | — | **U1 · O1 (corridor/asset) → O6+O7** | U1/U2 у департамент експлуатації | технічний чемпіон |
| **Unit 2 · Agro / AgriTech** | U2 · agri-hub | **U2 · O4 → farm twin** | U2 у продуктовий юніт | expand-only |
| **Unit 2 · Defence / UAV (warm)** | **тільки warm-intro** | **тільки warm-intro** | тільки warm-intro | тільки warm-intro |

## Мапа індустрій — вхід, шлях, оффер, buyer, тригер (канон SSOT §7)

| Індустрія | Вхід (з чого починаємо розмову) | Шлях A→Z | Оффер | Buyer | Тригер |
|---|---|---|---|---|---|
| **GIS / Geodesy (+ продуктові GeoTech)** | Розширюємо відділ обробки: Validated AI Classification, `<7% rework` | Process→Build→Automate→Digitize→Decide | O1 → O4 → owned tooling | GIS Manager / Head of Production → CTO | job post GIS Analyst ≤48 год · Esri renewal · «migrating to QGIS» |
| **Surveying / LiDAR** | Post-tender backlog, QC-ready same-day, без найму | Process→Automate→Build(portal)→Decide | demo dataset → dedicated team → O4 | Head of Production | won tender · job post Point Cloud Operator |
| **Agro / AgriTech** | Звести розрізнені дані в одну картину (IoT-fusion + agri-hub) | Process→Integrate→Automate(NDVI/zones)→Digitize(farm twin)→Decide | O7/O4 → farm app | CTO / Head of Product; MD / Head of Agronomy | Series A/B precision-ag · satellite partnership |
| **Construction / AEC** | Scan → LOD 100–400 Revit/IFC/DWG, QC на нашому боці | Process→Build→Automate→Digitize(as-built twin)→Decide | demo scan → Scan-to-BIM → O7 | BIM Coordinator / Technical Director | won scan · перевантажена BIM-команда |
| **Real Estate / Facility owners** | 3D-оцифрування в digital twin | reality-capture→Digitize→Automate(agents)→Decide | O7 Digital Twin (enterprise-пілот) | Facilities / Ops Director; Developer CTO | нова будівля · ESG-мандат |
| **Utilities / Energy** | Corridor/asset LiDAR classification | Process→Automate→Digitize(asset twin)→Decide | O6 + O7 (spatial-AI agents на MRR) | Asset / GIS Manager | rail/utility tender |
| **Telecom (fibre)** | Production-grade записи мережі | Process→Build(SDI/portal)→Automate→Digitize(network twin)→Decide | portal + automation | Network / GIS Manager | fibre rollout · NUAR |
| **UAV / Drone manufacturers** | Будуємо навігацію (GPS-denied) і onboard-софт | Build→GeoAI/ML(drone-nav)→Autonomy→onboard decisions | O4 → owned build | **CTO / Co-founder** | нова product-line · раунд |
| **Logistics & Mobility** | HD ground truth з LiDAR | Process→GeoAI(HD-maps)→Build(routing)→Automate(route agents, MRR)→Digitize | O4 → routing / HD-maps | CTO / Head of Product | AV-програма |
| **DefenseTech** ⚠ warm-intro only | Terrain / ISR pipelines | Process→Automate(ISR)→GeoAI(GPS-denied nav)→Build(C2)→Decide | — | CTO / Co-founder | DIANA/NATO · Brave1 |

## Офери з цінами (що можна називати)

**Unit 1:** O1 Validated AI Classification (`<7% rework`) — demo dataset → від **$5K** · O2 Accuracy SLA ·
O3 Bring-your-AI refinement · Dedicated back-office team 1–10 FTE, NDA, **старт 2 тижні**.

**Unit 2:** Platform Discovery Sprint **£3–8K** (ENTRY, credited) · Geo-Workflow Automation Sprint
**£8–15K/workflow** (credited) · GeoData Platform Build (project/team, ціна — рішення CEO) ·
«Ask your GIS» (build + MRR) · Spatial AI Agents (MRR) · Digital Twin / FM (enterprise-пілот) ·
(+Product) UAV GPS-denied навігація (venture / за гейтом).

> На стенді **не називаємо терміни й ціни проєкту**. Ціна ENTRY-сходинки — єдине, що можна назвати,
> і лише коли питають прямо.

## Тригери, які шукаємо в каталозі та на сайті компанії (Intent-2a)

**Сильні (≤14 днів, 60 балів):** won tender · вакансія GIS / Point-cloud / BIM ≤48 год · CTO hire ·
Series A+ · вікно Esri renewal.
**Середні (15–45 днів, 40 балів):** «migrating to QGIS» · legacy ArcGIS (ArcObjects, ArcGIS Server 10.x,
ArcGIS JS API 3.x) · нова Scan-to-BIM лінія.
**Сталий дата-поінт (20 балів):** тех-стек · no-bench · vendor-fit.
**Немає приводу — 0.** Пара «подія + стан» = розмова; сам по собі стан не працює.

**Виставкові тригери (специфічні, шукати в програмі й анонсах):** тема доповіді компанії ·
анонс нового продукту чи сенсора до виставки · вихід на новий регіон · нове партнерство ·
співвиставка з вендором, чий стек ми замінюємо.

## Що фіксувати в базі після Кроку 5
`ICP-клас` · `target_unit` (U1/U2) · `offer` (конкретна сходинка драбини) · `Сигнал (цитата)` ·
`Дата сигналу` · `sources`. Немає датованого сигналу → Intent-2a = 0, і це видно в тірі.
