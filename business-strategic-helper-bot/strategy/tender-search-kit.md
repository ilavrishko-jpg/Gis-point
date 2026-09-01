# Моніторинг тендерів — сетап і 3-місячний тест

Додаток до `scaling-formula.md` §03. Мета — поставити алерти за один вечір і за 3 місяці
отримати однозначну відповідь: цей канал дає ліди чи ні.

---

## 1. Сім типів пошукових запитів

Логіка: ми шукаємо не «тендери на ГІС», а **місця, де обробка даних піде на підряд**. Це або
предмет самого тендера, або обсяг обробки всередині контракту, який виграє хтось інший.

Портали: `find-tender.service.gov.uk` · `contractsfinder.service.gov.uk` · `ted.europa.eu`
(Expert search) — у кожному зберегти пошук і ввімкнути щоденний лист.

### Тип 1 — Обробка даних як предмет тендера
*Наша роль: подаємось самі або йдемо named subcontractor.*
```
("data processing" OR "data production" OR "data cleansing" OR "data validation"
 OR "data capture" OR vectorisation OR "feature extraction" OR digitisation
 OR "back office" OR "bureau service")
AND (geospatial OR GIS OR "spatial data" OR cartograph* OR mapping OR LiDAR
     OR "point cloud" OR topograph*)
```

### Тип 2 — Капчур із прописаною обробкою ⟵ головний
*Наша роль: переможець стає нашим клієнтом. Дивимось award notice.*
```
(LiDAR OR "aerial survey" OR photogrammetr* OR "laser scanning" OR "mobile mapping"
 OR "drone survey" OR UAV OR "topographic survey")
AND (processing OR classification OR "point cloud" OR deliverables OR "data delivery"
     OR "digital terrain model" OR DTM OR DSM)
AND ("framework" OR "call-off" OR "multi-supplier" OR lot)
```

### Тип 3 — Впровадження ГІС-платформи
*Там завжди міграція даних і подальші дата-операції. Заходимо до інтегратора.*
```
(GIS OR "geographic information system" OR "spatial data infrastructure"
 OR "web mapping" OR "asset management system")
AND (implementation OR "data migration" OR "support and maintenance" OR hosting
     OR "managed service")
```

### Тип 4 — Реєстри та регуляторні програми
*Дані оновлюються циклічно — постійна потреба в потужності.*
```
("asset register" OR "asset data" OR "asset information" OR "utility records"
 OR "underground assets" OR NUAR OR cadastr* OR "land registry" OR basemap
 OR "base map" OR "topographic data")
AND (update OR maintenance OR standardisation OR migration OR "data capture"
     OR digitisation)
```

### Тип 5 — BIM і scan-to-BIM
```
("scan to BIM" OR "point cloud to BIM" OR "measured building survey"
 OR "as-built model" OR "Revit model" OR "digital twin")
AND (survey OR "laser scan" OR "point cloud")
```

### Тип 6 — Циклічний моніторинг
*Повторні епохи однією методикою — багаторічна робота за конструкцією.*
```
(monitoring OR "repeat survey" OR "change detection" OR encroachment OR vegetation
 OR deformation OR settlement OR subsidence OR bathymetr* OR coastal)
AND (survey OR LiDAR OR satellite OR annual OR cyclical OR framework)
```

### Тип 7 — Прямий сигнал на субпідряд
*Найточніший запит під «ІТ на підряд в обробку».*
```
(subcontract OR "sub-contractor" OR "supply chain opportunities" OR "framework partner"
 OR "surge capacity" OR "additional resource" OR "resource augmentation"
 OR "capacity support")
AND (geospatial OR GIS OR survey OR "data processing" OR mapping)
```

### Мовні варіанти для TED
```
DE:  (Rahmenvertrag OR Rahmenvereinbarung) AND (Vermessung OR Netzdokumentation
     OR Leitungsdokumentation OR Geodaten OR Bestandsdokumentation OR Laserscanning
     OR Punktwolke OR Datenerfassung)
NL:  raamovereenkomst AND (landmeetkundig OR geo-informatie OR basisregistratie
     OR BGT OR BAG OR puntenwolk OR inwinning)
PL:  "umowa ramowa" AND (geodezyjn* OR "ewidencji gruntów i budynków" OR EGiB
     OR digitalizacja OR fotogrametr* OR "opracowanie danych")
```

### Google Alerts — новини про перемоги
```
"wins framework" OR "appointed to framework" OR "secures place on framework"
  AND (survey OR geospatial OR LiDAR OR mapping)
```

### Негативні слова — додати до кожного запиту
```
-"supply of equipment" -"purchase of hardware" -"software licence only"
-"feasibility study" -"training only"
```

---

## 1а. Сигнальні слова в тексті нотиса

Читати перед скорингом. Наявність цих ознак означає, що обробка **точно** піде на підряд:

- **Обсяг у цифрах** — км мережі, га, точок/м², кількість обʼєктів. Є що обробляти.
- **`deliverable format`, `data schema`, `CRS`, `QA/QC requirements`** — вимоги до продукту
  обробки прописані окремо від зйомки.
- **`framework`, `call-off`, `multi-supplier`, `lot`** — потік, а не разова здача.
- **Дозвіл на субпідряд** у тексті — прямий шлях усередину.
- **Строк 3+ роки.**

Якщо у нотисі є лише опис польових робіт без жодної з цих ознак — обробка мінімальна, лід слабкий.

### CPV-коди для підписки

Батьківські (підтягнуть підкоди):

```
71354000   Map-making services
71355000   Surveying services
72310000   Data-processing services
```

