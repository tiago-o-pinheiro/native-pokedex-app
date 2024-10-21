import {HttpAdapter} from '@config/adapters/http/http.adapter';
import {PokemonMoves} from '@domain/entities/pokemon-moves';
import {MovesResponse} from '@infrasctructure/interfaces/poke-api-moves.response';

import {PokemonsMapper} from '@infrasctructure/mapper/pokemons.mapper';

export const getPokemonMoves = async (
  fetcher: HttpAdapter,
  urls: string[],
): Promise<PokemonMoves[]> => {
  try {
    const moves = [];
    if (urls && urls.length > 0) {
      const movesPromise = urls.map(async (moveUrl: string) => {
        return await fetcher.get<MovesResponse>(moveUrl);
      });

      moves.push(...(await Promise.all(movesPromise)));
    }

    const movesMapped = moves.map(move => PokemonsMapper.getPokemonMoves(move));

    return movesMapped;
  } catch (error) {
    throw new Error(`Error fetching pokemons`);
  }
};
