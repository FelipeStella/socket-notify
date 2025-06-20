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

export function isValidNotification(obj: any): obj is Notification {
  if (typeof obj !== "object" || obj === null) {
    console.warn("❌ Notificação inválida. Esperado: objeto, recebido:", obj);
    logExpectedStructure();
    return false;
  }

  const hasAllKeys = [
    "id",
    "title",
    "description",
    "type",
    "timestamp",
    "read",
    "deleted",
  ].every((key) => Object.prototype.hasOwnProperty.call(obj, key));

  const isValid =
    hasAllKeys &&
    typeof obj.id === "string" &&
    typeof obj.title === "string" &&
    typeof obj.description === "string" &&
    ["info", "success", "error", "warning"].includes(obj.type) &&
    typeof obj.timestamp === "string" &&
    typeof obj.read === "boolean" &&
    typeof obj.deleted === "boolean";

  if (!isValid) {
    console.warn("❌ Estrutura de notificação inválida:", obj);
    logExpectedStructure();
  }

  return isValid;
}
function logExpectedStructure() {
  console.info("📦 Estrutura esperada da notificação:");
  console.table({
    id: "string",
    title: "string",
    description: "string",
    type: `"info" | "success" | "error" | "warning"`,
    timestamp: "string (ISO ou legível)",
    read: "boolean",
    deleted: "boolean",
  });
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
      try {
        const data = JSON.parse(event.data);

        if (!isValidNotification(data)) {
          console.warn("❌ Notificação com estrutura inválida:", data);
          return;
        }

        setNotifications((prev) => [data, ...prev]);
      } catch (err) {
        console.error("Erro ao processar notificação:", err);
      }
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


