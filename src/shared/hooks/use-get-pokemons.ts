import {getPokemon} from '@actions/use-cases/get-pokemon.use-case';
import {pokeApiFetcher} from '@config/adapters/pokeAPI.adapter';
import {Pokemon} from '@domain/entities/pokemons';
import {useInfiniteQuery} from '@tanstack/react-query';

export const useGetPokemons = () => {
  const {isLoading, isError, data, fetchNextPage} = useInfiniteQuery({
    queryKey: ['pokemons', 'infinite'],
    initialPageParam: 0,
    queryFn: params => getPokemon(pokeApiFetcher, params.pageParam),
    getNextPageParam: (lastPage, pages) => pages.length,
    staleTime: 1000 * 60 * 60,
  });

  const filterDuplicates = (pokemons: Pokemon[]) => {
    return pokemons.reduce((acc, pokemon) => {
      if (!acc.some(p => p.id === pokemon.id)) {
        acc.push(pokemon);
      }
      return acc;
    }, [] as Pokemon[]);
  };

  const filteredData = filterDuplicates(data?.pages.flat() ?? []);

  return {pokemons: filteredData, isLoading, isError, fetchNextPage};
};
