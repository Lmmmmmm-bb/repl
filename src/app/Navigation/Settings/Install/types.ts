import type { NpmPackage } from '~/stores/package';

interface NpmObjects {
  package: NpmPackage;
}

export interface NpmSearchPackageResponse {
  objects?: NpmObjects[];
}
