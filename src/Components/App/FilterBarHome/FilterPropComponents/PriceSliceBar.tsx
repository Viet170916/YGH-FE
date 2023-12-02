  import React, { JSX, useEffect, useState } from "react";
  import { PiMoneyDuotone } from "react-icons/pi";
  import { useClickOutsideElement } from "../../../../Common/Hooks/EventHook";
  import RangeSliderComponent from "../../../Common/Inputs/SliderInput";
  import "../FilterBar.scss";

  interface IProps{
    getPriceRange: ( range: { from: number, to: number, max: number } ) => void;
  }
  function PriceSliceBar( props: IProps ): JSX.Element{
  //config
  //hooks
    const [ range, setRange ] = useState<{ from: number, to: number, max: number }>( { from: 0, to: 1000 } );
    const slider = useClickOutsideElement( () => {slider?.current?.classList?.remove( "expand-y" );} );
    useEffect(
      () => {
        props.getPriceRange( range );
      }
      , [ range ] );
  //handler functions
    function toggleSelector( event: HTMLButtonElement ){
      if( slider?.current?.classList?.contains( "expand-y" ) ){
        slider?.current?.classList?.remove( "expand-y" );
      }else{
        slider?.current?.classList?.add( "expand-y" );
      }
    }
  //render
    return (
      <div className = { "price-slide-bar" }>
        <button className = "filter-btn " onClick = { toggleSelector }>
          <div className = "filter-icon">
            <PiMoneyDuotone className = { "btn-icon" } />
          </div>
          <span className = "filter-text">{ (range.from === 0 ? 0 + " - " : range.from + ",000 - ") + (range.to > range.max ? (range.max + ",000+") : (range.to + ",000")) } (VND)</span>
        </button>
        <div className = { "price-slider-wrapper can-be-hidden-wrapper" } ref = { slider }>
          <div className = { "price-slider can-be-hidden" }>
            <RangeSliderComponent getRange = { setRange } rangeConfiguration = { { range: { min: 0, max: 5000 }, step: 100, init: { from: 0, to: 5100 } } } />
          </div>
        </div>
      </div>
    );
  }
  export default PriceSliceBar;















  