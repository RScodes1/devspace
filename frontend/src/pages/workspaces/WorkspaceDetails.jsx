import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProjectContext } from "../../context/ProjectContext";
import { useAuth } from "../../hooks/useAuth";
import { getWorkspace } from "../../api/workspace.api";
import WorkspaceCard from "../../components/workspace/WorkspaceCard";
import CodeEditor from "../../components/editor/CodeEditor";
import ExecutePanel from "../../components/editor/ExecutePanel";
import ActivityFeed from "../../components/editor/ActivityFeed";
import { useSocket } from "../../context/SocketContext";

export default function WorkspaceDetails() {
  const { projectId, workspaceId } = useParams();
  const navigate = useNavigate();

  const { user } = useAuth();
  const { socket } = useSocket();
  const { project } = useProjectContext();

  const [workspace, setWorkspace] = useState(null);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchWorkspace = async () => {
      const res = await getWorkspace(projectId, workspaceId);
      setWorkspace(res.data.workspace);
    };

    fetchWorkspace();
  }, [projectId, workspaceId]);

  useEffect(() => {
    if (!socket || !user) return;

    socket.emit("joinWorkspace", {
      workspaceId,
      userId: user.id,
    });

    const handleActivity = (activity) => {
      setActivities((prev) => [activity, ...prev]);
    };

    const handleJoin = ({ userId }) => {
      setActivities((prev) => [
        { type: "USER_JOINED", userId, timestamp: Date.now() },
        ...prev,
      ]);
    };

    const handleLeave = ({ userId }) => {
      setActivities((prev) => [
        { type: "USER_LEFT", userId, timestamp: Date.now() },
        ...prev,
      ]);
    };

    socket.on("activity", handleActivity);
    socket.on("userJoined", handleJoin);
    socket.on("userLeft", handleLeave);

    return () => {
      socket.emit("leaveWorkspace", {
        workspaceId,
        userId: user.id,
      });
      socket.off("activity", handleActivity);
      socket.off("userJoined", handleJoin);
      socket.off("userLeft", handleLeave);
    };
  }, [socket, workspaceId, user]);

  if (!workspace) return <div>Loading...</div>;

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 p-4 border-r">
        <WorkspaceCard workspace={workspace} projectId={projectId} />
        <ActivityFeed activities={activities} />
      </div>

      {/* Editor */}
      <div className="flex-1 flex flex-col">
        <CodeEditor
          onActivity={(activity) =>
            socket.emit("activity", {
              workspaceId,
              userId: user.id,
              ...activity,
            })
          }
        />
        <ExecutePanel workspaceId={workspaceId} />
      </div>

      <button
        className="absolute bottom-4 right-4 btn"
        onClick={() => navigate("/projects")}
      >
        Back
      </button>
    </div>
  );
}
