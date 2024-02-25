import type { FC } from 'react';
import type { ConsoleMessage } from '../types';
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
      variant="destructive"
      className="capitalize"
    >
      {message.type}
    </Badge>
    <span className={cn(
      ['flex-1'],
      ['break-words', 'overflow-hidden'],
      ['text-sm', 'text-wrap', 'leading-[22px]', 'whitespace-pre', 'font-mono'],
    )}
    >
      {message.message}
    </span>
  </div>
);

export default Message;
