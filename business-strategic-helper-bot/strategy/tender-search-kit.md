# Пошуковий кит по тендерах — гіпотези назв під довгий контракт

Додаток до `scaling-formula.md` §03. Мета — перетворити «шукати клієнтів» на щотижневу
операцію з конкретними збереженими пошуками.

**Статус даних.** Формулювання назв — гіпотези, побудовані на реальних патернах, які видно у
відкритих джерелах. Приклади з позначкою *(спостережено)* взяті зі сніпетів пошуку і **потребують
перевірки безпосередньо на порталі** — суми, дати й статуси в сніпетах бувають застарілі.
Джерела: Find a Tender Service, Contracts Finder (UK), TED (EU).

---

## Головний поділ: два різні типи тендерів

У GIS-Point **немає польової частини** — Mirnychyj Engineering Group є якорем довіри, а не
конкуруючою послугою польової зйомки. Тому тендери діляться навпіл, і поводитись з ними треба
протилежним чином.

| | **Категорія A — подаємось самі** | **Категорія B — переможець стає клієнтом** |
|---|---|---|
| Що в предметі | Обробка, підтримка, міграція, моделювання, платформа | Обов'язкова польова зйомка / аероносій |
| Наша роль | Прямий постачальник або субпідрядник | **Субпідрядник переможця** |
| Що моніторимо | **Contract notice** — щоб встигнути податись | **Award notice** — щоб дізнатися імʼя клієнта |
| Момент контакту | До дедлайну подачі | Перші 2–6 тижнів після присудження |

> **Категорія B — це і є ваш головний канал.** Award notice публічно називає компанію, тривалість
> фреймворку і суму. Це готовий, датований, кваліфікований лід: у переможця щойно з'явилось
> багаторічне зобов'язання і фіксована потужність обробки.

---

## Категорія A — назви, під які можна подаватись самим

| Гіпотеза назви | Чому довга | Що ми продаємо всередину |
|---|---|---|
| `Provision of GIS Data Management and Support Services` | Support-контракти за конструкцією багаторічні | Сходинка 02: виділена команда під підтримку даних |
| `Geospatial Managed Service` / `GIS Bureau Services` | Managed service = місячна плата | Прямо наша одиниця продажу — FTE-місяць |
| `Asset Data Capture, Cleansing and Validation` | Реєстр активів чиститься циклами | Вивірка, топологія, приведення до схеми |
| `Asset Information Management Services` | Прив'язана до інвестиційного циклу | Постійна операція, не проєкт |
| `Utility Records Digitisation and Standardisation` | NUAR-обовʼязок безстроковий | Векторизація, CRS, схеми даних |
| `Digitisation of Records, Plans and Drawings` | Архіви великі, здаються траншами | Масова оцифровка + QA |
| `Point Cloud Registration, Classification and Deliverable Production` | Прив'язана до потоку зйомок | Ядро Field-to-Finish |
| `Scan-to-BIM / Point Cloud to Revit Modelling Services` | Портфель обʼєктів, не один | Пруф BellIngram |
| `Vectorisation and Feature Extraction Services` | Обсяг ділиться на роки | Automation-accelerated класифікація |
| `Geospatial Data Quality Assurance and Validation` | QA потрібне доти, доки є потік | Dual-review як предмет контракту |
| `Web GIS Platform Development, Hosting and Support` | Ліцензія + підтримка = ARR | Сходинка 04, allgis.io |
| `Spatial Data Infrastructure (SDI) Maintenance and Support` | SDI підтримують, а не будують раз | IT-юніт + GIS разом |
| `Cadastral Data Modernisation / Land Registry Digitisation` | Держпрограми на роки | *(спостережено на TED: модернізація реєстру земель і будівель, гміна Мщонув — CPV 71354000 + 72310000 + 71355000 + 72314000)* |
| `Topographic / Basemap Data Maintenance and Update Services` | Оновлення за розкладом | Циклічна операція |
| `Land Referencing and Plan Production` | DCO та інфраструктурні схеми тягнуться роками | Виробництво планів під юридичні пакети |
| `Data Migration Services` (у складі впровадження платформи) | Довга, якщо прив'язана до платформи | *(спостережено: Bedford Borough Council, FTS, січень 2026)* — сам по собі разовий, брати лише в парі з підтримкою |

