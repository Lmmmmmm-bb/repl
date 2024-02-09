import type { FC } from 'react';
import { useEffect, useRef } from 'react';
import type { editor } from 'monaco-editor';
import { monaco, monacoOptions } from '~/monaco';
import { useVirtualFileContext } from '~/contexts/virtual-file';
import { getOrCreateModel } from '~/monaco/model';

const Editor: FC = () => {
  const { activeFile, updateFileContent } = useVirtualFileContext();

  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<editor.IStandaloneCodeEditor>();

  useEffect(() => {
    if (!containerRef.current) {
      throw new Error('Cannot find editor container');
    }

    const monacoInstance = monaco.editor.create(containerRef.current, monacoOptions);
    monacoInstance.onDidChangeModelContent(() => {
      updateFileContent(monacoInstance.getValue());
    });

    editorRef.current = monacoInstance;

    return () => {
      editorRef.current && editorRef.current.dispose();
      editorRef.current = undefined;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!editorRef.current || !activeFile) {
      return;
    }

    const model = getOrCreateModel(activeFile);
    editorRef.current.setModel(model);
  }, [activeFile]);

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      ref={containerRef}
    />
  );
};

export default Editor;
