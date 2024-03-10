import type { FC } from 'react';
import type { ConsoleType } from '../types';
import { consoleBadgeVariantStrategy } from './strategy';
import Badge from '~/components/ui/Badge';

interface LevelProps {
  level: ConsoleType;
}

const Level: FC<LevelProps> = ({ level }) => (
  <Badge
    className="capitalize w-14 justify-center font-mono"
    variant={consoleBadgeVariantStrategy[level]}
  >
    {level}
  </Badge>
);

export default Level;
