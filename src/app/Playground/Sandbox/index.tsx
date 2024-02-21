import { useEffect, useMemo, useRef } from 'react';
import type { CSSProperties, FC } from 'react';
import { useCompilerWorker } from './useCompilerWorker';
import { useSandbox } from './useSandbox';
import { sandboxAttr } from './config';
import { useThemeStore } from '~/stores/theme';
import { useVirtualFileStore } from '~/stores/virtual-file';
import { usePackageStore } from '~/stores/package';
import { useElementSize } from '~/hooks/useElementSize';
import { cn } from '~/utils/cn';

interface SandboxProps {
  sandboxWidth: number;
  sandboxHeight: number;
}

const Sandbox: FC<SandboxProps> = ({ sandboxWidth, sandboxHeight }) => {
  const theme = useThemeStore(state => state.theme);
  const files = useVirtualFileStore(state => state.files);
  const extraPackages = usePackageStore(state => state.extraPackages);

  const sandboxContainerRef = useRef<HTMLDivElement>(null);
  const { sandboxRef, refreshSandbox, sendSandboxMessage } = useSandbox();

  const { width, height } = useElementSize(sandboxContainerRef);
  const isDefaultDevice = !sandboxWidth && !sandboxHeight;
  const sandboxStyle = useMemo<CSSProperties>(
    () => {
      if (isDefaultDevice) {
        return {};
      }

      const scaleValue = isDefaultDevice
        ? 1
        : Math.min(width / sandboxWidth, height / sandboxHeight);
      return {
        width: sandboxWidth,
        height: sandboxHeight,
        transform: `scale(${scaleValue})`,
        transformOrigin: 'center center',
      };
    },
    [height, isDefaultDevice, sandboxHeight, sandboxWidth, width],
  );

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
    <div
      ref={sandboxContainerRef}
      className={cn(
        ['w-full', 'h-full'],
        !isDefaultDevice && ['p-8', 'grid', 'place-content-center'],
      )}
    >
      <iframe
        style={sandboxStyle}
        ref={sandboxRef}
        sandbox={sandboxAttr}
        className={cn(
          ['w-full', 'h-full'],
          !isDefaultDevice && ['border', 'rounded-md', 'overflow-hidden'],
        )}
        onLoad={handleSandboxLoad}
      />
    </div>
  );
};

export default Sandbox;
