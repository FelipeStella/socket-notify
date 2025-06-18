import { useState, useEffect, useRef } from "react";
import { useNotification } from "../../hooks/useNotification";
import BellIconWithBadge from "./BellIconWithBadge";
import DrawerWrapper from "./DrawerWrapper";

function NotificationDrawer() {
  const { notifications, unreadCount, markAsRead } = useNotification();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!drawerOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node)
      ) {
        setDrawerOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [drawerOpen]);

  const handleDrawerToggle = () => {
    setDrawerOpen((prev) => !prev);
  };

  return (
    <div className="relative">
      <BellIconWithBadge unreadCount={unreadCount} onClick={handleDrawerToggle} />

      <DrawerWrapper open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <div
          ref={drawerRef}
          className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg p-4 z-50 overflow-y-auto"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Notificações</h2>
          </div>

          {notifications.map((n: any) => (
            <div key={n.id} className="border-b py-2">
              <p className="font-bold">{n.title}</p>
              <p className="text-sm text-gray-600">{n.description}</p>
              {!n.read && (
                <button
                  className="text-blue-500 text-sm mt-1"
                  onClick={() => markAsRead(n.id)}
                >
                  Marcar como lida
                </button>
              )}
            </div>
          ))}
        </div>
      </DrawerWrapper>
    </div>
  );
}

export default NotificationDrawer;
