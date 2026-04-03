import { calculateFare, haversineDistance } from '../src/services/fareService';

describe('calculateFare', () => {
  it('charges ₹10 for ≤2km', () => expect(calculateFare(1.5)).toBe(10));
  it('charges ₹20 for 2–5km', () => expect(calculateFare(3)).toBe(20));
  it('charges ₹30 for 5–12km', () => expect(calculateFare(8)).toBe(30));
  it('charges ₹40 for 12–21km', () => expect(calculateFare(15)).toBe(40));
  it('charges ₹50 for 21–32km', () => expect(calculateFare(25)).toBe(50));
  it('charges ₹60 for >32km', () => expect(calculateFare(40)).toBe(60));
  it('charges ₹10 for 0km (same station)', () => expect(calculateFare(0)).toBe(10));
});

describe('haversineDistance', () => {
  it('returns ~0 for same point', () => {
    expect(haversineDistance(28.63, 77.22, 28.63, 77.22)).toBeCloseTo(0, 5);
  });

  it('returns positive distance for different points', () => {
    const d = haversineDistance(28.7260, 77.1079, 28.4595, 77.0266);
    expect(d).toBeGreaterThan(30);
    expect(d).toBeLessThan(50);
  });
});
