import { create } from 'zustand';
import { nanoid } from 'nanoid';
import type { ConsoleMessage, ConsoleStore } from './types';

export const useConsoleStore = create<ConsoleStore>(() => ({ messages: [] }));

export const appendMessage = (messageWithoutId: Omit<ConsoleMessage, 'id'>) => {
  const logId = nanoid();
  const { messages } = useConsoleStore.getState();

  const message: ConsoleMessage = { ...messageWithoutId, id: logId };
  useConsoleStore.setState({
    messages: [...messages, message],
  });
};

export const clearMessage = () => {
  useConsoleStore.setState({ messages: [] });
};
