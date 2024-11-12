import axios from "axios";
import { firebaseConfig, isDev } from "@/config/env";
import { IAuthApi } from "@/domains/v1/auth/types";

const hostname = {
  identityToolkit: isDev
    ? "http://127.0.0.1:9099/identitytoolkit.googleapis.com"
    : "https://identitytoolkit.googleapis.com",
  secureToken: isDev
    ? "http://127.0.0.1:9099/securetoken.googleapis.com"
    : "https://securetoken.googleapis.com",
};

const authEndpoints = {
  signInWithEmailAndPassword: `${hostname.identityToolkit}/v1/accounts:signInWithPassword?key=${firebaseConfig.apiKey}`,
  signUpWithEmailAndPassword: `${hostname.identityToolkit}/v1/accounts:signUp?key=${firebaseConfig.apiKey}`,
  refreshToken: `${hostname.secureToken}/v1/token?key=${firebaseConfig.apiKey}`,
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
    return axios({
      method: "post",
      url: authEndpoints.signInWithEmailAndPassword,
      data: {
        email,
        password,
        returnSecureToken: true,
      },
    }).then((response) => response.data);
  },
  signUpWithEmailAndPassword: async (
    email: string,
    password: string,
  ): Promise<SignUpWithEmailAndPasswordResponse> => {
    return axios({
      method: "post",
      url: authEndpoints.signUpWithEmailAndPassword,
      data: {
        email,
        password,
        returnSecureToken: true,
      },
    }).then((response) => response.data);
  },
  refreshToken: async (refreshToken: string): Promise<RefreshTokenResponse> => {
    return axios({
      method: "post",
      url: authEndpoints.refreshToken,
      data: {
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      },
    }).then((response) => response.data);
  },
};

export default authApi;
