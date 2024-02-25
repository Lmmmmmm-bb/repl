import type { FC } from 'react';
import { useConsoleStore } from '../store';
import Message from './Message';

const Console: FC = () => {
  const messages = useConsoleStore(state => state.messages);

  return (
    <div className="h-full dark:bg-dark-800/60 overflow-auto">
      {messages.map(message => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  );
};

export default Console;
