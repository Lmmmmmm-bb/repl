import type { ExtraLib } from '~/stores/package';
import { addPackage } from '~/stores/package';

const initExtraLibs: ExtraLib[] = [
  { name: 'react', version: '18.2.0' },
  { name: 'react-dom', version: '18.2.0' },
  { name: '@types/react', version: 'latest' },
  { name: '@types/react-dom', version: 'latest' },
];

export const registerExtraLib = async () => {
  for (const extraLib of initExtraLibs) {
    await addPackage(extraLib);
  }
};
