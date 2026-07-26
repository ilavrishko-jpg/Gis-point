# 04 — Visual Design System

This is the "design system" in the visual sense: the small set of templates,
naming rules and styling that make every department's pages feel like one
product, not ten different personal wikis. Keep it lightweight — the goal is
consistency, not decoration.

## 1. Page templates (the core of the visual system)

Create these as **Notion templates** so anyone can spin up a new page that is
already correctly structured. Each starts with the metadata block from doc 02.

| Template | Used for | Key sections |
|----------|----------|--------------|
| **Policy** | Company rules (leave, safety, conduct) | Purpose · Scope · Policy · Exceptions · Change log |
| **SOP / Procedure** | Step-by-step operational docs | Purpose · When to use · Steps · Checklist · Related |
| **Handbook page** | Reference / "how we do things" | Overview · Details · FAQ · Links |
| **Project doc** | Per-project workspace | Summary · Team (RACI) · Links to Drive data · Decisions · Log |
| **Meeting notes** | Decisions & actions | Date · Attendees · Decisions · Action items (owner + date) |
| **Template of templates** | Onboarding & offboarding checklists | Ordered checklist items |

**Rule:** a new important page is *always* started from a template, never blank.

## 2. Metadata callout (top of every canonical page)

A colored callout so trust signals are visible before reading a word:

```
🟩  Approved · v2.1 · Owner: Field Lead · Reviewed 2026-06 · Next 2026-12
```

Status colors (use consistently everywhere):

| Status | Color | Meaning |
|--------|-------|---------|
| ✅ Approved | Green | Trust it, it is current |
| 📝 Draft | Yellow | In progress, do not rely on it yet |
| ⛔ Deprecated | Red/Gray | Retired — do not use |

## 3. Naming conventions

- **Pages:** `[Department] — [Topic] — [Type]`
  e.g. `Sales — Proposal — Template`, `Field — Drone Mapping — SOP`.
- **Teamspaces:** department name + one emoji icon (🌍 💼 👥 🔐 …).
- **Templates:** prefix with `TEMPLATE —` so they are obvious.
- Keep names in one primary language for search; add keyword tags in the other
  (UA/EN) so bilingual search works.

## 4. Iconography & color per department

Give each teamspace one icon and one accent color, used on its landing page and
covers, so people orient by color:

| Department | Icon | Accent |
|------------|------|--------|
| Company Home | 🏠 | Neutral / brand |
| Geodesy / GIS / Field | 🌍 | Green |
| Sales & Marketing | 💼 | Blue |
| Delivery / PM | 🧭 | Teal |
| HR & People | 👥 | Purple |
| Finance & Legal | 💰 | Amber |
| IT & Security | 🔐 | Red |

## 5. Brand basics (keep it simple)

- One heading style, one body font (Notion defaults are fine — do not fight the
  tool).
- GIS-Point logo on Company Home and in exported PDFs.
- A short one-page **style guide** page in Company Home documenting these rules,
  so the system stays consistent as new people add pages.

## 6. Writing style

- Short sentences. Action-first for procedures ("Do X", not "X should be done").
- Every procedure ends in a **checklist** so it can be executed, not just read.
- Link to the canonical source; never paste a copy of another page's content.
