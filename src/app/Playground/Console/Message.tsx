import type { FC } from 'react';
import type { ConsoleMessage } from '../types';
import { consoleBadgeVariantStrategy } from './strategy';
import { cn } from '~/utils/cn';
import Badge from '~/components/ui/Badge';

interface MessageProps {
  message: ConsoleMessage;
}

const Message: FC<MessageProps> = ({ message }) => (
  <div
    className={cn(
      ['min-h-8', 'p-2'],
      ['flex', 'items-start', 'gap-2'],
      ['border-b'],
    )}
  >
    <Badge
      className="capitalize"
      variant={consoleBadgeVariantStrategy[message.type]}
    >
      {message.type}
    </Badge>

    <div className="w-full flex-1 flex gap-2 flex-wrap overflow-hidden">
      {message.data.map(item => (
        <span
          key={item}
          className={cn(
            ['break-words', 'overflow-hidden'],
            ['text-sm', 'text-wrap', 'leading-[22px]', 'whitespace-pre', 'font-mono'],
          )}
        >
          {item}
        </span>
      ))}
    </div>
  </div>
);

export default Message;
