import { type FC, useState } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import Editor from './Editor';
import { cn } from '~/utils/cn';

const Playground: FC = () => {
  const [hiddenPanel, setHiddenPanel] = useState<'left' | 'right'>();

  const handleLayoutChange = (layout: number[]) => {
    const [leftPanelSize, rightPanelSize] = layout;

    if (leftPanelSize === 0) {
      setHiddenPanel('left');
    } else if (rightPanelSize === 0) {
      setHiddenPanel('right');
    } else {
      setHiddenPanel(undefined);
    }
  };

  return (
    <PanelGroup direction="horizontal" onLayout={handleLayoutChange}>
      <Panel
        className={cn(
          ['border', 'rounded-lg'],
          { 'border-0': hiddenPanel === 'left' },
        )}
      >
        <Editor />
      </Panel>
      <PanelResizeHandle />
      <Panel
        className={cn(
          ['border', 'rounded-lg'],
          { 'border-0': hiddenPanel === 'right' },
        )}
      />
    </PanelGroup>
  );
};

export default Playground;
