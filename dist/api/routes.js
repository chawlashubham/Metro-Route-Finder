"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_1 = require("zod");
const routeService_1 = require("../services/routeService");
const fareService_1 = require("../services/fareService");
const crowdService_1 = require("../services/crowdService");
const loader_1 = require("../graph/loader");
const router = (0, express_1.Router)();
function validate(schema, data) {
    const result = schema.safeParse(data);
    if (!result.success) {
        const msg = result.error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join('; ');
        const err = new Error(msg);
        err.statusCode = 400;
        err.code = 'VALIDATION_ERROR';
        throw err;
    }
    return result.data;
}
router.get('/stations', (_req, res) => {
    const graph = (0, loader_1.getGraph)();
    res.json({ data: graph.getAllStations() });
});
router.get('/stations/:id', (req, res, next) => {
    try {
        const graph = (0, loader_1.getGraph)();
        const station = graph.getStation(req.params.id);
        if (!station) {
            const err = new Error(`Station '${req.params.id}' not found`);
            err.statusCode = 404;
            err.code = 'NOT_FOUND';
            throw err;
        }
        res.json({ data: station });
    }
    catch (err) {
        next(err);
    }
});
router.get('/lines', (_req, res) => {
    const graph = (0, loader_1.getGraph)();
    const lines = [...new Set(graph.getAllStations().map(s => s.line))].sort();
    res.json({ data: lines });
});
const routeQuerySchema = zod_1.z.object({
    from: zod_1.z.string().min(1),
    to: zod_1.z.string().min(1),
    optimize: zod_1.z.enum(['time', 'distance']).optional().default('time'),
    datetime: zod_1.z.string().datetime({ offset: true }).optional(),
});
router.get('/route', (req, res, next) => {
    try {
        const query = validate(routeQuerySchema, req.query);
        const dt = query.datetime ? new Date(query.datetime) : undefined;
        const result = (0, routeService_1.findRoute)(query.from, query.to, query.optimize, dt);
        res.json({ data: result });
    }
    catch (err) {
        next(err);
    }
});
const fareQuerySchema = zod_1.z.object({
    from: zod_1.z.string().min(1),
    to: zod_1.z.string().min(1),
});
router.get('/fare', (req, res, next) => {
    try {
        const query = validate(fareQuerySchema, req.query);
        const graph = (0, loader_1.getGraph)();
        const fromStation = graph.getStation(query.from);
        const toStation = graph.getStation(query.to);
        if (!fromStation) {
            const err = new Error(`Station '${query.from}' not found`);
            err.statusCode = 404;
            err.code = 'NOT_FOUND';
            throw err;
        }
        if (!toStation) {
            const err = new Error(`Station '${query.to}' not found`);
            err.statusCode = 404;
            err.code = 'NOT_FOUND';
            throw err;
        }
        const distKm = (0, fareService_1.haversineDistance)(fromStation.lat, fromStation.lng, toStation.lat, toStation.lng);
        const fare = (0, fareService_1.calculateFare)(distKm);
        res.json({ data: { from: fromStation.name, to: toStation.name, distance_km: parseFloat(distKm.toFixed(2)), fare } });
    }
    catch (err) {
        next(err);
    }
});
const crowdQuerySchema = zod_1.z.object({
    stationId: zod_1.z.string().min(1),
});
router.get('/crowd', (req, res, next) => {
    try {
        const query = validate(crowdQuerySchema, req.query);
        const graph = (0, loader_1.getGraph)();
        if (!graph.hasStation(query.stationId)) {
            const err = new Error(`Station '${query.stationId}' not found`);
            err.statusCode = 404;
            err.code = 'NOT_FOUND';
            throw err;
        }
        const level = (0, crowdService_1.getCrowdLevel)(query.stationId);
        const station = graph.getStation(query.stationId);
        res.json({ data: { stationId: query.stationId, stationName: station.name, crowdLevel: level, updatedAt: new Date().toISOString() } });
    }
    catch (err) {
        next(err);
    }
});
const crowdBodySchema = zod_1.z.object({
    stationId: zod_1.z.string().min(1),
    level: zod_1.z.number().min(0).max(1),
});
router.post('/crowd', (req, res, next) => {
    try {
        const body = validate(crowdBodySchema, req.body);
        const graph = (0, loader_1.getGraph)();
        if (!graph.hasStation(body.stationId)) {
            const err = new Error(`Station '${body.stationId}' not found`);
            err.statusCode = 404;
            err.code = 'NOT_FOUND';
            throw err;
        }
        (0, crowdService_1.setCrowdLevel)(body.stationId, body.level);
        res.status(201).json({ data: { stationId: body.stationId, level: body.level, updatedAt: new Date().toISOString() } });
    }
    catch (err) {
        next(err);
    }
});
exports.default = router;
//# sourceMappingURL=routes.js.map