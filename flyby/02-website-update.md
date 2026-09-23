# FLY BY — оновлення сайту

Документ для передачі тому, хто робить сайт. Англійські блоки — фінальний текст.
Українські — нотатки для команди. Джерело цифр — `00-FACTS.md`.

> **Не публікувати:** обсяги попиту, ціну, маржу, фінансові прогнози, суму раунду, умови SAFE.
> **Перевірити перед публікацією:** чи можна публічно називати сегменти deep-strike / mid-strike
> (режими експортного контролю, політика замовників).

---

## ⚠️ Два рішення, які треба ухвалити до верстки

### 1. Денний / нічний режим — зараз на сайті про це немає нічого

Якщо продукт сьогодні денний, мовчання про це — прихована переобіцянка: OEM, який купить
із розрахунку на ніч, повернеться зі скаргою, і це дорожче за втрачений лід.

**Рекомендація:** додати один рядок у «Характеристики» і один у «Куди рухаємось».
Формулювання нижче вже вставлені — прибрати, якщо продукт працює вночі вже зараз.

### 2. «Заснована 2026» на сайті не потрібна

Швидкий старт (травень → вересень) — сильний актив **для інвестора й акселератора** і
слабкість **для OEM-покупця**, який оцінює ризик постачальника. Різні аудиторії.
На сайті залишити «Engineered and field-validated in Ukraine» без дати.

---

## 1. Hero

**Eyebrow:** Optical navigation for UAVs · Hardware + software

**Headline:** When GPS dies, the drone flies on.

**Subhead:** FLY BY is a navigation module with its own camera and software that holds absolute
position when GNSS is jammed or spoofed — passive, no RF emissions, built for open autopilots.

**CTA:** Evaluate it on one airframe → `mailto:i.lavrishko@gis-point.com`

**Три факти під hero:**
- 15 m median error under jamming and spoofing
- Up to 110 m/s (≈400 km/h)
- 110–1500 m AGL

---

## 2. Проблема

**Headline:** GPS jamming makes every mission a coin flip.

**Body:** Electronic warfare jams or spoofs GNSS. The drone loses coordinates, drifts and fails
the mission. Link-based fallbacks such as satellite datalinks drop out too. Autonomous navigation
that needs no signal at all is the only dependable answer.

---

## 3. Як це працює

**Headline:** Three methods, one absolute fix.

| Метод | Текст для сайту |
|---|---|
| Visual odometry | Measures motion frame to frame. Carries the solution below 150 m AGL. |
| Terrain mapping | Builds the relief below the aircraft from the image stream and fuses it with the IMU. |
| Map matching | Locks each frame to a reference map and returns absolute coordinates, zeroing accumulated drift. |

**Рядок під таблицею (новий — додати):**

> The result: error does not grow with flight time. It is bounded by match quality, not by how
> long the aircraft has been without GNSS.

*Це найважливіша технічна відмінність від чистої інерціалки, і на сайті вона зараз не сказана.*

---

## 4. Продукт

**Headline:** A module, not a science project.

- **Own downward camera** — no dependence on the airframe's payload. *(Next generation: option to
  use the airframe's own camera.)*
- **Onboard compute and software** — position fix in 100–200 ms.
- **Encrypted onboard map storage** — mission maps stay protected if the aircraft is lost.
- **Open autopilots** — integrates as a navigation source; the autopilot stays in control of the
  solution.
- **Passive** — zero RF emission, nothing for EW to detect.

---

## 5. Карти

**Headline:** Your maps, your choice.

**Body:** The algorithm adapts to the reference base the customer prefers:
- commercial satellite imagery
- open map data
- freshly flown orthophotos

The map base must be no older than 12 months. With a fresh satellite or orthophoto base, the
accuracy target is 5 m.

---

## 6. Характеристики

| Параметр | Значення |
|---|---|
| Median horizontal error under EW | 15 m |
| Best fix | 3 m |
| Target on fresh map base | 5 m |
| Airspeed | up to 110 m/s (≈400 km/h) |
| Altitude | 110–1500 m AGL |
| Below 150 m AGL | visual odometry mode |
| Time to fix | 100–200 ms |
| RF emission | none |
| Map storage | encrypted, onboard |
| Map age | ≤ 12 months |
| Operating mode | daylight *(night channel in development)* ← **новий рядок, див. рішення 1** |
| Autopilot | open-standard autopilots |

