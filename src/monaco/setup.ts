import * as monaco from 'monaco-editor';

import { initCoreLib } from './core-lib';
import { initEnvWorker } from './env';
import { initEditorEvent } from './event';
import { initExtraLib } from './extra-lib';
import { initHighlight } from './highlight';
import { initLanguages } from './language';
import { initModels } from './model';

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
  initModels();

  isMonacoInitialized = true;

  return monaco;
};
