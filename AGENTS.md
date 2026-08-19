# Base44 Dev Environment

This repo runs as a TanStack Start (Vite SSR) app. There is no local database — it talks to a hosted Supabase project.

## Run

```sh
docker compose -f docker-compose.base44.yml up -d
```

- Web entry: http://localhost:3000 (mapped from container port 3000)
- Base image: `node:22-slim`, source bind-mounted at `/app`, deps installed at startup via `npm install`
- Dev server: `vite dev --host 0.0.0.0 --port 3000` (live reload on edits)
- `node_modules` kept in an anonymous volume so the bind mount doesn't clobber it

## Environment / Secrets

- The repo's `.env` carries the Supabase **publishable** keys (`SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, and `VITE_*` copies). These are public/safe and loaded via compose `env_file: ./.env`.
- Two real secrets are delivered by the platform to `/run/base44/app.env` (listed last in `env_file` so they win):
  - `LOVABLE_API_KEY` — required by the `/api/chat` route (the chat assistant widget). Without it the chat endpoint returns 500.
  - `SUPABASE_SERVICE_ROLE_KEY` — used only by the server-side admin client in the `regenerate-category-summary` webhook. Not needed to view the site.

## Quirks

- `vite.config.ts` uses `@lovable.dev/vite-tanstack-config`, which bundles its own plugins (TanStack devtools, react, tailwind, tsconfig paths, nitro, sandbox port/host detection). Do NOT add those plugins manually.
- `server: { allowedHosts: true }` is already set in `vite.config.ts`, so the preview's external hostname is accepted.
- `src/server.ts` is the SSR entry (error-wrapper) wired via `tanstackStart.server.entry`.
- `schema.sql` is empty; the real schema lives in `supabase/migrations/`.

## Verify

```sh
curl -sf http://localhost:3000/ -o /dev/null -w "%{http_code}\n"   # expect 200
```
