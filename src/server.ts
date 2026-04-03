import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import apiRouter from './api/routes';
import { httpLogger, rateLimiter, errorHandler, notFound } from './api/middleware';
import logger from './utils/logger';
import { getGraph } from './graph/loader';

const app = express();
const PORT = parseInt(process.env.PORT ?? '3000', 10);

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(httpLogger);
app.use(rateLimiter);

app.get('/health', (_req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

app.use('/api/v1', apiRouter);

app.use(notFound);
app.use(errorHandler);

export { app };

if (require.main === module) {
  getGraph();
  app.listen(PORT, () => {
    logger.info(`Metro Route Finder API running`, { port: PORT, env: process.env.NODE_ENV });
  });
}
