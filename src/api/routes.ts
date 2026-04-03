import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { findRoute } from '../services/routeService';
import { calculateFare, haversineDistance } from '../services/fareService';
import { getCrowdLevel, setCrowdLevel } from '../services/crowdService';
import { getGraph } from '../graph/loader';

const router = Router();

function validate<T>(schema: z.ZodSchema<T>, data: unknown): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    const msg = result.error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join('; ');
    const err = new Error(msg) as Error & { statusCode: number; code: string };
    err.statusCode = 400;
    err.code = 'VALIDATION_ERROR';
    throw err;
  }
  return result.data;
}

router.get('/stations', (_req: Request, res: Response) => {
  const graph = getGraph();
  res.json({ data: graph.getAllStations() });
});

router.get('/stations/:id', (req: Request, res: Response, next: NextFunction) => {
  try {
    const graph = getGraph();
    const station = graph.getStation(req.params.id);
    if (!station) {
      const err = new Error(`Station '${req.params.id}' not found`) as Error & { statusCode: number; code: string };
      err.statusCode = 404;
      err.code = 'NOT_FOUND';
      throw err;
    }
    res.json({ data: station });
  } catch (err) {
    next(err);
  }
});

router.get('/lines', (_req: Request, res: Response) => {
  const graph = getGraph();
  const lines = [...new Set(graph.getAllStations().map(s => s.line))].sort();
  res.json({ data: lines });
});

const routeQuerySchema = z.object({
  from: z.string().min(1),
  to: z.string().min(1),
  optimize: z.enum(['time', 'distance']).optional().default('time'),
  datetime: z.string().datetime({ offset: true }).optional(),
});

router.get('/route', (req: Request, res: Response, next: NextFunction) => {
  try {
    const query = validate(routeQuerySchema, req.query);
    const dt = query.datetime ? new Date(query.datetime) : undefined;
    const result = findRoute(query.from, query.to, query.optimize, dt);
    res.json({ data: result });
  } catch (err) {
    next(err);
  }
});

const fareQuerySchema = z.object({
  from: z.string().min(1),
  to: z.string().min(1),
});

router.get('/fare', (req: Request, res: Response, next: NextFunction) => {
  try {
    const query = validate(fareQuerySchema, req.query);
    const graph = getGraph();
    const fromStation = graph.getStation(query.from);
    const toStation = graph.getStation(query.to);
    if (!fromStation) {
      const err = new Error(`Station '${query.from}' not found`) as Error & { statusCode: number; code: string };
      err.statusCode = 404; err.code = 'NOT_FOUND'; throw err;
    }
    if (!toStation) {
      const err = new Error(`Station '${query.to}' not found`) as Error & { statusCode: number; code: string };
      err.statusCode = 404; err.code = 'NOT_FOUND'; throw err;
    }
    const distKm = haversineDistance(fromStation.lat, fromStation.lng, toStation.lat, toStation.lng);
    const fare = calculateFare(distKm);
    res.json({ data: { from: fromStation.name, to: toStation.name, distance_km: parseFloat(distKm.toFixed(2)), fare } });
  } catch (err) {
    next(err);
  }
});

const crowdQuerySchema = z.object({
  stationId: z.string().min(1),
});

router.get('/crowd', (req: Request, res: Response, next: NextFunction) => {
  try {
    const query = validate(crowdQuerySchema, req.query);
    const graph = getGraph();
    if (!graph.hasStation(query.stationId)) {
      const err = new Error(`Station '${query.stationId}' not found`) as Error & { statusCode: number; code: string };
      err.statusCode = 404; err.code = 'NOT_FOUND'; throw err;
    }
    const level = getCrowdLevel(query.stationId);
    const station = graph.getStation(query.stationId)!;
    res.json({ data: { stationId: query.stationId, stationName: station.name, crowdLevel: level, updatedAt: new Date().toISOString() } });
  } catch (err) {
    next(err);
  }
});

const crowdBodySchema = z.object({
  stationId: z.string().min(1),
  level: z.number().min(0).max(1),
});

router.post('/crowd', (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = validate(crowdBodySchema, req.body);
    const graph = getGraph();
    if (!graph.hasStation(body.stationId)) {
      const err = new Error(`Station '${body.stationId}' not found`) as Error & { statusCode: number; code: string };
      err.statusCode = 404; err.code = 'NOT_FOUND'; throw err;
    }
    setCrowdLevel(body.stationId, body.level);
    res.status(201).json({ data: { stationId: body.stationId, level: body.level, updatedAt: new Date().toISOString() } });
  } catch (err) {
    next(err);
  }
});

export default router;
