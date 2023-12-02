import React, { CSSProperties, JSX, useEffect, useState } from "react";
import Torus from "../../../DefaultComponent/Torus";
import "./Image.scss"

interface IProps{
  ErrorElement?: JSX.Element;
  image?: string|undefined;
  style?:CSSProperties;
}
function ImageHandleError( props: IProps = {ErrorElement: <Torus /> } ): JSX.Element{
//config
//hooks
  const [ error, setError ] = useState( false );
  useEffect(()=>{
    setError(false)
  },[props.image])
//handler functions

//render
  return (
    <span className = { "image-wrapper" } style={ props.style}>
{ error ? <Torus /> :
  <img
    src = { props.image??"error" } alt = { "" }
    onError = { () => {setError( true );} }
  /> }
    </span>
  );
}
export default ImageHandleError;
