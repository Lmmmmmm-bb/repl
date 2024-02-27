import { registerLib } from './utils';
import { fetchPackageFiles } from '~/apis/package-metadata';
import { fetchPackageFileRaw } from '~/apis/package-raw';
import { fetchPackageVersionList } from '~/apis/package-version-list';
import { type CorePackage, initPackageStore, usePackageStore } from '~/stores/package';

const beforeRegisterCorePackage = async () => {
  const corePackagesWithVersion: CorePackage[] = await Promise.all(
    initPackageStore.corePackages.map(async (lib) => {
      const versions = await fetchPackageVersionList(lib.name);
      const latestVersion = versions.tags.latest || versions.versions[0];
      return { ...lib, version: latestVersion };
    }),
  );

  return corePackagesWithVersion;
};

const disposalCorePackage = (lib: CorePackage) => {
  const { corePackageDisposal } = usePackageStore.getState();
  for (const disposalKey of corePackageDisposal.keys()) {
    if (disposalKey.includes(`${lib.name}/`)) {
      const disposal = corePackageDisposal.get(disposalKey);
      disposal && corePackageDisposal.delete(disposalKey) && disposal();
    }
  }
};

const DECLARE_FILE_REGEX = /\.d\.ts$|\.json$/;
export const registerCorePackageToMonaco = async (lib: CorePackage) => {
  const packageFiles = await fetchPackageFiles(lib);

  disposalCorePackage(lib);

  const { corePackageDisposal } = usePackageStore.getState();
  packageFiles
    .filter(item => DECLARE_FILE_REGEX.test(item.name))
    .forEach(async (item) => {
      const raw = await fetchPackageFileRaw(lib, item.name);
      const libPath = `${lib.name}${item.name}`;
      const libDisposal = registerLib(raw, `file:///node_modules/${libPath}`);
      corePackageDisposal.set(libPath, libDisposal);
    });
};

const EXCLUDE_PACKAGE_NAME = ['react', 'react-dom'];
export const initCoreLib = async () => {
  const corePackagesWithVersion = await beforeRegisterCorePackage();

  corePackagesWithVersion
    .filter(item => !EXCLUDE_PACKAGE_NAME.includes(item.name))
    .forEach(item => registerCorePackageToMonaco(item));
};
