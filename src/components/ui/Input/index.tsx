import { forwardRef } from 'react';

import { cn } from '~/utils/cn';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      autoComplete="off"
      className={cn(
        ['w-full', 'h-9', 'px-3', 'py-1', 'flex'],
        ['text-sm', 'bg-transparent', 'transition-colors'],
        ['rounded-md', 'border', 'border-input', 'shadow-sm'],
        ['file:border-0', 'file:bg-transparent', 'file:text-sm', 'file:font-medium'],
        ['focus-visible:outline-none', 'focus-visible:ring-1', 'focus-visible:ring-ring'],
        ['placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50'],
        className,
      )}
      {...props}
    />
  ),
);

Input.displayName = 'Input';

export { Input };
