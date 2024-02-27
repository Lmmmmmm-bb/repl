import * as monaco from 'monaco-editor';
import { type VirtualFile, getVirtualFileLanguage } from '~/virtual-file';

export const registerLib = (content: string, path: string) => {
  const tsDisposal = monaco.languages.typescript.typescriptDefaults.addExtraLib(content, path);
  const jsDisposal = monaco.languages.typescript.javascriptDefaults.addExtraLib(content, path);

  return () => {
    tsDisposal.dispose();
    jsDisposal.dispose();
  };
};

export const getOrCreateMonacoModel = (file: VirtualFile) => {
  const uri = monaco.Uri.parse(`file:///${file.filename}`);
  const model = monaco.editor.getModel(uri); ;

  if (model) {
    return model;
  }

  return monaco.editor.createModel(
    file.code,
    getVirtualFileLanguage(file.filename),
    uri,
  );
};
