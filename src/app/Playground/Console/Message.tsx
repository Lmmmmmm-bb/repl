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

    <div
      className={cn(
        ['w-full'],
        ['flex-1', 'flex', 'gap-2', 'flex-wrap'],
        ['text-sm', 'overflow-hidden'],
      )}
    >
      {message.data.map((item, index) => (
        <span
          key={index}
          className={cn(
            ['break-words', 'overflow-hidden'],
            ['text-wrap', 'leading-[22px]', 'whitespace-pre', 'font-mono'],
          )}
        >
          {item}
        </span>
      ))}
    </div>

    {message.count > 1 && (
      <span
        title="Duplicate message"
        className={cn(
          ['text-xs', 'leading-[22px]', 'select-none'],
          ['opacity-40'],
        )}
      >
        {message.count}
      </span>
    )}
  </div>
);

export default Message;
