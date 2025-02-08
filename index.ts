import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import { errorHandler } from './src/interfaces/middleware/errorHandler';
import { logger } from './src/interfaces/middleware/logger';
import { router } from './src/infrastructure/routes/routes';
import { requestLogger } from './src/interfaces/middleware/requestLogger';
import { responseLogger } from './src/interfaces/middleware/responseLogger';
import { authRoutes } from './src/infrastructure/routes/authRoutes';
import { authGuard } from './src/interfaces/middleware/authGuard';
import multer from 'multer';
import { accessRoutes } from './src/infrastructure/routes/accessRoutes';
import path from 'path';

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

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'src', 'infrastructure', 'views'));

app.use(cors());

app.use(multer().any());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);
app.use(responseLogger);
app.use('/auth', authRoutes);
app.use('/folder/files', accessRoutes);
// app.use('/api', authGuard, router);
app.use('/api', router);
app.use(errorHandler);

const PORT = 3000;
const HOST = '0.0.0.0';
app.listen(PORT, HOST, () => {
  logger.info(`Server is running on http://${getLocalIp()}:${PORT}`);
});
