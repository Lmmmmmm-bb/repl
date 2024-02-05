import type { FC } from 'react';

import Button from '~/components/ui/Button';
import { useThemeContext } from '~/contexts/theme';
import Moon from '~/icons/Moon';
import Sun from '~/icons/Sun';

const ThemeSwitcher: FC = () => {
  const { theme, setTheme } = useThemeContext();

  const handleChangeTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Button title="Toggle dark mode" variant="ghost" size="icon" onClick={handleChangeTheme}>
      {theme === 'light' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </Button>
  );
};

export default ThemeSwitcher;
