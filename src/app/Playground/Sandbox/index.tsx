import { type FC, useEffect, useRef } from 'react';
import { sandboxAttr } from './config';
import type { SandboxPayload } from './types';
import { useThemeStore } from '~/stores/theme';

const Sandbox: FC = () => {
  const theme = useThemeStore(state => state.theme);
  const sandboxRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!sandboxRef.current || !sandboxRef.current.contentWindow) {
      return;
    }

    const payload: SandboxPayload<typeof theme> = { type: 'THEME_CHANGE', data: theme };
    sandboxRef.current.contentWindow.postMessage(JSON.stringify(payload), location.origin);
  }, [theme]);

  return (
    <iframe
      src="/__play.html"
      className="w-full h-full"
      ref={sandboxRef}
      sandbox={sandboxAttr}
    />
  );
};

export default Sandbox;
