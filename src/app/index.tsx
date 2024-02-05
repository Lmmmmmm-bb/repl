import type { FC } from 'react';

import Navigation from './Navigation';
import { ThemeContextProvider } from '~/contexts/theme/provider';

const App: FC = () => (
  <ThemeContextProvider>
    <div className="h-screen pl-20 py-4">
      <Navigation />
    </div>
  </ThemeContextProvider>
);

export default App;
