import { useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Polyline, Tooltip, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type { Station, StationStep } from '../types';
import { LINE_COLORS } from '../constants';

interface Props {
  stations: Station[];
  route: StationStep[] | null;
  allStations: Station[];
}

function FitBounds({ route, allStations }: { route: StationStep[] | null; allStations: Station[] }) {
  const map = useMap();
  useEffect(() => {
    if (route && route.length > 0) {
      const points = route
        .map(s => allStations.find(st => st.id === s.stationId))
        .filter(Boolean)
        .map(s => [s!.lat, s!.lng] as [number, number]);
      if (points.length > 1) map.fitBounds(points, { padding: [40, 40] });
    }
  }, [route, map, allStations]);
  return null;
}

export default function MetroMap({ stations, route, allStations }: Props) {
  // Build route polyline segments per line
  const segments: Array<{ positions: [number, number][]; line: string }> = [];
  if (route && route.length > 1) {
    let segPositions: [number, number][] = [];
    let segLine = route[0].line;
    for (const step of route) {
      const st = allStations.find(s => s.id === step.stationId);
      if (!st) continue;
      if (step.line !== segLine && segPositions.length > 0) {
        segments.push({ positions: segPositions, line: segLine });
        segPositions = [[st.lat, st.lng]];
        segLine = step.line;
      } else {
        segPositions.push([st.lat, st.lng]);
      }
    }
    if (segPositions.length > 0) segments.push({ positions: segPositions, line: segLine });
  }

  const routeIds = new Set(route?.map(s => s.stationId) ?? []);

  return (
    <MapContainer
      center={[28.6139, 77.2090]}
      zoom={11}
      style={{ width: '100%', height: '100%' }}
      zoomControl={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FitBounds route={route} allStations={allStations} />

      {/* Draw route polylines */}
      {segments.map((seg, i) => (
        <Polyline
          key={i}
          positions={seg.positions}
          color={LINE_COLORS[seg.line] ?? '#999'}
          weight={5}
          opacity={0.85}
        />
      ))}

      {/* Draw all stations as small dots */}
      {stations.map(s => {
        const isOnRoute = routeIds.has(s.id);
        return (
          <CircleMarker
            key={s.id}
            center={[s.lat, s.lng]}
            radius={isOnRoute ? 7 : (s.interchange ? 5 : 3)}
            fillColor={LINE_COLORS[s.line] ?? '#ccc'}
            color={isOnRoute ? '#333' : (LINE_COLORS[s.line] ?? '#ccc')}
            weight={isOnRoute ? 2 : 1}
            fillOpacity={isOnRoute ? 1 : 0.6}
          >
            <Tooltip direction="top" offset={[0, -8]} opacity={0.9}>
              <span style={{ fontSize: 12 }}><b>{s.name}</b> ({s.line})</span>
            </Tooltip>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
}
