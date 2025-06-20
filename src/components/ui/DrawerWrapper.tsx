import React from "react";

interface DrawerWrapperProps {
  open: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
}

const drawerStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  right: 0,
  height: "100vh",
  width: "400px",
  backgroundColor: "#ffffff",
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue',sans-serif",
  overflowY: "auto",
  backgroundSize: "16px 16px",
  zIndex: 1000,
  transition: "transform 0.3s ease-in-out",
  transform: "translateX(0)",
};

const hiddenStyle: React.CSSProperties = {
  ...drawerStyle,
  transform: "translateX(100%)",
};

const backdropStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.3)",
  zIndex: 999,
};

const DrawerWrapper: React.FC<DrawerWrapperProps> = ({ open, children }) => {
  return (
    <>
      {open && <div style={backdropStyle}></div>}
      <div style={open ? drawerStyle : hiddenStyle}>
        {children}
      </div>
    </>
  );
};

export default DrawerWrapper;
