import { Request, Response, NextFunction } from "express";
import { ApiError } from "@/utils/errors";
import * as logger from "firebase-functions/logger";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(err);

  if (err instanceof ApiError) {
    return res.status(err.statusCode).send({ message: err.message });
  }

  return res.status(500).send({ message: "An unexpected error occurred" });
};

export default errorHandler;
