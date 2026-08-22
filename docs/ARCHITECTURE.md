# Architecture

> Part of the technical handoff package. See also: [`DEPLOYMENT.md`](./DEPLOYMENT.md) (hosting/DNS/build) and [`HANDOFF.md`](./HANDOFF.md) (accounts, credentials, migration checklist, known issues).

## 1. What this project is

D&D Insurance Group's public marketing/lead-generation website — a Medicare and
health insurance brokerage site for agent Larry Dalton, serving Oklahoma and Texas.
It is a **pure static site**: a React single-page application built by Vite,
compiled to static HTML/CSS/JS, with **no backend server, no database, and no
server-side code of any kind**.

The site's job is to inform visitors about Medicare/health/group insurance options
and get them to either:
- submit a booking request (`/booking` → Formspree → Larry follows up), or
- submit a general contact inquiry (`/contact` → Formspree), or
- book directly on Larry's Calendly, or
- call/email Larry directly.

There is no login, no user accounts, no payment processing, and no PII stored
anywhere in the site itself — form submissions go straight to Formspree, which
handles storage/delivery.

## 2. History (why the repo looks the way it does)

This project was originally built as a full-stack app on the **Manus** platform
(React + Express + tRPC + Drizzle ORM + MySQL + Manus OAuth), with a booking
system, admin dashboard, SOA e-signature flow, and email notifications. In **August
2026** it was converted to a static site and moved to **Cloudflare Pages** — the
server, database, admin dashboard, and Manus-specific plumbing were all deleted.
See [`docs/archive/`](./archive/) for the pre-conversion documentation and a map of
exactly what was removed.

