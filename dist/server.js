"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./api/routes"));
const middleware_1 = require("./api/middleware");
const logger_1 = __importDefault(require("./utils/logger"));
const loader_1 = require("./graph/loader");
const app = (0, express_1.default)();
exports.app = app;
const PORT = parseInt(process.env.PORT ?? '3000', 10);
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(middleware_1.httpLogger);
app.use(middleware_1.rateLimiter);
app.get('/health', (_req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));
app.use('/api/v1', routes_1.default);
app.use(middleware_1.notFound);
app.use(middleware_1.errorHandler);
if (require.main === module) {
    (0, loader_1.getGraph)();
    app.listen(PORT, () => {
        logger_1.default.info(`Metro Route Finder API running`, { port: PORT, env: process.env.NODE_ENV });
    });
}
//# sourceMappingURL=server.js.map