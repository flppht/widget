import React from "react";
import FloorplanCard from "./FloorplanCard";
import { ClientData, FloorplanType } from "./Types";
import dayjs, { Dayjs } from "dayjs";

const ListOfFloorplans = ({
  dataToShow,
  restData,
  showFilter,
  showDetails,
  activeComponent,
  bedFilter,
  bathFilter,
  dateFilter,
}: {
  dataToShow?: FloorplanType[];
  restData?: FloorplanType[];
  showFilter: () => void;
  showDetails: (data: FloorplanType) => void;
  activeComponent: string;
  bedFilter: number;
  bathFilter: number;
  dateFilter?: string;
}) => {
  return (
    <div
      style={{
        padding: "11px 15px",
        display: activeComponent === "listFloorplans" ? "flex" : "none",
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
            onClick={showFilter}
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
            <p style={{ color: "#4B5563", margin: "0px" }}>
              {bedFilter === 0 ? "Any" : bedFilter}
            </p>
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
            onClick={showFilter}
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
            <p style={{ color: "#4B5563", margin: "0px" }}>
              {bathFilter === 0 ? "Any" : bathFilter}
            </p>
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
            onClick={showFilter}
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
              {dateFilter === dayjs(new Date()).format("MM/DD/YYYY")
                ? "Any"
                : dateFilter}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              cursor: "pointer",
              alignItems: "center",
              gap: "0.5rem",
            }}
            onClick={showFilter}
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
        {dataToShow &&
          dataToShow.map((floorplan, id) => (
            <FloorplanCard
              name={floorplan.name}
              price={floorplan.price}
              bedCount={floorplan?.bedsCount}
              bathCount={floorplan.bathsCount}
              img={floorplan.image}
              key={id}
              handleClick={() => showDetails(floorplan)}
            />
          ))}
      </div>
      <div style={{ marginTop: "2rem" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "600" }}>
          Not seeing what you're looking for?
        </h1>
        <p style={{ color: "rgb(107 114 128)" }}>
          We have a few more floor plans that we can waitlist you for:
        </p>
      </div>
      <div>
        {restData &&
          restData.map((floorplan, id) => (
            <FloorplanCard
              name={floorplan.name}
              price={floorplan.price}
              bedCount={floorplan?.bedsCount}
              bathCount={floorplan.bathsCount}
              img={floorplan.image}
              key={id}
              handleClick={() => showDetails(floorplan)}
              opacity={0.5}
            />
          ))}
      </div>
    </div>
  );
};

export default ListOfFloorplans;
