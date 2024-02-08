import type { FC } from 'react';
import { useEffect, useRef } from 'react';
import type { editor } from 'monaco-editor';
import { monaco, monacoOptions } from '~/monaco';

const Editor: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<editor.IStandaloneCodeEditor>();

  useEffect(() => {
    if (!containerRef.current) {
      throw new Error('Cannot find editor container');
    }

    const model = monaco.editor.createModel('', 'typescript', monaco.Uri.parse(`${Date.now()}.tsx`));
    const monacoInstance = monaco.editor.create(containerRef.current, {
      ...monacoOptions,
      model,
    });

    editorRef.current = monacoInstance;

    return () => {
      editorRef.current && editorRef.current.dispose();
      editorRef.current = undefined;
    };
  }, []);

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      ref={containerRef}
    />
  );
};

export default Editor;
