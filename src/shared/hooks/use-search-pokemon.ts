import {getPokemonNamesWithId, getPokemonsByIds} from '@actions/use-cases';
import {useQuery} from '@tanstack/react-query';
import {useMemo} from 'react';

export const useSearchPokemon = (query: string) => {
  const {isLoading, data: pokemonNameList} = useQuery({
    queryKey: ['pokemon', 'all'],
    queryFn: () => getPokemonNamesWithId(),
    staleTime: 1000 * 60 * 5,
  });

  const pokemonIdList = useMemo(() => {
    if (!isNaN(Number(query))) {
      return (
        pokemonNameList?.filter(pokemon => pokemon.id === Number(query)) || []
      );
    }

    if (query === '') {
      return [];
    }

    if (query.length < 3) {
      return pokemonNameList || [];
    }
    return (
      pokemonNameList?.filter(pokemon =>
        pokemon.name.includes(query.toLocaleLowerCase()),
      ) || []
    );
  }, [query]);

  const {isLoading: isLoadingPokemons, data: pokemons = []} = useQuery({
    queryKey: ['pokemon', 'by', pokemonIdList],
    queryFn: () => getPokemonsByIds(pokemonIdList.map(pokemon => pokemon.id)),
    staleTime: 1000 * 60 * 5,
  });

  return {pokemonList: pokemonIdList, isLoading, pokemons, isLoadingPokemons};
};
