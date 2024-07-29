import React, { useState } from "react";
import { paragraphStyle } from "./Styles";

const Button = ({
  text,
  handleClick,
  icon,
}: {
  text: string;
  handleClick?: () => void;
  icon?: React.JSX.Element;
}) => {
  const [isActive, setIsActive] = useState(false);

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
        justifyContent: "center",
        backgroundColor: isActive ? "var(--primary-color)" : "#FFFFFF",
        color: isActive ? "#fff" : "#000000",
        cursor: "pointer",
      }}
      onClick={() => {
        if (handleClick) handleClick();
        setIsActive(!isActive);
      }}
    >
      {icon && icon}
      <p
        style={{
          ...{
            fontFamily: "Inter, sans-serif",
            textAlign: "center",
            fontSize: "0.875rem",
            fontWeight: 600,
          },
          ...paragraphStyle,
        }}
      >
        {text}
      </p>
    </button>
  );
};

export default Button;
