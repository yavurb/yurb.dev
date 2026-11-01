# yurb.dev

Roy's personal site and blog — Astro 7 + Tailwind 4, server output on Vercel. Node 26 locally and in CI (`.nvmrc`); Vercel functions run on Node 24 (it has no 26 runtime yet), hence `engines: ">=24"`. Content comes from Roy's backend API (posts, projects) plus local data files.

Branch `redesign/index-log` holds the redesign described below. It is **not pushed yet**; don't push, force-push or open PRs unless Roy asks.

## Commands

```bash
pnpm install
pnpm dev        # Astro dev server (port 4321)
pnpm check      # astro check — CI runs this on every push
pnpm build
```

pnpm is the only package manager (`packageManager` in `package.json`, `pnpm-lock.yaml`); don't add npm or yarn lockfiles. pnpm blocks install scripts unless approved: `pnpm-workspace.yaml` approves `sharp` and `esbuild`. If images stop loading in dev, sharp lost its native binary — run `pnpm rebuild sharp`.

Env (`.env`): `BACKEND_URL`, `BACKEND_APIKEY` (backend API), `SITE_URL`. Optional `MOCK_POSTS` (dev only, see below).

## Design: "Index log" (decided — keep to it)

Swiss/editorial typography merged with a git build-log metaphor.

- **Type**: Archivo variable, condensed via `font-stretch: 75%`, weight 800, uppercase for display (`.display`); JetBrains Mono uppercase for labels/metadata (`.label`).
- **Color (Cobalt palette)**: tokens are RGB channels in `src/styles/tailwind.css`, mapped to Tailwind colors by the `@theme inline` block in the same file (`bg`, `fg`, `muted`, `rule`, `surface`, `accent`, `on-accent`, `code-*`). Light: accent `#1F3BFF` on `#F5F5F3`. Dark: accent `#7B8CFF` on `#0F1012`, dark text on accent blocks. Use tokens, never hard-coded hex in components.
- **Theme**: light by default, dark from `prefers-color-scheme`, overridden by the toggle (`data-theme` on `<html>`, saved in `localStorage.theme`, applied before paint by the inline script in `Layout.astro`).
- **Shapes**: 2px `fg` rules between sections, 1px `rule` hairlines, square timeline markers, no rounded corners, no shadows except the game overlay. `.paper` = grid-paper background.
- **Voice**: first person ("I build what you don't see"). Git/terminal metaphors: `$ git log`, HEAD, `(root commit)`, `git push origin hello`.
- **Accessibility**: text ≥ 4.5:1 contrast, targets ≥ 44px, `prefers-reduced-motion` respected everywhere (smooth scroll, flashes, animations).
- Sections are numbered `00 Whoami · 01 Log · 02 Writing · 03 Contact`, matching the nav.

The original design canvas lives in a claude.ai artifact Roy owns (not reachable from here).

## Code map

- `src/layouts/Layout.astro` — fonts, theme script, `Header`, `Footer`, `EasterEgg`.
- `src/components/Header.astro` — numbered nav, theme toggle; on `/` it smooth-scrolls same-page links, flashes the section number on arrival (`.section-index.is-arriving`) and runs a scroll-spy (`data-spy` / `data-active`).
- `src/components/LogEntry.astro`, `SectionHeading.astro`, `ThemeToggle.astro`, `Footer.astro`.
- `src/lib/fetch-api.ts` — backend client (returns `defaultReturn` on errors).
- `src/lib/posts.ts` — `getPosts()` / `getPost()`. In `astro dev` only, falls back to `src/data/mock-posts.ts` when the API returns nothing (`MOCK_POSTS=true` forces, `false` disables). Mock titles start with `[Mock]`; never used in production.
- `src/lib/log.ts` — `buildLog()` merges posts, projects and `presentation.milestones` into the home timeline.
- `src/data/presentation.ts` — hero headline/intro, stack, socials, site milestones.
- `src/data/whoami.ts` — all `/whoami` content (from Roy's LinkedIn + his corrections). Photo is `src/assets/roy.jpg` via `astro:assets`.
- `src/pages/` — `index.astro`, `whoami.astro`, `posts/index.astro`, `posts/[id].astro` (marked + Prism; h2s get ids, `01/02…` numbers and feed the on-this-page nav; missing posts → 404).
- `src/styles/post.css` — article typography; `prism.css` — code colors.

## Packet Pong (Easter egg) — Roy is coding the game himself

Don't implement the game unless Roy asks; help him with it.

- UI shell: `src/components/egg/EasterEgg.astro` — a `<dialog>`, always dark. Opened by typing `play` (outside inputs), the Konami code, clicking `(root commit)` on home (`[data-egg-open]`), or `/#play` (`/#play=OCTO-4F2A` opens Join prefilled). Screens: boot, host, join, match, over, error.
- Contract: `src/game/packet-pong/types.ts` — the game implements `host(emit)`, `join(code, emit)`, `mount(container)`, `rematch()`, `destroy()` and emits `room | status | connected | rtt | score | over | error` events; the UI only reacts to events.
- `src/game/packet-pong/index.ts` — `createGame()` returns `null` → the mock in `mock.ts` drives every screen. Returning Roy's implementation replaces the mock.
- Agreed game design: host-authoritative physics (~60 Hz), guest sends paddle position; snapshots over an unreliable/unordered data channel (~20–30 Hz), events over a reliable one; guest predicts its own paddle and interpolates the ball (~100 ms). First to 7. Signaling server still undecided (WebSocket in `goyurback` vs. a Vercel function); public STUN, no TURN for now.

## Open items

- `whoami.ts`: "Off the clock" and the "Building" extras are still `[placeholders]`; `cvUrl` is empty (hides the CV button).
- Not yet on `/whoami`: "Mexico's first automated invoicing AI agent" (LinkedIn) — unclear whether it is the same product as the expense-invoicing one; and the voucher image classification (image embeddings in Qdrant) — role not confirmed. Ask Roy before placing either.
- `presentation.ts`: the "yurb.dev v1" milestone date is a placeholder (`TODO(roy)`).
- `src/assets/profile.png` (old circular avatar, 1.3 MB) is unused — delete only if Roy confirms.
- `.github/workflows/deploy.yaml` is untracked on purpose: it deploys to Vercel production on push to `main` and writes certs from secrets. Roy decides whether to commit it.
- Local `origin` points at `git@github.com:yavurb/yurb.git`; the GitHub repo is `yavurb/yurb.dev` — check before pushing.
- The branch has many small commits; Roy may want them squashed before the PR.

## Conventions

- Content lives in `src/data/*`; components stay content-free.
- Unknown facts stay as `[bracketed placeholders]` — never invent Roy's experience, dates or numbers.
- Tags are lowercase (`+go +postgresql`).
- Verify with `pnpm check` and `pnpm build` before calling something done; check pages at phone width (no horizontal scroll) and in both themes.
