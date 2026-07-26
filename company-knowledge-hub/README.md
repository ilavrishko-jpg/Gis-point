# GIS-Point Company Knowledge Hub — Design System

**One source of truth for the whole company.** Every department publishes its
latest rules, documentation, templates and processes in one place. Every
employee connects and sees exactly what applies to their role. When someone
leaves the company, their access disappears automatically.

This folder is the **design blueprint** for that system — what to build, how it
works, and how to run it. It is not the hub itself (the hub lives in Notion);
it is the plan and the governance rules for the hub.

---

## The idea in one picture

```
                         ┌───────────────────────────┐
                         │   Identity Provider (IdP)  │
                         │   Google Workspace         │  ← the "master switch"
                         │   (gis-point.com accounts) │     for every person
                         └────────────┬──────────────┘
                                      │ SSO login + auto provisioning
                                      │ (create / update / DISABLE user)
                                      ▼
                         ┌───────────────────────────┐
                         │   Notion  =  Knowledge Hub │
                         │   (Single Source of Truth) │
                         └────────────┬──────────────┘
             ┌────────────┬───────────┼───────────┬────────────┐
             ▼            ▼           ▼            ▼            ▼
        Company      Geodesy /     Sales /      HR &        IT &
         Home        GIS / Field   Marketing   Finance     Security
        (everyone)   teamspace     teamspace   (restricted) teamspace
```

- **The IdP is the master switch.** You hire a person → you create their
  Google account → they get into the hub. You fire a person → you disable that
  one Google account → they are locked out of the hub (and email, drive,
  everything) in seconds. You never chase access tool-by-tool.
- **Notion is the library.** Structured by department, with one canonical page
  per topic, so "the latest rules" is always the live page — never a copy
  floating in someone's email or laptop.
- **Access follows the person's role**, not their name. Groups map to
  departments; membership decides what each person sees.

---

## What "the latest documentation, always" really means (the SSOT rule)

The whole value collapses if people keep downloading copies. The core rule:

> **There is exactly one canonical page for each topic. People link to it,
> they do not copy it.** The page is the latest version *by definition*,
> because it is the only version.

"Download the last rules" then means: open the one live page (or export it to
PDF on demand). Nobody maintains three versions of the safety policy in three
inboxes.

---

## Read these in order

| # | Document | What it answers |
|---|----------|-----------------|
| 1 | [`01-architecture.md`](./01-architecture.md) | How the pieces fit together; tool choices |
| 2 | [`02-information-architecture.md`](./02-information-architecture.md) | How content is organized by department; the page/metadata model |
| 3 | [`03-access-and-lifecycle.md`](./03-access-and-lifecycle.md) | **Hiring → access, firing → access removed.** SSO, SCIM, the Joiner/Mover/Leaver process |
| 4 | [`04-visual-design-system.md`](./04-visual-design-system.md) | Page templates, naming, colors, so everything looks consistent |
| 5 | [`05-governance.md`](./05-governance.md) | Who owns what, review cadence, keeping docs fresh |
| 6 | [`06-implementation-roadmap.md`](./06-implementation-roadmap.md) | A 6-week plan to stand it up |

---

## The two meanings of "design system" (so we're aligned)

You asked for a "design system". That phrase covers two layers here, and this
blueprint gives you both:

1. **System design** — the architecture, the information structure, and the
   access rules (documents 1, 2, 3, 5). This is the important part.
2. **Visual design system** — the templates, fonts, colors and naming that make
   every department's pages look and feel consistent (document 4).
