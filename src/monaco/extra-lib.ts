import { registerLib } from './utils';
import type { Package } from '~/stores/package';
import { initPackageStore, usePackageStore } from '~/stores/package';
import { fetchPackageFileRaw } from '~/apis/package-raw';

export const registerExtraPackage = async (lib: Package) => {
  const dts = await fetchPackageFileRaw(lib);

  const isDeclareLib = lib.name.startsWith('@types/');
  const moduleName = isDeclareLib ? lib.name.split('/')[1] : lib.name;
  const libDisposal = registerLib(
    `declare module '${moduleName}' {
      ${dts}
    }`,
    `file:///node_modules/${lib.name}`,
  );

  return libDisposal;
};

export const addExtraPackage = async (lib: Package) => {
  const libDisposal = await registerExtraPackage(lib);

  const { extraPackages, extraPackageDisposal } = usePackageStore.getState();
  extraPackageDisposal.set(lib.name, libDisposal);
  const newExtraLibs = [...extraPackages, lib];
  usePackageStore.setState({ extraPackages: newExtraLibs });
};

export const initExtraLib = () => {
  registerLib(
    `declare module "*.json" {
      const value: any;
      export default value;
    }`,
    'file:///node_modules/client.d.ts',
  );

  initPackageStore.extraPackages.forEach(item => registerExtraPackage(item));
};
