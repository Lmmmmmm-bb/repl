import type { ConsoleData, ConsoleType } from '../types';

export interface ConsolePayload {
  level: ConsoleType;
  data: ConsoleData[];
}
