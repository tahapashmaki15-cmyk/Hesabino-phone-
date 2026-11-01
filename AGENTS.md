# NETYAR — project notes for future sessions

## What this repo is
Marketing landing page for **NETYAR / نت‌یار** ("دستیار هوشمند کافی‌نت‌داران"), plus a
preserved static app that shipped before it.

- `index.html` + `src/` — NETYAR landing page (Vite + React 19 + Tailwind v4, RTL, Persian).
- `public/app/` — the previous standalone ledger app (دفتر دخل و خرج). It is a
  self-contained pre-built bundle and stays functional at **/app/**. Do not delete it
  as part of landing-page work.

## Running it (sandbox)
```bash
docker compose -f docker-compose.base44.yml up -d
curl -sI http://localhost:3000/        # landing page
```
The `web` service is `node:22-slim`, bind-mounts the repo, keeps `node_modules` in a
named volume, and runs `npm install && npm run dev` (Vite dev server on 3000).

## Non-obvious things
- `/app/` must serve the ledger app, not the landing page. Vite's SPA fallback would
  answer it with the landing page, so `vite.config.js` rewrites `/app` and `/app/` to
  `/app/index.html` (`preservedAppRoute` plugin, dev + preview). If `/app/` returns
  ~1.3 KB instead of the ~1.5 MB ledger bundle, that rewrite is missing/broken.
- Sandbox-only behavior is gated on `BASE44_PREVIEW_MODE === '1'`: Vite watches with
  polling (bind mounts don't emit inotify reliably). Unset, Vite uses normal watching.
- Host allowlisting uses the platform-provided `__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS`
  (passed through compose); no host names are hardcoded.
- Design tokens (navy/orange palette, glass/edge-glow/grid utilities, keyframes) live in
  `src/index.css` under `@theme` / `@layer`. Change the palette there, not per component.
- Pricing shows an intentional dashed **«مبلغ پلن»** placeholder — real prices were not
  provided. Same for `info@netyar.ir`, which is a placeholder to be replaced.
- Login/signup and legal links currently point at on-page anchors (`#pricing`, `#`) —
  no auth or backend exists yet by design.

## Verification
- `curl -s http://localhost:3000/ | grep -c 'id="root"'` → 1
- `curl -s http://localhost:3000/app/ | wc -c` → ~1.5 MB and contains «دفتر دخل و خرج»
- `docker compose -f docker-compose.base44.yml logs web` should show Vite ready + no
  compile errors after `vite.config.js` changes (Vite restarts itself).
- No test suite or linter is configured in this repo yet.
