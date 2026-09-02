# INTERGEO 2026 — секвенція на зустріч · Unit 2 (IT / GeoAI Engine)

**Ціль:** зустріч на виставці, Munich 15–17 Sep. Нічого більше.
**Юніт:** IT / GeoAI Engine. **Не** продаємо обробку даних, не згадуємо rework, Scan-to-BIM, 500 km LiDAR, 97.2%, 570+ проєктів — це Unit 1.
**Кому:** GIS/survey фірми 20–200 з власним продуктом або dev-беклогом · GeoTech SaaS · Sat/EO · виробники UAV.
**Buyer:** CTO · Head of Product · Founder.
**Біль на вході:** roadmap більший за dev-команду · клієнти просять портал · Esri per-seat стає непідйомним · desktop-воркфлоу не масштабується.
**Пруфи — тільки software-кейси** (§7 Offer v2.1): powerline-вектор · георефернс · NL→query · PlateauGIS · Potree-viewer · UAV GPS-denied · allgis.io.
**Ритм:** день 0 · 3 · 6 · 9 · 12 (останній — 14 вересня, за день до відкриття).
**Плейсхолдери:** `[First name]`, `[Company]`, `[Hall X · Stand Y]`, `[calendar link]`.

---

## Лист 1 — День 0

**Subject:** Meeting at INTERGEO, 15–17 Sep?

Hi [First name],

Ievgen from GIS-Point. We are the engineering team that geospatial companies bring in when the product roadmap is bigger than the dev team: web-GIS platforms, point cloud tooling in the browser, automation and GeoAI on top of spatial data. Open-source stack, and the code and IP are yours from day one.

Our own product runs on that same stack — allgis.io, multi-tenant web-GIS in production.

We will be at INTERGEO in Munich with a stand, [Hall X · Stand Y].

Worth 20 minutes there? I can come to your stand, or you come to ours. Mostly I want to hear what is on the [Company] roadmap that engineering has not got to yet.

Ievgen

---

## Лист 2 — День 3

**Subject:** Re: Meeting at INTERGEO, 15–17 Sep?

Hi [First name],

Following up on Munich — are you going?

If yes, pick a slot and I will hold it: [calendar link]. Tuesday and Wednesday mornings are still open.

And if you would rather answer in one line: what is the thing your team would build next if there were hands for it?

Ievgen

---

## Лист 3 — День 6

**Subject:** Re: Meeting at INTERGEO, 15–17 Sep?

Hi [First name],

So you know what a conversation with us is actually about — three things we get asked to build:

- **Your data in the browser instead of on desktops.** A web 3D point cloud viewer we built handles trillions of points with role-based access, and replaced the desktop workflow it was meant to support. Same for multi-tenant web-GIS: unlimited client organisations, full isolation, no desktop step in publishing.
- **Manual steps turned into pipelines.** Automated aerial photo georeferencing: around 25 ground control points per frame, 5 to 13 minutes per frame, zero points placed by hand. On a power-line job, 118.8M points to vectorised geometry — 333 spans at 2.2 cm, with no per-seat licences anywhere in the chain.
- **Questions answered without a GIS specialist in the loop.** Natural language straight to PostGIS: it removes the queue to your GIS team rather than speeding it up. Self-hosted, data stays on your side.

All of it open-source underneath, so your platform does not depend on somebody else's roadmap. PointFuse getting absorbed and shut down last year made that argument for us.

Which of those is closest to your situation? Or we skip email and talk in Munich — [Hall X · Stand Y].

Ievgen

---

## Лист 4 — День 9

**Subject:** Next week in Munich

Hi [First name],

INTERGEO opens Tuesday and the calendar is filling up.

20 minutes, your stand or ours: [calendar link]

Not going? A call the week after works just as well.

Ievgen

---

## Лист 5 — День 12

**Subject:** Re: Next week in Munich

Hi [First name],

Last one from me before the show.

The invitation stands: [Hall X · Stand Y], any time on 15–17. Bring a sample dataset and we can put it in the browser on the spot.

And if this is not your call at [Company] — who owns the platform side there?

Ievgen

---

## Нотатки

- **Не змішувати з ГІС-контуром.** Якщо акаунт уже веде Unit 1 — не чіпаємо.
- Цін і драбини оферів у листах немає: вхід у розмову — зустріч, Discovery Sprint озвучуємо вже на ній.
- allgis.io показуємо ГІС/гео-аудиторії. Аграріям — AgroDataHub, і це інша секвенція.
- UAV GPS-denied кейс (3,34 м, 154 зі 155 кадрів) тримаємо в запасі для виробників дронів — у холодний лист не ставимо.
- Після виставки — окремий post-show тред.
