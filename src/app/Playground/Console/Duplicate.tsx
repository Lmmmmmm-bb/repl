import type { FC } from 'react';
import { cn } from '~/utils/cn';

interface DuplicateProps {
  count: number;
}

const Duplicate: FC<DuplicateProps> = ({ count }) => (
  <span
    title="Duplicate message"
    className={cn(
      ['text-xs', 'leading-[22px]', 'select-none'],
      ['opacity-40'],
    )}
  >
    {count}
  </span>
);

export default Duplicate;
