import { usePackageStore } from '.';

export const getImportMap = () => {
  const { corePackages, extraPackages } = usePackageStore.getState();
  const packages = [...corePackages, ...extraPackages].filter(item => !item.optional);

  return packages.reduce<Record<string, string>>((prev, current) => ({
    ...prev,
    [current.name]: `https://esm.sh/${current.name}@${current.version}`,
  }), {});
};
