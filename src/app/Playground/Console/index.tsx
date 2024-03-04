import { type FC, useEffect, useRef } from 'react';
import { useConsoleStore } from '../store';
import Message from './Message';

const Console: FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const messages = useConsoleStore(state => state.messages);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div ref={ref} className="h-full dark:bg-dark-800/60 overflow-auto">
      {messages.map(message => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  );
};

export default Console;
