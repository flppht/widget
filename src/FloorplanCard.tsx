import React, { useState } from "react";

interface FloorplanCardProps {
  name: string;
  img: string;
  price: string;
  bedCount?: string | number;
  bathCount: string | number;
  opacity?: number;
}

const FloorplanCard = ({
  name,
  img,
  price,
  bedCount,
  bathCount,
  opacity,
}: FloorplanCardProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        marginBottom: "1rem",
        opacity: opacity ?? "1",
        borderRadius: "0.375rem",
        marginLeft: "auto",
        marginRight: "auto",
        padding: 0,
        cursor: "pointer",
        border: hovered ? "2px solid rgb(77, 138, 229)" : "1px solid #ebf0f5",
        transition: "all 0.2s ease-in-out",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          height: "140px",
          width: "140px",
          minWidth: "72px",
          marginRight: "22px",
        }}
      >
        <img
          src={img}
          style={{
            height: "150px",
            width: "100%",
            objectFit: "contain",
            borderRadius: "0.5rem",
            marginLeft: "8px",
          }}
          alt="flat"
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            fontSize: "23px",
            marginTop: "25px",
            fontWeight: "600",
            color: "rgb(0, 0, 0)",
            fontFamily: "Plus Jakarta Sans, sans-serif",
          }}
        >
          {name}
        </div>
        <div style={{ fontSize: "16px" }}>
          <svg
            style={{
              height: "16px",
              marginRight: "5px",
            }}
            viewBox="0 0 27 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.9375 11.8125H10.9688V18.1733H9.80047V16.0112C9.79912 14.7861 9.31189 13.6117 8.44569 12.7455C7.57949 11.8793 6.40505 11.392 5.18004 11.3906H2.53125V8.01562H0.84375V26.1562H2.53125V23.6386L24.4688 23.8141V26.1562H26.1562V16.0312C26.155 14.9128 25.7101 13.8404 24.9192 13.0495C24.1283 12.2587 23.056 11.8138 21.9375 11.8125ZM2.53125 13.0781H5.18004C5.95764 13.079 6.70313 13.3883 7.25297 13.9381C7.80281 14.488 8.11209 15.2335 8.11297 16.0111V18.1732H2.53125V13.0781ZM24.4688 22.1265L2.53125 21.951V19.8608H24.4688V22.1265ZM24.4688 18.1733H12.6562V13.5H21.9375C22.6086 13.5008 23.252 13.7677 23.7265 14.2422C24.2011 14.7168 24.468 15.3602 24.4688 16.0312V18.1733Z"
              fill="black"
            ></path>
          </svg>
          {bedCount} Bed(s){" "}
          <svg
            viewBox="0 0 23 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              marginTop: "6px",
              marginRight: "5px",
              height: "16px",
              marginLeft: "16px",
            }}
          >
            <g clipPath="url(#clip0_96_593)">
              <path
                d="M20.8438 12.5782H3.59375V4.4923C3.59292 4.18779 3.65249 3.88614 3.76903 3.60481C3.88556 3.32347 4.05674 3.06805 4.27265 2.85332L4.29062 2.83536C4.629 2.49747 5.06345 2.2723 5.53461 2.19059C6.00576 2.10889 6.49066 2.17464 6.92305 2.37886C6.51469 3.0578 6.34496 3.85375 6.44082 4.64022C6.53669 5.42668 6.89265 6.15855 7.45214 6.71953L7.94407 7.21147L7.03858 8.117L8.05499 9.1334L8.96048 8.22791L13.9778 3.21072L14.8832 2.30523L13.8668 1.28879L12.9613 2.19428L12.4693 1.70234C11.8803 1.115 11.1039 0.752939 10.2754 0.679255C9.4469 0.605572 8.61879 0.824935 7.9354 1.29912C7.21478 0.84402 6.36079 0.647551 5.51373 0.741986C4.66668 0.836421 3.87693 1.21614 3.27422 1.81877L3.25625 1.83674C2.90642 2.18466 2.62907 2.59851 2.44025 3.05434C2.25144 3.51016 2.15491 3.99892 2.15625 4.4923V12.5782H0.71875V14.0157H2.15625V15.3948C2.15622 15.5107 2.17491 15.6258 2.21159 15.7358L3.54883 19.7473C3.62019 19.962 3.75741 20.1489 3.941 20.2812C4.12459 20.4135 4.34521 20.4847 4.57152 20.4845H5.15101L4.62695 22.2814H6.12433L6.64844 20.4845H15.9967L16.5357 22.2814H18.0361L17.4971 20.4845H18.4283C18.6546 20.4847 18.8753 20.4136 19.0589 20.2813C19.2426 20.1489 19.3798 19.9621 19.4512 19.7473L20.7883 15.7358C20.825 15.6258 20.8437 15.5107 20.8438 15.3948V14.0157H22.2812V12.5782H20.8438ZM8.46867 2.71878C8.8647 2.32362 9.40131 2.10169 9.96077 2.10169C10.5202 2.10169 11.0568 2.32362 11.4529 2.71878L11.9447 3.21072L8.96061 6.19484L8.46867 5.70299C8.07353 5.30695 7.85161 4.77034 7.85161 4.21089C7.85161 3.65143 8.07353 3.11482 8.46867 2.71878ZM19.4062 15.3364L18.1695 19.047H4.83054L3.59375 15.3364V14.0157H19.4062V15.3364Z"
                fill="black"
              ></path>
            </g>
            <defs>
              <clipPath id="clip0_96_593">
                <rect width="23" height="23" fill="white"></rect>
              </clipPath>
            </defs>
          </svg>
          {bathCount} Bath(s)
        </div>
        <div
          style={{
            color: "rgb(77, 138, 229)",
            marginTop: "6px",
            fontSize: "16px",
          }}
        >
          Starting at <span style={{ fontWeight: "600" }}>{price}$</span>
        </div>
      </div>
    </div>
  );
};

export default FloorplanCard;
