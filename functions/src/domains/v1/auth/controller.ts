import { Request, Response, NextFunction } from "express";
import AuthService from "@/domains/v1/auth/service";

class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;

    this.signIn = this.signIn.bind(this);
    this.signUp = this.signUp.bind(this);
    this.refreshToken = this.refreshToken.bind(this);
  }

  async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const response = await this.authService.signIn(email, password);
      res.json(response);
    } catch (e) {
      next(e);
    }
  }

  async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const response = await this.authService.signUp(email, password);
      res.status(201).json(response);
    } catch (e) {
      next(e);
    }
  }

  async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.body;
      const response = await this.authService.refreshToken(refreshToken);
      res.json(response);
    } catch (e) {
      next(e);
    }
  }
}

export default AuthController;
