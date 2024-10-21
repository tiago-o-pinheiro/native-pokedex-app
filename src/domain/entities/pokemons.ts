import {Move, Stat} from '@infrasctructure/interfaces/poke-api.responses';
import {PokemonSpecies} from './pokemon-species';
import {PokemonEvolution} from './pokemon-evolution';
import {PokemonMoves} from './pokemon-moves';

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
  moves: Move[];
  color?: string;
  baseExperience: number;
  height: number;
  stats: Stat[];
  weight: number;
  species?: PokemonSpecies;
  evolution?: PokemonEvolution[];
}
