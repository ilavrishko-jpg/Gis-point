# GisPoint — AI & ML: Стратегічний брейншторм (горизонт 3–5 років)

**Дата:** 2026-08-10 · **Статус:** робочий стратегічний артефакт до рішення CEO · **Ринки-фокус:** США · Канада · DACH · UK
**Метод:** зведення затверджених документів компанії (Google Drive) + актуальні тренди ринку (web, 2026) через дві лінзи — **маркетинг-позиціонування (geo-it-positioning)** і **стратегія (Scaling Up, зона Strategy)**.

> Дисципліна пруфів успадкована з `Positioning FINAL v2.1`: **numbers over adjectives**, кожен AI-output **expert-validated**, ніколи слово «outsourcing», «ми розширюємо команду, а не замінюємо». Гардрейли Spine v1.0 діють без винятків.

---

## 0. Що підключено (бази й скіли)

| Джерело | Що взято |
| :-- | :-- |
| **Positioning Decision (Spine) v1.0** | Хребет Process → Automate → Digitize → Product; правило single entry-rung; PRODUCT-гейт |
| **Positioning FINAL v2.1 · Two Named Units** | Unit 1 Production Partner / Unit 2 Software Technology Partner; battle cards (особливо BC-4 vs Automation SaaS) |
| **ICP FINAL v2 (data-validated, 93 акаунти, $1.96M)** | Де реально гроші: 30–100 люд = 54%; сегменти GEO/Agro/Defence; тригери |
| **Website Positioning · IT Unit v1.0** | 6 напрямів IT-юніту, зокрема **GeoAI/ML**, **AI Agents & Automation (MRR)**, **3D/Digital Twins** |
| **Web-тренди 2026 (EO/GeoAI/LLM/LiDAR)** | Ринок, зсув «від сцен до відповідей», foundation models, agentic geo, межі LLM у spatial |
| **Скіли** | `geo-it-positioning` (категорія/spearhead/say-no) · Scaling Up strategy-lens (X-factor, sandbox, cash vs growth vehicle) |

**Наявні AI/ML-активи компанії (verified proof-set):**
- **LiDAR-automation software** — унікальна лінія, якої немає в жодного з 6 профільних конкурентів.
- **AI-класифікація**: 500 km LiDAR за 3–4 дні при **97.2%**, потім expert-QA до **<7% rework** (галузь 15–40%).
- **GeoAI на геоданих**: NL→PostGIS (природномовний spatial-запит), predictive spatial (flood/crop yield/demand), EO/LiDAR AI-класифікація.
- **AgroDataHub** — GeoAI-централізація 6 джерел даних → time-to-report «2 дні → same-session»; Copernicus dashboard **40,000+ га (−30% виїздів агронома)**; **8,000 га NDVI за 48 год**.
- **Активи-докази під софт**: allgis.io (власний SaaS), PlateauGIS (delivered), Tec Solution $245K (IT-anchor).

---

## 1. Де AI/ML доречні й корисні — карта можливостей

### 1.1 Дві оптики (не плутати)

AI/ML для GisPoint працює у двох ролях, і їх треба тримати окремо:

1. **AI всередині (важіль маржі, не оффер).** Автоматизація власного production-конвеєра (класифікація, векторизація, QA). Продає не AI — продає **нижчу ціну за accepted deliverable + вищий throughput**. Це паливо nearshore-арбітражу і конвертер PROCESS→AUTOMATE-апселу. Клієнт цього не купує напряму; він купує результат.
2. **AI назовні (оффер, growth vehicle).** Те, що ми **продаємо як AI/ML-продукт чи білд**: GeoAI-пайплайни, spatial-агенти, predictive-моделі, digital twin з прогностичним шаром. Це Unit 2 і верх Spine.

> **Правило:** AI всередині фінансує кеш сьогодні (Unit 1), AI назовні будує IP/MRR завтра (Unit 2). Змішувати меседжі не можна — інакше ламається cash-machine-first.

### 1.2 Ринковий контекст 2026 (чому вікно відкрите саме зараз)

