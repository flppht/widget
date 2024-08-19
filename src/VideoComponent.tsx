import React from "react";
import PlayButton from "./PlayButton";
import { PageData } from "./Modal";
import PlanButton from "./PlanButton";
interface VideoProps {
  currentData: PageData;
  handleToggleVideo: () => void;
  videoRef: React.RefObject<HTMLVideoElement>;
  isVideoPaused: boolean;
  isLg: boolean;
  isSm: boolean;
  isShownMenu: boolean;
  isShownInstagram: boolean;
  isShownFloorplan: boolean;
}
const VideoComponent = ({
  currentData,
  handleToggleVideo,
  videoRef,
  isVideoPaused,
  isSm,
  isLg,
  isShownMenu,
  isShownInstagram,
  isShownFloorplan,
}: VideoProps) => {
  return (
    <>
      <div
        onClick={handleToggleVideo}
        style={{
          position: "absolute",
          overflow: "hidden",
          backgroundColor: "#000000",
          top: isShownFloorplan ? "70px" : "0px",
          right: isShownFloorplan ? "20px" : "0px",
          borderRadius: isShownFloorplan ? "15px" : "0px",
          width: isShownFloorplan ? "100px" : "100%",
          height: isShownFloorplan ? "100px" : "100%",
          transition: "all 0.4s ease 0s",
        }}
      >
        <video
          src={currentData.videoUrl}
          // poster={clientData?.property.coverImage}
          playsInline
          autoPlay
          loop
          ref={videoRef}
          style={{
            zIndex: "10",
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            cursor: "pointer",
          }}
        ></video>
        <div
          style={{
            opacity: isVideoPaused ? "0.4" : "0",
            transition: "opacity 0.2s ease 0s",
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "#000000",
            zIndex: 10,
            pointerEvents: "none",
          }}
        ></div>
      </div>
      <PlayButton
        isShownMenu={isShownMenu}
        isShownInstagram={isShownInstagram}
        isShownFloorplan={isShownFloorplan}
        isVideoPaused={isVideoPaused}
        handleToggleVideo={handleToggleVideo}
        isSm={isSm}
      />
      {/* plans */}
      {/* gradient behind the plans  */}
      {!isShownFloorplan && (
        <>
          <div
            style={{
              opacity: "0.5",
              transition: "all 0.2s ease 0s",
              position: "absolute",
              left: 0,
              top: 0,
              width: "100%",
              height: "100%",
              zIndex: 10,
              pointerEvents: "none",
              backgroundImage:
                "linear-gradient(to top, rgba(0,0,0,100), rgba(0, 0, 0, 0))",
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              zIndex: 10,
              width: "100%",
              pointerEvents: "none",
              bottom: 0,

              display: "flex",
              flexDirection: "column",
              color: "white",
              transition: "transform 0.3s",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                paddingLeft: isLg ? "1.5rem" : "1rem",
                paddingRight: isLg ? "1.5rem" : "1rem",
                fontSize: "20px",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                style={{
                  width: "20px",
                  height: "20px",
                  marginRight: "8px",
                }}
              >
                <path
                  fillRule="evenodd"
                  d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z"
                  clipRule="evenodd"
                ></path>
              </svg>
              {currentData.location}
            </div>
            <p
              style={{
                fontSize: "1rem",
                color: "white",
                marginTop: "10px",
                marginBottom: "10px",
                paddingLeft: isLg ? "1.5rem" : "1rem",
              }}
            >
              Where to next?
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: "0.5rem",
                paddingLeft: isLg ? "1.5rem" : "1rem",
                paddingRight: isLg ? "1.5rem" : "1rem",
                paddingTop: "0.5rem",
                paddingBottom: "1.5rem",
                marginBottom: isSm ? "70px" : 0,
              }}
            >
              {currentData.buttons &&
                currentData.buttons.map((button, index) => (
                  <PlanButton
                    order={String.fromCharCode("A".charCodeAt(0) + index)}
                    text={button.text}
                    onClick={button.onClick}
                    isLg={isLg}
                    key={index}
                  />
                ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default VideoComponent;
