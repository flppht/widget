import React, { useState } from "react";
import { chatStyle, hoverStyle } from "./Styles";
import { ClientData } from "./Types";

interface ChatWidgetProps {
  clientData: ClientData;
  isOpen: boolean;
}

const ChatWidget = ({ isOpen, clientData }: ChatWidgetProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <div
        style={{
          ...chatStyle,
          ...(hovered && hoverStyle),
          ...(isOpen && { opacity: "0", display: "none" }),
          ...(isOpen ? { zIndex: "-10" } : { zIndex: "30" }),
          ...{
            backgroundColor: "var(--primary-color)",
            backgroundImage: `linear-gradient(180deg, var(--primary-color) 60%, rgba(0, 0, 0, 0.1) 100%)`,
            left:
              clientData.ui.position === "left"
                ? !clientData.ui.videoWidget.isActive
                  ? "35px"
                  : "140px"
                : "unset",
            right:
              clientData.ui.position === "right"
                ? !clientData.ui.videoWidget.isActive
                  ? "35px"
                  : "140px"
                : "unset",
          },
        }}
        // onClick={openModal}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <svg
          fill="currentColor"
          viewBox="0 0 16 16"
          height="1em"
          width="1em"
          style={{
            width: "1.5rem",
            height: "1.5rem",
            fill: "#FFFFFF",
          }}
        >
          <path d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 01-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM5 8a1 1 0 10-2 0 1 1 0 002 0zm4 0a1 1 0 10-2 0 1 1 0 002 0zm3 1a1 1 0 100-2 1 1 0 000 2z"></path>
        </svg>
      </div>
    </>
  );
};

export default ChatWidget;
