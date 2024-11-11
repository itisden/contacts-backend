import { defineString } from "firebase-functions/params";

export const firebaseConfig = {
  apiKey: defineString("API_KEY_FIREBASE").name,
};

export const isDev = process.env.NODE_ENV === "development";
export const isProd = !isDev;
