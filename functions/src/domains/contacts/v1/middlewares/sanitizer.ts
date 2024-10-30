import { Request, Response, NextFunction } from "express";
import { pick } from "lodash";
import { ContactWithoutId } from "@/domains/contacts/v1/types";

export const sanitizeContactPayload = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const contact: Partial<ContactWithoutId> = req.body;
  const contactFields = ["username", "fullName", "phoneNumber", "email"];
  req.body = pick(contact, contactFields);
  next();
};
