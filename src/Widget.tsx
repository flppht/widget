import React, { useEffect, useState } from "react";
import { widgetStyle, hoverStyle } from "./Styles";
import CircleComponent from "./CircleComponent";
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
          ...{ backgroundColor: clientData?.data.circleBorderColor },
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
              // position: "absolute",
              // top: 0,
              // left: 0,
              width: "100%",
              height: "100%",
              backgroundImage: hovered
                ? `linear-gradient(to bottom,  ${clientData?.data.circleBorderColor}, color-mix(in srgb, ${clientData?.data.circleBorderColor} 10%, transparent))`
                : "",
              opacity: 0.8,
              zIndex: 30,
              transition: "all 0.3s ease-in-out 0.1s",
            }}
          />
        </div>
        <CircleComponent
          videoUrl={clientData?.data.videoUrl}
          posterUrl={clientData?.data.posterUrl}
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
              transition: "all 0.3s ease-in-out",
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
