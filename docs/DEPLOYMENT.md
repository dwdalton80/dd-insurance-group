# Build, Deployment, Hosting & DNS

> Part of the technical handoff package. See also: [`ARCHITECTURE.md`](./ARCHITECTURE.md) (code structure) and [`HANDOFF.md`](./HANDOFF.md) (accounts/credentials/migration checklist).

## 1. Local development

Requirements: Node.js 20+ (LTS recommended) and npm. **Use npm**, not pnpm/yarn —
see [`ARCHITECTURE.md` §8](./ARCHITECTURE.md#8-known-limitations--cleanup-opportunities)
for why a stray `pnpm-lock.yaml` exists but isn't the one to trust.

```bash
npm install        # install dependencies
npm run dev         # start Vite dev server (client/index.html), hot reload
npm run build        # production build → dist/
npm run preview       # serve the dist/ build locally to sanity-check before deploy
npm run check          # tsc --noEmit (type-check only, no emit)
npm run format           # prettier --write .
```

There is no `npm test` script (see limitations note in `ARCHITECTURE.md`).

The build is a **static** build: `vite build` outputs plain HTML/CSS/JS/images to
`dist/`. Nothing else runs — no server bundle, no serverless functions.

## 2. Hosting: Cloudflare Pages

The live site (`ddinsgroup.com`) is hosted on **Cloudflare Pages**, deployed via
**Wrangler** using the config in [`wrangler.json`](../wrangler.json):

```json
{
  "name": "dd-insurance-group",
  "compatibility_date": "2026-01-01",
  "assets": {
    "directory": "./dist",
    "not_found_handling": "single-page-application"
  }
}
```

- `assets.directory` — Cloudflare serves everything in `dist/` (the Vite build
  output) as static assets.
- `not_found_handling: "single-page-application"` — this is what makes
  client-side routes work. A request for e.g. `/booking` that doesn't match a real
  file falls back to `index.html` so `wouter` can render the right page
  client-side, and the browser's address bar keeps the real path. **This is why
  `client/public/_redirects` (a Netlify/Cloudflare-Pages-legacy redirects file) was
  removed** — it's no longer needed with `wrangler.json` handling the fallback.

**Build command Cloudflare needs to run:** `npm run build` (or `npm install && npm
run build`), **output directory:** `dist`. Where exactly to configure this depends
on how the Cloudflare project is wired — see the action item in [§5](#5-action-items--things-to-verify-in-the-cloudflare-dashboard).

### How deploys are triggered

This repo does **not** contain a GitHub Actions workflow (no `.github/workflows/`
directory) or any other CI config. That means either:
- Cloudflare Pages' **Git integration** is connected directly to the
  `dwdalton80/dd-insurance-group` GitHub repo and auto-builds on every push to
  `main` (the typical, low-maintenance setup), or
- Deploys are triggered manually/locally via `wrangler deploy` or `wrangler pages
  deploy dist`.

**This cannot be determined by reading the repo alone — it lives entirely in the
Cloudflare dashboard's Pages project settings**, which isn't visible from here.
This is the single most important thing to confirm and document for a new
owner/developer — see the action items below.

## 3. Domain & DNS

Verified via public DNS lookups (2026-08-19):

| Record | Value | Meaning |
|---|---|---|
| Registrar | GoDaddy.com, LLC | `ddinsgroup.com` is registered at GoDaddy. Registration expires **2027-01-26** — renewal must not lapse. |
| Nameservers | `gannon.ns.cloudflare.com`, `rosalie.ns.cloudflare.com` | DNS is **fully delegated to Cloudflare** — Cloudflare is authoritative for all DNS records (not just proxying), so all future DNS changes (subdomains, mail, verification records) happen in the Cloudflare dashboard, not at GoDaddy. |
| A records (root) | `104.21.35.33`, `172.67.212.176` | Cloudflare anycast IPs (Cloudflare Pages/proxy) |
| `www` | Also resolves to Cloudflare anycast IPs | www is handled/redirected via Cloudflare |
| MX | `ddinsgroup-com.mail.protection.outlook.com` | Email is hosted on **Microsoft 365 / Exchange Online**, *not* through GoDaddy or Cloudflare. |
| `autodiscover` CNAME | `autodiscover.outlook.com` | Confirms Microsoft 365 mailbox hosting. |
| TXT (root) | `NETORGFT15576544.onmicrosoft.com` | Microsoft 365 domain-ownership verification token. |
| TXT (root) | `google-site-verification=OxKhkEGSm2pjhJm-RMXiHi_VtweTVDuU18AEfGgrTL4` | Google Search Console ownership verification. |
| SPF (TXT, root) | `v=spf1 include:secureserver.net -all` | ⚠️ See known issue below — this does **not** authorize Microsoft 365 to send mail for this domain. |
| DMARC (`_dmarc` TXT) | `v=DMARC1; p=quarantine; adkim=r; aspf=r; rua=mailto:dmarc_rua@onsecureserver.net` | DMARC is enabled at `quarantine` enforcement, with aggregate reports routed to a GoDaddy-managed mailbox. |
| DKIM (`selector1`/`selector2._domainkey`) | **Not found** | ⚠️ See known issue below — Microsoft 365's DKIM signing does not appear to be enabled for this domain. |

### ⚠️ Known issue: email authentication is misconfigured

Mail is hosted on **Microsoft 365** (per MX/autodiscover), but:
- **SPF only authorizes GoDaddy's mail servers** (`secureserver.net`) — it does
  **not** include Microsoft's SPF include (`include:spf.protection.outlook.com`).
  Any mail actually sent from Microsoft 365 (e.g. `larry@ddinsgroup.com` sending a
  reply) will **fail SPF authentication**.
- **No DKIM CNAME records** were found for the standard Microsoft 365 selectors
  (`selector1._domainkey`, `selector2._domainkey`), meaning DKIM signing is very
  likely not enabled either.
- Combined with the active DMARC policy (`p=quarantine`), outbound mail from
  `@ddinsgroup.com` is at meaningful risk of landing in recipients' spam folders or
  being rejected outright, since it's failing the authentication checks DMARC
  checks against.
- **This predates and is unrelated to the Cloudflare/static-site migration** — it's
  a mail configuration issue, likely from when email was originally set up
  (possibly via a GoDaddy "Office 365 from GoDaddy" bundle, which would explain the
  SPF pointing at GoDaddy while MX points at Microsoft).

**Recommendation:** whoever administers the Microsoft 365 tenant should (a) add
Microsoft's SPF include and DKIM CNAMEs per Microsoft's own domain setup
instructions, or (b) re-run the Microsoft 365 domain setup wizard, which normally
provisions all of this automatically. This is an email-deliverability fix, not a
website change — flagging it here because DNS is what a new owner would otherwise
have to reverse-engineer from scratch.

## 4. Environment variables & secrets

| Variable | Used in | Required for live site? | Notes |
|---|---|---|---|
| `VITE_FRONTEND_FORGE_API_KEY` | `client/src/components/Map.tsx` | **No** — component is unused/unrouted (see `ARCHITECTURE.md` §6) | Manus-platform Maps proxy key. Do not bother recreating unless `Map.tsx` gets wired into a page and rewritten to call Google directly. |
| `VITE_FRONTEND_FORGE_API_URL` | same | **No** | Same as above; defaults to `https://forge.butterfly-effect.dev` (Manus infra) if unset. |

**That's the complete list** — a repo-wide grep for `import.meta.env` / `process.env`
turns up nothing else. There is no `.env` or `.env.example` file in the repo (both
are gitignored, and neither exists on disk here either).

**No build-time or runtime secrets are actually required for the site to work.**
Everything the live site depends on — Formspree endpoint IDs, the Sunfire URL — is
hardcoded as plain (non-secret) values in [`client/src/const.ts`](../client/src/const.ts),
because none of it is sensitive: Formspree endpoint IDs and the Sunfire PURL are
not credentials, just public-facing URLs (comparable to a public API endpoint,
not an API key).

If Cloudflare Pages' project settings have `VITE_FRONTEND_FORGE_API_KEY` configured
as a build environment variable, it's inert dead weight (safe to remove) given
`Map.tsx` isn't rendered anywhere — but confirm before removing, in case someone
re-enables the map before reading this doc.

## 5. Action items — things to verify in the Cloudflare dashboard

None of the following are visible from the repo and need to be checked directly in
Cloudflare's dashboard (Pages project → Settings) by whoever has access:

1. **Git integration**: is this Pages project connected to
   `dwdalton80/dd-insurance-group` on GitHub, and which branch is "Production"
   (almost certainly `main`, but confirm — see the branch-hygiene note in
   [`HANDOFF.md`](./HANDOFF.md))? If yes, every push to that branch auto-deploys.
2. **Build command / output directory** configured in the Pages project — should
   be `npm run build` / `dist`. If it was set up differently (e.g. some leftover
   config from before `wrangler.json` existed), reconcile it.
3. **Environment variables** set on the Pages project (Production and Preview) —
   record whatever's there for the handoff package, even if (per §4) nothing is
   strictly required today.
4. **Custom domain binding** — confirm `ddinsgroup.com` and `www.ddinsgroup.com`
   are both bound to this Pages project (not just DNS pointing at Cloudflare
   generically).
5. **Cloudflare account access** — who has admin access to the Cloudflare account
   itself (not just the Pages project)? This is also where DNS lives (§3), so
   Cloudflare account access is equivalent to DNS control for the whole domain.
