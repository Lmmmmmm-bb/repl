import { strFromU8, strToU8, unzlibSync, zlibSync } from 'fflate';
import { initialFiles } from './init';
import { ENTRY_FILE } from './config';
import type { VirtualFileStore } from '.';

export const utoa = (data: string) => {
  const buffer = strToU8(data);
  const zipped = zlibSync(buffer, { level: 9 });
  const binary = strFromU8(zipped, true);
  return btoa(binary);
};

export const atou = (base64: string) => {
  const binary = atob(base64);

  // zlib header (x78), level 9 (xDA)
  if (binary.startsWith('\x78\xDA')) {
    const buffer = strToU8(binary, true);
    const unzipped = unzlibSync(buffer);
    return strFromU8(unzipped);
  }

  // old unicode hacks for backward compatibility
  // https://base64.guru/developers/javascript/examples/unicode-strings
  return decodeURIComponent(escape(binary));
};

export const restoreVirtualFileStore = (): VirtualFileStore => {
  const hash = location.hash.slice(1);
  const initialStore: VirtualFileStore = {
    files: initialFiles,
    activeFile: initialFiles[ENTRY_FILE],
  };

  if (!hash.length) {
    return initialStore;
  }

  try {
    const restoreFiles = JSON.parse(atou(hash));

    return {
      files: restoreFiles,
      activeFile: restoreFiles[ENTRY_FILE],
    };
  } catch (error) {
    return initialStore;
  }
};
