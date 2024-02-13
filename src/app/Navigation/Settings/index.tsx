import { type FC, useState } from 'react';
import { SettingPanel } from './types';
import Side from './Side';
import Button from '~/components/ui/Button';
import SettingsIcon from '~/icons/Settings';
import { Dialog, DialogContent, DialogTrigger } from '~/components/ui/Dialog';
import { cn } from '~/utils/cn';

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
        <div className="flex">
          <Side activePanel={activePanel} onPanelChange={setActivePanel} />

          <div className="flex-[3]">
            {activePanel}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Settings;
