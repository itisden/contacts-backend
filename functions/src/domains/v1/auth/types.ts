import {
  SignInWithEmailAndPasswordResponse,
  SignUpWithEmailAndPasswordResponse,
  RefreshTokenResponse,
} from "@/domains/v1/auth/api";

/**
 * Interface defining authentication related operations.
 */
export interface IAuthService {
  /**
   * Sign in with email and password.
   *
   * @param {string} email - User's email
   * @param {string} password - User's password
   * @return {Promise<SignInWithEmailAndPasswordResponse>} Promise resolving to SignInWithEmailAndPasswordResponse
   */
  signIn(
    email: string,
    password: string,
  ): Promise<SignInWithEmailAndPasswordResponse>;

  /**
   * Sign up with email and password.
   *
   * @param {string} email - User's email
   * @param {string} password - User's password
   * @return {Promise<SignUpWithEmailAndPasswordResponse>} Promise resolving to SignUpWithEmailAndPasswordResponse
   */
  signUp(
    email: string,
    password: string,
  ): Promise<SignUpWithEmailAndPasswordResponse>;

  /**
   * Refresh token.
   *
   * @param {string} refreshToken - User's refresh token
   * @return {Promise<RefreshTokenResponse>} Promise resolving to RefreshTokenResponse
   */
  refreshToken(refreshToken: string): Promise<RefreshTokenResponse>;
}

export interface IAuthApi {
  signInWithEmailAndPassword(
    email: string,
    password: string,
  ): Promise<SignInWithEmailAndPasswordResponse>;

  signUpWithEmailAndPassword(
    email: string,
    password: string,
  ): Promise<SignUpWithEmailAndPasswordResponse>;

  refreshToken(refreshToken: string): Promise<RefreshTokenResponse>;
}
