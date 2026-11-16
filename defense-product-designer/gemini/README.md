# Версія для Gemini

`SKILL.md` — це формат Claude, Gemini його напряму не читає. Тут той самий скіл, адаптований під Gemini.

## Варіант 1 — Gemini Gem (gemini.google.com)
1. Gems → **New Gem**, назва: `Aero Defense Designer`.
2. Поле **Instructions**: вставте весь вміст `GEM_INSTRUCTIONS.md`.
3. **Knowledge** — завантажте 6 файлів з `../.claude/skills/aero-defense-design/references/`:
   `aerodynamics.md`, `optical-navigation.md`, `defense-design-language.md`,
   `integration-standards.md`, `review-checklist.md`, `render-prompts.md`.
   За бажанням додайте `../.claude/skills/aero-defense-design/templates/design-brief.md`.
4. Збережіть. Далі просто надсилайте фото чи референси свого модуля з описом задачі.

Обмеження Gem: він не запускає скрипти з репозиторію. Формули є в інструкціях, і Gemini рахує
їх сам (або через вбудоване виконання коду). Тому SVG-креслення і модель OpenSCAD він малює
сам, а не через `pod_generator.py`.

## Варіант 2 — Gemini CLI (у цьому репозиторії)
Відкрийте папку `defense-product-designer/` у Gemini CLI. Він автоматично прочитає `GEMINI.md`,
а через нього SKILL.md і довідники, і зможе запускати Python-скрипти (`aero_optics_calc.py`,
`pod_generator.py`) так само, як Claude Code.
