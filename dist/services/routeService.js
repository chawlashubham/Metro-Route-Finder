"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findRoute = findRoute;
const loader_1 = require("../graph/loader");
const dijkstra_1 = require("../graph/dijkstra");
const fareService_1 = require("./fareService");
const crowdService_1 = require("./crowdService");
const peakHourService_1 = require("./peakHourService");
const logger_1 = __importDefault(require("../utils/logger"));
const CROWD_ALPHA = parseFloat(process.env.CROWD_ALPHA ?? '0.3');
function findRoute(fromId, toId, optimize = 'time', datetime) {
    const graph = (0, loader_1.getGraph)();
    if (!graph.hasStation(fromId)) {
        throw new Error(`Source station '${fromId}' not found`);
    }
    if (!graph.hasStation(toId)) {
        throw new Error(`Destination station '${toId}' not found`);
    }
    const now = datetime ?? new Date();
    const peak = (0, peakHourService_1.isPeakHour)(now);
    const result = (0, dijkstra_1.dijkstra)(graph, fromId, toId, (from, to, baseWeight, line) => {
        let w = baseWeight;
        if (optimize === 'time') {
            w = (0, crowdService_1.getEdgeCrowdWeight)(from, to, w, CROWD_ALPHA);
            w = (0, peakHourService_1.applyPeakMultiplier)(w, line, now);
        }
        return w;
    });
    if (!result.found) {
        throw new Error(`No route found from '${fromId}' to '${toId}'`);
    }
    const pathIds = (0, dijkstra_1.reconstructPath)(result.previous, fromId, toId);
    if (pathIds.length === 0) {
        throw new Error(`Could not reconstruct path from '${fromId}' to '${toId}'`);
    }
    const steps = [];
    const interchanges = [];
    for (let i = 0; i < pathIds.length; i++) {
        const station = graph.getStation(pathIds[i]);
        let action = 'ride';
        if (i === 0)
            action = 'board';
        else if (i === pathIds.length - 1)
            action = 'alight';
        else {
            const prevStation = graph.getStation(pathIds[i - 1]);
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
        const a = graph.getStation(pathIds[i - 1]);
        const b = graph.getStation(pathIds[i]);
        distanceKm += (0, fareService_1.haversineDistance)(a.lat, a.lng, b.lat, b.lng);
    }
    const durationSeconds = result.distances.get(toId) ?? 0;
    const fare = (0, fareService_1.calculateFare)(distanceKm);
    const warnings = [];
    if (peak) {
        warnings.push('Peak hour — expect ~20% longer travel time');
    }
    const fromStation = graph.getStation(fromId);
    const toStation = graph.getStation(toId);
    logger_1.default.info('Route computed', {
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
//# sourceMappingURL=routeService.js.map