# GIS Point: стратегія виходу на комерційний ринок США (дослідження)

Дата: 2026-10-13
Мова: українська. Назви компаній, продуктів і джерел залишені англійською.

## Контекст для наступного бота

- **Компанія:** GIS Point (Україна), геопросторові послуги. Поточний основний бізнес: послуги для GIS/survey/LiDAR-mapping компаній.
- **Мета:** знайти нішу, де один клієнт купує послуги на 1–3–5 років і платить $300–500k на рік. Вийти на оборот **$15M за 5 років**.
- **Ідея засновника:** працювати як інтегратор за моделлю Odoo, але в гео-ніші. Odoo беруть лише як механіку: сертифікація, вендорський канал, повторювані пакети, довгі проєкти (як міграція з 1С на Odoo, що займає рік і більше). Також: перехід «папір → веб», повний сервіс «як GIS-компанія». Esri вважається монополією, шукати інші пакети.
- **Обмеження:** тільки **комерційні клієнти**, без держорганів і державних структур. Ринок: **США** (за потреби Європа).
- **Гіпотези засновника:**
  1. GIS/geo/surveying/LiDAR mapping компанії (поточний основний бізнес).
  2. Mobile mapping компанії (в оригіналі «gynger»; що це за компанія, не з'ясовано).
  3. Інтегратор «як Odoo» у цій ніші.
  4. White-label all-GIS + кастомна розробка + інтеграція.
- **Важливо про якість даних:** частина цифр взята з пам'яті моделі і не перевірена (позначено «з пам'яті»). Пошукові результати переважно з пресрелізів і сторінок самих компаній, клієнтські заяви в них самозвітні. Оборотів, штату й умов контрактів у пошуку не знайдено. Усі ціни та ринкові оцінки потребують перевірки.

---

## 1. Висновок у стислому вигляді

1. Чотири гіпотези це **одна драбина**, а не чотири бізнеси: виробництво даних (1, 2) продається за моделлю інтегратора (3), а white-label платформа (4) будується з модулів, які вже доставлені мінімум тричі.
2. **Каша-двигун:** white-label виробнича команда («pod») для survey/LiDAR-фірм і mobile mapping компаній. Pod з 6 фахівців ≈ $36k на місяць ≈ **$430k на рік** (припущення: ~$6k за людину на місяць, перевірити за реальними витратами).
3. **Модель Odoo підтверджена на ринку:** сервісна компанія як регіональний дистриб'ютор і support-партнер нішевого вендора (приклад: BAAM.Tech/GBA для Terrasolid у Північній Америці з 2023 року).
4. Дистрибуція ліцензій сама по собі дає мало (приклад: 100 ліцензій × $4k × маржа 20–30% ≈ $80–120k, ілюстрація). Цінність у тому, що клієнту з ліцензією потрібні люди, і це ваші послуги.
5. Ринок аутсорсу LiDAR-обробки конкурентний, дешевше працюють індійські компанії. Позиція: якість, довіра, робота як продовження команди клієнта.
6. Ключові ризики: концентрація на кількох клієнтах, довіра до offshore (SOC 2, безпека), необхідність американської присутності (юрособа, продажі), найм ~200 фахівців до 5-го року.

---

## 2. Шлях до $15M

Припущення: ~$72k виручки на одну білувану людину на рік, тобто $15M ≈ 200 білованих фахівців.

| Рік | Фокус | Оборот |
|---|---|---|
| 1 | Survey-фірми, один mobile mapper, субпідряд, SOC 2 | $1.5–2.5M |
| 2 | ~8 pod-ів, 2–3 проєкти, mobile mapping як ядро | $4–5M |
| 3 | ~14 pod-ів, проєкти, перші підписки, перший прямий асет-власник | $7–9M |
| 4–5 | 25–30 акаунтів, managed service, продуктизація QA/міграції, map-data | $12–15M |

Орієнтовна структура доходу на 5-му році:

