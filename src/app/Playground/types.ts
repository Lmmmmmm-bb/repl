export interface ConsoleMessage {
  id: string;
  type: 'warning' | 'info' | 'error';
  message: string;
}

export interface ConsoleStore {
  messages: ConsoleMessage[];
}
