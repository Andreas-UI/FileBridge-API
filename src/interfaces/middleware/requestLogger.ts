import { Request, Response, NextFunction } from "express";
import { logger } from "./logger";

// Request logger middleware
export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  logger.info(`Incoming request: ${req.method} ${req.url}`);
  next();
};
