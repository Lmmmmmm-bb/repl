import { useContext } from 'react';

import { themeContext } from './context';

export const useThemeContext = () => useContext(themeContext);