| Потік | Частка |
|---|---|
| Managed data-ops pods (survey/LiDAR, mobile mapping) | ~45% |
| Інтеграція та кастомні проєкти | ~25% |
| Підписки на платформу і white-label ліцензії | ~15% |
| Вендорська та партнерська маржа (Esri, TopoDOT тощо) | ~15% |

Тримати концентрацію: жоден клієнт не більше 15–20% виручки.

---

## 3. Оцінка чотирьох гіпотез

| Критерій | 1 Survey-фірми | 2 Mobile mapping | 3 Інтегратор | 4 White-label платформа |
|---|---|---|---|---|
| Час до першого cash | Швидко (є) | Середньо | Повільно (потрібні референси) | Найповільніше |
| Відповідність $300–500k/рік | Середня | Висока | Висока | Середня |
| Стійкість клієнта | Низька (легко перебити тендер) | Середня | Висока | Висока |
| Масштабованість | Обмежена людьми | Люди + інструменти конвеєра | Обмежена партнерами | Найвища |
| Головний ризик | Тиск на ціну | Мало великих клієнтів | Потрібен вендорський канал | Продукт раніше за попит |

Рекомендація: запускати 1 і 2 зараз, продавати за моделлю 3, а 4 будувати з повторюваних модулів.

---

## 4. ICP (тільки комерційні)

### ICP A: середня survey / LiDAR / mapping компанія (гіпотеза 1)
- **Хто:** США, 20–300 співробітників, $10–100M виручки. Airborne, UAV, terrestrial LiDAR, фотограмметрія, topo/utility mapping.
- **Тригер:** сезонні піки, беклог проєктів, дефіцит кадрів, вимоги клієнтів до швидшої здачі та складніших deliverables (класифікація, feature extraction, CAD/GIS).
- **Біль:** польові бригади продуктивні, обробка і QA вузьке місце.
- **Що купують:** white-label виробнича команда (класифікація, feature extraction, QA, CAD/GIS deliverables).
- **Покупець:** VP Operations, Director of Geospatial, власник/COO.
- **Бюджет:** $200–500k на рік аутсорсу.
- **Цикл:** 2–5 місяців, зазвичай через платний пілот.
- **Disqualify:** фірми до ~$5M виручки, одноразовий аутсорс, вимога US-only персоналу.

### ICP B: mobile mapping та data-capture компанії (гіпотеза 2)
- **Хто:** вуличні знімки, vehicle-mounted LiDAR, постачальники дрон-даних (типу Cyclomedia, Mosaic, Hivemapper).
- **Тригер:** обсяги даних ростуть швидше за команду обробки, нові контракти потребують feature extraction у масштабі.
- **Що купують:** pod з обробки даних, інструменти feature extraction, портал доставки, кастомна платформа.
- **Покупець:** CTO, VP Data/Product, Head of Operations.
- **Бюджет:** $500k–3M на рік.
- **Цикл:** 3–6 місяців.
- **Disqualify:** ранні стартапи без виручки, компанії, що все роблять in-house.

### ICP C: комерційні власники активів (через A і B, потім напряму)
Трубопроводи (midstream), інвесторські utilities (IOU), fiber/телеком, відновлювана енергетика.
- Тригери: PHMSA Mega Rule (перевірювані записи), міграція Esri Geometric Network → Utility Network (ArcMap закрито з 2026), wildfire/storm hardening, M&A-інтеграція даних.
- Бюджет $200k–2M, цикл 3–15 місяців залежно від сегмента.
- Заходити з референсами від A і B та сертифікацією SOC 2.

### ICP D: софтверні й платформні компанії, яким потрібна гео-інженерія
PropTech, логістика, insurance-tech, energy-tech. Бюджет $150–500k на рік, покупець CTO/VP Engineering. Продукти: кастомна розробка, white-label гео-модулі.

### Пріоритет сегментів
1. Survey/LiDAR/mapping сервіси (ICP A).
2. Mobile mapping / data capture (ICP B).
3. Midstream, fiber/телеком, renewables (ICP C), спершу через A і B.
4. Платформні компанії (ICP D) як побічний потік.

