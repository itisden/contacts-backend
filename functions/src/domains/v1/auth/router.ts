import { Router } from "express";
import AuthController from "@/domains/v1/auth/controller";
import AuthService from "@/domains/v1/auth/service";
import {
  emaildAndPasswordValidator,
  refreshTokenValidator,
  authorizationValidator,
} from "@/domains/v1/auth/middlewares/validators";
import authApi from "@/domains/v1/auth/api";

// eslint-disable-next-line new-cap
const router = Router();
const authService = new AuthService(authApi);
const authController = new AuthController(authService);

router.post("/signin", emaildAndPasswordValidator, authController.signIn);
router.post("/signup", authController.signUp);
router.post(
  "/refresh-token",
  authorizationValidator,
  refreshTokenValidator,
  authController.refreshToken,
);

export default router;
