import axios from "axios";
import React, { useEffect, useState } from "react";
import LeftArrow from "./LeftArrow";
import RightArrow from "./RightArrow";

interface CarouselItem {
  id: string;
  media_url: string;
  media_type: string;
  permalink: string;
  thumbnail_url?: string;
}

const ActivePost = ({
  username,
  caption,
  carouselMedia,
  token,
  thumbnailPhoto,
  type,
}: {
  username?: string;
  caption: string;
  carouselMedia?: { id: string }[];
  token?: string;
  thumbnailPhoto: string;
  type: string;
}) => {
  const [carousel, setCarousel] = useState<CarouselItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleRightArrowClick = () => {
    if (carousel)
      setCurrentIndex((prevIndex) =>
        prevIndex < carousel.length - 1 ? prevIndex + 1 : prevIndex
      );
  };

  const handleLeftArrowClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  useEffect(() => {
    const fetchDataFromCarousel = async () => {
      const fetchedData: CarouselItem[] = [];
      if (carouselMedia) {
        for (let i = 0; i < carouselMedia.length; i++) {
          try {
            const response = await axios.get(
              `https://graph.instagram.com/${carouselMedia[i].id}?fields=id,media_url,media_type,permalink&access_token=${token}`
            );
            fetchedData.push(response.data);
            if (fetchedData.length === 1) {
              setCarousel(fetchedData);
            }
          } catch (error) {
            console.error(
              "Error while fetching carousel data. Error: ",
              error.message
            );
          }
          setCarousel(fetchedData);
        }
      }
    };

    fetchDataFromCarousel();
  }, [token, carouselMedia]);

  if (!carousel.length && !thumbnailPhoto)
    return (
      <div
        style={{
          fontSize: "18px",
          position: "absolute",
          top: "50%",
          left: "40%",
        }}
      >
        Loading...
      </div>
    );

  const currentMedia = carousel[currentIndex] || {
    media_url: thumbnailPhoto,
    media_type: type,
  };

  const imgEl = (
    <img
      src={currentMedia.media_url}
      alt=""
      style={{
        height: "100%",
        width: "100%",
        objectFit: "cover",
      }}
    />
  );
  const videoEl = (
    <video
      src={currentMedia.media_url}
      muted={true}
      autoPlay={true}
      loop={true}
      style={{
        height: "100%",
        width: "100%",
        objectFit: "cover",
      }}
    ></video>
  );

  return (
    <>
      {currentMedia.media_type === "VIDEO" ? videoEl : imgEl}
      <p
        style={{
          position: "absolute",
          bottom: 0,
          left: "10px",
          backgroundColor: "white",
          color: "#525252",
          borderRadius: "10px",
          paddingRight: "8px",
          paddingLeft: "8px",
          paddingTop: "2px",
          paddingBottom: "2px",
          marginBottom: "10px",
          marginRight: "10px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontWeight: "600",
            color: "#363636",
            paddingRight: "6px",
          }}
        >
          {username}
        </span>{" "}
        {caption}
      </p>

      <div
        style={{
          display: "flex",
          position: "absolute",
          top: "45%",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        {carousel.length > 0 && (
          <>
            <LeftArrow handleLeftArrowClick={handleLeftArrowClick} />
            <RightArrow handleRightArrowClick={handleRightArrowClick} />
          </>
        )}
      </div>
    </>
  );
};

export default ActivePost;
