import * as monaco from 'monaco-editor';
import { getHighlighter } from 'shiki';
import { shikiToMonaco } from '@shikijs/monaco';

const highlighter = await getHighlighter({
  themes: ['vitesse-dark', 'vitesse-light'],
  langs: ['javascript', 'typescript', 'json', 'css', 'html'],
});

export const initHighlight = () => {
  shikiToMonaco(highlighter, monaco);
};
