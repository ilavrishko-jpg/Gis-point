# Реєстр навичок і агентів — FlyBy

Єдине джерело правди про вміст бота. Оновлюється при кожній пропозиції (skill-author / agent-architect).

## Навички (skills)
| Навичка | Етап | Статус | Призначення |
|---|---|---|---|
| product-lifecycle-map | Наскрізна (0–5) | active | Карта 6 етапів + gate, головний інтегратор |
| idea-intake-hypothesis | 0 Ідея | active | One-pager ідеї, гіпотези, критерій успіху |
| market-manufacturer-research | 1 Дослідження | active | Лонгліст виробників + мапа ринку України |
| discovery-questionnaire-builder | 1 Дослідження | active | Опитувальник: тех · рег · фін |
| manufacturer-interview-runner | 1 Дослідження | active | Проведення й синтез опитувань |
| requirements-tech-reg-fin | 2 Визначення | active | Специфікація вимог (MoSCoW) |
| product-definition-canvas | 2 Визначення | active | Формування продукту, межі MVP |
| business-case-unit-economics | 3 Валідація | active | Фінмодель, unit-економіка, go/no-go |
| product-roadmap-milestones | 4 Реалізація | active | Роадмеп із віхами |
| mvp-delivery-validation | 4 Реалізація | active | MVP і польова валідація |
| launch-gtm-readiness | 5 Запуск | active | Готовність до виходу на ринок |
| skill-author | Мета | active | Бот пише собі навички |
| agent-architect | Мета | active | Бот вирощує агентів |

## Агенти (agents)
| Агент | Етапи | Статус | Коли викликати |
|---|---|---|---|
| research-agent | 1 | active | Виробники, опитувальник, опитування, мапа ринку |
| product-agent | 2–3 | active | Вимоги, product canvas, економіка, go/no-go |
| delivery-agent | 4–5 | active | Роадмеп, MVP, валідація, запуск |

## Зовнішні навички (у проєкті claude.ai / інших теках, поза цим ботом)
| Навичка | Призначення |
|---|---|
| gtm-strategy | B2B GTM-флоу з URL сайту (підключати на Етапі 5) |
| geo-it-positioning | Позиціонування geospatial/IT (для гострого product-canvas) |

> Статуси: `active` · `proposed` (чекає гейту власника) · `deprecated` (на виведення).
