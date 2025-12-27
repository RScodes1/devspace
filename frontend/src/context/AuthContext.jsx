import { createContext, useContext, useEffect, useState } from "react";
import { loginApi, signupApi } from "../api/auth.api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from token on refresh
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (data) => {
    const res = await loginApi(data);
    const { token, refreshToken: rToken,  user } = res.data;

    localStorage.setItem("accessToken", token);
    localStorage.setItem("refreshToken", rToken);
    localStorage.setItem("user", JSON.stringify(user));

    setUser(user);
  };

  const signup = async (data) => {
    const res = await signupApi(data);
    console.log(res);
    return res;
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, signup, logout, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
