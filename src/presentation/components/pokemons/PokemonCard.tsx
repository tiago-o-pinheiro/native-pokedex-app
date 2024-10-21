import {Pokemon} from '@domain/entities/pokemons';

import {Card, Text} from 'react-native-paper';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import {gaps} from '@theme/gaps';
import {FadeInImage} from '../ui/FadeInImage';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '@presentation/navigation/Navigation';
import {Type} from './Type';

const pokeball = require('@assets/images/pokeball-light.png');

interface Props {
  pokemon: Pokemon;
}

export const PokemonCard = ({pokemon}: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <Pressable
      style={{flex: 1}}
      onPress={() =>
        navigation.navigate('PokemonScreen', {pokemonId: pokemon.id})
      }>
      <Card
        style={[
          styles.cardContainer,
          {backgroundColor: pokemon.color ?? 'black'},
        ]}>
        <Text style={styles.name} variant="bodyLarge" lineBreakMode="middle">
          {pokemon.name}
          {'\n#' + pokemon.id}
        </Text>
        <View style={styles.pokeballContainer}>
          <Image source={pokeball} style={styles.pokeball} />
        </View>

        <FadeInImage uri={pokemon.avatar} style={styles.pokemonImage} />
        <Text style={[styles.name, {marginTop: gaps.l}]}>
          <Type type={pokemon.types[0].name} size="small" />
        </Text>
      </Card>
    </Pressable>
  );
};

export const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 10,
    backgroundColor: '#5b5b5b',
    height: 120,
    flex: 0.5,
    marginBottom: 25,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  name: {
    color: 'white',
    top: 10,
    left: 10,
  },
  pokeball: {
    width: 100,
    height: 100,
    right: -25,
    top: -25,
    opacity: 0.4,
  },
  pokemonImage: {
    width: 120,
    height: 120,
    position: 'absolute',
    right: -15,
    top: -30,
  },

  pokeballContainer: {
    alignItems: 'flex-end',
    width: '100%',
    position: 'absolute',

    overflow: 'hidden',
    opacity: 0.5,
  },
});
