import {useGetPokemons} from '@hooks/use-get-pokemons';
import {PokeballBg, SearchBar} from '@presentation/components';
import {PokemonCard} from '@presentation/components/pokemons/PokemonCard';
import {RootStackParamList} from '@presentation/navigation/Navigation';
import {globalTheme} from '@presentation/theme/global-theme';
import {StackScreenProps} from '@react-navigation/stack';
import {gaps} from '@theme/gaps';
import {StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {ActivityIndicator, FAB, Text, useTheme} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface Props extends StackScreenProps<RootStackParamList, 'Home'> {}

export const HomeScreen = ({navigation}: Props) => {
  const {pokemons, isLoading, fetchNextPage} = useGetPokemons();
  const {colors} = useTheme();
  const {top} = useSafeAreaInsets();

  return (
    <View style={{...globalTheme.globalMargin}}>
      <Text variant="displayMedium" style={{color: colors.primary, top}}>
        Pokédex
      </Text>
      <SearchBar
        placeholder="Search for a pokemon"
        style={{flexGrow: 1}}
        handlePress={() => {
          navigation.push('SearchScreen');
        }}
      />
      <PokeballBg styles={styles.imageStyles} />
      <FlatList
        data={pokemons}
        renderItem={({item}) => (item ? <PokemonCard pokemon={item} /> : null)}
        keyExtractor={(item, index) => `${item?.id}-${index}`}
        numColumns={2}
        onEndReachedThreshold={0.8}
        onEndReached={() => !isLoading && fetchNextPage()}
        showsVerticalScrollIndicator={false}
        style={{marginTop: gaps.m}}
        ListFooterComponent={<View style={{height: 120}} />}
      />
      {isLoading && <ActivityIndicator />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  imageStyles: {
    position: 'absolute',
    top: -100,
    right: -100,
    opacity: 0.5,
  },
});
