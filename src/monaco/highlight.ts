import * as monaco from 'monaco-editor';
import { emmetCSS, emmetHTML, emmetJSX } from 'emmet-monaco-es';
import { shikiToMonaco } from '@shikijs/monaco';
import { getHighlighter } from 'shiki';

const highlighter = await getHighlighter({
  themes: ['vitesse-dark', 'vitesse-light'],
  langs: ['tsx', 'jsx', 'json', 'css', 'html'],
});

export const initHighlight = () => {
  emmetCSS(monaco, ['css']);
  emmetHTML(monaco, ['html']);
  emmetJSX(monaco, ['javascript', 'typescript']);

  shikiToMonaco(highlighter, monaco);
};
