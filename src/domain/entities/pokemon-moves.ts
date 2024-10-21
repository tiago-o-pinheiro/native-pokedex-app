import {Name} from '@infrasctructure/interfaces/poke-api-moves.responses';

interface Effect {
  effect: string;
  language: string;
}

export interface PokemonMoves {
  names: Name[];
  effect: Effect[];
}
