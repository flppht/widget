import axios from "axios";
import React, { useEffect, useState } from "react";
import { InstagramAccessToken } from "./Types";
import ActivePost from "./ActivePost";

interface Post {
  id: string;
  caption: string;
  media_url: string;
  media_type: string;
  permalink: string;
  thumbnail_url: string;
  username: string;
  children?: {
    data: {
      id: string;
    }[];
  };
}

interface ActiveMedia {
  id: number | null;
  status: boolean;
}

interface InstagramFeedProps {
  accessToken?: InstagramAccessToken;
  handleSetAccessToken: (data: any) => void;
  toggleShowInstagram: () => void;
  isMd: boolean;
  isSm: boolean;
}

const InstagramFeed = ({
  accessToken,
  handleSetAccessToken,
  toggleShowInstagram,
  isMd,
  isSm,
}: InstagramFeedProps) => {
  const [posts, setPosts] = useState<Post[]>();
  const [hovered, setHovered] = useState<ActiveMedia>();
  const [isActive, setIsActive] = useState<ActiveMedia>({
    id: null,
    status: false,
  });

  useEffect(() => {
    const refreshToken = async () => {
      try {
        let response = await axios.get(
          `${process.env.REACT_APP_IG_AUTH_URL}/refreshtoken?userId=${accessToken?.clientId}`
        );

        if (response.status === 200) {
          let res = await axios.get(
            `${process.env.REACT_APP_IG_AUTH_URL}/token/${accessToken?.clientId}`
          );
          handleSetAccessToken(res.data);
        }
      } catch (error) {
        console.error(
          "Error while refreshing instagram token. Error:",
          error.message
        );
      }
    };

    const fetchFeed = async () => {
      if (accessToken) {
        // if it expires less than 5 day
        if (
          accessToken.expiresIn &&
          accessToken.expiresIn - 5 * 86400000 < new Date().getTime()
        ) {
          await refreshToken();
        }

        fetch(
          `https://graph.instagram.com/me/media?fields=id,caption,media_url,media_type,permalink,thumbnail_url,username,children&access_token=${accessToken?.token}`
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error(
                "Network response was not ok " + response.statusText
              );
            }
            return response.json();
          })
          .then((data) => {
            setPosts(data.data);
          })
          .catch((error) => {
            console.error(
              "There was a problem with the fetch operation: ",
              error
            );
          });
      }
    };
    fetchFeed();
  }, [accessToken]);

  const handleClick = (index) => {
    setIsActive({ id: index, status: true });
  };

  const handleXClick = () => {
    setIsActive({ id: null, status: false });
  };

  const username = posts && posts[0].username;
  const profileUrl = "https://instagram.com/" + username;
  const postEls =
    posts &&
    posts.map((post, index) => {
      // IMAGE or CAROUSEL_ALBUM
      let mediaEl = (
        <img
          src={post.media_url}
          alt=""
          style={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
            transform:
              hovered?.id === index && hovered.status && isActive?.id !== index
                ? "scale(1.1)"
                : "scale(1)",
            transition: "all 0.3s ease",
          }}
          onClick={() => handleClick(index)}
        />
      );

      // VIDEO
      if (post.media_type === "VIDEO") {
        mediaEl = (
          <video
            poster={post.thumbnail_url}
            src={post.media_url}
            muted={true}
            autoPlay={true}
            loop={true}
            style={{
              height: "100%",
              width: "100%",
              objectFit: "cover",
              transform:
                hovered?.id === index &&
                hovered.status &&
                isActive?.id !== index
                  ? "scale(1.1)"
                  : "scale(1)",
              transition: "all 0.3s ease",
            }}
            onClick={() => handleClick(index)}
          ></video>
        );
      }

      return (
        <div
          style={{
            width:
              isActive?.id === index && isActive?.status
                ? isSm
                  ? "300px"
                  : isMd
                  ? "240px"
                  : "350px"
                : isSm
                ? "145px"
                : isMd
                ? "110px"
                : "170px",
            height:
              isActive?.id === index && isActive?.status
                ? isSm
                  ? "300px"
                  : isMd
                  ? "240px"
                  : "350px"
                : isSm
                ? "145px"
                : isMd
                ? "110px"
                : "170px",
            position: "relative",
            overflow: "hidden",
            borderRadius: "4px",
            gridColumn:
              isActive?.id === index && isActive?.status ? "span 2" : "",
            cursor: isActive?.id !== index ? "pointer" : "",
          }}
          key={index}
          data-index={index}
          onMouseEnter={() => setHovered({ id: index, status: true })}
          onMouseLeave={() => setHovered({ id: index, status: false })}
        >
          {/* overlay */}
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              zIndex: "20",
              background: "rgba(0,0,0,0.3)",
              transition: "all 0.3s ease",
              pointerEvents: "none",
              opacity:
                hovered?.id === index &&
                hovered.status &&
                isActive?.id !== index
                  ? "1"
                  : "0",
            }}
          >
            <svg
              fill="#ffffff"
              xmlns="http://www.w3.org/2000/svg"
              width="20px"
              height="20px"
              viewBox="0 0 45.964 45.964"
              transform="matrix(-1, 0, 0, 1, 0, 0)"
              stroke="#ffffff"
              style={{
                position: "absolute",
                top: "45%",
                left: "42%",
              }}
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke="#CCCCCC"
                strokeWidth="0.183856"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <g>
                  <g>
                    <path d="M7.071,30.834V11.062H4.042C1.803,11.062,0,12.893,0,15.13v26.732c0,2.24,1.803,4.051,4.042,4.051h26.733 c2.238,0,4.076-1.811,4.076-4.051v-2.92H15.179C10.733,38.943,7.071,35.281,7.071,30.834z"></path>{" "}
                    <path d="M41.913,0.05H15.179c-2.238,0-4.066,1.813-4.066,4.051v26.733c0,2.241,1.829,4.067,4.066,4.067h26.734 c2.237,0,4.051-1.826,4.051-4.067V4.102C45.964,1.862,44.15,0.05,41.913,0.05z M41.363,28.589 c-0.223,0.412-0.652,0.656-1.12,0.656H17.336c-0.403,0-0.782-0.18-1.022-0.502c-0.24-0.324-0.313-0.736-0.197-1.123l3.277-10.839 c0.216-0.713,0.818-1.24,1.554-1.361c0.736-0.12,1.476,0.19,1.908,0.797l4.582,6.437c0.617,0.867,1.812,1.082,2.689,0.484 l4.219-2.865c0.434-0.295,0.967-0.402,1.48-0.299c0.515,0.102,0.966,0.408,1.253,0.848l4.229,6.472 C41.564,27.687,41.585,28.179,41.363,28.589z"></path>{" "}
                  </g>
                </g>
              </g>
            </svg>
          </div>
          {isActive.id === index && isActive.status && (
            <button
              onClick={handleXClick}
              style={{
                borderWidth: 0,
                cursor: "pointer",
                background: "none",
                position: "absolute",
                top: "10px",
                right: "10px",
                zIndex: "50",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                style={{
                  width: "1.5rem",
                  height: "1.5rem",
                  color: "#ffffff",
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          )}
          {isActive.id === index && isActive.status ? (
            <ActivePost
              username={username}
              caption={post.caption}
              carouselMedia={post.children?.data}
              token={accessToken?.token}
              thumbnailPhoto={post.media_url}
              type={post.media_type}
            />
          ) : (
            mediaEl
          )}
        </div>
      );
    });

  return (
    <div
      style={{
        width: "100%",
        height: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        boxSizing: "border-box",
        marginTop: "12px",
        marginBottom: "0px",
        overflowY: "auto",
      }}
    >
      <div
        style={{
          width: isSm ? "270px" : isMd ? "230px" : "320px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <img
          src="https://1000logos.net/wp-content/uploads/2017/02/Logo-Instagram-1.png"
          alt="logo"
          style={{ height: "55px" }}
        />
        <button
          onClick={toggleShowInstagram}
          style={{
            borderWidth: 0,
            cursor: "pointer",
            background: "none",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            style={{
              width: "1.5rem",
              height: "1.5rem",
              color: "#000000",
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>
      <div
        style={{
          height: "100%",
          width: "auto",
          display: "grid",
          placeItems: "center",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: "10px",
          paddingTop: "6px",
          paddingBottom: "6px",
          overflowY: "auto",
        }}
      >
        {posts ? postEls : <div style={{ height: "200vh" }}></div>}
        <div
          style={{ width: "120px", textAlign: "center", textWrap: "pretty" }}
        >
          See more on{" "}
          <span style={{ textDecoration: "underline" }}>
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              @{username}
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default InstagramFeed;
