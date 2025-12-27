import { useNavigate } from "react-router-dom";

export default function WorkspaceCard({ workspace, projectId }) {
  const navigate = useNavigate();

  return (
    <div
      className="p-4 border rounded hover:shadow cursor-pointer"
      onClick={() => navigate(`/projects/${projectId}/workspaces/${workspace.id}`)}
    >
      <h3 className="font-bold">{workspace.name}</h3>
      <p className="text-sm text-gray-500">{workspace.description}</p>
    </div>
  );
}
