import type { FC } from 'react';

import Navigation from './Navigation';
import Playground from './Playground';

const App: FC = () => (
  <div className="h-screen px-4 pt-12 pb-4 lg:pl-20 lg:pt-4 ">
    <Navigation />
    <Playground />
  </div>
);

export default App;
