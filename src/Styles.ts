export const widgetStyle: React.CSSProperties = {
  boxSizing: "border-box",
  position: "absolute",
  bottom: "20px",
  transition: "all 0.2s ease-in-out 0.1s",
  width: "130px",
  height: "130px",
  borderRadius: "9999px",
  // borderBottomLeftRadius: "20px",
  // borderBottomRightRadius: "20px",
  // borderTopLeftRadius: "50px",
  // borderTopRightRadius: "50px",
  boxShadow: "0 0 20px rgba(0, 0, 0, 0.3)",
  fontSize: "15px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
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

export const paragraphStyle: React.CSSProperties = {
  margin: "14px",
};

export const chatStyle: React.CSSProperties = {
  color: "#000000",
  position: "absolute",
  bottom: "20px",
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

export const kf1 = `
  @keyframes lwid-1 {
    0% {
      clip-path: polygon(50% 50%, 0 0, 50% 0%, 50% 0%, 50% 0%, 50% 0%, 50% 0%);
    }
    12.5% {
      clip-path: polygon(
        50% 50%,
        0 0,
        50% 0%,
        100% 0%,
        100% 0%,
        100% 0%,
        100% 0%
      );
    }
    25% {
      clip-path: polygon(
        50% 50%,
        0 0,
        50% 0%,
        100% 0%,
        100% 100%,
        100% 100%,
        100% 100%
      );
    }
    50% {
      clip-path: polygon(
        50% 50%,
        0 0,
        50% 0%,
        100% 0%,
        100% 100%,
        50% 100%,
        0% 100%
      );
    }
    62.5% {
      clip-path: polygon(
        50% 50%,
        100% 0,
        100% 0%,
        100% 0%,
        100% 100%,
        50% 100%,
        0% 100%
      );
    }
    75% {
      clip-path: polygon(
        50% 50%,
        100% 100%,
        100% 100%,
        100% 100%,
        100% 100%,
        50% 100%,
        0% 100%
      );
    }
    100% {
      clip-path: polygon(
        50% 50%,
        50% 100%,
        50% 100%,
        50% 100%,
        50% 100%,
        50% 100%,
        0% 100%
      );
    }
  }
`;

export const kf2 = `
  @keyframes lwid-2 {
    0% {
      transform: scaleY(1) rotate(0deg);
    }
    49.99% {
      transform: scaleY(1) rotate(135deg);
    }
    50% {
      transform: scaleY(-1) rotate(0deg);
    }
    100% {
      transform: scaleY(-1) rotate(-135deg);
    }
  }
`;

export const kf3 = `
  @keyframes border-disappear {
    to {
      border-color: transparent;
    }
  }
`;

export const kf4 = `
  @keyframes border-turns-primary-from-white {
    to {
      border-color: var(--primary-color);
    }
  }
`;

export const kf5 = `
  @keyframes ping {
    0% {
      transform: scale(0.1);
      opacity: 1;
    }
    80%,
    100% {
      transform: scale(1.4);
      opacity: 0;
    }
  }
`;

export const itemFilter: React.CSSProperties = {
  background: "rgba(21,27,83,.04)",
  borderRadius: "2px",
  padding: "7px",
  minWidth: "80px",
  fontSize: "14px",
  textAlign: "center",
  color: "#201f1e",
  margin: "4px",
  transition: "all .2s linear 0s",
  cursor: "pointer",
};
