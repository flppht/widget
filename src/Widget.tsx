import React, { useEffect, useState } from "react";
import { widgetStyle, hoverStyle } from "./Styles";
import VideoComponent from "./VideoComponent";
import Modal from "./Modal";
import { data } from "./TemporaryData";
import ChatWidget from "./ChatWidget";

export interface ClientData {
  id: string | number;
  data: {
    title: {
      text: string;
      color?: string;
    };
    videoUrl: string;
    posterUrl?: string;
    circleBorderColor: string;
    circleText: string;
    circleHoverText: string;
    buttons: {
      text: string;
    }[];
    buttonsStyle?: {};
    backgroundColor?: string;
    borderColor: string;
  };
}

export const Widget = ({ clientId }: { clientId?: string | number }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [clientData, setClientData] = useState<ClientData>();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const item = data.find((item) => item.id === clientId);
    setClientData(item);
  }, [clientId]);

  return (
    <>
      <div
        style={{
          ...widgetStyle,
          ...(hovered && hoverStyle),
          ...(isOpen && { opacity: "0" }),
          ...(clientData?.data.circleBorderColor && {
            borderColor: clientData.data.circleBorderColor,
          }),
        }}
        onClick={openModal}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <VideoComponent
          videoUrl={clientData?.data.videoUrl}
          posterUrl={clientData?.data.posterUrl}
        />

        {/* gradient */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            overflow: "hidden",
            borderRadius: "9999px",
            backgroundImage: hovered
              ? `linear-gradient(to top, rgba(0, 0, 0, 0) 20%, ${clientData?.data.circleBorderColor} 80%)`
              : "",
            opacity: 0.8,
            zIndex: 30,
            top: 0,
            left: 0,
          }}
        ></div>

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
              transition: "all 0.3s ease",
            }}
          >
            {clientData?.data.circleHoverText}
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
              transition: "all 0.3s ease",
            }}
          >
            {clientData?.data.circleText}
          </p>
        </div>
      </div>
      <Modal isOpen={isOpen} closeModal={closeModal} clientData={clientData} />
      <ChatWidget
        isOpen={isOpen}
        backgroundColor={clientData?.data.circleBorderColor}
      />
    </>
  );
};
