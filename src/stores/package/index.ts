import { create } from 'zustand';
import type { CorePackage, Package } from './types';
import { initialCorePackages } from './config';
import { getImportMap } from './utils';
import { registerExtraLib } from '~/monaco';
import { fetchPackageFileRaw } from '~/apis/package-raw';

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

export const addExtraPackage = async (lib: Package) => {
  const dts = await fetchPackageFileRaw(lib);

  const isDeclareLib = lib.name.startsWith('@types/');
  const moduleName = isDeclareLib ? lib.name.split('/')[1] : lib.name;
  const libDisposal = registerExtraLib(
    `declare module '${moduleName}' {
      ${dts}
    }`,
    `file:///node_modules/${lib.name}`,
  );

  const { extraPackages, extraPackageDisposal } = usePackageStore.getState();
  extraPackageDisposal.set(lib.name, libDisposal);
  const newExtraLibs = [...extraPackages, lib];
  usePackageStore.setState({ extraPackages: newExtraLibs });
};

export const removePackage = (lib: Package) => {
  const { extraPackages, extraPackageDisposal } = usePackageStore.getState();
  const newExtraLibs = extraPackages.filter(item => item.name !== lib.name);
  usePackageStore.setState({ extraPackages: newExtraLibs });

  const disposeLib = extraPackageDisposal.get(lib.name);
  disposeLib && disposeLib();
};

export { CorePackage, Package, getImportMap };
