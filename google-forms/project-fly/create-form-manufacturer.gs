/**
 * ============================================================================
 *  Flyby — Optical Navigation System
 *  MANUFACTURER-focused questionnaire (deep integration + switching triggers)
 * ============================================================================
 *
 *  Варіант під ЗУСТРІЧ / опитування конкретного ВИРОБНИКА. На відміну від
 *  загального discovery (create-form.gs), тут фокус на:
 *    • точність по місіях, • SWaP (габарити/вага/енергоспоживання),
 *    • протоколи інтеграції в їхній комплекс, • день/ніч,
 *    • ціна, за якої вони підуть від конкурентів.
 *
 *  Запуск: script.google.com → New project → вставити цей файл →
 *          обрати `createFlybyManufacturerForm` → Run → Authorize →
 *          View → Logs (Edit URL + Published URL).
 * ============================================================================
 */

function getManufacturerSchema_() {
  return [
    {
      title: '0. Контекст',
      description: 'Коротко про платформи та поточне рішення навігації.',
      questions: [
        { type: 'paragraph', title: 'Які платформи випускаєте і в яких обсягах/міс? (FPV, крило, VTOL, strike, ISR)' },
        { type: 'mc', title: 'Навігацію робите in-house чи інтегруєте чужі модулі?',
          options: ['Повністю in-house', 'Інтегруємо чужі модулі', 'Комбіновано'], other: true },
        { type: 'checkbox', title: 'Яке GPS-denied рішення стоїть/тестувалось?',
          options: ['OSCAR', 'TFL-1', 'Sine', 'Saab', 'Theseus/OKSI', 'Власне', 'Ще немає'], other: true },
        { type: 'paragraph', title: 'Що лишилось у серії і ЧОМУ відкинули решту?' },
      ],
    },
    {
      title: '1. Точність по місіях',
      description: 'Flyby дає ~5–30 м. Бенчмарки: Saab ~3 м, Theseus/OKSI ~5 м. Уточнимо, де що треба.',
      questions: [
        { type: 'mc', title: 'Strike — яка точність (CEP) реально потрібна?',
          options: ['<5 м', '5–10 м', '10–30 м', 'Не наша місія'], other: true },
        { type: 'mc', title: 'ISR / розвідка — яка точність потрібна?',
          options: ['5–10 м', '10–30 м', '>30 м достатньо', 'Не наша місія'], other: true },
        { type: 'mc', title: 'Ретрансляція — яка точність потрібна?',
          options: ['10–30 м', '>30 м достатньо', 'Не наша місія'], other: true },
        { type: 'mc', title: 'Рій — яка точність потрібна?',
          options: ['<5 м', '5–10 м', '10–30 м', 'Не наша місія'], other: true },
        { type: 'paragraph', title: 'Де 30 м достатньо, а де це deal-breaker і треба <5 м?' },
        { type: 'mc', title: 'Точність важлива на всій траєкторії чи тільки на терміналі?',
          options: ['На всій траєкторії', 'Тільки на терміналі (фінальні км/сек)'], other: true },
      ],
    },
    {
      title: '2. SWaP: габарити, вага, енергоспоживання',
      description: 'Фізичні межі, за якими модуль "не влазить".',
      questions: [
        { type: 'text', title: 'Гранично допустимий форм-фактор модуля (Д×Ш×В, мм)?' },
        { type: 'text', title: 'Бюджет ваги під навігацію (г)? Де межа?' },
        { type: 'text', title: 'Бюджет живлення (Вт) і напруга шини (В)?' },
        { type: 'mc', title: 'Що критичніше в енергобалансі?',
          options: ['Пікове споживання', 'Середнє споживання', 'Обидва однаково'], other: true },
        { type: 'paragraph', title: 'Обмеження по тепловиділенню / охолодженню, кріпленню, вібростійкості, розміщенню камери?' },
        { type: 'paragraph', title: 'Що з SWaP найжорсткіше обмежує вибір модуля сьогодні?' },
      ],
    },
    {
      title: '3. Протоколи та інтеграція',
      description: 'Як Flyby вбудовується у ваш автопілот/шину.',
      questions: [
        { type: 'mc', title: 'Автопілот / стек?',
          options: ['PX4', 'ArduPilot', 'Власний'], other: true },
        { type: 'checkbox', title: 'Які протоколи обміну має підтримувати модуль?',
          options: ['MAVLink', 'CAN (DroneCAN/UAVCAN)', 'UART', 'Ethernet', 'Власний'], other: true },
        { type: 'checkbox', title: 'У якому вигляді хочете отримувати вихід Flyby?',
          options: ['Позиція (lat/lon/alt)', 'Поправка до INS/EKF', 'Velocity'], other: true },
        { type: 'text', title: 'Потрібна частота видачі координат (Гц)?' },
        { type: 'text', title: 'Допустима затримка (latency) від кадру до координати (мс)?' },
        { type: 'mc', title: 'Хто відповідає за fusion з ІНС/висотоміром?',
          options: ['Ми (виробник)', 'Ви (Flyby)', 'Спільно'], other: true },
        { type: 'mc', title: 'Бажаний формат інтеграції?',
          options: ['Готовий OEM-модуль', 'Ліцензія ПЗ під наше залізо', 'Спільна розробка (co-dev)'], other: true },
        { type: 'paragraph', title: 'Що зазвичай зʼїдає найбільше часу/грошей при інтеграції нового модуля?' },
        { type: 'checkbox', title: 'Що потрібно для швидкого старту інтеграції?',
          options: ['SDK', 'API-документація', 'Референс-борд', 'Інженерна підтримка'], other: true },
      ],
    },
    {
      title: '4. Режими день/ніч і надійність',
      description: 'Сенсорні режими та поведінка в складних умовах.',
      questions: [
        { type: 'mc', title: 'Коли має працювати навігація?',
          options: ['Тільки вдень', 'День + ніч', '24/7'], other: true },
        { type: 'mc', title: 'Нічний режим:',
          options: ['Тепловізор / ІЧ обовʼязково', 'NIR / low-light достатньо', 'Ніч не потрібна'], other: true },
        { type: 'checkbox', title: 'Над якою місцевістю літаєте (де рішення "сліпнуть")?',
          options: ['Поле', 'Ліс', 'Місто', 'Вода', 'Сніг'], other: true },
        { type: 'paragraph', title: 'Висоти / швидкості платформ (для map-matching)?' },
        { type: 'paragraph', title: 'Вимоги до поведінки при втраті картинки (хмари, дим, засвітка)?' },
        { type: 'scale', title: 'Наскільки критична стійкість саме до спуфінгу (vs просто глушіння)?',
          low: 1, high: 5, lowLabel: 'Достатньо анти-глушіння', highLabel: 'Спуфінг критично' },
      ],
    },
    {
      title: '5. Вартість і перехід від конкурентів',
      description: 'Головний блок. Бенчмарк: навігація ~10–20% вартості дрона (TFL).',
      questions: [
        { type: 'text', title: 'Що зараз платите за GPS-denied рішення (за модуль / за платформу)?' },
        { type: 'text', title: 'Цільова ціна за ДЕННУ конфігурацію (без ІЧ), щоб мала сенс?' },
        { type: 'text', title: 'Цільова ціна за НІЧНУ конфігурацію (з тепловізором/ІЧ)?' },
        { type: 'text', title: 'Прийнятний % від вартості дрона за навігацію?' },
        { type: 'grid', title: 'Проранжуйте, що має дати Flyby, щоб ви змінили постачальника (1 — найважливіше):',
          rows: ['Ціна', 'Точність', 'SWaP', 'Швидкість інтеграції', 'Підтримка/SLA'],
          cols: ['1', '2', '3', '4', '5'] },
        { type: 'paragraph', title: 'Що нинішній конкурент робить добре (тримає вас), а де його слабке місце?' },
        { type: 'paragraph', title: 'За якої різниці в ціні/ТТХ перехід стає "no-brainer"?' },
        { type: 'mc', title: 'Реалістичні обсяги, якщо ТТХ+ціна підходять?',
          options: ['Десятки/міс', 'Сотні/міс', 'Тисячі/міс'], other: true },
        { type: 'paragraph', title: 'Як іде закупівля і який цикл (Brave1, MoD, кодифікація НАТО, власні кошти)?' },
      ],
    },
    {
      title: '6. Пілот і наступні кроки',
      description: 'Перехід до дії.',
      questions: [
        { type: 'paragraph', title: 'Що має статися на пілоті, щоб перейти до серії? (метрики успіху)' },
        { type: 'mc', title: 'Готові дати одну платформу під обмежений польовий тест?',
          options: ['Так', 'Ні', 'Готові обговорити'] },
        { type: 'paragraph', title: 'Який рівень супроводу / SLA потрібен для постановки в серію?' },
        { type: 'paragraph', title: 'Хто ще з вашого боку має бути в наступній розмові? Контакти:' },
      ],
    },
  ];
}

