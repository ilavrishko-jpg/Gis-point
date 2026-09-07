# One prompt for the whole flyer

Two ways to use it, and it matters which:

- **To GPT / Claude as a language model** ("build this as a single A4 HTML page,
  794×1123 px at 96 px/inch, print-ready") — you get real, correct, selectable
  text. This is the one to use if you want something printable.
- **To an image model** (GPT Image, Nano Banana) — you get a look, not a
  document. Every number and the phone number will come out wrong. Use it to
  explore art direction, never to print.

---

## The prompt

> Design a print-ready A4 one-page flyer, portrait, 794 × 1123 px authored at
> 96 px per inch, for a defence-exhibition handout. The audience is UAV
> manufacturers and integrators who will install this product on their own
> airframes — not investors. It must answer an installer's questions: what goes
> on the aircraft, what it gives back, what autopilot it talks to, what envelope
> it holds.
>
> **Palette, exactly.** Paper `#F8F6F0`. Warm near-black `#1A1411` — warm, never
> blue-black. Copper `#815837` for labels on light. Copper `#C7956D` for
> anything on dark. Solid copper `#885530` for the one button. Body text
> `#413D39`; metadata grey `#6D6965`; hairline rules `#ADA79D`. Nothing else.
> The page must still read in grayscale.
>
> **Type, four roles, each doing one job.** Headlines in a serif, **sentence
> case, never all-caps**. Large figures in a light geometric sans. Body in a
> neutral sans at 1.6 line-height. Every label, unit and source line in
> uppercase monospace with wide letter-spacing — this is the strongest
> signature of the brand. Section openers are a short 46 px rule followed by a
> spaced copper monospace word. No text below 12 px anywhere.
>
> **Layout, top to bottom.**
> 1. Full-bleed dark bar, 60 px: a 3×3 dot-grid mark whose bottom-right dot is
>    copper, then `FLY BY` in wide-tracked caps. Right-aligned:
>    `UNITED KINGDOM · UKRAINE`.
> 2. Hero. Opener `—— FOR UAV MANUFACTURERS AND INTEGRATORS`. Headline, serif,
>    48 px, two lines: "When GPS dies, / the drone flies on." Then one
>    paragraph: "A passive downward camera matches terrain against ordinary
>    satellite imagery to hold absolute position on your airframe — GPS excluded
>    from the solution."
> 3. Proof band on the paper colour, hairline above, opener `—— BATTLE-TESTED`,
>    then three columns. Each column: a copper monospace label, one large
>    figure, a one-sentence caption, and a monospace footer.
>    - `FIELD TEST` · **~17 m** · "Position held in flight with GPS excluded
>      from the solution." · `FLIGHT TRIAL`
>    - `VS RTK TRUTH` · **3.34 m** · "Median error on orthophoto — 100% of
>      frames localised." · `~0.8 S / FRAME`
>    - `REAL FLIGHT DATA` · **13.2 m** · "Median across six datasets against
>      onboard GPS reference." · `110–280 M AGL`
>    Below a hairline, one monospace line: "Inertial drift 306 m → 7.5 m, zero
>    GPS · best fix 1.8 m · daylight · night mode in qualification".
> 4. A wide vector diagram band, line art only, reading left to right: a
>    satellite struck through with a copper X captioned `GNSS JAMMED`; a small
>    fixed-wing drone above a reference map, its dashed field of view falling
>    across the map, copper crosshair markers locking onto field features,
>    captioned `PASSIVE TERRAIN MATCH`; a copper arrow into a dark chip reading
>    `POSITION / + CONFIDENCE`, captioned `ABSOLUTE POSITION`.
> 5. Hairline, opener `—— ON YOUR AIRFRAME`, then eight items in a 4 × 2 grid,
>    each a copper monospace label over one sentence:
>    `ZERO RF` — Passive optics. Nothing for EW to detect or target.
>    `NO SURVEY` — Ordinary satellite imagery. It need not be current.
>    `A LAYER` — Your autopilot stays the arbiter of the solution.
>    `NO NEW BUTTON` — Crew workflow unchanged. Nothing new to train.
>    `INPUT` — Downward-facing camera plus onboard compute.
>    `OUTPUT` — Absolute position and confidence — honest "no fix".
>    `AUTOPILOT` — Integrates with open-standard autopilot stacks.
>    `ENVELOPE` — 110–280 m AGL, daylight. Night in qualification.
> 6. Hairline, then one quiet monospace line: `GIS-POINT LTD · UK No. 15059660 ·
>    ENGINEERED AND FIELD-VALIDATED IN UKRAINE`.
> 7. Full-bleed dark footer. Left: a solid copper button reading
>    `EVALUATE IT ON ONE AIRFRAME`; under it "Ievgen Lavrishko · CEO ·
>    i.lavrishko@gis-point.com · +44 7304 286445"; under that, monospace,
>    `OEM DESIGN-IN · PER-PLATFORM LICENSING · NDA ON REQUEST`. Right: an 82 px
>    square placeholder for a QR code with `flyby.gis-point.com` in copper
>    beneath it.
>
> **Discipline.** One dominant element — the headline — and everything else
> clearly subordinate. Generous whitespace; cut copy before shrinking type. Flat
> colour and vector line art only: no photographs, no gradients, no glow, no
> rounded-corner cards, no drop shadows, no emoji, no icon clutter. Dark areas
> confined to the header and footer bars so the sheet does not flood with ink.
> Leave the QR box empty — do not invent a QR code.

---

## If you point an image model at it

Add this line, and treat what comes back as a mood board:

> Render as a flat vector design comp. Text may be indicative. Do not attempt
> photographic elements.

Then take the composition you like back into the real layout, where the type is
actually correct. The print-ready version already lives in `Main.dc.html`.
