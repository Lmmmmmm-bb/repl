import { JSDELIVR_BASE_URL } from './config';
import type { CorePackage } from '~/stores/package';

interface PackageMetadataFile {
  hash: string;
  name: string;
  size: number;
}

interface PackageMetadataResponse {
  type: string;
  name: string;
  version: string;
  default: string | null;
  files: PackageMetadataFile[];
}

export const fetchPackageFiles = async (lib: CorePackage) => {
  const encodeLibName = encodeURIComponent(lib.name);
  const response = await fetch(
    `${JSDELIVR_BASE_URL}/v1/packages/npm/${encodeLibName}@${lib.version}?structure=flat`,
  );
  const json: PackageMetadataResponse = await response.json();
  return json.files || [];
};
