import { usePackageStore } from '.';

const packageRenameStrategy: Record<string, string> = {
  'react-dom': 'react-dom/client',
};

export const getImportMap = () => {
  const { corePackages, extraPackages } = usePackageStore.getState();
  const packages = [...corePackages, ...extraPackages].filter(item => !item.optional);

  const packagesConfig = packages.reduce<Record<string, string>>((prev, current) => {
    const packageName = packageRenameStrategy[current.name] || current.name;

    return {
      ...prev,
      [packageName]: `https://esm.sh/${current.name}@${current.version}`,
    };
  }, {});

  return { imports: packagesConfig };
};
