/**
 * ============================================================================
 *  Project Fly (Flyby) — Optical Navigation System
 *  Discovery / feedback questionnaire generator for Google Forms
 * ============================================================================
 *
 *  Мета: одним кліком згенерувати Google Форму для збору зворотного звʼязку
 *  від потенційних клієнтів (виробники/інтегратори дронів) про систему
 *  оптичної навігації "Project Fly / Flyby" в умовах GPS-denied.
 *
 *  Джерело питань (44 питання, блоки A–L):
 *  https://docs.google.com/spreadsheets/d/1h_J6pSCXu1VTy9kbKTDpUJDeE8JWZQMimXKG1E6q7NQ/edit
 *
 *  ЯК ЗАПУСТИТИ
 *  -----------
 *  1. Відкрий https://script.google.com  →  New project.
 *  2. Встав вміст цього файлу у редактор (замінивши стандартний Code.gs).
 *  3. Обери функцію `createProjectFlyForm` у списку зверху та натисни Run.
 *  4. Дозволь доступ (Authorize) — потрібні права на створення Форм на Drive.
 *  5. У логах (View → Logs / Executions) зʼявиться посилання:
 *        • Edit URL      — редагувати форму
 *        • Published URL — надсилати респондентам
 *
 *  Форму можна перегенерувати будь-коли — щоразу створюється НОВА копія,
 *  наявні відповіді не чіпаються.
 * ============================================================================
 */

