import { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import logger from '../utils/logger';

export const httpLogger = morgan('combined', {
  stream: { write: (msg) => logger.http(msg.trim()) },
});

export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: { code: 'RATE_LIMIT', message: 'Too many requests, please try again later.' } },
});

export interface AppError extends Error {
  statusCode?: number;
  code?: string;
}

// Express error handlers must declare 4 parameters to be recognised as such
export function errorHandler(
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  const statusCode = err.statusCode ?? 500;
  const code = err.code ?? (statusCode === 404 ? 'NOT_FOUND' : 'INTERNAL_ERROR');
  logger.error('Request error', { message: err.message, code, statusCode });
  res.status(statusCode).json({
    error: { code, message: err.message },
  });
}

export function notFound(_req: Request, _res: Response, next: NextFunction): void {
  const err: AppError = new Error('Route not found');
  err.statusCode = 404;
  next(err);
}
