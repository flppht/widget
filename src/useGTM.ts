import { useCallback } from "react";

declare global {
  interface Window {
    ga: Function;
    dataLayer: any[];
  }
}

const useGTM = () => {
  const pushEventToDataLayer = useCallback((event, data) => {
    if (window.dataLayer) {
      window?.dataLayer.push({
        event,
        ...data,
      });
    }
  }, []);
  return pushEventToDataLayer;
};

export default useGTM;
