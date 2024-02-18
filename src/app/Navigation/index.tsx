import type { FC } from 'react';

import ThemeSwitcher from './ThemeSwitcher';
import Share from './Share';
import Settings from './Settings';
import Reset from './Reset';
import { cn } from '~/utils/cn';
import React from '~/icons/React';

const Navigation: FC = () => (
  <div className={cn(
    ['fixed', 'left-0', 'top-0', 'bottom-0'],
    ['px-2', 'py-4', 'w-20'],
    ['flex', 'flex-col', 'items-center', 'justify-between'],
  )}
  >
    <React title="React Playground" className="w-12 h-12 text-brand" />

    <div className="flex flex-col gap-2">
      <ThemeSwitcher />
      <Reset />
      <Share />
      <Settings />
    </div>
  </div>
);

export default Navigation;
