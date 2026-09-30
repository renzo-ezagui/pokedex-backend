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

Project `pokedex`, app uuid `PENDING`, `dockerfile` build pack. Domain:
`http://pokedex-api.lan` (internal) + `http://pokedex-api.ezagui.dev` (public, via
the shared `homelab-dashboard` Cloudflare tunnel).

```bash
coolify app deploy PENDING
coolify app logs PENDING
```

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
