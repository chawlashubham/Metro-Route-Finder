import { Station, GraphNode, GraphEdge } from '../models/types';
export declare class MetroGraph {
    private nodes;
    addStation(station: Station): void;
    addEdge(from: string, to: string, weight: number, line: string): void;
    getNode(id: string): GraphNode | undefined;
    getStation(id: string): Station | undefined;
    getAllStations(): Station[];
    getEdges(id: string): GraphEdge[];
    hasStation(id: string): boolean;
    size(): number;
}
//# sourceMappingURL=graph.d.ts.map