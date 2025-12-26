const request = require("supertest");
const app = require("../../src/app");

describe("Auth Routes Integration Tests", () => {
  test("POST /api/auth/signup should create a user", async () => {
    const response = await request(app)
      .post("/api/auth/signup")
      .send({
        name: "Integration User",
        email: `integration${Date.now()}@mail.com`,
        password: "password123",
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.user).toHaveProperty("id");
    expect(response.body.user.name).toBe("Integration User");
  });

  test("POST /api/auth/login should return JWT token", async () => {
    const email = `integrationlogin${Date.now()}@mail.com`;
    const password = "password123";

    await request(app)
      .post("/api/auth/signup")
      .send({ name: "Login User", email, password });

    const response = await request(app)
      .post("/api/auth/login")
      .send({ email, password });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(response.body).toHaveProperty("refreshToken");
  });
});
