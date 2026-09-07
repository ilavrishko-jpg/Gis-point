# FLY BY — image-generation prompts

For Nano Banana (Gemini image) or GPT Image. Written to match the flyer's
palette so generated art drops straight into the A4 layout.

**Read first.** Image models still garble small text. Never let a generator set
the headline, the accuracy figures, the phone number or the QR — those stay as
type in `Main.dc.html`. Every prompt below ends with "no text" on purpose:
generate the *picture*, keep the *words* in the layout.

**Palette to keep consistent across all three**
`#10151C` near-black · `#143A5E` deep navy · `#E0A22B` amber · `#F4F2ED` warm off-white

---

## 1 · Hero band for the flyer (16:9, or 3:1 crop)

> A wide aerial view looking down at a 40-degree angle over a patchwork of
> Eastern European farmland and treelines in flat overcast light. In the upper
> third, the small dark silhouette of a fixed-wing reconnaissance drone, seen
> from behind and above, tiny against the landscape. Over the terrain, a precise
> cartographic overlay: thin amber survey lines, small amber crosshair ticks
> locking onto field boundaries and road junctions, a few faint amber corner
> brackets framing matched features — like a machine recognising ground it has
> seen before. Colour palette strictly deep navy #143A5E shadows, warm
> off-white #F4F2ED highlights, amber #E0A22B for every overlay element. Matte,
> muted, high contrast, fine film grain. Editorial defence-technology
> photography crossed with a technical survey diagram. No text, no numbers, no
> logos, no watermarks, no lens flare, no HUD clutter, no explosions.

**Avoid list if the tool takes one:** text, letters, numbers, watermark, logo,
signature, lens flare, neon glow, sci-fi hologram, weapons, fire, smoke, gore,
flags, people, heavy vignette, oversaturated blue.

---

## 2 · Standalone promo poster (3:4 or A4)

Use when you want a whole visual for social, a booth screen, or a slide — not
the print flyer.

> A vertical poster composition, top two-thirds a downward aerial view of
> farmland and river bends under flat grey light, rendered in deep navy
> #143A5E and warm off-white #F4F2ED. A thin amber #E0A22B cartographic grid
> lies precisely over the terrain, with small amber crosshair markers pinned to
> recognisable ground features. In the top left, a satellite icon drawn as a
> simple amber line symbol with a clean amber X struck through it. Bottom third
> is a solid flat near-black #10151C band, completely empty, reserved for
> typography. Flat vector-and-photography hybrid, matte, restrained, high
> contrast, no gradients on the flat colour areas. No text anywhere, no logos,
> no watermarks.

The empty black band is deliberate — set the headline and contact details over
it in your own layout, where you control the type.

---

## 3 · Square variant for LinkedIn / booth screen (1:1)

> A square, near-symmetrical composition. Centre: a small fixed-wing drone
> silhouette in flat amber #E0A22B seen from directly above, on a deep navy
> #143A5E ground. Radiating out from it, concentric thin off-white contour
> lines like a topographic map, with a scatter of small amber tick marks where
> the contours cross. The outer edge fades to near-black #10151C. Precise,
> instrument-panel feel, flat vector illustration, matte, no gradients, no
> glow. No text, no numbers, no logos, no watermarks.

---

## Working notes

- Generate at the largest size the tool offers, then downsample. For the flyer
  the band needs ~2400 px wide to hold up at 300 dpi across A4.
- Ask for three or four variations and pick on **silhouette legibility at
  thumbnail size** — an exhibition handout is judged from two metres away.
- Check every candidate in grayscale before committing. If the amber overlay
  disappears in mono, the print is weaker than the screen suggests.
- If a generator refuses the brief, drop the word "drone" for "small
  fixed-wing survey aircraft" and drop "defence" entirely — the composition is
  what matters, not the vocabulary.
