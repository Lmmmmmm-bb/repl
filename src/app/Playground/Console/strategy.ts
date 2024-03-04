import type { ConsoleType } from '../types';

export const consoleBadgeVariantStrategy: Record<
  ConsoleType,
  'primary' | 'warning' | 'destructive' | 'info'
> = {
  log: 'primary',
  info: 'info',
  warn: 'warning',
  error: 'destructive',
};
