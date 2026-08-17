# CHANGELOG — журнал самонавчання помічника (Defense-Tech Product Design)

Кожен запис: дата · що змінилось · навіщо · на основі яких сигналів. Це довготривала памʼять помічника.

## 2026-08-12 — Ініціалізація
- Створено помічника з продуктового дизайну в дефенс-тек на базі Double Diamond + Stage-Gate +
  OODA/JTBD + human factors. Наскрізні принципи: «ціна помилки — місія і життя» і degraded-first.
- Побудовано систему з 6 фаз (Discovery · Definition · Design · Validate · Deliver · Learn) з воротами
  між ними — навичка-диригент `product-lifecycle-orchestrator`.
- Додано 6 навичок фаз: discovery-mission-research, product-definition-prioritization, defense-ux-design,
  geospatial-c2-ux, field-validation, delivery-compliance-handoff.
- Додано 2 мета-навички: skill-author, agent-architect.
- Створено 3 агенти: discovery-agent (фази 1–2), design-agent (фаза 3), delivery-agent (фази 4–5).
- Оформлено ворота фаз як чек-лісти (`governance/stage-gates.md`), цикл самонавчання, стандарт навички,
  рубрику рішення про агента, реєстр, беклог і шаблони пропозицій.
- Написано `PLAN.md` (покроковий сценарій від ідеї до реалізації).
- Додано довідники: `references/degraded-first-field-test.md`, `references/c2-symbology-coordinates.md`.
- Джерело: матеріалізація бандла знань «Defense-Tech Product Design Bot» у робочу структуру Claude Code.

## 2026-08-12 — Злиття з PM-ботом БПЛА (один сильний бот)
- Об'єднано `product-manager-flyby-bot` у цей бот — тепер це єдиний продуктовий бот дефенс-тек.
- Додано 6 навичок (вплетено у фази, без дублів):
  - Фаза 1: `market-supplier-research` (виробники/постачальники + мапа ринку «скільки в Україні»),
    `discovery-questionnaire-builder` (опитувальник тех/рег/фін), `stakeholder-interview-runner` (синтез опитувань).
  - Фаза 2: `requirements-tech-reg-fin` (специфікація вимог MoSCoW), `business-case-unit-economics` (фінансовий gate go/no-go).
  - Фаза 5: `product-roadmap-milestones` (роадмеп до MVP на фронт).
- Оновлено ворота: у 1→2 додано ринок/постачальників і опитування; у 2→3 додано ❗ фінансовий gate.
- Discovery тепер має два зрізи (місія + ринок/промбаза); Definition — два gate (місійний + фінансовий).
- Дублі не переносив: idea-intake (у discovery), product-definition-canvas (=prioritization),
  product-lifecycle-map (=orchestrator), mvp-delivery-validation (=field-validation), launch-gtm-readiness (=delivery + суміжна gtm-strategy).
- Причина: запит власника — «об'єднати в один сильний дефенс продакт дизайн бот».
