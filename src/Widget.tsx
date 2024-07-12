import React, { useEffect, useState } from "react";
import { widgetStyle, hoverStyle } from "./Styles";
import VideoComponent from "./VideoComponent";
import Modal from "./Modal";
import { data } from "./TemporaryData";

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
          <p style={{ textAlign: "center" }}>
            {!hovered
              ? clientData?.data.circleText
              : clientData?.data.circleHoverText}
          </p>
        </div>
      </div>
      <Modal isOpen={isOpen} closeModal={closeModal} clientData={clientData} />
    </>
  );
};
