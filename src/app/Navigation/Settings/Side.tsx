import type { FC } from 'react';
import { SettingPanel } from './types';
import { cn } from '~/utils/cn';
import Settings from '~/icons/Settings';
import Package from '~/icons/Package';
import AddPackage from '~/icons/AddPackage';
import Badge from '~/components/ui/Badge';
import { useExtraLibStore } from '~/stores/extra-lib';

interface SideProps {
  activePanel: SettingPanel;
  onPanelChange: (activePanel: SettingPanel) => void;
}

const Side: FC<SideProps> = ({ activePanel, onPanelChange }) => {
  const extraLibs = useExtraLibStore(state => state.extraLibs);

  return (
    <div className="flex-1 border-r">
      <header
        className={cn(
          ['h-20', 'px-4'],
          ['flex', 'items-center', 'gap-2'],
          ['bg-light-200', 'dark:bg-dark-900'],
          ['border-b'],
        )}
      >
        <Settings className="w-5 h-5" />
        Settings
      </header>

      <div className="flex flex-col">
        <div
          className={cn(
            ['w-full', 'h-12', 'px-4', ''],
            ['flex', 'items-center', 'gap-2'],
            ['hover:bg-light-300', 'dark:hover:bg-dark-800'],
            ['transition-colors', 'cursor-pointer'],
            activePanel === SettingPanel.Package && ['bg-light-300', 'dark:bg-dark-800'],
          )}
          onClick={() => onPanelChange(SettingPanel.Package)}
        >
          <Package className="w-5 h-5" />
          Packages
          {Boolean(extraLibs.length) && (
            <Badge
              variant="outline"
              className="ml-auto"
              title={`${extraLibs.length} dependencies installed`}
            >
              {extraLibs.length}
            </Badge>
          )}
        </div>

        <div
          className={cn(
            ['w-full', 'h-12', 'px-4'],
            ['flex', 'items-center', 'gap-2'],
            ['hover:bg-light-300', 'dark:hover:bg-dark-800'],
            ['transition-colors', 'cursor-pointer'],
            activePanel === SettingPanel.Install && ['bg-light-300', 'dark:bg-dark-800'],
          )}
          onClick={() => onPanelChange(SettingPanel.Install)}
        >
          <AddPackage className="w-5 h-5" />
          Install
        </div>
      </div>
    </div>
  );
};

export default Side;
