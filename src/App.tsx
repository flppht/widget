import React from "react";

const App = () => {
  return (
    <div style={{ position: "relative", width: "100px", height: "100px" }}>
      <div
        style={{
          width: 0,
          height: 0,
          borderLeft: "50px solid transparent",
          borderRight: "50px solid transparent",
          borderBottom: "50px solid #8B0000",
          position: "absolute",
          top: "-50px",
          left: 0,
        }}
      ></div>
      <div
        style={{
          width: "100px",
          height: "100px",
          backgroundColor: "#FFD700",
          borderRadius: "10px",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      ></div>
    </div>
  );
};

export default App;
