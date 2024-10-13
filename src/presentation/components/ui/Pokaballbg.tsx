import {useAppTheme} from '@hooks/use-app-theme';
import {Image, ImageStyle, StyleProp, StyleSheet} from 'react-native';

interface PokeballBgProps {
  styles?: StyleProp<ImageStyle>;
}

export const PokeballBg = ({styles}: PokeballBgProps) => {
  const {isDark} = useAppTheme();
  const pokeballImage = isDark
    ? require('@assets/images/pokeball-light.png')
    : require('@assets/images/pokeball-dark.png');
  return (
    <Image
      source={pokeballImage}
      style={[
        {
          width: 300,
          height: 300,
        },
        styles,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {},
});
