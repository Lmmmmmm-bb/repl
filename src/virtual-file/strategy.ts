import type { FileLanguageType } from './types';

import type { FileExtensionType } from '~/virtual-file';

export const virtualFileLanguageStrategy: Record<FileExtensionType, FileLanguageType> = {
  css: 'css',
  json: 'json',
  js: 'javascript',
  jsx: 'javascript',
  ts: 'typescript',
  tsx: 'typescript',
};
