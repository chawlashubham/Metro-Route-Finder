"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCrowdLevel = getCrowdLevel;
exports.setCrowdLevel = setCrowdLevel;
exports.getEdgeCrowdWeight = getEdgeCrowdWeight;
const logger_1 = __importDefault(require("../utils/logger"));
const CROWD_DATA_TTL_MS = parseInt(process.env.CROWD_DATA_TTL ?? '60') * 1000;
const crowdStore = new Map();
const SIMULATED_CROWD = {
    'yellow-rajiv-chowk': 0.95,
    'blue-rajiv-chowk': 0.95,
    'yellow-kashmere-gate': 0.8,
    'red-kashmere-gate': 0.8,
    'blue-karol-bagh': 0.75,
    'yellow-aiims': 0.7,
    'violet-lajpat-nagar': 0.65,
    'blue-yamuna-bank': 0.6,
};
function getCrowdLevel(stationId) {
    const entry = crowdStore.get(stationId);
    if (entry && Date.now() - entry.updatedAt.getTime() < CROWD_DATA_TTL_MS) {
        return entry.level;
    }
    return SIMULATED_CROWD[stationId] ?? 0.2;
}
function setCrowdLevel(stationId, level) {
    if (level < 0 || level > 1) {
        throw new Error('Crowd level must be between 0 and 1');
    }
    crowdStore.set(stationId, { level, updatedAt: new Date() });
    logger_1.default.info('Crowd level updated', { stationId, level });
}
function getEdgeCrowdWeight(fromId, toId, baseWeight, alpha) {
    const crowd = Math.max(getCrowdLevel(fromId), getCrowdLevel(toId));
    return baseWeight * (1 + alpha * crowd);
}
//# sourceMappingURL=crowdService.js.map