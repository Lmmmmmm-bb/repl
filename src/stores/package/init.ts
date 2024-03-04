import type { CorePackage, PackageStore } from './types';
import { decompress } from '~/utils/compress';

export const initialCorePackages: CorePackage[] = [
  { name: 'react', version: 'latest' },
  { name: 'react-dom', version: 'latest' },
  { name: '@types/react', version: 'latest', optional: true },
  { name: '@types/react-dom', version: 'latest', optional: true },
];

export const restorePackageStore = (): PackageStore => {
  const hash = location.hash.slice(1);
  const initialStore: PackageStore = {
    corePackages: [...initialCorePackages],
    extraPackages: [],
    corePackageDisposal: new Map(),
    extraPackageDisposal: new Map(),
  };

  if (!hash.length) {
    return initialStore;
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
    return initialStore;
  }
};
