import type { FC } from 'react';

import Navigation from './Navigation';
import Playground from './Playground';
import { ThemeContextProvider } from '~/contexts/theme/provider';
import { VirtualFileContext } from '~/contexts/virtual-file/provider';

const App: FC = () => (
  <ThemeContextProvider>
    <VirtualFileContext>
      <div className="h-screen pl-20 py-4 pr-4">
        <Navigation />
        <Playground />
      </div>
    </VirtualFileContext>
  </ThemeContextProvider>
);

export default App;
