import { useEffect, useRef } from 'react';
import type { editor } from 'monaco-editor';
import { monaco, monacoOptions } from '~/monaco';
import { updateFileContent } from '~/stores/virtual-file';

export const useEditor = () => {
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

  return {
    editorRef,
    containerRef,
  };
};
