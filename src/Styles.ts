export const widgetStyle: React.CSSProperties = {
  color: "#000000",
  position: "absolute",
  bottom: "20px",
  left: "35px",
  transition: "all 0.2s ease-in-out 0.1s",
  width: "125px",
  height: "125px",
  borderRadius: "9999px",
  // boxShadow:
  //   "0 20px 25px -5px rgb(0 0 0 / 0.3), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  boxShadow: "0 0 20px rgba(0, 0, 0, 0.5)",
  fontSize: "15px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "6px solid",
  cursor: "pointer",
  fontFamily:
    "ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
  overflow: "hidden",
};

export const hoverStyle: React.CSSProperties = {
  transform: "scale(1.1)",
};

export const modalStyle: React.CSSProperties = {
  boxShadow: "rgba(0, 0, 0, 0.5) 0px 3px 20px",
  borderRadius: "24px",
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

export const paragraphStyle = {
  margin: "14px",
};

export const chatStyle: React.CSSProperties = {
  color: "#000000",
  position: "absolute",
  bottom: "20px",
  left: "140px",
  transition: "all 0.2s ease-in-out 0.1s",
  width: "60px",
  height: "60px",
  borderRadius: "100%",
  boxShadow: "0 0 20px rgba(0, 0, 0, 0.5)",
  fontSize: "15px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  fontFamily:
    "ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
};

export const messageBlock: React.CSSProperties = {
  background: "#f2f2f2",
  padding: "10px 15px",
  borderRadius: "10px",
  color: "black",
};
