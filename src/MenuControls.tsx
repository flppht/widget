import React from "react";
import ControlButton from "./ControlButton";

interface MenuControlsProps {
  isLg: boolean;
  isMd: boolean;
  muted?: boolean;
  handleFullScreen: () => void;
  replayVideo: () => void;
  toggleMute: () => void;
  closeModal: () => void;
  toggleShared: () => void;
}

const MenuControls = ({
  isLg,
  isMd,
  muted,
  handleFullScreen,
  replayVideo,
  toggleMute,
  closeModal,
  toggleShared,
}: MenuControlsProps) => {
  const buttonStyle: React.CSSProperties = {
    pointerEvents: "auto",
    padding: "0.5rem",
    backdropFilter: "blur(0.75rem)",
    borderRadius: isLg ? "0.75rem" : "0.375rem",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
    transition: "all 0.2s ease",
    display: "flex",
    borderWidth: "0",
    cursor: "pointer",
  };

  const svgStyle: React.CSSProperties = {
    width: isLg ? "1.5rem" : "1rem",
    height: isLg ? "1.5rem" : "1rem",
    color: "#ffffff",
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: isLg ? "0.75rem" : "0.25rem",
          width: "50%",
          paddingTop: "0.75rem",
          paddingLeft: isLg ? "1rem" : "0.5rem",
        }}
      >
        <ControlButton
          style={buttonStyle}
          onClick={replayVideo}
          backgroundStyle={{
            hovered: "rgba(0, 0, 0, 0.4)",
            unhovered: "rgba(0, 0, 0, 0.2)",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            style={{
              ...svgStyle,
              ...{
                strokeWidth: "2",
              },
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            ></path>
          </svg>
        </ControlButton>
        <ControlButton
          style={buttonStyle}
          onClick={handleFullScreen}
          backgroundStyle={{
            hovered: "rgba(0, 0, 0, 0.4)",
            unhovered: "rgba(0, 0, 0, 0.2)",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            style={svgStyle}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
            ></path>
          </svg>
        </ControlButton>
        <ControlButton
          style={buttonStyle}
          onClick={toggleMute}
          backgroundStyle={{
            hovered: "rgba(0, 0, 0, 0.4)",
            unhovered: "rgba(0, 0, 0, 0.2)",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            style={svgStyle}
          >
            {muted ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.531V19.94a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.506-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.395C2.806 8.757 3.63 8.25 4.51 8.25H6.75z"
              ></path>
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
              ></path>
            )}
          </svg>
        </ControlButton>
      </div>
      {/* buttons for share and closing when on small screens */}
      <div
        style={{
          width: "50%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
          display: isMd || isLg ? "none" : "flex",
          gap: "0.25rem",
          paddingTop: "0.75rem",
          paddingRight: isLg ? "1rem" : "0.5rem",
        }}
      >
        {/* share button */}
        <ControlButton
          style={buttonStyle}
          onClick={toggleShared}
          backgroundStyle={{
            hovered: "rgba(0, 0, 0, 0.4)",
            unhovered: "rgba(0, 0, 0, 0.2)",
          }}
        >
          <svg
            style={svgStyle}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.26 14.978a10.985 10.985 0 0 1 10.216-8.546l.955-.044V3.047a.047.047 0 0 1 .081-.033L18.95 9.45l-.057.057-6.38 6.38a.048.048 0 0 1-.033.014.047.047 0 0 1-.047-.047v-3.456l-.784-.173A11.7 11.7 0 0 0 1.26 14.978Z"
              stroke="#fff"
            ></path>
          </svg>
        </ControlButton>
        <ControlButton
          style={buttonStyle}
          onClick={closeModal}
          backgroundStyle={{
            hovered: "rgba(0, 0, 0, 0.4)",
            unhovered: "rgba(0, 0, 0, 0.2)",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            style={{
              ...svgStyle,
              ...{
                strokeWidth: "2",
              },
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </ControlButton>
      </div>
    </>
  );
};

export default MenuControls;
