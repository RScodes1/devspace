import { useEffect, useState } from "react";
import { createProject, updateProject } from "../../api/project.api";

export default function ProjectFormModal({
  mode = "create",          // "create" | "edit"
  project = null,           // only for edit
  onClose,
  onSuccess,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  // Prefill when editing
  useEffect(() => {
    if (mode === "edit" && project) {
      setName(project.name || "");
      setDescription(project.description || "");
    }
  }, [mode, project]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (mode === "create") {
      await createProject({ name, description });
    } else {
      await updateProject(project.id, { name, description });
    }

    setLoading(false);
    onSuccess?.();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
      <form className="bg-white p-4 rounded w-96" onSubmit={handleSubmit}>
        <h2 className="font-bold text-lg mb-3">
          {mode === "create" ? "Create Project" : "Edit Project"}
        </h2>

        <input
          placeholder="Project Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full mb-3"
          required
        />

        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full mb-4"
        />

        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="btn">
            Cancel
          </button>
          <button type="submit" className="btn" disabled={loading}>
            {loading
              ? "Saving..."
              : mode === "create"
              ? "Create"
              : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
}
