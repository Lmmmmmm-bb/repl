import type { FC } from 'react';

import Navigation from './Navigation';
import Playground from './Playground';

const App: FC = () => (
  <div className="h-screen pl-20 py-4 pr-4">
    <Navigation />
    <Playground />
  </div>
);

export default App;