Під таблицею дрібно:
*Measured in flight in Ukraine under live jamming and spoofing, GPS excluded from the solution.*

---

## 7. Застосування (dual-use)

- **Reconnaissance UAVs** — hold position over long missions under EW.
- **Strike platforms** — reach the target when GNSS is denied.
- **Civil delivery & logistics** — backup navigation when GNSS drops, keeping deliveries on route.

---

## 8. Куди рухаємось

**Headline:** Built for speed. Built for night.

**Body:** FLY BY already fixes position at 110 m/s. We are extending it to 600 km/h for
jet-powered platforms, holding accuracy without error accumulating along the route. A night
channel is in development — daylight systems are already available at workable prices, while
night remains the gap the market has not closed.

*Зміни проти попередньої версії: додано нічний канал і формулювання про ненакопичувану похибку.
Обидва — з результатів польового discovery, обидва працюють на вас.*

---

## 9. Команда

**Headline:** 40+ years of team experience in geospatial, navigation and UAV systems.
All IP in-house.

- **Ievgen Lavrishko · CEO · Co-founder** — 20+ years in geospatial. Built a national-scale
  cartography company, 2016–2023. Founded GIS-POINT (UK), maker of FLY BY.
- **Andriy Nedvyha · CTO · Co-founder** — 10+ years in scalable software. **Leads** map matching,
  IMU fusion and autopilot integration.
- **Dr. Oleksandr Prokhorchuk · Chief Scientist · Co-founder** — PhD, 30+ years in navigation and
  UAV systems. Built and exited a prior UAV company. Chair, All-Ukrainian AeroGeodetic
  Association.

⚠️ **Критична правка.** У попередній версії біо CTO стояло «**Owns** the map matching, IMU fusion
and autopilot integration **outright**». Поряд із заголовком «All IP in-house» це читається як
«CTO особисто володіє цією IP» — і саме так це прочитає юрист інвестора на due diligence, де є
окреме питання про IP assignments. Тільки «**Leads**».

⚠️ Твердження «All IP in-house» має бути підкріплене підписаними IP assignments від усіх, хто
писав код, включно з підрядниками. Публікувати його до того, як вони підписані, — ризиковано.

---

## 10. Контакт / футер

**Headline:** Evaluate it on one airframe.

Ievgen Lavrishko · CEO · **i.lavrishko@gis-point.com** · +44 7304 286445
OEM design-in · NDA on request

GIS-POINT LTD · UK No. 15059660 · Engineered and field-validated in Ukraine

⚠️ Домен — **gis-point.com**, без «the». У `Flyby_Overview_UA.pdf`, який уже пішов Deviro,
стоїть `thegis-point.com`. Перевірити всі згадки на сайті, у підписах пошти й у PDF.

---

## Що прибрати зі старого сайту

- «Software only» / «no added hardware» — тепер це модуль + ПЗ.
- «Satellite imagery need not be current» — тепер база ≤ 12 місяців.
- «RMSE» — тепер медіана 15 м.
- 50 m/s — тепер до 110 m/s.
- 716 → 200 ms — тепер 100–200 ms.
- Будь-які цифри 3.34 m / 13.2 m / ~17 m / 306 → 7.5 m.
- «Owns … outright» у біо CTO.
- `thegis-point.com` у будь-яких контактах.

---

## SEO

- **Title:** FLY BY — GPS-denied optical navigation for UAVs
- **Description:** Passive optical navigation module for drones. 15 m median accuracy under
  jamming and spoofing, up to 110 m/s, open autopilots.

---

## Перед публікацією

1. Ухвалити рішення 1 (денний/нічний рядок) і рішення 2 (дата заснування).
2. Перевірити, що `thegis-point.com` не лишився ніде.
3. Перевірити політику щодо сегментів deep-strike / mid-strike.
4. Звірити, що IP assignments підписані, перш ніж публікувати «All IP in-house».
