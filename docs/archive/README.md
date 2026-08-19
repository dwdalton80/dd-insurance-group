# Archive — Pre-Migration & Planning Documents

Everything in this folder is **historical**. It documents the project as it existed
**before** the August 2026 conversion from a full-stack Manus app (React + Express +
tRPC + Drizzle + MySQL + Manus OAuth, hosted on Manus's platform) to the **static
site** (React + Vite only, no server, no database) now hosted on Cloudflare Pages.

None of these files describe the current system. They're kept for historical
reference and so nobody has to reverse-engineer *why* certain decisions were made.
For current, accurate documentation, see [`/docs`](../) and the root
[`README.md`](../../README.md).

| File | What it was |
|---|---|
| `PROJECT_STATUS.md` | Status report on the old full-stack build (bookings DB, admin dashboard, Manus OAuth, email notifications). None of the features it describes as "completed" exist in this repo anymore — they were deleted in the static conversion. |
| `SECURITY_AUDIT.md` | Security audit of the old full-stack app (auth, database, tRPC). Its header-hardening recommendations (CSP, X-Frame-Options, Referrer-Policy) are still relevant to the current site and are re-surfaced in [`../HANDOFF.md`](../HANDOFF.md#known-limitations--technical-debt). |
| `STATIC_CONVERSION_README.md` | Notes written at the time of the static conversion. Superseded by [`../DEPLOYMENT.md`](../DEPLOYMENT.md) and [`../ARCHITECTURE.md`](../ARCHITECTURE.md) (in particular, it references `client/public/_redirects`, which has since been removed in favor of `wrangler.json`'s `not_found_handling`). |
| `static_conversion_assessment.md` | Pre-conversion feasibility assessment (what could/couldn't be made static). |
| `static_migration_guide.md` | Pre-conversion migration plan. |
| `ideas.md` | Freeform feature ideas from the original full-stack build. |
| `todo.md` | Old task checklist from the full-stack build (bookings system, SOA e-signature, admin dashboard, TPMO/CMS compliance work). Not a current roadmap. |
| `template.json` | Manus platform scaffold definition for the "Web App (static only)" template type. Not used by the build; safe to delete if you want to tidy the repo further. |
| `periodic-updates.md` | Manus-platform-specific instructions for wiring scheduled/cron jobs via Manus's `heartbeat` SDK and sandbox CLI. **Does not apply to this project at all anymore** — there is no server, no Manus platform, and no cron. Kept only so nobody mistakes it for current guidance. |
