import type { FC } from 'react';

import Navigation from './Navigation';
import Playground from './Playground';
import { ThemeContextProvider } from '~/contexts/theme/provider';

const App: FC = () => (
  <ThemeContextProvider>
    <div className="h-screen pl-20 py-4 pr-4">
      <Navigation />
      <Playground />
    </div>
  </ThemeContextProvider>
);

export default App;
