# Defence Builder Accelerator — відповіді на заявку

**Статус:** готові до вставки у форму. Англійські блоки — фінальний текст, українські — нотатки.
**Цифри звірені з** `flyby/00-FACTS.md` (вересень 2026).

---

## ⚠️ Спершу: три розбіжності між документами

Defence Builder, інвестор із DD і Deviro — це перетинне коло людей. Числа мають збігатися.

| Показник | DD-опитувальник інвестора | Чернетка Defence Builder | Що робити |
|---|---|---|---|
| Обсяг попиту | **600 од./міс** | **10 000 од./міс** | Різниця в 16 разів. Це, найімовірніше, «наш пайплайн» проти «ринкова потреба». Розвести явно в обох документах |
| Раунд | **$1M** | **$500K pre-seed** | Або раунд перерозмірили, або це транші. Одна версія скрізь |
| Метрика точності | **15 m RMSE** | **≤5 m CEP** | Див. нижче — тут насправді все гаразд, крім RMSE |

**Про метрику — добра новина.** CEP (circular error probable) — це радіус, що містить 50%
вимірів, тобто фактично **медіанна радіальна похибка**. Отже «15 m median» у деку і «CEP»
у заявці — **сумісні**. Неузгоджений лише **RMSE** в інвесторських матеріалах. Тобто
виправляти треба одну цифру в одному місці, а не три документи.

---

## Q18. Контекст взаємодії та головні висновки

> ⚠️ З чернетки прибрати службову фразу «Відповідь склав Claude…» — вона не для форми.

### Рішення щодо пункту 3 (нічний режим): **залишаємо, але дописуємо наслідок**

**Чому залишаємо.** Питання просить *learnings*, а не презентацію. Незручний висновок
викликає більше довіри за чотири зручні — він доводить, що customer discovery був справжній,
а не підтверджував те, що ви й так хотіли почути. Вони все одно спитають про нічний режим;
краще, щоб ви назвали це першими.

**Чому в поточному вигляді це самоціль у свої ворота.** Пункти 1, 2 і 4 мають наслідок
(«This set our target…», «so our channel is OEM design-in»). **У пункту 3 наслідку немає.**
Через це він читається як «ми з'ясували, де справжній ринок, і нічого з цим не зробили».
Плюс він тихо суперечить пункту про попит: якщо денні рішення вже є за прийнятною ціною,
то звідки попит на 10 000 одиниць.

**Фікс — одне речення.** Дописати, що з цим зроблено.

⚠️ **Перед відправкою перевірити:** чи нічний канал реально в дорожній карті? У деку вересня
2026 роадмап — це 600 км/год і робота з камерою борту, **нічний режим там не згадано взагалі**.
Якщо його в плані немає — беріть Варіант Б.

### Варіант А (рекомендований) — якщо нічний канал у роадмапі

> In July 2026, through Defence Builder, we met a military end-user expert, and then interviewed
> 20+ Ukrainian UAV manufacturers and operators (Jul–Aug 2026).
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
>    declared specs. We moved the night channel from a later phase into a funded milestone;
>    closing it is one of the reasons we are applying.
> 4. Units buy integrated systems from manufacturers, so our channel is OEM design-in rather
>    than direct sales.
>
> Together these findings reshaped both our roadmap and our business model.

### Варіант Б — якщо нічного каналу в плані поки немає

Замінити пункт 3 на:

> 3. Daylight solutions exist at acceptable prices, so daylight alone is not a defensible
>    position. Night is the unserved gap — existing systems are expensive and do not meet their
>    declared specs. We have not committed to a night channel yet: we first need to establish
>    what sensor and what unit cost would make it viable, and that assessment is one of the
>    things we want to do inside the programme.

Це теж чесно і теж сильно — «ми знайшли гап і ще не знаємо, чи можемо його взяти» виглядає
краще, ніж обіцянка без плану. Чого робити **не можна** — залишити пункт 3 без жодного наслідку.

### Що ще змінив у чернетці

