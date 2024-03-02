import { useCallback, useState } from 'react';
import { useToggle } from '~/hooks/useToggle';

export const useErrorMessage = () => {
  const [open, toggleOpen] = useToggle();
  const [errorMessage, setErrorMessage] = useState<{
    type: 'error' | 'warning' | 'info';
    message: string;
  }>({ type: 'error', message: '' });

  const updateMessage = useCallback(
    (message: typeof errorMessage) => {
      toggleOpen.on();
      setErrorMessage(message);
    },
    [],
  );

  const clearMessage = useCallback(
    () => toggleOpen.off(),
    [],
  );

  return {
    open,
    errorMessage,
    updateMessage,
    clearMessage,
  };
};
