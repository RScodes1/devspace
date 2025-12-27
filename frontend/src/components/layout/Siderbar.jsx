import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-56 border-r h-full p-3">
      <nav className="space-y-2">
        <Link to="/projects" className="block hover:underline">
          Projects
        </Link>
      </nav>
    </aside>
  );
}
