import * as monaco from 'monaco-editor';

import { initEnvWorker } from './env';
import { initHighlight } from './highlight';
import { registerExtraLib } from './extra-lib';
import { registerLanguages } from './language';

let isMonacoInitialized = false;
export const setupMonaco = () => {
  if (isMonacoInitialized) {
    return monaco;
  }

  initEnvWorker();
  registerLanguages();
  initHighlight();

  registerExtraLib();

  isMonacoInitialized = true;

  return monaco;
};
