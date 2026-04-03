import logger from '../utils/logger';

interface CrowdEntry {
  level: number;
  updatedAt: Date;
}

const CROWD_DATA_TTL_MS = parseInt(process.env.CROWD_DATA_TTL ?? '60') * 1000;

const crowdStore = new Map<string, CrowdEntry>();

const SIMULATED_CROWD: Record<string, number> = {
  'yellow-rajiv-chowk': 0.95,
  'blue-rajiv-chowk': 0.95,
  'yellow-kashmere-gate': 0.8,
  'red-kashmere-gate': 0.8,
  'blue-karol-bagh': 0.75,
  'yellow-aiims': 0.7,
  'violet-lajpat-nagar': 0.65,
  'blue-yamuna-bank': 0.6,
};

export function getCrowdLevel(stationId: string): number {
  const entry = crowdStore.get(stationId);
  if (entry && Date.now() - entry.updatedAt.getTime() < CROWD_DATA_TTL_MS) {
    return entry.level;
  }
  return SIMULATED_CROWD[stationId] ?? 0.2;
}

export function setCrowdLevel(stationId: string, level: number): void {
  if (level < 0 || level > 1) {
    throw new Error('Crowd level must be between 0 and 1');
  }
  crowdStore.set(stationId, { level, updatedAt: new Date() });
  logger.info('Crowd level updated', { stationId, level });
}

export function getEdgeCrowdWeight(
  fromId: string,
  toId: string,
  baseWeight: number,
  alpha: number
): number {
  const crowd = Math.max(getCrowdLevel(fromId), getCrowdLevel(toId));
  return baseWeight * (1 + alpha * crowd);
}
