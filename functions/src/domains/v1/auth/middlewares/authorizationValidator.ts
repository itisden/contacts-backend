import { type Request, type Response, type NextFunction } from "express";
import { auth } from "@/config/firebase";
import { UnauthorizedError } from "@/utils/exeptions";

const authorizationValidator = async (
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

export default authorizationValidator;
