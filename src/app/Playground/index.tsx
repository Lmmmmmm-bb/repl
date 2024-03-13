import { type FC, useRef, useState } from 'react';
import type { ImperativePanelGroupHandle } from 'react-resizable-panels';

import Editor from './Editor';
import FileTabs from './FileTabs';
import Sandbox from './Sandbox';
import Format from './Format';
import DeviceSelect from './DeviceSelect';
import { DEVICE_SIZE } from './config';
import Console from './Console';
import Clear from './Clear';
import ConsoleLevelFilter from './ConsoleLevelFilter';
import type { ConsoleSelectType } from './types';
import Container from '~/components/Container';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '~/components/ui/Resizable';
import { useMediaQuery } from '~/hooks/useMediaQuery';

const Playground: FC = () => {
  const isDesktopScreen = useMediaQuery('(min-width: 1024px)');
  const resizableRef = useRef<ImperativePanelGroupHandle>(null);

  const [filterMessageType, setFilterMessageType] = useState<ConsoleSelectType>('all');
  const [deviceName, setDeviceName] = useState<keyof typeof DEVICE_SIZE>('Default');
  const [sandboxWidth, sandboxHeight] = DEVICE_SIZE[deviceName];

  const handleResetLayout = () => resizableRef.current && resizableRef.current.setLayout([50, 50]);

  return (
    <ResizablePanelGroup
      ref={resizableRef}
      direction={isDesktopScreen ? 'horizontal' : 'vertical'}
    >
      <ResizablePanel>
        <Container title="Editor" action={<Format />}>
          <FileTabs />
          <Editor />
        </Container>
      </ResizablePanel>

      <ResizableHandle onDoubleClick={handleResetLayout} />

      <ResizablePanel>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel>
            <Container
              title="Preview"
              action={<DeviceSelect value={deviceName} onChange={setDeviceName} />}
            >
              <Sandbox sandboxWidth={sandboxWidth} sandboxHeight={sandboxHeight} />
            </Container>
          </ResizablePanel>

          <ResizableHandle />

          <ResizablePanel defaultSize={isDesktopScreen ? 25 : 0}>
            <Container
              title="Console"
              action={(
                <div className="flex h-full">
                  <ConsoleLevelFilter
                    value={filterMessageType}
                    onChange={setFilterMessageType}
                  />
                  <Clear />
                </div>
              )}
            >
              <Console filterType={filterMessageType} />
            </Container>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default Playground;
