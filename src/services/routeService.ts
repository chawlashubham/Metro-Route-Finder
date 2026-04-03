import { getGraph } from '../graph/loader';
import { dijkstra, reconstructPath } from '../graph/dijkstra';
import { calculateFare, haversineDistance } from './fareService';
import { getEdgeCrowdWeight } from './crowdService';
import { isPeakHour, applyPeakMultiplier } from './peakHourService';
import { RouteResult, StationStep, InterchangeInfo } from '../models/types';
import logger from '../utils/logger';

const CROWD_ALPHA = parseFloat(process.env.CROWD_ALPHA ?? '0.3');

export function findRoute(
  fromId: string,
  toId: string,
  optimize: 'time' | 'distance' = 'time',
  datetime?: Date
): RouteResult {
  const graph = getGraph();

  if (!graph.hasStation(fromId)) {
    throw new Error(`Source station '${fromId}' not found`);
  }
  if (!graph.hasStation(toId)) {
    throw new Error(`Destination station '${toId}' not found`);
  }

  const now = datetime ?? new Date();
  const peak = isPeakHour(now);

  const result = dijkstra(graph, fromId, toId, (from, to, baseWeight, line) => {
    let w = baseWeight;
    if (optimize === 'time') {
      w = getEdgeCrowdWeight(from, to, w, CROWD_ALPHA);
      w = applyPeakMultiplier(w, line, now);
    }
    return w;
  });

  if (!result.found) {
    throw new Error(`No route found from '${fromId}' to '${toId}'`);
  }

  const pathIds = reconstructPath(result.previous, fromId, toId);
  if (pathIds.length === 0) {
    throw new Error(`Could not reconstruct path from '${fromId}' to '${toId}'`);
  }

  const steps: StationStep[] = [];
  const interchanges: InterchangeInfo[] = [];

  for (let i = 0; i < pathIds.length; i++) {
    const station = graph.getStation(pathIds[i])!;
    let action: StationStep['action'] = 'ride';
    if (i === 0) action = 'board';
    else if (i === pathIds.length - 1) action = 'alight';
    else {
      const prevStation = graph.getStation(pathIds[i - 1])!;
      if (prevStation.line !== station.line) {
        action = 'transfer';
        interchanges.push({
          station: station.name,
          from_line: prevStation.line,
          to_line: station.line,
        });
      }
    }
    steps.push({
      stationId: station.id,
      stationName: station.name,
      line: station.line,
      action,
    });
  }

  let distanceKm = 0;
  for (let i = 1; i < pathIds.length; i++) {
    const a = graph.getStation(pathIds[i - 1])!;
    const b = graph.getStation(pathIds[i])!;
    distanceKm += haversineDistance(a.lat, a.lng, b.lat, b.lng);
  }

  const durationSeconds = result.distances.get(toId) ?? 0;
  const fare = calculateFare(distanceKm);

  const warnings: string[] = [];
  if (peak) {
    warnings.push('Peak hour — expect ~20% longer travel time');
  }

  const fromStation = graph.getStation(fromId)!;
  const toStation = graph.getStation(toId)!;

  logger.info('Route computed', {
    from: fromId, to: toId,
    duration: durationSeconds,
    distance: distanceKm.toFixed(2),
    interchanges: interchanges.length,
    peak,
  });

  return {
    from: fromStation.name,
    to: toStation.name,
    path: steps,
    duration_seconds: Math.round(durationSeconds),
    distance_km: parseFloat(distanceKm.toFixed(2)),
    fare,
    interchanges,
    peak_hour: peak,
    warnings,
  };
}
