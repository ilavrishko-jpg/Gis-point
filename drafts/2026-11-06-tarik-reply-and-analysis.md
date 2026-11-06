# Відповідь Таріку (Deutsche Infrasoft) + аналіз для GIS Point

Дата: 06.11.2026
Статус: драфт для відправки. Транскрипт дзвінка додати як вкладення (Тарік просив саме транскрипт, не саммарі).

---

## 1. Лист-відповідь (англійською)

**Subject:** Follow-up on our call – railway pilot status and an alternative pilot with Lviv regional road authority

Dear Tarik,

Thank you again for the call with Oleksandr and me. As promised, the full transcript is attached (the transcript, not a summary, as you asked).

Since the call I have had two conversations that change the picture, so let me be direct about both.

**1. Railway: the pilot will not be approved under current conditions.**
I spoke personally with the regional railway management responsible for our area. Their answer is clear: while the war continues, a project that captures a railway corridor with laser scanning and high-resolution imagery cannot be approved. Railway infrastructure is treated as a strategic, critical asset; a very large part of military and economic logistics runs on it. The only comparable surveys are done under direct coordination of the Security Service of Ukraine (SBU), for internal and urgent operational needs only, and never with external parties or foreign data flows.

My honest assessment: this is not a Lviv-specific position. No regional or board-level manager anywhere in Ukraine will take personal responsibility for a precise geospatial dataset of the railway leaving the system, because of the risk that it ends up as targeting data. I expect the letter to the Chairman of the Board to receive the same answer, or no answer. I am sure you understand the logic, and I would rather tell you now than let you invest months in a process that has no realistic path to approval before the war ends.

The good news is that everything we discussed technically (INS plus odometric/Doppler aiding, PPK with the regional GNSS networks, ground control points, Lviv Polytechnic as the methodological validator) stays fully relevant. It just needs a different corridor.

**2. Roads: a real alternative in Lviv region.**
I also spoke with a close friend who is Deputy Head of the regional road authority of Lviv oblast (the former "Oblavtodor", now the regional Service for Restoration and Infrastructure Development). He is ready to consider the same type of pilot for a regional road corridor: mobile laser scanning plus 360° high-resolution imagery, producing a georeferenced point cloud and a BIM / digital-twin model of the road, its structures and roadside assets.

Why I think this is actually a better entry point for you:

- Roads are far less security-sensitive than railway; approval sits at regional level, not with a national board and the SBU.
- The GNSS situation is the same as for railway, so the methodology you want to develop and later propose as a standard gets tested anyway.
- Lviv region has active GNSS/RTK networks (System.NET, ZAKPOS) and several reference stations around Lviv, so PPK/RTK plus a reduced set of control points is realistic.
- Road reconstruction is where EU and IFI money is flowing right now (Ukraine Facility, EIB, EBRD, World Bank). A BIM-based road asset model aligned with EU standards is exactly what these programmes ask for, and the regional authority knows it.
- For the regional authority this is also visible, positive "modern technology for the region" news, which is the kind of support they value, as we discussed on the call.
- GIS Point has an office and field team in Lviv; Oleksandr can move part of his navigation team there to set up and test the INS/odometric configuration.

**What I need from you.**
My friend is ready to take this to his boss, the Head of the authority, but he needs something in hand. Please send me a short presentation (5–8 slides is enough, English is fine, we will translate the key slide) covering:

1. Who you are: the group, Deutsche Infrasoft, your railway/road references in Germany and CIS/EU.
2. What the pilot is: a road corridor of roughly 50–100 km, scanning + imagery, deliverables (point cloud, BIM model, asset inventory, pavement/structure condition layer), target accuracy.
3. What the authority gets: deliverables, data ownership, a methodology they can reuse, and how it connects to EU-standard documentation and future funding applications.
4. What you need from the authority: access permit, a counterpart engineer, selection of the corridor, use of existing survey data and reference points.
5. Timeline: preparation, field work (days, not months, if GNSS-aided), processing, presentation of results.
6. Commercial model for the pilot: free of charge / co-funded / nominal cost, and what the follow-up business model looks like.
7. Data security: where data is stored and processed, who has access, what is not collected. This slide matters a lot here, even for roads.
8. Partners: GIS Point (field, geodesy, local coordination), Oleksandr's team (navigation/INS), Lviv Polytechnic (validation).

