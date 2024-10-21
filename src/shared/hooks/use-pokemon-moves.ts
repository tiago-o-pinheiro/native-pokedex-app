import {getPokemonMoves} from '@actions/use-cases';
import {pokeApiFetcher} from '@config/adapters/pokeAPI.adapter';
import {PokemonMoves} from '@domain/entities/pokemon-moves';
import {Move} from '@infrasctructure/interfaces/poke-api.responses';
import {useEffect, useRef, useState} from 'react';

const cleanMoves = (moves: Move[]): string[] => {
  return moves.map(move => move.move.url);
};

export const useGetPokemonMoves = (moves: Move[]) => {
  const [urls, setUrl] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pokemonMoves, setPokemonMoves] = useState<PokemonMoves[]>([]);
  const pagesToLoad = useRef(0);

  useEffect(() => {
    pagesToLoad.current = Math.floor(moves.length / 10);
    const initialLoad = cleanMoves(moves.slice(0, 10));
    setUrl(initialLoad);
  }, []);

  useEffect(() => {
    const loadNextMoves = async () => {
      if (!urls.length) return;

      setIsLoading(true);
      try {
        const response = await getPokemonMoves(pokeApiFetcher, urls);
        setPokemonMoves(prevMoves => [...prevMoves, ...response]);
        setIsLoading(false);
        pagesToLoad.current -= 1;
      } catch (error) {
        setIsLoading(false);
        throw new Error('Error fetching Pokemon moves');
      }
    };

    loadNextMoves();
  }, [urls]);

  const loadMoves = () => {
    if (isLoading || pagesToLoad.current <= 0) return;

    const currentPage = Math.ceil(pokemonMoves.length / 10);
    const start = currentPage * 10;
    const nextLoad = cleanMoves(moves.slice(start, start + 10));

    setUrl(nextLoad);
  };
  return {pokemonMoves, isLoading, loadMoves};
};
