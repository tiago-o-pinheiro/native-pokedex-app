import {getColorFromImage} from '@config/helpers/get-color';
import {Pokemon} from '@domain/entities/pokemons';
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
}
