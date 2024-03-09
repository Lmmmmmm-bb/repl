import type { FC } from 'react';
import CorePackage from './CorePackage';
import { usePackageStore } from '~/stores/package';
import { cn } from '~/utils/cn';

const CorePackages: FC = () => {
  const corePackages = usePackageStore(state => state.corePackages);

  return (
    <div
      className={cn(
        ['px-4', 'flex', 'flex-shrink-0', 'gap-2'],
        ['overflow-auto', 'scrollbar-hidden'],
      )}
    >
      {corePackages.map(lib => (
        <CorePackage key={lib.name} lib={lib} />
      ))}
    </div>
  );
};

export default CorePackages;