If you can send this within the next two weeks, I can get a meeting with the Head of the authority arranged quickly. This route is much faster and more realistic than the railway one, and it still gives you the Ukrainian pilot, the trained local team and the standards story you presented to your investor.

Looking forward to your view, and happy to set up a short call with Oleksandr and my friend from the road authority once you have had a chance to look at this internally.

Best regards,
Ievgen (Eugene) Lavrishko
GIS Point, Lviv

Attachment: call transcript (TXT/DOCX)

---

## 2. Аналіз: що хочуть німці

**Хто.** Тарік Ільяс, директор з продажів і маркетингу групи компаній (Deutsche Infrasoft), екс-Deutsche Bahn, відповідав за Україну, Казахстан, Узбекистан, Хорватію. Не інженер, а бізнес-людина з досвідом site supervision, design, consulting. За ним є інвестор.

**Що хочуть зробити зараз.**
- Пілот на ~100 км залізниці (бажано Захід України): мобільне лазерне сканування + 200 МП панорамна камера → хмара точок → BIM-модель колії та інфраструктури.
- Цільова точність ~10 см (сигма), інакше BIM безглуздий.
- Головна проблема: нема GNSS (jamming/spoofing). SLAM і AHRS у Trimble MX9 без GNSS дають «кому» точок. Шукають методику позиціонування без GNSS.
- Відповідь Олександра, яку вони купили: тактичний INS (не AHRS) + одометрія/доплер + GCP кожні ~20 км + PPK від мереж System.NET/ZAKPOS; підтвердження методики Львівською політехнікою.

**Що хочуть насправді (стратегічно).**
- Зайти в Україну під відбудову: заснувати компанію, набрати і навчити локальних людей, зробити пілот руками цієї команди.
- На базі пілота запропонувати уряду України стандарти цифрового капчуру/BIM інфраструктури, узгоджені з TSI і нормами ЄС. Хто пише стандарт, той потім отримує тендери і стає «правильним» підрядником під гроші ЄС.
- Залізниця була лише першим «носієм» ідеї. Вони самі сказали: пілот не має бути складним, це прототип. Тобто дорожній кейс не ламає їхню логіку, а навпаки, прибирає найбільший блокер (безпека, УЗ, СБУ).
- Планують «further business in Ukraine on various topics» і готові обговорювати окремо. Це сигнал: вони шукають локального партнера-оператора, а не разового підрядника.

**Що для них критично.** Безпековий дозвіл, локальна підтримка (адмінконтакти, польова команда, геодезичний контроль), робоча методика без GNSS, і щоб результат можна було масштабувати на всю країну.

---

## 3. Куди варто фокусуватися GIS Point

**Головний інсайт із дзвінка.** Західні інжинірингові компанії мають техніку, гроші і амбіцію зайти в Україну, але не мають трьох речей: позиціонування без GNSS, доступу до дозволів/адміністрацій і польових людей на місці. Усі три є у GIS Point (плюс Олександр і Політехніка). Це і є продукт.

**Фокус 1. «Ground partner» для іноземних інжинірингових і геодезичних компаній в Україні.**
Пакет: польовий збір даних, геодезичний контроль (GCP, тахеометрія, RTK/PPK), доступ до мереж референцних станцій, навігація дозволами та безпековими процедурами, локальна обробка і зберігання даних в Україні, зв'язок з обласними адміністраціями. Продаємо не «геодезію», а «ваша технологія працює в Україні з першого разу».

**Фокус 2. Методика мобільного картографування в умовах без GNSS.**
Це унікальна експертиза, яку мало хто в Європі має практично. Оформити як методику з валідацією Львівської політехніки, публікувати, показувати на Intergeo/Rebuild Ukraine. Це і маркетинговий актив, і майбутній стандарт (разом з німцями або без них).

**Фокус 3. Дороги та муніципальна інфраструктура замість залізниці.**
Пріоритет вертикалей за реалістичністю дозволів і грошей: 1) дороги і мости (обласні служби відновлення, Агентство відновлення, гроші Ukraine Facility/EIB/EBRD/World Bank); 2) міські цифрові двійники та комунальна інфраструктура (громади, водоканали); 3) енергетика і ЖД лише післявоєнно або через офіційні державні канали. Не витрачати ресурс на пробивання ЖД зараз.

