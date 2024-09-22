import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps, FC } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '~/utils/cn';
import { buttonVariants } from './config';

export type ButtonProps = ComponentProps<'button'> & VariantProps<typeof buttonVariants> & { asChild?: boolean };

const Button: FC<ComponentProps<'button'> & VariantProps<typeof buttonVariants> & { asChild?: boolean }>
  = ({ className, variant, size, asChild = false, ...props }) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  };

Button.displayName = 'Button';

export default Button;
