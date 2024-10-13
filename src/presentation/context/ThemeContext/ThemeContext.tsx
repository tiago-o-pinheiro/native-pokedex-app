import {createContext, PropsWithChildren} from 'react';
import {useColorScheme} from 'react-native';

import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';

import {adaptNavigationTheme, PaperProvider} from 'react-native-paper';
import {NavigationTheme} from 'react-native-paper/lib/typescript/types';

interface ThemeContextProps {
  isDark: boolean;
  theme: NavigationTheme;
}

const {LightTheme, DarkTheme} = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

export const ThemeContext = createContext<ThemeContextProps>({
  isDark: false,
  theme: LightTheme,
});

export const ThemeContentProvider = ({children}: PropsWithChildren) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const theme = isDark ? DarkTheme : LightTheme;

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <ThemeContext.Provider
          value={{
            isDark,
            theme,
          }}>
          {children}
        </ThemeContext.Provider>
      </NavigationContainer>
    </PaperProvider>
  );
};
