import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import { errorHandler } from './src/interfaces/middleware/errorHandler';
import { logger } from './src/interfaces/middleware/logger';
import { router } from './src/infrastructure/web/routes';
import { requestLogger } from './src/interfaces/middleware/requestLogger';
import { responseLogger } from './src/interfaces/middleware/responseLogger';
import { authRoutes } from './src/infrastructure/web/authRoutes';
import { authGuard } from './src/interfaces/middleware/authGuard';

function getLocalIp() {
  const os = require('os');
  const interfaces = os.networkInterfaces();
  for (let dev in interfaces) {
    for (let details of interfaces[dev]) {
      if (details.family === 'IPv4' && !details.internal) {
        return details.address;
      }
    }
  }
  return 'localhost';
}

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use(responseLogger);
app.use('/auth', authRoutes);
app.use('/api', authGuard, router);
app.use(errorHandler);

const PORT = 3000;
const HOST = '0.0.0.0';
app.listen(PORT, HOST, () => {
  logger.info(`Server is running on http://${getLocalIp()}:${PORT}`);
});
