import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";
import MenuControls from "./MenuControls";
import ShareContainer from "./ShareContainer";
import ControlButton from "./ControlButton";
import { modalStyle, paragraphStyle } from "./Styles";
import Floorplan from "./Floorplan";
import InstagramFeed from "./InstagramFeed";
import VideoComponent from "./VideoComponent";
import { ClientData, InstagramAccessToken } from "./Types";
import useGTM from "./useGTM";

type ModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  clientData?: ClientData;
  accessToken?: InstagramAccessToken;
  handleSetAccessToken: (data: any) => void;
};

export type PageData = {
  isWelcomePage: boolean;
  videoUrl?: string | undefined;
  title?: string;
  location: string;
  buttons: {
    text: string;
    onClick?: () => void;
  }[];
};

const Modal = ({
  isOpen,
  closeModal,
  clientData,
  accessToken,
  handleSetAccessToken,
}: ModalProps) => {
  const [isVideoPaused, setIsVideoPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isShownMenu, setIsShownMenu] = useState(false);
  const [shared, setShared] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const fillerRef = useRef<HTMLDivElement>(null);
  const [playPromise, setPlayPromise] = useState<Promise<void> | undefined>();
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [showFloorplan, setShowFloorplan] = useState(false);
  const [isShownInstagram, setIsShownInstagram] = useState(false);
  const [isShownVideoComponent, setIsShownVideoComponent] = useState(true);
  const pushEventToDataLayer = useGTM();

  const initialData: PageData = {
    isWelcomePage: true,
    videoUrl: clientData?.property.coverVideo,
    title: "Welcome to " + clientData?.property.name,
    location:
      clientData?.property.location.city +
      ", " +
      clientData?.property.location.state,
    buttons: [
      {
        text: "Tour our Floor Plan",
        onClick: () => {
          handleChangeContent(initialData, tourFloorData);
        },
      },
      { text: "Explore Amenities" },
      { text: "中文导览" },
    ],
  };

  const tourFloorData: PageData = {
    isWelcomePage: false,
    videoUrl:
      "https://storage.googleapis.com/leasemagnets---dummy-db.appspot.com/community/43/magnet/9a4d7524-71d5-41e3-83aa-6d93b33a64c5/category/floor_plans/screen/b1/Vue53_2x2%20fp_2023.mp4??&coconut_id=lNhpx1rEriMbw3",
    title: "",
    location: "2 Bed + 2 Bath",
    buttons: [
      { text: "Tour Floor Plan in 3D" },
      { text: "Explore Amenities" },
      {
        text: "Wrap Up My Tour",
        onClick: () => {
          handleChangeContent(tourFloorData, wrapUpData);
        },
      },
    ],
  };

  const wrapUpData: PageData = {
    isWelcomePage: false,
    videoUrl:
      "https://storage.googleapis.com/leasemagnets---dummy-db.appspot.com/community/43/magnet/9a4d7524-71d5-41e3-83aa-6d93b33a64c5/category/thank_you/screen/thank_you_main/Vue53_closing_2023.mp4?",
    title: "Thanks for Touring With Us!",
    location:
      clientData?.property.location.city +
      ", " +
      clientData?.property.location.state,
    buttons: [
      { text: "Ask a Question" },
      { text: "Schedule a Tour" },
      { text: "View Available Floor Plans" },
    ],
  };

  const [currentData, setCurrentData] = useState(initialData);
  const [history, setHistory] = useState<PageData[]>([]);

  const handleChangeContent = (previousData, nextData: PageData) => {
    setHistory((prev) => [...prev, previousData]);
    setCurrentData(nextData);
    if (videoRef.current?.paused) {
      setIsVideoPaused(false);
    }
  };

  const handleRevertContent = () => {
    if (history.length > 0) {
      const previousContent = history[history.length - 1];
      setHistory((prevHistory) => prevHistory.slice(0, -1));
      setCurrentData(previousContent);
    }
    if (videoRef.current?.paused) {
      setIsVideoPaused(false);
    }
  };

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
    if (playPromise !== undefined) {
      playPromise
        .then((_) => videoRef.current?.pause())
        .catch((error) => console.log("autoplay prevented"));
    }

    setIsVideoPaused(true);
  };

  const handlePlay = () => {
    let playPromise = videoRef.current?.play();
    setPlayPromise(playPromise);
    setIsVideoPaused(false);
  };

  const handleToggleVideo = () =>
    videoRef.current?.paused ? handlePlay() : handlePause();

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
    const currentVideoRef = videoRef.current;
    if (currentVideoRef) {
      currentVideoRef.muted = !currentVideoRef.muted;
      if (currentVideoRef.paused) {
        currentVideoRef.play();
        setIsVideoPaused(false);
      }
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
    setIsShownMenu(!isShownMenu);
  };

  const toggleShared = () => {
    setShared(!shared);
  };

  const toggleShowFloorplan = () => {
    // only fire when it renders floorplan
    if (!showFloorplan)
      pushEventToDataLayer(clientData?.id + " show_floorplan", {
        event_category: "button",
        event_action: "click",
        event_label: "floorplan_button",
      });
    setShowFloorplan(!showFloorplan);
    if (videoRef.current?.paused) {
      setIsVideoPaused(false);
    }
    setIsShownVideoComponent((prev) => !prev);
  };

  const toggleShowInstagram = () => {
    setIsShownInstagram(!isShownInstagram);
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
          left:
            clientData?.ui.position === "left"
              ? isSm
                ? "20px"
                : "35px"
              : "unset",
          right:
            clientData?.ui.position === "right"
              ? isSm
                ? "20px"
                : "35px"
              : "unset",
          width: isSm ? "85%" : "60%",
          pointerEvents: !isOpen ? "none" : "all",
          zIndex: !isOpen ? "-10" : "auto",
          opacity: !isOpen ? "0" : "1",
          transform: !isOpen ? "scale(0.3)" : "scale(1)",
          transformOrigin: `${clientData?.ui.position} bottom`,
          backgroundColor: "var(--primary-color)",
        },
      }}
    >
      {/* filler for video  */}
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
              backgroundColor: "var(--primary-color)",
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
            goBack={currentData.isWelcomePage ? undefined : handleRevertContent}
            muted={videoRef?.current?.muted}
            closeModal={handleCloseModal}
            toggleShared={toggleShared}
            toggleShowInstagram={toggleShowInstagram}
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
          {showFloorplan ? <Floorplan /> : null}

          {isShownVideoComponent ? (
            <VideoComponent
              isLg={isLg}
              isSm={isSm}
              isShownMenu={isShownMenu}
              currentData={currentData}
              handleToggleVideo={handleToggleVideo}
              videoRef={videoRef}
              isVideoPaused={isVideoPaused}
              isShownInstagram={isShownInstagram}
            />
          ) : null}

          {/* instagram  */}
          <div
            style={{
              transform: isShownInstagram
                ? "translate(0%, 0%)"
                : "translate(0%, 100%)",
              background:
                clientData?.ui.colors.background.secondary || "#FFFFFF",
              position: "absolute",
              zIndex: 20,
              width: "100%",
              height: "70%",
              borderTopLeftRadius: "0.75rem",
              borderTopRightRadius: "0.75rem",
              bottom: isSm ? "64px" : 0,
              left: 0,
              paddingBottom: isSm ? "1rem" : "2rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              color: clientData?.ui.colors.text.heading ?? "#000000",
              transition: "all 0.3s ease",
            }}
          >
            <InstagramFeed
              accessToken={accessToken}
              handleSetAccessToken={handleSetAccessToken}
              toggleShowInstagram={toggleShowInstagram}
            />
          </div>

          {/* share option */}
          <div
            style={{
              transform: shared ? "translate(0%, 0%)" : "translate(0%, 100%)",
              background:
                clientData?.ui.colors.background.secondary || "#FFFFFF",
              position: "absolute",
              zIndex: 50,
              width: "100%",
              borderTopLeftRadius: "0.75rem",
              borderTopRightRadius: "0.75rem",
              bottom: isSm ? "64px" : 0,
              left: 0,
              paddingTop: "0.25rem",
              paddingBottom: isSm ? "2rem" : "3rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              color: clientData?.ui.colors.text.heading ?? "#000000",
              transition: "all 0.15s ease",
              borderTop:
                isSm && isShownMenu
                  ? `1px solid ${clientData?.ui.colors.background.tertiary}`
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
              ? `1px solid ${clientData?.ui.colors.background.tertiary}`
              : "",
            background: clientData?.ui.colors.background.secondary ?? "#FFFFFF",
            borderTopLeftRadius: isSm ? "0.75rem" : "0",
            borderTopRightRadius: isSm ? "0.75rem" : "0",
            transition: "all 0.3s ease",
            ...(isSm
              ? {
                  transform: isShownMenu
                    ? "translateY(0%)"
                    : "translateY(120%)",
                }
              : { transform: "translateY(0%)" }),
            borderTop:
              isSm && isShownInstagram
                ? `1px solid ${clientData?.ui.colors.background.tertiary}`
                : "",
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
                paddingBottom: "1rem",
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
                    style={{
                      width: "24px",
                      height: "24px",
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
                  color: clientData?.ui.colors.text.heading ?? "",
                  fontSize: "32px",
                  textAlign: "center",
                  fontWeight: 600,
                }}
              >
                {currentData.title}
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
                {/* {clientData?.data.buttons &&
                  clientData.data.buttons.map((button, id) => (
                    <Button text={button.text} key={id} />
                  ))} */}
                <Button text={"Book a Tour"} />
                <Button
                  text={"Check availability"}
                  handleClick={toggleShowFloorplan}
                />
                <Button text={"Get in Touch"} />
                {!currentData.isWelcomePage && (
                  <Button
                    text={"Restart Tour"}
                    handleClick={() => {
                      setCurrentData(initialData);
                      setHistory([]);
                      setIsVideoPaused(false);
                    }}
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                        <path d="M3 3v5h5"></path>
                      </svg>
                    }
                  />
                )}
              </div>
            </div>
          </div>{" "}
          {/* footer if needed */}
          <div
            style={{
              display: !isSm ? "flex" : "none",
              // cursor: "pointer",
              flexDirection: "row",
              alignItems: "center",
              color: "#ffffff",
              height: "65px",
              borderTop: "1px solid",
              borderTopColor:
                clientData?.ui.colors.background.tertiary ?? "#000000",
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
                style={{
                  fontSize: "14px",
                  color: clientData?.ui.colors.text.heading ?? "#000000",
                  marginTop: "14px",
                  marginBottom: "14px",
                  whiteSpace: "nowrap",
                }}
              >
                Powered by
              </p>
              <img
                style={{
                  height: "1.25rem",
                  marginTop: "2px",
                  paddingLeft: "5px",
                }}
                src="https://imagedelivery.net/d3WSibrZmE8m_HEZW60OcQ/f1241207-f4a8-4e8a-030e-110332ad6200/public"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>

      {/* show main menu on small screens */}
      <div
        onClick={showMenu}
        style={{
          background: clientData?.ui.colors.background.secondary ?? "#ffffff",
          borderTop: "1px solid",
          borderTopColor:
            clientData?.ui.colors.background.tertiary ?? "#000000",
          display: isSm ? "flex" : "none",
          cursor: "pointer",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          transition: "opacity 0.2s ease",
          minHeight: "64px",
          height: "64px",
          zIndex: 50,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
          style={{
            width: "1.5rem",
            height: "1.5rem",
            color: "#9CA3AF",
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
