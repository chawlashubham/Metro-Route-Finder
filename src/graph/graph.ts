import { Station, GraphNode, GraphEdge } from '../models/types';

export class MetroGraph {
  private nodes: Map<string, GraphNode> = new Map();

  addStation(station: Station): void {
    if (!this.nodes.has(station.id)) {
      this.nodes.set(station.id, { station, edges: [] });
    }
  }

  addEdge(from: string, to: string, weight: number, line: string): void {
    const fromNode = this.nodes.get(from);
    const toNode = this.nodes.get(to);
    if (!fromNode || !toNode) {
      throw new Error(`Cannot add edge: station '${from}' or '${to}' not found`);
    }
    fromNode.edges.push({ to, weight, line });
    toNode.edges.push({ to: from, weight, line });
  }

  getNode(id: string): GraphNode | undefined {
    return this.nodes.get(id);
  }

  getStation(id: string): Station | undefined {
    return this.nodes.get(id)?.station;
  }

  getAllStations(): Station[] {
    return Array.from(this.nodes.values()).map(n => n.station);
  }

  getEdges(id: string): GraphEdge[] {
    return this.nodes.get(id)?.edges ?? [];
  }

  hasStation(id: string): boolean {
    return this.nodes.has(id);
  }

  size(): number {
    return this.nodes.size;
  }
}
