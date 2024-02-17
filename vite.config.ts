import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '~': resolve(__dirname, 'src'),
    },
  },
  build: {
    target: 'esnext',
    rollupOptions: {
      input: [
        './index.html',
        './__play.html',
      ],
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
