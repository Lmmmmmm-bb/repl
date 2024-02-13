import { type FC, useState } from 'react';
import Side from './Side';
import Install from './Install';
import { SettingPanel } from './types';
import { cn } from '~/utils/cn';
import Button from '~/components/ui/Button';
import SettingsIcon from '~/icons/Settings';
import { Dialog, DialogContent, DialogTrigger } from '~/components/ui/Dialog';

const Settings: FC = () => {
  const [activePanel, setActivePanel] = useState(SettingPanel.Package);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button title="Open playground settings" variant="ghost" size="icon">
          <SettingsIcon className="w-5 h-5" />
        </Button>
      </DialogTrigger>

      <DialogContent
        className={cn(
          ['w-full', 'max-w-screen-lg', 'h-full', 'max-h-[70vh]'],
          ['p-0', 'overflow-hidden'],
        )}
      >
        <div className="flex overflow-hidden">
          <Side activePanel={activePanel} onPanelChange={setActivePanel} />

          <div className="flex-[3]">
            {activePanel === SettingPanel.Install && <Install />}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Settings;
