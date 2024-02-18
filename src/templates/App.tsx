import type { FC } from 'react';
import { useState } from 'react';
import Hello from './Hello';

const App: FC = () => {
  const [count, setCount] = useState(0);

  return (
    <span onClick={() => setCount(count + 1)}>
      <Hello />
      {`Click Me: ${count}`}
    </span>
  );
};

export default App;
