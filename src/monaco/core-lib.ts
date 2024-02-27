import { registerLib } from './utils';
import { fetchPackageFiles } from '~/apis/package-metadata';
import { fetchPackageFileRaw } from '~/apis/package-raw';
import { fetchPackageVersionList } from '~/apis/package-version-list';
import { type CorePackage, initPackageStore, usePackageStore } from '~/stores/package';

const beforeRegisterCorePackage = async () => {
  const corePackagesWithVersion: CorePackage[] = await Promise.all(
    initPackageStore.corePackages.map(async (lib) => {
      const versions = await fetchPackageVersionList(lib.name);
      const latestVersion = versions.tags.latest;
      return { ...lib, version: latestVersion };
    }),
  );

  usePackageStore.setState({ corePackages: corePackagesWithVersion });
};

const registerCorePackage = async (lib: CorePackage) => {
  const packageName = lib.name;
  const versions = await fetchPackageVersionList(packageName);
  const packageVersion = versions.tags[lib.version] || lib.version;
  const corePackage: CorePackage = {
    optional: true,
    name: packageName,
    version: packageVersion,
  };

  const packageFiles = await fetchPackageFiles(corePackage);
  const declareFileRegex = /\.d\.ts$|\.json$/;
  packageFiles
    .filter(item => declareFileRegex.test(item.name))
    .forEach(async (item) => {
      const raw = await fetchPackageFileRaw({ name: packageName, version: packageVersion }, item.name);
      registerLib(raw, `file:///node_modules/${packageName}${item.name}`);
    });

  return corePackage;
};

export const initCoreLib = async () => {
  await beforeRegisterCorePackage();

  const EXCLUDE_PACKAGE_NAME = ['react', 'react-dom'];
  initPackageStore.corePackages
    .filter(item => !EXCLUDE_PACKAGE_NAME.includes(item.name))
    .forEach(item => registerCorePackage(item));
};
