import {Pokemon} from '@domain/entities/pokemons';
import {getPokemonById} from './get-pokemon-by-id.use-case';
import {pokeApiFetcher} from '@config/adapters/pokeAPI.adapter';

export const getPokemonsByIds = async (ids: number[]): Promise<Pokemon[]> => {
  try {
    const pokemonPromises = ids.map((id: number) => {
      return getPokemonById(pokeApiFetcher, id);
    });

    return Promise.all(pokemonPromises);
  } catch (error) {
    throw new Error(`Error fetching pokemons`);
  }
};
