import {useContext} from 'react';
import {ThemeContext} from '@presentation/context/ThemeContext/ThemeContext';

export const useAppTheme = () => {
  return useContext(ThemeContext);
};