- Пункт 2: додав, що **поточні 15 м уже покривають важчий сегмент**. У чернетці цього немає, і
  через це 15 м виглядають як недосягнута ціль замість уже наявного результату. Це найсильніше,
  що є в цій відповіді, і воно було втрачене.
- Пункт 1: «hold a valid position» замість «hold position» — точніше.
- Прибрав «These findings reshaped our roadmap and business model» як окреме речення без опори —
  тепер воно спирається на конкретику вище.

---

## Business & Traction — до трьох ключових результатів

> ⚠️ Розвести «ринкова потреба» і «наш пайплайн». Зараз 10 000 од./міс подані так, ніби це
> підтверджений попит на нас. Крім того, **20 інтерв'ю не можуть «підтвердити» 10 000 од./міс** —
> це екстраполяція. Рецензент, який знає ринок, це помітить і знеціннить усю відповідь.

> **Customer discovery.** 20+ structured interviews with Ukrainian UAV manufacturers and
> operators (Jul–Aug 2026). The manufacturers we spoke to described a combined requirement in
> the order of 10,000 GPS-denied navigation units per month across the sector; our own
> near-term pipeline within that is [ЗАПОВНИТИ: 600] units/month. The interviews also validated
> a two-tier pricing model and set our ≤5 m CEP accuracy target.
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

- **«confirmed demand» → «described a combined requirement in the order of»**. Це те саме
  за змістом, але захищене від питання «як 20 інтерв'ю підтверджують 10 000?».
- **Прибрав «280+ OEM leads in outreach».** Ліди в аутрічі — не тракшен, це активність.
  Цей рядок запрошує питання «а скільки відповіли?», на яке немає хорошої відповіді.
  Якщо є конверсія — назвати її; якщо ні — рядок шкодить, бо розбавляє два сильні пункти.
- **Додав вимірювану цифру в пункт про польоти.** Це єдиний пункт із трьох, де є результат,
  а не активність. Він був найсильнішим і найменш розкритим.

---

## Q24. Хто з команди бере участь і які рішення може ухвалювати

> Питання про те, чи є в кімнаті людина, яка може сказати «так» без узгоджень. Відповідь,
> у якій фігурує «ми порадимось із командою», знижує оцінку.

> **Ievgen Lavrishko, CEO and co-founder**, will participate throughout the programme and is
> the decision-maker. He can commit the company without further approval on: product roadmap
> and milestone priorities, pricing and commercial model, partnerships and OEM agreements,
> hiring, and fundraising terms.
>
> **[ЗАПОВНИТИ: Andriy Nedvyha, CTO]** will join the technical sessions and the milestone work
> on integration and flight testing, and owns technical decisions on architecture, autopilot
> integration and the test programme.
>
> [ЗАПОВНИТИ: підтвердити, чи справді CTO бере участь, і скільки годин на тиждень кожен
> реалістично виділяє. Не обіцяти того, чого не буде — це перевіряється на другому тижні.]

---

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
> 5. Close the [ЗАПОВНИТИ: $500K / $1M] pre-seed round.

**Що змінив:**

- П.2: додав **«as the sole position source»** — інакше «GNSS denied» можна виконати формально,
  і це знецінює найважливіший результат програми.
- П.3: **«report measured accuracy against the target»** замість «with measured accuracy against
  the target». Ви зобов'язуєтесь провести вимір і назвати результат — це у вашій владі.
  Зобов'язатись у конкретну цифру — ні.
- П.5: звірити суму з тим, що пішло інвестору ($1M у DD проти $500K тут).

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

1. **Сума раунду** — $500K тут проти $1M в інвесторському DD. Одна версія.
2. **Обсяг попиту** — 10 000/міс (ринок) проти 600/міс (пайплайн). Розвести явно в обох документах.
3. **Метрика** — CEP і медіана сумісні; виправити **RMSE** в інвесторських матеріалах.
4. **Нічний режим** — чи є в роадмапі. Від цього залежить Варіант А чи Б у Q18.
5. **CTO в програмі** — підтвердити участь і години.
6. **Конверсія з MSPO** — скільки з 9 зустрічей мають наступний крок із датою.
