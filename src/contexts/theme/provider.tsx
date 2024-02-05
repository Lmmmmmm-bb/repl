import { type FC, type PropsWithChildren, useEffect, useState } from 'react';

import { themeContext } from './context';
import type { ThemeModeType } from './types';
import { REPL_STORAGE_MODE } from './config';

export const ThemeContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeModeType>(() => localStorage.getItem(REPL_STORAGE_MODE) as ThemeModeType || 'system');

  useEffect(() => {
    const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');

    const onThemeChange = (e: MediaQueryListEvent) => setTheme(e.matches ? 'dark' : 'light');
    matchMedia.addEventListener('change', onThemeChange);
    return () => matchMedia.removeEventListener('change', onThemeChange);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');

    theme === 'system'
      ? root.classList.add(matchMedia.matches ? 'dark' : 'light')
      : root.classList.toggle('dark', theme === 'dark');

    localStorage.setItem(REPL_STORAGE_MODE, theme);
  }, [theme]);

  return (
    <themeContext.Provider value={{ theme, setTheme }}>
      {children}
    </themeContext.Provider>
  );
};
