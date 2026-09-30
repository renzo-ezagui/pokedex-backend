import raw from "./data/pokedex.json";
import { RawPokemon, PokemonDetail, PokemonSummary } from "./types";

// Sprite CDN: PokeAPI's own sprites repo, public and stable, indexed by
// National Pokedex id (matches this dataset's `id` field 1:1).
const SPRITE_BASE =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";

function sprite(id: number): string {
  return `${SPRITE_BASE}/${id}.png`;
}

function artwork(id: number): string {
  return `${SPRITE_BASE}/other/official-artwork/${id}.png`;
}

function toSummary(p: RawPokemon): PokemonSummary {
  return {
    id: p.id,
    name: p.name.english,
    type: p.type,
    sprite: sprite(p.id),
  };
}

function toDetail(p: RawPokemon): PokemonDetail {
  const b = p.base;
  const total =
    b.HP + b.Attack + b.Defense + b["Sp. Attack"] + b["Sp. Defense"] + b.Speed;
  return {
    ...toSummary(p),
    names: p.name,
    stats: {
      hp: b.HP,
      attack: b.Attack,
      defense: b.Defense,
      spAttack: b["Sp. Attack"],
      spDefense: b["Sp. Defense"],
      speed: b.Speed,
      total,
    },
    artwork: artwork(p.id),
  };
}

const pokemonById = new Map<number, RawPokemon>(
  (raw as RawPokemon[]).map((p) => [p.id, p]),
);

export const ALL_SUMMARIES: PokemonSummary[] = (raw as RawPokemon[]).map(
  toSummary,
);

export const ALL_TYPES: string[] = Array.from(
  new Set((raw as RawPokemon[]).flatMap((p) => p.type)),
).sort();

export function getDetail(id: number): PokemonDetail | undefined {
  const p = pokemonById.get(id);
  return p ? toDetail(p) : undefined;
}

export function count(): number {
  return pokemonById.size;
}
