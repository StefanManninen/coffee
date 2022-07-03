import React, {useState, useContext} from "react";
import {ACTION_TYPES, StoreContext} from "../store/store-context";

const useTrackLocation = () => {
  const [locationErrorMsg, setLocationErrorMsg] = useState("");
  //const [latLong, setLatLong] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {dispatch} = useContext(StoreContext);

  const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // setLatLong(`${latitude},${longitude}`);
    dispatch({
      type: ACTION_TYPES.SET_LAT_LONG,
      payload: {latLong: `${latitude},${longitude}`},
    });

    setLocationErrorMsg("");
    setIsLoading(false);
  };

  const error = () => {
    setIsLoading(false);
    setLocationErrorMsg("Unable to retrieve your location");
  };

  const handleTrackLocation = () => {
    setIsLoading(true);
    if (!navigator.geolocation) {
      setLocationErrorMsg("Geolocation is not supported by your browser");
      setIsLoading(false);
    } else {
      // status.textContent = "Locating…";
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  return {
    // latLong,
    handleTrackLocation,
    locationErrorMsg,
    isLoading,
  };
};

export default useTrackLocation;
