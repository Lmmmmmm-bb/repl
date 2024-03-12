import type { FC } from 'react';
import { useEditor } from '~/hooks/useEditor';

const Editor: FC = () => {
  const { containerRef } = useEditor();

  return (
    <div
      className="relative size-full overflow-hidden"
      ref={containerRef}
    />
  );
};

export default Editor;
