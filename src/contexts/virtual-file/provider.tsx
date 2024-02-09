import type { FC, PropsWithChildren } from 'react';
import { useState } from 'react';
import { virtualFileContext } from './context';
import { type VirtualFile, createVirtualFile } from '~/virtual-file';
import { getOrCreateModel } from '~/monaco/model';

const mock: Record<string, VirtualFile> = {
  'App.tsx': {
    filename: 'App.tsx',
    code: '1',
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

export const VirtualFileContext: FC<PropsWithChildren> = ({ children }) => {
  const [files, setFiles] = useState<Record<string, VirtualFile>>(mock);
  const [activeFile, setActiveFile] = useState<VirtualFile>(mock['App.tsx']);

  const handleSetActiveFile = (file: VirtualFile) => {
    setActiveFile(file);
    file && getOrCreateModel(file);
  };

  const handleCreateFile = (filename: string) => {
    if (files[filename]) {
      throw new Error(`File "${filename}" already exists.`);
    }

    const newFile = createVirtualFile(filename, '');
    setFiles({ ...files, [filename]: newFile });
  };

  const handleDeleteFile = (filename: string) => {
    const newFiles = { ...files };
    delete newFiles[filename];
    setFiles(newFiles);

    activeFile && activeFile.filename === filename && handleSetActiveFile(mock['App.tsx']);
  };

  const handleFileContentChange = (code: string) => {
    setFiles({
      ...files,
      [activeFile.filename]: { ...activeFile, code },
    });
  };

  return (
    <virtualFileContext.Provider
      value={{
        files,
        activeFile,
        setActiveFile: handleSetActiveFile,
        createFile: handleCreateFile,
        deleteFile: handleDeleteFile,
        updateFileContent: handleFileContentChange,
      }}
    >
      {children}
    </virtualFileContext.Provider>
  );
};
