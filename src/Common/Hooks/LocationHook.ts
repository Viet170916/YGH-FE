import axios from "axios";
import { useEffect, useState } from "react";
import useGeolocation from 'react-hook-geolocation';
import { Location } from "../../Models/Location";
import IYGLocation from "../../Models/YG_Location";

interface PositionOptions{
  enableHighAccuracy: boolean,
  maximumAge?: number,
  timeout?: number,
}
export function useLocation( options: PositionOptions = { enableHighAccuracy: false } ){
  const [ location, setLocation ] = useState<Location>( null );
  const {
    latitude,
    longitude,
    error,
  } = useGeolocation( options || {} );
  useEffect( () => {
    if( latitude && longitude ){
      axios.get( `/reverse`, {
        baseURL: "https://nominatim.openstreetmap.org",
        params: {
          format: "json",
          lat: latitude,
          lon: longitude,
          zoom: 18,
          addressdetails: 1,
        },
      } ).then( ( response ) => {
        setLocation( response.data );
      } ).catch( error => {
        console.log( error );
      } );
    }
  }, [ latitude ] );
  return location;
}
export function getCurrentLocation( get: ( location: Promise<IYGLocation> ) => void ){

  navigator.geolocation.getCurrentPosition( ( position ) => {
      const term = position.coords;
      get( axios.get( `/reverse`, {
             baseURL: "https://nominatim.openstreetmap.org",
             params: {
               format: "json",
               lat: term.latitude,
               lon: term.longitude,
               zoom: 18,
               addressdetails: 1,
             },
           } ),
      );
    },
  );
}
