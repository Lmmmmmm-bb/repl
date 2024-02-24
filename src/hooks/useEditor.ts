import { useEffect, useRef } from 'react';
import type { editor } from 'monaco-editor';
import { getOrCreateModel, monaco, monacoOptions } from '~/monaco';
import { updateFileContent, useVirtualFileStore } from '~/stores/virtual-file';

export const useEditor = () => {
  const { activeFile } = useVirtualFileStore();

  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<editor.IStandaloneCodeEditor>();

  useEffect(() => {
    if (!containerRef.current) {
      throw new Error('Cannot find editor container');
    }

    const monacoInstance = monaco.editor.create(containerRef.current, monacoOptions);
    monacoInstance.onDidChangeModelContent(
      () => updateFileContent(monacoInstance.getValue()),
    );
    monacoInstance.addCommand(
      monaco.KeyMod.Shift | monaco.KeyMod.Alt | monaco.KeyCode.KeyF,
      () => monacoInstance.trigger('format-code', 'format-code', null),
    );

    editorRef.current = monacoInstance;

    return () => {
      editorRef.current && editorRef.current.dispose();
      editorRef.current = undefined;
    };
  }, []);

  useEffect(() => {
    if (!editorRef.current || !activeFile) {
      return;
    }

    const model = getOrCreateModel(activeFile);
    editorRef.current.setModel(model);
    editorRef.current.focus();
  }, [activeFile]);

  return { containerRef };
};
