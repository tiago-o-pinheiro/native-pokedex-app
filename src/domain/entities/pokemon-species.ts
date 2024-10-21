import {
  FlavorTextEntry,
  Genus,
} from '@infrasctructure/interfaces/poke-api-species.responses';

export interface PokemonSpecies {
  happiness: number;
  description: FlavorTextEntry[];
  evolutionChain: string;
  isBaby: boolean;
  isLegendary: boolean;
  isMythical: boolean;
  genera: Genus[];
}
