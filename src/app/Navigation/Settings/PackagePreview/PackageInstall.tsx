import type { FC } from 'react';
import { cn } from '~/utils/cn';
import Download from '~/icons/Download';
import Button from '~/components/ui/Button';
import type { Package } from '~/stores/package';
import { addExtraPackage } from '~/stores/package';
import Loading from '~/icons/Loading';
import { useToggle } from '~/hooks/useToggle';

interface PackageInstallProps {
  npmPackage: Package;
}

const PackageInstall: FC<PackageInstallProps> = ({ npmPackage }) => {
  const [isInstalling, toggleIsInstalling] = useToggle();

  const handleInstallLib = () => {
    if (isInstalling) {
      return;
    }
    toggleIsInstalling.on();
    addExtraPackage(npmPackage).finally(() => toggleIsInstalling.off());
  };

  return (
    <Button
      size="sm"
      variant="ghost"
      className={cn(
        ['flex', 'gap-2'],
        isInstalling
          ? []
          : ['transition-opacity', 'opacity-0', 'group-hover:opacity-100'],
      )}
      title={
        isInstalling
          ? `Installing ${npmPackage.name}`
          : `Install ${npmPackage.name}`
      }
      onClick={handleInstallLib}
    >
      {isInstalling
        ? <Loading className="w-4 h-4 animate-spin" />
        : <Download className="w-4 h-4" />}
      {isInstalling ? 'Installing' : 'Install'}
    </Button>
  );
};

export default PackageInstall;
