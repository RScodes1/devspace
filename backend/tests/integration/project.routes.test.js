const request = require("supertest");
const app = require("../../src/app");

describe("Project Routes Integration", () => {
  let token;
  let projectId;

  beforeAll(async () => {
    const email = `proj${Date.now()}@mail.com`;
    const password = "password123";

    await request(app).post("/api/auth/signup").send({
      name: "Project User",
      email,
      password,
    });

    const login = await request(app)
      .post("/api/auth/login")
      .send({ email, password });

    token = login.body.token;
  });

  test("POST /api/projects creates project", async () => {
    const res = await request(app)
      .post("/api/projects")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Test Project" });

    expect(res.statusCode).toBe(201);
    expect(res.body.data).toHaveProperty("id");

    projectId = res.body.data.id;
  });

  test("GET /api/projects returns projects", async () => {
    const res = await request(app)
      .get("/api/projects")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  test("PUT /api/projects/:id updates project", async () => {
    const res = await request(app)
      .put(`/api/projects/${projectId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Updated Project" });

    expect(res.statusCode).toBe(200);
  });
});
