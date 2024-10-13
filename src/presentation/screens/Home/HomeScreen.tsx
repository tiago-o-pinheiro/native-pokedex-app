import {StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-paper';

export const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text variant="displaySmall">Display Large</Text>
      <Button mode="contained">Press Me</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});
