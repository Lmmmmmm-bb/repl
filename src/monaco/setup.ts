import * as monaco from 'monaco-editor';

import { initEnvWorker } from './env';
import { initHighlight } from './highlight';
import { registerCoreLib } from './core-lib';
import { registerLanguages } from './language';
import { registerEditorEvent } from './event';
import { getOrCreateModel } from './utils';
import { initVirtualFileStore } from '~/stores/virtual-file';

let isMonacoInitialized = false;
export const setupMonaco = () => {
  if (isMonacoInitialized) {
    return monaco;
  }

  initEnvWorker();
  registerLanguages();
  initHighlight();
  registerEditorEvent();
  registerCoreLib();

  Object.values(initVirtualFileStore.files).forEach(item => getOrCreateModel(item));

  isMonacoInitialized = true;

  return monaco;
};
