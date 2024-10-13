import {Navigator} from '@navigation/Navigation';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import {PaperProvider} from 'react-native-paper';

export const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </PaperProvider>
  );
};
