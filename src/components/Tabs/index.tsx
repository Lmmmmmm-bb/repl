import type { FC, PropsWithChildren } from 'react';
import TabItem from './TabItem';
import { cn } from '~/utils/cn';

interface TabsComponent {
  Item: typeof TabItem;
}

interface TabsProps {
  className?: string;
}

const Tabs: FC<PropsWithChildren<TabsProps>> & TabsComponent = ({ className, children }) => (
  <ul
    className={cn(
      ['h-8', 'flex', 'items-center'],
      ['bg-light-200', 'dark:bg-dark-800'],
      ['text-xs', 'border-b-[1px]'],
      ['overflow-auto', 'scrollbar-hidden'],
      className,
    )}
  >
    {children}
  </ul>
);

Tabs.Item = TabItem;

export default Tabs;
