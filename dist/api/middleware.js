"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimiter = exports.httpLogger = void 0;
exports.errorHandler = errorHandler;
exports.notFound = notFound;
const morgan_1 = __importDefault(require("morgan"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const logger_1 = __importDefault(require("../utils/logger"));
exports.httpLogger = (0, morgan_1.default)('combined', {
    stream: { write: (msg) => logger_1.default.http(msg.trim()) },
});
exports.rateLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 200,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: { code: 'RATE_LIMIT', message: 'Too many requests, please try again later.' } },
});
function errorHandler(err, _req, res, _next) {
    const statusCode = err.statusCode ?? 500;
    const code = err.code ?? (statusCode === 404 ? 'NOT_FOUND' : 'INTERNAL_ERROR');
    logger_1.default.error('Request error', { message: err.message, code, statusCode });
    res.status(statusCode).json({
        error: { code, message: err.message },
    });
}
function notFound(_req, _res, next) {
    const err = new Error('Route not found');
    err.statusCode = 404;
    next(err);
}
//# sourceMappingURL=middleware.js.map