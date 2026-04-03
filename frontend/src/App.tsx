import { useState, useEffect } from 'react';
import type { Station, RouteResult } from './types';
import { fetchStations, fetchRoute } from './api';
import StationSearch from './components/StationSearch';
import RoutePanel from './components/RoutePanel';
import MetroMap from './components/MetroMap';

export default function App() {
  const [stations, setStations] = useState<Station[]>([]);
  const [from, setFrom] = useState<Station | null>(null);
  const [to, setTo] = useState<Station | null>(null);
  const [optimize, setOptimize] = useState<'time' | 'distance'>('time');
  const [route, setRoute] = useState<RouteResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStations()
      .then(setStations)
      .catch(() => setError('Could not load station data. Is the API server running?'));
  }, []);

  async function handleSearch() {
    if (!from || !to) return;
    setLoading(true);
    setError(null);
    setRoute(null);
    try {
      const result = await fetchRoute(from.id, to.id, optimize);
      setRoute(result);
    } catch (e: unknown) {
      const msg = (e as { response?: { data?: { error?: { message?: string } } } })
        ?.response?.data?.error?.message ?? 'Failed to find route.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Sidebar */}
      <div style={{
        width: 340, flexShrink: 0, background: 'white', boxShadow: '2px 0 12px rgba(0,0,0,0.1)',
        overflowY: 'auto', zIndex: 10, display: 'flex', flexDirection: 'column',
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
          color: 'white', padding: '20px 20px 16px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <span style={{ fontSize: 24 }}>🚇</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 18 }}>Metro Route Finder</div>
              <div style={{ fontSize: 12, opacity: 0.75 }}>Delhi Metro Network</div>
            </div>
          </div>
        </div>

        {/* Search form */}
        <div style={{ padding: 16 }}>
          <StationSearch label="From" stations={stations} value={from} onChange={setFrom} />
          <StationSearch label="To" stations={stations} value={to} onChange={setTo} />

          <div style={{ marginBottom: 12 }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: 4, fontSize: 13 }}>
              Optimize for
            </label>
            <select
              value={optimize}
              onChange={e => setOptimize(e.target.value as 'time' | 'distance')}
              style={{
                width: '100%', padding: '8px 12px', border: '1px solid #ddd',
                borderRadius: 6, fontSize: 14, background: 'white', cursor: 'pointer',
              }}
            >
              <option value="time">Time (with crowd &amp; peak)</option>
              <option value="distance">Distance</option>
            </select>
          </div>

          <button
            onClick={handleSearch}
            disabled={!from || !to || loading}
            style={{
              width: '100%', padding: '10px 0', background: from && to ? '#1a1a2e' : '#ccc',
              color: 'white', border: 'none', borderRadius: 6, fontSize: 15,
              fontWeight: 600, cursor: from && to ? 'pointer' : 'not-allowed',
              transition: 'background 0.2s',
            }}
          >
            {loading ? '⏳ Finding route...' : '🔍 Find Route'}
          </button>

          {error && (
            <div style={{
              marginTop: 12, padding: '10px 14px', background: '#fff0f0',
              border: '1px solid #ffcdd2', borderRadius: 6, color: '#c0392b', fontSize: 13,
            }}>
              {error}
            </div>
          )}

          {route && <RoutePanel route={route} />}
        </div>

        {/* Line legend */}
        <div style={{ padding: '0 16px 16px', marginTop: 'auto' }}>
          <div style={{ fontWeight: 600, fontSize: 12, color: '#999', marginBottom: 8 }}>METRO LINES</div>
          {[
            { name: 'Red Line', color: '#e74c3c' },
            { name: 'Yellow Line', color: '#f1c40f' },
            { name: 'Blue Line', color: '#3498db' },
            { name: 'Green Line', color: '#27ae60' },
            { name: 'Violet Line', color: '#8e44ad' },
          ].map(l => (
            <div key={l.name} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, fontSize: 12 }}>
              <span style={{ width: 24, height: 4, background: l.color, borderRadius: 2, display: 'inline-block' }} />
              {l.name}
            </div>
          ))}
        </div>
      </div>

      {/* Map */}
      <div style={{ flex: 1, position: 'relative' }}>
        <MetroMap
          stations={stations}
          route={route?.path ?? null}
          allStations={stations}
        />
      </div>
    </div>
  );
}
