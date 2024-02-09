import { virtualFileLanguageStrategy } from './strategy';
import type { FileExtensionType, FileLanguageType, VirtualFile } from './types';

export const createVirtualFile = (
  filename: string,
  code: string,
  hidden = false,
): VirtualFile => {
  if (!/\.(jsx?|tsx?|html|css|json)$/.test(filename)) {
    throw new Error(
      'Playground only supports *.html, *.css, *.json, *.jsx?, *.tsx? files.',
    );
  }

  return ({ filename, code, hidden });
};

export const getVirtualFileLanguage = (filename: string): FileLanguageType => {
  const match = filename.match(/[^.]+$/);
  return match ? virtualFileLanguageStrategy[match[0]] : 'javascript';
};

export const getVirtualFileExt = (filename: string): FileExtensionType => {
  const match = filename.match(/[^.]+$/);
  return match ? match[0] as FileExtensionType : 'tsx';
};

export {
  FileLanguageType,
  FileExtensionType,
  VirtualFile,
};
