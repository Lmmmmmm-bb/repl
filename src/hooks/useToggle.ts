import { useCallback, useMemo, useState } from 'react';

export const useToggle = (initial = false) => {
  const [state, setState] = useState(initial);

  const on = useCallback(() => setState(true), []);
  const off = useCallback(() => setState(false), []);
  const set = useCallback((nextState: boolean) => setState(_state => nextState ?? !_state), []);

  const toggle = useMemo(() => ({ on, off, set }), [off, on, set]);

  return [state, toggle] as const;
};
