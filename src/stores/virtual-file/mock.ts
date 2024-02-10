import type { VirtualFile } from '~/virtual-file';
import CountRaw from '~/templates/Count?raw';

export const mock: Record<string, VirtualFile> = {
  'App.tsx': {
    filename: 'App.tsx',
    code: CountRaw,
  },
  'index.ts': {
    filename: 'index.ts',
    code: '2',
  },
  'test.jsx': {
    filename: 'test.jsx',
    code: '3',
  },
  'index.css': {
    filename: 'index.css',
    code: '4',
  },
  'package.json': {
    filename: 'package.json',
    code: '5',
  },
  'index.html': {
    filename: 'index.html',
    code: '6',
  },
};
