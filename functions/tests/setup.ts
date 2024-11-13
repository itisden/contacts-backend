import { afterAll } from "vitest";
import admin from "firebase-admin";

afterAll(async () => {
  // Clean up Firebase Admin
  await Promise.all(admin.apps.map((app) => app?.delete()));
});
