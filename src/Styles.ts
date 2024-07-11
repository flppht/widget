export const widgetStyle: React.CSSProperties = {
  color: "#000000",
  position: "absolute",
  bottom: "40px",
  left: "40px",
  transition: "all 0.2s ease-in-out 0.1s",
  width: "130px",
  height: "130px",
  borderRadius: "100%",
  boxShadow:
    "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  fontSize: "15px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "5px solid",
  cursor: "pointer",
  fontFamily:
    "ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
};

export const hoverStyle: React.CSSProperties = {
  transform: "scale(1.1)",
};

export const modalStyle: React.CSSProperties = {
  borderColor: "rgb(117, 117, 117)",
  boxShadow: "rgba(0, 0, 0, 0.5) 0px 3px 20px",
  borderRadius: "24px",
  borderWidth: "0px",
  right: "unset",
  bottom: "20px",
  transition:
    "all cubic-bezier(0, 1.2, 1, 1) 0s, transform 300ms cubic-bezier(0, 1.2, 1, 1) 0s, opacity 83ms ease-out 0s",
  transformOrigin: "left bottom",
  position: "fixed",
  zIndex: 2147483647,
  userSelect: "none",
  overscrollBehavior: "contain",
  fontWeight: "normal",
  fontSize: "1rem",
  fontFamily: "jakarta",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};
