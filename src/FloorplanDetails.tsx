import React from "react";
import { FloorplanType } from "./Types";

const FloorplanDetails = ({
  data,
  activeComponent,
}: {
  data: FloorplanType | null;
  activeComponent: string;
}) => {
  return (
    <div
      style={{
        display: activeComponent === "floorplanDetails" ? "flex" : "none",
        flexDirection: "column",
        fontFamily: "Plus Jakarta Sans,sans-serif",
        marginTop: "5px",
      }}
    >
      <img
        src={data?.image}
        alt=""
        style={{ height: "320px", objectFit: "contain" }}
      />
      <div
        style={{
          padding: "5px 15px",
          display: "flex",
          flexDirection: "column",
          marginTop: "15px",
        }}
      >
        <div style={{ fontSize: "20px", fontWeight: "600", color: "#201f1e" }}>
          {data?.name}
        </div>
        <div
          style={{ color: "#3c4858", fontSize: "14px", marginBottom: "3px" }}
        >
          {data?.bedsCount ? data.bedsCount + " Bed(s)/" : ""}
          {data?.bathsCount} Bath(s)
        </div>
        <div
          style={{ color: "#3c4858", fontSize: "14px", marginBottom: "3px" }}
        >
          ${data?.price.min} - ${data?.price.max}
        </div>
        <div
          style={{ color: "#3c4858", fontSize: "14px", marginBottom: "3px" }}
        >
          {data?.size} {data?.sizeUnits}.
        </div>
        <div style={{ marginTop: "10px" }}>
          <div
            style={{
              width: "100%",
              padding: "9px 0px",
              fontSize: "15px",
              textAlign: "center",
              border: "1px solid #3898ec",
              background: "#3898ec",
              color: "#fff",
              cursor: "pointer",
              marginBottom: "10px",
            }}
          >
            Apply
          </div>
          <div
            style={{
              width: "100%",
              padding: "9px 0px",
              fontSize: "15px",
              textAlign: "center",
              border: "1px solid #3898ec",
              background: "transparent",
              color: "#3898ec",
              cursor: "pointer",
            }}
          >
            Schedule A Tour
          </div>
        </div>
        <button
          style={{
            marginTop: "12px",
            color: "rgb(100 116 139)",
            fontSize: "15px",
            border: "none",
            background: "none",
            cursor: "pointer",
          }}
        >
          Ask a question
        </button>
      </div>
    </div>
  );
};

export default FloorplanDetails;
