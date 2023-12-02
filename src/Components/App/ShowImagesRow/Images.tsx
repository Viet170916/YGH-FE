  import classNames from "classnames";
  import React, { JSX, useState } from "react";
  import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
  import VisibilitySensor from 'react-visibility-sensor';
  import { Image } from "../../../Models/PostDetail";
  import "./Image.scss";

  interface IProps{
    images: Image[];
    className?: string;
    isLeft?:boolean;
  }
  function ImageSlide( props: IProps ): JSX.Element{
  //config
  //hooks
    const [ current, setCurrent ] = useState( -1 );
    const setSlide = ( next ) => {
      let slide = next;
      if( next > props.images?.length - 1 ){
        slide = 0;
      }
      if( next < 0 ){
        slide = props.images?.length - 1;
      }
      setCurrent( slide );
    };
    const moveRight = () => {
      const next = current + 1;
      setSlide( next );
    };
    const moveLeft = () => {
      const prev = current - 1;
      setSlide( prev );
    };
    const handleVisibilityChange = ( isVisible: boolean ) => {
      if( isVisible ){
        if( current < 0 )
          setCurrent( 0 );
      }else{
      }
    };
    return (
      <div className = { "image-slide " + (props.className ?? "") }>
        <VisibilitySensor onChange = { handleVisibilityChange }>
          <div style = { { height: "1px", width: "100px", position: "absolute", top: 0 } }></div>
        </VisibilitySensor>
        <div className = "carousel">
          <div className = "carousel__nav">
            <span className = "carousel__arrow" onClick = { moveLeft }>
              <FiChevronLeft />
            </span>
            <span className = "carousel__arrow" onClick = { moveRight }>
              <FiChevronRight />
            </span>
          </div>
          { props.images?.map( ( image, index ) => (
            <div
              className = { `carousel-item carousel-item--${ index + 1 } ${ index === current ? 'active' : '' }` }
              key = { image.id }
            >
              <div
                className = {classNames("carousel-item__image", props.isLeft?"on-left":"on-right")}
                style = { {
                  backgroundImage: `url(${ image.url })`,
                } }
              ></div>
            </div>
          ) ) }
        </div>
      </div>
    );
  }
  export default ImageSlide;














  


  