- Ринок geospatial intelligence: **$37.13B (2025) → $62.88B (2030)**; geo-analytics ≈ подвоєння до 2030.
- Головний зсув галузі: **«від продажу сцен — до продажу детекцій, скорів, прогнозів і workflow-ready відповідей»**. Це буквально рух угору по нашій Spine.
- П'ять трендів-2026: **GeoAI + vision foundation models · cloud-native spatial · real-time streaming замість файлів · зрілість 3D reality capture · digital twins під asset-management і compliance**.
- **Agentic geo**: spatial-агенти вже живуть усередині Claude/ChatGPT/Gemini Enterprise; NL→GIS multi-agent фреймворки (LLM→QGIS/PostGIS) з'явились у 2026.
- **АЛЕ**: LLM мають слабке spatial-reasoning, плутають системи координат і формати; LiDAR-DL дає ~0.91 precision — **не 100%**. Урядові/enterprise GIS хочуть AI, але не мають інфраструктури й компетенції його довести до production-довіри.

**→ Стратегічний висновок:** ринок наповнюється AI, що дає 83–97% — і саме тому дефіцитом стає **валідація, довіра, відповідальність за останні 3–17%**. Це не збіг із нашим позиціонуванням — це його підсилення. Наш існуючий принцип «expert-validated AI» з внутрішнього правила перетворюється на **категорійний клин ринку**.

### 1.3 Карта: де AI/ML доречні (Spine × Unit × ICP × ринок)

| Spine-рунга | AI/ML-застосування | Для кого (ICP) | Ринок US/EU/UK | Зрілість у нас |
| :-- | :-- | :-- | :-- | :-- |
| **PROCESS** (Unit 1, кеш) | AI-класифікація LiDAR/point cloud + автовекторизація, **завалідовані людиною**; AI-QA як другий контролер | Heads of Production, surveying/GIS 30–500 | US/CA/DACH/UK — усі | ✅ Робимо (97.2% + <7% rework) |
| **AUTOMATE** (bridge) | Перетворення повторюваного ручного workflow клієнта на **owned ML-пайплайн** (LiDAR-automation, spatial ETL) | Ті ж PROCESS-акаунти, що показали повторюваність | US/CA/DACH/UK | ✅ Owned IP, унікум |
| **DIGITIZE** (Unit 2, enterprise-only) | Digital twin з **прогностичним шаром**; GeoAI data-hub (уніфікація джерел + AI-інсайти + role dashboards) | CTO/Head of Product у GeoTech/AgriTech/утиліті | UK/DE/CA/US = software+processing шар (без польового збору) | 🟡 AgroDataHub/Copernicus = пруф, не масовий кеш |
| **PRODUCT** (venture, гейт) | Vertical GeoAI-продукти: forecast-as-a-service, spatial-агенти як SaaS | Co-build акаунти | US/UK | 🔴 0 R&D до закриття гейту §7 |

**Найдоречніші AI/ML-домени по індустріях (де в клієнтів реальний біль + бюджет):**

| Індустрія (наш ICP) | Де AI/ML дає гроші клієнту | Наш вхідний оффер |
| :-- | :-- | :-- |
| **Surveying / GIS / LiDAR** | авто-класифікація, авто-QA, corridor-екстракція | Validated AI Classification (PROCESS) |
| **Scan-to-BIM / AEC** | point cloud → clean geometry, auto-LOD | AI-assisted Scan-to-BIM (PROCESS) |
| **GeoTech / EO / Satellite SaaS** | «сцени → детекції/прогнози», foundation-model fine-tune, NL-аналітика | GeoAI Automation Sprint + NL→Spatial (AUTOMATE/DIGITIZE) |
| **AgriTech / precision ag** | yield/zone prediction, NDVI-моніторинг, data-fusion | GeoAI Data Hub (AgroDataHub-продукт) |
| **Utilities / Energy / Telecom** | vegetation encroachment, asset-risk, compliance-моніторинг | Spatial AI Agents (MRR) |
| **Insurance / PropTech** | risk-scoring по локації, change detection | Predictive Spatial Model (build) |
| **Defence-tech (warm-intro only)** | ISR/imagery pipelines, terrain, GPS-denied | Sprint, тільки network |

---

## 2. Три варіанти позиціонування на 3–5 років

Усі три **сумісні з хребтом Spine** (не замінюють його) — це три різні стратегічні ставки на те, **яким клином GisPoint заходить у AI-розмову** і де будує moat. Відрізняються за ризиком, дистанцією від кешу та амбіцією.

---

### 🅐 Варіант A — «The Validated GeoAI Layer» (клин ДОВІРИ)

**Одне речення:** *GisPoint — це expert-validated шар над GeoAI-автоматизацією: ми беремо швидкість AI і доводимо її до production-довіри з гарантованою точністю.*