Beachhead для комерційного ринку: midstream + fiber/телеком + renewables. IOU і map-data відкласти на 2–3 рік.

Сегменти за тригером і бюджетом (оцінки з пам'яті, перевірити):

| Сегмент | Тригер | Річний бюджет | Цикл |
|---|---|---|---|
| Midstream / трубопроводи | PHMSA Mega Rule | $300k–1.5M | 6–9 міс. |
| Телеком / fiber / вежі | Облік мережі, as-built, M&A | $200–800k | 3–6 міс. |
| Інвесторські utilities (IOU) | Utility Network, wildfire, модернізація | $400k–2M | 9–15 міс. |
| Відновлювана енергетика | Підбір майданчиків, землі, підключення | $150–500k | 2–4 міс. |
| Страхування / CRE / кредитори | Ризик-моделі, property data | $200–600k | 4–8 міс. |
| Залізниці й логістика | Облік активів | $200–700k | 6–12 міс. |
| Лісо- і земельна власність, видобуток | Інвентаризація, моніторинг | $150–500k | 4–8 міс. |
| Map-data / AI-компанії | Анотація, conflation, QA карт | $500k–3M | 3–6 міс. |

Пояснення простою мовою для двох сегментів:
- **Телеком/fiber:** компанії, які будують і тримають лінії зв'язку. Дані про мережу розкидані (папір, CAD, таблиці), після купівлі іншої компанії бази треба склеювати. Продаємо оцифрування, склеювання, внесення нових ділянок, QA як постійну роботу.
- **IOU:** приватні утиліті (електрика, газ, вода). Тригер: Esri закрила старий формат мережі, потрібна складна міграція на Utility Network; старі записи на папері. Довгі закупівлі (9–15 міс.), суворіша безпека, але найбільші й найстабільніші чеки.

Обмеження для США: доступ до критичної інфраструктури (CEII, NERC CIP, TSA) може обмежувати offshore; потрібна US-юрособа (Delaware LLC), US-продажі/PM, страхування E&O і cyber, SOC 2. Esri у США фактично стандарт: бути Esri Business Partner, але тримати vendor-agnostic шар даних (PostGIS, відкриті формати).

---

## 5. Бізнес-модель «Odoo для гео»

Що робить Odoo: модульна платформа (open core + платний enterprise), партнерська мережа продає і впроваджує, клієнти платять за впровадження, потім за підтримку та хостинг.

Гео-версія:
- **Модулі** (будувати лише після реальних поставок): Ingest, Processing/Classification, Feature Extraction, QA, Delivery Portal, Asset Registry / GIS Viewer, Integrations (Esri, Cityworks, SAP, ERP).
- **Open-source база:** PostGIS, PDAL, QGIS Server, GeoServer, Cesium, Potree.
- **Pod-модель:** виділена команда, що працює на клієнта під його брендом. Орієнтир 6 фахівців ≈ $36k на місяць ≈ $430k на рік. Гросс-маржа 35–50% (припущення).
- **Канали (як партнерська мережа Odoo):** Esri Business Partner; Cityworks/Trimble, Bentley, Hexagon, Schneider/AVEVA; Snowflake, Databricks, CARTO, Felt; прайми-інтегратори (Woolpert, NV5, Dewberry) як субпідряд для перших референсів.

---

## 6. Аналоги за гіпотезами

### Гіпотеза 1: виробництво даних для survey/LiDAR-фірм
| Компанія | Країна | Що робить |
|---|---|---|
| [Intetics](https://intetics.com/solutions/lidar-data-processing) | США (з командами в Європі, з пам'яті) | LiDAR-обробка: калібрування, очистка, класифікація, 2D/3D feature extraction, для фірм без власної команди. Найближчий прямий конкурент за моделлю |
| [AABSyS](https://test.aabsys.com/?p=4311) | Індія | Класифікація хмар точок за специфікацією клієнта, видача LAS-тайлів |
| Cyient, Genesys International | Індія | Геодані й оцифрування в масштабі (з пам'яті, пошук не підтвердив) |
| [Woolpert](https://woolpert.com/?p=17607) | США | Конверсія і міграція даних, LiDAR, фотограмметрія. Конкурент і потенційний клієнт-субпідряд |

### Гіпотеза 2: mobile mapping
| Компанія | Країна | Роль |
|---|---|---|
| [Mosaic](https://www.esri.com/partners/mosaic-a2TUU000000o1FR2AY) | Чехія | 360° камери, послуги з обробки. Потенційний клієнт/партнер |
| [Getmapping](https://orbitgt.com/wp-content/uploads/2020/05/Orbit-GT-Case-Story-Getmapping-provides-UK-with-street-imagery.pdf) | Велика Британія | Вуличні панорами на технології Orbit GT |
| [Orbit GT](https://amerisurv.com/2015/07/14/orbit-gt-releases-mobile-mapping-feature-extraction-portfolio-v11-1/) | Бельгія | Софт feature extraction і asset inventory (дані 2015 року, перевірити актуальність) |
| Cyclomedia, Hivemapper, Mapillary, NavVis | різні | Вуличні знімки й мобільне картування (з пам'яті) |

### Гіпотеза 3: інтегратори навколо Esri Utility Network
| Компанія | Що пропонує | Урок |
|---|---|---|
| [SSP Innovations](https://www.businesswire.com/news/home/20250416342473/en/SSP-Innovations-Fixed-Fee-Utility-Network-Migration-Program-Now-Available-to-Utilities-With-up-to-1M-Connections) (Esri Platinum) | SSP Accelerate: фіксована ціна за міграцію для utilities до 1M підключень | Упакований продукт зі стелею ціни: копіювати механіку |
| [Pro-West & Associates](https://www.esri.com/partners/pro-west-associates-a2T70000000TNbwEAG/utility-network-impl-a2dUU000008Kh7RYAS) | Оцінка даних, міграція, очистка, навчання, супровід | Повний цикл від аудиту до підтримки |
| [1898 & Co. (Burns & McDonnell)](https://www.esri.com/partners/1898-co-part-of-burn-a2T70000000TNMQEA4/arcgis-utility-netwo-a2dUU000007ROwiYAG) | Roadmap, майстер-план, пілотна міграція | Консалтинг як вхід у великий проєкт |
| [DCSE](https://www.esri.com/en-us/arcgis-marketplace/listing/services/1758e5fe9df84dd1a33c888127e1b584) | Utility Network для водоканалів | Нішування за типом utility |
| [Nutility, LLC](https://www.esri.com/partners/nutility-llc-a2TUU000001J8fd2AC) | Заявляє міграцію за 2–4 тижні (самозвіт) | Конкуренція за швидкістю |
| [TEKLABZ](https://esri.com/en-us/arcgis-marketplace/listing/services/fab97943111f45088decad4bbb7021b4) | Міграція Geometric → Utility Network, Bronze-партнер | Вхідний рівень партнерства доступний |
| [1Spatial](https://1spatial.com/us/news/the-biggest-shift-in-utility-operations/) | Софт і послуги міграції | Модель «продукт плюс сервіс» |

### Гіпотеза 4: white-label і кастомна розробка
- Geo-Plus VisionLidar (Франція) продається [survey-фірмам і LiDAR-провайдерам](https://geo-plus.com/products/visionlidar): клієнти сегмента купують готові інструменти.
- VRMesh Survey: автоматично розпізнає будівлі, лінії електропередач, стовпи, дерева, бордюри, колії.
- Intellias, N-iX, SoftServe (з пам'яті): українські інженерні компанії, що продають розробку в location-tech. Орієнтир для кастомної розробки.

---

## 7. Приклад PCI Geomatics і подібні вендори (модель «вендор + канал + послуги»)

### GXL / PCI Geomatics
- Сторінка geo-matching.com не відкрилася (помилка DNS). Висновки з пошуку й пам'яті.
- GXL (Large Volume Production System) на базі Geomatica: масова обробка знімків (dense image matching, DSM/DTM, ортотрансформація, мозаїки). Відомий клієнт: [SkyMap Global](https://geospatialworld.net/news/pci-geomatics-delivers-high-volume-production-system-gxl-to-skymap-global-in-singapore) (Сінгапур).
- [PCI Geomatics](https://vip.uwaterloo.ca/pci-geomatics/): приватна канадська компанія, 1982 р., 135+ країн, 21 000+ ліцензій (дані профілю, можуть бути застарілими). Партнери: [Esri](https://amerisurv.com/?p=16207), Vexcel.
- [PitchBook](https://pitchbook.com/profiles/company/98976-61) описує поточний бізнес як платформу спостереження Землі (аналітика як сервіс). Записи про угоду на $11M суперечливі, не враховувати.
- Висновок: GXL сам по собі не якір (знімки, а не LiDAR/mobile mapping; покупці часто державні; свіжих релізів у пошуку не видно). Корисний як зразок «важкий виробничий продукт плюс інтегратор» і як сигнал, що чистий продаж ліцензій нішевого софту звужується.

### Порівняння вендорів
| Вендор | Країна | Продукт | Модель каналу |
|---|---|---|---|
| [GeoCue](https://lp360.com/about-us/) | США | LP360 (софт), TrueView (LiDAR-сенсори), Loki | Софт + залізо + навчання + підтримка + консалтинг; сенсор продається через [реселера Advexure](https://advexure.com/collections/geocue-lidar-sensors-solutions) |
| [Terrasolid](https://lidarmag.com/?p=13433) | Фінляндія | TerraScan та лінійка | Регіональні дистриб'ютори; з 2023 р. у Північній Америці продажі, продовження ліцензій і підтримку веде BAAM.Tech |
| [SimActive](https://www.simactive.com/news-stories/simactive-partners-with-mirukuru-and-announces-sale-in-japan) | Канада | Correlator3D | Локальні дистриб'ютори (Intrepid Geomatics у США, Mirukuru в Японії) |
| [Pix4D](https://pix4d.com/become-pix4d-partner) | Швейцарія | Фотограмметрія | Партнерська програма на заявку; [ексклюзивний реселер у Китаї Beijing Skymap веде продажі, сервіс і кастомізацію](https://www.pix4d.com/blog/partnership-with-beijing-skymap-technology) |
| Agisoft Metashape | — | Фотограмметрія | Формальної реселерської програми не знайдено |

### Найближчий аналог гіпотези: BAAM.Tech / GBA
[BAAM.Tech](https://www.gim-international.com/content/news/baam-tech-named-north-american-distributor-for-terrasolid) (афілійована з GBA Companies, Ленекса, Канзас) з 1 січня 2023 р. стала північноамериканським дистриб'ютором і партнером технічної підтримки Terrasolid. Сервісна компанія бере регіон нішевого вендора, отримує повторюваний дохід (продовження ліцензій, підтримка) і канал до клієнтів для власних послуг. Те саме робить Beijing Skymap з Pix4D.

Уроки: модель підтверджена; шукати вендорів без присутності в США/ЄС; пропонувати вендору підтримку й інтеграцію, а не лише продажі; чистий софтовий бізнес у ніші звужується, вендорам потрібна допомога з переходом до сервісу.

---

## 8. Як стати дистриб'ютором TopoDOT

### Що відомо
- Виробник: **Certainty 3D** (Флорида). TopoDOT це CAD-додаток на базі Bentley MicroStation для витягування топографії та моделей із хмар точок і знімків ([Geo Week News](https://www.geoweeknews.com/articles/certainty-3d-topodot-practical-laser-scanning-for-transportation-projects/)).
- Публічної програми «Certified Partner» чи форми реселера не знайдено; дані переважно 2011–2013 рр. Відомий партнер: [Laserscanning Europe GmbH](https://www.laserscanning-europe.com/en/node/3571) (Європа, ймовірно зайнята).
- Ціни (не підтверджені): $2 995 за робоче місце, корпоративна $12 000 (стаття 2013 р.); агрегатор [Fitgap](https://us.fitgap.com/products/057884/topodot) називає від $12 000.
- Вихідна база клієнтів: транспортні відомства США; але ліцензії купують і використовують комерційні інженерні та survey-фірми, що на них працюють (наприклад, [DRMP проводить внутрішні воркшопи TopoDOT](https://drmp.com/drmperspective/drmp-trains-next-generation-of-surveying-professionals-at-annual-topodot-workshop); Thomas & Hutton вимагає TopoDOT у вакансіях).

### Покроковий план
1. Підготувати доказ компетенції: пробна ліцензія, обробка реального набору mobile LiDAR, кейс (час, точність, QA). 2–4 тижні.
2. Написати Certainty 3D напряму (certainty3d.com; контакт 2013 р. застарів).
3. Запропонувати роль, якої їм бракує: сервісний партнер (виробничі потужності), партнер з навчання й підтримки (особливо Східна Європа/Україна), реселер у вільному регіоні.
4. Пілот 3–6 місяців без ексклюзиву: кілька демо-ліцензій, спільні вебінари, 2–3 клієнти.
5. Після результатів домовлятися про постійний статус, територію й маржу.

### Питання до Certainty 3D
1. Чи є партнерська програма і рівні?
2. Маржа реселера та умови продовження ліцензій?
3. Які території вільні (США, Європа, Україна)?
4. Чи надають демо-ліцензії, лідів і маркетингові матеріали?
5. Хто дає підтримку другого рівня?
6. Чи є сертифікація операторів?
7. Поточна версія і залежність від MicroStation / Bentley?

### Користь і ризики
- Висока: довіра та референс; канал до клієнтів, що вже платять за ліцензії.
- Середня: повторюваний дохід (продовження, підтримка, навчання).
- Низька: маржа на самих ліцензіях.
- Ризики: залежність від екосистеми Bentley; застарілі дані про вендора; вендор може не мати програми (тоді працювати як незалежний TopoDOT-спеціаліст без статусу); не робити ставку на один продукт, а мати 3–5 канальних партнерів (TopoDOT, Terrasolid, GeoCue, Orbit GT та ін.).

---

## 9. Ризики загалом

- Концентрація на кількох клієнтах.
- Безпека даних і довіра до offshore (SOC 2, страхування).
- Тонка маржа в map-data і при субпідряді без автоматизації.
- Без американської присутності перший великий клієнт малоймовірний: потрібен керівник продажів у США.
- Залежність від Esri у США майже неминуча.
- Найм ~200 геофахівців до 5-го року.
- Продукт раніше за попит: не будувати «all-GIS платформу» без повторюваного попиту.
- White-label без бренду: потрібні контракти (IP, non-solicitation, референси).

---

## 10. Наступні кроки

1. Підтвердити, що таке «Gynger», і які з поточних клієнтів підпадають під ICP A і B.
2. Обрати по одній пілотній пропозиції на ICP (наприклад, 3-місячний платний pod-пілот для survey-фірм).
3. Скласти цільовий список: 50 survey-фірм і 30 mobile-mapping компаній з ролями покупців.
4. Таблиця з 20–30 вендорів (LiDAR, mobile mapping, фотограмметрія, EO): країна, продукт, партнерська модель, присутність у США/ЄС, контакт, пріоритет.
5. Лист-пропозиція англійською для Certainty 3D і чек-лист пілоту на 90 днів.
6. Перевірити цифри: PHMSA Mega Rule, ринок fiber/OSP, бюджети IOU, Cyient/Genesys, ціни TopoDOT.
7. Фінмодель на 5 років із трьома сценаріями.
8. Мінімальний US-сетап: юрособа, страхування, SOC 2, відповідальний за продажі.

## Джерела
- [Intetics: LiDAR Data](https://intetics.com/solutions/lidar-data-processing)
- [AABSyS](https://test.aabsys.com/?p=4311)
- [Geo-Plus VisionLidar](https://geo-plus.com/products/visionlidar)
- [Woolpert GIS database development](https://woolpert.com/?p=17607)
- [Mosaic, Esri partner](https://www.esri.com/partners/mosaic-a2TUU000000o1FR2AY)
- [Orbit GT, Getmapping case](https://orbitgt.com/wp-content/uploads/2020/05/Orbit-GT-Case-Story-Getmapping-provides-UK-with-street-imagery.pdf)
- [Orbit GT feature extraction v11.1](https://amerisurv.com/2015/07/14/orbit-gt-releases-mobile-mapping-feature-extraction-portfolio-v11-1/)
- [SSP Innovations fixed-fee Utility Network migration](https://www.businesswire.com/news/home/20250416342473/en/SSP-Innovations-Fixed-Fee-Utility-Network-Migration-Program-Now-Available-to-Utilities-With-up-to-1M-Connections)
- [Pro-West Utility Network package](https://www.esri.com/partners/pro-west-associates-a2T70000000TNbwEAG/utility-network-impl-a2dUU000008Kh7RYAS)
- [1898 & Co. Utility Network roadmap](https://www.esri.com/partners/1898-co-part-of-burn-a2T70000000TNMQEA4/arcgis-utility-netwo-a2dUU000007ROwiYAG)
- [DCSE Utility Network](https://www.esri.com/en-us/arcgis-marketplace/listing/services/1758e5fe9df84dd1a33c888127e1b584)
- [Nutility, LLC](https://www.esri.com/partners/nutility-llc-a2TUU000001J8fd2AC)
- [TEKLABZ](https://esri.com/en-us/arcgis-marketplace/listing/services/fab97943111f45088decad4bbb7021b4)
- [1Spatial](https://1spatial.com/us/news/the-biggest-shift-in-utility-operations/)
- [GXL listing (geo-matching.com)](https://geo-matching.com/products/gxl-large-volume-production-system)
- [PCI Geomatics, University of Waterloo](https://vip.uwaterloo.ca/pci-geomatics/)
- [PCI Geomatics, PitchBook](https://pitchbook.com/profiles/company/98976-61)
- [PCI Geomatics and Esri](https://amerisurv.com/?p=16207)
- [PCI GXL to SkyMap Global](https://geospatialworld.net/news/pci-geomatics-delivers-high-volume-production-system-gxl-to-skymap-global-in-singapore)
- [GeoCue about us](https://lp360.com/about-us/)
- [GeoCue via Advexure](https://advexure.com/collections/geocue-lidar-sensors-solutions)
- [BAAM.Tech, Terrasolid (LIDAR Magazine)](https://lidarmag.com/?p=13433)
- [BAAM.Tech, Terrasolid (GIM International)](https://www.gim-international.com/content/news/baam-tech-named-north-american-distributor-for-terrasolid)
- [SimActive and Mirukuru](https://www.simactive.com/news-stories/simactive-partners-with-mirukuru-and-announces-sale-in-japan)
- [Pix4D partner page](https://pix4d.com/become-pix4d-partner)
- [Pix4D and Beijing Skymap](https://www.pix4d.com/blog/partnership-with-beijing-skymap-technology)
- [Certainty 3D TopoDOT overview](https://www.geoweeknews.com/articles/certainty-3d-topodot-practical-laser-scanning-for-transportation-projects/)
- [Laserscanning Europe, partners](https://www.laserscanning-europe.com/en/node/3571)
- [TopoDOT on Fitgap](https://us.fitgap.com/products/057884/topodot)
- [DRMP TopoDOT workshop](https://drmp.com/drmperspective/drmp-trains-next-generation-of-surveying-professionals-at-annual-topodot-workshop)
