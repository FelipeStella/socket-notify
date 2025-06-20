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

export interface UseNotificationOptions {
  socketUrl?: string;
  autoConnect?: boolean;
  onOpen?: () => void;
  onError?: (error: Event) => void;
  onClose?: () => void;
}

export function useNotification(options?: UseNotificationOptions) {
  const {
    socketUrl = "ws://localhost:4000",
    autoConnect = true,
    onOpen,
    onError,
    onClose,
  } = options || {};

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    if (!autoConnect) return;

    const ws = new WebSocket(socketUrl);
    setSocket(ws);

    ws.onopen = () => {
      onOpen?.();
    };

    ws.onmessage = (event) => {
      const newNotification: Notification = JSON.parse(event.data);
      setNotifications((prev) => [newNotification, ...prev]);
    };

    ws.onerror = (error) => {
      onError?.(error);
    };

    ws.onclose = () => {
      onClose?.();
    };

    return () => ws.close();
  }, [socketUrl, autoConnect]);

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
    markAsDeleted,
    socket
  };
}


