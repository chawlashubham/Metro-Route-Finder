import { useState, useRef, useEffect } from 'react';
import type { Station } from '../types';
import { LINE_COLORS } from '../constants';

interface Props {
  label: string;
  stations: Station[];
  value: Station | null;
  onChange: (station: Station | null) => void;
}

export default function StationSearch({ label, stations, value, onChange }: Props) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const filtered = stations.filter(s =>
    s.name.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 10);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  useEffect(() => {
    if (value) setQuery(value.name);
  }, [value]);

  return (
    <div ref={ref} style={{ position: 'relative', marginBottom: 12 }}>
      <label style={{ display: 'block', fontWeight: 600, marginBottom: 4, fontSize: 13 }}>
        {label}
      </label>
      <input
        type="text"
        value={query}
        placeholder="Search station..."
        onChange={e => { setQuery(e.target.value); setOpen(true); onChange(null); }}
        onFocus={() => setOpen(true)}
        style={{
          width: '100%', padding: '8px 12px', border: '1px solid #ddd',
          borderRadius: 6, fontSize: 14, boxSizing: 'border-box',
          outline: 'none',
        }}
      />
      {open && filtered.length > 0 && (
        <ul style={{
          position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 1000,
          background: 'white', border: '1px solid #ddd', borderRadius: 6,
          listStyle: 'none', margin: 0, padding: 0, maxHeight: 240, overflowY: 'auto',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        }}>
          {filtered.map(s => (
            <li
              key={s.id}
              onClick={() => { onChange(s); setQuery(s.name); setOpen(false); }}
              style={{
                padding: '8px 12px', cursor: 'pointer', display: 'flex',
                alignItems: 'center', gap: 8, fontSize: 14,
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#f5f5f5')}
              onMouseLeave={e => (e.currentTarget.style.background = 'white')}
            >
              <span style={{
                display: 'inline-block', width: 10, height: 10, borderRadius: '50%',
                background: LINE_COLORS[s.line] ?? '#ccc', flexShrink: 0,
              }} />
              <span>{s.name}</span>
              <span style={{ color: '#999', fontSize: 12, marginLeft: 'auto' }}>{s.line}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
