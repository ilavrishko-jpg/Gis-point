# 01 — Architecture

## The three layers

A knowledge hub that survives hiring and firing has **three** layers. Most
people only think about the middle one (Notion) and then wonder why access is a
mess. Build all three.

| Layer | Purpose | Recommended tool |
|-------|---------|------------------|
| **1. Identity** | The single account each person logs in with. The master on/off switch. | **Google Workspace** (you already use `@gis-point.com`) |
| **2. Knowledge** | Where the content lives, structured by department. | **Notion** |
| **3. Delivery** | How employees find and receive what they need. | Notion search + role-based teamspaces + Slack/email links |

### Why identity is layer 1 (and why it matters most)

The requirement "when I fire someone, he loses the connection" is **not** a
Notion setting you toggle per person. If you manage access inside each tool
by hand, then on the day you fire someone you have to remember to remove them
from Notion, Drive, Slack, the CRM, GitHub… and you *will* forget one. That
forgotten one is a security hole.

Instead: **one identity, provisioned centrally.** The person logs into Notion
*through* their Google account (Single Sign-On). You disable the Google account
once, and every connected tool refuses them. This is the professional standard
(the "joiner/mover/leaver" model) and it is covered in detail in
[`03-access-and-lifecycle.md`](./03-access-and-lifecycle.md).

---

## Recommended stack for GIS-Point

You already have Google Workspace (company Gmail, Drive, Calendar). Build on it.

```
Google Workspace (Identity + directory of all employees)
        │
        │  ── SAML SSO ──►  Notion login
        │  ── Groups   ──►  who is in which department
        │
        ├──►  Notion (Knowledge Hub — this design)
        ├──►  Google Drive (large/binary files: CAD, GeoTIFF, scans, PDFs)
        └──►  other tools (Slack, GitHub, CRM) — same login, same off-switch
```

**Split of responsibility between Notion and Drive**

- **Notion** holds *structured knowledge*: rules, SOPs, policies, handbooks,
  wikis, project docs, decisions, onboarding. Text-first, always current,
  searchable, linkable.
- **Google Drive** holds *heavy files*: large geospatial datasets, CAD/DWG,
  GeoTIFF/orthophotos, scanned contracts, big PDFs. Notion pages *link to*
  the Drive file rather than storing it. Same Google login controls both.

This keeps Notion fast and clean while big engineering/GIS artifacts stay in
the storage that is built for them.

---

## Tool choice: Notion vs alternatives

You named Notion, and it is a good fit. For completeness:

| Tool | Best when | Notes on access control |
|------|-----------|--------------------------|
| **Notion** ✅ | Flexible wiki + databases + templates; small/medium team | SAML SSO + SCIM auto-provisioning on the **Enterprise** plan |
| Confluence | Heavy engineering docs, Jira shops | Strong SSO/SCIM via Atlassian Access |
| Slite / Guru | Pure knowledge base, lighter | SSO on higher tiers |
| Coda | Docs that behave like apps | SSO/SCIM on Enterprise |

**Recommendation:** Notion. To get *automatic* deprovisioning (the firing
requirement fully automated) you need the **Enterprise plan** for SAML SSO —
and, ideally, SCIM. See the next paragraph for the honest trade-off.

### The plan you need — be realistic about cost

- **Notion Plus/Business without SSO:** you invite people by email and remove
  them by hand. Works, but offboarding is a manual checklist (still fine for a
  small team if the checklist is disciplined).
- **Notion Enterprise (SAML SSO):** people log in with Google. Suspend the
  Google account → they can no longer authenticate → locked out. This alone
  satisfies your requirement for most cases.
- **Notion Enterprise + SCIM (via an IdP like Okta / JumpCloud / Rippling):**
  fully automatic — disabling the person in the IdP *removes* their Notion
  membership, not just their login. This is the gold standard.

For a company of your size, start at "SAML SSO with Google" and add SCIM later
if you grow. The manual checklist in document 03 is your safety net until then.

---

## Data flow: how an employee "receives what they need"

1. Employee logs into Notion with their `@gis-point.com` Google account (SSO).
2. Their Google **group membership** (e.g. `field-team@`, `sales@`) decides
   which Notion **teamspaces** they can see.
3. They land on **Company Home** (visible to everyone) and see, in the sidebar,
   only the department teamspaces they belong to.
4. They search or browse to the one canonical page they need. It is always the
   latest version because it is the only version.
5. If they need a snapshot, they export that page to PDF on demand.

No copies emailed around. No "which version is current?". No access left behind
after they leave.
