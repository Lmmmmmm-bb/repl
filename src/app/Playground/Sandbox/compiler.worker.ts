/// <reference lib="WebWorker" />

import { transform } from '~/compiler/transform';
import { MAIN_FILE, MAIN_LEGACY_FILE } from '~/stores/virtual-file';

globalThis.addEventListener('message', (event: MessageEvent) => {
  try {
    const payload = event.data;
    const entryFile = payload.isLegacy ? MAIN_LEGACY_FILE : MAIN_FILE;
    globalThis.postMessage({
      type: 'COMPILER_DONE',
      data: transform(payload.files[entryFile], payload.files),
    });
  } catch (error) {
    if (error instanceof Error) {
      // remove message prefix filenames only keep the last
      // eslint-disable-next-line regexp/no-super-linear-backtracking
      const message = error.message.replace(/^.*\/(.*: .*)/, '$1');
      globalThis.postMessage({ type: 'COMPILER_ERROR', data: message });
    }
  }
});
