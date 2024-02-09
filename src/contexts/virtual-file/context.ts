import { createContext } from 'react';
import { noop } from '../contants';
import type { VirtualFile } from '~/virtual-file';

interface VirtualFileContext {
  files: Record<string, VirtualFile>;
  activeFile: VirtualFile | undefined;
  createFile: (filename: string) => void;
  deleteFile: (filename: string) => void;
  setActiveFile: (file: VirtualFile) => void;
  updateFileContent: (code: string) => void;
}

export const virtualFileContext = createContext<VirtualFileContext>({
  files: {},
  activeFile: undefined,
  setActiveFile: noop,
  createFile: noop,
  deleteFile: noop,
  updateFileContent: noop,
});
