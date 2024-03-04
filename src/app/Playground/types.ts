export type ConsoleType = 'log' | 'info' | 'warn' | 'error';

export type ConsoleData = number | string;

export interface ConsoleMessage {
  id: string;
  type: ConsoleType;
  data: ConsoleData[];
}

export interface ConsoleStore {
  messages: ConsoleMessage[];
}
