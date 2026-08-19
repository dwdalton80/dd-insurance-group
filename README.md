# D&D Insurance Group

Marketing and lead-generation website for D&D Insurance Group — Larry Dalton,
independent Medicare & health insurance broker serving Oklahoma and Texas.

**Live site:** [ddinsgroup.com](https://ddinsgroup.com)

This is a static React site (Vite + TypeScript + Tailwind CSS), hosted on
Cloudflare Pages. There is no backend server, no database, and no user
authentication — forms submit to [Formspree](https://formspree.io), and Medicare
consultation bookings hand off to Sunfire for the required Scope of Appointment
e-signature.

## Documentation

Full technical documentation lives in [`/docs`](./docs):

- **[docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)** — what's built, tech stack,
  repository structure, routes, data flow, known dead code.
- **[docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md)** — local dev, build, Cloudflare
  Pages hosting, DNS records, environment variables.
- **[docs/HANDOFF.md](./docs/HANDOFF.md)** — full technical handoff / acquisition
  readiness package: every external account and credential the site depends on, a
  migration checklist, known limitations and technical debt, and conventions for
  future development. **Start here if you're taking over this project.**
- **[docs/archive/](./docs/archive/)** — historical documentation from before the
  August 2026 conversion from a full-stack Manus app to this static site. Not
  current — kept for context only.

## Quick start

```bash
npm install
npm run dev       # local dev server with hot reload
npm run build      # production build → dist/
npm run preview     # serve the production build locally
npm run check         # type-check (tsc --noEmit)
```

No environment variables or `.env` file are required to run this locally — see
[docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md#4-environment-variables--secrets) for the
one exception (an unused, dormant integration).

## Where things live

- **Brand/contact info & third-party integration config**:
  [`client/src/const.ts`](./client/src/const.ts) — phone, email, address, image
  paths, Formspree endpoints, Sunfire URL. Change values here, not scattered
  throughout components.
- **Pages**: [`client/src/pages/`](./client/src/pages/), routed in
  [`client/src/App.tsx`](./client/src/App.tsx).
- **Shared header/nav/footer**: [`client/src/components/Layout.tsx`](./client/src/components/Layout.tsx).
- **Images**: [`client/public/images/`](./client/public/images/).

See [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) for the complete map.
