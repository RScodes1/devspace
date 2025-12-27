export default function Button({
  children,
  variant = "primary",
  loading = false,
  disabled = false,
  className = "",
  ...props
}) {
  const base =
    "px-4 py-2 rounded-md text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-black text-white hover:bg-gray-800",
    secondary: "bg-gray-200 text-black hover:bg-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}
