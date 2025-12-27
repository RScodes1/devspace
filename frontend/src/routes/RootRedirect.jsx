// src/routes/RootRedirect.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function RootRedirect() {
  const { user, loading } = useAuth();

  if (loading) return null; // or loader

  return user
    ? <Navigate to="/projects" replace />
    : <Navigate to="/login" replace />;
}