One leftover from that history still lives in the code (see [§6](#6-known-leftover-manus-dependency-not-currently-live)).

## 3. Tech stack

| Layer | Choice |
|---|---|
| Framework | React 19 |
| Build tool | Vite 7 |
| Language | TypeScript 5.9 |
| Routing | [wouter](https://github.com/molefrog/wouter) 3 (lightweight client-side router, not React Router) |
| Styling | Tailwind CSS 4 (via `@tailwindcss/vite` plugin, not PostCSS config) |
| Component library | [shadcn/ui](https://ui.shadcn.com) ("new-york" style) — Radix UI primitives copied into `client/src/components/ui/`, not installed as an npm dependency. Configured via [`components.json`](../components.json). |
| Icons | lucide-react |
| Forms | react-hook-form + zod (validation schemas) |
| Fonts | Google Fonts (Plus Jakarta Sans for headings, Inter for body) — loaded via `<link>` in `client/index.html`, no self-hosting |
| Package manager | npm (canonical — the stale `pnpm-lock.yaml` leftover has been removed) |
| Hosting/build | Cloudflare Pages via Wrangler (see [`DEPLOYMENT.md`](./DEPLOYMENT.md)) |

There is no test runner configured — an orphaned `vitest.config.ts` (referencing a
`server/`/`shared/` layout that no longer exists) was removed on 2026-08-21; `vitest`
itself was never a dependency in this repo's `package.json`.

## 4. Repository structure

```
/
├── client/
│   ├── index.html              # HTML shell: meta tags, SEO/OG tags, JSON-LD
│   │                            # structured data, Google Fonts, favicon links
│   ├── public/                 # Copied verbatim into the build output
│   │   ├── favicon.ico
│   │   ├── manifest.json       # PWA manifest (icons, theme color, shortcuts)
│   │   ├── _headers             # ⭐ Cloudflare Pages security response headers
│   │   │                        #   (CSP, HSTS, X-Frame-Options, etc.) — see DEPLOYMENT.md
│   │   ├── robots.txt / sitemap.xml
│   │   └── images/             # ALL site images (~15 MB, ~57 files) — logos,
│   │                            # hero photos, badges, Larry's headshot, etc.
│   │                            # (includes the two former Unsplash hotlinks,
│   │                            # now downloaded and self-hosted)
│   └── src/
│       ├── main.tsx             # React root / entry point
│       ├── App.tsx              # Route table (wouter) + top-level providers
│       ├── const.ts             # ⭐ Brand config: Larry's contact info, image
│       │                        #   paths, Formspree endpoints, Sunfire URL —
│       │                        #   the single most important file to know about
│       ├── index.css            # Tailwind entry + design tokens (CSS variables)
│       ├── pages/                # One file per route (see §5 for the route map)
│       ├── components/
│       │   ├── Layout.tsx        # Header/nav/footer wrapper used on every page
│       │   ├── BookingForm.tsx   # Booking form → Formspree + Sunfire redirect
│       │   ├── MedicaidCheckTool.tsx  # Self-contained interactive quiz widget
│       │   ├── ErrorBoundary.tsx
│       │   └── ui/               # shadcn/ui primitives (button, dialog, etc.)
│       ├── contexts/ThemeContext.tsx
│       ├── hooks/                 # useMobile, usePersistFn, useComposition
│       └── lib/utils.ts           # `cn()` class-merge helper (clsx + tailwind-merge)
├── docs/                        # ⭐ You are here — current documentation
│   └── archive/                 # Historical/superseded docs from the Manus era
├── vite.config.ts               # Build config: root=client/, outDir=dist/
├── wrangler.json                # ⭐ Cloudflare Pages deploy config
├── components.json              # shadcn/ui codegen config
├── tsconfig.json / tsconfig.node.json
├── package.json                 # npm scripts + dependencies
└── package-lock.json            # npm lockfile (canonical — see §8)
```

## 5. Routes / pages

Defined in [`client/src/App.tsx`](../client/src/App.tsx), rendered inside
`Layout.tsx` (shared header/footer) on every route:

| Path | Component | Purpose |
|---|---|---|
| `/` | `Home.tsx` | Landing page — hero, trust badges, service overview |
| `/medicare` | `Medicare.tsx` | Medicare plans (Supplement, Advantage, Part D) |
| `/under-65` | `Under65.tsx` | Individual/ACA marketplace insurance under 65 |
| `/group` | `Group.tsx` | Small business / group health plans |
| `/about` | `About.tsx` | Larry Dalton bio, experience, credentials |
| `/contact` | `Contact.tsx` | Contact form (Formspree) + embedded Calendly widget |
| `/booking` | `Booking.tsx` → `BookingForm.tsx` | Consultation request form (Formspree) → redirects to Sunfire SOA |
| `/booking-confirmation` | `BookingConfirmation.tsx` | Static "thanks, here's what's next" page |
| `/faq` | `FAQ.tsx` | FAQ accordion |
| `/plain-english` | `PlainEnglish.tsx` | "Medicare in Plain English" — 8 expandable guides (Parts A–D, Medigap, enrollment periods) + FAQ. Linked from the footer's Resources column and from a callout on `/medicare`. |
| `/privacy-policy` | `PrivacyPolicy.tsx` | Legal |
| `/terms-of-service` | `TermsOfService.tsx` | Legal |
| `/404`, and any unmatched path | `NotFound.tsx` | 404 page |

(`PlainEnglish.tsx` existed in the repo but wasn't wired into any route until
2026-08-21 — it was substantial, finished content that had just never been linked.)

## 6. Removed: leftover Manus dependency

`client/src/components/Map.tsx` used to exist as a Google Maps wrapper that loaded
the Maps JavaScript API through **Manus's own API proxy**
(`forge.butterfly-effect.dev`) rather than calling Google directly. It was never
imported or rendered anywhere in the app (confirmed via grep before removal), so it
had no effect on the live site — but it was the one piece of code that still
assumed Manus-specific infrastructure existed, and would have failed silently if
anyone wired it into a page without reading this note first. **It has been
deleted** (see git history if you need to resurrect it as a reference).

If a map is wanted on the site in the future (e.g. a service-area map on `/about`
or `/contact`), build it against the Google Maps JS API directly with a real
Google Cloud Console API key, restricted to `ddinsgroup.com` — not a
platform-specific proxy.

## 7. Data flow / integrations summary

There is no database and no server API. All "backend" behavior is delegated to
third-party services called directly from the browser:

```
Visitor's browser
  ├─ Booking form  ──POST──▶  Formspree (FORMSPREE_BOOKING_ENDPOINT)
  │                              then redirects browser to ──▶ Sunfire SOA (SUNFIRE_PURL_URL)
  ├─ Contact form  ──POST──▶  Formspree (FORMSPREE_CONTACT_ENDPOINT)
  ├─ Contact page  ──loads──▶  Calendly embedded widget (calendly.com/ddinsgroup)
  └─ All pages     ──loads──▶  Google Fonts (fonts.googleapis.com)
```

All images, including what used to be 2 hotlinked Unsplash stock photos, are now
served from `client/public/images/` — there are no other outbound image requests.

Full details on each of these — what they are, what credentials they need, what
breaks if they're not recreated — are in [`HANDOFF.md`](./HANDOFF.md#external-accounts--integrations-inventory).

## 8. Known limitations / cleanup opportunities

All previously-open items in this section (dual lockfiles, the dead Manus Maps
proxy, missing security headers, the redundant `404.html`, hotlinked Unsplash
images, the unused `vitest` config, the unrouted `PlainEnglish.tsx` page, and the
ambiguous MIT license field) were resolved on 2026-08-21 — see
[`HANDOFF.md` §5](./HANDOFF.md#5-known-limitations--technical-debt-consolidated)
for the full record of what changed.

**Still open** (not fixable from inside this repo — see `DEPLOYMENT.md` §3 for the
full runbook): the domain's SPF record only authorizes GoDaddy's mail servers, and
no DKIM is published, while mail is actually hosted on Microsoft 365. This is a DNS
+ Microsoft 365 admin-center fix, not a code change.
