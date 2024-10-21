import {HttpAdapter} from '@config/adapters/http/http.adapter';
import {Pokemon} from '@domain/entities/pokemons';
import {EvolutionChainResponse} from '@infrasctructure/interfaces/poke-api-evolution-chain.responses';
import {SpeciesResult} from '@infrasctructure/interfaces/poke-api-species.responses';
import type {PokeAPIPokemon} from '@infrasctructure/interfaces/poke-api.responses';
import {PokemonsMapper} from '@infrasctructure/mapper/pokemons.mapper';

export const getPokemonById = async (
  fetcher: HttpAdapter,
  id: number,
): Promise<Pokemon> => {
  try {
    const result = await fetcher.get<PokeAPIPokemon>(`/pokemon/${id}`);

    const pokemon = await PokemonsMapper.fromPokemonApiToPokemon(result);

    const speciesResult = await fetcher.get<SpeciesResult>(
      `/pokemon-species/${id}`,
    );

    await Promise.all([speciesResult]);

    const evolutionURLMatch = speciesResult?.evolution_chain?.url.split('/');
    const evolutionChainId = evolutionURLMatch[6];
    const evolutionChainResult = await fetcher.get<EvolutionChainResponse>(
      `/evolution-chain/${evolutionChainId}`,
    );

    await Promise.all([evolutionChainResult]);

    const evolutionChain =
      PokemonsMapper.getPokemonEvolutionChain(evolutionChainResult);
    const species = PokemonsMapper.getPokemonSpecies(speciesResult);

    return {
      ...pokemon,
      evolution: evolutionChain,
      species: species,
    };
  } catch (error) {
    throw new Error(`Error fetching pokemon with id ${id}`);
  }
};
