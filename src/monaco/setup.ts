import * as monaco from 'monaco-editor';

import { initModel } from './model';
import { initEnvWorker } from './env';
import { initEditorEvent } from './event';
import { initLanguages } from './language';
import { initCoreLib } from './core-lib';
import { initExtraLib } from './extra-lib';
import { initHighlight } from './highlight';

let isMonacoInitialized = false;
export const setupMonaco = () => {
  if (isMonacoInitialized) {
    return monaco;
  }

  initEnvWorker();
  initLanguages();
  initHighlight();
  initEditorEvent();
  initCoreLib();
  initExtraLib();
  initModel();

  isMonacoInitialized = true;

  return monaco;
};
