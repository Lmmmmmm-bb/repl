import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { useVirtualFileStore } from '../virtual-file';
import { getImportMap } from './utils';
import { restorePackageStore } from './init';
import type { CorePackage, Package, PackageStore } from './types';
import { compress } from '~/utils/compress';

export const initPackageStore = restorePackageStore();

export const usePackageStore = create(
  subscribeWithSelector<PackageStore>(
    () => ({ ...initPackageStore }),
  ),
);

usePackageStore.subscribe(
  state => ({ corePackages: state.corePackages, extraPackages: state.extraPackages }),
  (state) => {
    const { files } = useVirtualFileStore.getState();
    const store = { ...state, files };
    const hash = `#${compress(JSON.stringify(store))}`;
    history.replaceState({}, '', hash);
  },
);

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
