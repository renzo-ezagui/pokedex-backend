# pokedex-backend

REST API serving a static, bundled Pokedex dataset — 809 Pokemon (Gen 1-7), name
(EN/JP/CN/FR), types and base stats. No external API calls at request time: the
dataset lives in `src/data/pokedex.json` and is baked into the Docker image.

Data source: [`Purukitto/pokemon-data.json`](https://github.com/Purukitto/pokemon-data.json)
(`pokedex.json`), a commonly used public Pokemon dataset. Sprites/artwork are
referenced (not bundled) from PokeAPI's public sprite CDN
(`raw.githubusercontent.com/PokeAPI/sprites`), keyed by the same National Pokedex id.

## Endpoints

- `GET /health` — `{ status, pokemonLoaded }`
- `GET /api/pokemon?q=<name>&type=<type>&page=<n>&limit=<n>` — paginated list
  (summary: id, name, type, sprite url). `limit` max 100, default 24.
- `GET /api/pokemon/types` — array of all Pokemon types (for a filter dropdown)
- `GET /api/pokemon/:id` — full detail (all localized names, base stats, stat total,
  sprite + official artwork urls)

## Local dev

```bash
npm install
npm run dev      # tsx watch, :3000
```

## Build

```bash
npm run build     # tsc + copies src/data/pokedex.json into dist/data/
npm start
```

## Docker

```bash
docker build -t pokedex-backend .
docker run -p 3000:3000 pokedex-backend
```
