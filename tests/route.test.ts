import request from 'supertest';
import { app } from '../src/server';

jest.mock('../src/graph/loader', () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { MetroGraph } = require('../src/graph/graph');

  const graph = new MetroGraph();
  const stations = [
    { id: 'red-a', name: 'Station A', line: 'Red', lat: 28.70, lng: 77.10, interchange: true },
    { id: 'red-b', name: 'Station B', line: 'Red', lat: 28.69, lng: 77.12, interchange: false },
    { id: 'red-c', name: 'Station C', line: 'Red', lat: 28.68, lng: 77.14, interchange: true },
    { id: 'blue-c', name: 'Station C', line: 'Blue', lat: 28.68, lng: 77.14, interchange: true },
    { id: 'blue-d', name: 'Station D', line: 'Blue', lat: 28.66, lng: 77.18, interchange: false },
  ];
  stations.forEach(s => graph.addStation(s));
  graph.addEdge('red-a', 'red-b', 150, 'Red');
  graph.addEdge('red-b', 'red-c', 150, 'Red');
  graph.addEdge('red-c', 'blue-c', 300, 'transfer');
  graph.addEdge('blue-c', 'blue-d', 150, 'Blue');

  return {
    getGraph: () => graph,
    buildGraph: jest.fn(),
  };
});

describe('GET /health', () => {
  it('returns 200 with status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});

describe('GET /api/v1/stations', () => {
  it('returns list of stations', async () => {
    const res = await request(app).get('/api/v1/stations');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
  });
});

describe('GET /api/v1/stations/:id', () => {
  it('returns a station', async () => {
    const res = await request(app).get('/api/v1/stations/red-a');
    expect(res.status).toBe(200);
    expect(res.body.data.id).toBe('red-a');
  });

  it('returns 404 for unknown station', async () => {
    const res = await request(app).get('/api/v1/stations/unknown-station');
    expect(res.status).toBe(404);
  });
});

describe('GET /api/v1/lines', () => {
  it('returns array of line names', async () => {
    const res = await request(app).get('/api/v1/lines');
    expect(res.status).toBe(200);
    expect(res.body.data).toContain('Red');
    expect(res.body.data).toContain('Blue');
  });
});

describe('GET /api/v1/route', () => {
  it('finds a valid route', async () => {
    const res = await request(app).get('/api/v1/route?from=red-a&to=blue-d');
    expect(res.status).toBe(200);
    const data = res.body.data;
    expect(data.path.length).toBeGreaterThan(1);
    expect(data.duration_seconds).toBeGreaterThan(0);
    expect(data.fare).toBeGreaterThan(0);
  });

  it('returns 400 for missing params', async () => {
    const res = await request(app).get('/api/v1/route?from=red-a');
    expect(res.status).toBe(400);
  });

  it('returns error for unknown station', async () => {
    const res = await request(app).get('/api/v1/route?from=unknown&to=blue-d');
    expect(res.status).toBeGreaterThanOrEqual(400);
  });

  it('handles same source and destination', async () => {
    const res = await request(app).get('/api/v1/route?from=red-a&to=red-a');
    expect([200, 400, 500]).toContain(res.status);
  });
});

describe('GET /api/v1/fare', () => {
  it('returns fare for valid stations', async () => {
    const res = await request(app).get('/api/v1/fare?from=red-a&to=blue-d');
    expect(res.status).toBe(200);
    expect(res.body.data.fare).toBeGreaterThan(0);
  });

  it('returns 400 for missing params', async () => {
    const res = await request(app).get('/api/v1/fare?from=red-a');
    expect(res.status).toBe(400);
  });
});

describe('GET /api/v1/crowd', () => {
  it('returns crowd level for valid station', async () => {
    const res = await request(app).get('/api/v1/crowd?stationId=red-a');
    expect(res.status).toBe(200);
    expect(typeof res.body.data.crowdLevel).toBe('number');
  });
});

describe('POST /api/v1/crowd', () => {
  it('accepts valid crowd report', async () => {
    const res = await request(app)
      .post('/api/v1/crowd')
      .send({ stationId: 'red-a', level: 0.8 });
    expect(res.status).toBe(201);
  });

  it('rejects invalid level', async () => {
    const res = await request(app)
      .post('/api/v1/crowd')
      .send({ stationId: 'red-a', level: 1.5 });
    expect(res.status).toBe(400);
  });
});
