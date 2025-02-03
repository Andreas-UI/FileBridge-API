import { Request, Response, NextFunction } from 'express';
import { logger } from './logger';

export const responseLogger = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.on('finish', () => {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      logger.info(
        `Success Response: ${res.statusCode} - ${req.method} ${req.url}`,
      );
    }

    if (res.statusCode >= 400) {
      logger.error(
        `Error Response: ${res.statusCode} - ${req.method} ${req.url}`,
      );
    }
  });

  next();
};
