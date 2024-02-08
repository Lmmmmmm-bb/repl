import type { FC } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import Editor from './Editor';
import Container from '~/components/Container';

const Playground: FC = () => (
  <PanelGroup direction="horizontal">
    <Panel>
      <Container title="Editor">
        <Editor />
      </Container>
    </Panel>

    <PanelResizeHandle />

    <Panel>
      <Container title="Preview">
        <div className="h-full">
          123
        </div>
      </Container>
    </Panel>
  </PanelGroup>
);

export default Playground;
