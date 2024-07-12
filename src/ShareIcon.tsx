import React, { useState } from "react";

interface ShareIconProps {
  label?: string;
  children: React.ReactNode;
  additionalStyles?: React.CSSProperties;
}
const ShareIcon = ({ label, children, additionalStyles }: ShareIconProps) => {
  const [hovered, setHovered] = useState(false);

  const iconStyle: React.CSSProperties = {
    borderRadius: "9999px",
    border: "1px solid #D1D5DB",
    padding: "0.75rem",
    display: "flex",
    cursor: "pointer",
    backgroundColor: hovered ? "rgba(0, 0, 0, 0.2)" : "rgba(0, 0, 0, 0.1)",
  };
  return (
    <div
      aria-label={label}
      style={{ ...iconStyle, ...additionalStyles }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </div>
  );
};

export default ShareIcon;
