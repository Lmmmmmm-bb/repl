import * as monaco from 'monaco-editor';
import { initVirtualFileStore } from '~/stores/virtual-file';
import { defaultVirtualFileStore } from '~/stores/virtual-file/init';
import { getOrCreateMonacoModel } from './utils';

export const initModels = () => {
  Object.values(initVirtualFileStore.files)
    .forEach(item => getOrCreateMonacoModel(item));
};

export const resetModels = () => {
  const models = monaco.editor.getModels();
  models.forEach(model => model.dispose());

  Object.values(defaultVirtualFileStore.files)
    .forEach(item => getOrCreateMonacoModel(item));
};
