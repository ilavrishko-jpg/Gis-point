# Джерела та примітки про достовірність

Дослідження виконано через веб-пошук (червень 2026). Нижче — ключові джерела
за типами. Дані про окремі компанії зібрані з профілів LinkedIn, ZoomInfo,
RocketReach, PitchBook, Crunchbase, Dun & Bradstreet та офіційних сайтів фірм.

## Галузева статистика (знаменник)
- IBISWorld — Surveying & Mapping Services (NAICS 541370): кількість бізнесів,
  зайнятість, обсяг ринку.
  https://www.ibisworld.com/united-states/number-of-businesses/surveying-mapping-services/1407/
  https://www.ibisworld.com/classifications/naics/541370/surveying-and-mapping-except-geophysical-services/
- US Census Bureau — County Business Patterns (CBP) / SUSB, NAICS 541370.
  https://www.census.gov/programs-surveys/cbp.html
  https://www.census.gov/data/tables/2022/econ/susb/2022-susb-annual.html
  API (для розподілу по штатах × розмірних класах):
  https://api.census.gov/data/2022/cbp?get=ESTAB,EMP&for=state:*&NAICS2017=541370&EMPSZES=*
- BLS — QCEW, "Mapping employment in surveying and mapping services" (2023).
  https://www.bls.gov/opub/ted/2024/mapping-employment-in-surveying-and-mapping-services.htm

## Галузеві каталоги / асоціації
- MAPPS (Management Association for Private Photogrammetric Surveyors) — ~160 фірм-членів.
  https://www.mapps.org/
- ensun.io, inven.ai, VentureRadar, aeroleads — каталоги компаній (частково 403 на пряме читання).
- ASPRS — професійна асоціація (фотограмметрія/дистанційне зондування).

## Примітки про достовірність
- **HQ-штат:** висока достовірність майже для всіх фірм.
- **Кількість працівників:** переважно `med`/`low` — це діапазони агрегаторів,
  не аудовані цифри. Розходження між джерелами ±30–50% типові для приватних фірм.
- **AEC-фірми:** показано розмір УСІЄЇ фірми; geospatial-підрозділ зазвичай менший
  (часто 50–250 осіб), окремо публічно не розкривається.
- **Консолідація:** сектор активно поглинається; деякі історичні бренди вже
  не існують самостійно (див. §9 REPORT.md).
- **Багато сторінок (LinkedIn, ZoomInfo, RocketReach, Census) повертали HTTP 403**
  на автоматичне читання — цифри взято зі сніпетів пошуку та крос-перевірки кількох
  джерел, а не з прямого читання сторінок.

## Не включено (поза скоупом)
- Не-US фірми: Eagle Mapping (CA-Канада), North West Geomatics (Канада),
  Mapcon/Aeroquest (Канада), GeoFly (Німеччина), SUMO Services (Велика Британія),
  Petros Eikon (Канада).
- Історичні/поглинуті без самостійного бренду: AeroMetric, Photo Science,
  HJW GeoSpatial, Quantum Spatial (=NV5), 3001 International (→Northrop Grumman),
  Terrapoint (defunct), Markhurd (історична).
- Esri (Redlands, CA, ~6000+) — домінантний вендор GIS-ПЗ, не сервісна фірма;
  згадано окремо, не входить у реєстр сервісних компаній.
