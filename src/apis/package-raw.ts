import type { CorePackage } from '~/stores/package';
import { JSDELIVR_CDN_BASE_URL } from './config';

export const fetchPackageFileRaw = async (lib: CorePackage, path = '') => {
  const response = await fetch(`${JSDELIVR_CDN_BASE_URL}/npm/${lib.name}@${lib.version}${path}`);
  const raw = await response.text();

  return raw;
};
