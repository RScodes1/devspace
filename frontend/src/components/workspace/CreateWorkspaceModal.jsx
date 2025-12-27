import { useState } from "react";
import { createWorkspace } from "../../api/workspace.api";

export default function CreateWorkspaceModal({ projectId, onClose, onCreated }) {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createWorkspace(projectId, { name });
    onCreated();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
      <form className="bg-white p-4 rounded w-80" onSubmit={handleSubmit}>
        <h2 className="font-bold text-lg mb-2">Create Workspace</h2>
        <input
          placeholder="Workspace Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-1 w-full mb-2"
        />
        <button type="submit" className="btn">Create</button>
        <button type="button" onClick={onClose} className="btn ml-2">Cancel</button>
      </form>
    </div>
  );
}
