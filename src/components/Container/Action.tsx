import type { FC, PropsWithChildren } from 'react';
import type { ButtonProps } from '../ui/Button';
import { cn } from '~/utils/cn';
import Button from '../ui/Button';

const Action: FC<PropsWithChildren<ButtonProps>> = ({ children, className, ...props }) => (
  <Button
    variant="ghost"
    className={cn(
      ['h-full', 'p-2', 'border-l', 'text-xs'],
      ['opacity-60', 'hover:opacity-80'],
      ['rounded-none', 'transition-opacity'],
      className,
    )}
    {...props}
  >
    {children}
  </Button>
);

export default Action;
