import type { FC } from 'react';
import { SettingPanel } from './types';
import { cn } from '~/utils/cn';
import Settings from '~/icons/Settings';
import Package from '~/icons/Package';
import AddPackage from '~/icons/AddPackage';
import Badge from '~/components/ui/Badge';
import { usePackageStore } from '~/stores/package';

interface SideProps {
  activePanel: SettingPanel;
  onPanelChange: (activePanel: SettingPanel) => void;
}

const Side: FC<SideProps> = ({ activePanel, onPanelChange }) => {
  const totalPackages = usePackageStore(state => state.corePackages.length + state.extraPackages.length);

  return (
    <div className="lg:flex-1 border-b lg:border-r lg:border-b-0">
      <header
        className={cn(
          ['h-16', 'lg:h-20', 'px-4'],
          ['flex', 'items-center', 'gap-2'],
          ['bg-light-200', 'dark:bg-dark-900'],
          ['border-b'],
        )}
      >
        <Settings className="size-5" />
        Settings
      </header>

      <div className="flex lg:flex-col">
        <div
          className={cn(
            ['w-fit', 'lg:w-full', 'h-12', 'px-4'],
            ['flex', 'items-center', 'gap-2'],
            ['border-r', 'lg:border-r-0', 'border-b-0', 'lg:border-b'],
            ['hover:bg-light-300', 'dark:hover:bg-dark-800'],
            ['transition-colors', 'cursor-pointer'],
            activePanel === SettingPanel.Package && ['bg-light-300', 'dark:bg-dark-800'],
          )}
          onClick={() => onPanelChange(SettingPanel.Package)}
        >
          <Package className="size-5" />
          Packages
          {Boolean(totalPackages) && (
            <Badge
              variant="outline"
              className="ml-auto"
              title={`${totalPackages} dependencies installed`}
            >
              {totalPackages}
            </Badge>
          )}
        </div>

        <div
          className={cn(
            ['w-fit', 'lg:w-full', 'h-12', 'px-4'],
            ['flex', 'items-center', 'gap-2'],
            ['border-r', 'lg:border-r-0', 'border-b-0', 'lg:border-b'],
            ['hover:bg-light-300', 'dark:hover:bg-dark-800'],
            ['transition-colors', 'cursor-pointer'],
            activePanel === SettingPanel.Install && ['bg-light-300', 'dark:bg-dark-800'],
          )}
          onClick={() => onPanelChange(SettingPanel.Install)}
        >
          <AddPackage className="size-5" />
          Install
        </div>
      </div>
    </div>
  );
};

export default Side;
