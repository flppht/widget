import React, { useState } from "react";

const Button = ({ text }: { text: string }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      style={{
        position: "relative",
        border: "1px solid #D1D5DB",
        pointerEvents: "auto",
        transitionDuration: "150ms",
        paddingTop: "5px",
        paddingRight: "4px",
        paddingBottom: "5px",
        paddingLeft: "4px",
        borderRadius: "0.375rem",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "start",
        backgroundColor: hovered ? "rgb(212 212 212)" : "#FFFFFF",
        color: "#000000",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <p
        style={{
          fontFamily: "Inter, sans-serif",
          textAlign: "center",
          width: "100%",
          fontSize: "0.875rem",
          fontWeight: 600,
        }}
      >
        {text}
      </p>
    </button>
  );
};

export default Button;
