import { create } from 'zustand';
import type { ExtraLib, NpmPackage } from './types';
import { fetchPackageRaw } from './fetch';
import { registerTypeScriptLib } from '~/monaco';

interface PackageStore {
  corePackages: ExtraLib[];
  extraPackages: NpmPackage[];
}

export const usePackageStore = create<PackageStore>(() => ({
  corePackages: [],
  extraPackages: [],
}));

export const addPackage = async (lib: ExtraLib | NpmPackage) => {
  const dts = await fetchPackageRaw(lib);

  const moduleName = lib.name.startsWith('@types/') ? lib.name.split('/')[1] : lib.name;
  registerTypeScriptLib(
    `declare module '${moduleName}' {
      ${dts}
    }`,
    `file:///node_modules/${lib.name}`,
  );

  const { corePackages, extraPackages } = usePackageStore.getState();
  if ('links' in lib) {
    const newExtraLibs = [...extraPackages, lib];
    usePackageStore.setState({ extraPackages: newExtraLibs });
  } else {
    const newInitialExtraLibs = [...corePackages, lib];
    usePackageStore.setState({ corePackages: newInitialExtraLibs });
  }
};

export const removePackage = (lib: ExtraLib | NpmPackage) => {
  const { corePackages, extraPackages } = usePackageStore.getState();
  if ('links' in lib) {
    const newExtraLibs = extraPackages.filter(item => item.name !== lib.name);
    usePackageStore.setState({ extraPackages: newExtraLibs });
  } else {
    const newInitialExtraLibs = corePackages.filter(item => item.name !== lib.name);
    usePackageStore.setState({ corePackages: newInitialExtraLibs });
  }
};

export { ExtraLib, NpmPackage };
