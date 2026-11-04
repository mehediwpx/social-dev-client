<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# social-dev

Next.js 16 App Router UI scaffold with shadcn components already vendored. There is no backend, API route, auth, or persistence layer yet — don't assume one exists. The README is the stock create-next-app text and is stale; trust `package.json` and this file (real code lives under `src/`).

## Commands

- Use npm (`package-lock.json` is the lockfile).
- `npm run dev` (Turbopack dev server), `npm run build`, `npm run lint`.
- No test runner and no separate typecheck script: the project is JavaScript/JSX only (no TypeScript). Verify changes with `npm run lint` then `npm run build`.
- `npm run lint` is bare `eslint` over the repo; focus it with `npx eslint src/app/page.js`.
- Lint currently fails on two pre-existing `react-hooks/set-state-in-effect` errors in vendored shadcn code: `src/components/ui/carousel.jsx:74` and `src/hooks/use-mobile.js:14`. Don't treat them as regressions; `npm run build` passes despite them.

## Framework layout

- App Router only. Routes and layouts go in `src/app`; the current root layout is `src/app/layout.js`.
- `@/*` maps to `src/*` (`jsconfig.json`). shadcn aliases: `@/components`, `@/components/ui`, `@/lib`, `@/hooks`.
- React Compiler is enabled (`reactCompiler: true` in `next.config.mjs`), so memoization is automatic — don't add manual `useMemo`/`useCallback` by default, and keep components compiler-safe (no prop/state mutation).

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

- Shiki loads lazily in `src/lib/highlighter.jsx` and only supports languages listed in its `languages` map. Add the language import (plus any alias) there before passing it to `useHighlightedCode` or `highlightCode`.
