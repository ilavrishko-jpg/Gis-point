---
name: gis-point-capabilities
description: Use when evaluating whether GIS-Point can build or deliver a software capability for a prospect or client — answering "can we do X", "have we built Y before", "what's our experience with Z", assessing an inbound customer request or RFP for fit, scoping a lead, or drafting a first-pass reply — OR when writing marketing copy about GIS-Point's apps: a product description, one-liner, elevator pitch, feature highlights, case-study blurb, or website/portfolio copy for a project. Covers GIS-Point's work across geospatial/mapping, environmental monitoring, real estate & land, healthcare, education, fitness, fintech, telecom, AI/computer-vision, 3D/LiDAR, and drone/UAV.
---

# GIS-Point Capability Finder

## Overview

This skill lets the marketing & lead-generation team check a customer request against
GIS-Point's real portfolio and answer, in plain language: **can we do this, how well,
and what proves it?** It also **writes marketing copy** about our apps — product
descriptions, one-liners, and pitches — from the same catalog (see "Marketing
descriptions & pitches" below).

The source of truth is `catalog.yaml` — one entry per project/capability, with what it
is, what it's for, the tech stack (FE / BE / DevOps / DB), demonstrable capabilities,
and industry. Human-readable summaries per industry live in `reference/`.

**You are talking to non-technical marketing/sales people.** Lead with the business
answer, keep jargon minimal, and never expose client/customer names — the catalog is
anonymized on purpose.

## When to use

- "Can we build \<something\> for a \<type of\> client?"
- "Have we done \<capability / industry\> before?"
- "A prospect wants X — are we a fit? What do we show them?"
- Reviewing an inbound inquiry, brief, or RFP for feasibility.
- Drafting a first reply to a lead.
- "Write a marketing description / one-liner / elevator pitch for \<app\>."
- "Give me website or portfolio copy / a case-study blurb for \<project\>."

## How to answer (the workflow)

1. **Read `catalog.yaml`** (and the relevant `reference/<industry>.md` if it helps).
   Do not answer from memory — always ground the answer in the catalog.
2. **Match the request** to capabilities, industries, and tech in the catalog.
   Look for direct matches first, then adjacent/transferable experience.
3. **Give a fit verdict** using this scale:
   - **Strong fit** — we've shipped this or something very close. Name the proof project(s).
   - **Adjacent fit** — we've done closely related work; some new build required.
   - **Stretch** — we have relevant pieces (team/stack) but no direct precedent.
   - **Gap** — no evidence in the portfolio; be honest.
4. **Cite evidence**: the project(s) that prove it, in plain language + the stack that
   makes it credible. (Use the project's `name`/description, never a client name.)
5. **State honest gaps**: what's new, risky, or missing for this specific request.
6. **Draft a first-pass reply** (only when asked, or when scoping a lead): a short,
   confident, non-technical paragraph the salesperson can edit and send. No client names,
   no over-promising, no invented specifics.

## Output shape

```
Verdict: Strong fit / Adjacent fit / Stretch / Gap
Why: 1–2 plain sentences.
Proof: <project(s)> — <what they demonstrate> (stack: FE/BE/DB as relevant).
Gaps / watch-outs: <honest caveats>.
Suggested reply (if asked): <short editable paragraph>.
```

## Marketing descriptions & pitches

When asked to describe or promote an app (rather than assess fit), pull that entry from
`catalog.yaml` and turn it into polished, benefit-led marketing copy. The same rules apply:
no client names, and be honest about status — for `status: scoped` say "designed /
architected" and frame it as "we can build", never imply it is live.

Produce whichever format is asked for (default: the short description + feature highlights):

- **One-liner** — a single punchy sentence: what it is + who it's for + the payoff.
- **Short description** — 2–4 sentences: the problem, what the app does, the benefit.
- **Feature highlights** — 4–8 benefit-led bullets. Translate `capabilities` into outcomes,
  not raw tech jargon (e.g. "explore huge 3D laser scans in any browser — no desktop
  software" rather than "Potree WebGL point-cloud viewer").
- **Tech credibility line** (optional, for technical buyers) — one sentence naming the
  notable stack/standards from the entry.
- **Target audience / use cases** — who buys it and why.
- **Differentiators** — what sets it apart, drawn from the entry (e.g. self-hosted, no
  per-seat licensing, offline-capable, multi-tenant, open standards).

Stay truthful to the catalog: never invent metrics, customer names, or features that
aren't in the entry. If the person doesn't name an app, ask which one (or offer the
closest matches from the catalog).

### Marketing output shape

```
<App name> — <one-liner>

<short description, 2–4 sentences>

Key features:
• <benefit bullet>  … (4–8)

Best for: <audience / use cases>
Why us / what's different: <differentiators>
Status: shipped / designed (scoped) / experimental
```

## Rules

- **Ground every claim in `catalog.yaml`.** If it's not in the catalog, say so —
  don't infer capabilities we can't back up.
- **Never reveal client/customer/company names.** Describe capability-first
  (e.g. "a municipal client", "a telecom carrier"). Names are for the salesperson
  to disclose live.
- **`repos`, `id`, and internal codenames are INTERNAL-ONLY.** They may contain client
  or org identifiers. Use them to locate evidence, but NEVER put a `repos` value, an
  `id`, or a raw project codename into a customer-facing draft reply. Refer to proof
  work by its plain capability, not its folder name.
- **Tag every cited proof with its status** — (shipped) for `status: active`,
  (scoped/architected) for `status: scoped`, (experimental) for `status: experimental`,
  (open-source integration) for `type: oss-integration`. Non-technical sellers must not
  mistake a scoped RFP for a delivered product.
- **Be honest about gaps.** A confident "we haven't done that yet, but here's the
  closest thing" is more useful than overselling.
- **Distinguish shipped products from scoped work.** Entries with `status: scoped`
  are things we've architected/estimated but not necessarily shipped — present them
  as experience, not as delivered products.
- **Distinguish our builds from OSS integrations.** `type: oss-integration` means we
  integrate/deploy that open-source tool, not that we wrote it.

## Reference files

- `catalog.yaml` — structured source of truth (every project + capability). **Read this first.**
- `reference/industries.md` — what we do per business vertical, with the products in each.
- `reference/capability-index.md` — reverse lookup: "have we done X?" → the projects that prove it.
- `reference/tech-stack.md` — the full FE / BE / DevOps / DB technology map.

Fast path for a capability question: skim `reference/capability-index.md` to find candidate
projects, then read their full entries in `catalog.yaml` for the verdict and evidence.
