import { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";

export default function CodeEditor({ onActivity }) {
  const [code, setCode] = useState("");
  const debouncedCode = useDebounce(code, 500);

  useEffect(() => {
    if (!debouncedCode) return;

    onActivity?.({
      type: "CODE_CHANGE",
      payload: { code: debouncedCode },
    });
  }, [debouncedCode]);

  return (
    <textarea
      className="w-full h-full p-3 font-mono text-sm border resize-none"
      value={code}
      onChange={(e) => setCode(e.target.value)}
      placeholder="Start coding..."
    />
  );
}
