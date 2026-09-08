/* Скринінг ліда на стенді.
 *
 * Увесь контент питань живе тут, а не в компонентах: щоб додати новий тип
 * клієнта, достатньо дописати запис у CLIENT_TYPES. Логіка (вибір набору,
 * перевірка passWhen, скоринг гіпотез, вердикт) теж тут — тож її можна
 * перевіряти окремо від інтерфейсу.
 *
 * Тексти питань англійською рівно як у постановці: їх читають уголос.
 * Українські підказки — для себе, дрібним шрифтом.
 */
window.SR_SCREENING = (function () {
  "use strict";

  var HYPOTHESES = [
    ["H1", "проблема реальна"],
    ["H2", "самі дешевше не зроблять"],
    ["H3", "є обсяг і бюджет"],
    ["H4", "наші межі їм підходять"],
    ["H5", "є вікно 6–12 міс"],
    ["H6", "готові платити за перевірку"]
  ];

  var ROUTES = {
    K: { label: "FlyBy pre-sale", followUp: "одна сторінка специфікації під названі цифри + умови eval unit + дата дзвінка" },
    D: { label: "direct pre-sale (розробка)", followUp: "два кейси з їхнього типу дельверабла" },
    P: { label: "партнерство", followUp: "партнерська схема і приклад спільного проєкту" },
    H: { label: "аутстаф", followUp: "CV-пак під роль, яка найдовше відкрита" },
    X: { label: "вихід", followUp: "нічого не надсилаємо" }
  };

  /* Фраза, якою прикриваємось замість обіцянок по ТТХ. */
  var NO_SPEC_PROMISE = "Не обіцяй ТТХ — скажи: “I'll confirm that with our engineering team”.";

  var CLIENT_TYPES = [
    {
      id: "UAV_OEM",
      label: "Виробник БПЛА",
      hint: "робить власну платформу",
      route: "K",
      crossSell: true,
      questions: [
        {
          id: "oem_units", order: 1,
          textEn: "How many units do you ship a year — one platform or a family?",
          hintUa: "Не дають цифру — питай “tens, hundreds or thousands?”",
          answerType: "number", min: 100, hypothesis: "H3"
        },
        {
          id: "oem_today", order: 2,
          textEn: "Today, how do you solve that on board — own development, a bought module, or you live with the limitation?",
          hintUa: "“Not a problem” закриває розмову — далі питань не буде.",
          answerType: "single",
          options: [
            ["own_dev", "own development"],
            ["bought_module", "a bought module"],
            ["live_with_it", "live with the limitation"],
            ["not_a_problem", "not a problem"]
          ],
          pass: ["own_dev", "bought_module"],
          hypothesis: "H1",
          isDisqualifier: true, disqualifyValues: ["not_a_problem"]
        },
        {
          id: "oem_envelope", order: 3,
          textEn: "What's the hard ceiling on weight, power and space you actually have on board?",
          hintUa: "Записати дослівно: грами / вати / мм. " + NO_SPEC_PROMISE,
          answerType: "text", passFlag: "названо конкретні цифри", hypothesis: "H4"
        },
        {
          id: "oem_thirdparty", order: 4,
          textEn: "Have you brought in a third-party module in the last year — which one, and what made you pick them?",
          hintUa: "Потрібне ім'я вендора, не “якийсь модуль”.",
          answerType: "text", passFlag: "названо конкретного вендора", hypothesis: "H2"
        },
        {
          id: "oem_window", order: 5,
          textEn: "When's your next platform revision or model freeze?",
          hintUa: "Вікно інтеграції — не пізніше ніж через 12 місяців.",
          answerType: "date", withinMonths: 12, hypothesis: "H5"
        }
      ]
    },
    {
      id: "UAV_INTEGRATOR",
      label: "Інтегратор БПЛА",
      hint: "інтегрує чужі борти під замовника",
      route: "K",
      crossSell: true,
      questions: [
        {
          id: "int_builds", order: 1,
          textEn: "Whose airframes do you integrate, and how many builds a year?",
          hintUa: "Записати ще й чиї борти — це підказка, з ким вони вже працюють.",
          answerType: "number", min: 20, hypothesis: "H3"
        },
        {
          id: "int_requirements", order: 2,
          textEn: "Who sets the requirements — you or the end customer?",
          hintUa: "Якщо вимоги диктує замовник — рішення не їхнє.",
          answerType: "single",
          options: [["we_do", "we do"], ["customer", "the end customer"], ["both", "both"]],
          pass: ["we_do", "both"], hypothesis: "H1"
        },
        {
          id: "int_interface", order: 3,
          textEn: "What does your stack expect on the interface side — which autopilot, what bus, what protocol?",
          hintUa: "Записати дослівно. " + NO_SPEC_PROMISE,
          answerType: "text", passFlag: "названо автопілот або протокол", hypothesis: "H4"
        },
        {
          id: "int_window", order: 4,
          textEn: "When's the next build where a new subsystem could realistically go in?",
          hintUa: "Потрібна дата, не “коли буде проєкт”.",
          answerType: "date", withinMonths: 12, hypothesis: "H5"
        }
      ]
    },
    {
      id: "GEO_INHOUSE",
      label: "Геосервіс, обробка в себе",
      hint: "знімає і обробляє сам",
      route: "D",
      questions: [
        {
          id: "geo_people", order: 1,
          textEn: "How many people are in production, not counting field crews?",
          hintUa: "Саме виробництво, без польових бригад.",
          answerType: "number", min: 10, hypothesis: "H3"
        },
        {
          id: "geo_market", order: 2,
          textEn: "Where do you deliver most of your work?",
          hintUa: "Гео-фільтр: OTHER — не наш ринок. На бал не впливає, але це видно у вердикті.",
          answerType: "single",
          options: [["US_CA", "US / Canada"], ["DACH_UK", "DACH / UK"], ["EU_NORTH", "Northern EU"], ["OTHER", "other"]],
          pass: ["US_CA", "DACH_UK", "EU_NORTH"],
          hypothesis: null, isGeoFilter: true
        },
        {
          id: "geo_deliver", order: 3,
          textEn: "What do you actually deliver — capture, or processing and deliverables too?",
          hintUa: "Тільки збір — це інший тип клієнта, розмова закінчується.",
          answerType: "single",
          options: [["capture_only", "capture only"], ["processing_too", "processing and deliverables too"]],
          pass: ["processing_too"], hypothesis: null,
          isDisqualifier: true, disqualifyValues: ["capture_only"], suggestType: "GEO_CAPTURE_ONLY"
        },
        {
          id: "geo_who", order: 4,
          textEn: "Who does the processing — your field engineers, or a separate office team?",
          hintUa: "Польові інженери на обробці — найгарячіший сигнал.",
          answerType: "single",
          options: [["field_engineers", "field engineers"], ["office_team", "a separate office team"]],
          pass: ["field_engineers"], hotValues: ["field_engineers"], hypothesis: "H1"
        },
        {
          id: "geo_window", order: 5,
          textEn: "When's the next project where we could realistically be involved?",
          hintUa: "Потрібна конкретна дата, не “when one comes up”.",
          answerType: "date", hypothesis: "H5"
        }
      ]
    },
    {
      id: "GEO_OUTSOURCED",
      label: "Геосервіс, обробка назовні",
      hint: "обробку віддає підрядникам",
      route: "P",
      questions: [
        {
          id: "out_who", order: 1,
          textEn: "Who does the processing for you today, and what's the turnaround?",
          hintUa: "Потрібне ім'я підрядника або строк.",
          answerType: "text", passFlag: "названо підрядника або строк", hypothesis: "H1"
        },
        {
          id: "out_breaks", order: 2,
          textEn: "What breaks first when volume spikes — capacity, quality, or turnaround?",
          hintUa: "“Nothing” означає, що болю немає.",
          answerType: "single",
          options: [["capacity", "capacity"], ["quality", "quality"], ["turnaround", "turnaround"], ["nothing", "nothing"]],
          pass: ["capacity", "quality", "turnaround"], hypothesis: "H1"
        },
        {
          id: "out_volume", order: 3,
          textEn: "How much of your annual volume goes out — a share or a specific job type?",
          hintUa: "Частка у відсотках або тип робіт.",
          answerType: "text", passFlag: "названо частку або тип робіт", hypothesis: "H3"
        },
        {
          id: "out_window", order: 4,
          textEn: "When's your next tender or project that would need that capacity?",
          hintUa: "Тендер або проєкт у межах 12 місяців.",
          answerType: "date", withinMonths: 12, hypothesis: "H5"
        }
      ]
    },
    {
      id: "STAFF_GAP",
      label: "Дефіцит людей",
      hint: "не встигає наймати або має власний софт без команди",
      route: "H",
      questions: [
        {
          id: "gap_hiring", order: 1,
          textEn: "What's your team hiring for right now?",
          hintUa: "Потрібна конкретна роль.",
          answerType: "text", passFlag: "названо роль", hypothesis: "H1"
        },
        {
          id: "gap_longest", order: 2,
          textEn: "Which role has been open the longest, and how long does it usually take you to fill it?",
          hintUa: "Скільки місяців вакансія стоїть — стільки триває їхній дефіцит.",
          answerType: "text", passFlag: "названо строк", hypothesis: "H2"
        },
        {
          id: "gap_shorthanded", order: 3,
          textEn: "When you're short-handed on a project, do you hire, subcontract, or push the deadline?",
          hintUa: "“Push the deadline” — найсильніший сигнал.",
          answerType: "single",
          options: [["hire", "hire"], ["subcontract", "subcontract"], ["push_deadline", "push the deadline"]],
          pass: ["subcontract", "push_deadline"], hotValues: ["push_deadline"], hypothesis: "H1"
        },
        {
          id: "gap_ownsoft", order: 4,
          textEn: "Do you build any of your own software — a portal, plugins, internal tools — or is it all off-the-shelf?",
          hintUa: "Свій софт означає, що є що підтримувати чужими руками.",
          answerType: "single",
          options: [
            ["build_in_house", "build in-house"], ["contractor", "a contractor"],
            ["off_the_shelf", "off-the-shelf"], ["none", "none"]
          ],
          pass: ["build_in_house", "contractor"], hypothesis: "H1"
        },
        {
          id: "gap_rules", order: 5,
          textEn: "Any hard rule about where those people sit — country, timezone, security?",
          hintUa: "Будь-яка відповідь зараховується — важливо почути обмеження.",
          answerType: "text", hypothesis: "H4"
        }
      ]
    },
    {
      id: "GEO_CAPTURE_ONLY",
      label: "Тільки польовий збір",
      hint: "дельверабли не робить",
      route: "X", exitOnly: true,
      questions: []
    },
    {
      id: "OUT_OF_SCOPE",
      label: "Не наш профіль",
      hint: "дистриб'ютор, продає нам або шукає роботу",
      route: "X", exitOnly: true,
      questions: []
    }
  ];

  /* Екран виходу за 30 секунд: три готові фрази під ситуацію. */
  var EXIT_LINES = [
    ["Продає нам", "Thanks — we're not buying hardware at this show. Leave me your card and I'll pass it to the right person."],
    ["Шукає роботу", "We hire through our site — send your CV there, it reaches the engineering leads directly."],
    ["Не наш профіль", "Honestly, that's outside what we do. I'd rather not waste your time here at the show."]
  ];

  /* Крос-продажний блок: для виробників і інтеграторів з власним софтом. */
  var CROSS_SELL = {
    route: "H",
    questions: [
      {
        id: "xs_builds", order: 1,
        textEn: "Who builds the software side — the planner, the customer portal, the processing pipeline? In-house or a contractor?",
        hintUa: "Ідемо в software development, а не в борт.",
        answerType: "text", hypothesis: null
      },
      {
        id: "xs_maintains", order: 2,
        textEn: "Who maintains it when that person is on a project?",
        hintUa: "Тут зазвичай і виявляється діра.",
        answerType: "text", hypothesis: null
      }
    ]
  };

  var H6_QUESTION = {
    id: "h6_paid",
    textEn: "Would you take a paid evaluation / paid pilot?",
    hintUa: "Ставки й ціни не називаємо — питаємо лише про принципову готовність.",
    answerType: "boolean", hypothesis: "H6"
  };

  function typeById(id) {
    for (var i = 0; i < CLIENT_TYPES.length; i++) if (CLIENT_TYPES[i].id === id) return CLIENT_TYPES[i];
    return null;
  }

  /* Впорядкований набір питань під тип. Порожній — для типів-виходів. */
  function getQuestionsFor(clientTypeId) {
    var t = typeById(clientTypeId);
    if (!t) return [];
    var qs = t.questions.slice().sort(function (a, b) { return a.order - b.order; });
    if (qs.length && (qs.length < 3 || qs.length > 5)) {
      throw new Error("Набір для " + clientTypeId + " має бути 3–5 питань, а не " + qs.length);
    }
    return qs;
  }

  function monthsAhead(n) {
    var d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setMonth(d.getMonth() + n);
    return d;
  }

  /* Чи відповідь проходить passWhen цього питання. */
  function passes(q, answer) {
    if (!answer) return false;
    var v = answer.value;
    switch (q.answerType) {
      case "number":
        var n = typeof v === "number" ? v : parseFloat(String(v).replace(/[^\d.\-]/g, ""));
        return isFinite(n) && n >= q.min;
      case "single":
        return !!q.pass && q.pass.indexOf(v) > -1;
      case "boolean":
        return v === true;
      case "date":
        if (!v) return false;
        var d = new Date(v);
        if (isNaN(d.getTime())) return false;
        if (!q.withinMonths) return true;      /* потрібна просто конкретна дата */
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        return d >= today && d <= monthsAhead(q.withinMonths);
      case "text":
        if (!v || !String(v).trim()) return false;
        return q.passFlag ? answer.flag === true : true;
      default:
        return false;
    }
  }

  function isDisqualified(q, answer) {
    if (!q.isDisqualifier || !answer) return false;
    return (q.disqualifyValues || []).indexOf(answer.value) > -1;
  }

  /* Скоринг: кожна гіпотеза зараховується один раз. */
  function score(clientTypeId, answers, opts) {
    opts = opts || {};
    var t = typeById(clientTypeId);
    var qs = getQuestionsFor(clientTypeId);
    var confirmed = {}, disqualifier = null, geoFilterFailed = false, hot = [];

    qs.forEach(function (q) {
      var a = answers[q.id];
      if (isDisqualified(q, a)) {
        disqualifier = { questionId: q.id, value: a.value, suggestType: q.suggestType || null };
        return;
      }
      var ok = passes(q, a);
      if (q.isGeoFilter && a && !ok) geoFilterFailed = true;
      if (!ok) return;
      if (q.hypothesis) confirmed[q.hypothesis] = true;
      if (q.hotValues && a && q.hotValues.indexOf(a.value) > -1) hot.push(q.id);
    });

    if (opts.paidPilot === true) confirmed.H6 = true;

    var list = HYPOTHESES.map(function (h) { return h[0]; })
      .filter(function (k) { return confirmed[k]; });

    var routes = [];
    if (t && t.route) routes.push(t.route);
    if (opts.crossSellDone && routes.indexOf(CROSS_SELL.route) === -1) routes.push(CROSS_SELL.route);

    return {
      clientType: clientTypeId,
      hypotheses: list,
      count: list.length,
      disqualifier: disqualifier,
      geoFilterFailed: geoFilterFailed,
      hotSignals: hot,
      routes: routes,
      verdict: verdictOf(list.length, !!disqualifier),
      followUp: followUpFor(routes, !!disqualifier)
    };
  }

  function verdictOf(count, disqualified) {
    if (disqualified) return "STOP";
    if (count >= 6) return "HOT";
    if (count >= 4) return "LEAD";
    return "CONTACT";
  }

  var VERDICTS = {
    HOT: { label: "HOT", note: "Ставити зустріч одразу." },
    LEAD: { label: "LEAD", note: "Фолоу-ап протягом 24 годин." },
    CONTACT: { label: "CONTACT", note: "Просто контакт, фолоу-ап низького пріоритету." },
    STOP: { label: "STOP", note: "Спрацював дискваліфікатор — далі не йдемо." }
  };

  function followUpFor(routes, disqualified) {
    if (disqualified) return [ROUTES.X.followUp];
    return (routes || []).map(function (r) { return ROUTES[r] ? ROUTES[r].followUp : ""; })
      .filter(Boolean);
  }

  return {
    HYPOTHESES: HYPOTHESES,
    ROUTES: ROUTES,
    VERDICTS: VERDICTS,
    CLIENT_TYPES: CLIENT_TYPES,
    CROSS_SELL: CROSS_SELL,
    EXIT_LINES: EXIT_LINES,
    H6_QUESTION: H6_QUESTION,
    typeById: typeById,
    getQuestionsFor: getQuestionsFor,
    passes: passes,
    isDisqualified: isDisqualified,
    score: score,
    verdictOf: verdictOf,
    followUpFor: followUpFor
  };
})();
