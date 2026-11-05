<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# social-dev

SocialServe — Next.js 16 App Router app (JavaScript/JSX, no TypeScript) with shadcn components vendored under `src/components/ui`. The README is stale create-next-app text; trust `package.json` and this file.

## Commands

- Use npm (`package-lock.json` is the lockfile).
- `npm run dev` (Turbopack), `npm run build`, `npm run lint`.
- No test runner and no typecheck script (project is plain JS/JSX). Verify changes with `npm run lint` then `npm run build`.
- `npm run lint` is bare `eslint` over the repo; focus it with `npx eslint src/app/page.js`.
- Lint currently exits 1 on two pre-existing `react-hooks/set-state-in-effect` errors in vendored shadcn code (`src/components/ui/carousel.jsx:74`, `src/hooks/use-mobile.js:14`) plus a pre-existing `@next/next/no-img-element` warning in `src/app/events/[id]/page.jsx`. Don't treat these as regressions; `npm run build` passes despite them.

## Environment variables

- `.env*` is gitignored and there's no `.env.example`. Working locally requires:
  - `MONGODB_URL` — read only on the server in `src/lib/auth.jsx`. The `MongoClient` is constructed at module top level, so importing `@/lib/auth` without it set throws at runtime, not import-resolve time.
  - `BETTER_AUTH_URL` — used by the client `src/lib/auth-client.jsx`.

## Architecture dependencies

- **Auth is in this repo** (better-auth + MongoDB): server config `src/lib/auth.jsx` (email+password, db `socialDevDB`), client `src/lib/auth-client.jsx`, catch-all route handler `src/app/api/auth/[...all]/route.jsx`. Only these wire up auth — no sessions/middleware exist elsewhere yet.
- **Events data comes from the sibling backend at `../../socialdev-server`** (Express 5, run with `node index.js`; see the root `AGENTS.md`). Endpoints used: `GET/PATCH/DELETE /events/:id` and `GET /events`, plus `POST /add-event` (note: not `/events`). This URL is hardcoded in several files (`src/app/events/page.jsx`, `src/app/events/[id]/page.jsx`, `src/app/add-event/page.jsx`, `src/components/edit-event.jsx`, `src/components/delete-event.jsx`). Pages catch fetch failure and show empty states, so a missing backend doesn't crash the app — it just shows nothing.
- Event shape is defined by the backend: `_id`, `coverUrl`, `publish`, `status`, `startAt`, `location`, `organization`, `createdBy` (creator email, set by `add-event`), `joinedUsers` (array of joining member emails). Only `publish !== false` events appear in the public lists.
- **Ownership / joining flow**: mutating calls (`add-event`, join/leave, `PATCH`/`DELETE`) send `Authorization: Bearer <token>` and the Express server enforces identity from the verified JWT — creator-only update/delete by comparing `req.user.email` to `event.createdBy` (403 on mismatch, 401 without a token). Legacy events without `createdBy` stay editable. Joining/leaving is `POST/DELETE /events/:id/join` with the token identifying the user. Owner-gating in the UI is `authClient.useSession()` + `event.createdBy === user.email` — see `src/components/edit-event.jsx`, `src/components/delete-event.jsx`, `src/components/join-event.jsx`. Private pages `/joined-events` and `/manage-events` (both already linked from the navbar) are guarded by `src/proxy.js` (cookie check → redirect `/login`) and client-side session guards; the backend filters with `?joinedBy=` / `?createdBy=`.

## Token access helpers

JWTs are fetched from better-auth's `GET /api/auth/token` (session cookie → `{ token }`). Helpers live in two files and must not be mixed:
- `src/lib/session.js` — **client-safe** (`getAccessTokenClientSide`, `getAuthHeaders`). "use client" components import only this. Do NOT import `src/lib/auth` here or client bundles break (mongodb is server-only).
- `src/lib/session.server.js` — **server-only** (`getAccessTokenServerSide` via `next/headers` + `auth.api.getToken`). Server components import only this; `next/headers` in any client-imported file fails the build.

## Framework layout

- App Router only. Routes in `src/app`: `/` landing, `/events` list, `/events/[id]` detail, `/uc-events` upcoming-only (future `startAt`, server-filtered/sorted client-side), `/joined-events` and `/manage-events` (private, client-guarded), `/add-event`, `/login`, `/signup`.
- Server-component pages (`events`, `events/[id]`) fetch with `cache: "no-store"` and `try/catch`; client pages (`login`, `signup`, `add-event`, navbar) use `"use client"` + `authClient`.
- `@/*` maps to `src/*` (`jsconfig.json`). shadcn aliases: `@/components`, `@/components/ui`, `@/lib`, `@/hooks`.
- `src/components/navbar.jsx` and `src/components/footer-top.jsx` also link to `/events/create`, which has no route — the actual create-event route is `/add-event`. Existing dead links, not a convention to follow.
- React Compiler is enabled (`reactCompiler: true` in `next.config.mjs`), so memoization is automatic — don't add manual `useMemo`/`useCallback` by default, and keep components compiler-safe (no prop/state mutation).
- Dark mode is class-based: `src/components/theme-toggle.jsx` toggles `.dark` on `<html>` (persisted in `localStorage.theme`, restored pre-paint by the inline script in `app/layout.js`). Hardcoded `slate`/`white` utilities are re-mapped for dark at the bottom of `globals.css` — but prefer token utilities (`bg-card`, `text-muted-foreground`) in new code.
- The landing page's Featured Events section (`src/components/featured-events.jsx`) is a server component that fetches the protected `GET /featured` API with the JWT from `session.server.js`.

## UI conventions

- shadcn config is the `base-nova` style with `tsx: false` (`components.json`): generated components are `.jsx`. Add new ones with `npx shadcn@latest add <component>`; don't hand-port Radix examples.
- Primitives are `@base-ui/react` (no Radix installed). There is no `asChild`; compose markup with the `render` prop, e.g. `<DialogPrimitive.Close render={<Button variant="outline" />}>`.
- Class merging uses the npm `cn` package (compiled clsx + tailwind-merge): `import { cn } from "cn"`. `src/lib/utils.js` only re-exports it, so match the components and import from `"cn"`.
- Interactive primitives are client components (`"use client"`); keep `src/app` files as server components unless state/effects are needed.

## Styling

- Tailwind v4 CSS-first: there is no `tailwind.config` file. Theme tokens and radius/color vars live in `src/app/globals.css` (`@theme inline`, `:root`, `.dark`).
- `next.config.mjs` routes every `*.css` through the `@tailwindcss/turbopack` loader; there is no PostCSS config. Don't remove that Turbopack rule or the imports in `globals.css` (`tailwindcss`, `tw-animate-css`, `shadcn/tailwind.css`).
- Reuse existing tokens/utilities (`bg-background`, `text-muted-foreground`, `--radius-*`). Dark mode is class-based via `@custom-variant dark`.

## Code highlighting

- Shiki loads lazily in `src/lib/highlighter.jsx` and only supports languages listed in its `languages` map (bash, css, diff, html, javascript, json, jsx, markdown, python, sql, tsx, typescript, yaml — with common aliases). Add the language import (plus any alias) there before passing it to `useHighlightedCode` or `highlightCode`.
