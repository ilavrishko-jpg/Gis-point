# Defence Builder Accelerator — відповіді на заявку

**Статус:** готові до вставки у форму. Англійські блоки — фінальний текст, українські — нотатки.
**Цифри звірені з** `flyby/00-FACTS.md` (вересень 2026).

---

## Вхідні дані — зафіксовано

| Показник | Чинне значення |
|---|---|
| Потреба ринку | **~10 000 од./міс** (10+ інтерв'ю, Лип–Сер 2026) |
| Виробники усно готові купувати | **600+ од./міс** — усні домовленості, письмових LOI немає |
| Ціль першого етапу | **600 од./міс** |
| Раунд | **$500K pre-seed** — чинна сума для всіх аудиторій |
| Старт проєкту | **травень 2026** — п'ять місяців до сьогодні |
| Конкурентна позиція | 15 м — **паритет** із наявними рішеннями; диференціація — швидкість фіксації для 600 км/год і ненакопичувана похибка |
| Години на тиждень | CTO 40+, CEO 20, Chief Scientist 20 |
| Нічний канал | **у дорожній карті** → Q18 йде за Варіантом А |
| Метрика точності | CEP ≈ медіанна радіальна похибка, тому **≤5 m CEP** і «15 m median» сумісні |

✅ **Раунд зведено до $500K скрізь.** Інвестор в опитувальнику питає про $1M — це те, що йому
показали раніше. У DD-відповіді премісу виправлено прямо, з поясненням причини.

✅ **Метрика зведена до медіани.** CEP ≈ медіанна радіальна похибка, тож «≤5 m CEP» тут і
«15 m median» у деку сумісні; у відповіді інвестору виправлено напис RMSE.

## Q18. Контекст взаємодії та головні висновки

> ⚠️ З чернетки прибрати службову фразу «Відповідь склав Claude…» — вона не для форми.

### Пункт 3 про нічний режим — залишаємо

Нічний канал у дорожній карті, тому пункт працює на вас, а не проти: ви знайшли найбільший
незакритий гап ринку і вже поставили його в план. Але в чернетці пункт 3 **не мав наслідку**,
тоді як пункти 1, 2 і 4 його мають. Через це він читався як «знайшли і нічого не зробили».
Нижче наслідок дописаний.

### Фінальний текст

> Fly By started in May 2026. In July, through Defence Builder, we met a military end-user
> expert, and then interviewed 10+ Ukrainian UAV manufacturers and operators (Jul–Aug 2026),
> including military operators currently flying competing systems.
>
> Key learnings:
>
> 1. The real task is narrower than "flying without GPS": the platform must cross a heavy EW zone
>    and hold a valid position over a mid-course segment of roughly 100–200 km.
> 2. Required accuracy is set by the payload: 3–5 m for light one-way platforms, 10–15 m for
>    heavier warheads. Our measured 15 m already addresses the second tier; reaching ≤5 m CEP
>    opens the first, and that became our accuracy target.
> 3. Daylight solutions exist at acceptable prices, so daylight alone is not a defensible
>    position. Night is the unserved gap — existing systems are expensive and do not meet their
>    declared specs. The night channel is now in our roadmap, and closing it is one of the
>    reasons we are applying.
> 4. Units buy integrated systems from manufacturers, so our channel is OEM design-in rather
>    than direct sales.
> 5. We also collected feedback from military operators currently flying competing systems, not
>    only from the manufacturers who integrate them. That gave us both sides of the same
>    problem — what breaks during integration and what fails in the field — and we have designed
>    around those failure modes rather than around a competitor spec sheet.
>
> Together these findings reshaped both our roadmap and our business model.

### Що ще змінив у чернетці

- Пункт 2: додав, що **поточні 15 м уже покривають важчий сегмент**. У чернетці цього немає, і
  через це 15 м виглядають як недосягнута ціль замість уже наявного результату. Це найсильніше,
  що є в цій відповіді, і воно було втрачене.
- Пункт 1: «hold a valid position» замість «hold position» — точніше.
- **Додано дату старту в першому реченні.** «Fly By started in May 2026» перетворює весь абзац:
  усе нижче прочитується як зроблене за п'ять місяців, а не колись.
- **Додано пункт 5** про відгуки від військових, які літають на конкурентних рішеннях. Це
  найцінніше, що у вас є з customer discovery: більшість команд опитують виробників, майже
  ніхто — операторів конкурентів. Те, що ви маєте обидва боки, і є справжнім активом.
- Прибрав «These findings reshaped our roadmap and business model» як окреме речення без опори —
  тепер воно спирається на конкретику вище.

---

## Business & Traction — до трьох ключових результатів

> Fly By started in May 2026. In five months we have gone from nothing to a working algorithm
> and software system, a prototype in flight testing, and direct feedback from 10+ Ukrainian UAV
> manufacturers and operators. Three milestones from that period:
>
> **Customer discovery.** 10+ structured interviews with Ukrainian UAV manufacturers and
> operators (Jul–Aug 2026) established a sector-wide requirement in the order of 10,000
> GPS-denied navigation units per month. Within that, manufacturers have verbally indicated
> readiness to purchase 600+ units per month; 600 units/month is our first-stage target. The
> interviews also validated a two-tier pricing model and set our ≤5 m CEP accuracy target.
>
> **Industry pipeline.** 9 meetings with European UAV manufacturers and navigation suppliers at
> MSPO 2026 (September), with technical follow-ups in progress — including an inbound proposal
> from an IMU/INS supplier to explore integration. [ЗАПОВНИТИ: скільки з 9 мають наступний крок
> із датою]
>
> **Flight-test partnership.** Partner test range secured and prototype units in flight testing,
> measured at 15 m median error under live jamming and spoofing with GPS excluded from the
> solution. Next step: a 10-unit batch for OEM field trials on partner ISR aircraft.

**Що змінив і чому:**

- **Додано арку «травень → вересень».** Це найсильніше, чого бракувало: без дати старту три
  віхи читаються як звичайний прогрес, а з нею — як п'ять місяців від нуля до польотів.
  Для акселератора швидкість команди важить не менше за сам результат.
- **10+ інтерв'ю** замість 20+ — за вашим уточненням.
- **Три рівні попиту розведені явно:** ринок 10 000 → усна готовність 600+ → ціль 600.
  У чернетці була одна цифра, подана як підтверджений попит, і це запрошувало питання
  «як 10 інтерв'ю підтверджують 10 000 на місяць?».
- **«verbally indicated» залишено свідомо:** та сама аудиторія питає про це в DD, і там чесна
  відповідь — «усно, LOI немає». Заявка має говорити те саме.
- **Прибрано «280+ OEM leads in outreach»** — це активність, не тракшен, і воно запрошує
  питання «скільки відповіли?».

## Q24. Хто з команди бере участь і які рішення може ухвалювати

> Питання про те, чи є в кімнаті людина, яка може сказати «так» без узгоджень. Відповідь
> у стилі «ми порадимось із командою» знижує оцінку. Усі троє — співзасновники, тож право
> вирішувати є; важливо показати, хто саме в програмі і за що відповідає.

> **Ievgen Lavrishko — CEO and co-founder** — participates throughout the programme and is the
> decision-maker. He can commit the company without further approval on product roadmap and
> milestone priorities, pricing and commercial model, partnerships and OEM agreements, hiring,
> and fundraising terms. 20+ years in geospatial; built a national-scale cartography company
> (2016–2023) before founding GIS-POINT.
>
> **Andriy Nedvyha — CTO and co-founder** — joins the technical sessions and the milestone work
> on integration and flight testing. Is responsible for technical decisions on architecture, autopilot
> integration and the test programme. 10+ years in scalable software; leads map-matching, IMU
> fusion and autopilot integration.
>
> **Dr. Oleksandr Prokhorchuk — Chief Scientist and co-founder** — available for sessions on
> navigation performance and the military use case. PhD, 30+ years in navigation and UAV
> systems; built and exited a prior UAV company; Chair of the All-Ukrainian AeroGeodetic
> Association.
>
> All three are co-founders, so decisions taken in the programme do not need external approval.

**Час, який команда вкладає у FLY BY:**

> Time committed to Fly By: CTO 40+ hours per week, CEO 20 hours per week, Chief Scientist
> 20 hours per week. All three are available for the two weekly workshops and the individual
> milestone work.

⚠️ Будьте готові до питання, **чому CEO на 20 годинах**, а CTO на 40+. Для акселератора це
помітна асиметрія, особливо коли CEO веде раунд. Відповідь має бути в одному реченні —
[ЗАПОВНИТИ: чим зайняті решта годин і чому це не конфлікт]. Не виправдовуватись, просто назвати.

⚠️ **Виправити в оригінальних матеріалах (сайт, дек, біо).** Там стоїть «Owns the map-matching,
IMU fusion and autopilot integration **outright**». Поряд із «All IP in-house» це читається як
«CTO особисто володіє цією IP» — і саме так це прочитає юрист на DD, де є окреме питання про
IP assignments. Чинне формулювання: **«Leads map-matching, IMU fusion and autopilot integration»**.
У тексті вище вже виправлено.

## Why Defence Builder Accelerator

> Чернетка сильна — залишаю структуру і підсилюю два місця.

> Defence Builder has been part of Fly By from the start: it was through your team that we met
> the military expert whose feedback reshaped the product, and we have followed the programme
> since the idea stage.
>
> The timing fits our stage. The algorithm is validated on real flight data, prototypes are
> flying, and we have measured 15 m median error under live jamming and spoofing. What stands
> between us and a product is no longer mainly engineering: it is GPS-free flight on a real
> platform, validation against a defined military use case, and design-in with Ukrainian UAV
> manufacturers. Those need access, not only capital — and access is the one thing we cannot
> buy with the round.
>
> Our measured 15 m median puts us in the same accuracy band as existing systems, so accuracy
> alone is not our argument. What differentiates us is what we are building next: a fix fast
> enough for jet-powered platforms at 600 km/h, holding accuracy without error accumulating
> along the route, on a passive module that emits nothing. Knowing where competing systems
> disappoint — from the manufacturers who integrate them and from the crews who fly them — is
> what tells us which of those problems to solve first.
>
> Defence Builder brings exactly that: direct links to military users, manufacturer partners
> inside the ecosystem, experience with procurement and certification, and founders who have
> already walked this path.

**Що змінив:**

- Додав **вимірювану цифру** в другий абзац. Без неї «validated on real flight data» — це
  твердження будь-якої команди на цій стадії.
- «Here we need access, not only capital» → додав **«access is the one thing we cannot buy
  with the round»**. Це різниця між «нам би не завадило» і «без вас це не робиться» —
  а саме на друге акселератори відбирають.

---

## 3–5 вимірюваних результатів за чотири місяці

> ⚠️ Головна правка — пункт 3. У чернетці ви **зобов'язуєтесь показати ≤5 м CEP на валідації
> з військовими за 4 місяці**. Поточний виміряний результат — 15 м медіани під РЕБ, а 5 м — це
> ціль **на свіжій картографічній базі**. Обіцяти цифру, до якої треба ще дійти, у списку
> вимірюваних результатів — це заряджена рушниця: на демо-дні вас спитають саме про неї.
> Правильна форма — зобов'язатись **виміряти й опублікувати результат**, а не назвати його наперед.

> 1. Complete onboard integration and fly shadow-mode flights on an open autopilot stack, with
>    Fly By position logged alongside GNSS.
> 2. Carry out the first flight test with GNSS denied, using Fly By as the sole position source.
> 3. Validate one defined use case with military users and report measured accuracy against the
>    ≤5 m CEP target, including the conditions under which it was measured.
> 4. Sign 3–5 LOIs or MoUs with Ukrainian UAV manufacturers.
> 5. Close the $500K pre-seed round.

**Що змінив:**

- П.2: додав **«as the sole position source»** — інакше «GNSS denied» можна виконати формально,
  і це знецінює найважливіший результат програми.
- П.3: **«report measured accuracy against the target»** замість «with measured accuracy against
  the target». Ви зобов'язуєтесь провести вимір і назвати результат — це у вашій владі.
  Зобов'язатись у конкретну цифру — ні.
- П.5: сума зафіксована — **$500K**, та сама в інвесторських матеріалах.

---

## Готовність до чотиримісячної програми

**Відповідь: «Так».**

Варіант «нам потрібно уточнити очікуваний рівень залученості» читається як «ми не впевнені,
що знайдемо час» — і на етапі відбору це відсіює. Два воркшопи на тиждень по годині плюс робота
над цілями — це приблизно 6–8 годин на тиждень на основного учасника.

⚠️ Перед тим як ставити «Так» — переконайтесь, що CEO реально має ці години протягом чотирьох
місяців паралельно з раундом і польотними випробуваннями. Зірвана участь коштує дорожче,
ніж чесне «ні» зараз.

---

## Q36. Додаткові несекретні матеріали

Окрім пітч-деку й демо-відео найсильніше спрацює те, що **підтверджує, а не описує**:

| Матеріал | Чому саме він |
|---|---|
| **Одна сторінка з польотними даними** — графік похибки в часі на прогоні під глушінням, з умовами вимірювання | Єдиний документ, який доводить, що 15 м — не слайд. Найсильніше, що ви можете додати |
| **Технічний додаток на сторінку** (`flyby/sales/08-…`) | Показує, що ви готові до розмови з інженером, а не лише з інвестором |
| **Знімок екрана логів shadow-mode**, якщо вже є | Доводить, що інтеграція — не теорія |

Щодо відео з CEO: воно доречне, якщо в ньому є **щось, чого немає в деку** — наприклад,
пояснення на 60 секунд, чому нічний режим є справжнім гапом. Відео, яке переказує дек,
не додає нічого.

⚠️ Не додавати: назви підрозділів, імена військових, точні локації, TTP — це прямо заборонено
умовами форми. Перевірте демо-відео на фонові деталі: таблички, позивні, впізнавану місцевість.

---

## Що звірити перед відправкою

1. **Конверсія з MSPO** — скільки з 9 зустрічей мають наступний крок із датою.
2. **Одне речення** про те, чому CEO на 20 годинах, — питання прозвучить.
3. **Демо-відео** — перевірити на назви підрозділів, позивні, впізнавану місцевість. Форма це
   прямо забороняє.
4. Прибрати з чернетки службовий рядок «Відповідь склав Claude…».
5. **Біо CTO на сайті й у деку:** «Owns … outright» → «Leads …». У цьому документі вже виправлено.
6. **CTO має підтвердити**, що вихідний прогон 15 м рахували як медіану, а не RMSE.
