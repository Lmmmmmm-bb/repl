import type { FC } from 'react';
import Editor from './Editor';
import FileTabs from './FileTabs';
import Container from '~/components/Container';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '~/components/ui/Resizable';

const Playground: FC = () => (
  <ResizablePanelGroup direction="horizontal">
    <ResizablePanel>
      <Container title="Editor">
        <FileTabs />
        <Editor />
      </Container>
    </ResizablePanel>

    <ResizableHandle />

    <ResizablePanel>
      <Container title="Editor">
        <div className="h-full">123</div>
      </Container>
    </ResizablePanel>
  </ResizablePanelGroup>
);

export default Playground;
