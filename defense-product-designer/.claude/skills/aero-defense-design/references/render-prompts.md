# Рендери: промпти та сцени, що не брешуть

Генератори зображень люблять «sci-fi». Твоє завдання — промпт, що дає **технічно
правильний** серійний defense-продукт. Завжди спочатку визнач геометрію (SVG/SCAD), потім рендер.

## 1. Шаблон промпту (англійською — генератори розуміють краще)
```
Studio product render of a [aerodynamic optical navigation pod | conformal sensor fairing]
for [UAV | light aircraft | helicopter], designed by a modern defense technology company.
Form: [smooth von Karman nose, cylindrical mid-body, 10-degree boattail ending in an angled
sharp cut], length-to-diameter ratio [5:1], [faceted pylon with crisp planar surfaces].
Optical window: [flush flat sapphire window, stadium shape, on the underside at 45% length],
set in a [matte black faceted hexagonal insert], camera lens visible behind glass.
Surfaces: monolithic, minimal panel lines running along the airflow, flush countersunk
fasteners in a regular rhythm, no decorative details.
CMF: [matte FS 36118 gunship gray] body, [flat black] optical insert, small white stencil
markings "FWD", part number, "NO STEP".
Lighting: soft large-area studio key light, subtle rim light, neutral gray seamless background,
3/4 front low angle view, 85mm lens, high detail, photorealistic, industrial design presentation.
Negative: sci-fi, glowing lights, neon, chrome, glossy paint, exposed screws, vents, weapons,
text gibberish, camouflage, logos of real companies.
```

## 2. Варіанти кадрів (роби серію)
1. 3/4 спереду знизу — головний (видно вікно).
2. Строгий профіль на сірому — для оцінки силуету і кутів.
3. Модуль на носії в польоті (у контексті, motion blur фону, небо/земля) — «як задумав завод».
4. Детальний макро вікна і стику з пілоном.
5. Exploded view (корпус, оптична плита, камера, IMU, ізолятори, вікно, рамка, роз'єм).

## 3. KeyShot / Blender (Cycles) — налаштування
- Матеріал корпусу: Principled BSDF, base FS 36118 ≈ sRGB(79,83,86) / #4F5356, roughness 0.55–0.65, specular 0.3; тонкий шум нормалей (масштаб 0.2 мм) як фарба.
- Вставка: #1A1A1A, roughness 0.7.
- Вікно: Glass IOR 1.77 (сапфір) / 1.46 (кварц) / 4.0 (Ge, темно-сірий непрозорий у VIS), roughness 0, легкий AR-відлив (thin film, фіолетово-зелений слабко).
- Фаски: bevel 0.3–0.5 мм на всіх гострих ребрах — інакше «CG-вигляд».
- Освітлення: HDRI студійний + 1 великий softbox ключ + rim. Фон — нескінченний сірий 18 %.
- Камера: 70–100 мм екв., f/8, без ширококутних спотворень.
- Для імпорту: `pod_generator.py` → `.scad` → OpenSCAD → STL/STEP (через FreeCAD) → Blender.

## 4. Що перевіряти в готовому рендері
- Напрям потоку: ніс уперед по ходу ЛА, хвостовик назад, вікно там, де вказано.
- Немає «зайвих» вентиляцій, світлових смуг, нереальних швів.
- Маркування читається і має сенс (генератори часто пишуть кашу — додай текст пізніше у постобробці).
- Пропорції L/D збігаються з розрахунковими.
