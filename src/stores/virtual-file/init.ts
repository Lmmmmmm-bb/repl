import type { VirtualFile } from '~/virtual-file';

import MainRaw from '~/templates/Main?raw';
import AppRaw from '~/templates/App?raw';

export const initialFiles: Record<string, VirtualFile> = {
  'Main.tsx': {
    hidden: true,
    filename: 'Main.tsx',
    code: MainRaw,
  },
  'App.tsx': {
    filename: 'App.tsx',
    code: AppRaw,
  },
};
