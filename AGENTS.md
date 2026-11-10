# AGENTS.md

## Commands

| Action | Command |
|--------|---------|
| Develop | `npm run dev` |
| Build | `npm run build` |
| Start | `npm run start` |
| Lint | `npm run lint` |
| Format | `npm run format` |

## Path Aliases

- `@/` prefix resolves to `src/` (configured in `tsconfig.json`)

## Framework

- **Next.js 16** with App Router (`src/app/`)
- **React 19**
- **React Compiler** enabled in `next.config.ts` — don't manually transform JSX/optimizations
- **Tailwind CSS v4** — styles processed via `@tailwindcss/turbopack` (no custom webpack loader needed)
- `next/font` is used for optimizing `Geist` font — do not self-host or re-link fonts

## Linting & Formatting

- Powered by **Biome** (`@biomejs/biome`)
- `npm run lint` runs the linter (recommended rules for Next.js + React)
- `npm run format` runs Biome format (space indent, width 2)
- Runs **automatically** on commit via Biome's VCS integration — no pre-commit hook needed

## UI Components

- Uses **shadcn/ui** component library (`src/components/ui/`)
- Component variants use `cn()` from `class-variance-authority` for Tailwind class merging
- Do not rename or restructure `ui/` components without checking for `cn()` usage patterns

## No Tests in this Project

- There are **no test files** under `src/` or at the repo root
- If testing is needed, add fixtures/tests under an appropriate test directory — no existing framework configured

## Environment & Dev Server

- Dev server runs on `http://localhost:3000` (Turbopack)
- CSS is handled by Tailwind v4 + `@tailwindcss/turbopack` — no `.css` imports needed in `app/` beyond `globals.css`
- Images under `src/assets/` are served statically; use Next.js `next/image` or relative `<img>` tags
- **Custom error pages**: `src/app/not-found.tsx` — 404 page with shadcn/ui Empty component and navigation
- **Custom loading state**: `src/app/loading.tsx` — skeleton-based spinners displayed during data fetching

## What to Verify Before Committing

1. Run `npm run format` to format all files
2. Run `npm run lint` to check for lint errors
3. Run `npm run build` to verify a successful production build