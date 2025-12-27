import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(form);
      navigate("/projects");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="flex" >
       <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-80 space-y-4">
        <h2 className="text-xl font-bold">Login</h2>

        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        {error && <p className="text-red-500">{error}</p>}

        <button type="submit">Login</button>
      </form>
    </div>
    <button onClick={() => navigate("/signup")}>Sign up</button>
   </div>
 
  );
}
