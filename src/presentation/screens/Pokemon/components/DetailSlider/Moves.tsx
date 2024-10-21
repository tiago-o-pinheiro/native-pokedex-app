import {useGetPokemonMoves} from '@hooks/use-pokemon-moves';
import {Move} from '@infrasctructure/interfaces/poke-api.responses';
import {TableStat} from '@presentation/components/pokemons/TableStats';
import {gaps} from '@theme/gaps';
import {StyleSheet, useWindowDimensions, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {Text, useTheme} from 'react-native-paper';

export const PokemonMovesScreen = ({moves}: {moves: Move[]}) => {
  const {width} = useWindowDimensions();
  const {colors} = useTheme();
  const {pokemonMoves, isLoading, loadMoves} = useGetPokemonMoves(moves);

  return (
    <View
      style={[styles.container, {width, backgroundColor: colors.background}]}>
      <FlatList
        data={pokemonMoves}
        keyExtractor={(item, index) => `${index}`}
        onEndReached={loadMoves}
        onEndReachedThreshold={0.9}
        renderItem={({item}) => (
          <TableStat
            name={
              item.names.find(name => name.language.name === 'en')?.name || ''
            }>
            <Text>
              {item.effect.find(eff => eff.language === 'en')?.effect}
            </Text>
          </TableStat>
        )}
        ListFooterComponent={<View style={{height: 50}} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: gaps.m,
  },
});
