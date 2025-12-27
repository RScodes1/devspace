export default function ActivityFeed({ activities = [] }) {
  return (
    <div className="p-2 space-y-2 text-sm overflow-y-auto">
      <h3 className="font-semibold">Activity</h3>

      {activities.length === 0 && (
        <p className="text-gray-500">No activity yet</p>
      )}

      {activities.map((a, idx) => (
        <div key={idx} className="border-b pb-1">
          <span className="font-medium">
            {a.userId?.slice(0, 6) || "User"}
          </span>{" "}
          <span className="text-gray-600">{a.type}</span>
        </div>
      ))}
    </div>
  );
}
