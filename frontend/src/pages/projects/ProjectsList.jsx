import { useEffect, useState } from "react";
import { getProjects, deleteProject } from "../../api/project.api";
import ProjectCard from "../../components/project/ProjectCard";
import ProjectFormModal from "../../components/project/ProjectFormModal";
import { acceptInvities, getInvites } from "../../api/invite.api";

export default function ProjectsList() {
  const [projects, setProjects] = useState([]);
  const [modalMode, setModalMode] = useState(null); // "create" | "edit"
  const [selectedProject, setSelectedProject] = useState(null);
  const [invites, setInvites] = useState([]);


  useEffect(() => {
    fetchProjects();
    fetchInvites();
  }, []);

  const fetchProjects = async () => {
    const res = await getProjects();
    setProjects(res.data.project || []);
  };

  const openCreate = () => {
    setSelectedProject(null);
    setModalMode("create");
  };

  const fetchInvites = async () => {
  const res = await getInvites(); // implement in api/invite.api.js
  console.log({res});
  setInvites(res.data.invites || []);
};


const acceptInvite = async (inviteId) => {
  await acceptInvities(inviteId);
  fetchInvites();
  fetchProjects(); // user now becomes project member
};

// const rejectInvite = async (inviteId) => {
//   await rejectInviteAPI(inviteId);
//   fetchInvites();
// };

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

      {invites.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Invites</h2>
          <ul className="space-y-2">
            {invites.map((invite) => (
              <li key={invite.id} className="flex justify-between items-center border p-2 rounded">
                <span>{invite.projectName}</span>
                <span className="text-gray-500">{invite.role}</span>
                <button className="btn btn-sm" onClick={() => acceptInvite(invite.id)}>Accept</button>
                {/* <button className="btn btn-sm btn-ghost" onClick={() => rejectInvite(invite.id)}>Reject</button> */}
              </li>
            ))}
          </ul>
        </div>
      )}


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
