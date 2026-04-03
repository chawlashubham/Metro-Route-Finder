"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildGraph = buildGraph;
exports.getGraph = getGraph;
const graph_1 = require("./graph");
const stations_json_1 = __importDefault(require("../data/stations.json"));
const edges_json_1 = __importDefault(require("../data/edges.json"));
const logger_1 = __importDefault(require("../utils/logger"));
let cachedGraph = null;
function buildGraph(stations = stations_json_1.default, edges = edges_json_1.default) {
    const graph = new graph_1.MetroGraph();
    for (const station of stations) {
        graph.addStation(station);
    }
    let edgeCount = 0;
    const addedPairs = new Set();
    for (const edge of edges) {
        const key = [edge.from, edge.to].sort().join('|');
        if (addedPairs.has(key))
            continue;
        addedPairs.add(key);
        try {
            graph.addEdge(edge.from, edge.to, edge.weight, edge.line);
            edgeCount++;
        }
        catch (err) {
            logger_1.default.warn(`Skipping edge ${edge.from} -> ${edge.to}: ${err.message}`);
        }
    }
    logger_1.default.info(`Graph built: ${graph.size()} stations, ${edgeCount} edges`);
    return graph;
}
function getGraph() {
    if (!cachedGraph) {
        cachedGraph = buildGraph();
    }
    return cachedGraph;
}
//# sourceMappingURL=loader.js.map