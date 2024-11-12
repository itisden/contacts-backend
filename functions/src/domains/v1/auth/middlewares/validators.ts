import { type Request, type Response, type NextFunction } from "express";
import { body, param } from "express-validator";
import validationChecker from "@/middlewares/validationChecker";
import { auth } from "@/config/firebase";
import { UnauthorizedError } from "@/utils/exeptions";

export const validateIdParam = param("id")
  .isString()
  .notEmpty()
  .withMessage("Contact ID is required.");

export const emaildAndPasswordValidator = [
  body("email").isEmail().withMessage("Email must be a valid email address."),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long."),
  validationChecker,
];

export const refreshTokenValidator = [
  body("refreshToken")
    .isString()
    .notEmpty()
    .withMessage("Refresh token is required."),
  validationChecker,
];

export const authorizationValidator = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const idToken = req.headers.authorization?.split("Bearer ")[1];

  if (!idToken) {
    return next(new UnauthorizedError("Authorization token is required."));
  }

  try {
    const decodedToken = await auth.verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    return next(new UnauthorizedError((error as Error).message));
  }
};
