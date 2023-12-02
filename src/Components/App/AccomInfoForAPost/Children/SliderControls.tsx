import { ForwardedRef, forwardRef } from "react";

interface IProps{
  prev: () => void;
  next: () => void;
  expand: () => void;
}
const SliderControls = forwardRef( ( props: IProps, ref:ForwardedRef<HTMLDivElement> ) => {
  return (
    <div className = "slider-controls" ref = { ref }>
      <button className = "slide-prev-btn" onClick = { props.prev }></button>
      <button className = "slide-next-btn" onClick = { props.next }></button>
      <button onClick = { props.expand } className = "slide-overlay-btn"></button>
    </div>
  );
} );
export default SliderControls;
