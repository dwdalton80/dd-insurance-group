# Technical Handoff & Migration Readiness

This is the master document for transferring this project to a new developer, team,
or owner — including a full acquisition/ownership transfer. It inventories every
external account, credential, and platform dependency the site relies on, and gives
a concrete checklist for migrating off any one of them.

Read alongside [`ARCHITECTURE.md`](./ARCHITECTURE.md) (what's built, how the code
is organized) and [`DEPLOYMENT.md`](./DEPLOYMENT.md) (build/hosting/DNS detail).

**Last verified:** 2026-08-19, against the live site at `ddinsgroup.com` and the
`main` branch of `dwdalton80/dd-insurance-group`.

---

## 1. Executive summary

D&D Insurance Group's website is a **static React site with no backend, no
database, and effectively no proprietary infrastructure lock-in**. This is good
news for portability: the entire "product" is the Git repository plus a handful of
third-party SaaS accounts (forms, scheduling, DNS/hosting, email, domain
registration). There is no data to migrate off a database, no server to
re-provision, and no user accounts/auth system to reconcile.

The things that actually require action during a transfer are:
1. **Access handoff** to ~6 external accounts (below), not code changes.
2. **One pre-existing email deliverability bug** (SPF/DKIM misconfiguration,
   documented in `DEPLOYMENT.md`) that a new owner should know about regardless of
   whether anything else changes.
3. **Domain renewal** — GoDaddy registration expires **2027-01-26**; whoever ends
   up owning the site needs auto-renew on or a calendar reminder well before then.

## 2. External accounts & integrations inventory

| # | Service | What it's used for | Where referenced in code | Credential type | Who needs access after transfer |
|---|---|---|---|---|---|
| 1 | **GoDaddy** | Domain registrar for `ddinsgroup.com` (registration/renewal only — DNS itself is delegated to Cloudflare, see `DEPLOYMENT.md` §3) | — (DNS config, not code) | GoDaddy account login | New domain owner, or whoever manages renewal |
| 2 | **Cloudflare** | Authoritative DNS for the domain **and** hosting (Cloudflare Pages) for the built site | `wrangler.json` | Cloudflare account login (+ API token if deploys are automated) | New hosting/dev owner |
| 3 | **GitHub** | Source control; likely also the trigger for Cloudflare Pages auto-deploys | Whole repo | GitHub account/org access to `dwdalton80/dd-insurance-group` | New dev team |
| 4 | **Formspree** | Receives both the booking form (`/booking`) and contact form (`/contact`) submissions, and is presumably what emails them to Larry | `client/src/const.ts` → `FORMSPREE_BOOKING_ENDPOINT` (`formspree.io/f/xnpalpkz`), `FORMSPREE_CONTACT_ENDPOINT` (`formspree.io/f/xdenyerw`) | Formspree account login (the endpoint IDs in code are not secret, but you need the account to see submissions, change the notification email, or raise the free-tier submission cap) | Whoever monitors leads/bookings |
| 5 | **Sunfire (Sunfire Matrix / Spark Storefront)** | Scope-of-Appointment (SOA) e-signature flow — after submitting the booking form, visitors are redirected here (`SUNFIRE_PURL_URL` in `const.ts`, includes an agent ID `sfagid=20791041`) to legally document CMS-compliant consent before a Medicare sales conversation | `client/src/const.ts` → `SUNFIRE_PURL_URL` | Sunfire/agency account tied to Larry's NPN | Larry Dalton personally (this is Medicare-compliance-specific and agent-licensed, not something a generic "new owner" can just take over — see note below) |
| 6 | **Calendly** | Embedded scheduling widget on `/contact` (`calendly.com/ddinsgroup`) | `client/src/pages/Contact.tsx` | Calendly account login | Whoever manages Larry's calendar |
| 7 | **Microsoft 365 / Exchange Online** | Hosts `@ddinsgroup.com` email (confirmed via MX + autodiscover DNS records) | — (DNS only, not code) | Microsoft 365 admin/tenant access | Whoever manages business email |
| 8 | **Google Search Console** | Site ownership verified via a TXT record on the domain | — (DNS only) | Google account that owns the verification | Whoever manages SEO/search presence |
| 9 | **Google Fonts** | Plus Jakarta Sans + Inter, loaded live from `fonts.googleapis.com` | `client/index.html` | None — free, no account needed | N/A |
| 10 | **Unsplash** | Two stock photo URLs are hotlinked directly from `images.unsplash.com` rather than hosted locally | `client/src/const.ts` → `BRAND_ASSETS.clientCouple`, `BRAND_ASSETS.businessGroup` | None, but see limitation below | N/A |

