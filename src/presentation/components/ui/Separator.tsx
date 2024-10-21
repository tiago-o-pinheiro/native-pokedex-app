import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {useTheme} from 'react-native-paper';

interface SeparatorProps {
  customStyle?: StyleProp<ViewStyle>;
}

export const Separator = ({customStyle}: SeparatorProps) => {
  const {colors} = useTheme();
  return (
    <View style={{backgroundColor: colors.background}}>
      <View style={[styles.container, customStyle]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 1,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    margin: 10,
  },
});
