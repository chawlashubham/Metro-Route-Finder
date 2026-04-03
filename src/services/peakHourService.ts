interface PeakBand {
  startHour: number;
  startMin: number;
  endHour: number;
  endMin: number;
  days: number[];
}

function parsePeakBands(raw: string): PeakBand[] {
  return raw.split(',').map(band => {
    const [start, end] = band.trim().split('-');
    const [sh, sm] = start.split(':').map(Number);
    const [eh, em] = end.split(':').map(Number);
    return { startHour: sh, startMin: sm, endHour: eh, endMin: em, days: [1, 2, 3, 4, 5] };
  });
}

const PEAK_BANDS: PeakBand[] = parsePeakBands(
  process.env.PEAK_HOURS ?? '08:00-10:00,17:30-20:00'
);

export const PEAK_MULTIPLIER = 1.2;

export function isPeakHour(date: Date = new Date()): boolean {
  const day = date.getDay();
  const hour = date.getHours();
  const min = date.getMinutes();
  const totalMin = hour * 60 + min;

  return PEAK_BANDS.some(band => {
    if (!band.days.includes(day)) return false;
    const start = band.startHour * 60 + band.startMin;
    const end = band.endHour * 60 + band.endMin;
    return totalMin >= start && totalMin <= end;
  });
}

export function applyPeakMultiplier(weight: number, line: string, date?: Date): number {
  if (line === 'transfer') return weight;
  if (isPeakHour(date)) return weight * PEAK_MULTIPLIER;
  return weight;
}
