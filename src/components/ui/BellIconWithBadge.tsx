import { Bell } from "lucide-react";

const bellWrapperStyle: React.CSSProperties = {
  position: "relative",
  cursor: "pointer",
};

const badgeStyle: React.CSSProperties = {
  position: "absolute",
  top: "0.5rem", 
  left: "0.9rem",               
  backgroundColor: "#ef4444", 
  color: "#ffffff",        
  fontSize: "0.75rem",    
  borderRadius: "9999px", 
  width: "1.25rem",       
  height: "1.25rem",       
  display: "flex",         
  alignItems: "center",    
  justifyContent: "center" 
};

function BellIconWithBadge({
  unreadCount,
  onClick,
}: {
  unreadCount: number;
  onClick: () => void;
}) {
  return (
    <div style={bellWrapperStyle} onClick={onClick}>
      <Bell size={24} />
      {unreadCount > 0 && (
        <span style={badgeStyle}>
          {unreadCount}
        </span>
      )}
    </div>
  );
}

export default BellIconWithBadge;
