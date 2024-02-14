import { create } from 'zustand';
import type { ExtraLib, NpmPackage } from './types';
import { fetchPackageRaw } from './fetch';
import { registerTypeScriptLib } from '~/monaco';

interface PackageStore {
  initialExtraLibs: ExtraLib[];
  packages: NpmPackage[];
}

export const usePackageStore = create<PackageStore>(() => ({
  initialExtraLibs: [],
  packages: [],
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

  const { initialExtraLibs, packages } = usePackageStore.getState();
  if ('links' in lib) {
    const newExtraLibs = [...packages, lib];
    usePackageStore.setState({ packages: newExtraLibs });
  } else {
    const newInitialExtraLibs = [...initialExtraLibs, lib];
    usePackageStore.setState({ initialExtraLibs: newInitialExtraLibs });
  }
};

export const removePackage = (lib: ExtraLib | NpmPackage) => {
  const { initialExtraLibs, packages } = usePackageStore.getState();
  if ('links' in lib) {
    const newExtraLibs = packages.filter(item => item.name !== lib.name);
    usePackageStore.setState({ packages: newExtraLibs });
  } else {
    const newInitialExtraLibs = initialExtraLibs.filter(item => item.name !== lib.name);
    usePackageStore.setState({ initialExtraLibs: newInitialExtraLibs });
  }
};

export { ExtraLib, NpmPackage };
