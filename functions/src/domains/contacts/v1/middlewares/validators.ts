import { validationResult, body, param } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { ValidationError } from "@/utils/errors";

export const validateCreateUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ValidationError(errors.array());
  }
  next();
};

// Validation length constraints
const usernameLength = { min: 3, max: 20 };
const fullnameLength = { min: 3, max: 50 };
const phoneLength = { min: 8, max: 11 };

export const validateIdParam = param("id")
  .isString()
  .notEmpty()
  .withMessage("Contact ID is required.");

export const createContactValidator = [
  body("username")
    .isString()
    .bail()
    .isLength(usernameLength)
    .withMessage(
      "Username is required and must be between 3 and 20 characters.",
    )
    .escape(),
  body("fullName")
    .isString()
    .bail()
    .isLength(fullnameLength)
    .withMessage(
      "Fullname is required and must be between 3 and 50 characters.",
    )
    .escape(),
  body("phoneNumber")
    .isString()
    .bail()
    .isLength(phoneLength)
    .withMessage("Phone must be a valid number between 8 and 11 digits."),
  body("email").isEmail().withMessage("Email must be a valid email address."),
  validateCreateUser,
];

export const updateContactValidator = [
  validateIdParam,
  body("username")
    .optional()
    .isString()
    .bail()
    .isLength(usernameLength)
    .escape()
    .withMessage("Username must be a string and between 3 and 20 characters."),
  body("fullName")
    .optional()
    .isString()
    .bail()
    .isLength(fullnameLength)
    .escape()
    .withMessage("Fullname must be a string and between 3 and 50 characters."),
  body("phoneNumber")
    .optional()
    .isString()
    .bail()
    .isLength(phoneLength)
    .withMessage("Phone must be a valid number between 8 and 11 digits."),
  body("email")
    .optional()
    .isEmail()
    .withMessage("Email must be a valid email address."),
  validateCreateUser,
];
