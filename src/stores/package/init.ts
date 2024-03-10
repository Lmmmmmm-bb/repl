import type { CorePackage, PackageStore } from './types';
import { decompress } from '~/utils/compress';

const defaultCorePackages: CorePackage[] = [
  { name: 'react', version: 'latest' },
  { name: 'react-dom', version: 'latest' },
  { name: '@types/react', version: 'latest', optional: true },
  { name: '@types/react-dom', version: 'latest', optional: true },
];

export const defaultPackageStore: PackageStore = {
  corePackages: [...defaultCorePackages],
  extraPackages: [],
  corePackageDisposal: new Map(),
  extraPackageDisposal: new Map(),
};

export const restorePackageStore = (): PackageStore => {
  const hash = location.hash.slice(1);

  if (!hash.length) {
    return { ...defaultPackageStore };
  }

  try {
    const restore = JSON.parse(decompress(hash));

    return {
      corePackages: restore.corePackages,
      extraPackages: restore.extraPackages,
      corePackageDisposal: new Map(),
      extraPackageDisposal: new Map(),
    };
  } catch (error) {
    return { ...defaultPackageStore };
  }
};
