import type { NpmSearchPackageResponse } from './types';

const npmBase = 'https://registry.npmjs.com';

export const fetchPackageList = async (packageName: string) => {
  const response = await fetch(`${npmBase}/-/v1/search?text=${packageName}`);
  const json: NpmSearchPackageResponse = await response.json();

  const objects = json.objects || [];
  const packages = objects.map(o => o.package);
  return packages;
};
