import { body, param } from "express-validator";
import validationChecker from "@/middlewares/validationChecker";

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
