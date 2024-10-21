import {getColorFromImage} from '@config/helpers/get-color';
import {PokemonEvolution} from '@domain/entities/pokemon-evolution';
import {PokemonMoves} from '@domain/entities/pokemon-moves';
import {PokemonSpecies} from '@domain/entities/pokemon-species';
import {Pokemon} from '@domain/entities/pokemons';
import {
  EvolutionChainResponse,
  Chain,
} from '@infrasctructure/interfaces/poke-api-evolution-chain.responses';
import {MovesResponse} from '@infrasctructure/interfaces/poke-api-moves.responses';
import {SpeciesResult} from '@infrasctructure/interfaces/poke-api-species.responses';
import {PokeAPIPokemon} from '@infrasctructure/interfaces/poke-api.responses';

export class PokemonsMapper {
  static async fromPokemonApiToPokemon(
    pokemon: PokeAPIPokemon,
  ): Promise<Pokemon> {
    const sprites = this.getSprites(pokemon);
    const avatar = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
    const color = await getColorFromImage(avatar);

    return {
      id: pokemon.id,
      name: pokemon.name,
      types: pokemon.types.map(type => ({
        name: type.type.name,
        url: type.type.url,
      })),
      avatar,
      sprites: sprites,
      color: color,
      baseExperience: pokemon.base_experience,
      height: pokemon.height,
      stats: pokemon.stats,
      weight: pokemon.weight,
      moves: pokemon.moves,
    };
  }

  static getSprites(data: PokeAPIPokemon): string[] {
    const sprites: string[] = [
      data.sprites.front_default,
      data.sprites.back_default,
      data.sprites.front_shiny,
      data.sprites.back_shiny,
    ];

    if (data.sprites.other?.home.front_default)
      sprites.push(data.sprites.other?.home.front_default);
    if (data.sprites.other?.['official-artwork'].front_default)
      sprites.push(data.sprites.other?.['official-artwork'].front_default);
    if (data.sprites.other?.['official-artwork'].front_shiny)
      sprites.push(data.sprites.other?.['official-artwork'].front_shiny);
    if (data.sprites.other?.showdown.front_default)
      sprites.push(data.sprites.other?.showdown.front_default);
    if (data.sprites.other?.showdown.back_default)
      sprites.push(data.sprites.other?.showdown.back_default);

    return sprites;
  }

  static getPokemonEvolutionChain(
    data: EvolutionChainResponse,
  ): PokemonEvolution[] {
    const getEvolutionNames = (chain: Chain) => {
      let evolutions: PokemonEvolution[] = [
        {
          name: chain.species.name,
          url: chain.species.url,
          min_level: chain.evolution_details[0]?.min_level || null,
        },
      ];

      chain.evolves_to.forEach((evolution: Chain) => {
        const minLevel = evolution.evolution_details[0]?.min_level || null;
        evolutions.push({
          name: evolution.species.name,
          url: evolution.species.url,
          min_level: minLevel,
        });

        evolution.evolves_to.forEach((furtherEvolution: Chain) => {
          const furtherMinLevel =
            furtherEvolution.evolution_details[0]?.min_level || null;
          evolutions.push({
            name: furtherEvolution.species.name,
            url: furtherEvolution.species.url,
            min_level: furtherMinLevel,
          });
        });
      });

      return evolutions;
    };

    const evolutionChain = getEvolutionNames(data.chain);

    return evolutionChain;
  }

  static getPokemonSpecies(data: SpeciesResult): PokemonSpecies {
    return {
      happiness: data.base_happiness,
      description: data.flavor_text_entries,
      isBaby: data.is_baby,
      isLegendary: data.is_legendary,
      isMythical: data.is_mythical,
      evolutionChain: data.evolution_chain.url,
      genera: data.genera,
    };
  }

  static getPokemonMoves(data: MovesResponse): PokemonMoves {
    return {
      names: data.names.map(item => ({
        name: item.name,
        language: item.language,
      })),
      effect: data.flavor_text_entries.map(item => ({
        effect: item.flavor_text,
        language: item.language.name,
      })),
    };
  }
}
