import { usePackageStore } from '.';
import { packagePathStrategy, packageRenameStrategy } from './strategy';

export const isLegacyReactDOM = () => {
  const { corePackages } = usePackageStore.getState();
  const [reactDOM] = corePackages.filter(item => item.name === 'react-dom');

  return reactDOM.version.startsWith('17');
};

export const getImportMap = () => {
  const isLegacy = isLegacyReactDOM();
  const { corePackages, extraPackages } = usePackageStore.getState();
  const packages = [...corePackages, ...extraPackages].filter(item => !item.optional);

  const imports: Record<string, string> = {};
  for (const currentPackage of packages) {
    const packageName = isLegacy
      ? currentPackage.name
      : (packageRenameStrategy[currentPackage.name] || currentPackage.name);

    const packagePath = packagePathStrategy[packageName] || '';
    const packageWithVersion = `${currentPackage.name}@${currentPackage.version}`;
    imports[packageName] = `https://esm.sh/${packageWithVersion}${packagePath}`;
  }

  return { imports };
};
