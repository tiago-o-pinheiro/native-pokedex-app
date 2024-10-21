import {gaps} from '@theme/gaps';
import {sizes} from '@theme/sizes';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';

interface Props {
  type: string;
  size?: 'small' | 'medium' | 'large';
}

interface IconByType {
  [key: string]: string;
}

const ICON_BY_TYPE: IconByType = {
  normal: 'circle',
  fighting: 'hand-fist',
  flying: 'feather',
  poison: 'skull-crossbones',
  ground: 'mountain',
  rock: 'gem',
  bug: 'bug',
  ghost: 'ghost',
  steel: 'shield',
  fire: 'fire',
  water: 'droplet',
  grass: 'leaf',
  electric: 'bolt',
  psychic: 'brain',
  ice: 'snowflake',
  dragon: 'dragon',
  dark: 'moon',
  fairy: 'wand-sparkles',
};

const ICON_SIZE = {
  small: 8,
  medium: 10,
  large: 12,
};

export const Type = ({type, size = 'medium'}: Props) => {
  return (
    <View style={[styles.container]}>
      <Icon name={ICON_BY_TYPE[type]} size={ICON_SIZE[size]} color="white" />
      <Text style={[styles.text, [texts[size]]]}>{type}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: gaps.xxs,
    paddingVertical: gaps.xxxs,
    marginRight: gaps.xs,
    borderWidth: 1,
    borderRadius: 100,
    flexDirection: 'row',
    gap: gaps.xxxs,
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderColor: 'transparent',
    shadowColor: 'white',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    textTransform: 'capitalize',
    fontSize: sizes.xxs,
    color: 'white',
  },
});

const texts = StyleSheet.create({
  small: {
    fontSize: sizes.xxxs,
  },
  medium: {},
  large: {},
});
