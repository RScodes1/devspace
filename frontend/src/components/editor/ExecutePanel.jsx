import { useState } from "react";
import { executeCode } from "../../api/job.api";

export default function ExecutePanel({ workspaceId }) {
  const [loading, setLoading] = useState(false);

  const handleRun = async () => {
    try {
      setLoading(true);
      await executeCode(workspaceId, {
        code: "// mock code",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-2 border-t">
      <button
        onClick={handleRun}
        disabled={loading}
        className="btn"
      >
        {loading ? "Running..." : "Run"}
      </button>
    </div>
  );
}
