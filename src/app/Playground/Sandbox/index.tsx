import { type FC, useEffect } from 'react';
import { useCompilerWorker } from './useCompilerWorker';
import { useSandbox } from './useSandbox';
import { sandboxAttr } from './config';
import { useThemeStore } from '~/stores/theme';
import { useVirtualFileStore } from '~/stores/virtual-file';
import { usePackageStore } from '~/stores/package';

const Sandbox: FC = () => {
  const theme = useThemeStore(state => state.theme);
  const files = useVirtualFileStore(state => state.files);
  const extraPackages = usePackageStore(state => state.extraPackages);

  const { sandboxRef, refreshSandbox, sendSandboxMessage } = useSandbox();

  const { sendWorkerMessage } = useCompilerWorker((event: MessageEvent) => {
    const payload = event.data;
    sendSandboxMessage(payload);
  });

  const handleSandboxLoad = () => sendWorkerMessage({ files });

  useEffect(() => {
    refreshSandbox();
  }, [extraPackages, refreshSandbox]);

  useEffect(() => {
    sendWorkerMessage({ files });
  }, [files, sendWorkerMessage]);

  useEffect(() => {
    sendSandboxMessage({ type: 'THEME_CHANGE', data: theme });
  }, [theme, sendSandboxMessage]);

  return (
    <div className="w-full h-full">
      <iframe
        className="w-full h-full"
        ref={sandboxRef}
        sandbox={sandboxAttr}
        onLoad={handleSandboxLoad}
      />
    </div>
  );
};

export default Sandbox;
