import { sushiWaiterScenario } from './sushiWaiter';
import { brogaCafeScenario } from './brogaCafe';

import type { RealtimeAgent } from '@openai/agents/realtime';

// Map of scenario key -> array of RealtimeAgent objects
export const allAgentSets: Record<string, RealtimeAgent[]> = {
  sushiWaiter: sushiWaiterScenario,
  brogaCafe: brogaCafeScenario,
};

export const defaultAgentSetKey = 'sushiWaiter';
