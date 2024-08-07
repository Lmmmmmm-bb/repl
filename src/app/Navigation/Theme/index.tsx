import type { FC } from 'react';

import Button from '~/components/ui/Button';
import Moon from '~/icons/Moon';
import Sun from '~/icons/Sun';
import { setTheme, useThemeStore } from '~/stores/theme';

const Theme: FC = () => {
  const theme = useThemeStore(state => state.theme);

  const handleChangeTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Button
      title="Toggle dark mode"
      variant="ghost"
      size="icon"
      data-umami-event="Theme"
      onClick={handleChangeTheme}
    >
      {theme === 'light' ? <Sun className="size-5" /> : <Moon className="size-5" />}
    </Button>
  );
};

export default Theme;
