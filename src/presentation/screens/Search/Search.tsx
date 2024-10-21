import {useSearchPokemon} from '@hooks/use-search-pokemon';
import {
  FullScreenLoader,
  PokemonCard,
  SearchBar,
} from '@presentation/components';
import {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {ActivityIndicator, TextInput, useTheme, Text} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const {colors} = useTheme();
  const {isLoading, isLoadingPokemons, pokemons} =
    useSearchPokemon(searchQuery);

  if (isLoading) {
    return <FullScreenLoader color={colors.primary} />;
  }

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Search for a Pokémon"
        value={searchQuery}
        handleChange={setSearchQuery}
      />
      {isLoadingPokemons && (
        <ActivityIndicator animating={true} color={colors.primary} />
      )}
      <FlatList
        data={pokemons}
        renderItem={({item}) => (item ? <PokemonCard pokemon={item} /> : null)}
        keyExtractor={(item, index) => `${item?.id}-${index}`}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});