function createFlybyManufacturerForm() {
  var form = FormApp.create('Flyby — інтеграція системи оптичної навігації (для виробника)');
  form.setDescription(
    'Опитувальник під інтеграцію Flyby (оптична навігація для GPS-denied) у ваш комплекс. ' +
    'Фокус: точність по місіях, габарити/вага/живлення, протоколи інтеграції, режими день/ніч ' +
    'і цільова вартість. Заповнення ~10 хв, відповідайте лише на релевантне.'
  );
  form.setProgressBar(true);
  form.setAllowResponseEdits(true);
  form.setShowLinkToRespondAgain(false);
  try { form.setCollectEmailAddress(true); } catch (e) {}

  form.addTextItem().setTitle('Компанія / виробник').setRequired(true);
  form.addTextItem().setTitle('Ваше імʼя та роль').setRequired(true);

  getManufacturerSchema_().forEach(function (section) {
    form.addPageBreakItem().setTitle(section.title).setHelpText(section.description || '');
    section.questions.forEach(function (q) { addQuestion_(form, q); });
  });

  form.addSectionHeaderItem()
    .setTitle('Дякуємо!')
    .setHelpText('Команда Flyby / GIS-Point звʼяжеться щодо наступних кроків.');

  var editUrl = form.getEditUrl();
  var pubUrl = form.getPublishedUrl();
  Logger.log('✅ Manufacturer form created!');
  Logger.log('✏️  Edit URL:      ' + editUrl);
  Logger.log('📤 Published URL: ' + pubUrl);
  return { editUrl: editUrl, publishedUrl: pubUrl };
}

/** Спільний хелпер додавання питання за типом. */
function addQuestion_(form, q) {
  var item;
  switch (q.type) {
    case 'text':      item = form.addTextItem(); break;
    case 'paragraph': item = form.addParagraphTextItem(); break;
    case 'mc':
      item = form.addMultipleChoiceItem().setChoiceValues(q.options);
      if (q.other) item.showOtherOption(true);
      break;
    case 'checkbox':
      item = form.addCheckboxItem().setChoiceValues(q.options);
      if (q.other) item.showOtherOption(true);
      break;
    case 'scale':
      item = form.addScaleItem().setBounds(q.low, q.high).setLabels(q.lowLabel || '', q.highLabel || '');
      break;
    case 'grid':
      item = form.addGridItem().setRows(q.rows).setColumns(q.cols);
      break;
    default:          item = form.addParagraphTextItem();
  }
  item.setTitle(q.title);
  if (q.help) item.setHelpText(q.help);
  if (q.required && typeof item.setRequired === 'function') item.setRequired(true);
  return item;
}
