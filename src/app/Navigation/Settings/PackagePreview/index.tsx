import { type FC, useMemo } from 'react';
import PackageInstall from './PackageInstall';
import PackageLink from './PackageLink';
import PackageUninstall from './PackageUninstall';
import { cn } from '~/utils/cn';
import Cube from '~/icons/Cube';
import Calendar from '~/icons/Calendar';
import type { Package } from '~/stores/package';
import { usePackageStore } from '~/stores/package';
import Check from '~/icons/Check';
import CheckFilled from '~/icons/CheckFilled';

interface PackagePreviewProps {
  npmPackage: Package;
}

const PackagePreview: FC<PackagePreviewProps> = ({ npmPackage }) => {
  const packageStore = usePackageStore(state => ({
    corePackages: state.corePackages,
    extraPackages: state.extraPackages,
  }));

  const { isCorePackage, storePackage, isPackageInstalled } = useMemo(() => {
    const [corePackage] = packageStore.corePackages.filter(lib => lib.name === npmPackage.name);
    const [extraPackage] = packageStore.extraPackages.filter(lib => lib.name === npmPackage.name);
    const isCorePackage = Boolean(corePackage);
    const isExtraPackage = Boolean(extraPackage);
    return {
      isCorePackage,
      storePackage: corePackage || extraPackage,
      isPackageInstalled: isCorePackage || isExtraPackage,
    };
  }, [packageStore, npmPackage]);

  return (
    <div
      className={cn(
        ['h-52', 'p-4', 'flex', 'flex-col'],
        ['border', 'rounded-md', 'group'],
      )}
    >
      <span className="flex items-center text-xl">
        {npmPackage.name}
        {isPackageInstalled && (
          <span
            className="ml-auto text-green-600"
            title={`${isCorePackage ? '[Core Package] ' : ''}${npmPackage.name} has been installed`}
          >
            {isCorePackage ? <CheckFilled className="w-5 h-5" /> : <Check className="w-5 h-5" />}
          </span>
        )}
      </span>

      {npmPackage.description && (
        <p
          className="text-sm line-clamp-3 leading-tight opacity-40"
          title={npmPackage.description}
        >
          {npmPackage.description}
        </p>
      )}

      <div className="mt-auto flex flex-col gap-1 opacity-80 text-sm">
        <span
          title="Latest version"
          className="flex items-center gap-2 font-mono"
        >
          <Cube className="w-5 h-5" />
          {storePackage && storePackage.version !== npmPackage.version
            ? `${npmPackage.version} (installed ${storePackage.version})`
            : npmPackage.version}
        </span>

        {npmPackage.date && (
          <span
            title="Latest version publish date"
            className="flex items-center gap-2 font-mono"
          >
            <Calendar className="w-5 h-5" />
            {new Date(npmPackage.date).toLocaleString()}
          </span>
        )}

        <div className="flex gap-2 items-center justify-between">
          <PackageLink npmPackage={npmPackage} />

          {!isCorePackage
          && (isPackageInstalled
            ? <PackageUninstall npmPackage={npmPackage} />
            : <PackageInstall npmPackage={npmPackage} />)}
        </div>
      </div>
    </div>
  );
};

export default PackagePreview;
