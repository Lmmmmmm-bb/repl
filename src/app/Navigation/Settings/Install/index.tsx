import { useState } from 'react';
import type { ChangeEvent, FC } from 'react';
import PackagePreview from '../PackagePreview';
import { setPackages, usePackageStore } from './store';
import { Input } from '~/components/ui/Input';
import { Label } from '~/components/ui/Label';
import Search from '~/icons/Search';
import Loading from '~/icons/Loading';
import { useToggle } from '~/hooks/useToggle';
import { useDebounce } from '~/hooks/useDebounce';
import { fetchPackageList } from '~/apis/package-list';

const Install: FC = () => {
  const packages = usePackageStore(state => state.packages);

  const [inputValue, setInputValue] = useState('');
  const [fetchPackagesLoading, toggleFetchPackagesLoading] = useToggle();

  const fetchPackages = useDebounce(
    (packageName: string) => {
      toggleFetchPackagesLoading.on();
      fetchPackageList(packageName)
        .then(_packages => setPackages(_packages))
        .finally(() => toggleFetchPackagesLoading.off());
    },
    500,
  );

  const handleInputValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const nextInputValue = e.target.value.trim();
    setInputValue(nextInputValue);
    nextInputValue && fetchPackages(nextInputValue);
  };

  return (
    <div className="h-full pb-4 flex flex-col overflow-hidden">
      <div className="h-20 px-4 flex flex-shrink-0 items-center">
        <div className="relative w-full">
          <Label htmlFor="search-package">
            {
              fetchPackagesLoading
                ? <Loading className="size-4 absolute left-2.5 top-2.5 opacity-80 animate-spin" />
                : <Search className="size-4 absolute left-2.5 top-2.5 opacity-80" />
            }
          </Label>
          <Input
            id="search-package"
            className="w-full pl-8"
            placeholder="Search package from npm..."
            value={inputValue}
            onChange={handleInputValueChange}
          />
        </div>
      </div>

      <div className="px-4 grid grid-cols-2 gap-4 overflow-auto">
        {packages.map(item => (
          <PackagePreview key={item.name} npmPackage={item} />
        ))}
      </div>
    </div>
  );
};

export default Install;