- **Категорія:** «Validated GeoAI production» / «human-in-the-loop geospatial AI».
- **Ворог:** pure-automation SaaS (Flai/EdgeWise) з 50–91% і «майже готовим» виходом; і сліпа довіра до foundation-моделей.
- **Хто:** Heads of Production + EO/GeoTech-команди, що вже впровадили AI, але не можуть здати compliance-grade результат.
- **X-factor:** **опублікована гарантія якості** (<7% rework або виправляємо безкоштовно) + гібридний тір «приносьте свій AI-вихід — ми валідуємо й довозимо».
- **Проф:** 97.2% класифікації · <7% rework vs 15–40% · 500 km/4 дні · окремий QA-контролер.
- **Ринок US/EU/UK:** найширший і найшвидший — усі три юрисдикції купують «AI-швидкість без AI-ризику»; EU-data-residency як бонус.
- **Ризик:** низький. Найближче до кешу, майже нічого нового будувати не треба — треба **назвати** те, що вже робимо.
- **Мінус:** менш «вау», легше скопіювати меседж (але не пруф).

---

### 🅑 Варіант B — «Own-Your-GeoAI Engineering Partner» (клин ВЛАСНОСТІ / IP)

**Одне речення:** *GisPoint будує вашу власну GeoAI-машину — LiDAR-automation, spatial-ML-пайплайни, NL-аналітику — код і IP ваші з першого дня, без Esri-ренти й без dev-bench.*

- **Категорія:** «GeoAI engineering partner for product companies» (open-source, no lock-in).
- **Ворог:** vendor lock-in (Esri) + in-house DS-trap + OSS-консультанти, що продають ідеологію, а не власність коду.
- **Хто:** CTO/Head of Product у GeoTech/EO/AgriTech 20–200 (Seed–Series B), і **cross-sell у 23 GIS-акаунти з IT-компонентом ($1.04M бази)**.
- **X-factor:** paid **GeoAI Discovery Sprint** (фікс-ціна/дедлайн) → owned-IP build → **AI-агенти як MRR** (з 2027). LiDAR-automation, якої немає в 6 конкурентів.
- **Проф:** Tec Solution $245K · allgis.io · PlateauGIS · AgroDataHub.
- **Ринок US/EU/UK:** EE-ставка 2–3x нижча за Swiss/US/CA при тому ж стеку — сильний арбітраж; UK/DE — насичені GeoTech-скейлапи.
- **Ризик:** середній. Growth vehicle з найкращою маржею, але вимагає **DS/ML-глибини** й **≥1 публічного OSS-артефакту** (CTO sniff test) до outbound.
- **Мінус:** довший цикл продажу; конкуренти з OSS-cred (DevSeed/GeoSolutions) сильніші на довірі спільноти.

---

### 🅒 Варіант C — «Agentic Spatial Intelligence» (клин ФРОНТИРУ)

**Одне речення:** *GisPoint перетворює геодані на відповіді: spatial-агенти й прогностичні digital twins, що видають детекції, скори й прогнози — а не карти й файли.*

- **Категорія:** «agentic spatial intelligence» / «spatial answers, not scenes».
- **Ворог:** статична GIS-доставка (файли, звіти) і generic-LLM, що галюцинує на координатах.
- **Хто:** enterprise-DIGITIZE-акаунти + venture-co-build (утиліті, agri-holdings, insurance, smart-city).
- **X-factor:** vertical GeoAI-продукти (forecast-as-a-service, compliance-агенти, digital twin з predictive-шаром), grounded і expert-validated — саме там, де generic-агенти провалюються на spatial-reasoning.
- **Проф:** AgroDataHub (2 дні → same-session) · Copernicus −30% виїздів · 8,000 га NDVI/48h.
- **Ринок US/EU/UK:** найамбітніший наратив, найкраще резонує на конференціях (Esri IMGIS, Intergeo) і з інвесторами; але покупка довша й enterprise.
- **Ризик:** високий. Найдалі від кешу; активує **PRODUCT-гейт (§7 Spine)** — жодного co-build за equity до закриття ownership/IP-політики й окремого venture-P&L зі стелею ≤10–15% dev/ML-годин.
- **Мінус:** легко «злетіти» з cash-focus; вимагає governance-дисципліни.

---

### Порівняння й рекомендація

