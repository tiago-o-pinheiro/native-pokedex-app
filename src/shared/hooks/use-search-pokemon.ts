import {getPokemonNamesWithId, getPokemonsByIds} from '@actions/use-cases';
import {useQuery} from '@tanstack/react-query';
import {useMemo} from 'react';
import {useDebounceValue} from './use-debounce-value';

export const useSearchPokemon = (query: string) => {
  const {debounceValue} = useDebounceValue(query, 500);
  const {isLoading, data: pokemonNameList} = useQuery({
    queryKey: ['pokemon', 'all'],
    queryFn: () => getPokemonNamesWithId(),
    staleTime: 1000 * 60 * 5,
  });

  const pokemonIdList = useMemo(() => {
    if (!isNaN(Number(debounceValue))) {
      return (
        pokemonNameList?.filter(
          pokemon => pokemon.id === Number(debounceValue),
        ) || []
      );
    }

    if (debounceValue === '') {
      return [];
    }

    if (debounceValue.length < 3) {
      return [];
    }
    return (
      pokemonNameList?.filter(pokemon =>
        pokemon.name.includes(debounceValue.toLocaleLowerCase()),
      ) || []
    );
  }, [debounceValue]);

  const {isLoading: isLoadingPokemons, data: pokemons = []} = useQuery({
    queryKey: ['pokemon', 'by', pokemonIdList],
    queryFn: () => getPokemonsByIds(pokemonIdList.map(pokemon => pokemon.id)),
    staleTime: 1000 * 60 * 5,
  });

  return {pokemonList: pokemonIdList, isLoading, pokemons, isLoadingPokemons};
};
