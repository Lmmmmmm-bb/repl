import type { editor } from 'monaco-editor';

export const monacoOptions: editor.IStandaloneEditorConstructionOptions = {
  tabSize: 2,
  fontSize: 13,
  lineNumbersMinChars: 4,
  folding: false,
  insertSpaces: true,
  smoothScrolling: true,
  automaticLayout: true,
  roundedSelection: true,
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
