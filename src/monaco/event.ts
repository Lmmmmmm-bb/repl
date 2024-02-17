import * as monaco from 'monaco-editor';
import { setActiveFile, useVirtualFileStore } from '~/stores/virtual-file';

export const registerEditorEvent = () => {
  monaco.editor.registerEditorOpener({
    openCodeEditor: (_, resource) => {
      if (/^\/(?!node_modules)/.test(resource.path)) {
        const { activeFile, files } = useVirtualFileStore.getState();
        const filename = resource.path.replace(/^\/+/, '');
        activeFile.filename !== filename && setActiveFile(files[filename]);
        return true;
      }

      return false;
    },
  });
};
