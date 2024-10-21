import {Formatter} from '@config/helpers/formatter';
import {PokemonSpecies} from '@domain/entities/pokemon-species';
import {FadeInImage} from '@presentation/components';
import {TableStat} from '@presentation/components/pokemons/TableStats';
import {Separator} from '@presentation/components/ui/Separator';
import {gaps} from '@theme/gaps';
import {StyleSheet, useWindowDimensions, View} from 'react-native';
import {Text, useTheme} from 'react-native-paper';

interface PokemonAboutProps {
  sprites: string[];
  species: PokemonSpecies;
  height: number;
  weight: number;
  baseExperience: number;
}

export const PokemonAboutScreen = ({
  sprites,
  species,
  height,
  weight,
  baseExperience,
}: PokemonAboutProps) => {
  const {width} = useWindowDimensions();
  const {colors} = useTheme();

  const text =
    species?.description?.find(item => item.language.name === 'en') || '';

  const pokemonData = {
    species: species?.genera?.find(item => item.language.name === 'en'),
    heigth: height,
    weight: weight,
    baseExperience,
  };

  return (
    <View
      style={[styles.container, {width, backgroundColor: colors.background}]}>
      <View style={{width: '100%', paddingBottom: gaps.m}}>
        {text && (
          <>
            <Text style={{marginBottom: gaps.xs, color: colors.primary}}>
              {Formatter.formatText(text.flavor_text)}
            </Text>
            <Separator />
          </>
        )}
      </View>
      <TableStat name="Species">
        <Text>{pokemonData.species?.genus}</Text>
      </TableStat>
      <TableStat name="Height">
        <Text>{`${pokemonData.heigth * 10} cm`}</Text>
      </TableStat>
      <TableStat name="Weight">
        <Text>{`${pokemonData.weight / 10} Kg`}</Text>
      </TableStat>
      <TableStat name="Base Experience">
        <Text>{pokemonData.baseExperience}</Text>
      </TableStat>

      <View
        style={{flexDirection: 'row', justifyContent: 'center', width: '100%'}}>
        <FadeInImage
          uri={sprites[0]}
          style={{width: 80, height: 80, marginHorizontal: 5}}
        />
        <FadeInImage
          uri={sprites[1]}
          style={{width: 80, height: 80, marginHorizontal: 5}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: gaps.m,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
  },
});
