import {HttpAdapter} from '@config/adapters/http/http.adapter';
import {Pokemon} from '@domain/entities/pokemons';
import type {
  PokeAPIPokemon,
  PokemonResponse,
} from '@infrasctructure/interfaces/poke-api.responses';
import {PokemonsMapper} from '@infrasctructure/mapper/pokemons.mapper';

export const getPokemon = async (
  fetcher: HttpAdapter,
  page: number,
  limit: number,
): Promise<Pokemon[]> => {
  try {
    const {results} = await fetcher.get<PokemonResponse>(
      `/pokemon?offset=${page * 10}&limit=${limit}`,
    );

    const pokemonPromises = results.map(async info => {
      return fetcher.get<PokeAPIPokemon>(info.url);
    });

    const pokeApiPokemons = await Promise.all(pokemonPromises);
    const pokemons = pokeApiPokemons.map(pokemon =>
      PokemonsMapper.fromPokemonApiToPokemon(pokemon),
    );

    return pokemons;
  } catch (error) {
    throw new Error(`Error fetching pokemons`);
  }
};
