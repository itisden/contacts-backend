import { describe, it, expect, afterEach, afterAll, beforeAll } from "vitest";
import request from "supertest";
import admin from "firebase-admin";
import firebaseFunctionsTest from "firebase-functions-test";
import { app } from "../src/index";

const test = firebaseFunctionsTest({
  projectId: process.env.GCLOUD_PROJECT,
});

afterAll(async () => {
  test.cleanup();
  await admin.app().delete();
});

describe("Auth API Endpoints", () => {
  afterEach(async () => {
    // Clean up users in auth emulator
    try {
      const users = await admin.auth().listUsers();
      const deletePromises = users.users.map((user) =>
        admin.auth().deleteUser(user.uid),
      );
      await Promise.all(deletePromises);
    } catch (error) {
      console.error("Error cleaning up:", error);
    }
  });

  it("should create a new user", async () => {
    const response = await request(app).post("/api/v1/auth/signup").send({
      email: "test@example.com",
      password: "password123",
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("idToken");
    expect(response.body).toHaveProperty("refreshToken");
  });

  it("should not allow duplicate email registration", async () => {
    // First registration
    await request(app).post("/api/v1/auth/signup").send({
      email: "test@example.com",
      password: "password123",
    });

    // Duplicate registration attempt
    const response = await request(app).post("/api/v1/auth/signup").send({
      email: "test@example.com",
      password: "password123",
    });
    expect(response.status).toBe(400);
  });

  it("should login existing user", async () => {
    // Create user first
    await request(app).post("/api/v1/auth/signup").send({
      email: "test@example.com",
      password: "password123",
    });

    // Login attempt
    const response = await request(app).post("/api/v1/auth/signin").send({
      email: "test@example.com",
      password: "password123",
    });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("idToken");
    expect(response.body).toHaveProperty("refreshToken");
  });

  it("should reject invalid credentials", async () => {
    const response = await request(app).post("/api/v1/auth/signin").send({
      email: "nonexistent@example.com",
      password: "wrongpassword",
    });
    expect(response.status).toBe(400);
  });

  it("should return 400 if password is less than 6 characters", async () => {
    const response = await request(app).post("/api/v1/auth/signup").send({
      email: "shortpassword@example.com",
      password: "123",
    });
    expect(response.status).toBe(400);
  });

  it("should refresh token if user sends request to refresh token", async () => {
    // Create user first
    const signupResponse = await request(app).post("/api/v1/auth/signup").send({
      email: "test@example.com",
      password: "password123",
    });

    // Refresh token attempt
    const response = await request(app)
      .post("/api/v1/auth/refresh-token")
      .send({
        refreshToken: signupResponse.body.refreshToken,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id_token");
    expect(response.body).toHaveProperty("refresh_token");
  });
});

describe("Contacts API Endpoints", () => {
  let user;

  beforeAll(async () => {
    // Sign up and sign in user
    await request(app).post("/api/v1/auth/signup").send({
      email: "test-contact-api@example.com",
      password: "password123",
    });

    const response = await request(app).post("/api/v1/auth/signin").send({
      email: "test-contact-api@example.com",
      password: "password123",
    });

    user = response.body;
  });

  afterEach(async () => {
    test.firestore.clearFirestoreData({ projectId: process.env.PROJECT_ID });
  });

  afterAll(async () => {
    // Clean up users in auth emulator
    try {
      const users = await admin.auth().listUsers();
      const deletePromises = users.users.map((user) =>
        admin.auth().deleteUser(user.uid),
      );
      await Promise.all(deletePromises);
    } catch (error) {
      console.error("Error cleaning up:", error);
    }
  });

  afterAll(async () => {
    test.cleanup();
    // await admin.app().delete();
  });

  it("should create a new contact", async () => {
    const response = await request(app)
      .post("/api/v1/contacts")
      .set("Authorization", `Bearer ${user.idToken}`)
      .send({
        username: "john.doe",
        fullName: "John Doe",
        email: "john.doe@example.com",
        phoneNumber: "1234567890",
      });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      id: expect.any(String),
      ownerId: user.localId,
      username: "john.doe",
      fullName: "John Doe",
      email: "john.doe@example.com",
      phoneNumber: "1234567890",
    });
  });

  it("should get all contacts", async () => {
    // Create a contact first
    await request(app)
      .post("/api/v1/contacts")
      .set("Authorization", `Bearer ${user.idToken}`)
      .send({
        username: "john.doe",
        fullName: "John Doe",
        email: "john.doe@example.com",
        phoneNumber: "1234567890",
      });

    const response = await request(app)
      .get("/api/v1/contacts")
      .set("Authorization", `Bearer ${user.idToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("should get a contact by ID", async () => {
    // Create a contact first
    const createResponse = await request(app)
      .post("/api/v1/contacts")
      .set("Authorization", `Bearer ${user.idToken}`)
      .send({
        username: "john.doe",
        fullName: "John Doe",
        email: "john.doe@example.com",
        phoneNumber: "1234567890",
      });

    const contactId = createResponse.body.id;

    const response = await request(app)
      .get(`/api/v1/contacts/${contactId}`)
      .set("Authorization", `Bearer ${user.idToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: expect.any(String),
      ownerId: user.localId,
      username: "john.doe",
      fullName: "John Doe",
      email: "john.doe@example.com",
      phoneNumber: "1234567890",
    });
  });

  it("should update a contact by ID", async () => {
    // Create a contact first
    const createResponse = await request(app)
      .post("/api/v1/contacts")
      .set("Authorization", `Bearer ${user.idToken}`)
      .send({
        username: "john.doe",
        fullName: "John Doe",
        email: "john.doe@example.com",
        phoneNumber: "1234567890",
      });

    const contactId = createResponse.body.id;

    const response = await request(app)
      .put(`/api/v1/contacts/${contactId}`)
      .set("Authorization", `Bearer ${user.idToken}`)
      .send({
        fullName: "Jane Doe",
        username: "jane.doe",
        email: "jane.doe@example.com",
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", contactId);
    expect(response.body).toEqual({
      id: contactId,
      ownerId: user.localId,
      fullName: "Jane Doe",
      username: "jane.doe",
      email: "jane.doe@example.com",
      phoneNumber: "1234567890",
    });
  });

  it("should delete a contact by ID", async () => {
    // Create a contact first
    const createResponse = await request(app)
      .post("/api/v1/contacts")
      .set("Authorization", `Bearer ${user.idToken}`)
      .send({
        username: "john.doe",
        fullName: "John Doe",
        email: "john.doe@example.com",
        phoneNumber: "1234567890",
      });

    const contactId = createResponse.body.id;

    const response = await request(app)
      .delete(`/api/v1/contacts/${contactId}`)
      .set("Authorization", `Bearer ${user.idToken}`);

    expect(response.status).toBe(204);
  });

  it("should not allow a user to access another user's contacts", async () => {
    // Sign up and sign in another user
    await request(app).post("/api/v1/auth/signup").send({
      email: "another-user@example.com",
      password: "password123",
    });

    const anotherUserResponse = await request(app)
      .post("/api/v1/auth/signin")
      .send({
        email: "another-user@example.com",
        password: "password123",
      });

    const anotherUser = anotherUserResponse.body;

    // User 1 creates a contact
    const user1ContactResponse = await request(app)
      .post("/api/v1/contacts")
      .set("Authorization", `Bearer ${user.idToken}`)
      .send({
        username: "john.doe",
        fullName: "John Doe",
        email: "john.doe@example.com",
        phoneNumber: "1234567890",
      });

    const user1ContactId = user1ContactResponse.body.id;

    // User 2 creates a contact
    const user2ContactResponse = await request(app)
      .post("/api/v1/contacts")
      .set("Authorization", `Bearer ${anotherUser.idToken}`)
      .send({
        username: "jane.doe",
        fullName: "Jane Doe",
        email: "jane.doe@example.com",
        phoneNumber: "0987654321",
      });

    const user2ContactId = user2ContactResponse.body.id;

    // User 1 tries to access User 2's contact
    const response = await request(app)
      .get(`/api/v1/contacts/${user2ContactId}`)
      .set("Authorization", `Bearer ${user.idToken}`);

    expect(response.status).toBe(404); // Forbidden

    // User 2 tries to access User 1's contact
    const response2 = await request(app)
      .get(`/api/v1/contacts/${user1ContactId}`)
      .set("Authorization", `Bearer ${anotherUser.idToken}`);

    expect(response2.status).toBe(404); // Forbidden
  });
});
