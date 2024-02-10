import * as monaco from 'monaco-editor';
import { type VirtualFile, getVirtualFileLanguage } from '~/virtual-file';

export const getOrCreateModel = (file: VirtualFile) => {
  const uri = monaco.Uri.parse(file.filename);
  const model = monaco.editor.getModel(uri); ;

  if (model) {
    model.setValue(file.code);
    return model;
  }

  return monaco.editor.createModel(
    file.code,
    getVirtualFileLanguage(file.filename),
    uri,
  );
};
