import { useEffect, useMemo, useRef } from 'react';
import type { CSSProperties, FC } from 'react';
import { appendMessage, clearMessage } from '../store';
import { useCompilerWorker } from './useCompilerWorker';
import { useSandbox } from './useSandbox';
import { sandboxAttr } from './config';
import { useThemeStore } from '~/stores/theme';
import { useVirtualFileStore } from '~/stores/virtual-file';
import { usePackageStore } from '~/stores/package';
import { useElementSize } from '~/hooks/useElementSize';
import { cn } from '~/utils/cn';
import { useToggle } from '~/hooks/useToggle';
import Loading from '~/icons/Loading';

interface SandboxProps {
  sandboxWidth: number;
  sandboxHeight: number;
}

const Sandbox: FC<SandboxProps> = ({ sandboxWidth, sandboxHeight }) => {
  const theme = useThemeStore(state => state.theme);
  const files = useVirtualFileStore(state => state.files);
  const extraPackages = usePackageStore(state => state.extraPackages);

  const [isSandboxMounting, toggleIsSandboxMounting] = useToggle();

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
    clearMessage();
    const payload = event.data;
    if (payload.type === 'COMPILER_ERROR') {
      appendMessage({ type: 'error', message: payload.data });
    } else if (payload.type === 'COMPILER_DONE') {
      sendSandboxMessage(payload);
    }
  });

  const handleSandboxLoad = () => sendWorkerMessage({ files });

  useEffect(() => {
    clearMessage();
    toggleIsSandboxMounting.on();
    refreshSandbox();
  }, [extraPackages, refreshSandbox, toggleIsSandboxMounting]);

  useEffect(() => {
    sendWorkerMessage({ files });
  }, [files, sendWorkerMessage]);

  useEffect(() => {
    sendSandboxMessage({ type: 'THEME_CHANGE', data: theme });
  }, [theme, sendSandboxMessage]);

  useEffect(() => {
    const handleMessageEvent = (event: MessageEvent) => {
      const payload = event.data;
      payload.type === 'REACT_MOUNT' && toggleIsSandboxMounting.off();
    };
    window.addEventListener('message', handleMessageEvent);

    return () => {
      window.removeEventListener('message', handleMessageEvent);
    };
  }, [toggleIsSandboxMounting]);

  return (
    <div
      ref={sandboxContainerRef}
      className={cn(
        ['relative', 'w-full', 'flex-grow', 'overflow-hidden'],
        !isDefaultDevice && ['p-8', 'grid', 'place-content-center'],
      )}
    >
      {isSandboxMounting && (
        <div
          className={cn(
            ['absolute', 'inset-0'],
            ['flex', 'flex-col', 'items-center', 'justify-center', 'gap-2'],
            ['backdrop-blur'],
          )}
        >
          <Loading className="w-6 h-6 animate-spin" />
          Mounting Playground
        </div>
      )}

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
