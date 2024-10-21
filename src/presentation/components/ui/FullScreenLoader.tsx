import {sizes} from '@theme/sizes';
import {StyleSheet, Text, View} from 'react-native';
import {ActivityIndicator, useTheme} from 'react-native-paper';

interface Props {
  color?: string;
}

export const FullScreenLoader = ({color = 'white'}: Props) => {
  const {colors} = useTheme();
  return (
    <View style={[styles.container, {backgroundColor: color}]}>
      <ActivityIndicator size={sizes.xxxl} color={colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
