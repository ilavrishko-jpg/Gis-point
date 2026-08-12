# Реєстр навичок і агентів

Єдине джерело правди про вміст помічника. Оновлюється при кожній пропозиції (skill-author / agent-architect).

## Навички (skills)
| Навичка | Фаза | Статус | Призначення |
|---|---|---|---|
| product-lifecycle-orchestrator | Наскрізна | active | Веде менеджера по фазах і воротах, маршрутизує до навички фази |
| discovery-mission-research | 1. Discovery | active | Mission/task analysis, JTBD оператора, threat model |
| market-supplier-research | 1. Discovery | active | Виробники/постачальники/аналоги, мапа ринку (скільки в Україні) |
| discovery-questionnaire-builder | 1. Discovery | active | Опитувальник: технічні · регуляторні · фінансові |
| stakeholder-interview-runner | 1. Discovery | active | Проведення й синтез опитувань операторів/виробників |
| product-definition-prioritization | 2. Definition | active | PRD, пріоритезація за критичністю місії, dual-use, degraded baseline |
| requirements-tech-reg-fin | 2. Definition | active | Специфікація вимог (MoSCoW), регуляторні блокери |
| business-case-unit-economics | 2. Definition | active | Фінмодель, unit-економіка, go/no-go (життєздатність) |
| defense-ux-design | 3. Design | active | Info-dense UI, degraded-first, human factors, design system |
| geospatial-c2-ux | 3. Design | active | Карти/шари/координати, ISR, situational awareness, C2-інтерфейси |
| field-validation | 4. Validate | active | Тест з операторами, проксі-метрики, degraded-тест на залізі |
| delivery-compliance-handoff | 5. Deliver | active | Інженерний handoff, дизайн-QA, сертифікація/безпека, канал фідбеку |
| product-roadmap-milestones | 5. Deliver | active | Роадмеп із віхами до MVP на фронт |
| skill-author | Мета | active | Помічник пише собі навички/чек-пункти |
| agent-architect | Мета | active | Помічник вирішує про нових агентів |

## Агенти (agents)
| Агент | Фази | Статус | Коли викликати |
|---|---|---|---|
| discovery-agent | 1–2 | active | Глибокий research + визначення продукту (Discover/Define) |
| design-agent | 3 | active | Об'ємне проєктування: UX, degraded, human factors, GIS/C2 |
| delivery-agent | 4–5 | active | Валідація, handoff, сертифікація, вихід у поле |

## Довідники (references)
| Довідник | Призначення |
|---|---|
| degraded-first-field-test | Протокол польового тесту в degraded-умовах (Фаза 4) |
| c2-symbology-coordinates | Символіка MIL-STD-2525/APP-6 і координатні системи (Фаза 3, geospatial-c2-ux) |

## Суміжні навички в цьому репо (інші боти)
| Навичка | Призначення |
|---|---|
| geo-it-positioning | Позиціонування geospatial/IT-продукту (корисно для Фази 2) |
| gtm-strategy | Вихід на ринок (корисно після Deliver) |

> Статуси: `active` · `proposed` (чекає гейту власника) · `deprecated` (на виведення).
