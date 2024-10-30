export class ApiError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string = "Resource not found") {
    super(message, 404);
  }
}

export class ValidationError extends ApiError {
  constructor(message: string = "Invalid data provided") {
    super(message, 400);
  }
}

export class BadRequestError extends ApiError {
  constructor(message: string = "Bad request") {
    super(message, 400);
  }
}
