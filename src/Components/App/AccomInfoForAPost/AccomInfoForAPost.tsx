import { ForwardedRef, LegacyRef, useEffect, useRef, useState } from "react";
import PostDetail, { Image } from "../../../Models/PostDetail";
import ImageFitSize from "../Image/ImageFitSize";
import "./Accommodation.scss";
import { animateImg, animateOverlayIn, animateOverlayOut, animatePreview, animateSlide, animateSliderOut } from "./Animation/AccommodationAnimation";
import Navbar from "./Children/NavBar";
import Overlay from "./Children/Overlay";
import SliderControls from "./Children/SliderControls";

function Accommodation( props: { post: PostDetail } ){
  const [ post, setPost ] = useState<PostDetail>();
  const [ isExpanded, setIsExpand ] = useState( false );
  const [ slideCount, setSlideCount ] = useState( 0 );
  const [ isSliding, setIsSliding ] = useState( false );
  const [ isExpanding, setIsExpanding ] = useState( false );
  const [ isShrinking, setIsShrinking ] = useState( false );
  //...
  const titleWrapRef = useRef();
  const numberWrapRef = useRef();
  const overlay = useRef();
  const sliderContainer = useRef();
  const controlsRef = useRef();
  const navbar = useRef();
  const imageRef = useRef();
  //
  useEffect( () => {
    // Mã GSAP của bạn ở đây
    gsap.to( '.my-element', {
      duration: 1,
      x: 100,
      y: 50,
      opacity: 0.5,
      scale: 1.5,
      rotation: 180,
      ease: 'power1.inOut',
      delay: 0.5,
      onComplete: () => {
        console.log( 'Hoàn thành hiệu ứng' );
      },
    } );
  }, [] );
  useEffect( () => {
    setPost( props.post );
  }, [ props.post ] );
  useEffect( () => {
    console.log( slideCount );
    gsap.set( sliderContainer.current as any, {
      background: `url(${ post?.images[slideCount] }) center center / cover`,
    } );
  }, [ slideCount ] );
  const expand = () => {
    // Expand Overlay
    if( !isExpanded && !isExpanding && !isSliding ){
      setIsExpanding( !isExpanding );
      animateSliderOut();
      animateOverlayIn( overlay.current, navbar.current,
                        () => {
                          setIsExpanding( false );
                          setIsExpand( true );
                        },
      );
    }
    // Hide Overlay
    if( isExpanded && !isExpanding && !isSliding ){
      setIsExpanding( !isExpanding );
      animateOverlayOut( overlay.current, navbar.current,
                         () => {
                           setIsExpanding( false );
                           setIsExpand( false );
                         } );
    }
  };
  const prevSlide = () => {
    if( slideCount !== 0 ){
      setSlideCount( slideCount - 1 );
      animateSlide(
        titleWrapRef.current,
        numberWrapRef.current,
        () => {setIsSliding( false );},
        "+=100%",
      );
    }
  };
  const nextSlide = () => {
    if( slideCount !== (post?.images.length as number - 1) ){
      setSlideCount( slideCount + 1 );
      animateSlide(
        titleWrapRef.current,
        numberWrapRef.current,
        () => {setIsSliding( false );},
        "-=100%",
      );
    }
  };
  const animateImgClick = id => {
    if( !isShrinking ){
      setIsShrinking( true );
      animateImg(
        overlay.current,
        () => {
          setIsExpand( !isExpanded );
          setIsShrinking( false );
        },
        navbar.current,
      );
      // @ts-ignore
      post?.images.forEach( ( img, index ) => {
        if( id === index ){
          setSlideCount( index );
          animatePreview( (100 / index) + "%", index, (index * 100) + "%", post?.images );
        }
      } );
    }
  };
  const slideNumbers = post?.images.map( ( item: Image, index: number ): JSX.Element => {
    return (
      <span className = "slide-number" key = { item.id }>
            { "0" + (index + 1) }
          </span>
    );
  } );
  const slideTitles = post?.images?.map( item => {
    return (
      <h1 className = "slide-title" key = { item.id }>
        { item?.description }
      </h1>
    );
  } );
  const slideText = post?.amenities?.map( item => {
    return (
      <h3 className = "slide-info" key = { item.id }>
        { item.name }
      </h3>
    );
  } );
  const images = post?.images?.map( item => {
    return (
      <img
        className = "img-hidden"
        src = { item.url }
        key = { item.id }
        ref = { imageRef as LegacyRef<HTMLImageElement> }
        // onLoad = { loadImages }
        alt = ""
      ></img>
    );
  } );
  return (
    <div className = "App accommodation-post ">
      <Navbar ref = { navbar }></Navbar>
      { images }
      <ImageFitSize src = { post?.images[slideCount]?.url } className = { "slider-container" }>
        <div className = "slider-text-container">
          <div className = "slide-number-container">
            <div className = "number-wrap" ref = { numberWrapRef as LegacyRef<HTMLDivElement> }>
              { slideNumbers }
            </div>
            <span className = "slide-number-small">/ { post?.images.length }</span>
          </div>
          <div className = "slide-title-container">
            <div className = "title-wrap" ref = { titleWrapRef as LegacyRef<HTMLDivElement> }>
              { slideTitles }
            </div>
          </div>
          <SliderControls
            prev = { prevSlide }
            next = { nextSlide }
            expand = { expand }
            ref = { controlsRef as ForwardedRef<HTMLDivElement> }
          />
        </div>
        <div className = "slide-info-container">
          <div className = "slide-info-text">
            <div className = "slide-info-wrap">{ slideText }</div>
            <h4>Scroll for more</h4>
          </div>
        </div>
        <div className = "slide-info-box">
          <a href = "/#">Need more info &amp; prices?</a>
          <h4>Download our brochure now</h4>
        </div>
      </ImageFitSize>
      <Overlay
        images = { post?.images }
        close = { expand }
        ref = { overlay }
        imgClick = { e => animateImgClick( e ) }
      />
    </div>
  );
}
export default Accommodation;







