"use strict";
(function () {
  /* ==================================================================
     Стенд-радар — пошук лідів на виставці.

     Два незалежні виміри статусу, які легко сплутати:
       «Статус» з бази   — стадія до виставки (зустріч, зацікавлені, …)
       «Результат»       — що сталося на стенді, ставить користувач

     Дані живуть у трьох місцях, у порядку надійності:
       1) пам'ять вкладки — те, що бачить екран
       2) localStorage    — офлайн-копія на цьому телефоні
       3) db (якщо є)     — спільна база стенда, синхронна для команди
     ================================================================== */

  var LS_BASE = "sr.base.v2", LS_TOUCH = "sr.touch.v2", LS_ME = "sr.me";
  var CHUNK_CHARS = 140000;

  var STATUSES = [
    { k: "talked", label: "Поговорили" },
    { k: "hot",    label: "Гарячий" },
    { k: "later",  label: "Пізніше" },
    { k: "no",     label: "Не цікаво" }
  ];
  var STATUS_LABEL = { talked: "Поговорили", hot: "Гарячий", later: "Пізніше", no: "Не цікаво" };

  /* Поля, які апка розуміє. Решта колонок з файлу теж зберігається
     і показується в картці — нічого не губиться. */
  var FIELDS = [
    { k: "company", label: "Компанія",  syn: ["companyname","company","компані","компанія","назва","фірма","организація","організація","account","firma","unternehmen","exhibitor","nazwa","бренд","brand","org"] },
    { k: "stand",   label: "Стенд",     syn: ["standnumber","boothnumber","standno","stand","booth","стенд","номерстенда","hall","зал","павільйон","павильон","stoisko","standnummer","halle","місце"] },
    { k: "pstatus", label: "Статус з бази", syn: ["статус","status","стадія","стадия","етап","stage","pipeline","воронка"] },
    { k: "meet",    label: "Час зустрічі", syn: ["зустріч","часзустрічі","датазустрічі","meeting","meetingtime","appointment","слот","встреча"] },
    { k: "country", label: "Країна",    syn: ["country","країна","страна","land","kraj","countryname","hqcountry"] },
    { k: "city",    label: "Місто",     syn: ["city","місто","город","stadt","miasto","town","hqcity"] },
    { k: "person",  label: "Контакт",   syn: ["contactperson","fullname","contactname","decisionmaker","лпр","контактн","контакт","особа","ім'я","имя","person","ansprechpartner","firstname","name","osoba"] },
    { k: "role",    label: "Посада",    syn: ["jobtitle","title","position","посада","роль","function","stanowisko","seniority"] },
    { k: "email",   label: "Email",     syn: ["email","emailaddress","e-mail","mail","пошта","емейл","почта"] },
    { k: "phone",   label: "Телефон",   syn: ["phonenumber","phone","tel","telefon","телефон","мобільний","mobile","whatsapp"] },
    { k: "website", label: "Сайт / LinkedIn", syn: ["linkedinurl","linkedin","website","websiteurl","site","url","сайт","домен","domain","web","link"] },
    { k: "tier",    label: "Пріоритет", syn: ["tier","priority","пріорит","пріоритет","приоритет","рівень","grade","категорія","клас","score","рейтинг","abc"] },
    { k: "segment", label: "Сегмент",   syn: ["segment","сегмент","industry","галуз","галузь","індустрі","напрям","вертикаль","niche","ніша","category","branche"] },
    { k: "offer",   label: "Гачок / що пропонуємо", syn: ["гачок","hook","offer","офер","оффер","пропон","пропоз","пропозиція","цінність","рішення","solution","value","product","продукт","service","послуга","nextstep","наступнийкрок","action","дія","pitch","зачіпка","angle","usecase","кейс"] },
    { k: "note",    label: "Довідка з бази", syn: ["збагачення","enrichment","notes","note","нотат","приміт","коментар","комент","comment","опис","description","insight","інсайт","signal","сигнал","контекст","research"] }
  ];

  /* класи статусу з бази -> колір бейджа */
  function pstatusClass(v) {
    var n = norm(v);
    if (!n) return "";
    if (n.indexOf("зустріч") > -1 && n.indexOf("не ") === -1) return "p-meet";
    if (n.indexOf("зацікав") > -1 || n.indexOf("інтерес") > -1 || n.indexOf("warm") > -1) return "p-warm";
    if (n.indexOf("потреб") > -1 || n.indexOf("виявити") > -1) return "p-need";
    if (n.indexOf("відмов") > -1 || n.indexOf("не цікав") > -1 || n.indexOf("lost") > -1) return "p-no";
    return "";
  }

  /* ================= стан ================= */
  var state = {
    columns: [], map: {}, rows: [], sources: [], sourceCounts: {},
    touch: {}, me: "", baseVersion: 0, baseLabel: "",
    filters: { q: "", country: null, tier: null, status: null, pstatus: null, source: null, unvisited: false },
    numMode: false, limit: 60
  };
  var db = null, sampleFn = null, downloads = null;
  var sheetStack = [];

  /* ================= утиліти ================= */
  function $(id) { return document.getElementById(id); }
  function el(tag, cls, txt) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (txt != null) n.textContent = txt;
    return n;
  }
  function norm(s) {
    return String(s == null ? "" : s)
      .toLowerCase()
      .replace(/ё/g, "е").replace(/[’'`´]/g, "")
      .normalize("NFD").replace(/[̀-ͯ]/g, "")
      .replace(/\s+/g, " ").trim();
  }
  function keyify(s) { return norm(s).replace(/[^a-z0-9а-яіїєґ]/gi, ""); }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function nowISO() { return new Date().toISOString(); }
  function hash(s) {
    var h = 5381, i;
    for (i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0;
    return h.toString(36);
  }
  function lsGet(k) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : null; } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; } }
  function lsDel(k) { try { localStorage.removeItem(k); } catch (e) {} }
  function shortTime(iso) {
    try {
      return new Date(iso).toLocaleString("uk-UA", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });
    } catch (e) { return iso; }
  }

  var toastTimer = null;
  function toast(msg) {
    var t = document.querySelector(".toast");
    if (t) t.remove();
    t = el("div", "toast", msg);
    document.body.appendChild(t);
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { if (t.parentNode) t.remove(); }, 2600);
  }

  /* ================= читання файлів ================= */
  function sniffDelimiter(text) {
    var line = text.split(/\r?\n/).slice(0, 5).join("\n"), best = ",", bestN = 0;
    [",", ";", "\t", "|"].forEach(function (d) {
      var n = line.split(d).length;
      if (n > bestN) { bestN = n; best = d; }
    });
    return best;
  }
  function parseCSV(text, delim) {
    var d = delim || sniffDelimiter(text);
    var rows = [], row = [], cur = "", q = false, i, c;
    if (text.charCodeAt(0) === 0xFEFF) text = text.slice(1);
    for (i = 0; i < text.length; i++) {
      c = text[i];
      if (q) {
        if (c === '"') { if (text[i + 1] === '"') { cur += '"'; i++; } else q = false; }
        else cur += c;
      } else if (c === '"') q = true;
      else if (c === d) { row.push(cur); cur = ""; }
      else if (c === "\n") { row.push(cur); rows.push(row); row = []; cur = ""; }
      else if (c === "\r") { /* пропускаємо */ }
      else cur += c;
    }
    if (cur.length || row.length) { row.push(cur); rows.push(row); }
    return rows;
  }
  /* Заголовок не завжди в першому рядку: беремо найзаповненіший
     з перших восьми, віддаючи перевагу ранньому. */
  function findHeader(matrix) {
    var scan = Math.min(8, matrix.length), best = 0, bestN = -1, i, n;
    for (i = 0; i < scan; i++) {
      n = matrix[i].filter(function (c) { return String(c).trim() !== ""; }).length;
      if (n > bestN * 1.15) { bestN = n; best = i; }
    }
    return best;
  }
  function matrixToRows(matrix, sourceName) {
    if (!matrix || !matrix.length) return null;
    var h = findHeader(matrix);
    var headerRaw = matrix[h].map(function (c) { return String(c == null ? "" : c).trim(); });
    var used = {}, header = headerRaw.map(function (name, i) {
      var nm = name || ("Колонка " + (i + 1));
      if (used[nm]) { used[nm]++; nm = nm + " (" + used[nm] + ")"; } else used[nm] = 1;
      return nm;
    });
    var out = [], i, j, r, obj, any, v;
    for (i = h + 1; i < matrix.length; i++) {
      r = matrix[i]; obj = {}; any = false;
      for (j = 0; j < header.length; j++) {
        v = r[j] == null ? "" : String(r[j]).trim();
        if (v) any = true;
        obj[header[j]] = v;
      }
      if (any) { obj.__source = sourceName; out.push(obj); }
    }
    return { columns: header, rows: out };
  }
  function readFile(file) {
    return new Promise(function (resolve, reject) {
      var name = file.name.replace(/\.[^.]+$/, "");
      var isText = /\.(csv|tsv|txt)$/i.test(file.name);
      var fr = new FileReader();
      fr.onerror = function () { reject(new Error("Не вдалося прочитати " + file.name)); };
      fr.onload = function () {
        try {
          var parts = [], got;
          if (isText) {
            got = matrixToRows(parseCSV(String(fr.result)), name);
            if (got) parts.push(got);
          } else {
            if (typeof XLSX === "undefined") throw new Error("Читалка Excel не завантажилась — спробуй CSV або онови сторінку.");
            var wb = XLSX.read(new Uint8Array(fr.result), { type: "array" });
            wb.SheetNames.forEach(function (sn) {
              var m = XLSX.utils.sheet_to_json(wb.Sheets[sn], { header: 1, raw: false, defval: "" });
              var g = matrixToRows(m, wb.SheetNames.length > 1 ? name + " · " + sn : name);
              if (g && g.rows.length) parts.push(g);
            });
          }
          resolve(parts);
        } catch (e) { reject(e); }
      };
      if (isText) fr.readAsText(file, "utf-8"); else fr.readAsArrayBuffer(file);
    });
  }

  /* ================= зіставлення колонок ================= */
  function autoMap(columns) {
    var keys = columns.map(keyify), map = {}, taken = {}, i;
    FIELDS.forEach(function (f) {
      var bestCol = null, bestScore = 0;
      columns.forEach(function (col, ci) {
        if (taken[col]) return;
        var k = keys[ci], score = 0;
        f.syn.forEach(function (syn) {
          var sk = keyify(syn);
          if (!sk) return;
          if (k === sk) score = Math.max(score, 1000 + sk.length);
          else if (k.indexOf(sk) === 0) score = Math.max(score, 400 + sk.length);
          else if (k.indexOf(sk) > -1 && sk.length >= 4) score = Math.max(score, 100 + sk.length);
        });
        if (score > bestScore) { bestScore = score; bestCol = col; }
      });
      if (bestCol) { map[f.k] = bestCol; taken[bestCol] = true; }
    });
    if (!map.company) {
      for (i = 0; i < columns.length; i++) {
        if (!taken[columns[i]]) { map.company = columns[i]; break; }
      }
    }
    return map;
  }

  function val(row, fieldKey) {
    var col = state.map[fieldKey];
    return col && row[col] != null ? String(row[col]).trim() : "";
  }
  function leadIdOf(row) {
    var base = keyify(val(row, "company")) + "_" + keyify(val(row, "person"));
    var slug = base.replace(/[^a-z0-9_]/g, "").slice(0, 48) || "lead";
    return slug + "-" + hash(val(row, "company") + "|" + val(row, "person") + "|" + val(row, "stand") + "|" + (row.__source || ""));
  }
  function tierOf(row) {
    var raw = val(row, "tier"), t = norm(raw);
    if (!t) return "";
    if (/^(a|1|high|високий|top)/.test(t)) return "A";
    if (/^(b|2|mid|середн)/.test(t)) return "B";
    if (/^(c|3|low|низьк)/.test(t)) return "C";
    return raw.slice(0, 3).toUpperCase();
  }

  /* ================= індексація ================= */
  function reindex() {
    state.rows.forEach(function (r) {
      r.__id = leadIdOf(r);
      r.__tier = tierOf(r);
      r.__company = val(r, "company") || val(r, "person") || "(без назви)";
      r.__companyN = norm(r.__company);
      r.__stand = norm(val(r, "stand"));
      r.__standDigits = val(r, "stand").replace(/\D/g, "");
      r.__pstatus = val(r, "pstatus");
      r.__meet = val(r, "meet");
      if (!r.__mkey) r.__mkey = r.__meet ? "0000 " + (r.__meet.match(/\d{1,2}:\d{2}/) || ["99:99"])[0] : "9";
      var bag = [];
      for (var k in r) {
        if (k.indexOf("__") === 0) continue;
        if (r[k]) bag.push(r[k]);
      }
      r.__hay = norm(bag.join(" ⋅ "));
    });
    state.sources = [];
    var seen = {};
    state.rows.forEach(function (r) {
      var s = r.__source || "База";
      if (!seen[s]) { seen[s] = 1; state.sources.push(s); } else seen[s]++;
    });
    state.sourceCounts = seen;
  }

  function matches(row, tokens, digitsOnly) {
    if (digitsOnly && tokens.length === 1) return row.__standDigits.indexOf(tokens[0]) > -1;
    for (var i = 0; i < tokens.length; i++) if (row.__hay.indexOf(tokens[i]) === -1) return false;
    return true;
  }
  function score(row, tokens, digitsOnly) {
    var s = 0;
    tokens.forEach(function (t) {
      if (row.__companyN.indexOf(t) === 0) s += 60;
      else if (row.__companyN.indexOf(t) > -1) s += 30;
      if (row.__stand.indexOf(t) > -1) s += digitsOnly ? 80 : 25;
      if (row.__hay.indexOf(t) > -1) s += 5;
    });
    if (row.__tier === "A") s += 4; else if (row.__tier === "B") s += 2;
    return s;
  }
  function currentRows() {
    var f = state.filters, qn = norm(f.q);
    var tokens = qn ? qn.split(" ").filter(Boolean) : [];
    var digitsOnly = tokens.length === 1 && /^\d+$/.test(tokens[0]);
    var out = state.rows.filter(function (r) {
      if (f.country && norm(val(r, "country")) !== f.country) return false;
      if (f.tier && r.__tier !== f.tier) return false;
      if (f.pstatus && r.__pstatus !== f.pstatus) return false;
      if (f.source && (r.__source || "База") !== f.source) return false;
      var st = state.touch[r.__id] && state.touch[r.__id].status;
      if (f.status && st !== f.status) return false;
      if (f.unvisited && st) return false;
      if (tokens.length && !matches(r, tokens, digitsOnly)) return false;
      return true;
    });
    if (tokens.length) {
      out.sort(function (a, b) { return score(b, tokens, digitsOnly) - score(a, tokens, digitsOnly); });
    } else {
      var rank = { A: 0, B: 1, C: 2 };
      out.sort(function (a, b) {
        /* спершу ті, з ким уже домовлено про зустріч */
        var ma = a.__meet ? 0 : 1, mb = b.__meet ? 0 : 1;
        if (ma !== mb) return ma - mb;
        var ra = rank[a.__tier] != null ? rank[a.__tier] : 3;
        var rb = rank[b.__tier] != null ? rank[b.__tier] : 3;
        if (ra !== rb) return ra - rb;
        return a.__companyN < b.__companyN ? -1 : a.__companyN > b.__companyN ? 1 : 0;
      });
    }
    return out;
  }

  /* ================= список ================= */
  function highlight(text, tokens) {
    if (!tokens.length) return esc(text);
    var out = esc(text), i, re;
    for (i = 0; i < tokens.length; i++) {
      if (tokens[i].length < 2) continue;
      re = new RegExp("(" + tokens[i].replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "gi");
      out = out.replace(re, "<mark>$1</mark>");
    }
    return out;
  }
  function whyLine(row, tokens) {
    if (!tokens.length) return null;
    var t = tokens[0];
    if (row.__companyN.indexOf(t) > -1 || row.__stand.indexOf(t) > -1) return null;
    for (var k in row) {
      if (k.indexOf("__") === 0) continue;
      if (row[k] && norm(row[k]).indexOf(t) > -1) {
        return "<b>" + esc(k) + ":</b> " + highlight(String(row[k]).slice(0, 120), tokens);
      }
    }
    return null;
  }

  function renderList() {
    var list = $("list"), rows = currentRows();
    var tokens = norm(state.filters.q).split(" ").filter(Boolean);
    list.innerHTML = "";
    $("countLbl").textContent = state.rows.length ? rows.length + " / " + state.rows.length : "база порожня";

    if (!state.rows.length) {
      list.appendChild(emptyState("Тут поки нічого немає",
        "Завантаж базу лідів — Excel або CSV. Файл читається на пристрої, нікуди не відправляється.",
        "Завантажити базу", function () { $("fileInput").click(); }));
      return;
    }
    if (!rows.length) {
      list.appendChild(emptyState("Нічого не знайшлося",
        "Спробуй частину назви, номер стенда або скинь фільтри.",
        "Скинути все", resetFilters));
      return;
    }
    var frag = document.createDocumentFragment();
    rows.slice(0, state.limit).forEach(function (r) { frag.appendChild(rowNode(r, tokens)); });
    list.appendChild(frag);

    if (rows.length > state.limit) {
      var more = el("button", "more", "Показати ще " + Math.min(60, rows.length - state.limit) +
        " з " + (rows.length - state.limit));
      more.addEventListener("click", function () { state.limit += 60; renderList(); });
      list.appendChild(more);
    }
    renderProgress();
  }
  function emptyState(h, p, btnLabel, onClick) {
    var box = el("div", "empty");
    box.appendChild(el("h3", null, h));
    box.appendChild(el("p", null, p));
    var b = el("button", "btn primary", btnLabel);
    b.addEventListener("click", onClick);
    box.appendChild(b);
    return box;
  }

  function rowNode(r, tokens) {
    var t = state.touch[r.__id] || {};
    var node = el("button", "row" + (r.__tier === "A" ? " t-a" : r.__tier === "B" ? " t-b" : ""));
    node.type = "button";
    node.appendChild(el("div", "stripe"));

    var body = el("div", "body");
    var name = el("div", "name");
    name.innerHTML = highlight(r.__company, tokens);
    body.appendChild(name);

    var meta = el("div", "meta");
    if (r.__meet) meta.appendChild(el("span", "meetchip", r.__meet));
    var stand = val(r, "stand");
    if (stand) {
      var sc = el("span", "standchip");
      sc.innerHTML = highlight(stand, tokens);
      meta.appendChild(sc);
    }
    if (r.__pstatus) meta.appendChild(el("span", "pbadge " + pstatusClass(r.__pstatus), r.__pstatus));
    var who = [val(r, "person"), val(r, "country")].filter(Boolean).join(" · ");
    if (who) meta.appendChild(el("span", null, who));
    if (t.status) {
      var st = el("span", null, STATUS_LABEL[t.status]);
      st.style.fontWeight = "600";
      meta.appendChild(st);
    }
    body.appendChild(meta);

    /* головне по ліду видно одразу зі списку */
    if (t.summary) body.appendChild(el("span", "summary", t.summary));
    else {
      var why = whyLine(r, tokens);
      if (why) {
        var w = el("span", "hit");
        w.innerHTML = why;
        body.appendChild(w);
      }
    }
    node.appendChild(body);

    var side = el("div", "side");
    if (t.status) side.appendChild(el("span", "sdot " + t.status));
    if (r.__tier) side.appendChild(el("span", "tierbadge", r.__tier));
    if (t.log && t.log.length) side.appendChild(el("span", "tierbadge", t.log.length + " зап."));
    node.appendChild(side);

    node.addEventListener("click", function () { openLead(r.__id); });
    return node;
  }

  function renderProgress() {
    var p = $("progress");
    p.innerHTML = "";
    if (!state.rows.length) { p.classList.add("hidden"); return; }
    p.classList.remove("hidden");
    var counts = { talked: 0, hot: 0, later: 0, no: 0 }, done = 0;
    state.rows.forEach(function (r) {
      var t = state.touch[r.__id];
      if (t && t.status && counts[t.status] != null) { counts[t.status]++; done++; }
    });
    var bar = el("div", "bar");
    ["hot", "talked", "later", "no"].forEach(function (k) {
      if (!counts[k]) return;
      var i = el("i", k);
      i.style.width = (counts[k] / state.rows.length * 100) + "%";
      bar.appendChild(i);
    });
    var lbl = el("span", "lbl", done + " / " + state.rows.length + " опрацьовано");
    if (counts.hot) lbl.textContent += " · " + counts.hot + " гарячих";
    p.appendChild(bar);
    p.appendChild(lbl);
  }

  /* ================= чіпи ================= */
  function renderChips() {
    var box = $("quickChips");
    box.innerHTML = "";
    if (!state.rows.length) return;
    var f = state.filters;

    /* стадії з бази — головний спосіб розділити цих лідів */
    countBy(function (r) { return r.__pstatus; }).forEach(function (it) {
      box.appendChild(chip(it[0], f.pstatus === it[0], it[1], function () {
        f.pstatus = f.pstatus === it[0] ? null : it[0];
        state.limit = 60; refresh();
      }));
    });
    box.appendChild(chip("Не відвідані", f.unvisited, null, function () {
      f.unvisited = !f.unvisited; if (f.unvisited) f.status = null; refresh();
    }));
    STATUSES.forEach(function (s) {
      var n = 0;
      state.rows.forEach(function (r) {
        var t = state.touch[r.__id];
        if (t && t.status === s.k) n++;
      });
      if (!n && f.status !== s.k) return;
      box.appendChild(chip(s.label, f.status === s.k, n, function () {
        f.status = f.status === s.k ? null : s.k; f.unvisited = false; refresh();
      }));
    });
    if (f.country) box.appendChild(chip(titleCase(f.country), true, null, function () { f.country = null; refresh(); }));
    if (f.tier) box.appendChild(chip("Пріоритет " + f.tier, true, null, function () { f.tier = null; refresh(); }));
    if (f.source) box.appendChild(chip(f.source, true, null, function () { f.source = null; refresh(); }));
    var open = chip("Ще фільтри", false, null, openFilters);
    open.classList.add("group");
    box.appendChild(open);

    var n = state.rows.filter(function (r) { return r.__meet; }).length;
    $("agendaBadge").textContent = n ? String(n) : "";
  }
  function chip(label, on, n, onClick) {
    var c = el("button", "chip" + (on ? " on" : ""));
    c.type = "button";
    c.appendChild(document.createTextNode(label));
    if (n) c.appendChild(el("span", "n", String(n)));
    c.addEventListener("click", onClick);
    return c;
  }
  function titleCase(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }
  function countBy(fn) {
    var m = {}, order = [];
    state.rows.forEach(function (r) {
      var v = fn(r);
      if (!v) return;
      if (!m[v]) { m[v] = 0; order.push(v); }
      m[v]++;
    });
    return order.map(function (v) { return [v, m[v]]; }).sort(function (a, b) { return b[1] - a[1]; });
  }

  /* ================= розклад зустрічей ================= */
  function openAgenda() {
    var sheet = el("div", "sheet");
    sheet.appendChild(sheetHead("Розклад зустрічей", popSheet));
    var body = el("div", "sheet-body"), inner = el("div", "sheet-inner");
    body.appendChild(inner); sheet.appendChild(body);

    var meets = state.rows.filter(function (r) { return r.__meet; })
      .sort(function (a, b) { return a.__mkey < b.__mkey ? -1 : a.__mkey > b.__mkey ? 1 : 0; });

    if (!meets.length) {
      inner.appendChild(emptyState("Зустрічей у базі немає",
        "Тут з'являться ліди, у яких заповнена колонка з часом зустрічі.", "Закрити", popSheet));
      pushSheet(sheet);
      return;
    }
    var done = meets.filter(function (r) { return state.touch[r.__id] && state.touch[r.__id].status; }).length;
    var head = el("div", "sect");
    head.appendChild(el("span", "eyebrow", meets.length + " зустрічей · " + done + " вже відмічено"));
    inner.appendChild(head);

    var lastDay = null;
    meets.forEach(function (r) {
      var day = (r.__meet.split(",")[0] || "").trim();
      if (day !== lastDay) { inner.appendChild(el("div", "daysep", day || "Без дати")); lastDay = day; }
      var t = state.touch[r.__id] || {};
      var b = el("button", "slot");
      b.type = "button";
      var time = (r.__meet.match(/\d{1,2}:\d{2}/) || ["—"])[0];
      b.appendChild(el("div", "time", time));
      var who = el("div", "who");
      who.appendChild(el("div", "nm", r.__company));
      var sub = el("div", "sub");
      if (val(r, "stand")) sub.appendChild(el("span", "standchip", val(r, "stand")));
      if (val(r, "person")) sub.appendChild(el("span", null, val(r, "person")));
      if (t.status) {
        var s = el("span", null, STATUS_LABEL[t.status]);
        s.style.fontWeight = "600";
        sub.appendChild(s);
      }
      who.appendChild(sub);
      if (t.summary) who.appendChild(el("span", "summary", t.summary));
      b.appendChild(who);
      if (t.status) b.appendChild(el("span", "sdot " + t.status));
      b.addEventListener("click", function () { openLead(r.__id); });
      inner.appendChild(b);
    });
    pushSheet(sheet);
  }

  /* ================= картка ліда ================= */
  function openLead(id) {
    var row = null, i;
    for (i = 0; i < state.rows.length; i++) if (state.rows[i].__id === id) { row = state.rows[i]; break; }
    if (!row) return;
    pushSheet(buildLeadSheet(row));
  }

  function buildLeadSheet(row) {
    var sheet = el("div", "sheet");
    sheet.appendChild(sheetHead(row.__company, popSheet));
    var body = el("div", "sheet-body"), inner = el("div", "sheet-inner");
    body.appendChild(inner); sheet.appendChild(body);
    var cur = state.touch[row.__id] || {};

    /* шапка */
    var head = el("div", "lead-head");
    head.appendChild(el("h1", "lead-name", row.__company));
    var facts = el("div", "lead-facts");
    if (row.__pstatus) facts.appendChild(el("span", "pbadge " + pstatusClass(row.__pstatus), row.__pstatus));
    if (row.__meet) facts.appendChild(el("span", "fact stand", "Зустріч " + row.__meet));
    var stand = val(row, "stand");
    if (stand) {
      var fs = el("span", "fact stand");
      fs.appendChild(el("small", null, "Стенд"));
      fs.appendChild(el("span", "mono", " " + stand));
      facts.appendChild(fs);
    }
    if (row.__tier) facts.appendChild(el("span", "fact tier", "Пріоритет " + row.__tier));
    [val(row, "country"), val(row, "segment")].forEach(function (v) {
      if (v) facts.appendChild(el("span", "fact", v));
    });
    if (state.sources.length > 1) facts.appendChild(el("span", "fact", row.__source || "База"));
    head.appendChild(facts);
    if (row["Компанія визначена"]) {
      var warn = el("p", "note-inline", "Назву компанії відновлено " + row["Компанія визначена"] + " — у файлі клітинка порожня.");
      warn.style.margin = "9px 0 0";
      head.appendChild(warn);
    }
    inner.appendChild(head);

    /* що з ним робити */
    var offer = val(row, "offer"), baseNote = val(row, "note");
    if (offer || baseNote) {
      var s0 = el("div", "sect");
      s0.appendChild(el("span", "eyebrow", "Що з ним робити"));
      s0.appendChild(el("div", "hintbox", [offer, baseNote].filter(Boolean).join("\n\n")));
      inner.appendChild(s0);
    }

    /* результат на стенді */
    var s1 = el("div", "sect");
    s1.appendChild(el("span", "eyebrow", "Результат розмови"));
    var grid = el("div", "statusgrid");
    STATUSES.forEach(function (s) {
      var b = el("button", "sbtn " + s.k + (cur.status === s.k ? " on" : ""));
      b.type = "button";
      b.appendChild(el("span", "sdot " + s.k));
      b.appendChild(document.createTextNode(s.label));
      b.addEventListener("click", function () {
        setTouch(row.__id, { status: cur.status === s.k ? "" : s.k });
        refreshLeadSheet(row);
      });
      grid.appendChild(b);
    });
    s1.appendChild(grid);
    inner.appendChild(s1);

    /* головне по ліду — один рядок, видно зі списку */
    var s2 = el("div", "sect");
    s2.appendChild(el("span", "eyebrow", "Головне по цьому ліду"));
    var sIn = el("input", "summary-in");
    sIn.type = "text";
    sIn.placeholder = "Один рядок: про що домовились, що вирішує";
    sIn.value = cur.summary || "";
    var sTimer = null;
    sIn.addEventListener("input", function () {
      clearTimeout(sTimer);
      sTimer = setTimeout(function () { setTouch(row.__id, { summary: sIn.value }, true); }, 600);
    });
    sIn.addEventListener("blur", function () {
      clearTimeout(sTimer);
      setTouch(row.__id, { summary: sIn.value }, true);
    });
    s2.appendChild(sIn);
    s2.appendChild(el("p", "note-inline", "Цей рядок показується просто в списку — щоб на другій зустрічі не відкривати картку."));
    inner.appendChild(s2);

    /* журнал: кожен контакт окремим записом */
    var s3 = el("div", "sect");
    s3.appendChild(el("span", "eyebrow", "Журнал контактів"));
    var addBox = el("div", "logadd");
    var ta = el("textarea", "note");
    ta.placeholder = "Що обговорили, що пообіцяли, кому передати…";
    var addBtn = el("button", "btn primary", "Додати запис");
    addBtn.addEventListener("click", function () {
      var txt = ta.value.trim();
      if (!txt) { ta.focus(); return; }
      addLogEntry(row.__id, txt);
      ta.value = "";
      refreshLeadSheet(row);
      toast("Записано");
    });
    addBox.appendChild(ta);
    addBox.appendChild(addBtn);
    s3.appendChild(addBox);

    var log = (cur.log || []).slice().sort(function (a, b) { return a.at < b.at ? 1 : -1; });
    if (!log.length) {
      s3.appendChild(el("p", "logempty", "Записів ще немає. Кожен запис отримує час і автора — так видно всю історію контактів з лідом."));
    } else {
      log.forEach(function (entry) { s3.appendChild(logNode(row, entry)); });
    }
    inner.appendChild(s3);

    /* контакти */
    var links = [], email = val(row, "email"), phone = val(row, "phone"), site = val(row, "website");
    if (phone) links.push(["tel:" + phone.replace(/[^\d+]/g, ""), "Подзвонити", phone, iconPhone()]);
    if (email) links.push(["mailto:" + email, "Написати", email, iconMail()]);
    if (site) {
      var isLi = /linkedin/i.test(site);
      links.push([site.match(/^https?:/i) ? site : "https://" + site.replace(/^\/+/, ""),
        isLi ? "LinkedIn" : "Сайт", site.replace(/^https?:\/\/(www\.)?/, ""), iconGlobe()]);
    }
    if (links.length || val(row, "person")) {
      var s4 = el("div", "sect");
      s4.appendChild(el("span", "eyebrow", "Контакт"));
      if (val(row, "person")) {
        var dl0 = el("dl", "kv");
        dl0.appendChild(kvRow("Людина", val(row, "person")));
        if (val(row, "role")) dl0.appendChild(kvRow("Посада", val(row, "role")));
        s4.appendChild(dl0);
      }
      if (links.length) {
        var lg = el("div", "linkgrid");
        lg.style.marginTop = val(row, "person") ? "10px" : "0";
        links.forEach(function (L) {
          var a = el("a", "linkbtn");
          a.href = L[0];
          if (L[1] !== "Подзвонити" && L[1] !== "Написати") { a.target = "_blank"; a.rel = "noopener noreferrer"; }
          a.innerHTML = L[3];
          var lab = el("div", "l");
          lab.appendChild(el("small", null, L[1]));
          lab.appendChild(el("span", null, L[2]));
          a.appendChild(lab);
          lg.appendChild(a);
        });
        s4.appendChild(lg);
      }
      inner.appendChild(s4);
    }

    /* підказка від Claude — тільки якщо можливість доступна */
    if (sampleFn) {
      var s5 = el("div", "sect");
      s5.appendChild(el("span", "eyebrow", "Підказка для розмови"));
      var out = el("div", "hintbox hidden");
      var gen = el("button", "btn wide", "Підготувати 3 питання цьому ліду");
      gen.addEventListener("click", function () {
        gen.disabled = true;
        out.classList.remove("hidden");
        out.classList.add("pending");
        out.textContent = "Думаю…";
        askClaude(row, out, gen);
      });
      s5.appendChild(gen);
      s5.appendChild(out);
      inner.appendChild(s5);
    }

    /* усі поля */
    var s6 = el("div", "sect");
    s6.style.borderBottom = "none";
    var det = el("details", "raw");
    det.appendChild(el("summary", null, "Усі поля з бази"));
    var dl = el("dl", "kv");
    state.columns.forEach(function (c) { if (row[c]) dl.appendChild(kvRow(c, row[c])); });
    det.appendChild(dl);
    s6.appendChild(det);
    inner.appendChild(s6);

    return sheet;
  }

  function logNode(row, entry) {
    var n = el("div", "logitem");
    var when = el("div", "when");
    when.appendChild(el("span", null, shortTime(entry.at)));
    if (entry.by) when.appendChild(el("span", null, "· " + entry.by));
    n.appendChild(when);

    var txt = el("div", "txt", entry.text);
    n.appendChild(txt);

    var acts = el("div", "acts");
    var edit = el("button", null, "Змінити");
    var del = el("button", null, "Видалити");
    acts.appendChild(edit);
    acts.appendChild(del);
    n.appendChild(acts);

    edit.addEventListener("click", function () {
      var ta = el("textarea", "note");
      ta.value = entry.text;
      var save = el("button", "btn primary", "Зберегти");
      var cancel = el("button", "btn", "Скасувати");
      var bar = el("div", "btnrow");
      bar.style.marginTop = "8px";
      bar.appendChild(save);
      bar.appendChild(cancel);
      txt.replaceWith(ta);
      acts.replaceWith(bar);
      ta.focus();
      save.addEventListener("click", function () {
        updateLogEntry(row.__id, entry.id, ta.value.trim());
        refreshLeadSheet(row);
      });
      cancel.addEventListener("click", function () { refreshLeadSheet(row); });
    });
    del.addEventListener("click", function () {
      if (!confirm("Видалити цей запис?")) return;
      updateLogEntry(row.__id, entry.id, "");
      refreshLeadSheet(row);
    });
    return n;
  }

  function kvRow(k, v) {
    var d = el("div", "kv-row");
    d.appendChild(el("dt", null, k));
    d.appendChild(el("dd", /^[\d\s+()\-.]+$/.test(String(v)) ? "mono" : null, String(v)));
    return d;
  }
  function refreshLeadSheet(row) {
    var old = sheetStack[sheetStack.length - 1];
    if (!old) return;
    var sc = old.querySelector(".sheet-body").scrollTop;
    var fresh = buildLeadSheet(row);
    old.replaceWith(fresh);
    sheetStack[sheetStack.length - 1] = fresh;
    fresh.querySelector(".sheet-body").scrollTop = sc;
    renderList();
    renderChips();
  }
  function iconPhone() { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h3l2 5-2.5 1.5a12 12 0 0 0 5 5L15 12l5 2v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4 6.2 2 2 0 0 1 6 4z"/></svg>'; }
  function iconMail() { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6.5 8.5 6 8.5-6"/></svg>'; }
  function iconGlobe() { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.2 2.4 3.2 5.4 3.2 8.5s-1 6.1-3.2 8.5c-2.2-2.4-3.2-5.4-3.2-8.5S9.8 5.9 12 3.5z"/></svg>'; }

  function askClaude(row, out, btn) {
    var lines = [];
    state.columns.forEach(function (c) { if (row[c]) lines.push(c + ": " + row[c]); });
    var t = state.touch[row.__id];
    if (t && t.summary) lines.push("Мій підсумок: " + t.summary);
    if (t && t.log && t.log.length) {
      lines.push("Історія контактів: " + t.log.map(function (e) { return e.text; }).join(" // "));
    }
    var prompt =
      "Ти помічник менеджера GIS-Point на виставці MSPO. Компанія-лід підходить до стенда.\n" +
      "Дані про ліда:\n" + lines.join("\n") + "\n\n" +
      "Дай українською, дуже коротко:\n" +
      "1) Один рядок — хто вони і чим можуть бути корисні.\n" +
      "2) Три конкретні питання саме їм.\n" +
      "3) Один наступний крок після виставки.\n" +
      "Без вступів і без вигаданих фактів — спирайся лише на дані вище.";
    sampleFn(prompt, {
      modelTier: "quick",
      onText: function (e) { out.classList.remove("pending"); out.textContent = e.text; }
    }).then(function (r) {
      out.classList.remove("pending");
      out.textContent = r.text;
      btn.disabled = false;
      btn.textContent = "Переформулювати";
    }).catch(function (e) {
      btn.disabled = false;
      if (e && e.code === "not_granted") { out.classList.add("hidden"); btn.classList.add("hidden"); return; }
      out.classList.remove("pending");
      out.textContent = e && e.text ? e.text : "Не вийшло згенерувати підказку. Спробуй ще раз.";
    });
  }

  /* ================= фільтри ================= */
  function openFilters() {
    var sheet = el("div", "sheet");
    sheet.appendChild(sheetHead("Фільтри", popSheet));
    var body = el("div", "sheet-body"), inner = el("div", "sheet-inner");
    body.appendChild(inner); sheet.appendChild(body);

    var countries = countBy(function (r) { return val(r, "country"); });
    var tiers = countBy(function (r) { return r.__tier; });
    var segs = countBy(function (r) { return val(r, "segment"); });

    if (countries.length) inner.appendChild(filterSection("Країна", countries, state.filters.country, function (v) {
      state.filters.country = state.filters.country === norm(v) ? null : norm(v);
      state.limit = 60; refresh(); popSheet();
    }, true));
    if (tiers.length > 1) inner.appendChild(filterSection("Пріоритет", tiers, state.filters.tier, function (v) {
      state.filters.tier = state.filters.tier === v ? null : v; state.limit = 60; refresh(); popSheet();
    }, false));
    if (segs.length > 1) inner.appendChild(filterSection("Сегмент", segs, null, function (v) {
      state.filters.q = v; $("q").value = v; $("clearq").classList.add("show");
      state.limit = 60; refresh(); popSheet();
    }, false));
    if (state.sources.length > 1) inner.appendChild(filterSection("Джерело",
      state.sources.map(function (s) { return [s, state.sourceCounts[s]]; }),
      state.filters.source, function (v) {
        state.filters.source = state.filters.source === v ? null : v;
        state.limit = 60; refresh(); popSheet();
      }, false));

    var reset = el("div", "sect");
    reset.style.borderBottom = "none";
    var rb = el("button", "btn wide", "Скинути всі фільтри");
    rb.addEventListener("click", function () { resetFilters(); popSheet(); });
    reset.appendChild(rb);
    inner.appendChild(reset);
    pushSheet(sheet);
  }
  function filterSection(title, items, active, onPick, normalized) {
    var s = el("div", "sect");
    s.appendChild(el("span", "eyebrow", title));
    var box = el("div");
    box.style.display = "flex";
    box.style.flexWrap = "wrap";
    box.style.gap = "7px";
    items.forEach(function (it) {
      var on = normalized ? active === norm(it[0]) : active === it[0];
      box.appendChild(chip(it[0], on, it[1], function () { onPick(it[0]); }));
    });
    s.appendChild(box);
    return s;
  }
  function resetFilters() {
    state.filters = { q: "", country: null, tier: null, status: null, pstatus: null, source: null, unvisited: false };
    state.limit = 60;
    $("q").value = "";
    $("clearq").classList.remove("show");
    refresh();
  }

  /* ================= меню ================= */
  function openMenu() {
    var sheet = el("div", "sheet");
    sheet.appendChild(sheetHead("База та налаштування", popSheet));
    var body = el("div", "sheet-body"), inner = el("div", "sheet-inner");
    body.appendChild(inner); sheet.appendChild(body);

    var s1 = el("div", "sect");
    s1.appendChild(el("span", "eyebrow", "База лідів"));
    if (state.rows.length) {
      s1.appendChild(el("p", "note-inline", (state.baseLabel ? state.baseLabel + " · " : "") +
        state.rows.length + " записів, " + state.columns.length + " колонок"));
      state.sources.forEach(function (src) {
        var r = el("div", "srcrow");
        r.appendChild(el("span", null, src));
        r.appendChild(el("span", "mono", String(state.sourceCounts[src])));
        var sp = el("span"); sp.style.flex = "1"; r.appendChild(sp);
        var x = el("button", "x", "Прибрати");
        x.addEventListener("click", function () { removeSource(src); popSheet(); openMenu(); });
        r.appendChild(x);
        s1.appendChild(r);
      });
    } else s1.appendChild(el("p", "note-inline", "База ще не завантажена."));
    var row1 = el("div", "btnrow");
    row1.style.marginTop = "12px";
    var add = el("button", "btn primary", state.rows.length ? "Додати ще файл" : "Завантажити Excel / CSV");
    add.addEventListener("click", function () { $("fileInput").click(); });
    row1.appendChild(add);
    s1.appendChild(row1);
    s1.appendChild(el("p", "note-inline", "Файл читається прямо на пристрої. Підтримуються .xlsx, .xls, .csv; кожен аркуш книги стає окремим джерелом."));
    inner.appendChild(s1);

    if (state.columns.length) {
      var s2 = el("div", "sect");
      s2.appendChild(el("span", "eyebrow", "Які колонки за що відповідають"));
      s2.appendChild(el("p", "note-inline", "Якщо щось не туди — виправ, список оновиться одразу."));
      var grid = el("div", "mapgrid");
      FIELDS.forEach(function (f) {
        var r = el("div", "maprow");
        r.appendChild(el("span", null, f.label));
        var sel = el("select");
        var o0 = el("option", null, "— немає —");
        o0.value = "";
        sel.appendChild(o0);
        state.columns.forEach(function (c) {
          var o = el("option", null, c);
          o.value = c;
          if (state.map[f.k] === c) o.selected = true;
          sel.appendChild(o);
        });
        sel.addEventListener("change", function () {
          if (sel.value) state.map[f.k] = sel.value; else delete state.map[f.k];
          reindex(); persistBase(); refresh();
          toast("Поле «" + f.label + "» оновлено");
        });
        r.appendChild(sel);
        grid.appendChild(r);
      });
      s2.appendChild(grid);
      inner.appendChild(s2);
    }

    var s3 = el("div", "sect");
    s3.appendChild(el("span", "eyebrow", "Хто робить нотатки"));
    var lab = el("label", "field");
    lab.appendChild(el("span", null, "Ім'я — підписує твої записи для решти команди"));
    var inp = el("input");
    inp.type = "text";
    inp.placeholder = "Напр. Ігор";
    inp.value = state.me;
    inp.addEventListener("change", function () {
      state.me = inp.value.trim();
      lsSet(LS_ME, state.me);
      toast("Записано");
    });
    lab.appendChild(inp);
    s3.appendChild(lab);
    s3.appendChild(el("p", "note-inline", db
      ? "Записи синхронізуються з рештою команди."
      : "Записи зберігаються на цьому пристрої."));
    inner.appendChild(s3);

    var s4 = el("div", "sect");
    s4.appendChild(el("span", "eyebrow", "Забрати результати виставки"));
    var touched = touchedRows();
    s4.appendChild(el("p", "note-inline", touched.length
      ? touched.length + " лідів з результатом, підсумком або записами в журналі."
      : "Поки нема жодної позначки — з'явиться, щойно почнеш відмічати."));
    var row4 = el("div", "btnrow");
    var bCopy = el("button", "btn", "Скопіювати CSV");
    bCopy.addEventListener("click", copyCSV);
    row4.appendChild(bCopy);
    if (downloads) {
      var bDown = el("button", "btn primary", "Зберегти файл");
      bDown.addEventListener("click", saveCSV);
      row4.appendChild(bDown);
    }
    if (!touched.length) {
      row4.querySelectorAll("button").forEach(function (b) { b.disabled = true; });
    }
    s4.appendChild(row4);
    inner.appendChild(s4);

    var s5 = el("div", "sect");
    s5.style.borderBottom = "none";
    s5.appendChild(el("span", "eyebrow", "Очистити"));
    var row5 = el("div", "btnrow");
    var bNotes = el("button", "btn", "Стерти лише мої записи");
    bNotes.addEventListener("click", function () {
      if (!confirm("Стерти всі результати, підсумки та журнали? База лідів залишиться.")) return;
      wipeNotes();
      popSheet();
    });
    var bWipe = el("button", "btn", "Стерти все");
    bWipe.style.color = "var(--hot)";
    bWipe.addEventListener("click", function () {
      if (!confirm("Стерти всю базу і всі записи? Скасувати буде неможливо.")) return;
      wipeAll();
      popSheet();
    });
    row5.appendChild(bNotes);
    row5.appendChild(bWipe);
    s5.appendChild(row5);
    inner.appendChild(s5);

    pushSheet(sheet);
  }

  /* ================= sheets ================= */
  function sheetHead(title, onBack) {
    var h = el("div", "sheet-head");
    var b = el("button", "iconbtn");
    b.setAttribute("aria-label", "Назад");
    b.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="m14.5 5-7 7 7 7"/></svg>';
    b.addEventListener("click", function () { onBack(); });
    h.appendChild(b);
    h.appendChild(el("div", "sheet-title", title));
    return h;
  }
  function pushSheet(node) {
    sheetStack.push(node);
    document.body.appendChild(node);
    document.body.style.overflow = "hidden";
    try { history.pushState({ sr: sheetStack.length }, ""); } catch (e) {}
  }
  function popSheet(fromHistory) {
    var node = sheetStack.pop();
    if (node) node.remove();
    if (!sheetStack.length) document.body.style.overflow = "";
    if (fromHistory !== true) { try { history.back(); } catch (e) {} }
  }
  window.addEventListener("popstate", function () { if (sheetStack.length) popSheet(true); });

  /* ================= записи по ліду ================= */
  function blankTouch() { return { status: "", summary: "", log: [], by: "", at: "" }; }
  function getTouch(id) {
    var t = state.touch[id];
    if (!t) return blankTouch();
    if (!t.log) t.log = [];
    /* міграція зі старої версії, де була одна нотатка */
    if (t.note) {
      t.log.push({ id: "m" + hash(t.note), at: t.at || nowISO(), by: t.by || "", text: t.note });
      delete t.note;
    }
    return t;
  }
  function saveTouch(id, t) {
    if (!t.status && !t.summary && (!t.log || !t.log.length)) {
      delete state.touch[id];
      persistTouch();
      if (db) db.doc("touch/" + id).delete().catch(function () {});
      refresh();
      return;
    }
    t.by = state.me || t.by || "";
    t.at = nowISO();
    state.touch[id] = t;
    persistTouch();
    if (db) {
      db.doc("touch/" + id).set(t).catch(function (e) {
        if (e && e.code === "quota_exceeded") toast("Спільна база заповнена — запис лишився лише тут.");
      });
    }
    refresh();
  }
  function setTouch(id, patch, quiet) {
    var t = getTouch(id);
    if (patch.status !== undefined) t.status = patch.status;
    if (patch.summary !== undefined) t.summary = patch.summary;
    var before = JSON.stringify(state.touch[id] || null);
    saveTouch(id, t);
    if (quiet && before === JSON.stringify(state.touch[id] || null)) return;
  }
  function addLogEntry(id, text) {
    var t = getTouch(id);
    t.log.push({ id: hash(text + nowISO() + Math.random()), at: nowISO(), by: state.me || "", text: text });
    saveTouch(id, t);
  }
  function updateLogEntry(id, entryId, text) {
    var t = getTouch(id);
    if (!text) t.log = t.log.filter(function (e) { return e.id !== entryId; });
    else t.log.forEach(function (e) { if (e.id === entryId) { e.text = text; e.editedAt = nowISO(); } });
    saveTouch(id, t);
  }
  function touchedRows() {
    return state.rows.filter(function (r) {
      var t = state.touch[r.__id];
      return t && (t.status || t.summary || (t.log && t.log.length));
    });
  }

  /* ================= збереження ================= */
  function persistBase() {
    var ok = lsSet(LS_BASE, {
      columns: state.columns, map: state.map, rows: stripRows(state.rows),
      version: state.baseVersion, label: state.baseLabel
    });
    if (!ok) toast("Базу не вдалось зберегти офлайн — забагато даних для пам'яті браузера.");
  }
  function persistTouch() { lsSet(LS_TOUCH, state.touch); }
  function stripRows(rows) {
    return rows.map(function (r) {
      var o = {}, k;
      for (k in r) {
        if (k.indexOf("__") !== 0 || k === "__source" || k === "__mkey") o[k] = r[k];
      }
      return o;
    });
  }

  /* ================= імпорт ================= */
  function handleFiles(files) {
    var list = Array.prototype.slice.call(files);
    if (!list.length) return;
    toast("Читаю " + list.length + (list.length === 1 ? " файл…" : " файли…"));
    Promise.all(list.map(readFile)).then(function (all) {
      var parts = [];
      all.forEach(function (p) { parts = parts.concat(p); });
      parts = parts.filter(function (p) { return p && p.rows.length; });
      if (!parts.length) { toast("У файлі не знайшлося рядків з даними."); return; }

      var cols = state.columns.slice();
      parts.forEach(function (p) {
        p.columns.forEach(function (c) { if (cols.indexOf(c) === -1) cols.push(c); });
        state.rows = state.rows.concat(p.rows);
      });
      var newCols = cols.filter(function (c) { return state.columns.indexOf(c) === -1; });
      state.columns = cols;
      /* якщо файл приніс свої колонки — перезіставляємо все */
      if (newCols.length) state.map = autoMap(cols);
      state.baseVersion = Date.now();
      reindex();
      persistBase();
      pushBaseToDb();
      resetFilters();
      toast("Завантажено " + parts.reduce(function (a, p) { return a + p.rows.length; }, 0) + " записів");
    }).catch(function (e) {
      toast(e && e.message ? e.message : "Не вдалося прочитати файл.");
    });
  }
  function removeSource(src) {
    state.rows = state.rows.filter(function (r) { return (r.__source || "База") !== src; });
    state.baseVersion = Date.now();
    reindex(); persistBase(); pushBaseToDb(); refresh();
    toast("Джерело прибрано");
  }
  function wipeNotes() {
    var ids = Object.keys(state.touch);
    state.touch = {};
    persistTouch();
    if (db) ids.forEach(function (id) { db.doc("touch/" + id).delete().catch(function () {}); });
    refresh();
    toast("Записи стерто");
  }
  function wipeAll() {
    wipeNotes();
    state.rows = []; state.columns = []; state.map = {};
    state.baseVersion = Date.now(); state.baseLabel = "";
    lsDel(LS_BASE);
    reindex();
    if (db) db.doc("base/meta").set({ version: state.baseVersion, chunks: 0, columns: [], map: {}, wiped: true }).catch(function () {});
    resetFilters();
    toast("Стерто");
  }

  /* ================= експорт ================= */
  function csvCell(v) {
    var s = String(v == null ? "" : v);
    return /[",;\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
  }
  function buildCSV() {
    var head = ["Результат", "Головне по ліду", "Журнал", "Записів", "Хто", "Оновлено"].concat(state.columns);
    var lines = [head.map(csvCell).join(",")];
    touchedRows().forEach(function (r) {
      var t = state.touch[r.__id] || {};
      var log = (t.log || []).slice().sort(function (a, b) { return a.at < b.at ? -1 : 1; })
        .map(function (e) { return shortTime(e.at) + (e.by ? " (" + e.by + ")" : "") + ": " + e.text; })
        .join("\n");
      var line = [STATUS_LABEL[t.status] || "", t.summary || "", log,
        String((t.log || []).length), t.by || "", t.at ? shortTime(t.at) : ""];
      state.columns.forEach(function (c) { line.push(r[c] || ""); });
      lines.push(line.map(csvCell).join(","));
    });
    return "﻿" + lines.join("\r\n");
  }
  function copyCSV() {
    var csv = buildCSV();
    var done = function () { toast("CSV у буфері — встав в Excel або Google Таблиці"); };
    function fallbackCopy() {
      var ta = document.createElement("textarea");
      ta.value = csv;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); done(); }
      catch (e) { toast("Скопіювати не вийшло — спробуй «Зберегти файл»."); }
      ta.remove();
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(csv).then(done).catch(fallbackCopy);
    } else fallbackCopy();
  }
  function saveCSV() {
    if (!downloads) return;
    downloads.save({
      filename: "stand-radar-" + new Date().toISOString().slice(0, 10) + ".csv",
      data: buildCSV()
    }).then(function () { toast("Файл збережено"); })
      .catch(function () { toast("Збереження скасовано"); });
  }

  /* ================= синхронізація ================= */
  function chunkRows(rows) {
    var chunks = [], cur = [], len = 0, i, s;
    for (i = 0; i < rows.length; i++) {
      s = JSON.stringify(rows[i]);
      if (len + s.length > CHUNK_CHARS && cur.length) { chunks.push(cur); cur = []; len = 0; }
      cur.push(rows[i]); len += s.length + 1;
    }
    if (cur.length) chunks.push(cur);
    return chunks;
  }
  function pushBaseToDb() {
    if (!db || !state.rows.length) return;
    var chunks = chunkRows(stripRows(state.rows));
    Promise.all(chunks.map(function (c, i) {
      return db.doc("base/chunk" + i).set({ rows: c, v: state.baseVersion });
    })).then(function () {
      return db.doc("base/meta").set({
        version: state.baseVersion, chunks: chunks.length,
        columns: state.columns, map: state.map,
        label: state.baseLabel, count: state.rows.length
      });
    }).catch(function (e) {
      if (e && e.code === "quota_exceeded") toast("Спільна база переповнена — тут працює, у команди ні.");
    });
  }
  function pullBaseFromDb(meta) {
    if (!meta || !meta.chunks) return;
    var gets = [], i;
    for (i = 0; i < meta.chunks; i++) gets.push(db.doc("base/chunk" + i).get());
    Promise.all(gets).then(function (snaps) {
      var rows = [];
      snaps.forEach(function (s) {
        var d = s.exists ? s.data() : null;
        if (d && d.rows) rows = rows.concat(d.rows);
      });
      if (!rows.length) return;
      state.rows = rows;
      state.columns = meta.columns || state.columns;
      state.map = meta.map || autoMap(state.columns);
      state.baseVersion = meta.version || Date.now();
      state.baseLabel = meta.label || state.baseLabel;
      reindex();
      persistBase();
      refresh();
      toast("Отримано базу від команди — " + rows.length + " записів");
    }).catch(function () {});
  }
  function initCapabilities() {
    if (!(window.claude && typeof window.claude.use === "function")) return;

    window.claude.use("downloads").then(function (d) { downloads = d; }).catch(function () {});
    window.claude.use("sample").then(function (s) { if (typeof s === "function") sampleFn = s; }).catch(function () {});

    window.claude.use("db").then(function (d) {
      if (!d) return;
      db = d;
      db.doc("base/meta").onSnapshot(function (snap) {
        if (!snap.exists) { pushBaseToDb(); return; }
        var meta = snap.data() || {};
        if (meta.wiped && !meta.chunks) return;
        if ((meta.version || 0) > state.baseVersion) pullBaseFromDb(meta);
        else if (state.rows.length && (meta.version || 0) < state.baseVersion) pushBaseToDb();
      }, function () {});

      db.collection("touch").onSnapshot(function (snap) {
        var changed = false;
        snap.docChanges().forEach(function (ch) {
          var id = ch.doc.id;
          if (ch.type === "removed") {
            if (state.touch[id]) { delete state.touch[id]; changed = true; }
            return;
          }
          var remote = ch.doc.data() || {}, local = state.touch[id];
          if (!local || !local.at || (remote.at && remote.at > local.at)) {
            state.touch[id] = {
              status: remote.status || "", summary: remote.summary || "",
              log: Array.isArray(remote.log) ? remote.log : [],
              by: remote.by || "", at: remote.at || ""
            };
            changed = true;
          }
        });
        if (changed) { persistTouch(); refresh(); }
      }, function () {});
    }).catch(function () {});
  }

  /* ================= старт ================= */
  function embedded() {
    var node = document.getElementById("base-data");
    if (!node) return null;
    try { return JSON.parse(node.textContent); } catch (e) { return null; }
  }
  function boot() {
    state.me = lsGet(LS_ME) || "";
    state.touch = lsGet(LS_TOUCH) || {};

    var saved = lsGet(LS_BASE), packed = embedded();
    /* вшита база — те, з чим апка приїхала; збережена перемагає, якщо новіша */
    if (saved && saved.rows && saved.rows.length && (!packed || (saved.version || 0) >= packed.version)) {
      state.columns = saved.columns || [];
      state.map = saved.map || autoMap(state.columns);
      state.rows = saved.rows;
      state.baseVersion = saved.version || 0;
      state.baseLabel = saved.label || "";
    } else if (packed) {
      state.columns = packed.columns;
      state.map = packed.map;
      state.rows = packed.rows;
      state.baseVersion = packed.version;
      state.baseLabel = packed.label || "";
      persistBase();
    }
    reindex();
    refresh();
    initCapabilities();
  }
  function refresh() {
    renderChips();
    renderList();
  }

  /* ================= події ================= */
  var qInput = $("q"), qTimer = null;
  qInput.addEventListener("input", function () {
    $("clearq").classList.toggle("show", !!qInput.value);
    clearTimeout(qTimer);
    qTimer = setTimeout(function () {
      state.filters.q = qInput.value;
      state.limit = 60;
      renderList();
    }, 110);
  });
  qInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      qInput.blur();
      var first = document.querySelector(".row");
      if (first && norm(qInput.value)) first.click();
    }
  });
  $("clearq").addEventListener("click", function () {
    qInput.value = "";
    state.filters.q = "";
    $("clearq").classList.remove("show");
    renderList();
    qInput.focus();
  });
  $("numToggle").addEventListener("click", function () {
    state.numMode = !state.numMode;
    this.classList.toggle("on", state.numMode);
    qInput.setAttribute("inputmode", state.numMode ? "numeric" : "text");
    qInput.placeholder = state.numMode ? "Номер стенда…" : "Компанія, стенд, людина…";
    qInput.focus();
  });
  $("agendaBtn").addEventListener("click", openAgenda);
  $("filterBtn").addEventListener("click", openFilters);
  $("menuBtn").addEventListener("click", openMenu);
  $("fileInput").addEventListener("change", function () {
    handleFiles(this.files);
    this.value = "";
  });
  ["dragover", "drop"].forEach(function (ev) {
    window.addEventListener(ev, function (e) {
      e.preventDefault();
      if (ev === "drop" && e.dataTransfer && e.dataTransfer.files.length) handleFiles(e.dataTransfer.files);
    });
  });

  boot();
})();
