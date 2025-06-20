import React from "react";

interface DrawerWrapperProps {
  open: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
  position?: "right" | "left";
}

const getDrawerStyle = (
  open: boolean,
  position: "right" | "left" = "right"
): React.CSSProperties => {
  const base: React.CSSProperties = {
    position: "fixed",
    backgroundColor: "#ffffff",
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    overflowY: "auto",
    zIndex: 1000,
    transition: "transform 0.3s ease-in-out",
  };

  switch (position) {
    case "left":
      return {
        ...base,
        top: 0,
        left: 0,
        width: "400px",
        height: "100vh",
        transform: open ? "translateX(0)" : "translateX(-100%)",
      };
    case "right":
    default:
      return {
        ...base,
        top: 0,
        right: 0,
        width: "400px",
        height: "100vh",
        transform: open ? "translateX(0)" : "translateX(100%)",
      };
  }
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

const DrawerWrapper: React.FC<DrawerWrapperProps> = ({
  open,
  children,
  position = "right",
}) => {
  return (
    <>
      {open && <div style={backdropStyle}></div>}
      <div style={getDrawerStyle(open, position)}>{children}</div>
    </>
  );
};

export default DrawerWrapper;