**Фокус 4. BIM / digital twin інфраструктури як сервіс для консультантів донорів.**
JICA (Олександр координує 10k-картографування), GIZ/KfW, консультанти EIB/EBRD. Їм потрібні локальні дані і моделі у форматах ЄС. GIS Point як субпідрядник з готовим пайплайном «скан → хмара → BIM → ГІС».

---

## 4. Як формувати продажі і маркетинг з цього тренду

**ICP (на кого цілимось).**
- Інжинірингові та консалтингові компанії DACH, Польщі, Балтії, Скандинавії, що готують вхід в Україну під відбудову (Тарік — типовий представник).
- Виробники та інтегратори сканерів/LiDAR, яким потрібен український пілот і референс (литовський партнер, Trimble/Leica/Riegl дилери).
- Консорціуми та консультанти донорських програм (JICA, EIB, EBRD, World Bank, EU Delegation).
- Українські обласні служби відновлення і великі громади (замовник-кінцевий бенефіціар, часто з донорським фінансуванням).

**Позиціонування і меседж.**
«GIS Point робить західні технології картографування працюючими в Україні: позиціонування без GNSS, дозволи та безпека, локальна польова команда, доступ до регіональної влади». Доказ: кейс Львів (дороги), валідація Політехніки, партнерство з Асоціацією аерогеодезії.

**Модель продажу: pilot-led.**
1. Lead magnet: безкоштовний «feasibility memo» за 5 днів: карта покриття GNSS/референцних станцій по коридору, оцінка досяжної точності, рекомендована конфігурація, оцінка дозволів. Саме це Олександр пообіцяв Таріку; зробити з цього стандартний продукт.
2. Платний або співфінансований пілот 50–100 км (німці платять за польову команду і геодезичний контроль; влада дає доступ і «маркетинг для регіону»).
3. Рамкова угода на масштабування + субпідряд у тендерах під гроші ЄС.
Тристороння схема «іноземна технологія + GIS Point + обласна влада» є повторюваною: один раз відпрацювати на Львівщині, потім копіювати по областях.

**Канали.**
- Follow-up по всіх контактах Intergeo з однією пропозицією: «feasibility memo для вашого кейсу в Україні».
- Rebuild Ukraine (Варшава), Ukraine Recovery Conference, німецько-українські бізнес-асоціації, Польсько-українська палата.
- LinkedIn: серія з 4–6 постів/статей про мобільне картографування без GNSS, кейс з дорогами, роль геодезичного контролю; спільний вебінар з Політехнікою й Олександром.
- Партнерська мережа: Асоціація аерогеодезії (100+ компаній), литовський інтегратор LiDAR, Львівська політехніка (підпис під методикою).

**Ціноутворення.** Пакет «пілот» (фікс), денні ставки польових бригад з обладнанням, ціна за км мобільного картографування з QA і BIM, окремо «permits & security compliance» як послуга. Валюта контракту EUR, передоплата за польовий етап.

**Ризики і як закривати.** Безпека даних (зберігання і обробка в Україні, обмеження рівня деталізації для чутливих об'єктів, прописана процедура погодження, за потреби через офіційні державні канали); GNSS (методика INS+одометрія+GCP); зміна людей у владі (не будувати все на одному контакті, тристоронній меморандум); платіжна дисципліна іноземних партнерів (передоплата, етапність).

**Що зробити в компанії (горизонт «зараз ~50 людей»).**
- Один власник напрямку «Міжнародні партнери / відбудова» з KPI: кількість feasibility memo, пілотів, рамкових угод.
- 90-денний план: лист Таріку і дорожній пілот у Львові; feasibility memo як стандартний продукт; 2 заходи (Rebuild Ukraine, URC-сателіт); 6 LinkedIn-публікацій; меморандум з Політехнікою про валідацію методики.
- При ~100 людей: окремий юніт «Infrastructure digital twins» з власним пайплайном обробки і 2–3 обласними рамковими угодами.

**Рядок у стратегії (ОСП), який це змінює:** «Ким ми є для ринку» → локальний технологічний партнер відбудови для західних інжинірингових компаній, а не просто геодезичний підрядник.
