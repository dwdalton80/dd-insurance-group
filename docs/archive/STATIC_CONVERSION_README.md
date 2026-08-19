# D&D Insurance Group — Static Conversion Notes

This repo has been converted from the original full-stack (Express/tRPC/Drizzle/MySQL/S3)
app into a pure static site. No server, no database required.

## What changed

- **Deleted:** `server/`, `drizzle/`, `drizzle.config.ts`, `shared/`, tRPC client, admin
  dashboard and every admin-only page/component (bookings management, availability
  settings, user management, MFA, email templates, invite acceptance, etc.)
- **Images:** the site previously served all images through a server route
  (`/manus-storage/*`) that proxied to Manus's storage backend. All 54 referenced images
  were pulled from the still-live `ddinsgroup.com` and now live in `client/public/images/`,
  served as plain static files.
- **Booking form & Contact form:** both now submit via `fetch()` to Formspree instead of
  tRPC. The live appointment-availability calendar was removed per your request — visitors
  now enter a preferred date/time as a plain request, and you follow up to confirm.
- **Build:** `vite build` only, outputs to `dist/`. No server bundle step.

## Before you deploy — action items

1. **Set up Formspree.** Create a free account at formspree.io, create two forms (one for
   bookings, one for general contact), and paste the real endpoint URLs into
   `client/src/const.ts`:
   - `FORMSPREE_BOOKING_ENDPOINT`
   - `FORMSPREE_CONTACT_ENDPOINT`
   (They currently contain placeholder IDs and won't work until you swap them in.)

2. **Confirm the Sunfire SOA redirect link.** Also in `client/src/const.ts`:
   `SUNFIRE_PURL_URL` — currently a placeholder inherited from the original code. Set it to
   your real Spark Storefront / Sunfire link.

3. **Pick a host and check SPA routing works.**
   - `client/public/_redirects` is included for Netlify/Cloudflare Pages (rewrites all
     paths to `index.html` so deep links like `/booking` work on refresh).
   - `client/public/404.html` is included as a fallback for GitHub Pages, but it's a
     simple redirect-to-home rather than a full path-preserving SPA shim — if you go with
     GitHub Pages, refreshing on `/booking` will bounce the visitor to the homepage rather
     than staying on `/booking`. Netlify/Cloudflare Pages avoid this issue entirely via
     `_redirects`, so they're the better fit for this site.

4. **Add analytics if you want it.** The previous build used Manus's built-in Umami
   analytics endpoint, which no longer resolves once off Manus. A placeholder comment is
   left in `client/index.html` — drop in your own analytics script tag there if desired
   (Plausible, GA, Cloudflare Web Analytics, self-hosted Umami, etc.)

## Local commands

```
npm install
npm run dev       # local dev server
npm run build     # production build -> dist/
npm run preview   # serve the production build locally to sanity-check
```

## Verified

- `npm run build` completes with no errors or warnings
- `npx tsc --noEmit` passes clean
- All routes (`/`, `/booking`, `/contact`, `/medicare`, etc.) return 200 in preview
- No remaining references to the old backend or `/manus-storage/` paths anywhere in the
  codebase or built output
