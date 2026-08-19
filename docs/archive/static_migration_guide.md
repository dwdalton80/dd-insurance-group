# Cleaning Up Backend Files and Configuring Vite for Static Build

Migrating the **D&D Insurance Group** project from a full-stack tRPC/Drizzle application into a pure static site (`web-static`) requires a systematic cleanup of server-side artifacts and the reconfiguration of Vite. This guide outlines the exact steps needed to strip away the backend while ensuring that all React components, navigation, and lead-generation flows remain fully functional.

## Step 1: Retiring Backend and Database Artifacts

The current repository contains server-side files, database schemas, and API routers that are unnecessary for a static deployment. These files must be removed or excluded from compilation.

| File / Directory Path | Action Required | Description / Rationale |
| :--- | :--- | :--- |
| `server/` | **Delete** | Contains Express server setup, tRPC routers, database query helpers, and authentication middleware. Not needed for static hosting. |
| `drizzle/` | **Delete** | Contains database migration history, journal, and TiDB/MySQL schema definitions. |
| `drizzle.config.ts` | **Delete** | Database toolkit configuration file. |
| `shared/` | **Review / Prune** | Remove server-only shared types or retain static constants (e.g., agency contact info, brand assets) by moving them into `client/src/const.ts`. |

---

## Step 2: Refactoring Frontend Data Dependencies

Because tRPC hooks (`trpc.*`) rely on an active backend API connection, any frontend component consuming tRPC queries or mutations must be updated to use pure client-side logic:

1. **Booking Submissions:** Replace `trpc.bookings.create.useMutation()` in `BookingForm.tsx` with standard asynchronous `fetch()` calls pointing directly to external form handlers (e.g., Formspree, EmailJS) or your Railway AI agent webhook endpoint (`https://voice-first-ai-agent-medicare-production.up.railway.app/webhooks/booking-received`).
2. **Medicare Purl Routing:** Store the Sunfire Purl redirect URL as a hardcoded configuration constant in `client/src/const.ts` rather than fetching it dynamically from a backend database settings table.
3. **Authentication State:** Remove `useAuth()` dependencies where admin gating was applied, or replace them with client-side token verification if using a third-party authentication provider.

---

## Step 3: Reconfiguring `package.json` for Static Build

The `package.json` file must be updated to remove backend server dependencies (Express, tRPC, Drizzle, MySQL) and streamline build scripts for Vite.

### Updated Scripts
Modify the scripts section in `package.json` to focus entirely on Vite static compilation:

```json
"scripts": {
  "dev": "vite --host",
  "build": "vite build",
  "preview": "vite preview --host",
  "check": "tsc --noEmit",
  "format": "prettier --write ."
}
```

### Pruned Dependencies
Remove server-side and database packages from `"dependencies"` and `"devDependencies"`:
- `@trpc/*`, `express`, `drizzle-orm`, `mysql2`, `ws`, `superjson`

---

## Step 4: Configuring Vite and Static Asset Output

The `vite.config.ts` file must be simplified to use the standard static template configuration, removing any custom middleware proxies designed for backend routing.

1. **Output Directory:** Vite defaults to outputting optimized static assets into the `dist/` directory, which is immediately compatible with static hosting providers (Netlify, Vercel, GitHub Pages, or Manus static hosting).
2. **Path Aliases:** Ensure TypeScript path aliases (`@/*` mapping to `client/src/*`) remain intact in `tsconfig.json` so that all component imports continue working without modification.

---

## Step 5: Validation and Testing Sequence

Before publishing the converted static site, execute the following validation steps:

1. **Install Clean Dependencies:** Run `pnpm install` after updating `package.json` to purge unused server node modules.
2. **Type Check:** Run `pnpm check` (`tsc --noEmit`) to verify that no orphaned imports or missing type definitions remain in the client codebase.
3. **Production Build Test:** Run `pnpm build` to confirm that Vite successfully generates the static `dist/` bundle without errors.
4. **Local Preview:** Run `pnpm preview` to test the production static bundle locally in the browser, verifying that form submissions, navigation, and styling operate correctly.

References:
- [Web App Template (Static Frontend) Guide] (/home/ubuntu/skills/webdev-readme-static/SKILL.md)
