import React from "react";
import FloorplanCard from "./FloorplanCard";

const Floorplan = () => {
  return (
    <div
      style={{
        overflowY: "auto",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        maxHeight: "100%",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "50px",
          height: "30px",
          padding: "7px 15px",
          background: "#fff",
          borderBottom: "1px solid #e1e6ef",
          position: "sticky",
          top: 0,
          left: 0,
          right: 0,
        }}
      />
      <div style={{ overflowY: "auto", maxHeight: "100vh" }}>
        <div
          style={{
            padding: "11px 15px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "sticky",
              backgroundColor: "#fff",
              padding: "10px",
              borderBottom: "1px solid #e1e6ef",
            }}
          >
            <div
              style={{
                fontSize: "18px",
                fontWeight: 600,
                color: "#201f1e",
                lineHeight: 1.4,
                fontFamily: "Plus Jakarta Sans, sans-serif",
              }}
            >
              Floor Plans
            </div>
            <div
              style={{
                fontSize: "14px",
                fontWeight: "300",
                color: "#3c4858",
                fontFamily: "Plus Jakarta Sans, sans-serif",
                textAlign: "center",
                padding: "2px",
                textWrap: "pretty",
                width: "150px",
              }}
            >
              Browse the matching floor plans below.
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "1rem",
                marginTop: "0.5rem",
              }}
            >
              <div
                style={{
                  minWidth: "100px",
                  border: "1px solid #CBD5E0",
                  backgroundColor: "#F9FAFB",
                  borderRadius: "0.25rem",
                  paddingTop: "0.25rem",
                  paddingBottom: "0.25rem",
                  paddingLeft: "0.5rem",
                  paddingRight: "0.5rem",
                  cursor: "pointer",
                }}
              >
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "#9CA3AF",
                    margin: "0px",
                  }}
                >
                  # of beds
                </p>
                <p style={{ color: "#4B5563", margin: "0px" }}>Any</p>
              </div>
              <div
                style={{
                  minWidth: "100px",
                  border: "1px solid #CBD5E0",
                  backgroundColor: "#F9FAFB",
                  borderRadius: "0.25rem",
                  paddingTop: "0.25rem",
                  paddingBottom: "0.25rem",
                  paddingLeft: "0.5rem",
                  paddingRight: "0.5rem",
                  cursor: "pointer",
                }}
              >
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "#9CA3AF",
                    margin: "0px",
                  }}
                >
                  # of baths
                </p>
                <p style={{ color: "#4B5563", margin: "0px" }}>Any</p>
              </div>
              <div
                style={{
                  minWidth: "100px",
                  border: "1px solid #CBD5E0",
                  backgroundColor: "#F9FAFB",
                  borderRadius: "0.25rem",
                  paddingTop: "0.25rem",
                  paddingBottom: "0.25rem",
                  paddingLeft: "0.5rem",
                  paddingRight: "0.5rem",
                  cursor: "pointer",
                }}
              >
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "#9CA3AF",
                    whiteSpace: "nowrap",
                    margin: "0px",
                  }}
                >
                  Preferred Move-in Date
                </p>
                <p
                  style={{
                    color: "#4B5563",
                    whiteSpace: "nowrap",
                    margin: "0px",
                  }}
                >
                  Any
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  cursor: "pointer",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <svg
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                </svg>
                <p>Filter</p>
              </div>
            </div>
          </div>
          <div style={{ marginTop: "14px" }}>
            <FloorplanCard
              name={"A1"}
              price={"1499"}
              bedCount={1}
              bathCount={1}
              img={
                "https://medialibrarycf.entrata.com/15647/MLv3/4/23/2022/3/22/8613/5ef10399d44421.61631292994.jpg"
              }
            />
            <FloorplanCard
              name={"B1"}
              price={"2325"}
              bedCount={2}
              bathCount={2}
              img={
                "https://medialibrarycf.entrata.com/15647/MLv3/4/23/2022/3/22/8614/5ef10406ca8548.79921677578.jpg"
              }
            />

            <FloorplanCard
              name={"B2"}
              price={"2325"}
              bedCount={2}
              bathCount={2}
              img={
                "https://medialibrarycf.entrata.com/15647/MLv3/4/23/2022/3/22/8615/5ef1048745f319.20165872767.jpg"
              }
            />

            <FloorplanCard
              name={"S1"}
              price={"2150"}
              bathCount={1}
              img={
                "https://medialibrarycf.entrata.com/15647/MLv3/4/23/2022/3/22/9259/60a7f5c48c5067.59587048393.jpg"
              }
            />
          </div>
          <div style={{ marginTop: "2rem" }}>
            <h1 style={{ fontSize: "24px", fontWeight: "600" }}>
              Not seeing what you're looking for?
            </h1>
            <p style={{ color: "rgb(107 114 128)" }}>
              We have a few more floor plans that we can waitlist you for:
            </p>
          </div>
          <div className="plans-list">
            <FloorplanCard
              name={"S2"}
              price={"1524"}
              bathCount={1}
              img={
                "https://medialibrarycf.entrata.com/15647/MLv3/4/23/2022/3/22/9259/60a7f5c48c5067.59587048393.jpg"
              }
              opacity={0.5}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Floorplan;
