import { type FC, useRef, useState } from 'react';
import type { ImperativePanelGroupHandle } from 'react-resizable-panels';

import Editor from './Editor';
import FileTabs from './FileTabs';
import Sandbox from './Sandbox';
import Format from './Format';
import DeviceSelect from './DeviceSelect';
import type { DEVICE_SIZE } from './config';
import Container from '~/components/Container';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '~/components/ui/Resizable';

const Playground: FC = () => {
  const resizableRef = useRef<ImperativePanelGroupHandle>(null);
  const [deviceName, setDeviceName] = useState<keyof typeof DEVICE_SIZE>('Default');

  const handleResetLayout = () => {
    resizableRef.current && resizableRef.current.setLayout([50, 50]);
  };

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
        <Container
          title="Preview"
          action={<DeviceSelect value={deviceName} onChange={setDeviceName} />}
        >
          <Sandbox />
        </Container>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default Playground;
