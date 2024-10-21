import {PokemonScreen} from '@presentation/screens/Pokemon/PokemonScreen';
import {SearchScreen} from '@presentation/screens/Search/Search';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from '@screens/Home';

export type RootStackParamList = {
  Home: undefined;
  PokemonScreen: {pokemonId: number};
  SearchScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export const Navigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="PokemonScreen" component={PokemonScreen} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
    </Stack.Navigator>
  );
};
