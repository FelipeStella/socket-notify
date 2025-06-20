import { BlobOptions } from "buffer";
import { useEffect, useState, useCallback } from "react";

export type Notification = {
  id: string;
  title: string;
  description?: string;
  type: "info" | "success" | "error" | "warning";
  timestamp: string;
  read: boolean;
  deleted?: boolean;
};

export function useNotification() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:4000");

    socket.onmessage = (event) => {
      const newNotification: Notification = JSON.parse(event.data);
      setNotifications((prev) => [newNotification, ...prev]);
    };

    return () => socket.close();
  }, []);

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const markAsDeleted = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, deleted: true } : n))
    );
  }, []);

  const unreadCount = notifications.filter((n) => !n.read && !n.deleted).length;

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAsDeleted
  };
}
