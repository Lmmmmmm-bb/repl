import { type FC, useEffect } from 'react';
import type { Plugin } from 'prettier';
import prettier from 'prettier/standalone';
import { prettierConfig } from './config';
import FormatIcon from '~/icons/Format';
import { getOrCreateModel, monaco } from '~/monaco';
import { getVirtualFileExt } from '~/virtual-file';
import { updateFileContent, useVirtualFileStore } from '~/stores/virtual-file';
import Container from '~/components/Container';

const { Action } = Container;

const Format: FC = () => {
  const activeFile = useVirtualFileStore(state => state.activeFile);

  const handleFormat = async () => {
    let prettierPlugins: Plugin[] = [];
    const ext = getVirtualFileExt(activeFile.filename);

    if (ext === 'css') {
      const parserCSS = await import('prettier/parser-postcss');
      prettierPlugins = [parserCSS];
    } else {
      prettierPlugins = await Promise.all([
        import('prettier/plugins/estree'),
        ext === 'json'
          ? import('prettier/plugins/babel')
          : import('prettier/plugins/typescript'),
      ]) as Plugin[];
    }

    const parser = ext === 'css'
      ? 'css'
      : ext === 'json' ? 'json' : 'typescript';
    const formatCode = await prettier.format(activeFile.code, {
      parser,
      plugins: prettierPlugins,
      ...prettierConfig,
    });

    updateFileContent(formatCode);
    const model = getOrCreateModel(activeFile);
    model.setValue(formatCode);
  };

  useEffect(() => {
    const disposable = monaco.editor.registerCommand('format-code', () => {
      handleFormat();
    });

    return () => {
      disposable.dispose();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Action title="[⌥⇧F] Format Code" onClick={handleFormat}>
      <FormatIcon className="w-5 h-5" />
    </Action>
  );
};

export default Format;
