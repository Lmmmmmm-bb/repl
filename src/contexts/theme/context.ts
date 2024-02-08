import type { Dispatch, SetStateAction } from 'react';
import { createContext } from 'react';
import type { ThemeModeType } from './types';

interface ThemeContext {
  theme: ThemeModeType;
  setTheme: Dispatch<SetStateAction<ThemeModeType>>;
}

export const themeContext = createContext<ThemeContext>({
  theme: 'light',
  setTheme: () => {},
});
