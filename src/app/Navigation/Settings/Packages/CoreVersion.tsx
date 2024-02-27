import { type FC, useState } from 'react';
import { fetchPackageVersionList } from '~/apis/package-version-list';
import { Select, SelectContent, SelectItem, SelectTrigger } from '~/components/ui/Select';
import { useToggle } from '~/hooks/useToggle';
import Loading from '~/icons/Loading';
import { registerCorePackageToMonaco } from '~/monaco';
import { type CorePackage, addCorePackage } from '~/stores/package';

interface CoreVersionProps {
  lib: CorePackage;
}

const CoreVersion: FC<CoreVersionProps> = ({ lib }) => {
  const [loading, toggleLoading] = useToggle();
  const [versionList, setVersionList] = useState<string[]>([]);

  const handleOpenChange = (open: boolean) => {
    if (!open || versionList.length) {
      return;
    }

    toggleLoading.on();
    fetchPackageVersionList(lib.name)
      .then((response) => {
        const versions = response
          .versions
          .filter(version => /^(\d+)\.(\d+)\.(\d+)$/.test(version));
        setVersionList(versions.slice(0, 30));
      })
      .finally(() => toggleLoading.off());
  };

  const handleVersionChange = async (version: string) => {
    const corePackage: CorePackage = { ...lib, version };

    const isDeclarePackage = lib.name.startsWith('@types/');
    isDeclarePackage
      ? registerCorePackageToMonaco(corePackage)
        .then(() => addCorePackage(corePackage))
        .finally(() => toggleLoading.off())
      : addCorePackage(corePackage);
  };

  return (
    <Select
      key={lib.name}
      value={lib.version === 'latest' ? versionList[0] : lib.version}
      onOpenChange={handleOpenChange}
      onValueChange={handleVersionChange}
    >
      <SelectTrigger
        hiddenIcon
        className="w-fit cursor-pointer font-mono"
        title={`${lib.name} version is ${lib.version}`}
      >
        {loading && <Loading className="h-4 w-4 mr-1 animate-spin" />}
        {lib.name}
      </SelectTrigger>

      <SelectContent>
        {versionList.length
          ? versionList.map((item, index) => (
            <SelectItem
              className="font-mono text-xs"
              key={item}
              value={item}
            >
              {index === 0 ? `${item} (latest)` : item}
            </SelectItem>
          ))
          : <SelectItem disabled value="empty">No version</SelectItem>}
      </SelectContent>
    </Select>
  );
};

export default CoreVersion;
