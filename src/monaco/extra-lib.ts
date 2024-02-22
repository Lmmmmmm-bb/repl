import * as monaco from 'monaco-editor';
import type { Package } from '~/stores/package';
import { initPackageStore, usePackageStore } from '~/stores/package';
import { fetchPackageFileRaw } from '~/apis/package-raw';

export const registerExtraLib = (content: string, path: string) => {
  const tsDisposal = monaco.languages.typescript.typescriptDefaults.addExtraLib(content, path);
  const jsDisposal = monaco.languages.typescript.javascriptDefaults.addExtraLib(content, path);

  return () => {
    tsDisposal.dispose();
    jsDisposal.dispose();
  };
};

export const registerExtraPackage = async (lib: Package) => {
  const dts = await fetchPackageFileRaw(lib);

  const isDeclareLib = lib.name.startsWith('@types/');
  const moduleName = isDeclareLib ? lib.name.split('/')[1] : lib.name;
  const libDisposal = registerExtraLib(
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
  registerExtraLib(
    `declare module "*.json" {
      const value: any;
      export default value;
    }`,
    'file:///node_modules/client.d.ts',
  );

  initPackageStore.extraPackages.forEach(item => registerExtraPackage(item));
};
