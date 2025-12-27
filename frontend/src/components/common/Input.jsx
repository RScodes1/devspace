export default function Input({
  label,
  error,
  className = "",
  ...props
}) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <input
        {...props}
        className={`border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black ${
          error ? "border-red-500" : "border-gray-300"
        } ${className}`}
      />

      {error && (
        <span className="text-xs text-red-500">{error}</span>
      )}
    </div>
  );
}
