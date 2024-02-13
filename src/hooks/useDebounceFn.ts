import { useCallback, useRef } from 'react';

type AnyFunction = (...args: any[]) => any;

export const useDebounceFn = <T extends AnyFunction>(fn: T, delay: number): ((...args: Parameters<T>) => void) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedFn = useCallback((...args: Parameters<T>) => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => fn(...args), delay);
  }, [fn, delay]);

  return debouncedFn;
};
