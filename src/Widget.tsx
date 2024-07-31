import React, { useEffect, useState } from "react";
import { widgetStyle, hoverStyle, kf1, kf2, kf3, kf4, kf5 } from "./Styles";
import CircleComponent from "./CircleComponent";
import Modal from "./Modal";
import { data } from "./Data";
import ChatWidget from "./ChatWidget";
import axios from "axios";
import { ClientData, InstagramAccessToken } from "./Types";
import useGTM from "./useGTM";

export const Widget = ({ clientId }: { clientId?: string | number }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [clientData, setClientData] = useState<ClientData>();
  const [accessToken, setAccessToken] = useState<InstagramAccessToken>();
  const pushEventToDataLayer = useGTM();

  const openModal = () => {
    setIsOpen(true);
    pushEventToDataLayer(clientId + " widget_opened", {
      event_category: "button",
      event_action: "click",
      event_label: "circle_button",
    });
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSetAccessToken = (data) => {
    setAccessToken({
      token: data.token,
      expiresIn: data.expiresIn,
      clientId: data.userId,
    });
  };

  useEffect(() => {
    const fetchingData = async () => {
      const item = await data.find((item) => item.id === clientId);
      setClientData(item);
    };

    const fetchToken = async () => {
      let url = `${process.env.REACT_APP_IG_AUTH_URL}/token/${clientId}`;
      const response = await axios.get(url);
      handleSetAccessToken(response.data);
    };

    fetchingData();
    fetchToken();
  }, [clientId]);

  //loading styles
  useEffect(() => {
    if (clientData) {
      const cssContent = `
      :root {
        --primary-color: ${clientData.ui.colors.background.primary};
      }
      ::-webkit-scrollbar {
        width: 0; /* Remove scrollbar space */
        background: transparent; /* Optional: just make scrollbar invisible */
      }
      ${kf1}
      ${kf2}
      ${kf3}
      ${kf4}
      ${kf5}
      `;

      injectStyle(cssContent);
    }
  }, [clientData]);

  return (
    <>
      {clientData?.ui.videoWidget.isActive && (
        <>
          <div
            style={{
              ...widgetStyle,
              ...{
                ...(isOpen && { opacity: "0" }),
                backgroundColor: "var(--primary-color)",
                animation: "ping 1s cubic-bezier(0, 0, 0.2, 1) 4",
                left: clientData?.ui.position === "left" ? "35px" : "unset",
                right: clientData?.ui.position === "right" ? "35px" : "unset",
              },
            }}
          ></div>
          <div
            style={{
              ...widgetStyle,
              ...(hovered && hoverStyle),
              ...(isOpen && { opacity: "0" }),
              ...{
                backgroundColor: "var(--primary-color)",
                animation: "border-turns-primary-from-white 1s 3s forwards",
                border: "6px solid #fff",
                borderSpacing: "0px 0px",
                left: clientData?.ui.position === "left" ? "35px" : "unset",
                right: clientData?.ui.position === "right" ? "35px" : "unset",
              },
            }}
            onClick={openModal}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {/* gradients */}
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                position: "absolute",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  overflow: "hidden",
                  borderRadius: "9999px",
                  backgroundImage:
                    "linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 1))",
                  opacity: 0.8,
                  zIndex: 30,
                  top: 0,
                  left: 0,
                }}
              />
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundImage: hovered
                    ? `linear-gradient(to bottom, var(--primary-color), color-mix(in srgb, var(--primary-color) 10%, transparent))`
                    : "",
                  opacity: 0.8,
                  zIndex: "9999",
                  transition: "all 0.3s ease-in-out 0.1s",
                }}
              />
            </div>

            <CircleComponent
              videoUrl={clientData?.property.coverVideo}
              posterUrl={clientData?.property.coverImage}
            />

            {/* loader */}
            <div
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                boxSizing: "border-box",
                zIndex: "30",
                borderRadius: "50%",
                border: `7px solid var(--primary-color)`,
                animation:
                  "lwid-1 1s infinite linear alternate, lwid-2 2s infinite linear, border-disappear 1s 3s forwards",
              }}
            />

            {/* text */}
            <div
              style={{
                position: "absolute",
                display: "flex",
                alignItems: "center",
                color: "#FFFFFF",
                zIndex: 30,
                fontSize: "14px",
              }}
            >
              <p
                style={{
                  textAlign: "center",
                  opacity: hovered ? "1" : "0",
                  transform: hovered ? "translateY(0%)" : "translateY(-120%)",
                  transition: "all 0.3s ease-in-out",
                }}
              >
                {clientData?.ui.videoWidget.triggerText}
              </p>
            </div>
            <div
              style={{
                position: "absolute",
                display: "flex",
                alignItems: "center",
                color: "#FFFFFF",
                zIndex: 30,
                fontSize: "14px",
              }}
            >
              <p
                style={{
                  textAlign: "center",
                  opacity: hovered ? "0" : "1",
                  transform: hovered ? "translateY(120%)" : "translateY(0%)",
                  transition: "all 0.3s ease-in-out",
                }}
              >
                {clientData?.ui.videoWidget.triggerTextHover}
              </p>
            </div>
          </div>
          <Modal
            isOpen={isOpen}
            closeModal={closeModal}
            clientData={clientData}
            accessToken={accessToken}
            handleSetAccessToken={handleSetAccessToken}
          />
        </>
      )}
      {clientData?.ui.chatWidget.isActive && (
        <ChatWidget isOpen={isOpen} clientData={clientData} />
      )}
    </>
  );
};

function injectStyle(cssContent) {
  let stylesheet = document.createElement("style");
  document.getElementById("widget")?.appendChild(stylesheet);
  stylesheet.innerHTML = cssContent;
}