---

## Категорія B — назви, переможця яких треба брати в роботу

| Гіпотеза назви | Спостережений приклад | Чому це наш лід |
|---|---|---|
| `Framework Agreement for Geospatial Survey Services` | *Historic England NP195 — 3 роки + 1 рік опції, ~£400k, лоти, Lot 3 Topographic Survey ≈25%* | Багатолотовий фреймворк = потік обробки на 4 роки |
| `Topographical Surveys — Framework Agreement` | *Corserv Solutions — 01.04.2026–31.03.2030, 4 роки, ~£1M, до 5 постачальників* | 5 переможців = 5 потенційних клієнтів з одного award |
| `Geospatial Capabilities Framework` | *спостережено на FTS* | Широкий фреймворк, обробка всередині кожного лоту |
| `Provision of LiDAR and Aerial Digital Photography Surveying and Data (LiDAR Mapping)` | *FTS 080079-2025* | Аерозйомка → класифікація хмари, наш профіль |
| `LiDAR Mapping of [територія]` | *Shetland Islands Council — 10 точок/м², аерофото, обробка і передача файлів* | Явно прописана обробка в предметі |
| `LiDAR-based Forest Inventory — Data Collection and Processing` | *Forestry England, ~£185k, 46 725 га* | «Collection **and Processing**» у самій назві |
| `Measured Building Surveys and Laser Scanning Framework` | — | Потік scan-to-BIM |
| `Utility Survey and Mapping (PAS 128) Framework` | — | Підземні активи, вихід на NUAR-роботу |
| `Vegetation Management / Encroachment Survey Framework` (DNO) | — | Щорічні цикли класифікації рослинності |
| `Structural / Ground Movement Monitoring Survey Framework` | — | Повторні епохи однією методикою роками |
| `Bathymetric and Coastal Monitoring Survey Framework` | — | Циклічність за фізикою явища |
| `Multi-Disciplinary Consultancy Framework — Lot: Surveying / Geospatial` | — | Великі рамкові з геолотом; переможець лоту — наш клієнт |
| `AMP8 — [Water Co] Capital Delivery / Asset Data Framework` | *AMP8 = регуляторний цикл квіт. 2025 – 2030; більшість фреймворків присуджено сер. 2024 – сер. 2025* | **Tier-1 ландшафт уже сформований** — тобто список переможців існує зараз і його можна опрацьовувати |

> Зауваження по AMP8: якщо основні фреймворки вже присуджені, вікно «подамось разом» здебільшого
> закрите — але вікно «прийдемо до переможця» відкрите весь цикл до 2030. Це аргумент іти по
> award-нотисах ретроспективно за 18–24 місяці, а не лише за свіжими.

---

## CPV-коди для підписки

Головні:

| Код | Що це |
|---|---|
| `71354000` | Map-making services |
| `71354100` | Digital mapping services |
| `71354200` | Aerial mapping services |
| `71354300` | Cadastral surveying services |
| `71355000` | Surveying services |
| `71355100` | Photogrammetry services |
| `72310000` | Data-processing services |
| `72312000` | Data entry services |
| `72314000` | Data collection and collation services |
| `72316000` | Data analysis services |
| `72322000` | Data management services |
| `38221000` | Geographic information systems (GIS) |
| `79999100` | Scanning services |

Підписка робиться на **батьківські** коди (`71354000`, `71355000`, `72310000`) — ієрархія
підтягне підкоди. Точні підкоди перед налаштуванням звірити на порталі: класифікація
оновлювалась, і частина сніпетів у пошуку застаріла.

---

## Збережені пошуки

### Find a Tender / Contracts Finder — потік A (подаємось)

```
("framework agreement" OR "call-off" OR "dynamic purchasing system" OR "managed service")
AND (geospatial OR GIS OR "spatial data" OR LiDAR OR "point cloud" OR photogrammetry
     OR "asset data" OR "utility records" OR vectorisation OR "scan to BIM"
     OR "data cleansing" OR digitisation)
```

### Find a Tender / Contracts Finder — потік B (award notices)

Той самий рядок, але фільтр **notice type = Contract award notice** і сортування за датою.
Це і є генератор ліда: з кожного award витягуємо переможця, тривалість, суму, замовника.

### TED — DACH

