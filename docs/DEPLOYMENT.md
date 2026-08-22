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

### Security headers

[`client/public/_headers`](../client/public/_headers) sets response headers
(CSP, `X-Frame-Options`, `Strict-Transport-Security`, `Referrer-Policy`,
`Permissions-Policy`, `X-Content-Type-Options`) via [Cloudflare Pages' `_headers`
convention](https://developers.cloudflare.com/pages/configuration/headers/) — it's
copied into `dist/` on every build the same way `favicon.ico` and `manifest.json`
are, since it lives in `client/public/`. The CSP is intentionally scoped to the
exact third parties the site loads (Formspree, Calendly, Google Fonts, and the two
hotlinked Unsplash images) — if you add a new external script/font/image/API host
anywhere in the app, update this file's `Content-Security-Policy` line too, or that
resource will be silently blocked by the browser in production only (dev mode
doesn't enforce it). Re-check with [securityheaders.com](https://securityheaders.com/?q=ddinsgroup.com)
after any change here.

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

#### Fix runbook

This needs **two separate systems** — Cloudflare DNS and the Microsoft 365 admin
center — done by whoever has access to each (likely the same person). Neither is
something I can do from this session (no Cloudflare or Microsoft 365 credentials
here) — this is the exact set of steps to hand to whoever does.

**Step 1 — Fix SPF (Cloudflare DNS).**
In the Cloudflare dashboard → `ddinsgroup.com` → DNS → Records, find the root TXT
record currently reading `v=spf1 include:secureserver.net -all` and replace its
value with:

```
v=spf1 include:spf.protection.outlook.com -all
```

This authorizes Microsoft 365's servers (what MX actually points to) instead of
GoDaddy's. Only keep `include:secureserver.net` alongside it (as a second
`include:`) if some other GoDaddy-hosted service is *also* known to send mail as
`@ddinsgroup.com` — nothing found in this audit suggests that's the case, since MX
points exclusively to Microsoft 365.

**Step 2 — Enable DKIM (Microsoft 365 admin center).**
DKIM can't be turned on by publishing DNS records alone — Microsoft 365 needs to
be told to sign with them first, and the exact CNAME targets should be **copied
from the admin center**, not guessed, to avoid a typo that silently breaks signing:

1. Sign in to the [Microsoft 365 Defender portal](https://security.microsoft.com/)
   with an account that administers this tenant → **Email & collaboration** →
   **Policies & rules** → **Threat policies** → **Email authentication settings**
   → **DKIM**.
2. Select `ddinsgroup.com`. It will very likely show DKIM as **not enabled** and
   display two CNAME records to publish first (they'll resemble, but confirm
   exactly):
   ```
   selector1._domainkey.ddinsgroup.com  →  selector1-ddinsgroup-com._domainkey.NETORGFT15576544.onmicrosoft.com
   selector2._domainkey.ddinsgroup.com  →  selector2-ddinsgroup-com._domainkey.NETORGFT15576544.onmicrosoft.com
   ```
   (The `NETORGFT15576544.onmicrosoft.com` portion is this tenant's verified
   default domain, confirmed via the TXT record in the table above — but copy the
   exact strings the admin center shows rather than retyping these.)
3. Add both as **CNAME** records in Cloudflare DNS, **DNS only / not proxied**
   (grey-clouded, not orange) — proxying a DKIM CNAME through Cloudflare breaks
   it.
4. Back in the Defender portal, click **Enable** for DKIM on `ddinsgroup.com`. It
   may report "not found yet" for a few minutes while DNS propagates — retry after
   ~15 minutes if so.

**Step 3 — Verify.** After both steps, send a test email from `larry@ddinsgroup.com`
to a Gmail address (or use [mail-tester.com](https://www.mail-tester.com/)) and
check the received message's headers for `spf=pass` and `dkim=pass`. Re-check the
DNS records from a terminal too:
```bash
dig +short ddinsgroup.com TXT | grep spf
dig +short selector1._domainkey.ddinsgroup.com CNAME
dig +short selector2._domainkey.ddinsgroup.com CNAME
```

**Optional cleanup:** the DMARC record's aggregate-report address
(`rua=mailto:dmarc_rua@onsecureserver.net`) is a GoDaddy-managed mailbox — worth
confirming someone still actually reads those reports, or repointing it to an
address the current site owner monitors.

This is purely an email-deliverability fix — it does not touch the website, the
Cloudflare Pages deployment, or any code in this repo.

## 4. Environment variables & secrets

**None are required.** A repo-wide grep for `import.meta.env` / `process.env`
turns up nothing — there is no `.env` or `.env.example` file in the repo (both are
gitignored, and neither exists on disk either).

(As of 2026-08-19, this used to be a two-variable table: `VITE_FRONTEND_FORGE_API_KEY`
/ `VITE_FRONTEND_FORGE_API_URL`, read by a dead `client/src/components/Map.tsx`
component that loaded Google Maps through a Manus-platform-only API proxy. That
component was unused/unrouted and has since been deleted — see
[`ARCHITECTURE.md` §6](./ARCHITECTURE.md#6-removed-leftover-manus-dependency). If
Cloudflare Pages' project settings still have either variable configured, it's now
inert dead weight and safe to remove.)

**No build-time or runtime secrets are required for the site to work.** Everything
the live site depends on — Formspree endpoint IDs, the Sunfire URL — is hardcoded
as plain (non-secret) values in [`client/src/const.ts`](../client/src/const.ts),
because none of it is sensitive: Formspree endpoint IDs and the Sunfire PURL are
not credentials, just public-facing URLs (comparable to a public API endpoint, not
an API key).

## 5. Action items — things to verify in the Cloudflare dashboard

None of the following are visible from the repo and need to be checked directly in
Cloudflare's dashboard (Pages project → Settings) by whoever has access:

1. ~~**Git integration**: is this Pages project connected to
   `dwdalton80/dd-insurance-group` on GitHub~~ — **confirmed 2026-08-19**: pushing
   to `main` auto-deploys with no manual step. Verified by pushing the `_headers`
   commit and observing the new response headers live within ~4 minutes. Still
   worth confirming in the dashboard which branch is bound as "Production" if you
   ever work from a non-`main` branch.
2. **Build command / output directory** configured in the Pages project — should
   be `npm run build` / `dist`. Given the auto-deploy above produced a correct
   build, this is almost certainly already right, but wasn't independently
   confirmed. If it was set up differently (e.g. some leftover config from before
   `wrangler.json` existed), reconcile it.
3. **Environment variables** set on the Pages project (Production and Preview) —
   record whatever's there for the handoff package, even if (per §4) nothing is
   strictly required today.
4. **Custom domain binding** — confirm `ddinsgroup.com` and `www.ddinsgroup.com`
   are both bound to this Pages project (not just DNS pointing at Cloudflare
   generically).
5. **Cloudflare account access** — who has admin access to the Cloudflare account
   itself (not just the Pages project)? This is also where DNS lives (§3), so
   Cloudflare account access is equivalent to DNS control for the whole domain.
