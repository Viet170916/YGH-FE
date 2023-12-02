import React from "react";
import GoogleMap from "../../../../../Components/Common/GoogleMap";
import { CreatePostProps } from "../index";

export interface IPosition{
  lat: number;
  lng: number;
}
function Address( props: CreatePostProps ){
  const [ post, setPost ] = props.post;
  function handleClickMap( newPosition: IPosition ){
    setPost( { ...post, latitude: newPosition.lat, longitude: newPosition.lng } );
  }
  return (
    <>
      <h1 className = "new-post-title">Pinpoint your accommodation's location</h1>
      <br />
      <div style = { { display: "grid", width: "100%", justifyContent: "center" } }>
        <GoogleMap init = { post.latitude && post.longitude ? { lat: parseFloat( post.latitude + "" ), lng: parseFloat( post.longitude + "" ) } : null } onClick = { handleClickMap } width = "800px" height = "400px" />
      </div>
    </>
  );
}
export default Address;
