import React, { useState } from "react";

const PlanButton = ({ order, text, isLg }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      style={{
        textAlign: "left",
        border: "1px solid",
        pointerEvents: "auto",
        transition: "all 0.15s",
        color: "#F3F4F6",
        borderColor: "#6B7280",
        backgroundColor: hovered ? "rgba(0,0,0,0.4)" : "rgba(0, 0, 0, 0.2)",
        borderRadius: "9999px",
        fontSize: "0.875rem",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        cursor: "pointer",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          backgroundColor: "rgb(100 116 139)",
          width: "2rem",
          height: "2rem",
          borderRadius: "9999px",
          minWidth: "2rem",
          minHeight: "2rem",
          display: isLg ? "flex" : "none",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
          color: "#ffffff",
          marginLeft: "0.5rem",
        }}
      >
        {order}
      </div>
      <p style={{ font: "#fffff", padding: "8px", marginLeft: "10px" }}>
        {text}
      </p>
    </button>
  );
};

export default PlanButton;
