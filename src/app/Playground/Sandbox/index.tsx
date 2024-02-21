import { type FC, useEffect, useRef } from 'react';
import { sandboxAttr } from './config';
import CompilerWorker from './compiler.worker?worker&inline';
import playSrcdoc from './play.html?raw';
import { getPlaySrcdoc } from './utils';
import { useThemeStore } from '~/stores/theme';
import { useVirtualFileStore } from '~/stores/virtual-file';
import { usePackageStore } from '~/stores/package';

const Sandbox: FC = () => {
  const extraPackages = usePackageStore(state => state.extraPackages);
  const files = useVirtualFileStore(state => state.files);
  const theme = useThemeStore(state => state.theme);

  const sandboxRef = useRef<HTMLIFrameElement>(null);
  const compilerWorkerRef = useRef<Worker | null>(null);

  const sendSandboxMessage = (message: any) => {
    sandboxRef.current
    && sandboxRef.current.contentWindow
    && sandboxRef.current.contentWindow.postMessage(message, location.origin);
  };

  const sendCompilerWorkerMessage = (message: any) => {
    compilerWorkerRef.current && compilerWorkerRef.current.postMessage(message);
  };

  const handleSandboxLoad = () => {
    sendCompilerWorkerMessage({ files });
  };

  useEffect(() => {
    if (compilerWorkerRef.current) {
      return;
    }

    compilerWorkerRef.current = new CompilerWorker();
    compilerWorkerRef.current.addEventListener('message', (event: MessageEvent) => {
      const payload = event.data;
      sendSandboxMessage(payload);
    });
  }, []);

  useEffect(() => {
    if (sandboxRef.current) {
      sandboxRef.current.srcdoc = getPlaySrcdoc();
    }
  }, [extraPackages]);

  useEffect(() => {
    sendCompilerWorkerMessage({ files });
  }, [files]);

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
