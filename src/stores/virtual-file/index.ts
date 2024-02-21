import { create } from 'zustand';
import { ENTRY_FILE, MAIN_FILE } from './config';
import { restoreVirtualFileStoreFromHash, utoa } from './utils';
import { type VirtualFile, createVirtualFile } from '~/virtual-file';

export interface VirtualFileStore {
  files: Record<string, VirtualFile>;
  activeFile: VirtualFile;
}

export const initVirtualFileStore = restoreVirtualFileStoreFromHash();

export const useVirtualFileStore = create<VirtualFileStore>(() => ({ ...initVirtualFileStore }));

useVirtualFileStore.subscribe((state) => {
  const hash = `#${utoa(JSON.stringify(state.files))}`;
  history.replaceState({}, '', hash);
});

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

  activeFile
  && activeFile.filename === filename
  && setActiveFile(files[ENTRY_FILE]);
};

export const updateFileContent = (code: string) => {
  const { files, activeFile } = useVirtualFileStore.getState();

  const updateFile = { ...activeFile, code };
  const newFiles = {
    ...files,
    [activeFile.filename]: updateFile,
  };
  useVirtualFileStore.setState({
    files: newFiles,
    activeFile: updateFile,
  });
};

export { ENTRY_FILE, MAIN_FILE };
