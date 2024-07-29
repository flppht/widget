import React from "react";
import ReactDOM from "react-dom/client";
import { Widget } from "./Widget";

const scriptTag = document.currentScript;
const clientId = scriptTag?.dataset.clientId;

ReactDOM.createRoot(document.getElementById("widget")!).render(
  <Widget clientId={clientId} />
);
