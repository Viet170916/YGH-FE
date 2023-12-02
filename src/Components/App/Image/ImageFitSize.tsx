import classNames from "classnames";
import { JSX, LegacyRef, MutableRefObject, useEffect } from "react";

interface IProps{
  className?: string|undefined|null;
  src: string|undefined|null;
  ref?: LegacyRef<HTMLDivElement> | MutableRefObject<HTMLDivElement>;
  children?:JSX.Element;
  onLoad?:(event?:any)=>void;
  onClick?:(event:any)=>void;
  onError?:(event:any)=>void;
  style?: CSSStyleRule;
}
function ImageFitSize( props: IProps ): JSX.Element{

//render
  return (
    <div
      className = { classNames(props?.className )} style = { {
        height:"100%", width:"100%",
        ...props?.style,
      background: `url(${ props.src }) center center/ cover`,
    } } ref = { props?.ref }
      onClick={props.onClick}
      onError={props.onError}
   
      onLoad={ ()=>{
        props.onLoad?.();
      }}
    >
      {props.children}
    </div>
  );
}
export default ImageFitSize;
