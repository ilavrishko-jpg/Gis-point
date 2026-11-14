# GIS-Point: бренд-герой Azimuth (орел-геоінженер)

Робочий документ для маркетингу. Зібрано рішення, обґрунтування, альтернативи,
стікерпак, носії та промпти для Gemini на мокапи. Дата: 2026-11-14.

---

## 1. Навіщо герой

Аналог: кіт monobank. Він працює, бо дає бренду обличчя, емоцію і впізнаваність
у стікерах і мерчі. Для GIS-Point задача інша: B2B, покупець це Head of
Production / Operations Director / GIS Manager у геодезичній фірмі 30-200 людей
у UK та EU. Контактів із брендом мало, тому герой має:

- читатись геодезистом за пів секунди (жилет hi-vis, віха GNSS, каска);
- жити там, де живе покупець: кейси Pelican, штативи, каски, стенди Intergeo
  та GEO Business, LinkedIn, підпис в email;
- працювати і на HR-бренд у Львові (найм BSc-геодезистів);
- тримати голос бренду: цифри замість прикметників, без хайпу, без емодзі.

## 2. Рішення: орел Azimuth

Герой: стилізований орел-експерт, який бачить згори, помічає те, що інші
пропустили, і збирає з даних зйомки digital twin. Ім'я Azimuth, геодезичний
термін, однаково читається EN/UA.

### Чому орел працює

- Ідіома eagle eye: точність, QA, <7% rework.
- Вид згори прямо римується з LiDAR, дроном, аерозйомкою.
- Архетип експерта підходить для освітнього контенту на LinkedIn.

### Ризики орла і як їх закрити

| Ризик | Як закриваємо |
|---|---|
| Орел на гербах Німеччини, Польщі, Австрії, США. У DACH читається як державний символ | Жодної геральдики: округлі пропорції, SaaS-mascot стиль, жилет, окуляри. Явний негатив у промптах: no shields, no emblems |
| Хижак і домінація суперечать позиціонуванню embedded partner | Спокійна поза, закритий дзьоб, ніколи не атакує. Експерт, а не хищник |
| Герой-учитель лекторствує покупцю, який сам експерт 20 років | Роль інспектора, не вчителя. Не каже, як працювати. Каже, що побачив у даних, і завжди закінчує цифрою |
| Тисячі орлів у логотипах | Впізнаваність роблять жилет #2ECC8E, каска, окуляри і фіолетовий digital twin, а не птах сам по собі |

## 3. Характер

- Спокійний профі з сухим гумором. Не пустун, як кіт mono.
- Рідко усміхається, але завжди доставляє в строк.
- Фірмовий жест: піднята брова, коли знайшов помилку в даних.
- Формат «підказує» без лекторства: рубрика «що я побачив у ваших даних»:
  невідповідність CRS, 12% шуму в хмарі, пропущений клас рослинності,
  rework вище 7%. Proof before claim.

## 4. Візуальний код

- Тіло: темний графіт #2D2D2D. Голова світла, пом'якшений образ білоголового орла.
- Жилет hi-vis: фірмовий зелений #2ECC8E, світловідбивні смуги. Акцент #1D6B4F.
- Каска темна, тонкі прямокутні окуляри.
- В одному крилі віха GNSS або тахеометр, в іншому планшет із wireframe-моделлю.
- Digital twin на зображеннях: фіолетовий #7C6FCD (колір IT Unit). Так одна
  картинка показує і хто ми (зелений вхід), і що продаємо (фіолетова верхня
  сходинка драбини).
- Стиль: плоский вектор, 2-3 тони, товстий контур, силует читається в 32 px
  і на кейсі з 3 метрів.
- Заборонено: градієнти, реалізм, щити, прапори, емблеми, агресивні пози,
  розкриті кігті, крик.

## 5. Альтернативи, які розглядали

| Герой | Сильна сторона | Чому не перший |
|---|---|---|
| Лелека (Datum) | Стоїть на точці, гніздо на стовпі = GNSS-віха, знаковий у UA і DACH | Слабший у Британії |
| Боривітер (kestrel) | Зависає над однією точкою, eagle eye без герба, відомий у UK | Гірше впізнаваний у 32 px |
| Крук (Theo) | Найрозумніший птах, чистий архетип експерта, Tower of London | Темний образ для частини аудиторії |
| Бордер-колі (Bench) | Зганяє точки в класи = класифікація хмари, культовий у UK, embedded partner у чистому вигляді | Не літає, не «бачить згори» |
| Сова | Експерт | Зайнята Duolingo |
| Пін на карті | Прямий зв'язок з назвою | Неживий, виглядає як Google Maps |

