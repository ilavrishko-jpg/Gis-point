# Тест 1: пошук фірм на gINT — список і метод

Мета (з документа [«Полігон і каса»](./testing-ground-and-till-2026.html)): зібрати **≥50 фірм у США з живим архівом gINT**.
Критерій рішення: ≥50 — американська гіпотеза жива; десятки одиниць — план перебудовується.

**Статус: 16 компаній зі 50.** Точний лічильник вакансій зняти не вдалося — job-борди недоступні з робочого
середовища (Indeed, ZipRecruiter, SimplyHired, LinkedIn, Glassdoor, Adzuna, USAJobs — усі закриті мережевою
політикою). Спрацював обхідний шлях: **пошук по доменах систем найму**, який замість лічильника дає одразу
назви компаній і посилання на живі вакансії.

> ⚠️ Усі рядки нижче — збіги пошукової системи, а не перевірений текст вакансій. Відкрити кожну і
> підтвердити наявність слова gINT — перший крок перед листами.

---

## Знайдені компанії

### Великі інженерні групи

| # | Компанія | Вакансія | Платформа |
|---|---|---|---|
| 1 | **AECOM** | Entry-Level Geotech (Germantown, MD), Staff Geotech (Oakland, CA), Senior Project Geotech (Murray, UT), Geotech Specialist (Markham, ON), Engineering Geologist (Brisbane) | [SmartRecruiters](https://jobs.smartrecruiters.com/AECOM2/744000119972887-entry-level-geotechnical-engineer) |
| 2 | **Parsons** | Senior Geotechnical Engineer, R167955 | [Workday](https://parsons.wd5.myworkdayjobs.com/en-US/Search/job/Senior-Geotechnical-Engineer_R167955-1) |
| 3 | **Gannett Fleming** | Entry Level Geotechnical Engineer | [iCIMS](https://careers-gannettfleming.icims.com/jobs/13873/entry-level-geotechnical-engineer/job) |
| 4 | **Geosyntec Consultants** | Early-Career Geotechnical Engineer, Houston, TX | [iCIMS](https://careers-geosyntec.icims.com/jobs/4612/early-career-geotechnical-engineer/job) |
| 5 | **STV Inc.** | Geotechnical & Tunneling Engineering Specialist, JR1834 | [Workday](https://stvinc.wd5.myworkdayjobs.com/en-US/stv/job/Geotechnical---Tunneling-Engineering-Specialist_JR1834) |
| 6 | **Sargent & Lundy** | Mid-Level Geotechnical Engineer, Remote | [iCIMS](https://careers-sargentlundy.icims.com/jobs/24511/mid-level-geotechnical-engineer/job) |
| 7 | **Kleinfelder** | Entry-Level Geotechnical Engineer, Exton, PA — gINT з Lpile, SlopeW, CAD | вакансія через ЗВО |
| 8 | **M.C. Dean, Inc.** | геотехнічна позиція | пошук |

### Середні та малі фірми — цільовий сегмент

| # | Компанія | Вакансія | Платформа |
|---|---|---|---|
| 9 | **ANS** | Entry-Level + Senior Geotechnical Engineer (дві вакансії) | [Lever](https://jobs.lever.co/ans/ed1cde6f-2de6-4d5e-831b-c98b4d6daccd) |
| 10 | **ALLWEST Testing and Engineering** | Geotechnical Engineer | [Paylocity](https://recruiting.paylocity.com/recruiting/jobs/Details/3300338/Allwest-Testing-and-Engineering-Inc/Geotechnical-Engineer) |
| 11 | **Geo-Technology Associates** | Field Geologist | [Workable](https://apply.workable.com/geo-technology-associates-inc/j/AF0E3D2D89/) |
| 12 | **Geo-Hydro Engineers** | Staff Professional | [Paylocity](https://recruiting.paylocity.com/recruiting/jobs/Details/3356091/Geo-Hydro-Engineers-Inc/Staff-Professional) |
| 13 | **Geotex Engineering** | Geotechnical Logger — «proficiency in logging software, such as gINT» | власний сайт |
| 14 | **2MNEXT** | геотехнічна позиція | пошук |

### Суміжні (гірничі та промислові)

| # | Компанія | Вакансія | Платформа |
|---|---|---|---|
| 15 | **Turner Mining Group** | Geotechnical Engineer | [Breezy](https://turner-mining-group.breezy.hr/p/6be9bb633f8b-geotechnical-engineer) |
| 16 | **SSR Mining**, **Mosaic**, **DEME Group** | геотехнічні позиції | Workday |

---

## Контрольний зріз: gINT проти OpenGround

Той самий пошук зі словом `OpenGround` дав частково **ті самі компанії** — AECOM і ANS фігурують в обох
вибірках. Вакансія, де згадані обидва продукти, означає фірму **в процесі міграції прямо зараз**:
це не холодний лід, а найтепліший з можливих.

Окремо в OpenGround-вибірці: Sargent & Lundy, STV, SSR Mining, Mosaic, DEME.

Співвідношення поки нерепрезентативне (замало запитів), але метод працює і його треба довести до кінця:
частка `gINT ÷ (gINT + OpenGround)` показує, скільки ринку ще не мігрувало, тобто реальний розмір вікна.

---

## Головне спостереження: вибірка зміщена

З 16 знайдених компаній більшість — **великі інженерні групи**. Це артефакт методу: великі роботодавці
користуються Workday, iCIMS і SmartRecruiters, тому саме вони й індексуються.

Проблема в тому, що великі фірми — **не ваш клієнт**. У них є власний ІТ-відділ, корпоративний контракт
з вендором і бюджет на міграцію без підрядника. Ваш клієнт — фірма на 20–80 осіб з 300–1 000 архівних
проєктів і без жодної людини, яка це зробить. Такі фірми або взагалі не публікують вакансії в ATS,
або користуються Paylocity, Workable, Breezy — і саме звідти прийшли рядки 9–14.

**Висновок для методу:** ATS-майнінг добирає не тих. Його треба доповнити каналом, де малі та середні
геотехнічні фірми перелічені за визначенням:

1. **Списки пре-кваліфікованих консультантів департаментів транспорту штатів** — публічні реєстри
   саме середніх геотехнічних фірм, по одному на штат. Це найкраще джерело з усіх.
2. **Довідник членів Geoprofessional Business Association** — галузева асоціація геопрофесіоналів.
3. **Реєстри ліцензованих інженерних фірм штатів** — за напрямом geotechnical.
4. **Списки учасників регіональних конференцій** ASCE Geo-Institute.

---

## Що робити далі

1. **Довести список до 50** — повторити пошук по доменах ATS з іншими формулюваннями ролей
   (`geotechnical technician`, `driller`, `staff geologist`, `laboratory manager`) і додати чотири
   канали вище. За темпом ~4 компанії на запит потрібно ще 8–10 запитів.
2. **Перевірити кожну вакансію вручну** — відкрити і підтвердити слово gINT у тексті. Вакансія, де gINT
   стоїть п'ятим у списку бажаних навичок, — слабкий доказ; де він у контексті обов'язків — жива база.
3. **Знайти контакти.** Тут стає в пригоді Clay: власних функцій у робочому просторі не налаштовано,
   але доступні пошук контактів у компанії та дата-поїнт «Open Jobs». Тобто цей список компаній
   перетворюється на список імен з поштою — а це вже безпосередньо тест 2.
4. **Тест 2** — двадцять листів з пропозицією безкоштовно мігрувати один проєкт як демо.
   Критерій: ≥3 відповіді, ≥1 демо.

## Куди записувати

Продовжувати таблиці вище, додавши колонки: контактна особа → дата листа → відповідь → статус.
