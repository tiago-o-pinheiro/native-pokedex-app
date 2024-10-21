import {getPokemonById} from '@actions/use-cases/get-pokemon-by-id.use-case';
import {pokeApiFetcher} from '@config/adapters/pokeAPI.adapter';
import {Pokemon} from '@domain/entities/pokemons';
import {useQuery} from '@tanstack/react-query';

export const useGetPokemonsById = (pokemonId: number) => {
  const fetchPokemons = async (id: number) => {
    try {
      const response = (await getPokemonById(pokeApiFetcher, id)) as Pokemon;
      return response;
    } catch (error) {
      console.error('Error fetching pokemons');
    }
  };

  const {isLoading, data: pokemon} = useQuery({
    queryKey: ['pokemons', pokemonId],
    queryFn: () => fetchPokemons(pokemonId),
    staleTime: 1000 * 60 * 60,
  });

  return {pokemon, isLoading};
};
