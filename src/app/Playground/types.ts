import type { CONSOLE_LEVEL } from './config';

export type ConsoleType = 'log' | 'info' | 'warn' | 'error';

export type ConsoleData = number | string;

export interface ConsoleMessage {
  count: number;
  id: string;
  type: ConsoleType;
  data: ConsoleData[];
}

export interface ConsoleStore {
  messages: ConsoleMessage[];
}

export type ConsoleSelectType = typeof CONSOLE_LEVEL[number];