Додатково, якщо портал дозволяє вузькі: `71354100` · `71354300` · `71355100` ·
`72312000` · `72314000` · `72322000` · `38221000` · `79999100`.

---

## 2. Ретроспектива на старті (одноразово, ~4 години)

Не чекати нових award — підняти **вже присуджені за останні 18–24 місяці** за тими самими
фільтрами. AMP8-фреймворки, наприклад, здебільшого присуджені у 2024–2025, і їхні переможці
працюють до 2030 — тобто вони є лідом уже сьогодні.

Це дає стартову базу для тесту одразу, а не через місяць.

---

## 3. Що записувати (одна таблиця, 9 колонок)

| Колонка | Що вносити |
|---|---|
| Дата award | З нотиса |
| Замовник | Хто оголосив |
| Переможець | **Наш потенційний клієнт** |
| Тривалість | Роки; фільтр — від 3 |
| Сума | Загальна по фреймворку |
| Категорія | **A** (подаємось самі) / **B** (йдемо до переможця) |
| Бал | 0–5 за скорингом нижче |
| Покупець | ПІБ + посада (Head of Production / Ops Director / GIS Manager) |
| Статус | список → контакт → відповідь → discovery → demo dataset |

**Категорія A** — предмет це обробка, підтримка, міграція, платформа: подаємось самі, дивимось
*contract notice*.
**Категорія B** — предмет вимагає польової зйомки: **не подаємось** (у нас немає польової
частини), йдемо до переможця, дивимось *award notice*, контакт у перші 2–6 тижнів.

### Скоринг — по балу за умову

1. Фреймворк / call-off / DPS на **3+ роки**.
2. У предметі є обробка, підтримка або оновлення даних, а не лише капчур.
3. Обсяг тягне на **≥2 FTE на 12 місяців**.
4. Переможець — фірма **30–200 людей**.
5. Знайдено покупця поіменно.

**4–5** — в роботу. **3** — нерт. **≤2** — відкинути.

### Відкидати одразу

Тільки польова зйомка без обробки · менше 3 років і менше 2 FTE · supply of equipment /
hardware / ліцензій · разові дослідження й feasibility · вимога присутності інженерів на
майданчику.

---

## 4. Тест на 3 місяці

**Витрати:** ~30 хв/тиждень на скринінг + ~1.5 год/тиждень на аутріч ≈ **26 годин за квартал**.
Плюс 6 годин на сетап і ретроспективу. Грошей — нуль, портали безкоштовні.

**Власники:** Vasyl — знімає й заповнює таблицю. Andrijana — скоринг і пошук покупця.
Ievgen — аутріч.

### Що міряти щотижня — 5 чисел

```
1. Нових award у фільтрі
2. З них 4–5 балів
3. Знайдено покупця поіменно
4. Надіслано аутрічів
5. Отримано відповідей
```

### Контрольні точки

| | Місяць 1 | Місяць 2 | Місяць 3 |
|---|---|---|---|
| Кваліфікованих компаній у списку (накопичено) | 20 | 40 | 60 |
| З них із покупцем поіменно | 12 | 25 | 40 |
| Надіслано аутрічів | 10 | 25 | 40 |
| Відповідей | 1 | 2 | 3 |
| Discovery-дзвінків | 0 | 1 | 3 |
| Demo dataset запущено | 0 | 0 | 1 |

Числа — **модель**. Їхня роль не в точності, а в тому, щоб на 13-му тижні було з чим порівняти.

---

## 5. Рішення на 13-му тижні

Головне застереження: **контракт за 3 місяці не є критерієм.** Цикл угоди на багаторічну
потужність довший за квартал. Тест міряє, чи канал взагалі виробляє сировину і чи реагує ринок.

| Що бачимо | Діагноз | Що робити |
|---|---|---|
| ≥50 кваліфікованих · ≥60% з покупцем · ≥5% відповідей · ≥3 discovery | Канал працює | Масштабувати: подвоїти час, додати Моушен 2 (субпідряд у біддах) |
| Список наповнюється (≥30), але відповідей <5% | Сировина є, меседж не влучає | Міняти **меседж і таргет усередині списку**, канал не чіпати. Ще 6 тижнів. |
| Список наповнюється, але покупця не знаходимо (<40% з ПІБ) | Проблема не в тендерах, а в збагаченні | Додати інструмент пошуку контактів, не міняти пошуки |
| <20 кваліфікованих за 13 тижнів | Сировини немає в цих фільтрах | Розширити географію й CPV. Якщо після розширення те саме — award-тригер не є джерелом, і формулу треба перевіряти по Моушену 2 і 3 |

### Порівняння з базою

До старту зафіксувати, скільки лідів дав поточний канал за попередній квартал і якої
тривалості. Без цієї цифри тест не має з чим порівнюватись.

---

## Джерела спостережених прикладів

- [Framework Agreement for Geospatial Survey Services NP195 — Contracts Finder](https://www.contractsfinder.service.gov.uk/Notice/2c96d120-2ac3-4849-8a2d-0965ed840ca1)
- [Topographical Surveys — Find a Tender 085040-2025](https://www.find-tender.service.gov.uk/Notice/085040-2025/PDF)
- [Provision of LiDAR and Aerial Digital Photography Surveying and Data — FTS 080079-2025](https://www.find-tender.service.gov.uk/Notice/080079-2025)
- [AMP8 framework winners, lot by lot — Water Industry Hub](https://www.waterindustryhub.com/frameworks-won.html)
- [Common Procurement Vocabulary](https://en.wikipedia.org/wiki/Common_Procurement_Vocabulary)
