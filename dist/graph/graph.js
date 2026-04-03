"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetroGraph = void 0;
class MetroGraph {
    constructor() {
        this.nodes = new Map();
    }
    addStation(station) {
        if (!this.nodes.has(station.id)) {
            this.nodes.set(station.id, { station, edges: [] });
        }
    }
    addEdge(from, to, weight, line) {
        const fromNode = this.nodes.get(from);
        const toNode = this.nodes.get(to);
        if (!fromNode || !toNode) {
            throw new Error(`Cannot add edge: station '${from}' or '${to}' not found`);
        }
        fromNode.edges.push({ to, weight, line });
        toNode.edges.push({ to: from, weight, line });
    }
    getNode(id) {
        return this.nodes.get(id);
    }
    getStation(id) {
        return this.nodes.get(id)?.station;
    }
    getAllStations() {
        return Array.from(this.nodes.values()).map(n => n.station);
    }
    getEdges(id) {
        return this.nodes.get(id)?.edges ?? [];
    }
    hasStation(id) {
        return this.nodes.has(id);
    }
    size() {
        return this.nodes.size;
    }
}
exports.MetroGraph = MetroGraph;
//# sourceMappingURL=graph.js.map