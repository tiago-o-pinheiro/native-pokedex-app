import {NavigationContainer} from '@react-navigation/native';
import {StyleSheet, Text, View} from 'react-native';
import 'react-native-gesture-handler';

export const App = () => {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Text>App</Text>
      </View>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {},
});
