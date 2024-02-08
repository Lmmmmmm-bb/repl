import type { editor } from 'monaco-editor';

export const monacoOptions: editor.IStandaloneEditorConstructionOptions = {
  tabSize: 2,
  fontSize: 13,
  folding: false,
  lineNumbersMinChars: 4,
  insertSpaces: true,
  smoothScrolling: true,
  automaticLayout: true,
  detectIndentation: false,
  fixedOverflowWidgets: true,
  scrollBeyondLastLine: false,
  lineNumbers: 'interval',
  cursorSmoothCaretAnimation: 'on',
  minimap: {
    enabled: false,
  },
  inlineSuggest: {
    enabled: false,
  },
  guides: {
    bracketPairs: 'active',
  },
  scrollbar: {
    verticalSliderSize: 6,
    horizontalSliderSize: 6,
    verticalScrollbarSize: 6,
    horizontalScrollbarSize: 6,
  },
};