```
(Rahmenvertrag OR Rahmenvereinbarung)
AND (Vermessung OR Netzdokumentation OR Leitungsdokumentation OR Geodaten
     OR Bestandsdokumentation OR Laserscanning OR Punktwolke OR "Glasfaser Dokumentation")
```

### TED — Benelux

```
raamovereenkomst AND (landmeetkundig OR geo-informatie OR basisregistratie
                      OR "BGT" OR "BAG" OR puntenwolk OR inwinning)
```

### TED — Польща / CEE

```
"umowa ramowa" AND (geodezyjn* OR "ewidencji gruntów i budynków" OR EGiB
                    OR digitalizacja OR "zasobu geodezyjnego" OR fotogrametr*)
```

---

## Негативний фільтр — що відкидати одразу

- Предмет **тільки польова зйомка** без обсягу обробки і без фреймворку.
- Тривалість менша за 3 роки **і** обсяг нижчий за 2 FTE на 12 місяців.
- `Supply of equipment` / `Purchase of hardware` / постачання дронів, сканерів, ПЗ-ліцензій.
- Разові дослідження, feasibility, one-off study.
- Лоти, де замовник прямо вимагає локальної присутності інженерів на майданчику.

---

## Скоринг ліда — 5 балів, по одному за кожну умову §02

1. Фреймворк / call-off / DPS на **3+ роки** (є в тексті нотиса).
2. У предметі є **обробка, підтримка або оновлення** даних, а не лише капчур.
3. Обсяг тягне на **≥2 FTE на 12 місяців**.
4. Переможець — **фірма 30–200 людей** (не Tier-1 гігант, не мікро-бюро).
5. Знайдено **Head of Production / Operations Director / GIS Manager** поіменно.

**4–5 балів** — в роботу цього тижня. **3** — у нерт. **≤2** — say-no, не витрачати час.

---

## Щотижнева операція (30 хвилин)

| Крок | Дія | Власник |
|---|---|---|
| 1 | Зняти нові award notices за збереженими пошуками (UK + TED) | Vasyl |
| 2 | Витягнути переможця, тривалість, суму, замовника | Vasyl |
| 3 | Проскорити за 5 умовами, лишити 4–5 балів | Andrijana |
| 4 | Знайти покупця поіменно, додати в список | Andrijana |
| 5 | Аутріч по тригеру «ви щойно взяли N-річний фреймворк» | Ievgen |

Через 12 місяців це дає накопичений, датований список усіх фірм у beachhead, які взяли довгий
контракт — актив, якого немає в конкурентів, бо його не купиш, його треба вести щотижня.

---

## Джерела

- [Geospatial Capabilities Framework — Find a Tender](https://www.find-tender.service.gov.uk/Notice/028269-2021)
- [Framework Agreement for Geospatial Survey Services NP195 — Contracts Finder](https://www.contractsfinder.service.gov.uk/Notice/2c96d120-2ac3-4849-8a2d-0965ed840ca1)
- [Topographical Surveys — Find a Tender 085040-2025](https://www.find-tender.service.gov.uk/Notice/085040-2025/PDF)
- [Provision of LiDAR and Aerial Digital Photography Surveying and Data — Find a Tender 080079-2025](https://www.find-tender.service.gov.uk/Notice/080079-2025)
- [LiDAR-coupled Digital Aerial Surveys — Find a Tender 010858-2025](https://www.find-tender.service.gov.uk/Notice/010858-2025)
- [LiDAR-based Forest Inventory, Data Collection and Processing — D3 Tenders](https://d3tenders.com/contract/?ocid=ocds-h6vhtk-04db78)
- [Modernisation of the land and buildings register, Mszczonów — TED / EU Publications Office](https://op.europa.eu/en/web/public-procurement/procurement-details/-/procurement/f26059b2-c7fa-4d45-b36d-e35a6c9c46b0)
- [AMP8 framework winners, lot by lot — Water Industry Hub](https://www.waterindustryhub.com/frameworks-won.html)
- [AMP8 overview — Sensat](https://www.sensat.co/news/everything-you-need-to-know-about-amp8-a-comprehensive-guide)
- [Common Procurement Vocabulary — Wikipedia](https://en.wikipedia.org/wiki/Common_Procurement_Vocabulary)
