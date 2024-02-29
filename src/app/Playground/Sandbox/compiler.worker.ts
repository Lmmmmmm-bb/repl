/// <reference lib="WebWorker" />

import { transform } from '~/compiler/transform';
import { MAIN_FILE } from '~/stores/virtual-file';

globalThis.addEventListener('message', (event: MessageEvent) => {
  try {
    const payload = event.data;
    globalThis.postMessage({
      type: 'COMPILER_DONE',
      data: transform(payload.files[MAIN_FILE], payload.files),
    });
  } catch (error) {
    if (error instanceof Error) {
      // remove message prefix filenames only keep the last
      const message = error.message.replace(/^.*\/(.*: .*)/, '$1');
      globalThis.postMessage({ type: 'COMPILER_ERROR', data: message });
    }
  }
});
