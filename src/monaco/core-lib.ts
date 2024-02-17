import * as monaco from 'monaco-editor';
import { fetchPackageFiles } from '~/apis/package-metadata';
import { fetchPackageFileRaw } from '~/apis/package-raw';
import { fetchPackageVersionList } from '~/apis/package-version-list';
import type { CorePackage } from '~/stores/package';
import { addCorePackage } from '~/stores/package';

export const registerExtraLib = (content: string, path: string) => {
  const tsDisposal = monaco.languages.typescript.typescriptDefaults.addExtraLib(content, path);
  const jsDisposal = monaco.languages.typescript.javascriptDefaults.addExtraLib(content, path);

  return () => {
    tsDisposal.dispose();
    jsDisposal.dispose();
  };
};

const fetchAndRegisterLatestPackageTypes = async (packageName: string) => {
  const versions = await fetchPackageVersionList(packageName);
  const latestVersion = versions.tags.latest || versions.versions[0];
  const corePackage: CorePackage = {
    optional: true,
    name: packageName,
    version: latestVersion,
  };

  const packageFiles = await fetchPackageFiles(corePackage);
  const declareFileRegex = /\.d\.ts$|\.json$/;
  packageFiles
    .filter(item => declareFileRegex.test(item.name))
    .forEach(async (item) => {
      const raw = await fetchPackageFileRaw({ name: packageName, version: latestVersion }, item.name);
      registerExtraLib(raw, `file:///node_modules/${packageName}${item.name}`);
    });

  addCorePackage(corePackage);
};

const registerCoreLibTypes = () => {
  Promise.all([
    fetchAndRegisterLatestPackageTypes('@types/react'),
    fetchAndRegisterLatestPackageTypes('@types/react-dom'),
  ]);
};

export const registerCoreLib = () => {
  registerCoreLibTypes();
};
