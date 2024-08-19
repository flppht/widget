import React, { useState, useEffect } from "react";
import { chatStyle, hoverStyle } from "./Styles";
import { ClientData } from "./Types"; // Use the correct path to your Types
import { data } from "./Data";
import useGTM from "./useGTM";

interface ChatWidgetProps {
  clientData: ClientData;
  isOpen: boolean;
}

const ChatWidget = ({ isOpen, clientData }: ChatWidgetProps) => {
  const [hovered, setHovered] = useState(false);
  const [chatOpened, setChatOpened] = useState(false);
  const widgetPosition = clientData.ui.position;
  const chatAppId = clientData.ui.chatWidget.intercomId;
  const pushEventToDataLayer = useGTM();

  useEffect(() => {
    window.intercomSettings = {
      app_id: chatAppId,
      hide_default_launcher: true,
      alignment: widgetPosition,
      horizontal_padding: widgetPosition === "left" ? 225 : 20,
    };
    const loadIntercom = () => {
      if (!window.Intercom) {
        const intercomScript = document.createElement("script");
        intercomScript.type = "text/javascript";
        intercomScript.async = true;
        intercomScript.src = "https://widget.intercom.io/widget/m5bvaec7";
        const firstScript = document.getElementsByTagName("script")[0];
        firstScript.parentNode?.insertBefore(intercomScript, firstScript);
      } else {
        window.Intercom("reattach_activator");
        window.Intercom("update", window.intercomSettings);
      }
    };

    if (window.Intercom) {
      window.Intercom("onhide", () => {
        console.log("intercome widget closed");
      });
    }
    loadIntercom();

    return () => {
      // Cleanup Intercom on component unmount
      if (window.Intercom) {
        window.Intercom("shutdown");
      }
    };
  }, []);

  const openIntercomChat = () => {
    pushEventToDataLayer(
      clientData?.id + `${!chatOpened ? " chat_opened" : " chat_closed"}`,
      {
        event_category: "button",
        event_action: "click",
        event_label: "chat_button",
      }
    );
    setChatOpened(!chatOpened);
    if (window.Intercom) {
      if (chatOpened) {
        window.Intercom("hide");
      } else {
        window.Intercom("show");
      }
    } else {
      console.error("Intercom is not initialized");
    }
  };

  return (
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
      onClick={openIntercomChat} // Open Intercom chat on click
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
  );
};

export default ChatWidget;
