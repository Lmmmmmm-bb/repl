import type { FC } from 'react';
import type { ConsoleMessage } from '../types';
import Level from './Level';
import Duplicate from './Duplicate';
import { cn } from '~/utils/cn';

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
    <Level level={message.type} />

    <div
      className={cn(
        ['w-full'],
        ['flex-1', 'flex', 'gap-2', 'flex-wrap'],
        ['text-sm', 'overflow-hidden'],
      )}
    >
      {message.data.map(item => (
        <span
          key={item}
          className={cn(
            ['break-words', 'overflow-hidden'],
            ['text-wrap', 'leading-[22px]', 'whitespace-pre', 'font-mono'],
          )}
        >
          {item}
        </span>
      ))}
    </div>

    {message.count > 1 && <Duplicate count={message.count} />}
  </div>
);

export default Message;
