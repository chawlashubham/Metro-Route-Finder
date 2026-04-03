"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PEAK_MULTIPLIER = void 0;
exports.isPeakHour = isPeakHour;
exports.applyPeakMultiplier = applyPeakMultiplier;
function parsePeakBands(raw) {
    return raw.split(',').map(band => {
        const [start, end] = band.trim().split('-');
        const [sh, sm] = start.split(':').map(Number);
        const [eh, em] = end.split(':').map(Number);
        return { startHour: sh, startMin: sm, endHour: eh, endMin: em, days: [1, 2, 3, 4, 5] };
    });
}
const PEAK_BANDS = parsePeakBands(process.env.PEAK_HOURS ?? '08:00-10:00,17:30-20:00');
exports.PEAK_MULTIPLIER = 1.2;
function isPeakHour(date = new Date()) {
    const day = date.getDay();
    const hour = date.getHours();
    const min = date.getMinutes();
    const totalMin = hour * 60 + min;
    return PEAK_BANDS.some(band => {
        if (!band.days.includes(day))
            return false;
        const start = band.startHour * 60 + band.startMin;
        const end = band.endHour * 60 + band.endMin;
        return totalMin >= start && totalMin <= end;
    });
}
function applyPeakMultiplier(weight, line, date) {
    if (line === 'transfer')
        return weight;
    if (isPeakHour(date))
        return weight * exports.PEAK_MULTIPLIER;
    return weight;
}
//# sourceMappingURL=peakHourService.js.map