# CHANGELOG — журнал самонавчання бота

Кожен запис: дата · що змінилось · навіщо · на основі яких сигналів. Це довготривала памʼять бота.

## 2026-09-10 — Розбір задач ClickUp (Eugene) + перша самопропозиція навички
- **Задача:** розібрано 7 задач Eugene зі списку `Project 1` (статуси to do / in progress)
  на дошці «GIS-Point _ refresh sales»; на кожну підготовано повну відповідь.
  Результат: `outputs/2026-09-10-clickup-eugene/`.
- **Навички, що покрили задачі без імпровізації:** `lean-process-writer`, `kpi-scorecard`,
  `people-accountability`, `company-stage-calibrator`, `priorities-quarterly-theme`,
  `cash-acceleration`, зовнішні `geo-it-positioning` і `gtm-strategy`.
- **Прогалина, що пройшла поріг (3 повтори за день):** архітектура драбини оферів і ціна
  щабля — у задачах `869eu893c`, `869ev3ugb`, `869ey9wk0`. Наявні навички не покривають:
  `cash-acceleration` про грошовий потік, `geo-it-positioning` про категорію.
- **Додано (як пропозиція, статус `proposed`):** навичка `offer-ladder-pricing` —
  правило розриву ≥5×, вхідний щабель із містком, окрема ставка для перепродажу,
  gate-чекліст BD перед прорахунком. Пропозиція: `governance/proposals/2026-09-10-offer-ladder-pricing.md`.
  За рубрикою агента виконано 1 умову з 5 → навичка, не агент.
- **Залоговано в беклог:** ще 4 прогалини (атрибуція каналу, скринінг на події, колізія
  систем тірів, доступ до канону) — під спостереженням, без створення сутностей.
- **Гейт власника:** навичка неактивна до merge цього PR.

## 2026-06-28 — Ініціалізація
- Створено бота на базі методології Scaling Up (Harnish), 4 зони рішень.
- Додано 8 бізнес-навичок: company-stage-calibrator, lean-process-writer, one-page-strategic-plan,
  people-accountability, meeting-rhythm, priorities-quarterly-theme, kpi-scorecard, cash-acceleration.
- Додано 2 мета-навички: skill-author (бот пише навички), agent-architect (бот вирощує агентів).
- Створено 4 базові агенти: strategy-agent, people-agent, execution-agent, cash-agent.
- Налаштовано цикл самовдосконалення (governance/) із гейтом власника та беклогом прогалин.
- Наскрізні принципи: калібрування 50→100 і тест на бюрократію вшито в усі навички й агенти.
