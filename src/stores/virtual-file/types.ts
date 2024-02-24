import type { VirtualFile } from '~/virtual-file';

export interface VirtualFileStore {
  files: Record<string, VirtualFile>;
  activeFile: VirtualFile;
}
