import { useState } from 'react';
import type { ChangeEvent, FC } from 'react';
import PackagePreview from '../PackagePreview';
import Badge from '~/components/ui/Badge';
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
            <Search className="w-4 h-4 absolute left-2.5 top-2.5 opacity-80" />
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
        {packageStore.initialExtraLibs.map(lib => (
          <Badge variant="secondary" key={lib.name}>
            {`${lib.name}@${lib.version}`}
          </Badge>
        ))}
      </div>

      <div className="mt-2 px-4 grid grid-cols-2 gap-4 overflow-auto">
        {packageStore.packages.map(item => (
          <PackagePreview key={item.name} npmPackage={item} />
        ))}
      </div>
    </div>
  );
};

export default Packages;
