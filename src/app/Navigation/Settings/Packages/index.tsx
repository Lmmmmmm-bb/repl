import { useState } from 'react';
import type { ChangeEvent, FC } from 'react';
import PackagePreview from '../PackagePreview';
import CorePackage from './CorePackage';
import { Input } from '~/components/ui/Input';
import { Label } from '~/components/ui/Label';
import Search from '~/icons/Search';
import { usePackageStore } from '~/stores/package';

const Packages: FC = () => {
  const packageStore = usePackageStore();

  const [inputValue, setInputValue] = useState('');

  const handleInputValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const nextInputValue = e.target.value.trim();
    setInputValue(nextInputValue);
  };

  return (
    <div className="h-full pb-4 flex flex-col overflow-hidden">
      <div className="h-20 px-4 flex flex-shrink-0 items-center">
        <div className="relative w-full">
          <Label htmlFor="filter-package">
            <Search className="size-4 absolute left-2.5 top-2.5 opacity-80" />
          </Label>
          <Input
            id="filter-package"
            className="w-full pl-8"
            placeholder="Filter installed package..."
            value={inputValue}
            onChange={handleInputValueChange}
          />
        </div>
      </div>

      <div className="px-4 flex gap-2 flex-wrap">
        {packageStore.corePackages.map(lib => (
          <CorePackage key={lib.name} lib={lib} />
        ))}
      </div>

      <div className="mt-4 px-4 grid grid-cols-2 gap-4 overflow-auto">
        {packageStore
          .extraPackages
          .filter(item => item.name.toLowerCase().includes(inputValue.toLowerCase()))
          .map(item => <PackagePreview key={item.name} npmPackage={item} />)}
      </div>
    </div>
  );
};

export default Packages;
