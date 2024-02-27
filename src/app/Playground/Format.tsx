import { type FC, useCallback, useEffect } from 'react';
import FormatIcon from '~/icons/Format';
import { formatCode } from '~/utils/prettier';
import Container from '~/components/Container';
import { getOrCreateMonacoModel, monaco } from '~/monaco';
import { updateFileContent, useVirtualFileStore } from '~/stores/virtual-file';

const { Action } = Container;

const Format: FC = () => {
  const activeFile = useVirtualFileStore(state => state.activeFile);

  const handleFormat = useCallback(async () => {
    const formattedCode = await formatCode(activeFile);

    updateFileContent(formattedCode);
    const model = getOrCreateMonacoModel(activeFile);
    model.setValue(formattedCode);
  }, [activeFile]);

  useEffect(() => {
    const disposable = monaco.editor.registerCommand(
      'format-code',
      () => handleFormat(),
    );

    return () => {
      disposable.dispose();
    };
  }, [handleFormat]);

  return (
    <Action title="[⌥⇧F] Format Code" onClick={handleFormat}>
      <FormatIcon className="w-5 h-5" />
    </Action>
  );
};

export default Format;
