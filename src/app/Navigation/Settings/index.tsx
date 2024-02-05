import type { FC } from 'react';
import Button from '~/components/ui/Button';
import SettingsIcon from '~/icons/Settings';

const Settings: FC = () => (
  <Button title="Open playground settings" variant="ghost" size="icon">
    <SettingsIcon className="w-5 h-5" />
  </Button>
);

export default Settings;
