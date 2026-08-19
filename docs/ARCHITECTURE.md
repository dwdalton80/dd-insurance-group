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
| Package manager | npm (see [§8](#8-known-limitations--cleanup-opportunities) — a stale `pnpm-lock.yaml` is also present and should be removed) |
| Hosting/build | Cloudflare Pages via Wrangler (see [`DEPLOYMENT.md`](./DEPLOYMENT.md)) |

No test runner is actually wired up to CI, but `vitest` is a dependency and
`vitest.config.ts` exists — see [§8](#8-known-limitations--cleanup-opportunities).

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
│   │   ├── 404.html            # Legacy GitHub Pages SPA fallback — not needed
│   │   │                        # on Cloudflare Pages, see DEPLOYMENT.md
│   │   └── images/             # ALL site images (~15 MB, ~55 files) — logos,
│   │                            # hero photos, badges, Larry's headshot, etc.
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
| `/privacy-policy` | `PrivacyPolicy.tsx` | Legal |
| `/terms-of-service` | `TermsOfService.tsx` | Legal |
| `/404`, and any unmatched path | `NotFound.tsx` | 404 page |

There is also a `PlainEnglish.tsx` page file present in `client/src/pages/` that is
**not wired into any route** in `App.tsx` — dead/unused, or a page that was
intentionally taken down. Worth a quick check with whoever last touched it before
assuming it's safe to delete.

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
  ├─ All pages     ──loads──▶  Google Fonts (fonts.googleapis.com)
  └─ const.ts      ──hotlinks──▶  2 Unsplash stock photo URLs (see HANDOFF.md limitations)
```

Full details on each of these — what they are, what credentials they need, what
breaks if they're not recreated — are in [`HANDOFF.md`](./HANDOFF.md#external-accounts--integrations-inventory).

## 8. Known limitations / cleanup opportunities

- **`client/public/404.html`** is a GitHub Pages-style SPA fallback
  (`window.location.replace('/')`, loses the originally-requested path). It's
  redundant now — Cloudflare Pages handles SPA routing correctly via
  `wrangler.json`'s `not_found_handling: "single-page-application"` (deep links
  like `/booking` resolve directly, no client-side redirect/flash). Safe to delete,
  or keep as a harmless fallback-of-a-fallback.
- **`vitest` is a dependency and `vitest.config.ts` exists, but there are no test
  files** anywhere in `client/src` and no `test` script in `package.json`. Either
  add tests or remove the unused test tooling.
- **No `robots.txt`.** Not blocking anything today, but worth adding explicitly
  (even a permissive one) rather than relying on default crawler behavior.
- **No `LICENSE` file**, despite `package.json` declaring `"license": "MIT"`. For a
  commercial/proprietary business site this is almost certainly not intentional —
  an MIT license notionally permits anyone to reuse the code. Recommend either
  removing the `license` field or setting it to `"UNLICENSED"` / a proprietary
  notice, whichever reflects actual intent.
- **`PlainEnglish.tsx`** page exists but isn't routed (see [§5](#5-routes--pages)).
