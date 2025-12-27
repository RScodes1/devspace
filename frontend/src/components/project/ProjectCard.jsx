import { useNavigate } from "react-router-dom";

export default function ProjectCard({ project, onEdit, onDelete }) {
  const navigate = useNavigate();

  const goToProject = () => {
    navigate(`/projects/${project.id}`);
  };

  return (
    <div
      onClick={goToProject}
      className="border p-4 rounded cursor-pointer hover:shadow"
    >
      <h3 className="font-semibold">{project.name}</h3>
      <p className="text-sm text-gray-600">{project.description}</p>

      {/* Actions */}
      <div className="flex gap-2 mt-3">
        <button
          onClick={(e) => {
            e.stopPropagation(); // 👈 VERY IMPORTANT
            onEdit();
          }}
          className="btn-sm"
        >
          Edit
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation(); // 👈 VERY IMPORTANT
            onDelete();
          }}
          className="btn-sm text-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
