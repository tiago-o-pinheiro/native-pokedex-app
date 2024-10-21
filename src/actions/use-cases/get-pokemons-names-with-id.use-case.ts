import {pokeApiFetcher} from '@config/adapters/pokeAPI.adapter';
import {PokemonResponse} from '@infrasctructure/interfaces/poke-api.responses';

interface SearchResponse {
  id: number;
  name: string;
}

export const getPokemonNamesWithId = async (): Promise<SearchResponse[]> => {
  console.log('calling getPokemonNamesWithId');
  const url = `pokemon?limit=1000`;
  const result = await pokeApiFetcher.get<PokemonResponse>(url);

  return result.results.map(pokemon => ({
    id: Number(pokemon.url.split('/')[6]),
    name: pokemon.name,
  }));
};
