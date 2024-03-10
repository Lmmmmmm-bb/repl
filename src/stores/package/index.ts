import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { useVirtualFileStore } from '../virtual-file';
import { getImportMap } from './utils';
import { defaultPackageStore, restorePackageStore } from './init';
import type { CorePackage, Package, PackageStore } from './types';
import { compress } from '~/utils/compress';

export const initialPackageStore = restorePackageStore();

export const usePackageStore = create(
  subscribeWithSelector<PackageStore>(
    () => ({ ...initialPackageStore }),
  ),
);

usePackageStore.subscribe(
  state => ({
    corePackages: state.corePackages,
    extraPackages: state.extraPackages,
  }),
  (state) => {
    const { files } = useVirtualFileStore.getState();
    const store = { ...state, files };
    const hash = `#${compress(JSON.stringify(store))}`;
    history.replaceState({}, '', hash);
  },
);

export const addCorePackage = (lib: CorePackage) => {
  const { corePackages } = usePackageStore.getState();

  const newCorePackages = corePackages
    .reduce<CorePackage[]>(
      (packages, currentPackages) => {
        const _package = currentPackages.name === lib.name
          ? lib
          : currentPackages;
        return [...packages, _package];
      },
      [],
    );

  usePackageStore.setState({ corePackages: newCorePackages });
};

export const addExtraPackage = (lib: Package) => {
  const { extraPackages } = usePackageStore.getState();
  const newExtraLibs = [...extraPackages, lib];
  usePackageStore.setState({ extraPackages: newExtraLibs });
};

export const removeExtraPackage = (lib: Package) => {
  const { extraPackages, extraPackageDisposal } = usePackageStore.getState();
  const newExtraLibs = extraPackages.filter(item => item.name !== lib.name);
  usePackageStore.setState({ extraPackages: newExtraLibs });

  const disposeLib = extraPackageDisposal.get(lib.name);
  disposeLib && extraPackageDisposal.delete(lib.name) && disposeLib();
};

export const resetPackageStore = () => {
  const { corePackageDisposal, extraPackageDisposal } = usePackageStore.getState();

  corePackageDisposal.forEach(disposal => disposal());
  corePackageDisposal.clear();
  extraPackageDisposal.forEach(disposal => disposal());
  extraPackageDisposal.clear();

  usePackageStore.setState({ ...defaultPackageStore });
};

export { CorePackage, Package, getImportMap };
