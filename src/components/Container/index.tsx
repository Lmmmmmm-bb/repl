import type { FC, PropsWithChildren } from 'react';
import { cn } from '~/utils/cn';

interface ContainerProps {
  title: string;
}

const Container: FC<PropsWithChildren<ContainerProps>> = ({ title, children }) => (
  <div
    className={cn(
      ['h-full', 'flex', 'flex-col'],
      ['border', 'rounded-lg'],
      ['overflow-hidden'],
    )}
  >
    <div
      className={cn(
        ['h-8', 'px-2', 'flex', 'items-center'],
        ['bg-light-400', 'dark:bg-dark-400'],
        ['text-xs', 'border-b-[1px]'],
      )}
    >
      {title}
    </div>

    {children}
  </div>
);

export default Container;
