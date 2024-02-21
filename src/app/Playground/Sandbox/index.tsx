import { type FC, useEffect, useRef } from 'react';
import { sandboxAttr } from './config';
import playSrcdoc from './play.html?raw';
import { getPlaySrcdoc } from './utils';
import { useCompilerWorker } from './useCompilerWorker';
import { useThemeStore } from '~/stores/theme';
import { useVirtualFileStore } from '~/stores/virtual-file';
import { usePackageStore } from '~/stores/package';

const Sandbox: FC = () => {
  const extraPackages = usePackageStore(state => state.extraPackages);
  const files = useVirtualFileStore(state => state.files);
  const theme = useThemeStore(state => state.theme);

  const sandboxRef = useRef<HTMLIFrameElement>(null);
  const sendSandboxMessage = (message: any) => {
    sandboxRef.current
    && sandboxRef.current.contentWindow
    && sandboxRef.current.contentWindow.postMessage(message, location.origin);
  };

  const { sendWorkerMessage } = useCompilerWorker((event: MessageEvent) => {
    const payload = event.data;
    sendSandboxMessage(payload);
  });

  const handleSandboxLoad = () => {
    sendWorkerMessage({ files });
  };

  useEffect(() => {
    if (sandboxRef.current) {
      sandboxRef.current.srcdoc = getPlaySrcdoc();
    }
  }, [extraPackages]);

  useEffect(() => {
    sendWorkerMessage({ files });
  }, [files, sendWorkerMessage]);

  useEffect(() => {
    sendSandboxMessage({ type: 'THEME_CHANGE', data: theme });
  }, [theme]);

  return (
    <iframe
      className="w-full h-full"
      ref={sandboxRef}
      srcDoc={playSrcdoc}
      sandbox={sandboxAttr}
      onLoad={handleSandboxLoad}
    />
  );
};

export default Sandbox;
