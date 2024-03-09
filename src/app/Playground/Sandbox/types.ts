import type { ConsoleData, ConsoleType } from '../types';

export interface ConsolePayload {
  duplicate: boolean;
  level: ConsoleType;
  data: ConsoleData[];
}
