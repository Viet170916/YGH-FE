import { GoogleMap, MarkerF } from "@react-google-maps/api";
import axios from "axios";
import React, { JSX, useEffect, useState } from "react";
import useGeolocation from "react-hook-geolocation";
import { Motion, spring } from 'react-motion';
import { openStreetLocation } from "../../../Common/Utils/Location";
import Location_Search from "../../../Models/Location_Search";
import IYGLocation from "../../../Models/YG_Location";
import Select from "../Inputs/SelectInputBar";
import "./GoogleMap.scss";

interface IProps{
  init?: { lng?: number, lat?: number };
  width: string;
  height: string;
  onClick?: Function;
}
function Map( props: IProps ): JSX.Element{
  const containerStyle = {
    width: props.width,
    height: props.height,
  };
  const { latitude, longitude, error } = useGeolocation();
  const [ clickedLatLng, setClickedLatLng ] = useState<{ lat: number, lng: number }>( props.init ?? null );
  const [ dragLatLng, setDragLatLng ] = useState<{ lat: number, lng: number }>( props.init ?? null );
  const [ searchedLocation, setSearchLocation ] = useState<string>();
  useEffect( () => {
    if( props.init ){
      openStreetLocation( clickedLatLng.lat, clickedLatLng.lng )
      .then( ( response ) => {
        setSearchLocation( response );
      } );
    }
  }, [ clickedLatLng ] );
  const getCoordinate = ( searchedLocation_2 ) => {
    searchedLocation_2 &&
    axios.get( "search.php", {
      baseURL: "https://nominatim.openstreetmap.org/",
      params: {
        "q": searchedLocation_2,
        'polygon_geojson': 1,
        'format': "jsonv2",
      },
    } ).then( ( response ) => {
      const data: Location_Search = response?.data[0];
      props?.onClick?.( { lat: data.lat, lng: data.lon } );
      setClickedLatLng( { lat: Number.parseFloat( data.lat ), lng: Number.parseFloat( data.lon ) } );
      setDragLatLng( { lat: Number.parseFloat( data.lat ), lng: Number.parseFloat( data.lon ) } );
    } );
  };
  const handleMapClick = ( map ) => {
    const position = { lat: map.latLng.lat(), lng: map.latLng.lng() };
    props?.onClick?.( position );
    setClickedLatLng( position );
  };
  const handleDragend = ( map ) => {
    map.addListener( 'dragend', () => {
      const newCenter = map.getCenter().toJSON();
      setDragLatLng( newCenter );
    } );
  };
  if( (!latitude && !longitude) ){
    return <div>loading...</div>;
  }else if( error ){ console.log( error ); }
  return (
    <div>
      <Motion
        defaultStyle = { { lat: props.init?.lat ?? latitude, lng: props.init?.lng ?? longitude } }
        style = { {
          lat: spring( clickedLatLng?.lat || latitude ),
          lng: spring( clickedLatLng?.lng || longitude ),
        } }
      >
        { interpolatingStyle => (<>
          <Select<IYGLocation>
            init = { searchedLocation }
            className = { "select-location" }
            attributeNameDisplayInHints = { "displayName" }
            getData = { ( data: IYGLocation ) => {
              getCoordinate( data?.displayName );
              setSearchLocation( data?.displayName );
            } }
            requestConfig = { { endPoint: "/api/location/search", paramsName: "q" } }
            searchPlaceholder = { "Vd: Hà Nội" }
          />
          <GoogleMap
            center = { dragLatLng || { lat: props.init?.lat ?? latitude, lng: props.init?.lng ?? longitude } }
            onClick = { handleMapClick }
            zoom = { 12 }
            mapContainerStyle = { containerStyle }
            onLoad = { handleDragend }
          >
            {
              (latitude !== interpolatingStyle.lat &&
                <MarkerF
                  position = { { lat: interpolatingStyle.lat, lng: interpolatingStyle.lng } }
                  animation = { window.google.maps.Animation.DROP }
                />) }
          </GoogleMap>
        </>) }
      </Motion>
      <script>{
        setTimeout( () => {
          document.querySelector( ".dismissButton" )?.click?.();
          document.querySelector( ".dismissButton" )?.click?.();
        }, 1000 )
      }</script>
    </div>
  );
}
export default Map;











