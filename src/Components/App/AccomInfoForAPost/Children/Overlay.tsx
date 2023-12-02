import { Draggable } from "gsap/Draggable";
import { forwardRef, Fragment, useEffect, useRef, useState } from "react";
import { Image } from "../../../../Models/PostDetail";
import SlidePreview from "./SlidePreview";
import Toggle from "./Toggle";

interface Prop{
  imgClick: (e) => void;
  images: Image[],
}
const Overlay = forwardRef( ( props: Prop, ref ) => {
  const [ images, setImages ] = useState<Image[]>( [] );
  useEffect( () => {
    setImages( props.images?.map( ( img, index ) => ({ id: index, description: img.description, number: "0" + (index + 1), url: img?.url }) ) );
  }, [ props.images ] );
  const slideRef = useRef( [] );
  useEffect( () => {
    // Enable dragging
    new Draggable( ".overlay-preview-wrap", {
      type: "x",
      bounds: ".overlay-slide-container",
      dragResistance: 0.55,
      inertia: true,
      throwResistance: 3500,
      onDrag: () => {
        gsap.set( ".overlay-slide-preview", { cursor: "grab" } );
      },
      onDragEnd: () => {
        gsap.set( ".overlay-slide-preview", { cursor: "pointer" } );
      },
    } );
  }, [] );
  const slides = images?.map( item => {
    return (
      <SlidePreview
        index = { item.id }
        key = { item.id }
        styles = { {
          background: `url(${ item.url }) center center / cover`,
        } }
        id = { `preview-${ item.id }` }
        click = { props.imgClick }
        number = { item.number }
        ref = { slide => (slideRef.current[item] = slide) }
        description = { item.description }
      />
    );
  } );
  return (
    <Fragment>
      <div ref = { ref } className = "overlay">
        <div className = "overlay-bg"></div>
        <div className = "overlay-navigation">
          <div className = "overlay-nav-heading">
            <h3 className = "overlay-title">Select your purpose</h3>
            <h4 className = "overlay-sub">You can drag and click to select</h4>
          </div>
          <nav className = "overlay-nav-buttons">
            <Toggle />
            <button className = "overlay-close" onClick = { props.close }>
              Close
            </button>
          </nav>
        </div>
        <div className = "overlay-slide-container ">
          <div className = "overlay-preview-wrap">{ slides }</div>
        </div>
      </div>
    </Fragment>
  );
} );
export default Overlay;
