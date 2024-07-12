import React, { useEffect, useRef, useState } from "react";
import { ClientData } from "./Widget";
import Button from "./Button";
import MenuControls from "./MenuControls";
import ShareContainer from "./ShareContainer";
import PlayButton from "./PlayButton";
import ControlButton from "./ControlButton";
import { modalStyle, paragraphStyle } from "./Styles";

type ModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  clientData?: ClientData;
};

const Modal = ({ isOpen, closeModal, clientData }: ModalProps) => {
  const [isVideoPaused, setIsVideoPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isShown, setIsShown] = useState(false);
  const [shared, setShared] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const fillerRef = useRef<HTMLDivElement>(null);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (videoEl) {
      if (isOpen) {
        handlePlay();
        videoEl.currentTime = 0;
        videoEl.muted = false;
      } else {
        handlePause();
        videoEl.muted = true;
      }
    }
  }, [isOpen]);

  const isLg = windowSize.width >= 1024;
  const isMd = windowSize.width >= 768 && windowSize.width < 1024;
  const isSm = windowSize.width < 768;

  const handlePause = () => {
    videoRef.current?.pause();
    setIsVideoPaused(true);
  };

  const handlePlay = () => {
    videoRef.current?.play();
    setIsVideoPaused(false);
  };

  const handleToggleVideo = () =>
    videoRef.current?.paused ? handlePlay() : handlePause();

  const replayVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsVideoPaused(false);
    }
  };

  const handleFullScreen = () => {
    const el = modalRef.current;
    if (el) {
      if (el.requestFullscreen) {
        el.requestFullscreen();
      } else if ((el as any).mozRequestFullScreen) {
        (el as any).mozRequestFullScreen();
      } else if ((el as any).webkitRequestFullscreen) {
        (el as any).webkitRequestFullscreen();
      } else if ((el as any).msRequestFullscreen) {
        (el as any).msRequestFullscreen();
      }
    }
  };

  const handleExitFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch((err) => {
        console.error(
          `Error attempting to exit full-screen mode: ${err.message} (${err.name})`
        );
      });
    } else if ((document as any).mozFullScreenElement) {
      (document as any).mozCancelFullScreen();
    } else if ((document as any).webkitFullscreenElement) {
      (document as any).webkitExitFullscreen();
    } else if ((document as any).msFullscreenElement) {
      (document as any).msExitFullscreen();
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      videoRef.current.play();
      setIsVideoPaused(false);
    }
  };

  useEffect(() => {
    const currentVideoRef = videoRef.current;
    if (currentVideoRef) {
      currentVideoRef.addEventListener("timeupdate", updateProgress);
    }
    return () => {
      if (currentVideoRef) {
        currentVideoRef.removeEventListener("timeupdate", updateProgress);
      }
    };
  });

  const updateProgress = () => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      const progressPercent = (currentTime / duration) * 100;
      setProgress(progressPercent);
    }
  };

  const showMenu = () => {
    setIsShown(!isShown);
  };

  const toggleShared = () => {
    setShared(!shared);
  };

  const handleFillerClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (fillerRef.current && videoRef.current) {
      const fillerRect = fillerRef.current.getBoundingClientRect();
      const clickPosition = event.clientX - fillerRect.left;
      const newTime =
        (clickPosition / fillerRect.width) * videoRef.current.duration;
      videoRef.current.currentTime = newTime;
      setProgress((newTime / videoRef.current.duration) * 100);
    }
  };

  const handleCloseModal = () => {
    handleExitFullscreen();
    closeModal();
  };

  return (
    <div
      ref={modalRef}
      id="modal"
      style={{
        ...modalStyle,
        ...{
          height: isSm ? "95%" : "90%",
          left: isSm ? "20px" : "35px",
          width: isSm ? "85%" : "60%",
          pointerEvents: !isOpen ? "none" : "all",
          zIndex: !isOpen ? "-10" : "auto",
          opacity: !isOpen ? "0" : "1",
          transform: !isOpen ? "scale(0.3)" : "scale(1)",
          backgroundColor: clientData?.data.circleBorderColor ?? "#ffffff",
        },
      }}
    >
      {/* filler for video */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 20,
          position: "absolute",
          top: 0,
          color: "#FFFFFF",
          pointerEvents: "none",
          width: isSm ? "100%" : "60%",
        }}
      >
        <div
          ref={fillerRef}
          onClick={handleFillerClick}
          style={{
            width: "100%",
            height: "0.5rem",
            pointerEvents: "auto",
            transition: "height 0.2s",
            cursor: "pointer",
          }}
          onMouseEnter={() => {
            if (fillerRef.current) {
              fillerRef.current.style.height = "1rem";
            }
          }}
          onMouseLeave={() => {
            if (fillerRef.current) {
              fillerRef.current.style.height = "0.5rem";
            }
          }}
        >
          <div
            style={{
              borderTopRightRadius: "0.375rem",
              borderBottomRightRadius: "0.375rem",
              height: "100%",
              pointerEvents: "none",
              width: `${progress}%`,
              backgroundColor: `${clientData?.data.circleBorderColor}`,
            }}
          ></div>
        </div>
        {/* menu for video controls */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            pointerEvents: "none",
          }}
        >
          <MenuControls
            isLg={isLg}
            isMd={isMd}
            handleFullScreen={handleFullScreen}
            toggleMute={toggleMute}
            replayVideo={replayVideo}
            muted={videoRef?.current?.muted}
            closeModal={handleCloseModal}
            toggleShared={toggleShared}
          />
        </div>
      </div>
      {/* toggling play and pause video */}
      <div style={{ display: "flex", flexDirection: "row", height: "100%" }}>
        <div
          style={{
            width: isSm ? "100%" : "60%",
            height: "100%",
            overflow: "hidden",
            display: "flex",
            flexDirection: "row",
            backgroundColor: "#FFFFFF",
            position: "relative",
          }}
        >
          <div>
            <div
              onClick={handleToggleVideo}
              style={{
                position: "absolute",
                overflow: "hidden",
                backgroundColor: "#000000",
                top: "0px",
                right: "0px",
                borderRadius: "0px",
                width: "100%",
                height: "100%",
                transition: "all 0.4s ease 0s",
              }}
            >
              <video
                src={clientData?.data.videoUrl}
                poster={clientData?.data.posterUrl}
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
          </div>
          <PlayButton
            isShown={isShown}
            isVideoPaused={isVideoPaused}
            handleToggleVideo={handleToggleVideo}
            isMd={isMd}
            isLg={isLg}
          />

          {/* share option */}
          <div
            style={{
              transform: shared ? "translate(0%, 0%)" : "translate(0%, 100%)",
              background: `${clientData?.data.backgroundColor}` || "#FFFFFF",
              position: "absolute",
              zIndex: 50,
              width: "100%",
              borderTopLeftRadius: "0.75rem",
              borderTopRightRadius: "0.75rem",
              bottom: 0,
              left: 0,
              paddingTop: "0.25rem",
              paddingBottom: isSm ? "2rem" : "3rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              color: clientData?.data.title.color ?? "#000000",
              transition: "all 0.15s ease",
              borderTop:
                isSm && isShown
                  ? `1px solid ${clientData?.data.borderColor}`
                  : "",
            }}
          >
            <ShareContainer toggleShow={toggleShared} />
          </div>
        </div>
        {/* welcome and buttons */}
        <div
          style={{
            width: isSm ? "100%" : "40%",
            zIndex: isSm ? "30" : "auto",
            pointerEvents: "none",
            bottom: "64px",
            display: "flex",
            height: isSm ? "" : "100%",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            position: isSm ? "absolute" : "static",
            borderLeft: !isSm
              ? `1px solid ${clientData?.data.borderColor}`
              : "",
            background: clientData?.data.backgroundColor
              ? `${clientData?.data.backgroundColor}`
              : "#FFFFFF",
            borderTopLeftRadius: isSm ? "0.75rem" : "0",
            borderTopRightRadius: isSm ? "0.75rem" : "0",
            transition: "all 0.3s ease",
            ...(isSm
              ? {
                  transform: isShown ? "translateY(0%)" : "translateY(120%)",
                }
              : { transform: "translateY(0%)" }),
          }}
        >
          <div
            style={{
              height: "100%",
              width: "100%",
              pointerEvents: "auto",
              borderTopLeftRadius: isSm ? "0.75rem" : "0",
              borderTopRightRadius: isSm ? "0.75rem" : "0",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "flex-center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                alignItems: "center",
                color: "#6B7280",
                justifyContent: "flex-end",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "0.75rem",
                  marginTop: "1.25rem",
                  marginRight: "1.25rem",
                }}
              >
                <ControlButton
                  style={{
                    borderRadius: "0.75rem",
                    borderWidth: "0",
                    borderColor: "#D1D5DB",
                    padding: "0.625rem",
                    display: "flex",
                    transition: "background-color 0.15s ease",
                    // backgroundColor: "#ffffff",
                    cursor: "pointer",
                  }}
                  onClick={toggleShared}
                  backgroundStyle={{
                    hovered: "#e5e5e5",
                    unhovered: "#ffffff",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    style={{
                      width: "24px",
                      height: "24px",
                      color: "#000000",
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
                    ></path>
                  </svg>
                </ControlButton>
                <ControlButton
                  style={{
                    borderRadius: "0.75rem",
                    borderWidth: "0",
                    borderColor: "#D1D5DB",
                    padding: "0.625rem",
                    display: "flex",
                    transition: "background-color 0.15s ease",
                    // backgroundColor: "#ffffff",
                    cursor: "pointer",
                  }}
                  onClick={isSm ? showMenu : handleCloseModal}
                  backgroundStyle={{
                    hovered: "#e5e5e5",
                    unhovered: "#ffffff",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    style={{ width: "24px", height: "24px", color: "#000000" }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </ControlButton>
              </div>
            </div>

            {/* welcome part */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "100%",
                paddingBottom: isSm ? "1.5rem" : "0",
                justifyContent: "center",
                paddingLeft: "10%",
                paddingRight: "10%",
              }}
            >
              <div
                style={{
                  color: clientData?.data.title.color ?? "",
                  fontSize: "32px",
                  textAlign: "center",
                  fontWeight: 600,
                }}
              >
                {clientData?.data.title.text}
              </div>
              <p
                style={{
                  ...{
                    fontSize: "1rem",
                    color: "#6B7280",
                    marginTop: "5px",
                  },
                  ...paragraphStyle,
                }}
              >
                Where to next?
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
                  width: "100%",
                  maxWidth: "20rem",
                  marginTop: "10px",
                  gap: "0.75rem",
                }}
              >
                {clientData?.data.buttons &&
                  clientData.data.buttons.map((button, id) => (
                    <Button text={button.text} key={id} />
                  ))}
              </div>
            </div>
          </div>{" "}
          {/* footer if needed */}
          {/* <div
            style={{
              display: !isSm ? "flex" : "none",
              cursor: "pointer",
              flexDirection: "row",
              background: clientData?.data.backgroundColor ?? "#FFFFFF",
              alignItems: "center",
              color: clientData?.data.title.color ?? "#000000",
              height: "65px",
              borderTopWidth: "1px",
              borderTopColor: "#E5E7EB",
              width: "100%",
              position: "relative",
              zIndex: 20,
              justifyContent: "center",
              marginTop: "auto",
            }}
          >
            <div
              style={{
                opacity: "1",
                pointerEvents: "auto",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                position: "absolute",
                transition: "opacity 0.2s ease",
              }}
            >
              <p
                style={{...{
                  fontSize: "0.75rem",
                  color: "#9CA3AF",
                  marginRight: "0.25rem",
                  whiteSpace: "nowrap",
                }, ...paragraphStyle,
                }}
              >
                Powered by
              </p>
              <img
                style={{ height: "1.25rem", marginTop: "2px" }}
                src="https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/f1241207-f4a8-4e8a-030e-110332ad6200/public"
                alt=""
              />
            </div>
              </div> */}
        </div>
      </div>

      {/* show main menu on small screens */}
      <div
        onClick={showMenu}
        style={{
          background: clientData?.data.backgroundColor ?? "#ffffff",
          borderTop: `1px solid ${clientData?.data.borderColor}`,
          display: isSm ? "flex" : "none",
          cursor: "pointer",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          transition: "opacity 0.2s ease",
          minHeight: "64px",
          height: "64px",
          zIndex: 50,
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
          style={{
            width: "1.5rem",
            height: "1.5rem",
            fill: "#9CA3AF",
            marginRight: "0.75rem",
          }}
        >
          <path
            fillRule="evenodd"
            d="M1.46447 18.5355C2.92893 20 5.28595 20 10 20c4.714 0 7.0711 0 8.5355-1.4645C20 17.0711 20 14.714 20 10c0-4.71405 0-7.07107-1.4645-8.53553C17.0711 0 14.714 0 10 0 5.28595 0 2.92893 0 1.46447 1.46447 0 2.92893 0 5.28595 0 10c0 4.714 0 7.0711 1.46447 8.5355ZM16.75 14c0 .4142-.3358.75-.75.75H4c-.41421 0-.75-.3358-.75-.75s.33579-.75.75-.75h12c.4142 0 .75.3358.75.75ZM16 10.75c.4142 0 .75-.3358.75-.75 0-.41421-.3358-.75-.75-.75H4c-.41421 0-.75.33579-.75.75 0 .4142.33579.75.75.75h12ZM16.75 6c0 .41421-.3358.75-.75.75H4c-.41421 0-.75-.33579-.75-.75s.33579-.75.75-.75h12c.4142 0 .75.33579.75.75Z"
            clipRule="evenodd"
          ></path>
        </svg>
        <p
          style={{
            ...{
              fontSize: "0.875rem",
              fontWeight: 500,
              color: "#9CA3AF",
              marginLeft: "0.25rem",
              whiteSpace: "nowrap",
            },
            ...paragraphStyle,
          }}
        >
          Show Main Menu
        </p>
      </div>
    </div>
  );
};

export default Modal;
