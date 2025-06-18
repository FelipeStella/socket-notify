import { Bell } from "lucide-react";

function BellIconWithBadge({
  unreadCount,
  onClick,
}: {
  unreadCount: number;
  onClick: () => void;
}) {
  return (
    <div className="relative cursor-pointer" onClick={onClick}>
      <Bell size={24} />
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {unreadCount}
        </span>
      )}
    </div>
  );
}

export default BellIconWithBadge;
