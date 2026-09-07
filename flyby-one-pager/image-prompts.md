# FLY BY — image prompts for GPT Image / Nano Banana

**Audience: UAV manufacturers and integrators who will install this on their own
airframes.** Not investors. That changes what the pictures have to do: an
investor image sells the size of the problem, a customer image shows the thing
working on an aircraft like theirs. Every prompt below is built to answer
"what goes on my airframe, and what does it give me back".

Style is lifted from the real flyby.gis-point.com pages: a desaturated
documentary photograph, warm-toned, with a luminous scan cone and thin white
technical vector overlays, and a monospace caption bar along the bottom.

## Paste this first — the style block

Give this to the model once, then any scene below. Keeping it verbatim across
assets is what makes them look like a set.

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

## Prompt 1 — Hero: it holds position on your aircraft

The main marketing image. **16:9** or **3:4**.

> A fixed-wing UAV in level flight, seen from behind and slightly above, over a
> wide patchwork of farmland and treelines. The aircraft is close enough to read
> as a working airframe rather than a distant speck — a plain unmarked survey
> platform. A luminous pale shaft of light descends from a small downward-facing
> camera under its nose to the ground, widening slightly. Where it meets the
> ground, thin white technical overlays lock on: a crosshair on a field
> junction, a faint ellipse around the footprint, corner brackets framing two
> matched field boundaries, and a dashed line continuing along the flight track.
> Warm sepia duotone, flat overcast light, matte, fine grain. No text, no logos,
> no visible antennas or radio masts on the aircraft.

The "no antennas" clause matters: the whole pitch is that nothing radiates.

## Prompt 2 — Integration: what actually goes in the bay

The image a customer wants most and almost nobody makes. **3:2** or **1:1**.

> A close, slightly overhead view into the open equipment bay of a fixed-wing
> UAV fuselage on a workbench. Inside, a small plain anodised aluminium
> enclosure is bracket-mounted beside existing avionics, with a short ribbon
> cable running to a compact downward-facing camera set into a circular
> aperture in the airframe's underside. Neat cable routing, visible mounting
> screws, honest engineering rather than a product render. Matte grey-brown
> palette, soft even workshop light, shallow depth of field, fine grain. Thin
> white technical overlays: corner brackets around the enclosure and a leader
> line running out to empty space at the frame edge. No text, no logos, no
> brand marks on the hardware.

> ⚠ Keep the enclosure **generic** — plain box, no connectors that imply a
> specific part number, no badge. The delivered form is still unsettled between
> your site ("a software module for open-standard autopilot stacks") and master
> doc v1.2 ("hardware + software, one integrated module"). Until that is
> resolved, a photorealistic image of a specific device is a promise you may
> not want to have made in print.

## Prompt 3 — Terrain match: the mechanism, close up

Explains how it works without a word of copy. **1:1** or **16:9**.

> A near-vertical aerial view straight down onto farmland — irregular field
> polygons, a curving river, a single road cutting diagonally. Rendered as a
> desaturated warm-grey aerial photograph. Over it, thin white technical
> overlays lock onto ground features: four small crosshair markers on field
> corners and the road junction, each ringed by a thin circle, plus corner
> brackets framing the centre. A faint one-pixel grid overlays the whole image,
> slightly offset from the terrain beneath it, as though a reference map were
> being slid into alignment. Matte, flat light, fine grain, no colour beyond
> warm neutral. No text, no numbers, no logos.

## Prompt 4 — GNSS-denied envelope (secondary)

Your site's problem image. Useful on a booth screen; not needed on a customer
one-pager, where the buyer already knows jamming is real. **16:9**.

> A low, flat horizon at dusk. On the left, the dark silhouette of a military
> ground vehicle bristling with antenna masts, in profile. Concentric thin white
> arcs radiate outward from its antennas across the sky, evenly spaced. On the
> right and higher in the frame, the small silhouette of a fixed-wing drone,
> with a luminous pale trapezoid of light descending from it to the ground, a
> thin white crosshair centred inside the beam. The two forms do not touch.
> Near-monochrome warm grey-brown duotone, heavy atmospheric haze, matte, fine
> grain. No text, no logos.

## Working notes

- **Never let the model set type.** The site puts its captions over images
  (`GNSS-DENIED ENVELOPE`, `L1 · L2 · L5`) in the page, in letter-spaced
  uppercase mono, not baked into the photograph. Do the same — generate clean,
  add the caption bar in the layout, and it stays crisp at 300 dpi.
- Show the airframe as **unmarked and generic**. A customer should be able to
  see their own platform in it; a recognisable competitor airframe reads as an
  endorsement you do not have.
- Generate large and downsample. A full-bleed A4 band needs ~2400 px wide.
- Judge candidates at thumbnail size and check each in grayscale. The palette is
  nearly monochrome already, so anything that collapses in mono was leaning on
  the copper, which this style says should be doing almost nothing.
- If a generator balks, swap "military" and "drone" for "survey aircraft" and
  "ground station". The composition carries the meaning, not the vocabulary.

## The brand system these were pulled from

Sampled from the page screenshots, so these are the real values.

| Role | Value |
| --- | --- |
| Paper | `#F8F6F0` (warm off-white; a warmer `#F2EEE5` also appears) |
| Ground | `#1A1411` (warm near-black, not blue-black) |
| Copper on light | `#815837` — eyebrow labels, the live logo dot |
| Copper on dark | `#C7956D` — labels and figures on dark sections |
| Copper fill | `#885530` — the solid CTA button |
| Body text | `#413D39` secondary, `#6D6965` for mono metadata |
| Hairline | `#D2CFCA` on screen; darkened to `#ADA79D` in print so it survives |

**Type roles** — four, each doing one job:
- **Headlines: a serif, sentence case.** Never all-caps.
- **Figures: a light geometric sans.**
- **Body: a neutral sans**, line-height around 1.6–1.7.
- **Every label, source line and piece of metadata: uppercase monospace with
  wide letter-spacing.** The strongest single signature of the brand.
- Section openers are a short rule then a spaced copper mono word.

The flyer approximates the serif with **Newsreader** and the figures with
**Jost** — stand-ins picked by eye from screenshots. Send the font names from
the site's CSS and I will swap in the real ones.
