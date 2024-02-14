import type { ExtraLib, NpmPackage } from './types';

const esmShBase = 'https://esm.sh';

export const fetchPackageRaw = async (lib: ExtraLib | NpmPackage) => {
  const raw = await fetch(`${esmShBase}/${lib.name}@${lib.version}`);
  const dts = await raw.text();

  return dts;
};
