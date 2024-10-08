import type { FC } from 'react';

import React from '~/icons/React';
import { cn } from '~/utils/cn';
import Information from './Information';
import Reset from './Reset';
import Settings from './Settings';
import Share from './Share';
import Theme from './Theme';

const Navigation: FC = () => (
  <div className={cn(
    ['fixed', 'left-0', 'top-0', 'bottom-0'],
    ['w-full', 'h-12', 'lg:w-20', 'lg:h-full'],
    ['px-4', 'lg:px-2', 'py-2', 'lg:py-4'],
    ['flex', 'lg:flex-col', 'items-center', 'justify-between'],
  )}
  >
    <a
      target="_blank"
      rel="noreferrer"
      title="GitHub Repo"
      href="https://github.com/Lmmmmmm-bb/repl"
      data-umami-event="GitHub Repo"
    >
      <React title="React Playground" className="size-8 lg:size-12 text-brand" />
    </a>

    <div className="flex lg:flex-col gap-2">
      <Information />
      <Theme />
      <Reset />
      <Share />
      <Settings />
    </div>
  </div>
);

export default Navigation;
