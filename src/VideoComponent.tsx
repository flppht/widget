import React from "react";

const VideoComponent = ({
  videoUrl,
  posterUrl,
}: {
  videoUrl?: string;
  posterUrl?: string;
}) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        borderRadius: "9999px",
        position: "relative",
      }}
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        src={videoUrl}
        style={{
          position: "absolute",
          overflow: "hidden",
          borderRadius: "9999px",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          cursor: "pointer",
        }}
        poster={posterUrl}
      >
        Your browser does not support the video.
      </video>
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
      ></div>
    </div>
  );
};

export default VideoComponent;
