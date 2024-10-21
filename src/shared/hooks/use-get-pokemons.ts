import {getPokemon} from '@actions/use-cases/get-pokemon.use-case';
import {pokeApiFetcher} from '@config/adapters/pokeAPI.adapter';
import {Pokemon} from '@domain/entities/pokemons';
import {useInfiniteQuery} from '@tanstack/react-query';

export const useGetPokemons = () => {
  const fetchPokemons = async (page: number) => {
    try {
      const response = (await getPokemon(
        pokeApiFetcher,
        page,
        20,
      )) as Pokemon[];
      return response;
    } catch (error) {
      console.error('Error fetching pokemons');
    }
  };

  const {isLoading, isError, data, fetchNextPage} = useInfiniteQuery({
    queryKey: ['pokemons', 'infinity'],
    initialPageParam: 0,
    queryFn: params => fetchPokemons(params.pageParam),
    staleTime: 1000 * 60 * 60,
    getNextPageParam: (lastPage, allPages) =>
      lastPage ? allPages.length : undefined,
  });

  return {pokemons: data, isLoading, isError, fetchNextPage};
};
