# 03 — Access & Lifecycle (Joiner / Mover / Leaver)

This is the document that answers your key question:

> "When I fire people, he should lose the connection to our Notion system."

The professional name for this is the **Joiner–Mover–Leaver (JML)** model. The
principle: **you manage the person once, in one place (the Identity Provider),
and every tool follows.** You never grant or revoke access tool-by-tool.

---

## The golden rule

> **Access is tied to the identity, and the identity has one master switch.**

For GIS-Point that master switch is **Google Workspace** (`@gis-point.com`).
Notion is connected to it via **Single Sign-On (SSO)**, so:

- To use Notion, a person authenticates through their Google account.
- Disable the Google account → they can no longer authenticate to Notion →
  they are out. Along with Gmail, Drive, Calendar and any other SSO tool.

That is the whole mechanism. Everything below is how to set it up cleanly and
what to do in the manual gap until full automation is in place.

---

## How access is granted — by group, not by person

Never share a page with "Ivan" directly. Share it with a **group**, and put
Ivan in the group. When Ivan moves or leaves, you change group membership and
all his access changes with it.

**Groups to create in Google Workspace** (these are the departments):

```
all-staff@gis-point.com          → Company Home (everyone)
field-team@gis-point.com         → Geodesy / GIS / Field teamspace
sales@gis-point.com              → Sales & Marketing teamspace
delivery@gis-point.com           → Delivery / PM teamspace
hr@gis-point.com                 → HR teamspace (restricted)
finance@gis-point.com            → Finance teamspace (restricted)
it-security@gis-point.com        → IT & Security teamspace (restricted)
leadership@gis-point.com         → visibility across restricted spaces
```

In Notion, each **teamspace's membership = the matching group**. Access is now
a property of *which groups a person is in*, which is managed in one screen in
the Google Admin console.

**Principle of least privilege:** a person is in `all-staff` + the groups their
role actually needs. Nothing more.

---

## 🟢 JOINER — a new employee starts

1. **IT/HR creates the Google Workspace account** (`name@gis-point.com`).
2. **Add them to the right groups** for their department and role.
3. That is it for the hub — SSO + group membership means they log into Notion
   and automatically see Company Home + their department teamspaces.
4. Send them the **onboarding page** (lives in Company Home): first-day links,
   the "Where do I find…?" index, and the handbook.

> With SSO + groups, onboarding to the knowledge hub is **zero extra clicks in
> Notion** — it is a side effect of creating the person correctly in Google.

---

## 🟡 MOVER — an employee changes department or role

1. **Update their group membership** in Google Admin: remove the old
   department group, add the new one.
2. Access to the old teamspace disappears; access to the new one appears.
3. Reassign any pages they **owned** (see the Owner property in doc 02) to
   someone in their old team, so nothing becomes orphaned.

No Notion surgery. You changed one thing in one place.

---

## 🔴 LEAVER — an employee is fired or resigns (the critical path)

This is the moment everything is designed for. Run it as a **checklist** so a
step is never forgotten. Order matters — for an involuntary termination, cut
access *first*, communicate *after*.

### Immediate (minute zero — the moment the decision is effective)

1. **Suspend the Google Workspace account.** One action. This instantly:
   - blocks Notion login (SSO fails — no valid Google session),
   - blocks Gmail, Drive, Calendar, and every other SSO-connected tool.
   - → **The person has lost the connection to the Notion system.**
2. **Remove them from all Google groups** (belt-and-suspenders: kills group-
   based sharing even for any non-SSO tool).
3. If you have **SCIM** (see below), this deprovision flows automatically and
   *removes their Notion membership entirely*, not just their login.

### Same day (housekeeping so knowledge is not lost)

4. **Transfer document ownership.** Any Notion page or database where they were
   *Owner* → reassign to their manager or successor. (Use the master Documents
   database, filter Owner = leaver.)
5. **Transfer Google Drive files** they owned to the department/manager.
6. **Revoke any direct/guest shares** — audit for pages shared to them
   personally rather than via a group (there should be none if you followed the
   group rule, but verify).
7. **Rotate any shared credentials** they knew (shared tool logins, API keys).
8. **Reclaim the Notion seat** (so you are not paying for a departed user) and,
   per your retention policy, eventually delete or archive the account.

### Verify

9. **Confirm lockout:** attempt is denied. Check the Notion members list — they
   are gone or deactivated. Check Google Admin — account suspended.
10. **Log it** in the IT & Security teamspace offboarding log (date, who,
    who executed, verified by).

> The offboarding checklist lives as a **template page** in the IT & Security
> teamspace so it can be duplicated and ticked off for every departure.

---

## Automation levels — pick where you start

| Level | Setup | What firing looks like | Good for |
|-------|-------|------------------------|----------|
| **A. Manual** | Notion Business, invite by email | Suspend Google account **and** manually remove from Notion members list. Run the checklist. | Smallest teams, day one |
| **B. SSO** ✅ start here | Notion Enterprise + Google SAML | Suspend Google account → login blocked automatically. Run the checklist for cleanup. | Most companies your size |
| **C. SSO + SCIM** | Notion Enterprise + IdP (Okta / JumpCloud / Rippling) syncing to Notion | Disable person in IdP → Notion membership **auto-removed**. Checklist is just verification. | When you scale / need audit-grade control |

**Recommendation:** implement **Level B** now (Google SAML SSO into Notion) and
keep the manual checklist as the safety net. Move to **Level C** when headcount
or compliance needs justify an IdP.

> ⚠️ Honest caveat: full "click one button, all access gone" automation
> (Level C) requires the **Enterprise plan + a real IdP**. Until then, the
> *discipline of the offboarding checklist* is what guarantees the requirement.
> The checklist is not optional — it is the control.

---

## What NOT to do (anti-patterns that break the model)

- ❌ Sharing pages with individuals instead of groups → access gets left behind.
- ❌ Letting people use personal Gmail accounts as guests → no master switch.
- ❌ Emailing documents as attachments → copies escape the hub and outlive access.
- ❌ Shared logins ("the team password") → suspending one account does nothing.
- ❌ Managing access inside Notion by hand when you have SSO available.
