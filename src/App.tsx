import {Navigator} from '@navigation/Navigation';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';

export const App = () => {
  return (
    <NavigationContainer>
      <Navigator />
    </NavigationContainer>
  );
};
