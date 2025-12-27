export default function Loader({ fullScreen = false }) {
  const wrapperClass = fullScreen
    ? "fixed inset-0 flex items-center justify-center bg-white/70 z-50"
    : "flex items-center justify-center";

  return (
    <div className={wrapperClass}>
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-black" />
    </div>
  );
}
