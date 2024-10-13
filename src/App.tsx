import {Navigator} from '@navigation/Navigation';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {PaperProvider} from 'react-native-paper';
import 'react-native-gesture-handler';
import {ThemeContentProvider} from '@presentation/context/ThemeContext/ThemeContext';

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContentProvider>
        <Navigator />
      </ThemeContentProvider>
    </QueryClientProvider>
  );
};
