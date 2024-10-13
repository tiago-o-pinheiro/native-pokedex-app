import {getPokemon} from '@actions/use-cases/get-pokemon.use-case';
import {pokeApiFetcher} from '@config/adapters/pokeAPI.adapter';
import {Pokemon} from '@domain/entities/pokemons';
import {useQuery} from '@tanstack/react-query';
import {useState} from 'react';

export const useGetPokemons = () => {
  const [page, setPage] = useState<number>(0);
  const fetchPokemons = async () => {
    try {
      const response = (await getPokemon(
        pokeApiFetcher,
        page,
        40,
      )) as Pokemon[];
      console.log(response[0]);
      return response;
    } catch (error) {
      console.error('Error fetching pokemons');
    }
  };

  const {
    isLoading,
    isError,
    data = [],
  } = useQuery({
    queryKey: ['pokemons'],
    queryFn: () => fetchPokemons(),
    staleTime: 1000 * 60 * 60,
  });

  return {pokemons: data, isLoading, isError};
};
