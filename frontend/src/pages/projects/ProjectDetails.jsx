import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getProject,
  getProjectMembers,
  updateMemberRole,
} from "../../api/project.api";
import { getWorkspaces } from "../../api/workspace.api";
import WorkspaceCard from "../../components/workspace/WorkspaceCard";
import CreateWorkspaceModal from "../../components/workspace/CreateWorkspaceModal";
import { inviteCollaborator, getInvites } from "../../api/invite.api";

export default function ProjectDetails() {
  const { projectId } = useParams();

  const [project, setProject] = useState(null);
  const [workspaces, setWorkspaces] = useState([]);
  const [members, setMembers] = useState([]);
  const [pendingInvites, setPendingInvites] = useState([]);


  const [showWorkspaceModal, setShowWorkspaceModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("Collaborator");

  useEffect(() => {
    fetchProject();
    fetchWorkspaces();
    fetchMembers();
    fetchInvites();

  }, [projectId]);

  const fetchProject = async () => {
    const res = await getProject(projectId);
    setProject(res.data.project);
  };

  const fetchWorkspaces = async () => {
    const res = await getWorkspaces(projectId);
    setWorkspaces(res.data.workspaces || []);
  };

  const fetchMembers = async () => {
    const res = await getProjectMembers(projectId);
    setMembers(res.data.data || []);
  };

  const fetchInvites = async () => {
  const res = await getInvites(projectId);
  console.log({res});
  setPendingInvites(res.data.invites || []);
};


  const handleInvite = async () => {
    if (!inviteEmail) return;
    await inviteCollaborator(inviteEmail, inviteRole , projectId);
    setInviteEmail("");
    fetchMembers();
  };

  const handleRoleChange = async (userId, role) => {
    await updateMemberRole(projectId, userId, role);
    fetchMembers();
  };

  if (!project) return null;

  return (
    <div className="p-4 space-y-6">
      {/* Project Info */}
      <div>
        <h2 className="text-2xl font-bold">{project.name}</h2>
        <p className="text-gray-600">{project.description}</p>
      </div>

      {/* Workspace Management */}
      {["Owner", "Collaborator"].includes(project.user_role) && (
        <button
          onClick={() => setShowWorkspaceModal(true)}
          className="btn"
        >
          Add Workspace
        </button>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {workspaces.map((ws) => (
          <WorkspaceCard
            key={ws.id}
            workspace={ws}
            projectId={projectId}
          />
        ))}
      </div>

      {/* Members & Roles */}
      <div className="border-t pt-4">
        <h3 className="text-xl font-semibold mb-2">Collaborators</h3>

        {/* Invite */}
        {project.user_role === "Owner" && (
          <div className="flex gap-2 mb-4">
            <input
              type="email"
              placeholder="Email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              className="input"
            />
            <select
              value={inviteRole}
              onChange={(e) => setInviteRole(e.target.value)}
              className="select"
            >
              <option>Collaborator</option>
              <option>Viewer</option>
            </select>
            <button onClick={handleInvite} className="btn">
              Invite
            </button>
          </div>
        )}

        {/* Members List */}
        <ul className="space-y-2">
          {members.map((m) => (
            <li
              key={m.id}
              className="flex justify-between items-center border p-2 rounded"
            >
              <span>{m.email}</span>
              <span>{m.name}</span>

              {project.user_role === "Owner" ? (
                <select
                  value={m.role}
                  onChange={(e) =>
                    handleRoleChange(m.id, e.target.value)
                  }
                  className="select"
                >
                  <option>Owner</option>
                  <option>Collaborator</option>
                  <option>Viewer</option>
                </select>
              ) : (
                <span className="text-gray-500">{m.role}</span>
              )}
            </li>
          ))}
        </ul>

            <h3 className="text-lg mt-2 font-semibold mb-2">Pending Invites</h3>

        {project.user_role === "Owner" && pendingInvites.length > 0 && (
          <div className="mt-6">
            <ul className="space-y-2">
              {pendingInvites.map((inv) => (
                <li
                  key={inv.id}
                  className="flex justify-between items-center border p-2 rounded text-sm"
                >
                  <span>{inv.email}</span>
                  <span className="text-gray-500">{inv.role}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

      </div>

      {showWorkspaceModal && (
        <CreateWorkspaceModal
          projectId={projectId}
          onClose={() => setShowWorkspaceModal(false)}
          onCreated={fetchWorkspaces}
        />
      )}
    </div>
  );
}
