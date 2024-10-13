export interface PokemonType {
  name: string;
  url: string;
}

export interface Pokemon {
  id: number;
  name: string;
  types: PokemonType[];
  avatar: string;
  sprites: string[];
  //color: string;
}
