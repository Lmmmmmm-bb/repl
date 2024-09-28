import type { FC } from 'react';
import Badge from '~/components/ui/Badge';
import { DialogTitle } from '~/components/ui/Dialog';
import AddPackage from '~/icons/AddPackage';
import Package from '~/icons/Package';
import Settings from '~/icons/Settings';
import { usePackageStore } from '~/stores/package';
import { cn } from '~/utils/cn';
import { SettingPanel } from '../types';
import SideItem from './SideItem';

interface SideProps {
  activePanel: SettingPanel;
  onPanelChange: (activePanel: SettingPanel) => void;
}

const Side: FC<SideProps> = ({ activePanel, onPanelChange }) => {
  const totalPackages = usePackageStore(state => state.corePackages.length + state.extraPackages.length);

  return (
    <div className="lg:flex-1 border-b lg:border-r lg:border-b-0">
      <DialogTitle
        className={cn(
          ['h-16', 'lg:h-20', 'px-4'],
          ['flex', 'items-center', 'gap-2'],
          ['text-base', 'font-normal'],
          ['bg-light-200', 'dark:bg-dark-900'],
          ['border-b'],
        )}
      >
        <Settings className="size-5" />
        Settings
      </DialogTitle>

      <nav className="flex lg:flex-col">
        <SideItem
          active={activePanel === SettingPanel.Package}
          onClick={() => onPanelChange(SettingPanel.Package)}
        >
          <Package className="size-5" />
          Packages
          {Boolean(totalPackages) && (
            <Badge
              variant="outline"
              className="ml-auto px-2"
              title={`${totalPackages} dependencies installed`}
            >
              {totalPackages}
            </Badge>
          )}
        </SideItem>

        <SideItem
          active={activePanel === SettingPanel.Install}
          onClick={() => onPanelChange(SettingPanel.Install)}
        >
          <AddPackage className="size-5" />
          Install
        </SideItem>
      </nav>
    </div>
  );
};

export default Side;
