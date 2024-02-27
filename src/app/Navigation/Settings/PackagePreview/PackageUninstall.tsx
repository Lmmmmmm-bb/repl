import type { FC } from 'react';
import Button from '~/components/ui/Button';
import Close from '~/icons/Close';
import { type Package, removeExtraPackage } from '~/stores/package';
import { cn } from '~/utils/cn';

interface PackageUninstallProps {
  npmPackage: Package;
}

const PackageUninstall: FC<PackageUninstallProps> = ({ npmPackage }) => (
  <Button
    size="sm"
    variant="ghost"
    title={`Uninstall ${npmPackage.name}`}
    className={cn(
      ['flex', 'gap-2'],
      ['text-red-500', 'hover:text-red-500'],
      ['transition-opacity', 'opacity-0', 'group-hover:opacity-100'],
    )}
    onClick={() => removeExtraPackage(npmPackage)}
  >
    <Close className="w-4 h-4" />
    Uninstall
  </Button>
);

export default PackageUninstall;
