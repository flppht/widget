import React, { useState } from "react";

const RightArrow = ({
  handleRightArrowClick,
}: {
  handleRightArrowClick: () => void;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      width="40px"
      height="40px"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        zIndex: "30",
        transform: hovered ? "scale(1.2)" : "scale(1)",
        transition: "all 0.3s ease",
        cursor: "pointer",
        right: 0,
        top: 0,
        position: "absolute",
      }}
      onClick={handleRightArrowClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="M9 5L14.15 10C14.4237 10.2563 14.6419 10.5659 14.791 10.9099C14.9402 11.2539 15.0171 11.625 15.0171 12C15.0171 12.375 14.9402 12.7458 14.791 13.0898C14.6419 13.4339 14.4237 13.7437 14.15 14L9 19"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </g>
    </svg>
  );
};

export default RightArrow;
