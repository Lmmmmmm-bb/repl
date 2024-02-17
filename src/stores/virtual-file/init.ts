import { ENTRY_FILE, MAIN_FILE } from './config';
import type { VirtualFile } from '~/virtual-file';

import MainRaw from '~/templates/Main?raw';
import AppRaw from '~/templates/App?raw';

export const initialFiles: Record<string, VirtualFile> = {
  [MAIN_FILE]: {
    hidden: true,
    filename: MAIN_FILE,
    code: MainRaw,
  },
  [ENTRY_FILE]: {
    filename: ENTRY_FILE,
    code: AppRaw,
  },
};
