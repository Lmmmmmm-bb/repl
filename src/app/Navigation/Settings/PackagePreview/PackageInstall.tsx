import { type FC, useState } from 'react';
import { SelectTrigger } from '@radix-ui/react-select';
import { cn } from '~/utils/cn';
import Download from '~/icons/Download';
import Button from '~/components/ui/Button';
import { type Package, addExtraPackage } from '~/stores/package';
import Loading from '~/icons/Loading';
import { useToggle } from '~/hooks/useToggle';
import { registerExtraPackageToMonaco } from '~/monaco';
import { Select, SelectContent, SelectItem, SelectSeparator } from '~/components/ui/Select';
import { fetchPackageVersionList } from '~/apis/package-version-list';

interface PackageInstallProps {
  npmPackage: Package;
}

const PackageInstall: FC<PackageInstallProps> = ({ npmPackage }) => {
  const [loading, toggleLoading] = useToggle();
  const [isInstalling, toggleIsInstalling] = useToggle();
  const [versionList, setVersionList] = useState<string[]>([]);

  const handleInstallLib = (version: string) => {
    if (isInstalling) {
      return;
    }
    const packageWithVersion: Package = { ...npmPackage, version };
    toggleIsInstalling.on();
    registerExtraPackageToMonaco(packageWithVersion)
      .then(() => addExtraPackage(packageWithVersion))
      .finally(() => toggleIsInstalling.off());
  };

  const handleLoadVersion = () => {
    toggleLoading.on();
    fetchPackageVersionList(npmPackage.name)
      .then((response) => {
        const versions = response
          .versions
          .filter(version => /^(\d+)\.(\d+)\.(\d+)$/.test(version));
        setVersionList(versions.slice(1, 20));
      })
      .finally(() => toggleLoading.off());
  };

  return (
    <Select value="" onValueChange={handleInstallLib}>
      <SelectTrigger asChild>
        <Button
          size="sm"
          variant="ghost"
          className={cn(
            ['flex', 'gap-2'],
            ['data-[state=open]:opacity-100'],
            !isInstalling && [
              'transition-opacity',
              'opacity-0',
              'group-hover:opacity-100',
            ],
          )}
          title={`${isInstalling ? 'Installing' : 'Install'} ${npmPackage.name}`}
        >
          {isInstalling
            ? <Loading className="w-4 h-4 animate-spin" />
            : <Download className="w-4 h-4" />}
          {isInstalling ? 'Installing' : 'Install'}
        </Button>
      </SelectTrigger>

      <SelectContent>
        <SelectItem className="font-mono" value={npmPackage.version}>
          {`${npmPackage.version} (latest)`}
        </SelectItem>
        <SelectSeparator />

        {versionList.length
          ? (
              versionList.map(version => (
                <SelectItem
                  className="font-mono"
                  key={version}
                  value={version}
                >
                  {version}
                </SelectItem>
              ))
            )
          : (
            <Button
              size="sm"
              variant="ghost"
              className="w-full text-sm opacity-50"
              onClick={handleLoadVersion}
            >
              {loading && <Loading className="h-4 w-4 mr-1 animate-spin" />}
              Load more
            </Button>
            )}

      </SelectContent>
    </Select>
  );
};

export default PackageInstall;
