import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="h-12 flex items-center justify-between px-4 border-b">
      <h1 className="font-bold">DevSpace</h1>

      <div className="flex items-center gap-3">
        <span className="text-sm">{user?.email}</span>
        <button onClick={logout} className="text-sm text-red-500">
          Logout
        </button>
      </div>
    </nav>
  );
}
