# FLY BY — image prompts for GPT Image / Nano Banana

Derived from the real flyby.gis-point.com pages, not invented. The house image
style there is one consistent thing: **a desaturated documentary photograph,
warm-toned, with a luminous scan cone and thin white technical vector overlays
drawn on top, and a monospace caption bar along the bottom.**

## Paste this first — the style block

Give this to the model once, then any of the prompts below. Keeping it verbatim
across assets is what makes them look like a set.

> **Style: FLY BY house style.** Desaturated documentary photograph, almost
> monochrome, graded to a warm sepia-brown duotone — deep warm near-black
> `#1A1411` in the shadows, warm off-white `#F8F6F0` in the highlights, and a
> single muted copper `#885530` used sparingly and only on graphic overlay
> elements. Flat, overcast, directionless light. Matte finish, fine film grain,
> low contrast in the midtones, no glossy highlights, no lens flare, no colour
> outside that warm neutral range. Thin, precise white vector overlays drawn
> over the photograph like an instrument readout: 1px crosshairs, dashed
> trajectory lines, concentric arcs, corner brackets, a faint ellipse marking a
> ground footprint. Restrained and editorial, closer to a defence white paper
> than to game art. No text, no letters, no numbers, no logos, no watermarks.

## Prompt 1 — Hero (the main marketing image)

Matches the site's own hero. Ask for **16:9** or **3:4**.

> A fixed-wing reconnaissance drone seen from slightly behind and above,
> banking gently over a wide patchwork of farmland, rivers and treelines far
> below. The horizon sits high in the frame; the ground is soft with haze. A
> single luminous pale shaft of light descends vertically from the aircraft's
> belly to the ground, widening slightly, marking what the camera sees. Thin
> white technical overlays: a crosshair where the shaft meets the ground, a
> faint ellipse around that point, two dashed vector lines running off toward
> the horizon, and small corner brackets framing one field boundary. Warm sepia
> duotone, flat overcast light, matte, fine grain. No text, no logos.

## Prompt 2 — GNSS-denied envelope (the problem image)

Matches the site's problem section. **16:9**, works well cropped to a band.

> A low, flat horizon at dusk. On the left, the dark silhouette of a military
> ground vehicle bristling with antenna masts, seen in profile. Concentric thin
> white arcs radiate outward from its antennas across the sky, evenly spaced,
> like a broadcast pattern. On the right and higher in the frame, the small
> silhouette of a fixed-wing drone, with a luminous pale trapezoid of light
> descending from it to the ground, a thin white crosshair centred inside that
> beam. The two forms do not touch. Near-monochrome, warm grey-brown duotone,
> heavy atmospheric haze, matte, fine grain. No text, no logos.

## Prompt 3 — Terrain match (close on the mechanism)

For a square or a wide band. **1:1** or **16:9**.

> A near-vertical aerial view straight down onto farmland — irregular field
> polygons, a curving river, a single road cutting diagonally. Rendered as a
> desaturated warm-grey aerial photograph. Over it, thin white technical
> overlays lock onto ground features: four small crosshair markers on field
> corners and the road junction, each ringed by a thin circle, plus corner
> brackets framing the centre of the frame. A faint one-pixel grid overlays the
> whole image, slightly offset from the terrain beneath it. Matte, flat light,
> fine grain, no colour beyond warm neutral. No text, no numbers, no logos.

## Working notes

- **Never let the model set type.** The site puts real captions over its images
  (`GNSS-DENIED ENVELOPE`, `L1 · L2 · L5`) — those are laid on in the page, in
  letter-spaced uppercase mono, not baked into the photograph. Do the same:
  generate clean, add the caption bar in the layout.
- Generate large and downsample. A full-bleed A4 band needs ~2400 px wide to
  survive 300 dpi.
- Pick candidates on **silhouette legibility at thumbnail size**, and check each
  one in grayscale — the whole palette is nearly monochrome already, so if it
  falls apart in mono it was relying on the copper, which the style says should
  be doing almost nothing.
- If a generator balks, drop "military" and "drone" for "survey aircraft" and
  "ground station". The composition carries the meaning, not the vocabulary.

## The brand system these were pulled from

Sampled from the page screenshots, so these are the real values.

| Role | Value |
| --- | --- |
| Paper | `#F8F6F0` (warm off-white; a second, warmer `#F2EEE5` also appears) |
| Ground | `#1A1411` (warm near-black, not blue-black) |
| Copper on light | `#815837` — eyebrow labels, the live logo dot |
| Copper on dark | `#C7956D` — labels and figures on dark sections |
| Copper fill | `#885530` — the solid CTA button |
| Body text | `#413D39` secondary, `#6D6965` for mono metadata |
| Hairline | `#D2CFCA` on screen; darkened to `#ADA79D` in print so it survives |

**Type roles** — four, and each does one job:
- **Headlines: a serif, sentence case.** Never all-caps. "Optical
  terrain-matching. No satellite signal. No survey flight."
- **Figures: a light geometric sans.** `46,000+`, `+300%`, `$3.7B`.
- **Body: a neutral sans**, generous line-height, around 1.6–1.7.
- **Every label, source line and piece of metadata: uppercase monospace with
  wide letter-spacing.** This is the strongest single signature of the brand.
- Section openers are a short rule followed by a spaced copper mono word —
  `—— SOLUTION`, `—— PROBLEM`.

The flyer approximates the serif with **Newsreader** and the figures with
**Jost**. Both are stand-ins picked by eye from screenshots; send the font names
from the site's CSS and I will swap them for the real ones.
