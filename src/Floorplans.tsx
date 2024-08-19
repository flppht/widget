import React, { useState } from "react";
import { ClientData, FloorplanType } from "./Types";
import FloorplanDetails from "./FloorplanDetails";
import FilterFloorplans from "./FilterFloorplans";
import { Dayjs } from "dayjs";
import ListOfFloorplans from "./ListOfFloorplans";

export interface DetailsData {
  data: FloorplanType | null;
  status: boolean;
}

const Floorplans = ({
  clientData,
  isSm,
}: {
  clientData?: ClientData;
  isSm: boolean;
}) => {
  const [activeComponent, setActiveComponent] = useState("listFloorplans");
  const [detailsData, setDetailsData] = useState<FloorplanType | null>(null);
  const [dataToShow, setDataToShow] = useState<FloorplanType[] | undefined>(
    clientData?.property.floorplans
  );
  const [restData, setRestData] = useState<FloorplanType[] | undefined>();

  const [bedFilter, setBedFilter] = useState(0);
  const [bathFilter, setBathFilter] = useState(0);
  const [dateFilter, setDateFilter] = useState<string | undefined>("Any");

  const handleBedFilter = (value: number) => setBedFilter(value);
  const handleBathFilter = (value: number) => setBathFilter(value);

  const toggleToListFloorplans = () => setActiveComponent("listFloorplans");
  const toggleToFloorplanDetails = () => setActiveComponent("floorplanDetails");
  const toggleToFilterFloorplans = () => setActiveComponent("filterFloorplans");

  const showFilter = () => {
    toggleToFilterFloorplans();
  };

  const applyFilter = (
    filteredData: FloorplanType[] | undefined,
    remainingData: FloorplanType[] | undefined,
    date: Dayjs | null | undefined
  ) => {
    setDataToShow(filteredData);
    setRestData(remainingData);
    setDateFilter(date?.format("MM/DD/YYYY"));
    toggleToListFloorplans();
  };

  const showDetails = (data: FloorplanType) => {
    setDetailsData(data);
    toggleToFloorplanDetails();
  };

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
      >
        {activeComponent === "floorplanDetails" && (
          <div
            style={{
              marginTop: "12px",
              display: "flex",
              alignItems: "center",
              marginLeft: "0.125rem",
              fontSize: "16px",
              color: "#3898ec",
              cursor: "pointer",
            }}
            onClick={toggleToListFloorplans}
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 16 16"
              height="28"
              width="28"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
              ></path>
            </svg>{" "}
            <span>Go Back</span>
          </div>
        )}
      </div>
      <div
        style={{
          overflowY: "auto",
          maxHeight: "100vh",
          marginBottom: isSm ? "60px" : "unset",
        }}
      >
        <ListOfFloorplans
          dataToShow={dataToShow}
          restData={restData}
          showDetails={showDetails}
          showFilter={showFilter}
          activeComponent={activeComponent}
          bedFilter={bedFilter}
          bathFilter={bathFilter}
          dateFilter={dateFilter}
        />
        <FilterFloorplans
          floorplans={clientData?.property.floorplans}
          applyFilter={applyFilter}
          activeComponent={activeComponent}
          bathFilter={bathFilter}
          bedFilter={bedFilter}
          handleBathFilter={handleBathFilter}
          handleBedFilter={handleBedFilter}
        />
        <FloorplanDetails
          data={detailsData}
          activeComponent={activeComponent}
        />
      </div>
    </div>
  );
};

export default Floorplans;
