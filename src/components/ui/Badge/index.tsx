import type { VariantProps } from 'class-variance-authority';
import type { FC } from 'react';
import { cn } from '~/utils/cn';
import { badgeVariants } from './config';

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof badgeVariants> {}

const Badge: FC<BadgeProps> = ({ className, variant, ...props }) => (
  <div
    className={cn(badgeVariants({ variant }), className)}
    {...props}
  />
);

export default Badge;
