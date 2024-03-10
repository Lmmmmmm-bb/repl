import { setupMonaco } from './setup';

export const monaco = setupMonaco();

export { getOrCreateMonacoModel, resetMonaco } from './utils';
export { monacoOptions } from './config';
export { registerCorePackageToMonaco } from './core-lib';
export { registerExtraPackageToMonaco } from './extra-lib';
