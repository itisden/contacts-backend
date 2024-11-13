import axios, { isAxiosError } from "axios";
import { firebaseConfig } from "@/config/env";
import { IAuthApi } from "@/domains/v1/auth/types";
import { ApiError } from "@/utils/exeptions";

const authEndpoints = {
  signInWithEmailAndPassword: `${firebaseConfig.identityToolkitOrigin}/v1/accounts:signInWithPassword?key=${firebaseConfig.apiKey}`,
  signUpWithEmailAndPassword: `${firebaseConfig.identityToolkitOrigin}/v1/accounts:signUp?key=${firebaseConfig.apiKey}`,
  refreshToken: `${firebaseConfig.secureTokenOrigin}/v1/token?key=${firebaseConfig.apiKey}`,
};

/**
 * Auth API response for Firebase sign in with email and password.
 *
 * @see {@link https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password}
 */

export interface SignInWithEmailAndPasswordResponse {
  registered: boolean;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

/**
 * Auth API response for Firebase sign up with email and password.
 *
 * @see {@link https://firebase.google.com/docs/reference/rest/auth/#section-create-email-password}
 */

export interface SignUpWithEmailAndPasswordResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

/**
 * Auth API response for Firebase exchange refresh token.
 *
 * @see {@link https://firebase.google.com/docs/reference/rest/auth/#section-refresh-token}
 */

export interface GoogleApiErrorResponse {
  error: {
    message: string;
    code: number;
    errors: Array<{
      message: string;
      domain: string;
      reason: string;
    }>;
    status: string;
  };
}

const transformGoogleApiError = (error: unknown) => {
  if (isAxiosError(error)) {
    const identityError = (error.response?.data as GoogleApiErrorResponse)
      ?.error;
    if (identityError) {
      throw new ApiError(identityError.message, identityError.code);
    }
  }
  throw error;
};

export interface RefreshTokenResponse {
  expires_in: string;
  token_type: string;
  refresh_token: string;
  id_token: string;
  user_id: string;
  project_id: string;
}

const authApi: IAuthApi = {
  signInWithEmailAndPassword: async (
    email: string,
    password: string,
  ): Promise<SignInWithEmailAndPasswordResponse> => {
    return axios<SignInWithEmailAndPasswordResponse>({
      method: "post",
      url: authEndpoints.signInWithEmailAndPassword,
      data: {
        email,
        password,
        returnSecureToken: true,
      },
    })
      .then((response) => response.data)
      .catch(transformGoogleApiError);
  },
  signUpWithEmailAndPassword: async (
    email: string,
    password: string,
  ): Promise<SignUpWithEmailAndPasswordResponse> => {
    debugger;
    return axios<SignUpWithEmailAndPasswordResponse>({
      method: "post",
      url: authEndpoints.signUpWithEmailAndPassword,
      data: {
        email,
        password,
        returnSecureToken: true,
      },
    })
      .then((response) => response.data)
      .catch(transformGoogleApiError);
  },
  refreshToken: async (refreshToken: string): Promise<RefreshTokenResponse> => {
    return axios<RefreshTokenResponse>({
      method: "post",
      url: authEndpoints.refreshToken,
      data: {
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      },
    })
      .then((response) => response.data)
      .catch(transformGoogleApiError);
  },
};

export default authApi;
