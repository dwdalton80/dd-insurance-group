# Converting D&D Insurance Group to a Static Site: Assessment and Architecture Guide

Converting the current full-stack tRPC and Drizzle-backed application for **D&D Insurance Group** into a pure static site (`web-static`) involves transitioning from server-driven database queries, authentication sessions, and backend API routers to a client-rendered architecture. While static sites offer exceptional performance, zero hosting database costs, and effortless deployment, moving away from a full-stack architecture requires rethinking how dynamic features such as booking submissions, administrative dashboards, and email notifications are handled.

## Architectural Trade-Offs and Functional Impact

When shifting from the current Express/tRPC full-stack setup to a static architecture, several core capabilities change fundamentally. Understanding these trade-offs is essential before initiating the migration.

| Feature / Subsystem | Current Full-Stack Implementation | Static Site Equivalent / Impact |
| :--- | :--- | :--- |
| **User Authentication** | Manus OAuth session cookies, database-backed `users` table, and role-based permissions (`admin` vs. `user`). | **Removed or Replaced:** Public pages require no auth. If admin capabilities are needed, they must rely on client-side third-party authentication services (e.g., Supabase Auth or Auth0) or be managed externally. |
| **Booking & Compliance Flow** | PostgreSQL/TiDB database table storing appointments, HIPAA-compliant conditional routing, and automated Sunfire Purl redirection. | **Client-Side Form Service:** Form submissions must be redirected to third-party form endpoints (such as Formspree, Netlify Forms, or EmailJS) or triggered via client-side webhook fetch calls. |
| **Admin Dashboard** | Protected tRPC procedures querying Drizzle ORM to manage bookings, adjust calendar availability, and update global settings. | **Eliminated on-site DB:** The admin panel cannot query an internal database directly. It must be replaced by a third-party CRM dashboard or headless CMS (e.g., Airtable, Notion, or Supabase). |
| **Automated Emails & iCal** | Server-side Nodemailer integration dispatching branded HTML emails and calendar invites upon booking confirmation. | **Third-Party Automation:** Email dispatching shifts to form-backend providers or serverless triggers (e.g., Zapier or Make webhooks connected to SendGrid). |
| **AI Agent Webhooks** | Background Express server execution dispatching JSON payloads (`name`, `email`, `phone`, `appointment_date`, `notes`) to Railway. | **Direct Client Webhook / API Gateway:** Client-side JavaScript can execute `fetch()` directly to the Railway endpoint, provided CORS is enabled on the receiving server. |

---

## Technical Requirements for Static Conversion

To transform the project into a pure static site adhering to the `web-static` template specification, specific structural modifications must be executed across the repository.

### 1. Removal of Server and Database Infrastructure
The entire `server/` directory (excluding shared type definitions) and Drizzle configuration files (`drizzle/`, `drizzle.config.ts`) must be retired. The Express server entry point (`server/index.ts`) and tRPC routers (`server/routers.ts`) are eliminated, as a static site is served purely as pre-built HTML, CSS, and client-side JavaScript bundles by static hosting providers (such as Vercel, Netlify, or Manus static publishing).

### 2. Refactoring Data Fetching and Mutations
All components currently invoking `trpc.*.useQuery` or `trpc.*.useMutation` must be refactored:
- **Static Content:** Content such as agent bios, educational articles, and FAQ accordions are embedded directly into React page components as static JSON data arrays or TypeScript constants.
- **Booking Submissions:** The interactive booking form (`BookingForm.tsx`) must be updated to handle submissions either by posting directly to an external form handler or by executing an asynchronous `fetch()` request to the Railway AI agent webhook and a notification service.

### 3. Build Configuration and Routing Updates
The build script in `package.json` simplifies from a dual server/client bundle process to a standard Vite static build (`vite build`), outputting optimized static assets into a `dist/` directory. Client-side routing is handled entirely by Wouter or React Router with fallback routing rules configured for single-page application (SPA) hosting.

---

## Recommended Implementation Roadmap

Executing the conversion safely without disrupting existing branding, visual design, or core public-facing lead generation requires a structured sequence:

1. **Audit Public Pages:** Verify that all public-facing pages (`Home.tsx`, `Medicare.tsx`, `About.tsx`, `Contact.tsx`) are entirely self-contained and do not depend on `ctx.user` or server-side database queries for rendering core educational content.
2. **Implement Form Action Handlers:** Replace tRPC booking mutations with direct client-side form submission handlers utilizing secure third-party endpoints or direct webhook dispatches.
3. **Clean Up Project Manifest:** Remove server dependencies, Express middleware, and database drivers from `package.json`, and prune the file tree to match the clean static template layout.
4. **Build and Validate:** Run `pnpm build` to ensure the Vite compiler successfully generates static assets without TypeScript errors or missing imports.

References:
- [Web App Template (Static Frontend) Guide] (/home/ubuntu/skills/webdev-readme-static/SKILL.md)
