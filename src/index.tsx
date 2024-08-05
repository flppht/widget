import React from "react";
import ReactDOM from "react-dom/client";
import { Widget } from "./Widget";
import TagManager from "react-gtm-module";

const isGTMLoaded = () => {
  return !!document.querySelector('script[src*="googletagmanager.com/gtm.js"]');
};

// if (!isGTMLoaded) {
console.log("gtm already exists!");
const tagManagerArgs = {
  gtmId: process.env.REACT_APP_GTM_ID,
};
TagManager.initialize(tagManagerArgs);
// }

const scriptTag = document.currentScript;
const clientId = scriptTag?.dataset.clientId || "123";

ReactDOM.createRoot(document.getElementById("widget")!).render(
  <Widget clientId={clientId} />
);
