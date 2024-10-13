import {Pokemon} from '@domain/entities/pokemons';

import {Avatar, Card, Text} from 'react-native-paper';
import {styles} from './styles';
import {Image, View} from 'react-native';
import {gaps} from '@theme/gaps';
import {FadeInImage} from '../ui/FadeInImage';

const pokeball = require('@assets/images/pokeball-light.png');

export const PokemonCard = ({
  id,
  name,
  types,
  avatar,
  sprites,
  color,
}: Pokemon) => {
  return (
    <Card style={[styles.cardContainer, {backgroundColor: color}]}>
      <Text style={styles.name} variant="bodyLarge" lineBreakMode="middle">
        {name}
        {'\n#' + id}
      </Text>
      <View style={styles.pokeballContainer}>
        <Image source={pokeball} style={styles.pokeball} />
      </View>

      <FadeInImage uri={avatar} style={styles.pokemonImage} />
      <Text style={[styles.name, {marginTop: gaps.l}]}>{types[0].name}</Text>
    </Card>
  );
};
