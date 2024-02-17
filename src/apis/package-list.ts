import { NPM_BASE_URL } from './config';
import type { Package } from '~/stores/package';

interface NpmObjects {
  package: Package;
}

interface NpmSearchPackageResponse {
  objects?: NpmObjects[];
}

export const fetchPackageList = async (packageName: string) => {
  const response = await fetch(`${NPM_BASE_URL}/-/v1/search?text=${packageName}`);
  const json: NpmSearchPackageResponse = await response.json();

  const objects = json.objects || [];
  const packages = objects.map(o => o.package);
  return packages;
};
