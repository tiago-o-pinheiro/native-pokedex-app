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
  limit: number = 10,
): Promise<Pokemon[]> => {
  try {
    const {results} = await fetcher.get<PokemonResponse>(
      `/pokemon?offset=${page * 10}&limit=${limit}`,
    );

    const pokemonPromises = results.map(async info => {
      return fetcher.get<PokeAPIPokemon>(info.url);
    });

    const pokeApiPokemons = await Promise.all(pokemonPromises);
    const pokemonsPromises = pokeApiPokemons.map(pokemon =>
      PokemonsMapper.fromPokemonApiToPokemon(pokemon),
    );

    return await Promise.all(pokemonsPromises);
  } catch (error) {
    throw new Error(`Error fetching pokemons`);
  }
};
