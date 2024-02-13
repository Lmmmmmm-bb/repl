import { useState } from 'react';
import type { ChangeEvent, FC } from 'react';
import { fetchPackageList } from './fetch';
import { setPackages, usePackageStore } from './store';
import PackagePreview from './PackagePreview';
import { Input } from '~/components/ui/Input';
import { Label } from '~/components/ui/Label';
import Search from '~/icons/Search';
import { useDebounceFn } from '~/hooks/useDebounceFn';
import Loading from '~/icons/Loading';

const Install: FC = () => {
  const packages = usePackageStore(state => state.packages);

  const [inputValue, setInputValue] = useState('');
  const [fetchPackagesLoading, setFetchPackageLoading] = useState(false);

  const fetchPackages = useDebounceFn(
    async (packageName: string) => {
      try {
        setFetchPackageLoading(true);
        const _packages = await fetchPackageList(packageName);
        setPackages(_packages);
      } finally {
        setFetchPackageLoading(false);
      }
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
      <div className="h-20 px-4 flex items-center">
        <div className="relative w-full">
          <Label htmlFor="search-package">
            {
              fetchPackagesLoading
                ? <Loading className="w-4 h-4 absolute left-2.5 top-2.5 opacity-80 animate-spin" />
                : <Search className="w-4 h-4 absolute left-2.5 top-2.5 opacity-80" />
            }
          </Label>
          <Input
            id="search-package"
            className="w-full pl-8"
            placeholder="Search npm package..."
            value={inputValue}
            onChange={handleInputValueChange}
          />
        </div>
      </div>

      <div className="flex-1 px-4 grid grid-cols-2 gap-4 overflow-auto">
        {packages.map(item => (
          <PackagePreview key={item.name} npmPackage={item} />
        ))}
      </div>
    </div>
  );
};

export default Install;
