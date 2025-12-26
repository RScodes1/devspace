const { signupService, loginService } = require("../../src/services/user.service");

describe("User Service Unit Tests", () => {
  test("signupService creates a new user", async () => {
    const user = await signupService({
      name: "Test User",
      email: `test${Date.now()}@mail.com`,
      password: "password123",
    });
    expect(user).toHaveProperty("id");
    expect(user.name).toBe("Test User");
  });

  test("loginService returns token for valid credentials", async () => {
    const email = `login${Date.now()}@mail.com`;
    const password = "password123";

    await signupService({ name: "Login Test", email, password });
    const login = await loginService({ email, password });

    expect(login).toHaveProperty("token");
    expect(login).toHaveProperty("refreshToken");
    expect(login.user.email).toBe(email);
  });
});
