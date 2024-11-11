import { ValidationError as ExpressValidationError } from "express-validator";

export class ApiError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class NotFoundError extends ApiError {
  constructor(message = "Resource not found") {
    super(message, 404);
  }
}

export class ValidationError extends ApiError {
  public errors: ExpressValidationError[];

  constructor(
    errors: ExpressValidationError[],
    message = "Invalid data provided",
  ) {
    super(message, 400);
    this.errors = errors;
  }
}

export class BadRequestError extends ApiError {
  constructor(message = "Bad request") {
    super(message, 400);
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message = "Unauthorized") {
    super(message, 401);
  }
}
