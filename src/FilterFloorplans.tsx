import React, { useState } from "react";
import { itemFilter } from "./Styles";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { FloorplanType } from "./Types";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";

const FilterFloorplans = ({
  floorplans,
  applyFilter,
  activeComponent,
  bedFilter,
  bathFilter,
  handleBedFilter,
  handleBathFilter,
}: {
  floorplans?: FloorplanType[];
  applyFilter: (
    filteredData?: FloorplanType[],
    remainingData?: FloorplanType[],
    date?: Dayjs | null
  ) => void;
  activeComponent: string;
  bedFilter: number;
  bathFilter: number;
  handleBedFilter: (value: number) => void;
  handleBathFilter: (value: number) => void;
}) => {
  const [priceRange, setPriceRange] = useState<number[]>([1199, 2550]);

  const [dateValue, setDateValue] = useState<Dayjs | null>(dayjs(new Date()));

  const handleFilterData = () => {
    const filteredData: FloorplanType[] = [];
    const remainingData: FloorplanType[] = [];

    floorplans?.forEach((item) => {
      const isWithinPriceRange =
        item.price.min >= priceRange[0] && item.price.max <= priceRange[1];
      const hasRequiredBeds =
        bedFilter === 0 ? true : item.bedsCount === bedFilter;
      const hasRequiredBaths =
        bathFilter === 0 ? true : item.bathsCount === bathFilter;

      if (isWithinPriceRange && hasRequiredBaths && hasRequiredBeds) {
        filteredData.push(item);
      } else {
        remainingData.push(item);
      }
    });

    applyFilter(filteredData, remainingData, dateValue);
  };

  const handleChangePrice = (event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
  };

  const handleSetDate = (value: Dayjs | null) => {
    if (value && dayjs(new Date()) > value) {
      setDateValue(dayjs(new Date()));
    } else {
      setDateValue(value);
    }
  };

  return (
    <div
      style={{
        display: activeComponent === "filterFloorplans" ? "flex" : "none",
        flexDirection: "column",
        padding: "15px 40px",
        alignItems: "center",
        fontFamily: "Plus Jakarta Sans,sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ fontSize: "20px", fontWeight: 600, color: "#201f1e" }}>
          4 Floor Plans Available
        </div>
        <div style={{ fontSize: "14px", fontWeight: 300, color: "#3c4858" }}>
          Pick out a floor plan
        </div>
      </div>
      <div>
        <div style={{ marginTop: "16px", display: "block" }}>
          <div style={{ color: "black" }}>How many bedrooms do you need?</div>
          <div style={{ flexWrap: "wrap", gap: "0.5rem", display: "flex" }}>
            <div
              style={{
                ...itemFilter,
                ...(bedFilter === 0 && {
                  background: "#3898ec",
                  color: "#fff",
                }),
              }}
              onClick={() => handleBedFilter(0)}
            >
              Any
            </div>
            <div
              style={{
                ...itemFilter,
                ...(bedFilter === 1 && {
                  background: "#3898ec",
                  color: "#fff",
                }),
              }}
              onClick={() => handleBedFilter(1)}
            >
              1 Bed
            </div>
            <div
              style={{
                ...itemFilter,
                ...(bedFilter === 2 && {
                  background: "#3898ec",
                  color: "#fff",
                }),
              }}
              onClick={() => handleBedFilter(2)}
            >
              2 Beds
            </div>
          </div>
        </div>
        <div style={{ marginTop: "16px", display: "block" }}>
          <div style={{ color: "black" }}>How many bathrooms do you need?</div>
          <div style={{ flexWrap: "wrap", gap: "0.5rem", display: "flex" }}>
            <div
              style={{
                ...itemFilter,
                ...(bathFilter === 0 && {
                  background: "#3898ec",
                  color: "#fff",
                }),
              }}
              onClick={() => handleBathFilter(0)}
            >
              Any
            </div>
            <div
              style={{
                ...itemFilter,
                ...(bathFilter === 1 && {
                  background: "#3898ec",
                  color: "#fff",
                }),
              }}
              onClick={() => handleBathFilter(1)}
            >
              1 Bath
            </div>
            <div
              style={{
                ...itemFilter,
                ...(bathFilter === 2 && {
                  background: "#3898ec",
                  color: "#fff",
                }),
              }}
              onClick={() => handleBathFilter(2)}
            >
              2 Baths
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          width: "100%",
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem",
        }}
      >
        <p style={{ marginTop: "30px", fontSize: "14px", textAlign: "left" }}>
          What is your target rent?
        </p>
      </div>
      <div
        style={{
          width: "100%",
        }}
      >
        <Box sx={{ width: "auto", margin: "0 auto", textAlign: "center" }}>
          <Slider
            getAriaLabel={() => "Price range"}
            value={priceRange}
            onChange={handleChangePrice}
            valueLabelDisplay="auto"
            min={1199}
            max={2550}
          />
        </Box>
      </div>

      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "6px",
        }}
      >
        <h6
          style={{
            fontWeight: 600,
            fontSize: "17px",
          }}
        >
          $1199
        </h6>
        <h6
          style={{
            fontSize: "17px",
            fontWeight: 600,
          }}
        >
          $2550
        </h6>
      </div>
      <div
        style={{
          width: "100%",
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem",
        }}
      >
        <div
          style={{
            textAlign: "left",
            marginTop: "5px",
            fontSize: "15px",
            left: "0px",
          }}
        >
          When is your desired move in date (optional)
        </div>
        <div style={{ width: "100%", marginTop: "10px" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateTimePicker"]}>
              <DatePicker
                label="Select a move in date (optional)"
                value={dateValue}
                onChange={(newValue) => handleSetDate(newValue)}
                sx={{ fontSize: 10 }}
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "#1976d2",
            width: "100%",
            color: "white",
            borderRadius: "6px",
            marginTop: "20px",
            textAlign: "center",
            paddingTop: "15px",
            paddingBottom: "15px",
            cursor: "pointer",
            fontSize: "15px",
          }}
          onClick={handleFilterData}
        >
          Filter
        </div>
      </div>
    </div>
  );
};

export default FilterFloorplans;
