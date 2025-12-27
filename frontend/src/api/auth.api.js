import api from "../utils/axios";

export const signupApi = (data) =>
  api.post("/auth/signup", data);

export const loginApi = (data) =>
  api.post("/auth/login", data);

export const refreshTokenApi = () =>
  api.post("/auth/refresh");

export const getUsers = () => 
  api.get("/auth/users")