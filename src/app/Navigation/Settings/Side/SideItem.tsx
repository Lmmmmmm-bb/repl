import type { FC, HTMLAttributes, PropsWithChildren } from 'react';
import { cn } from '~/utils/cn';

interface SideItemProps extends HTMLAttributes<HTMLDivElement> {
  active: boolean;
}

const SideItem: FC<PropsWithChildren<SideItemProps>> = ({ active, children, ...props }) => (
  <div
    {...props}
    className={cn(
      ['w-fit', 'lg:w-full', 'h-10', 'lg:h-12', 'px-4'],
      ['flex', 'items-center', 'gap-2'],
      ['border-r', 'lg:border-r-0', 'border-b-0', 'lg:border-b'],
      ['hover:bg-light-300', 'dark:hover:bg-dark-800'],
      ['transition-colors', 'cursor-pointer'],
      active && ['bg-light-300', 'dark:bg-dark-800'],
      props.className,
    )}
  >
    {children}
  </div>
);

export default SideItem;
