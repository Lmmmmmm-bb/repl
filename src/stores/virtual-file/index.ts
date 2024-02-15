import { create } from 'zustand';
import { initialFiles } from './init';
import { type VirtualFile, createVirtualFile } from '~/virtual-file';

interface VirtualFileStore {
  files: Record<string, VirtualFile>;
  activeFile: VirtualFile;
}

export const useVirtualFileStore = create<VirtualFileStore>(() => ({
  files: initialFiles,
  activeFile: initialFiles['App.tsx'],
}));

export const setActiveFile = (file: VirtualFile) => {
  useVirtualFileStore.setState({ activeFile: file });
};

export const addFile = (filename: string) => {
  const { files } = useVirtualFileStore.getState();

  if (files[filename]) {
    throw new Error(`File "${filename}" already exists.`);
  }

  const newFile = createVirtualFile(filename, '');
  const newFiles = { ...files, [filename]: newFile };
  useVirtualFileStore.setState({ files: newFiles });

  setActiveFile(newFile);
};

export const deleteFile = (filename: string) => {
  const { files, activeFile } = useVirtualFileStore.getState();

  const _files = { ...files };
  delete _files[filename];
  useVirtualFileStore.setState({ files: _files });

  activeFile && activeFile.filename === filename && setActiveFile(initialFiles['App.tsx']);
};

export const updateFileContent = (code: string) => {
  const { files, activeFile } = useVirtualFileStore.getState();

  const updateFile = { ...activeFile, code };
  const newFiles = {
    ...files,
    [activeFile.filename]: updateFile,
  };
  useVirtualFileStore.setState(newFiles);
};

export { initialFiles };
