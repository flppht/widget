import React from "react";

const CircleComponent = ({
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
      }}
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        controls={false}
        src={videoUrl}
        style={{
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
    </div>
  );
};

export default CircleComponent;
