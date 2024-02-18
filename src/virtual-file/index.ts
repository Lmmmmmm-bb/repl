import { VALID_FILENAME_REGEX, VALID_FILE_EXT_REGEX } from './config';
import { virtualFileLanguageStrategy } from './strategy';
import type { FileExtensionType, FileLanguageType, VirtualFile } from './types';

export const isValidFileExtension = (filename: string) => VALID_FILE_EXT_REGEX.test(filename);

export const isValidFilename = (filename: string) => VALID_FILENAME_REGEX.test(filename);

export const createVirtualFile = (
  filename: string,
  code: string,
  hidden = false,
): VirtualFile => {
  if (!isValidFileExtension(filename)) {
    throw new Error(
      'Playground only supports, *.css, *.json, *.js, *.jsx, *.ts, *.tsx files.',
    );
  }

  if (!isValidFilename(filename)) {
    throw new Error(
      'The filename contains illegal characters.\nA valid filename must not include any of the following characters: < > : \" / \\ | ? *.',
    );
  }

  return { filename, code, hidden };
};

export const getVirtualFileLanguage = (filename: string): FileLanguageType => {
  if (!isValidFilename(filename)) {
    throw new Error('Virtual Filename is invalidate.');
  }

  const match = filename.match(/[^.]+$/)!;
  return virtualFileLanguageStrategy[match[0] as FileExtensionType];
};

export const getVirtualFileExt = (filename: string): FileExtensionType => {
  if (!isValidFilename(filename)) {
    throw new Error('Virtual Filename is invalidate.');
  }

  const match = filename.match(/[^.]+$/)!;
  return match[0] as FileExtensionType;
};

export {
  FileLanguageType,
  FileExtensionType,
  VirtualFile,
};
