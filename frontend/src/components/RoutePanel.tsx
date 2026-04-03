import type { RouteResult } from '../types';
import { LINE_COLORS } from '../constants';

interface Props {
  route: RouteResult;
}

function formatDuration(secs: number): string {
  const m = Math.floor(secs / 60);
  if (m < 60) return `${m} min`;
  return `${Math.floor(m / 60)}h ${m % 60}m`;
}

export default function RoutePanel({ route }: Props) {
  return (
    <div style={{ marginTop: 16 }}>
      {/* Summary */}
      <div style={{
        background: '#f8f9ff', borderRadius: 8, padding: '12px 16px',
        marginBottom: 12, border: '1px solid #e0e4ff',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 16 }}>{route.from}</div>
            <div style={{ fontSize: 12, color: '#666' }}>→ {route.to}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontWeight: 700, fontSize: 18, color: '#2c3e50' }}>
              ₹{route.fare}
            </div>
            <div style={{ fontSize: 12, color: '#666' }}>{formatDuration(route.duration_seconds)}</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12, fontSize: 12, color: '#555' }}>
          <span>📏 {route.distance_km} km</span>
          <span>🔄 {route.interchanges.length} interchange{route.interchanges.length !== 1 ? 's' : ''}</span>
          {route.peak_hour && <span style={{ color: '#e67e22', fontWeight: 600 }}>⏰ Peak hour</span>}
        </div>
      </div>

      {/* Warnings */}
      {route.warnings.map((w, i) => (
        <div key={i} style={{
          background: '#fff3cd', border: '1px solid #ffc107', borderRadius: 6,
          padding: '8px 12px', marginBottom: 8, fontSize: 13, color: '#856404',
        }}>
          ⚠️ {w}
        </div>
      ))}

      {/* Interchanges */}
      {route.interchanges.length > 0 && (
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 6, color: '#555' }}>INTERCHANGES</div>
          {route.interchanges.map((ic, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 6, fontSize: 13,
              padding: '6px 0', borderBottom: '1px solid #f0f0f0',
            }}>
              <span style={{
                background: LINE_COLORS[ic.from_line] ?? '#ccc',
                color: 'white', padding: '2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 600,
              }}>{ic.from_line}</span>
              <span>→</span>
              <span style={{
                background: LINE_COLORS[ic.to_line] ?? '#ccc',
                color: 'white', padding: '2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 600,
              }}>{ic.to_line}</span>
              <span style={{ color: '#555' }}>at {ic.station}</span>
            </div>
          ))}
        </div>
      )}

      {/* Path steps */}
      <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 6, color: '#555' }}>ROUTE</div>
      <div style={{ maxHeight: 300, overflowY: 'auto' }}>
        {route.path.map((step, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 10, padding: '5px 0',
            borderBottom: i < route.path.length - 1 ? '1px solid #f5f5f5' : 'none',
          }}>
            <div style={{
              width: 12, height: 12, borderRadius: '50%', flexShrink: 0,
              background: LINE_COLORS[step.line] ?? '#ccc',
              border: (step.action === 'board' || step.action === 'alight') ? '2px solid #333' : '2px solid transparent',
            }} />
            <span style={{
              fontSize: 14,
              fontWeight: (step.action === 'board' || step.action === 'alight') ? 700 : 400,
            }}>
              {step.stationName}
            </span>
            {step.action === 'transfer' && (
              <span style={{
                marginLeft: 'auto', fontSize: 11, color: '#8e44ad',
                background: '#f3e5f5', padding: '2px 8px', borderRadius: 4, fontWeight: 600,
              }}>CHANGE</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
