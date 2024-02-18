/// <reference lib="WebWorker" />

import { transform } from '~/compiler/transform';
import { MAIN_FILE } from '~/stores/virtual-file';

globalThis.addEventListener('message', (event: MessageEvent) => {
  const payload = event.data;
  globalThis.postMessage({
    type: 'COMPILER_DONE',
    data: transform(payload.files[MAIN_FILE], payload.files),
  });
});
