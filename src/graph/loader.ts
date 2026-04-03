import { MetroGraph } from './graph';
import { Station, Edge } from '../models/types';
import stationsData from '../data/stations.json';
import edgesData from '../data/edges.json';
import logger from '../utils/logger';

let cachedGraph: MetroGraph | null = null;

export function buildGraph(
  stations: Station[] = stationsData as Station[],
  edges: Edge[] = edgesData as Edge[]
): MetroGraph {
  const graph = new MetroGraph();

  for (const station of stations) {
    graph.addStation(station);
  }

  let edgeCount = 0;
  const addedPairs = new Set<string>();

  for (const edge of edges) {
    const key = [edge.from, edge.to].sort().join('|');
    if (addedPairs.has(key)) continue;
    addedPairs.add(key);

    try {
      graph.addEdge(edge.from, edge.to, edge.weight, edge.line);
      edgeCount++;
    } catch (err) {
      logger.warn(`Skipping edge ${edge.from} -> ${edge.to}: ${(err as Error).message}`);
    }
  }

  logger.info(`Graph built: ${graph.size()} stations, ${edgeCount} edges`);
  return graph;
}

export function getGraph(): MetroGraph {
  if (!cachedGraph) {
    cachedGraph = buildGraph();
  }
  return cachedGraph;
}
