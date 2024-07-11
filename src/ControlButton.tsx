import React, { useState } from "react";

interface ControlButtonProps {
  style?: React.CSSProperties;
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  backgroundStyle: {
    hovered: string;
    unhovered: string;
  };
}

const ControlButton = ({
  style,
  children,
  onClick,
  backgroundStyle,
}: ControlButtonProps) => {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      style={{
        ...style,
        ...{
          backgroundColor: hovered
            ? backgroundStyle.hovered
            : backgroundStyle.unhovered,
        },
      }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </button>
  );
};

export default ControlButton;
