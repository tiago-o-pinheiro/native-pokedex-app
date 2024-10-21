import {Formatter} from '@config/helpers/formatter';
import {useGetPokemonsById} from '@hooks/use-get-pokemon-by-id';
import {
  FadeInImage,
  FullScreenLoader,
  PokeballBg,
  Type,
} from '@presentation/components';
import {RootStackParamList} from '@presentation/navigation/Navigation';
import {StackScreenProps} from '@react-navigation/stack';
import {Pressable, ScrollView, View} from 'react-native';
import {styles} from './styles';
import {Text} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {gaps} from '@theme/gaps';

import Icon from 'react-native-vector-icons/FontAwesome6';

import {DetailSlider} from './components/DetailSlider/Slider';

interface Props extends StackScreenProps<RootStackParamList, 'PokemonScreen'> {}

export const PokemonScreen = ({navigation, route}: Props) => {
  const {pokemonId} = route.params;
  const {pokemon, isLoading} = useGetPokemonsById(pokemonId);
  const {top} = useSafeAreaInsets();

  if (isLoading) {
    return <FullScreenLoader color={pokemon?.color || 'gray'} />;
  }

  return (
    <ScrollView
      style={{flex: 1, backgroundColor: pokemon?.color}}
      bounces={false}
      showsVerticalScrollIndicator={false}>
      <View style={[styles.headerContainer, {paddingTop: top + gaps.s}]}>
        <Pressable style={{opacity: 0.8}} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={20} color="white" />
        </Pressable>
        <View style={styles.headerTextContainer}>
          <View>
            <Text style={styles.headerTexts}>
              {Formatter.capitalize(pokemon?.name ?? '') + '\n'}
            </Text>
          </View>
          <Text style={styles.headerTexts}>#{pokemon?.id}</Text>
        </View>
        <View style={styles.typesContainer}>
          {pokemon?.types.map(type => (
            <Type key={type.name} type={type.name} />
          ))}
        </View>
      </View>
      <PokeballBg styles={styles.pokeball} />

      <FadeInImage uri={pokemon?.avatar || ''} style={styles.pokemonImage} />
      <DetailSlider {...{pokemon}} />
    </ScrollView>
  );
};
