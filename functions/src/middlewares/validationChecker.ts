import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { ValidationError } from "@/utils/exeptions";

const validationChecker = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ValidationError(errors.array());
  }
  next();
};

export default validationChecker;