Орел обраний як рішення команди. Решту лишаємо як резерв на випадок, якщо
тести з аудиторією покажуть геральдичне зчитування.

## 6. Стікерпак, перша серія, 12 штук

| # | Сюжет | Підпис EN | Підпис UA |
|---|---|---|---|
| 1 | Зависає нерухомо, дивиться одним оком у тахеометр | Holding the point | Тримаю точку |
| 2 | Лупа над хмарою фіолетових точок, одна червона | Found it | Знайшов |
| 3 | Показує крилом на готовий wireframe-будинок | Twin ready | Twin готовий |
| 4 | Завалений паперовими картами і дисками, незворушний | Backlog after tender | Беклог після тендеру |
| 5 | Стукає по годиннику, 09:00 | Same day, CET | Той самий день, CET |
| 6 | Ставить штамп із зеленою галочкою | QA pass | QA пройдено |
| 7 | Спить на жердині, ноутбук крутить прогрес-бар | Your overnight, our full day | Ваша ніч, наш робочий день |
| 8 | П'є чай, дивиться на готову 3D-модель міста | Shipped | Відправлено |
| 9 | Піднята брова, дві карти не збігаються | Wrong datum | Не той датум |
| 10 | Великий палець крилом, каска набакир | <7% rework | <7% rework |
| 11 | Летить із згорнутим кресленням під крилом | Delivering | Доставляю |
| 12 | Тільки голова, іконка для аватарів | без тексту | без тексту |

## 7. Носії та де живе герой

1. Вінілові стікери для кейсів Pelican, штативів, касок. Роздаємо на Intergeo
   і GEO Business. Живуть на об'єктах роками.
2. Telegram-стікерпак для україномовної геоспільноти: одночасно HR-бренд.
3. LinkedIn: каруселі, де Azimuth оповідає кейси; рубрика «що я побачив у даних».
4. Підпис в email, лендінг demo dataset, стенд на виставці, худі для команди.

## 8. Промпти для Gemini (мокапи)

Промпти англійською: Gemini стабільніше тримає стиль. Один запит дає один мокап,
копіюйте блоками. Спочатку character sheet, далі кожний наступний запит
супроводжуйте картинкою-референсом і фразою `keep this exact character design`.

### 8.1 Character sheet

```
Character design sheet for a B2B brand mascot: a stylised eagle named Azimuth,
the expert geospatial engineer of GIS-Point, a UK/EU geodata production company.

CHARACTER
- Friendly, calm, confident eagle. Expert, not predator. Slightly rounded body,
  big attentive eyes, small smile. Think "senior engineer", not "coat of arms".
- Wears a hi-vis safety vest in bright green #2ECC8E with reflective stripes,
  a dark hard hat, and thin rectangular glasses.
- Body feathers dark charcoal #2D2D2D, beak and talons warm amber,
  white head feathers like a bald eagle but softened.
- In one wing it holds a surveyor's GNSS pole; in the other a tablet
  showing a glowing wireframe 3D city model.

STYLE
- Flat vector illustration, 2-3 tone shading, thick clean outlines,
  sticker-ready silhouette, readable at 32 px.
- Modern tech-brand mascot style (like fintech or SaaS mascots),
  no realism, no heraldry, no shields, no flags, no national symbols.
- Background: plain white.

LAYOUT
- Sheet with: front view, 3/4 view, side view, flying pose,
  three facial expressions (focused, pleased, raised eyebrow "I spotted an error").
- Small colour palette swatches: #2ECC8E, #1D6B4F, #2D2D2D, #7C6FCD.

NEGATIVE
- No aggressive pose, no spread talons attacking, no screaming beak,
  no eagle-on-a-shield, no US/German/Polish emblem look, no gradients,
  no text, no watermark.
```

### 8.2 Hero scene: Azimuth створює digital twin

```
Illustration, same character Azimuth the eagle (dark charcoal #2D2D2D body,
green #2ECC8E hi-vis vest, hard hat, glasses), flat vector style, thick outlines.

Scene: Azimuth hovers above a real industrial site (substation, pipelines,
a railway bridge, surveyed terrain) drawn in muted grey. From his wingtips,
a stream of tiny glowing dots (a LiDAR point cloud) flows down and assembles
into a precise purple #7C6FCD wireframe digital twin of the same site
floating beside the real one, half-finished, like a hologram being built.
Below, two human engineers in a UK survey-company office look at the twin
on a large screen, impressed but calm.

Mood: precision, control, "nothing is missed". B2B, serious but warm.
Composition: wide 16:9, eagle upper-left, real site lower-left,
digital twin right, lots of clean negative space for a headline.
No text. White or very light grey background.
```