// ---------------------------------------------------------------------------
//  СХЕМА ФОРМИ (data-driven). Кожен блок = окрема сторінка (section).
//  Типи питань:
//    'paragraph' — довга відкрита відповідь
//    'text'      — короткий рядок
//    'mc'        — один варіант (multiple choice)   { options: [...], other: true }
//    'checkbox'  — кілька варіантів                 { options: [...], other: true }
//    'scale'     — лінійна шкала   { low, high, lowLabel, highLabel }
//    'grid'      — сітка одного вибору { rows: [...], cols: [...] }
// ---------------------------------------------------------------------------
function getFormSchema_() {
  return [
    {
      title: 'A. Контекст і роль',
      description: 'Кілька питань, щоб зрозуміти масштаб і роль вашої команди.',
      questions: [
        { type: 'paragraph', required: true,
          title: 'Скільки платформ на місяць виробляєте/інтегруєте і які типи?',
          help: 'Напр. FPV, крило, VTOL, дальні strike, ISR — орієнтовні обсяги та сегменти.' },
        { type: 'mc',
          title: 'Навігацію робите in-house чи інтегруєте чужі модулі?',
          options: ['Повністю in-house', 'Інтегруємо чужі модулі', 'Комбіновано (частково своє, частково чуже)'],
          other: true },
        { type: 'paragraph',
          title: 'Хто кінцевий замовник і хто підписує рішення про закупівлю?',
          help: 'Напр. підрозділи ЗСУ, ГУР, СБС, експорт — і хто ЛПР у ланцюжку.' },
      ],
    },
    {
      title: 'B. Реальний біль (GPS-denied)',
      description: 'Про реальні втрати місій через РЕБ (глушіння/спуфінг).',
      questions: [
        { type: 'paragraph',
          title: 'Останній випадок, коли через глушіння/спуфінг місія провалилась — що саме сталося?' },
        { type: 'text',
          title: 'Який % втрат/невиконаних місій повʼязуєте саме з навігацією в умовах РЕБ?',
          help: 'Орієнтовна оцінка у відсотках.' },
        { type: 'paragraph',
          title: 'Що оператори роблять зараз, коли GPS "лягає"?',
          help: 'Поточні обхідні шляхи / workaround.' },
        { type: 'paragraph',
          title: 'Скільки це коштує в грошах і наскільки це пріоритетна проблема (топ-3 чи 5–10-та)?' },
      ],
    },
    {
      title: 'C. Поточні рішення',
      description: 'Який досвід уже маєте з наявними GPS-denied рішеннями.',
      questions: [
        { type: 'checkbox',
          title: 'Які GPS-denied рішення вже тестували/ставили?',
          options: ['OSCAR', 'TFL-1', 'Sine', 'Власна розробка', 'Ще не тестували'],
          other: true },
        { type: 'paragraph',
          title: 'Що лишилось у серії, а що відкинули — і ЧОМУ відкинули?',
          help: 'Критерії відмови для нас найважливіші.' },
        { type: 'paragraph',
          title: 'Скільки коштувала інтеграція кожного (гроші, тижні інженерів)? Що було найбільшим головним болем?' },
        { type: 'paragraph',
          title: 'Чого бракувало в наявних рішеннях, що доробляли самі?' },
      ],
    },
    {
      title: 'D. Технічні вимоги (SWaP-C)',
      description: 'Розмір, вага, енергоспоживання, точність, інтерфейси.',
      questions: [
        { type: 'paragraph',
          title: 'Прийнятні габарити / вага / енергоспоживання? Де межа, за якою модуль "не влазить"?' },
        { type: 'mc',
          title: 'Яка точність реально потрібна?',
          options: ['~30 м достатньо', '10–30 м', '5–10 м', 'Для strike потрібно <5 м'],
          other: true },
        { type: 'checkbox',
          title: 'Які інтерфейси/протоколи має підтримувати модуль?',
          options: ['MAVLink', 'CAN', 'UART', 'PX4', 'ArduPilot', 'Власний протокол'],
          other: true },
        { type: 'checkbox',
          title: 'Які режими роботи обовʼязкові?',
          options: ['День', 'Ніч', 'Тепловізор / ІЧ обовʼязково'],
          other: true },
        { type: 'paragraph',
          title: 'Потрібна частота оновлення координат і очікувана поведінка при втраті картинки (хмари, дим)?' },
        { type: 'scale',
          title: 'Наскільки критична стійкість саме до спуфінгу (порівняно з простим глушінням)?',
          low: 1, high: 5, lowLabel: 'Достатньо стійкості до глушіння', highLabel: 'Спуфінг — критично' },
      ],
    },
    {
      title: 'E. Сценарії та платформи',
      description: 'Місії, висоти/швидкості, місцевість.',
      questions: [
        { type: 'checkbox',
          title: 'Під які місії рішення потрібне найперше?',
          options: ['Strike', 'ISR (розвідка)', 'Ретрансляція', 'Рій'],
          other: true },
        { type: 'paragraph',
          title: 'На яких висотах і швидкостях літають ваші платформи?' },
        { type: 'checkbox',
          title: 'Над якою місцевістю літаєте і де поточні рішення "сліпнуть"?',
          options: ['Поле', 'Ліс', 'Місто', 'Вода'],
          other: true },
      ],
    },
    {
      title: 'F. Дані карт і місії',
      description: 'Підготовка карт/маршрутів та джерела супутникових даних.',
      questions: [
        { type: 'paragraph',
          title: 'Хто готує карти/маршрути перед вильотом і скільки часу це займає?' },
        { type: 'paragraph',
          title: 'Звідки берете супутникові дані, чи є проблема з їх актуальністю?' },
        { type: 'mc',
          title: 'Яка модель роботи продукту зручніша?',
          options: ['Готові завантажувати попередню карту району перед вильотом',
                    'Потрібна повна автономність "з коробки" без попередніх карт'],
          other: true },
      ],
    },
    {
      title: 'G. Економіка та закупівля',
      description: 'Ціна, обсяги, процес закупівлі, пріоритети.',
      questions: [
        { type: 'text',
          title: 'Цільовий ціновий діапазон за модуль, щоб мав сенс у собівартості платформи?' },
        { type: 'text',
          title: 'Який % від вартості дрона за навігацію був би прийнятним?',
          help: 'Для орієнтиру: бенчмарк ринку ~10–20%.' },
        { type: 'mc',
          title: 'Реалістичні обсяги закупівлі?',
          options: ['Десятки на місяць', 'Сотні на місяць', 'Тисячі на місяць'],
          other: true },
        { type: 'paragraph',
          title: 'Як відбувається закупівля і який її цикл?',
          help: 'Напр. Brave1, MoD, кодифікація НАТО, власні кошти.' },
        { type: 'grid',
          title: 'Проранжуйте, що для вас важливіше (1 — найважливіше, 3 — найменш важливе):',
          rows: ['Ціна', 'Швидкість інтеграції', 'Надійність'],
          cols: ['1', '2', '3'] },
      ],
    },
    {
      title: 'H. Кінцевий користувач',
      description: 'Голос підрозділів-операторів.',
      questions: [
        { type: 'paragraph',
          title: 'Що конкретно просять підрозділи-оператори щодо навігації? (цитати вітаються)' },
        { type: 'paragraph',
          title: 'Які 2–3 характеристики найбільше впливають на рішення підрозділу "беремо / ні"?' },
        { type: 'paragraph',
          title: 'Хто ще страждає від тієї ж проблеми так само сильно?' },
      ],
    },
    {
      title: 'I. Масштабування / експорт',
      description: 'Універсальні vs локальні вимоги, експортні ринки.',
      questions: [
        { type: 'paragraph',
          title: 'Що суто українське у вимогах, а що потрібне і арміям НАТО / на експорт?' },
        { type: 'paragraph',
          title: 'Які експортні ринки плануєте і чим там відрізняються вимоги?' },
        { type: 'checkbox',
          title: 'Що може заблокувати продаж за кордон?',
          options: ['Сертифікація', 'Компоненти / ланцюг постачання', 'NATO-ready вимоги', 'Відсутність бойового кейсу'],
          other: true },
        { type: 'mc',
          title: 'Як зовнішній ринок ставиться до "battle-proven in Ukraine"?',
          options: ['Цінує "battle-proven in Ukraine"', 'Вимагає власних локальних тестів', 'І те, і те'],
          other: true },
      ],
    },
    {
      title: 'J. Модель партнерства',
      description: 'Формат співпраці, SLA, критерії успіху пілоту.',
      questions: [
        { type: 'mc',
          title: 'Який формат співпраці для вас найкращий?',
          options: ['Готовий OEM-модуль', 'Ліцензія на ПЗ під ваше залізо', 'Спільна розробка (co-dev)'],
          other: true },
        { type: 'paragraph',
          title: 'Який рівень супроводу / SLA потрібен для постановки в серію?' },
        { type: 'paragraph',
          title: 'Що має статися на пілоті, щоб перейти до серійних закупівель? (метрики успіху)' },
        { type: 'mc',
          title: 'Чи готові бути референс-партнером / першим інтегратором для інших країн?',
          options: ['Так', 'Ні', 'Можливо, за певних умов'] },
      ],
    },
    {
      title: 'K. Конкуренти',
      description: 'Реальні альтернативи та їх сильні/слабкі сторони.',
      questions: [
        { type: 'paragraph',
          title: 'Якби завтра закривали цю проблему — до кого пішли б першим і чому?' },
        { type: 'paragraph',
          title: 'Що конкуренти роблять добре, а де слабкість, якою можна скористатись?' },
      ],
    },
    {
      title: 'L. Наступні кроки',
      description: 'Контакти та перехід до дії.',
      questions: [
        { type: 'paragraph',
          title: 'Хто ще з вашого боку має бути в наступній розмові?' },
        { type: 'mc',
          title: 'Чи можемо організувати обмежений польовий тест на одній платформі?',
          options: ['Так', 'Ні', 'Готові обговорити'] },
        { type: 'mc',
          title: 'Чи познайомите нас з 1–2 підрозділами-операторами?',
          options: ['Так', 'Ні', 'Можливо'] },
        { type: 'paragraph', required: false,
          title: 'Контакти для звʼязку (email / телефон / Signal) та будь-які додаткові коментарі:' },
      ],
    },
  ];
}

