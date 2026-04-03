import { MetroGraph } from './graph';
import { DijkstraResult } from '../models/types';
export declare function dijkstra(graph: MetroGraph, source: string, target: string, weightFn?: (from: string, to: string, baseWeight: number, line: string) => number): DijkstraResult;
export declare function reconstructPath(previous: Map<string, string | null>, source: string, target: string): string[];
//# sourceMappingURL=dijkstra.d.ts.map