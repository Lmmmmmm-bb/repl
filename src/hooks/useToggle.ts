import { useState } from 'react';

export const useToggle = (initial = false) => {
  const [state, setState] = useState(initial);

  const on = () => setState(true);
  const off = () => setState(false);
  const set = (nextState: boolean) => setState(nextState ?? !state);

  return [state, { on, off, set }] as const;
};
