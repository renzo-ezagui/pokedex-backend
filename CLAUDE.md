# CLAUDE.md — pokedex-backend

REST API serving a bundled, static Pokedex dataset (809 Pokemon, Gen 1-7: names in
4 languages, types, base stats). No upstream API calls at request time — the
dataset (`src/data/pokedex.json`, sourced from the public
[`Purukitto/pokemon-data.json`](https://github.com/Purukitto/pokemon-data.json) repo)
is baked into the Docker image. Sprites/artwork are linked (not bundled) from
PokeAPI's public sprite CDN, keyed by National Pokedex id.

Consumed by [`pokedex-frontend`](https://github.com/renzo-ezagui/pokedex-frontend).

## Stack

Node 20, TypeScript, Express. No database — data lives in a JSON file loaded into
memory at startup. See `README.md` for endpoint list and local dev commands.

## Deploy — Coolify

Project `pokedex` (uuid `5y2ecwnybhakouc3kpuotbhf`), app uuid
`cqxnwkhj1t2puskwxhkqrgmd`, `dockerfile` build pack, created via the `public` repo
flow (repo is public — see "Repo visibility" below). Domain: `http://pokedex-api.lan`
(internal) + `http://pokedex-api.ezagui.dev` (public, via the shared
`homelab-dashboard` Cloudflare tunnel).

```bash
coolify app deploy cqxnwkhj1t2puskwxhkqrgmd
coolify app logs cqxnwkhj1t2puskwxhkqrgmd
```

### Repo visibility

Made public 2026-09-30 (was created private by the initial bootstrap). No secrets/PII
in this repo (bundled public Pokemon dataset), and `pokedex-backend`/`pokedex-frontend`
naming (no `homelab-` prefix) follows the same pattern as `poker-planning-backend`/
`-frontend` and `playground-birds` — both public repos using Coolify's simpler
`app create public` flow, which skips the private-repo GitHub App dance
(`services/coolify/CLAUDE.md` → "Private repos — GitHub App"). Flip back to private
only if a reason to do so comes up — would then require adding both repos to the
`renzo-ezagui-homelab` GitHub App installation (browser-only flow, no CLI path) and
recreating both apps with `coolify app create github`.

### Public domain routing

`pokedex.ezagui.dev`/`pokedex-api.ezagui.dev` route through Traefik's own
`*.lan`/`*.ezagui.dev` wildcard — no per-domain config needed. Verify with a real
request, not just `curl -I`: a domain nothing routes returns an empty `200`, not a
404, so status code alone can look like success when it isn't.

## Acceso externo

Público en `https://pokedex-api.ezagui.dev` (Cloudflare Tunnel `homelab-dashboard`,
TLS termina en el edge de Cloudflare).

## Skills recomendadas

- `caveman` / `cavecrew` — builder/investigator/reviewer para cambios de código
- `claude-api` — si en algún momento se agrega lógica basada en un LLM (no aplica hoy)

## Cómo trabajar aquí

Ver `references/working-conventions.md` en la skill `homelab-new-project`. Resumen:

- Claude no commitea ni hace deploy sin autorización explícita — el usuario corre
  `coolify app deploy PENDING` en el flujo normal
- Crear branch antes de modificar: `git checkout -b feat/<descripcion>`
- Cambios de datos: backend primero, frontend (`pokedex-frontend`) después
