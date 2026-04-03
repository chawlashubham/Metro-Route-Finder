import { Request, Response, NextFunction } from 'express';
export declare const httpLogger: (req: import("http").IncomingMessage, res: import("http").ServerResponse<import("http").IncomingMessage>, callback: (err?: Error) => void) => void;
export declare const rateLimiter: import("express-rate-limit").RateLimitRequestHandler;
export interface AppError extends Error {
    statusCode?: number;
    code?: string;
}
export declare function errorHandler(err: AppError, _req: Request, res: Response, _next: NextFunction): void;
export declare function notFound(_req: Request, _res: Response, next: NextFunction): void;
//# sourceMappingURL=middleware.d.ts.map