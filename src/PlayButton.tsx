import React, { useState } from "react";

interface PlayButtonProps {
  isShown: boolean;
  handleToggleVideo: () => void;
  isVideoPaused: boolean;
  isMd: boolean;
  isLg: boolean;
}

const PlayButton = ({
  isShown,
  handleToggleVideo,
  isVideoPaused,
  isMd,
  isLg,
}: PlayButtonProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={handleToggleVideo}
      style={{
        opacity: isVideoPaused ? "1" : "0",
        position: "absolute",
        top: isShown && !isMd && !isLg ? "30%" : "50%",
        left: "50%",
        transform: `translate(-50%, -50%) ${hovered ? "scale(1.25)" : ""}`,
        padding: "2.25rem",
        zIndex: 30,
        borderRadius: "9999px",
        cursor: "pointer",
        backgroundColor: hovered
          ? "rgba(14, 165, 233, 0.8)"
          : "rgba(255, 255, 255, 0.2)",
        transition: "transform 0.2s ease",
        backdropFilter: hovered ? "blur(0.5rem)" : "blur(0.75rem)",
        fontWeight: "500",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        color: "#FFFFFF",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        style={{ width: "1.75rem", height: "1.75rem" }}
      >
        <path
          fillRule="evenodd"
          d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
          clipRule="evenodd"
        ></path>
      </svg>
    </div>
  );
};

export default PlayButton;
