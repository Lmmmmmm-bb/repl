import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  // plugins: [react()],
  resolve: {
    alias: {
      '~': resolve(__dirname, 'src'),
    },
  },
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks: {
          shiki: ['shiki', '@shikijs/monaco'],
          editorWorker: ['monaco-editor/esm/vs/editor/editor.worker.js'],
          monaco: ['monaco-editor'],
          resizablePanel: ['react-resizable-panels'],
        },
      },
    },
  },
});
