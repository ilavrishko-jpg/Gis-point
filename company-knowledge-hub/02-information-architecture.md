# 02 — Information Architecture

How the content is organized so that every department has a clear home and every
employee finds "their" documentation fast.

## Top-level structure (Notion teamspaces)

A **teamspace** in Notion is a department-sized container with its own
membership and permissions. Use one per department, plus shared spaces.

```
🏠 Company Home                        ← everyone. The front door.
   ├─ Announcements & latest changes
   ├─ Company handbook (mission, values, org chart)
   ├─ Where do I find…? (index / map of the whole hub)
   └─ Who to ask (owners directory)

🌍 Geodesy / GIS / Field Operations    ← field & GIS engineers
   ├─ SOPs (survey procedures, equipment, safety)
   ├─ Standards & specifications
   ├─ Project workspace (per-project docs, links to Drive data)
   └─ Templates

💼 Sales & Marketing
   ├─ Offers, pricing rules, proposal templates
   ├─ CRM playbook, competitor notes
   └─ Brand & marketing assets

🧭 Delivery / Project Management
   ├─ Project lifecycle, checklists, RACI
   └─ Client-facing templates

👥 HR & People              (restricted — HR + leadership)
   ├─ Policies (leave, conduct, safety)
   ├─ Onboarding & offboarding checklists
   └─ Org & roles

💰 Finance & Legal          (restricted — Finance + leadership)
   ├─ Expense & procurement rules
   └─ Contract templates

🔐 IT & Security            (restricted — IT + leadership)
   ├─ Access management runbook (JML — see doc 03)
   ├─ Tool inventory & accounts
   └─ Security policy
```

**Rules of thumb**
- One teamspace per department that owns its own content.
- "Company Home" is the only space *everyone* sees; it is the map to
  everything else.
- Restricted teamspaces (HR, Finance, IT/Security) are visible only to their
  members — least privilege by default.

---

## The page model — every important page looks the same

Consistency is what makes it feel like a *system* and not a pile of docs. Every
canonical page starts with a **metadata block** (a Notion callout or a database
row) so the reader instantly knows if they can trust it.

```
┌──────────────────────────────────────────────────────────┐
│ 📄  Field Survey Safety Procedure                          │
│                                                            │
│  Owner:        Field Operations Lead                       │
│  Status:       ✅ Approved        (Draft / Approved / Deprecated)
│  Version:      2.1                                         │
│  Last review:  2026-06-01                                  │
│  Next review:  2026-12-01                                  │
│  Audience:     Field team, new hires                       │
└──────────────────────────────────────────────────────────┘

  ## Purpose
  ## Scope
  ## Procedure
  ## Related documents (links, not copies)
  ## Change log
```

This metadata is what powers governance (doc 05): you can build a Notion
database view of "all pages whose Next review date is in the past" and see, at a
glance, everything that has gone stale.

---

## The "single source of truth" content database

Behind the teamspaces, keep a master **Documents database** with these
properties. Every important page is an entry.

| Property | Type | Why |
|----------|------|-----|
| Title | Text | — |
| Department | Select | Which teamspace owns it |
| Type | Select | Policy / SOP / Template / Handbook / Project |
| Status | Select | Draft / Approved / Deprecated |
| Owner | Person | Accountable human |
| Version | Number | Track revisions |
| Last reviewed | Date | Freshness |
| Next review | Date | Drives the "stale docs" alert |
| Audience | Multi-select | Who it is for |

With this one database you get automatic views:
- **"Latest approved rules for my department"** — filter Status = Approved,
  Department = mine. This is literally the "download the last rules" feature.
- **"Needs review"** — Next review date is in the past.
- **"Deprecated — do not use"** — so old rules are visibly retired, not deleted
  and forgotten.

---

## Naming & findability

- **Naming convention:** `[Department] — [Topic] — [Doc type]`
  e.g. `Field — Drone Mapping — SOP`.
- **Tags/keywords** on every page so search works in both Ukrainian and English.
- **One index page** ("Where do I find…?") on Company Home that links to each
  department's landing page. New employees start here.
- Prefer **linking** over duplicating. If two departments need the same rule,
  it lives in one place and both link to it.
