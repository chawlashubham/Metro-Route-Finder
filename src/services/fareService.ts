interface FareSlab {
  maxKm: number;
  fare: number;
}

const FARE_SLABS: FareSlab[] = [
  { maxKm: 2, fare: 10 },
  { maxKm: 5, fare: 20 },
  { maxKm: 12, fare: 30 },
  { maxKm: 21, fare: 40 },
  { maxKm: 32, fare: 50 },
  { maxKm: Infinity, fare: 60 },
];

export function calculateFare(distanceKm: number): number {
  for (const slab of FARE_SLABS) {
    if (distanceKm <= slab.maxKm) {
      return slab.fare;
    }
  }
  return 60;
}

export function haversineDistance(
  lat1: number, lng1: number,
  lat2: number, lng2: number
): number {
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function toRad(deg: number): number {
  return (deg * Math.PI) / 180;
}
