import { Request, Response, NextFunction } from "express";
import * as logger from "firebase-functions/logger";

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const method = req.method;
  const url = req.url;
  const timestamp = new Date().toISOString();

  logger.info(`[${timestamp}] ${method} ${url}`);

  next();
};

export default requestLogger;
