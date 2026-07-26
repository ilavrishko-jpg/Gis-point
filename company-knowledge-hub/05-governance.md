# 05 — Governance

A knowledge hub dies when nobody owns it and pages go stale. Governance is the
set of light rules that keep "the latest documentation" actually the latest.

## Roles

| Role | Who | Responsibility |
|------|-----|----------------|
| **Hub Admin** | IT/Ops (1–2 people) | Owns teamspace structure, SSO, access groups, the JML process |
| **Space Owner** | Each department lead | Owns their teamspace: structure, quality, who is a member |
| **Page Owner** | Named on each page | Accountable that *this page* is correct and reviewed on time |
| **Editor** | Team members | Can edit within their department |
| **Reader** | Everyone else | Read-only where appropriate |

Every canonical page has exactly **one** Page Owner (a person, not a team).

## The single-source-of-truth rules

1. **One canonical page per topic.** If it exists twice, one is wrong.
2. **Link, don't copy.** Reuse by linking to the source page.
3. **Approved is the default trust level.** Draft and Deprecated are clearly
   marked (doc 04 colors).
4. **Deprecate, don't silently delete.** Retired rules are marked ⛔ and kept
   for history, so people who bookmarked them see they are retired.

## Review cadence — how docs stay fresh

- Every page has a **Next review** date (doc 02 metadata).
- The master Documents database has a saved view **"Needs review"** =
  `Next review < today`.
- **Monthly**, each Space Owner clears their department's "Needs review" list:
  re-approve (bump the date), update, or deprecate.
- **Quarterly**, the Hub Admin reviews the whole hub health: stale count,
  orphaned pages (owner left), access audit.

## Change process for important rules

For policies and SOPs that people rely on:

1. Author edits a **Draft** copy (or the page is set to Draft status).
2. Space Owner reviews and sets status to **Approved**, bumps **Version** and
   **Last reviewed**.
3. Significant changes are announced on **Company Home → Announcements**.
4. The **Change log** section at the bottom of the page records what changed.

## Access governance (ties back to doc 03)

- Access is always via **groups**, never per-person shares.
- **Quarterly access review:** Hub Admin exports the member list of each
  restricted teamspace (HR, Finance, IT/Security) and confirms every member
  still needs it. Remove anyone who moved on.
- **Offboarding log:** every leaver is recorded (who, date, executed by,
  verified). This is your audit trail if anyone asks "did we cut their access?".

## Metrics worth watching (optional, lightweight)

- % of pages Approved and within review date (freshness).
- Number of orphaned pages (owner no longer employed) — target zero.
- Time from "person fired" to "access confirmed removed" — target: minutes.