### Important note on #5 (Sunfire / SOA compliance)

The Scope of Appointment e-signature step exists because CMS (Medicare) marketing
rules require documented consent before certain conversations can happen. This
flow, and the Sunfire account behind it, is tied to Larry Dalton's individual agent
license/NPN (`NPN #17548329`, visible in `client/src/const.ts`). **If this
business is acquired and a different licensed agent takes over client
consultations, the Sunfire integration (and likely the whole compliance flow) needs
to be re-pointed to the new agent's own Sunfire/SOA account** — this is a
regulatory requirement, not a technical preference, and isn't something that can be
"migrated" in the usual sense. Flag this explicitly to legal/compliance counsel
during any ownership transfer that changes who the licensed agent of record is.

## 3. What does *not* need to be migrated

Worth stating explicitly, since the question "what needs to be recreated" implies
these might exist:
- **No database** — nothing to export/import.
- **No user accounts / auth system** — nothing to reconcile.
- **No server** — nothing to re-provision, no server-side secrets, no API keys
  guarding privileged operations.
- **No payment processing** — no PCI scope, no payment provider account.
- **No required environment variables** for the site to function (see
  `DEPLOYMENT.md` §4) — the one env var pair that exists is for a dead code path.

## 4. Migration checklist (moving to a new owner/host/registrar)

Use this as a literal checklist during a transfer. Steps are ordered to avoid
downtime.

- [ ] **Repo access**: add new owner/team to `dwdalton80/dd-insurance-group` on
      GitHub (or transfer repo ownership outright).
- [ ] **Cloudflare access**: add new owner to the Cloudflare account (or transfer
      the zone). Confirm they can see the Pages project and DNS zone for
      `ddinsgroup.com`.
- [ ] **Confirm Cloudflare Pages Git integration** settings per `DEPLOYMENT.md` §5
      before assuming deploys will "just work" for a new team — this is dashboard
      config invisible from the repo.
- [ ] **Domain registrar (GoDaddy)**: either transfer the domain to the new owner's
      registrar account, or add them as an authorized contact/admin on the existing
      GoDaddy account. Note the **2027-01-26 expiry** — don't let a transfer process
      stall past that date.
- [ ] **If actually moving the domain to a different registrar**: unlock the
      domain, retrieve the EPP/auth code from GoDaddy, and **do this only after**
      confirming DNS is stable at Cloudflare (changing registrar does not, by
      itself, change DNS — nameservers stay at Cloudflare unless changed
      separately).
- [ ] **If moving DNS off Cloudflare too**: export the full DNS zone from
      Cloudflare *before* changing nameservers at the registrar (Cloudflare's
      dashboard has a "Export DNS records" option) — otherwise the MX, TXT (Google
      verification, SPF, DMARC, M365 verification), and A records documented in
      `DEPLOYMENT.md` §3 will need to be manually re-entered from this document.
- [ ] **Formspree**: transfer/share account access, or create a new account and
      swap the two endpoint IDs in `client/src/const.ts`.
- [ ] **Calendly**: transfer/share account access, or update the URL in
      `Contact.tsx` if a different scheduling link is used going forward.
- [ ] **Microsoft 365 (email)**: coordinate with whoever administers the tenant —
      this is independent of the website but shares the same DNS zone, so DNS
      changes to the zone must not accidentally break MX/SPF/DKIM/DMARC records.
      **Fix the SPF/DKIM gap (`DEPLOYMENT.md` §3) as part of this**, don't just
      preserve the existing broken state.
- [ ] **Sunfire / SOA**: see the compliance note in §2 above — resolve this with
      whoever is licensed to conduct the Medicare consultations going forward
      before the first booking under new ownership.
- [ ] **Google Search Console**: add new owner as a verified user before removing
      the old one, so search visibility/indexing data isn't lost.
- [ ] **Update contact/legal info in code** if the business entity, phone number,
      email, or mailing address changes — all centralized in
      `client/src/const.ts` (`LARRY_INFO`) plus `client/index.html` (JSON-LD
      structured data has a duplicate copy of phone/address — see convention note
      in §6).

## 5. Known limitations & technical debt (consolidated)

Full detail on each of these lives in `ARCHITECTURE.md` and `DEPLOYMENT.md`; this
is the acquisition-diligence-friendly summary list.

**Resolved (2026-08-19):**

