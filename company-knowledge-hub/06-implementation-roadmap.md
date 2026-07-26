# 06 — Implementation Roadmap

A realistic 6-week plan to go from nothing to a working, governed hub. Adjust
the pace to your team size — a small company can compress this.

## Phase 0 — Decide (before you build)

- [ ] Confirm tool: **Notion** (recommended) + **Google Workspace** as identity.
- [ ] Choose the automation level from doc 03 (start at **Level B: Google SAML
      SSO**; note whether you will need the Enterprise plan).
- [ ] Name a **Hub Admin** (owner of the whole thing) and one **Space Owner**
      per department.

## Phase 1 — Identity & access backbone (Week 1)

*Do this first. Structure on top of a shaky access model is wasted work.*

- [ ] Create Google **groups** for each department (doc 03 list).
- [ ] Put every current employee into their correct groups.
- [ ] Set up **SAML SSO** between Google Workspace and Notion (Enterprise plan).
- [ ] Test: a test user logs into Notion via Google; suspend the test account;
      confirm they are locked out. **This proves the firing requirement works.**

## Phase 2 — Structure (Week 2)

- [ ] Create the **teamspaces** (doc 02) and set each one's membership to the
      matching Google group.
- [ ] Build **Company Home** with: handbook, announcements, and the
      "Where do I find…?" index.
- [ ] Create the master **Documents database** (doc 02 properties) with the
      saved views: "Approved by department", "Needs review", "Deprecated".

## Phase 3 — Design system & templates (Week 3)

- [ ] Build the **page templates** (doc 04): Policy, SOP, Handbook, Project,
      Meeting notes.
- [ ] Build the **onboarding** and **offboarding checklist** templates (doc 03)
      in the IT & Security teamspace.
- [ ] Write the one-page **style guide** on Company Home.
- [ ] Apply icons/colors per department (doc 04).

## Phase 4 — Migrate content (Weeks 4–5)

- [ ] Each Space Owner moves their department's **existing** rules/docs into the
      hub, using the templates.
- [ ] For each doc: set Owner, Status, Version, Last/Next review.
- [ ] Move heavy files (GIS data, CAD, scans) to **Google Drive**; link from the
      relevant Notion pages.
- [ ] Kill the old copies: delete or archive documents living in inboxes and
      personal drives so the hub is the *only* source.

## Phase 5 — Launch & train (Week 6)

- [ ] All-hands: show everyone the "Where do I find…?" index and how to search.
- [ ] Run one real **onboarding** using the checklist (validate the joiner flow).
- [ ] Dry-run an **offboarding** on a test account (validate the leaver flow end
      to end: suspend → locked out → ownership transferred → logged).
- [ ] Turn on the **monthly review** habit for each Space Owner.

## Phase 6 — Operate (ongoing)

- [ ] Monthly: Space Owners clear their "Needs review" list.
- [ ] Quarterly: Hub Admin runs the access review + hub health check (doc 05).
- [ ] When you scale: evaluate **Level C (SCIM via an IdP)** for fully automatic
      deprovisioning.

---

## The one thing to get right first

If you do nothing else this week: **set up Google SSO into Notion and prove that
suspending a Google account locks a user out.** That single control is the
entire answer to "when I fire someone, he loses the connection." Everything
else — structure, templates, governance — is built on top of that.
