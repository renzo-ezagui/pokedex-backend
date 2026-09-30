export interface RawPokemon {
  id: number;
  name: {
    english: string;
    japanese: string;
    chinese: string;
    french: string;
  };
  type: string[];
  base: {
    HP: number;
    Attack: number;
    Defense: number;
    "Sp. Attack": number;
    "Sp. Defense": number;
    Speed: number;
  };
}

export interface PokemonSummary {
  id: number;
  name: string;
  type: string[];
  sprite: string;
}

export interface PokemonDetail extends PokemonSummary {
  names: RawPokemon["name"];
  stats: {
    hp: number;
    attack: number;
    defense: number;
    spAttack: number;
    spDefense: number;
    speed: number;
    total: number;
  };
  artwork: string;
}