/**
 * Головна функція — створює форму за схемою.
 */
function createProjectFlyForm() {
  var form = FormApp.create('Project Fly (Flyby) — зворотний звʼязок про систему оптичної навігації');

  form.setDescription(
    'Дякуємо, що приділяєте час! Ми розробляємо Project Fly (Flyby) — систему оптичної ' +
    'навігації для дронів в умовах GPS-denied (глушіння/спуфінг). Ваші відповіді допоможуть ' +
    'нам зробити рішення справді корисним для виробників та інтеграторів.\n\n' +
    'Заповнення займає ~10–15 хв. Питання поділені на тематичні блоки. ' +
    'Відповідайте лише на релевантні — усе, крім кількох перших, необовʼязкове.'
  );

  // Загальні налаштування форми
  form.setProgressBar(true);
  form.setAllowResponseEdits(true);
  form.setShowLinkToRespondAgain(false);
  try { form.setCollectEmailAddress(true); } catch (e) { /* залежить від політики домену */ }

  // Стартова секція — контакт респондента
  form.addTextItem()
    .setTitle('Компанія / підрозділ')
    .setRequired(true);
  form.addTextItem()
    .setTitle('Ваше імʼя та роль')
    .setRequired(true);

  // Побудова блоків A–L
  var schema = getFormSchema_();
  schema.forEach(function (section) {
    form.addPageBreakItem()
      .setTitle(section.title)
      .setHelpText(section.description || '');
    section.questions.forEach(function (q) {
      addQuestion_(form, q);
    });
  });

  // Фінальне повідомлення
  form.addSectionHeaderItem()
    .setTitle('Дякуємо за ваш час!')
    .setHelpText('Ми звʼяжемось з вами найближчим часом. Команда Project Fly / GIS-Point.');

  var editUrl = form.getEditUrl();
  var pubUrl = form.getPublishedUrl();
  Logger.log('✅ Форму створено!');
  Logger.log('✏️  Edit URL:      ' + editUrl);
  Logger.log('📤 Published URL: ' + pubUrl);
  return { editUrl: editUrl, publishedUrl: pubUrl };
}

/**
 * Додає одне питання до форми відповідно до його типу.
 */
function addQuestion_(form, q) {
  var item;
  switch (q.type) {
    case 'text':
      item = form.addTextItem();
      break;

    case 'paragraph':
      item = form.addParagraphTextItem();
      break;

    case 'mc':
      item = form.addMultipleChoiceItem().setChoiceValues(q.options);
      if (q.other) item.showOtherOption(true);
      break;

    case 'checkbox':
      item = form.addCheckboxItem().setChoiceValues(q.options);
      if (q.other) item.showOtherOption(true);
      break;

    case 'scale':
      item = form.addScaleItem()
        .setBounds(q.low, q.high)
        .setLabels(q.lowLabel || '', q.highLabel || '');
      break;

    case 'grid':
      item = form.addGridItem()
        .setRows(q.rows)
        .setColumns(q.cols);
      break;

    default:
      item = form.addParagraphTextItem();
  }

  item.setTitle(q.title);
  if (q.help) item.setHelpText(q.help);
  if (q.required && typeof item.setRequired === 'function') item.setRequired(true);
  return item;
}
