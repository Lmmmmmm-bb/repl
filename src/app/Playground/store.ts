import { create } from 'zustand';
import { nanoid } from 'nanoid';
import type { ConsoleMessage, ConsoleStore } from './types';

type ConsoleMessageWithoutIdAndCount = Omit<ConsoleMessage, 'id' | 'count'>;

export const useConsoleStore = create<ConsoleStore>(() => ({ messages: [] }));

const createMessage = (messageWithoutId: ConsoleMessageWithoutIdAndCount) => {
  const logId = nanoid();
  const message: ConsoleMessage = { count: 1, id: logId, ...messageWithoutId };
  return message;
};

export const appendMessage = (messageWithoutId: ConsoleMessageWithoutIdAndCount) => {
  const { messages } = useConsoleStore.getState();
  useConsoleStore.setState({
    messages: [...messages, createMessage(messageWithoutId)],
  });
};

export const clearMessage = () => {
  useConsoleStore.setState({ messages: [] });
};

export const addDuplicateMessage = (messageWithoutId: ConsoleMessageWithoutIdAndCount) => {
  const { messages } = useConsoleStore.getState();
  const last = messages[messages.length - 1];

  if (last) {
    const message: ConsoleMessage = { ...last, count: last.count + 1 };
    const sliceLastMessages = messages.slice(0, -1);
    useConsoleStore.setState({
      messages: [...sliceLastMessages, message],
    });
  } else {
    appendMessage(createMessage(messageWithoutId));
  }
};