| Критерій | A · Довіра | B · Власність/IP | C · Фронтир |
| :-- | :--: | :--: | :--: |
| Дистанція від кешу | 🟢 близько | 🟡 середньо | 🔴 далеко |
| Spine-рунги | Process→Automate | Automate→Digitize | Digitize→Product |
| Готовність пруфів | 🟢 висока | 🟡 середня | 🟡 точкова |
| Маржа / MRR-потенціал | 🟡 | 🟢 | 🟢 |
| Ризик виконання | 🟢 низький | 🟡 середній | 🔴 високий |
| Швидкість входу US/EU/UK | 🟢 зараз | 🟡 6–9 міс | 🔴 12+ міс |

**Рекомендація (не «або-або», а секвенція — в дусі Spine «один хребет»):**

> **Вести Варіантом A як публічним acquisition-клином** (він і є expert-validated PROCESS/AUTOMATE, найближче до кешу й до правила single entry-rung). **Будувати Варіант B як earned-conversation усередині акаунтів** (owned-GeoAI-апсел = growth vehicle, Unit 2). **Тримати Варіант C як vision/venture за гейтом** — наратив для конференцій та інвесторів, але 0 R&D-авансу до §7.

Тобто **A = вхід, B = розширення, C = горизонт** — та сама механіка «acquisition з PROCESS, expand по драбині», лише прочитана мовою AI. Одне речення для OSP: *«Ми продаємо валідований GeoAI сьогодні (A), будуємо клієнтам власну GeoAI-машину завтра (B), і тримаємо агентний spatial-intelligence як venture-горизонт (C).»*

---

## 3. Чіткі AI/ML-оффери для ринку

Продуктизовані оффери, що **лягають на Spine й гардрейли**. Правило входу незмінне: **холодний acquisition — тільки O1–O3 (PROCESS/AUTOMATE)**; O4–O7 — earned conversation усередині платящого акаунта або warm.

