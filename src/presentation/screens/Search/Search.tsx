import {useSearchPokemon} from '@hooks/use-search-pokemon';
import {
  FullScreenLoader,
  PokeballBg,
  PokemonCard,
  SearchBar,
} from '@presentation/components';
import {RootStackParamList} from '@presentation/navigation/Navigation';
import {StackScreenProps} from '@react-navigation/stack';
import {useState} from 'react';
import {StyleSheet, useWindowDimensions, View} from 'react-native';
import {FlatList, Pressable} from 'react-native-gesture-handler';
import {ActivityIndicator, useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome6';

interface Props extends StackScreenProps<RootStackParamList, 'SearchScreen'> {}

export const SearchScreen = ({navigation}: Props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const {colors} = useTheme();
  const {height} = useWindowDimensions();
  const {isLoading, isLoadingPokemons, pokemons} =
    useSearchPokemon(searchQuery);

  if (isLoading) {
    return <FullScreenLoader color={colors.primary} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={20} color="white" />
        </Pressable>
        <SearchBar
          placeholder="Search for a Pokémon"
          value={searchQuery}
          handleChange={setSearchQuery}
          style={{flexGrow: 2}}
        />
      </View>
      {isLoadingPokemons && (
        <ActivityIndicator animating={true} color={colors.primary} />
      )}
      <FlatList
        data={pokemons}
        renderItem={({item}) => (item ? <PokemonCard pokemon={item} /> : null)}
        keyExtractor={(item, index) => `${item?.id}-${index}`}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        style={{marginHorizontal: 20}}
      />
      <PokeballBg
        styles={{
          position: 'absolute',
          top: height * 0.7,
          left: -50,
          opacity: 0.5,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  backButton: {
    opacity: 0.8,
    alignSelf: 'center',
    marginTop: 10,
  },
});
