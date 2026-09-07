# FLY BY — exhibition one-pager

Print-ready A4 flyer handed to UAV OEM engineers and integrators at a defence
exhibition. Source files here re-seed the design canvas; edit these, never the
generated `flyby-exhibition-flyer.html`.

| File | Role |
| --- | --- |
| `Main.dc.html` | The deliverable — A4 front, 794 × 1123 px @ 96 px/inch |
| `DirectionB.dc.html` | Alternate direction sketch — instrument panel |
| `DirectionC.dc.html` | Alternate direction sketch — diagram-led |
| `canvas.json` | Canvas layout, artboard titles, sticky notes |
| `flyby-exhibition-flyer.html` | Generated canvas — do not hand-edit |

## Brief

**Audience.** UAV manufacturers and integrators who will install FLY BY on
their own airframes. **Not investors.** The page has to answer an installer's
questions — what goes on the aircraft, what it gives back, what autopilot it
talks to, what envelope it holds — not size a market.

**Job.** Stop an engineer in three seconds, prove the numbers in thirty, and
get one airframe committed to an evaluation.

**One thing to remember.** FLY BY holds absolute position when GPS is gone,
passively, as a layer inside the OEM's existing stack.

## Content decisions

- **Headline** — "WHEN GPS DIES, THE DRONE FLIES ON." Five words, ~78 px, reads
  across an aisle.
- **Proof block** — battle-tested framing, requested by the CEO, carried on the
  three measured figures so a technical reader still gets something concrete:
  13.2 m median vs onboard GPS across six real flight datasets (112–279 m AGL);
  3.34 m median vs RTK truth on orthophoto with 100% of frames localised;
  inertial drift collapsed from 306 m to 7.5 m by the vision layer with zero GPS.
  Small print carries best fix 1.8 m, ~0.8 s per frame, day conditions.
- **"A layer, not a system"** is kept as a named pillar. It is the line that
  stops an OEM hearing "replace your autopilot", which reads as a threat.
- **UK–UA band** — GIS-POINT LTD, UK No. 15059660; engineering and flight
  validation in Ukraine; 46,000+ GNSS jamming events recorded in conflict zones
  in 2024, growing ~300% year on year; 45+ combined years in the domain.
- **Deliberately omitted** — pricing (product form is still an open CEO/CTO
  decision), the ≤5 m CEP target (a target, not a result), and the third-party
  51.95 m / 564 km benchmark (not our result; never printable as ours).

## Print spec

- A4 portrait, authored at 96 px/inch: 794 × 1123 px.
- Export PDF from the canvas toolbar; send to the printer at 300 dpi and let
  the print shop add 3 mm bleed.
- Body copy holds at 13 px and above for labels, 16 px for reading copy.
- Palette is three colours — paper `#F4F2ED`, ink `#10151C`, deep blue
  `#143A5E`, amber `#E0A22B` — and survives grayscale.
- Type: Saira Condensed (display), IBM Plex Sans (body), IBM Plex Mono (data).
  PDF export falls back to Arial Narrow / Helvetica / Consolas, so headlines are
  set with slack.

## Before it goes to print

- [ ] Replace the `[QR CODE]` placeholder in the footer — point it at a
      booth-specific landing page so scans are countable.
- [ ] Confirm the CEO mobile number and whether a `defence@gis-point.com`
      shared inbox should replace the personal address.
- [ ] Decide whether an OEM MoU or LOI can be named once signatures allow it.
