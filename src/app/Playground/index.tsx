import { type FC, useRef, useState } from 'react';
import type { ImperativePanelGroupHandle } from 'react-resizable-panels';

import Editor from './Editor';
import FileTabs from './FileTabs';
import Sandbox from './Sandbox';
import Format from './Format';
import DeviceSelect from './DeviceSelect';
import { DEVICE_SIZE } from './config';
import Console from './Console';
import Container from '~/components/Container';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '~/components/ui/Resizable';

const Playground: FC = () => {
  const resizableRef = useRef<ImperativePanelGroupHandle>(null);

  const [deviceName, setDeviceName] = useState<keyof typeof DEVICE_SIZE>('Default');
  const [sandboxWidth, sandboxHeight] = DEVICE_SIZE[deviceName];

  const handleResetLayout = () => resizableRef.current && resizableRef.current.setLayout([50, 50]);

  return (
    <ResizablePanelGroup direction="horizontal" ref={resizableRef}>
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

          <ResizablePanel defaultSize={25}>
            <Container title="Console">
              <Console />
            </Container>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default Playground;
