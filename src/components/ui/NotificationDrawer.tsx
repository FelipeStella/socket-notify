import { useState, useEffect, useRef } from "react";
import { useNotification, UseNotificationOptions } from "../../hooks/useNotification";
import BellIconWithBadge from "./BellIconWithBadge";
import DrawerWrapper from "./DrawerWrapper";
import { Trash2 as DeleteIcon } from "lucide-react";

interface NotificationDrawerProps {
  position?: "right" | "left";
  optionsSocket?: UseNotificationOptions;
  onNotificationRead?: (id: any) => void;
  onNotificationDeleted?: (id: any) => void;
}

const drawerWrapperStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,                  
  width: "91%",                 
  backgroundColor: "#ffffff",      
  boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)", 
  padding: "1rem",              
  zIndex: 50,                       
  overflowY: "auto",
};

const drawerTitleWrapperStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "1rem",
}

const drawerTitleStyle: React.CSSProperties = {
  fontSize: "1.25rem",
  fontWeight: "600",    
  color: "#111827",   
}

const wrapperContentNotification: React.CSSProperties = {
  borderBottom: "1px solid #e5e7eb",
  paddingTop: "0.5rem",
  paddingBottom: "0.5rem",
};

const pTitleStyle = (isRead: boolean): React.CSSProperties => ({
  fontWeight: isRead ? "normal" : "bold",
  fontSize: "1rem",
  margin: 0,
  cursor: "pointer",
  background: "none",
  border: "none",
  textAlign: "left",
  width: "100%",
});

const pDescriptionStyle: React.CSSProperties = {
  fontSize: "0.875rem",
  color: "#4b5563",
  marginTop: "1rem",
  marginLeft: "0.4rem",
  justifyContent: "space-between",
};

const spanTimeStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.75rem",
  color: "#9ca3af",
  marginTop: "0.25rem",
  fontStyle: "italic",
  marginLeft: "0.4rem",
};

function NotificationDrawer(props: NotificationDrawerProps) {
  const { notifications, unreadCount, markAsRead, markAsDeleted } = useNotification(props.optionsSocket);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());
  const bellRef = useRef<HTMLDivElement>(null);

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
    if (notifications.length === 0) return;
    setDrawerOpen((prev) => !prev);
  };

  const toggleItem = (id: any, isRead: boolean) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
      if (!isRead) {
        markAsRead(id);
        props.onNotificationRead?.(id); // 👈 callback externo
      }
    }
    setOpenItems(newOpenItems);
  };

  const handleDelete = (id: string) => {
    markAsDeleted(id);
    props.onNotificationDeleted?.(id); // 👈 callback externo
  };

  return (
    <div ref={bellRef} style={{ position: "relative" }}>
      <BellIconWithBadge unreadCount={unreadCount} onClick={handleDrawerToggle} />

      <DrawerWrapper
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        position={props.position}>
        <div
          ref={drawerRef}
          style={drawerWrapperStyle}
        >
          <div style={drawerTitleWrapperStyle}>
            <h2 style={drawerTitleStyle}>Notificações</h2>
          </div>

          {notifications.filter((n: any) => !n.deleted).map((n: any) => (
            <div key={n.id} style={wrapperContentNotification}>
              <button
                style={pTitleStyle(n.read)}
                onClick={() => toggleItem(n.id, n.read)}
              >
                {n.title}
              </button>

              {openItems.has(n.id) && (
                <>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <p style={pDescriptionStyle}>{n.description}</p>
                    <DeleteIcon
                      size={18}
                      color="#bc1104"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDelete(n.id)} />
                  </div>
                  <span style={spanTimeStyle}>{n.timestamp}</span>
                </>
              )}
            </div>
          ))}
        </div>
      </DrawerWrapper>
    </div>
  );
}

export default NotificationDrawer;
