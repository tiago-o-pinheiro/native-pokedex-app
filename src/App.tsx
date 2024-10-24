import {Navigator} from '@navigation/Navigation';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
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
