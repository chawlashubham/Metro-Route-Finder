"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateFare = calculateFare;
exports.haversineDistance = haversineDistance;
const FARE_SLABS = [
    { maxKm: 2, fare: 10 },
    { maxKm: 5, fare: 20 },
    { maxKm: 12, fare: 30 },
    { maxKm: 21, fare: 40 },
    { maxKm: 32, fare: 50 },
    { maxKm: Infinity, fare: 60 },
];
function calculateFare(distanceKm) {
    for (const slab of FARE_SLABS) {
        if (distanceKm <= slab.maxKm) {
            return slab.fare;
        }
    }
    return 60;
}
function haversineDistance(lat1, lng1, lat2, lng2) {
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a = Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
function toRad(deg) {
    return (deg * Math.PI) / 180;
}
//# sourceMappingURL=fareService.js.map