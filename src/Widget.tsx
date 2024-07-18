import React, { useEffect, useState } from "react";
import {
  widgetStyle,
  hoverStyle,
  keyframes1,
  keyframes2,
  keyframes3,
  keyframes4,
} from "./Styles";
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
    const fetchingData = async () => {
      const item = await data.find((item) => item.id === clientId);
      setClientData(item);
    };

    fetchingData();
  }, [clientId]);

  useEffect(() => {
    if (clientData) {
      const sheet = createStyleSheet();
      if (sheet) {
        injectKeyframes(sheet, keyframes1, "lwid-1");
        injectKeyframes(sheet, keyframes2, "lwid-2");
        injectKeyframes(sheet, keyframes3, "border-disappear");
        injectKeyframes(
          sheet,
          `
      to {
        border-color: ${clientData?.data.circleBorderColor}
      }
      `,
          "border-turns-primary-from-white"
        );
        injectKeyframes(sheet, keyframes4, "ping");
      }
    }
  }, [clientData]);

  return (
    <>
      <div
        style={{
          ...widgetStyle,
          ...{
            ...(isOpen && { opacity: "0" }),
            backgroundColor: clientData?.data.circleBorderColor,
            animation: "ping 1s cubic-bezier(0, 0, 0.2, 1) 4",
          },
        }}
      ></div>
      <div
        style={{
          ...widgetStyle,
          ...(hovered && hoverStyle),
          ...(isOpen && { opacity: "0" }),
          ...{
            backgroundColor: clientData?.data.circleBorderColor,
            animation: "border-turns-primary-from-white 1s 3s forwards",
            border: "6px solid #fff",
            borderSpacing: "0px 0px",
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
                ? `linear-gradient(to bottom,  ${clientData?.data.circleBorderColor}, color-mix(in srgb, ${clientData?.data.circleBorderColor} 10%, transparent))`
                : "",
              opacity: 0.8,
              zIndex: "9999",
              transition: "all 0.3s ease-in-out 0.1s",
            }}
          />
        </div>

        <CircleComponent
          videoUrl={clientData?.data.videoUrl}
          posterUrl={clientData?.data.posterUrl}
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
            border: `7px solid ${clientData?.data.circleBorderColor}`,
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

function createStyleSheet() {
  const style = document.createElement("style");
  style.appendChild(document.createTextNode(""));
  const widget = document.getElementById("widget");
  if (widget) {
    widget.appendChild(style);
  } else {
    document.body.appendChild(style);
  }
  return style.sheet;
}

function injectKeyframes(
  sheet: CSSStyleSheet,
  keyframes: string,
  name: string
) {
  console.log(keyframes);
  const keyframesRule = `@keyframes ${name} { ${keyframes} }`;
  sheet?.insertRule(keyframesRule, sheet.cssRules.length);
}
