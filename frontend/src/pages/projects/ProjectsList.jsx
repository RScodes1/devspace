import { useEffect, useState } from "react";
import { getProjects, deleteProject } from "../../api/project.api";
import ProjectCard from "../../components/project/ProjectCard";
import ProjectFormModal from "../../components/project/ProjectFormModal";

export default function ProjectsList() {
  const [projects, setProjects] = useState([]);
  const [modalMode, setModalMode] = useState(null); // "create" | "edit"
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const res = await getProjects();
    setProjects(res.data.project || []);
  };

  const openCreate = () => {
    setSelectedProject(null);
    setModalMode("create");
  };

  const openEdit = (project) => {
    setSelectedProject(project);
    setModalMode("edit");
  };

  const handleDelete = async (projectId) => {
    if (!Window.confirm("Are you sure you want to delete this project?")) return;
    await deleteProject(projectId);
    fetchProjects();
  };

  return (
    <div className="p-4">
      <button onClick={openCreate} className="btn">
        Create Project
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onEdit={() => openEdit(project)}
            onDelete={() => handleDelete(project.id)}
          />
        ))}
      </div>

      {modalMode && (
        <ProjectFormModal
          mode={modalMode}
          project={selectedProject}
          onClose={() => setModalMode(null)}
          onSuccess={fetchProjects}
        />
      )}
    </div>
  );
}
