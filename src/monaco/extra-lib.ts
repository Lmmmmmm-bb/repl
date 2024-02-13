import type { ExtraLib } from '~/stores/extra-lib';
import { addExtraLib } from '~/stores/extra-lib';

const initExtraLibs: ExtraLib[] = [
  { name: 'react', version: 'latest' },
  { name: '@types/react', version: 'latest' },
  { name: 'react-dom', version: 'latest' },
  { name: '@types/react-dom', version: 'latest' },
];

export const registerExtraLib = async () => {
  initExtraLibs.forEach(addExtraLib);
};
