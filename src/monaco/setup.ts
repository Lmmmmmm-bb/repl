import * as monaco from 'monaco-editor';

import { initEnvWorker } from './env';
import { initHighlight } from './highlight';
import { registerExtraLib } from './extra-lib';
import { registerLanguages } from './language';
import { registerEditorEvent } from './event';
import { getOrCreateModel } from './utils';
import { initialFiles } from '~/stores/virtual-file';

let isMonacoInitialized = false;
export const setupMonaco = () => {
  if (isMonacoInitialized) {
    return monaco;
  }

  initEnvWorker();
  registerLanguages();
  initHighlight();
  registerEditorEvent();

  registerExtraLib();

  Object.values(initialFiles).forEach(item => getOrCreateModel(item));

  isMonacoInitialized = true;

  return monaco;
};
