import { getImportMap } from '~/stores/package';
import playSrcdocRaw from './play.html?raw';

export const getPlaySrcdoc = () => {
  const importMap = getImportMap();
  return playSrcdocRaw.replace('<!-- IMPORTMAP_PLACEHOLDER -->', JSON.stringify(importMap, null, 2));
};
