import { useCallback, useRef } from 'react';
import { getPlaySrcdoc } from './utils';

export const useSandbox = () => {
  const sandboxRef = useRef<HTMLIFrameElement | null>(null);

  const sendSandboxMessage = useCallback((message: any) => {
    sandboxRef.current
    && sandboxRef.current.contentWindow
    && sandboxRef.current.contentWindow.postMessage(message, location.origin);
  }, []);

  const refreshSandbox = useCallback(() => {
    if (sandboxRef.current) {
      sandboxRef.current.srcdoc = getPlaySrcdoc();
    }
  }, []);

  return {
    sandboxRef,
    refreshSandbox,
    sendSandboxMessage,
  };
};
