import { setupMonaco } from './setup';

export const monaco = setupMonaco();

export { getOrCreateModel } from './utils';
export { monacoOptions } from './config';
export { registerTypeScriptLib } from './language';
