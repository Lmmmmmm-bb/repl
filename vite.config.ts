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
  worker: {
    format: 'es',
  },
  define: {
    __BUILD_TIME__: JSON.stringify(
      new Date().toLocaleDateString(),
    ),
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
          prettier: ['prettier'],
          prettierPostcss: ['prettier/parser-postcss'],
          prettierTS: ['prettier/plugins/typescript'],
          prettierBabel: ['prettier/plugins/babel'],
          prettierEstree: ['prettier/plugins/estree'],
        },
      },
    },
  },
});
