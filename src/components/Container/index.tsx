import type { FC, PropsWithChildren, ReactNode } from 'react';
import Action from './Action';
import { cn } from '~/utils/cn';

interface ContainerProps {
  title: string;
  action?: ReactNode;
}

interface ContainerComponent {
  Action: typeof Action;
};

const Container: FC<PropsWithChildren<ContainerProps>> & ContainerComponent = ({
  title,
  action,
  children,
}) => (
  <div
    className={cn(
      ['h-full', 'flex', 'flex-col'],
      ['border', 'rounded-lg'],
      ['overflow-hidden'],
    )}
  >
    <div
      className={cn(
        ['h-8', 'px-2'],
        ['flex', 'flex-shrink-0', 'items-center', 'justify-between', 'gap-2'],
        ['bg-light-200', 'dark:bg-dark-600'],
        ['text-xs', 'border-b-[1px]'],
        action && ['pr-0'],
      )}
    >
      <span>{title}</span>
      {action}
    </div>

    {children}
  </div>
);

Container.Action = Action;

export default Container;
