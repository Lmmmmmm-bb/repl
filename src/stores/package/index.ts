import { create } from 'zustand';
import { getImportMap } from './utils';
import { initialCorePackages } from './config';
import type { CorePackage, Package } from './types';

interface PackageStore {
  corePackages: CorePackage[];
  extraPackages: Package[];
  extraPackageDisposal: Map<string, () => void>;
}

export const usePackageStore = create<PackageStore>(() => ({
  corePackages: [...initialCorePackages],
  extraPackages: [],
  extraPackageDisposal: new Map<string, () => void>(),
}));

export const addCorePackage = (lib: CorePackage) => {
  const { corePackages } = usePackageStore.getState();
  usePackageStore.setState({
    corePackages: [...corePackages, lib],
  });
};

export const removePackage = (lib: Package) => {
  const { extraPackages, extraPackageDisposal } = usePackageStore.getState();
  const newExtraLibs = extraPackages.filter(item => item.name !== lib.name);
  usePackageStore.setState({ extraPackages: newExtraLibs });

  const disposeLib = extraPackageDisposal.get(lib.name);
  disposeLib && disposeLib();
};

export { CorePackage, Package, getImportMap };
