/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from "express";
import { ApiError, ValidationError } from "@/utils/exeptions";
import * as logger from "firebase-functions/logger";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.error(err);

  if (err instanceof ValidationError) {
    return res.status(err.statusCode).send({ errors: err.errors });
  } else if (err instanceof ApiError) {
    return res.status(err.statusCode).send({ message: err.message });
  }

  return res.status(500).send({ message: "An unexpected error occurred" });
};

export default errorHandler;
