import type { FC } from 'react';
import CorePackage from './CorePackage';
import { usePackageStore } from '~/stores/package';

const CorePackages: FC = () => {
  const corePackages = usePackageStore(state => state.corePackages);

  return (
    <div className="px-4 flex gap-2 flex-wrap">
      {corePackages.map(lib => (
        <CorePackage key={lib.name} lib={lib} />
      ))}
    </div>
  );
};

export default CorePackages;
