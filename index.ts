import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import { errorHandler } from './src/interfaces/middleware/errorHandler';
import { logger } from './src/interfaces/middleware/logger';
import { router } from './src/infrastructure/web/routes';
import { requestLogger } from './src/interfaces/middleware/requestLogger';
import { responseLogger } from './src/interfaces/middleware/responseLogger';

const app = express();

app.use(express.json());
app.use(requestLogger);
app.use(responseLogger);
app.use('/api', router);
app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
