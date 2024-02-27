import { setupMonaco } from './setup';

export const monaco = setupMonaco();

export { getOrCreateMonacoModel } from './utils';
export { monacoOptions } from './config';
export { registerCorePackageToMonaco } from './core-lib';
export { registerExtraPackageToMonaco } from './extra-lib';
