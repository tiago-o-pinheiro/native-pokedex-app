import {Stat} from '@infrasctructure/interfaces/poke-api.responses';
import {TableStat} from '@presentation/components/pokemons/TableStats';
import {gaps} from '@theme/gaps';
import {StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {ProgressBar, useTheme} from 'react-native-paper';

interface STAT_NAME {
  [key: string]: string;
}

const STATS: STAT_NAME = {
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  'special-attack': 'Sp. Atk',
  'special-defense': 'Sp. Def',
  speed: 'Speed',
};

export const PokemonStatsScreen = ({stats}: {stats: Stat[]}) => {
  const {width} = useWindowDimensions();
  const {colors} = useTheme();

  return (
    <View
      style={[styles.container, {width, backgroundColor: colors.background}]}>
      {stats.map(stat => (
        <TableStat
          key={stat.stat.name}
          name={STATS[stat.stat.name]}
          value={stat.base_stat}>
          <ProgressBar
            progress={stat.base_stat / 100}
            color={stat.base_stat < 50 ? '#cb727e' : '#2fbc6c'}
            style={{
              backgroundColor: colors.outline,
              borderRadius: 10,
              marginTop: 2,
            }}
          />
        </TableStat>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: gaps.m,
  },
});