### 8.3 Стікерпак, 12 штук

```
Sticker pack sheet, 12 die-cut stickers of the same mascot Azimuth the eagle
(dark charcoal body, green #2ECC8E hi-vis vest, hard hat, glasses),
flat vector, thick white die-cut border around each sticker, white background,
arranged in a 4x3 grid. Each sticker one pose, no text:

1 hovering motionless, one eye squinting through a surveyor's total station
2 holding a magnifying glass over a cloud of purple dots, one red dot found
3 pointing a wing at a glowing purple wireframe building, satisfied
4 buried to the neck in a pile of paper maps and hard drives, deadpan
5 tapping a wristwatch, calm, clock shows 09:00
6 stamping a document with a green check mark
7 asleep on a perch, laptop still running a progress bar
8 sipping tea from a mug, looking at a finished 3D city model
9 raised eyebrow, holding two maps that don't line up
10 giving a thumbs-up with a wing, hard hat tilted
11 flying with a rolled-up blueprint under the wing
12 small flat icon version: head only, for avatars

Consistent character across all 12. No heraldic style, no text, no gradients.
```

### 8.4 Мокап: кейс Pelican

```
Photorealistic product mockup: black Pelican-style hard equipment case
for survey instruments on a muddy construction site,
a vinyl sticker of Azimuth the eagle mascot (flat vector, charcoal body,
green #2ECC8E hi-vis vest, hard hat) placed on the lid next to an
old worn "GEO Business" sticker. Natural daylight, shallow depth of field.
```

### 8.5 Мокап: виставковий стенд

```
Photorealistic mockup: 3x6 m exhibition stand at a geospatial trade show
(Intergeo style hall). Back wall: flat vector Azimuth the eagle building
a purple #7C6FCD wireframe digital twin from a stream of point-cloud dots,
white background, green #2ECC8E accents. Headline on the wall exactly:
"Digital twins from your survey data." Sub-line exactly: "<7% rework."
Two visitors talking to a staff member. Clean corporate look, no hype words.
```

### 8.6 Мокап: LinkedIn banner

```
LinkedIn banner 1584x396, flat vector: Azimuth the eagle on the right,
calm, pointing at a purple wireframe digital twin of a railway bridge
assembled from LiDAR dots. Left side plain white space for text.
Green #2ECC8E and charcoal #2D2D2D only, plus purple twin. No text.
```

### 8.7 Мокап: худі

```
Photorealistic mockup: dark charcoal hoodie worn by an engineer in an office,
small embroidered Azimuth the eagle head (flat vector, green hard hat)
on the chest, left side. Minimal, premium B2B merch feel.
```

### 8.8 Поради щодо Gemini

- Спочатку character sheet. Далі кожен запит із референсом і
  `keep this exact character design`, інакше орел буде різний на кожній картинці.
- Текст на картинках Gemini ламає. У промптах текст або заборонений, або заданий
  точною фразою в лапках, максимум дві фрази.
- Якщо вилазить геральдичний орел: додати `cute rounded proportions, SaaS mascot,
  Pixar-like friendliness` і повторити негатив про shields і emblems.
- Gemini дає растр. Для стікерів і друку фінал відвекторити в Illustrator або Figma.

## 9. Обмеження бренду, які герой не має порушувати

- Без емодзі в копі. Герой у стікерах це ілюстрація, не емодзі.
- Без хайп-слів: revolutionary, game-changing, world-class, cutting-edge, AI-native.
- Без порівнянь за національністю і без згадок конкурентів.
- Цифри тільки з верифікованого списку: <7% rework; 500 km LiDAR за 4 дні при
  97.2%. Нові метрики погоджує Head of Delivery.
- Не «free pilot», а «demo dataset».

## 10. Наступні кроки

1. Згенерувати character sheet у Gemini, обрати вигляд.
2. Під обраний вигляд допрацювати промпти 8.2-8.7 і зібрати мокапи.
3. Бриф для ілюстратора: 3 ракурси, палітра, 12 сюжетів, специфікація вінілу.
4. Перший тираж стікерів до найближчої виставки, Telegram-пак для геоспільноти.
5. Запуск рубрики «що я побачив у ваших даних» на LinkedIn, 1 випуск на тиждень.
