export interface Station {
  id: string;
  name: string;
  line: string;
  lat: number;
  lng: number;
  interchange: boolean;
}

export interface Edge {
  from: string;
  to: string;
  weight: number;
  line: string;
}

export interface RouteResult {
  from: string;
  to: string;
  path: StationStep[];
  duration_seconds: number;
  distance_km: number;
  fare: number;
  interchanges: InterchangeInfo[];
  peak_hour: boolean;
  warnings: string[];
}

export interface StationStep {
  stationId: string;
  stationName: string;
  line: string;
  action: 'board' | 'ride' | 'transfer' | 'alight';
}

export interface InterchangeInfo {
  station: string;
  from_line: string;
  to_line: string;
}

export interface CrowdReport {
  stationId: string;
  level: number;
  timestamp: string;
}

export interface GraphNode {
  station: Station;
  edges: GraphEdge[];
}

export interface GraphEdge {
  to: string;
  weight: number;
  line: string;
}

export interface DijkstraResult {
  distances: Map<string, number>;
  previous: Map<string, string | null>;
  found: boolean;
}
