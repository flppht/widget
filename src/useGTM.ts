import { useCallback } from "react";

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
