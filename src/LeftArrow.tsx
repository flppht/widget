import React, { useState } from "react";

const LeftArrow = ({
  handleLeftArrowClick,
}: {
  handleLeftArrowClick: () => void;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <svg
      width="40px"
      height="40px"
      viewBox="0 0 24 24"
      fill="none"
      style={{
        display: "flex",
        zIndex: "30",
        transform: hovered ? "scale(1.2)" : "scale(1)",
        transition: "all 0.3s ease",
        cursor: "pointer",
        left: 0,
        top: 0,
        position: "absolute",
      }}
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleLeftArrowClick}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="M14.9991 19L9.83911 14C9.56672 13.7429 9.34974 13.433 9.20142 13.0891C9.0531 12.7452 8.97656 12.3745 8.97656 12C8.97656 11.6255 9.0531 11.2548 9.20142 10.9109C9.34974 10.567 9.56672 10.2571 9.83911 10L14.9991 5"
          stroke="#ffffff"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>{" "}
      </g>
    </svg>
  );
};

export default LeftArrow;
