import {
  SignInWithEmailAndPasswordResponse,
  SignUpWithEmailAndPasswordResponse,
  RefreshTokenResponse,
} from "@/domains/v1/auth/api";
import { IAuthApi, IAuthService } from "@/domains/v1/auth/types";

/**
 * AuthService to handle authentication related operations.
 */
class AuthService implements IAuthService {
  private authApi: IAuthApi;

  constructor(authApi: IAuthApi) {
    this.authApi = authApi;
  }
  /**
   * Sign in with email and password.
   *
   * @param {string} email - User's email
   * @param {string} password - User's password
   * @return {Promise<SignInWithEmailAndPasswordResponse>} Promise resolving to SignInWithEmailAndPasswordResponse
   */
  async signIn(
    email: string,
    password: string,
  ): Promise<SignInWithEmailAndPasswordResponse> {
    return this.authApi.signInWithEmailAndPassword(email, password);
  }

  /**
   * Sign up with email and password.
   *
   * @param {string} email - User's email
   * @param {string} password - User's password
   * @return {Promise<SignUpWithEmailAndPasswordResponse>} Promise resolving to SignUpWithEmailAndPasswordResponse
   */
  async signUp(
    email: string,
    password: string,
  ): Promise<SignUpWithEmailAndPasswordResponse> {
    return this.authApi.signUpWithEmailAndPassword(email, password);
  }

  /**
   * Refresh token.
   *
   * @param {string} refreshToken - User's refresh token
   * @return {Promise<RefreshTokenResponse>} Promise resolving to RefreshTokenResponse
   */
  async refreshToken(refreshToken: string): Promise<RefreshTokenResponse> {
    return this.authApi.refreshToken(refreshToken);
  }
}

export default AuthService;
