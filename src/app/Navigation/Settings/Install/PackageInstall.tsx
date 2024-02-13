import { type FC, useState } from 'react';
import type { NpmPackage } from './types';
import { cn } from '~/utils/cn';
import Check from '~/icons/Check';
import Download from '~/icons/Download';
import Button from '~/components/ui/Button';
import { addExtraLib } from '~/stores/extra-lib';
import Loading from '~/icons/Loading';

interface PackageInstallProps {
  isInstalled: boolean;
  npmPackage: NpmPackage;
}

const PackageInstall: FC<PackageInstallProps> = ({ isInstalled, npmPackage }) => {
  const [isInstalling, setIsInstalling] = useState(false);

  const handleInstallLib = () => {
    if (isInstalled || isInstalling) {
      return;
    }
    setIsInstalling(true);
    addExtraLib(npmPackage).finally(() => setIsInstalling(false));
  };

  return (
    <Button
      size="sm"
      variant="ghost"
      className={cn(
        ['flex', 'gap-2'],
        isInstalling
          ? []
          : isInstalled
            ? ['text-green-500', 'hover:text-green-500']
            : ['transition-opacity', 'opacity-0', 'group-hover:opacity-100'],
      )}
      title={
        isInstalling
          ? `Installing ${npmPackage.name}`
          : isInstalled
            ? `${npmPackage.name} has been installed`
            : `Install ${npmPackage.name}`
      }
      onClick={handleInstallLib}
    >
      {isInstalling
        ? <Loading className="w-4 h-4 animate-spin" />
        : isInstalled
          ? <Check className="w-4 h-4" />
          : <Download className="w-4 h-4" />}
      {isInstalling ? 'Installing' : isInstalled ? 'Installed' : 'Install'}
    </Button>
  );
};

export default PackageInstall;
