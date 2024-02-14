import type { FC } from 'react';
import type { VariantProps } from 'class-variance-authority';
import { badgeVariants } from './config';
import { cn } from '~/utils/cn';

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
