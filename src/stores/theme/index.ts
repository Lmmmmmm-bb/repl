import { create } from 'zustand';
import { REPL_STORAGE_MODE } from './config';
import type { ThemeModeType } from './types';
import { monaco } from '~/monaco';

interface ThemeStore {
  theme: ThemeModeType;
}

const defaultTheme = localStorage.getItem(REPL_STORAGE_MODE) as ThemeModeType || 'light';

const effect = (theme: ThemeModeType) => {
  const root = document.documentElement;
  root.classList.toggle('dark', theme === 'dark');

  localStorage.setItem(REPL_STORAGE_MODE, theme);
  monaco.editor.setTheme(`vitesse-${theme}`);
};

export const useThemeStore = create<ThemeStore>((set) => {
  effect(defaultTheme);

  const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');
  matchMedia.addEventListener(
    'change',
    (e: MediaQueryListEvent) => {
      const theme = e.matches ? 'dark' : 'light';
      effect(theme);
      set({ theme });
    },
  );

  return { theme: defaultTheme };
});

export const setTheme = (theme: ThemeModeType) => {
  effect(theme);
  useThemeStore.setState({ theme });
};

export { ThemeModeType };
