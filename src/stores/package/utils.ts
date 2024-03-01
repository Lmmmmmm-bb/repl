import { packagePathStrategy, packageRenameStrategy } from './strategy';
import { usePackageStore } from '.';

export const isLegacyReactDOM = () => {
  const { corePackages } = usePackageStore.getState();
  const [reactDOM] = corePackages.filter(item => item.name === 'react-dom');

  return reactDOM.version.startsWith('17');
};

export const getImportMap = () => {
  const { corePackages, extraPackages } = usePackageStore.getState();
  const packages = [...corePackages, ...extraPackages].filter(item => !item.optional);

  const packagesConfig = packages.reduce<Record<string, string>>((prev, current) => {
    const isLegacy = isLegacyReactDOM();
    const packageName = isLegacy
      ? current.name
      : (packageRenameStrategy[current.name] || current.name);
    const packagePath = packagePathStrategy[packageName] || '';

    return {
      ...prev,
      [packageName]: `https://esm.sh/${current.name}@${current.version}${packagePath}`,
    };
  }, {});

  return { imports: packagesConfig };
};