| # | Оффер | Buyer / Unit / рунга | Вхід і логіка ціни | Пруф | Ринок |
| :-: | :-- | :-- | :-- | :-- | :-- |
| **O1** | **Validated AI Classification** — AI-класифікований LiDAR/point cloud, доведений expert-QA до спеки, гарантія <7% rework | Head of Production · Unit 1 · PROCESS | Paid benchmark (не free pilot) → від $5K/проект або retainer; «cost per accepted deliverable» | 97.2% · 500 km/4 дні · <7% rework | 🇺🇸🇨🇦🇩🇪🇬🇧 усі |
| **O2** | **Accuracy SLA / «AI-швидкість, людська точність — або виправляємо безкоштовно»** | Head of Production · Unit 1 · PROCESS | Продуктизована гарантія як окрема цінність (whitespace #1) | <7% rework метрика вже є | усі |
| **O3** | **«Bring-your-AI» refinement tier** — приймаємо авто-вихід клієнта (Flai/EdgeWise/foundation-model) зі знижкою → refinement + vectorization + QA | Head of Production / GIS Manager · Unit 1 · PROCESS→AUTOMATE | Знижений вхід, апсел у повний pipeline; знімає заперечення «софт це вже робить» (BC-4) | «готові не перші 73%, а 100%» | усі |
| **O4** | **GeoAI Automation Sprint** — перетворюємо ваш повторюваний ручний workflow на owned ML-пайплайн (LiDAR-automation / spatial ETL) | CTO / Production Lead · Unit 2 · AUTOMATE | Paid Discovery Sprint (фікс) → owned-IP build; апсел з PROCESS-акаунтів | LiDAR-automation (унікум) | усі |
| **O5** | **«Ask your GIS» — NL→Spatial аналітика** (LLM→PostGIS), grounded і expert-tuned на даних клієнта | CTO / Head of Product · Unit 2 · DIGITIZE | Sprint → build; MRR на підтримку/точність | NL→PostGIS у BA-доку; закриває slabке spatial-reasoning generic-LLM | 🇬🇧🇩🇪🇺🇸 |
| **O6** | **Spatial AI Agents (MRR)** — QA-агенти, route-optimization, compliance-monitoring, vegetation/asset-risk як managed monthly | Head of Ops / CTO · Unit 2 · DIGITIZE | Місячна плата (growth-vehicle MRR з 2027); enterprise-only | AI Agents напрям у BA-доку | утиліті/agri US/UK |
| **O7** | **GeoAI Data Hub / Digital Twin з predictive-шаром** — уніфікація джерел + AI-інсайти + role dashboards | CTO / Head of Product / Ops · Unit 2 · DIGITIZE (enterprise-only) | Enterprise-пілот, фінансується попитом (не платформа авансом) | AgroDataHub (2д→same-session) · Copernicus −30% · 8,000 га/48h | agri/insurance EU/US |

**Детально по трьох «спис-офферах»:**

- **O1 Validated AI Classification** — це наша cash-машина, чесно перейменована під AI-епоху. Не «ми проти AI» і не «AI все зробить», а **«AI + окремий expert-QA = єдиний, хто підписується під точністю»**. Найдешевша й найзахищеніша позиція; веде весь холодний вхід.
- **O4 GeoAI Automation Sprint** — головний R&D-міст наступних 2–3 кварталів (per Spine §8): конвертує PROCESS-акаунти (~$57K аналітики) у dev/ML-апсел (~$100K+/рік ARR). Owned IP = defensibility.
- **O6 Spatial AI Agents (MRR)** — єдиний оффер, що дає **рекурентний дохід** і перетворює сервіс на growth vehicle. Стартувати з compliance/vegetation-агентів для утиліті (US/UK), де біль регуляторний і повторюваний.

**Say-no (щоб оффери не розмивались):**
- Не продаємо «сирий AI без валідації» — це вбиває головний диференціатор.
- Не обіцяємо DIGITIZE-польовий збір поза Україною (Spine guardrail #5).
- Не заходимо в Defence-AI холодним outbound — тільки warm-intro.
- Не беремо клієнта, який хоче готовий SaaS (ми build/embed, не продаємо ліцензію).

---

## 4. Ризики й що валідувати перед запуском

| Ризик | Пом'якшення |
| :-- | :-- |
| **DS/ML-глибина** — оффери O4–O7 вимагають сеньйорних GeoAI-інженерів | Аудит наявних компетенцій; hiring-план; почати з O1–O4, де глибина вже є |
| **OSS-cred (CTO sniff test)** для B/O4–O5 | Опублікувати ≥1 OSS-артефакт (компонент allgis.io на GitHub) — прекондиція Unit 2 outbound (вже в D2) |
| **EU AI Act / data residency** | Зробити EU-residency й expert-validation частиною оффера (перевага, не тягар) |
| **Розмиття cash-focus** амбіцією C | Тримати C за PRODUCT-гейтом; стеля dev/ML-годин ≤10–15% з cash-роботи |
| **Пруф-консистентність** (сайт 100+/390+ vs канон 570+/17+) | Закрити перед публікацією AI-меседжів (Spine §9) |
| **Комодитизація AI-класифікації** конкурентами | Захист = опублікована гарантія + окремий QA + named-кейси, не сам алгоритм |

---

## 5. Що це змінює в OSP (Scaling Up) і наступні кроки

- **X-factor (зона Strategy):** «**expert-validated GeoAI** — швидкість AI під нашу гарантію точності» — стає стрижнем 3–5-річної стратегії й BHAG-наративу.
- **Cash engine vs growth vehicle:** O1–O3 = cash engine (тримати якість/throughput); O4–O7 = growth vehicle (owned IP + MRR).
- **Критичне число-кандидат:** *частка PROCESS-акаунтів, сконвертованих в AUTOMATE/GeoAI-апсел* (owner: техпартнер IT).

**Наступні кроки (owner · тригер · результат):**
1. **CEO-рішення:** затвердити секвенцію A→B→C і O1 як публічний AI-клин. *(Найближча квартальна сесія.)*
2. **Маркетинг:** вписати O1/O2 у hero й вертикальні сторінки (AI-меседж поверх Spine, без порушення single entry-rung). *(+2 тижні.)*
3. **IT-партнер:** оцінити DS/ML-глибину + опублікувати OSS-артефакт; спакувати O4 як paid Sprint. *(1 спринт.)*
4. **Sales:** додати O3 «bring-your-AI» у скрипт проти заперечення «софт це вже робить». *(наступний CRM-спринт.)*
5. **Governance:** якщо йдемо в C — винести PRODUCT/venture-гейт (§7 Spine) окремим Rock на Q3.

---

*Джерела компанії: Positioning Decision (Spine) v1.0 · Positioning FINAL v2.1 (Two Named Units) · ICP FINAL v2 (data-validated) · Website Positioning IT Unit v1.0. Тренди ринку 2026: Esri ArcNews (GeoAI foundation models) · Geoawesome (GeoAI in EO) · BioMedware / SurvTech (5 geospatial trends 2026) · Latitudo40 (EO trends 2026) · Taylor&Francis (multi-agent LLM→GIS) · CARTO (Google Next '26 geospatial AI) · lidarvisor / arXiv (LiDAR DL classification 2026). Лінзи: geo-it-positioning · Scaling Up (Strategy).*
