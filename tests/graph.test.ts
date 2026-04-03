import { MetroGraph } from '../src/graph/graph';
import { dijkstra, reconstructPath } from '../src/graph/dijkstra';

describe('MetroGraph', () => {
  let graph: MetroGraph;

  beforeEach(() => {
    graph = new MetroGraph();
    graph.addStation({ id: 'A', name: 'Station A', line: 'Red', lat: 0, lng: 0, interchange: false });
    graph.addStation({ id: 'B', name: 'Station B', line: 'Red', lat: 0, lng: 0, interchange: false });
    graph.addStation({ id: 'C', name: 'Station C', line: 'Red', lat: 0, lng: 0, interchange: false });
    graph.addStation({ id: 'D', name: 'Station D', line: 'Blue', lat: 0, lng: 0, interchange: true });
    graph.addEdge('A', 'B', 100, 'Red');
    graph.addEdge('B', 'C', 150, 'Red');
    graph.addEdge('B', 'D', 300, 'transfer');
    graph.addEdge('A', 'D', 1000, 'Red');
  });

  it('has correct number of stations', () => {
    expect(graph.size()).toBe(4);
  });

  it('retrieves station by id', () => {
    expect(graph.getStation('A')?.name).toBe('Station A');
  });

  it('returns undefined for unknown station', () => {
    expect(graph.getStation('X')).toBeUndefined();
  });

  it('edges are bidirectional', () => {
    const edgesFromA = graph.getEdges('A').map(e => e.to);
    const edgesFromB = graph.getEdges('B').map(e => e.to);
    expect(edgesFromA).toContain('B');
    expect(edgesFromB).toContain('A');
  });

  it('throws when adding edge for unknown station', () => {
    expect(() => graph.addEdge('A', 'Z', 100, 'Red')).toThrow();
  });
});

describe('Dijkstra', () => {
  let graph: MetroGraph;

  beforeEach(() => {
    graph = new MetroGraph();
    ['A','B','C','D','E'].forEach(id =>
      graph.addStation({ id, name: `Station ${id}`, line: 'Red', lat: 0, lng: 0, interchange: false })
    );
    graph.addEdge('A', 'B', 100, 'Red');
    graph.addEdge('B', 'C', 100, 'Red');
    graph.addEdge('A', 'C', 300, 'Red');
    graph.addEdge('C', 'D', 50, 'Red');
  });

  it('finds shortest path A→C via B', () => {
    const result = dijkstra(graph, 'A', 'C');
    expect(result.found).toBe(true);
    expect(result.distances.get('C')).toBe(200);
  });

  it('reconstructs path correctly', () => {
    const result = dijkstra(graph, 'A', 'D');
    const path = reconstructPath(result.previous, 'A', 'D');
    expect(path).toEqual(['A', 'B', 'C', 'D']);
  });

  it('returns same station for source = target', () => {
    const result = dijkstra(graph, 'A', 'A');
    const path = reconstructPath(result.previous, 'A', 'A');
    expect(path).toEqual(['A']);
  });

  it('returns not found for disconnected node', () => {
    const result = dijkstra(graph, 'A', 'E');
    expect(result.found).toBe(false);
  });

  it('applies custom weight function', () => {
    const result = dijkstra(graph, 'A', 'C', (_f, _t, w) => w * 2);
    expect(result.distances.get('C')).toBe(400);
  });
});
