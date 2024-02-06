import type { FC } from 'react';

import ThemeSwitcher from './ThemeSwitcher';
import Share from './Share';
import Settings from './Settings';
import { cn } from '~/utils/cn';
import React from '~/icons/React';

const Navigation: FC = () => (
  <div className={cn(
    ['fixed', 'left-0', 'top-0', 'bottom-0'],
    ['px-2', 'py-4', 'w-20'],
    ['flex', 'flex-col', 'items-center', 'justify-between'],
  )}
  >
    <React
      className={cn(
        ['w-12', 'h-12'],
        ['text-[#387CA0]', 'dark:text-[#499CC6]'],
      )}
    />

    <div className="flex flex-col gap-2">
      <ThemeSwitcher />
      <Share />
      <Settings />
    </div>
  </div>
);

export default Navigation;