| Item | Resolution |
|---|---|
| Dead Manus Maps proxy dependency in `Map.tsx` | Deleted — nothing referenced it. |
| Dual lockfiles (`package-lock.json` + `pnpm-lock.yaml`) | `pnpm-lock.yaml` deleted; `package-lock.json`/npm is canonical. |
| No security headers (CSP, X-Frame-Options, HSTS, Referrer-Policy, Permissions-Policy, X-Content-Type-Options) | Added via `client/public/_headers` (Cloudflare Pages custom headers), scoped to the third parties this site actually loads. Verify live at [securityheaders.com](https://securityheaders.com/?q=ddinsgroup.com) after the next deploy. |

**Still open:**

| Item | Risk if ignored | Effort to fix |
|---|---|---|
| SPF/DKIM misconfigured for Microsoft 365 email (`DEPLOYMENT.md` §3) | Outbound business email may land in spam or get rejected | Low — DNS record changes in Microsoft 365 admin center |
| Two images hotlinked from `images.unsplash.com` instead of hosted locally (`const.ts`) | Site has a live runtime dependency on Unsplash's CDN staying up and those specific URLs staying valid; also slightly slower / an extra DNS lookup for visitors. Also required as a CSP `img-src` exception — remove the exception when this is fixed. | Low — download and serve from `client/public/images/` like every other image |
| `client/public/404.html` is a leftover GitHub Pages SPA shim, redundant under Cloudflare's `wrangler.json` handling | None functionally; mildly confusing to a future dev | Trivial |
| No `robots.txt` | Relies on default crawler behavior instead of explicit control | Trivial |
| `package.json` declares `"license": "MIT"` with no `LICENSE` file, on a proprietary business site | Ambiguous/likely-wrong IP licensing signal | Trivial — decide intent, fix the field |
| `vitest` installed and configured but zero test files exist | False sense of test coverage; no safety net for regressions | Medium — either write tests or remove the tooling |
| `PlainEnglish.tsx` page exists but isn't routed anywhere | Dead code, or an accidentally-orphaned page — worth a 2-minute check with the last person who touched it | Trivial once resolved |
| Cloudflare Pages Git integration / build settings are undocumented (live only in the dashboard) | A new team can't verify or reproduce the deploy pipeline from the repo alone | Low — one-time: log in, screenshot/document the settings into this doc |

## 6. Conventions for maintaining & scaling this project

- **All brand/contact/config values live in `client/src/const.ts`.** Phone number,
  email, mailing address, agent NPN, tagline, image paths, and third-party form/
  redirect URLs are all centralized there. Change a value once, it propagates
  everywhere it's used in the UI. **Exception:** `client/index.html`'s JSON-LD
  structured data and `<meta>` tags duplicate some of this (phone, address, image
  URL) as plain strings, since HTML `<head>` content can't import a TS module —
  keep these two in sync manually when contact info changes.
- **New pages** go in `client/src/pages/`, get wired into the route table in
  `App.tsx`, and typically use `Layout.tsx` automatically (it wraps every route).
- **New reusable UI** goes in `client/src/components/`; generic/design-system
  pieces (buttons, dialogs, etc.) belong in `components/ui/` following the existing
  shadcn/ui pattern — use `npx shadcn@latest add <component>` rather than
  hand-rolling primitives, to stay consistent with `components.json`'s config.
- **Images**: put new images in `client/public/images/`, reference by absolute
  path (`/images/...`). Don't hotlink external image URLs (see the Unsplash
  limitation above) — it's an avoidable external dependency.
- **Forms**: this is a static site, so any new form needs a third-party submit
  target (Formspree, or similar) — there is no server route to add.
- **Styling**: Tailwind CSS 4 utility classes, using the design tokens defined as
  CSS variables in `client/src/index.css`. Prefer extending those tokens over
  hardcoding new colors inline.
- **Before deploying a change**: run `npm run check` (type-check) and `npm run
  build` locally to catch errors before they hit Cloudflare's build.

## 7. Setup instructions for a new developer

1. Get GitHub access to `dwdalton80/dd-insurance-group` (§4 above).
2. Clone the repo, `npm install`, `npm run dev` — see `DEPLOYMENT.md` §1 for the
   full command list. No `.env` file or secrets are required to run the site
   locally (see `DEPLOYMENT.md` §4).
3. Read `ARCHITECTURE.md` for the code map and `const.ts` for where
   brand/contact/integration config lives.
4. If you need to touch deploy/hosting behavior, get Cloudflare account access
   (§4) — the deploy pipeline is Cloudflare-dashboard-configured, not
   repo-configured (aside from `wrangler.json`).
5. Read §5 above (known limitations) before assuming any given piece of the repo
   (Map.tsx, the pnpm lockfile, 404.html) reflects current intent — several files
   are confirmed leftovers.
