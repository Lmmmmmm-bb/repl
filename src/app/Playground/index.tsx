import { type FC, useRef } from 'react';
import type { ImperativePanelGroupHandle } from 'react-resizable-panels';

import Editor from './Editor';
import FileTabs from './FileTabs';
import Sandbox from './Sandbox';
import Container from '~/components/Container';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '~/components/ui/Resizable';

const Playground: FC = () => {
  const resizableRef = useRef<ImperativePanelGroupHandle>(null);

  const handleResetLayout = () => {
    resizableRef.current && resizableRef.current.setLayout([50, 50]);
  };

  return (
    <ResizablePanelGroup direction="horizontal" ref={resizableRef}>
      <ResizablePanel>
        <Container title="Editor">
          <FileTabs />
          <Editor />
        </Container>
      </ResizablePanel>

      <ResizableHandle onDoubleClick={handleResetLayout} />

      <ResizablePanel>
        <Container title="Preview">
          <Sandbox />
        </Container>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default Playground;
