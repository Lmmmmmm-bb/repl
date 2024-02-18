import * as monaco from 'monaco-editor';
import { emmetCSS, emmetJSX } from 'emmet-monaco-es';
import wasmInlined from 'shiki/wasm';
import { shikiToMonaco } from '@shikijs/monaco';
import { getHighlighterCore } from 'shiki/core';
import LangTsx from 'shiki/langs/tsx.mjs';
import LangJsx from 'shiki/langs/jsx.mjs';
import LangJson from 'shiki/langs/json.mjs';
import LangCss from 'shiki/langs/css.mjs';
import VitesseLight from 'shiki/themes/vitesse-light.mjs';
import VitesseDark from 'shiki/themes/vitesse-dark.mjs';

const highlighter = await getHighlighterCore({
  loadWasm: wasmInlined,
  themes: [VitesseLight, VitesseDark],
  langs: [LangTsx, LangJsx, LangJson, LangCss],
});

export const initHighlight = () => {
  emmetCSS(monaco, ['css']);
  emmetJSX(monaco, ['javascript', 'typescript']);

  shikiToMonaco(highlighter, monaco);
};
