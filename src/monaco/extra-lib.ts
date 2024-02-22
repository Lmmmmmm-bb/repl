import * as monaco from 'monaco-editor';
import type { Package } from '~/stores/package';
import { usePackageStore } from '~/stores/package';
import { fetchPackageFileRaw } from '~/apis/package-raw';

export const registerExtraLib = (content: string, path: string) => {
  const tsDisposal = monaco.languages.typescript.typescriptDefaults.addExtraLib(content, path);
  const jsDisposal = monaco.languages.typescript.javascriptDefaults.addExtraLib(content, path);

  return () => {
    tsDisposal.dispose();
    jsDisposal.dispose();
  };
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
