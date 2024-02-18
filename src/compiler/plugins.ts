import { transform } from './transform';
import { getVirtualFileExt, isValidFilename } from '~/virtual-file';
import type { VirtualFile } from '~/virtual-file';

const getVirtualFileByImportPath = (importValue: string, files: Record<string, VirtualFile>) => {
  const importFilename = importValue.replace(/^\.\/+/, '');
  if (isValidFilename(importFilename)) {
    return files[importFilename];
  }
  const [file] = Object.values(files).filter((item) => {
    const rawFilename = item.filename.replace(/\.[^/.]+$/, '');
    return rawFilename === importFilename;
  });
  return file;
};

const transformCSSImport = (file: VirtualFile) => {
  const randomId = new Date().getTime();
  const styleIIFE = `
  (() => {
    let stylesheet = document.getElementById('style_${randomId}_${file.filename}');
    if (!stylesheet) {
      stylesheet = document.createElement('style')
      stylesheet.setAttribute('id', 'style_${randomId}_${file.filename}')
      document.head.appendChild(stylesheet)
    }
    const styles = document.createTextNode(\`${file.code}\`)
    stylesheet.innerHTML = ''
    stylesheet.appendChild(styles)
  })()
  `;
  return URL.createObjectURL(
    new Blob([styleIIFE], { type: 'application/javascript' }),
  );
};

const transformJsonImport = (file: VirtualFile) => {
  const jsonIIFE = `export default ${file.code}`;
  return URL.createObjectURL(
    new Blob([jsonIIFE], { type: 'application/javascript' }),
  );
};

export const esmImportTransformPlugin = (files: Record<string, VirtualFile>) => ({
  visitor: {
    ImportDeclaration(babel: any) {
      const importValue: string = babel.node.source.value;
      if (importValue.startsWith('./')) {
        const importFile = getVirtualFileByImportPath(importValue, files);
        if (!importFile) {
          return;
        }

        const ext = getVirtualFileExt(importFile.filename);
        if (ext === 'css') {
          babel.node.source.value = transformCSSImport(importFile);
        } else if (ext === 'json') {
          babel.node.source.value = transformJsonImport(importFile);
        } else {
          babel.node.source.value = URL.createObjectURL(
            new Blob(
              [transform(importFile, files)],
              { type: 'application/javascript' },
            ),
          );
        }
      }
    },
  },
});
