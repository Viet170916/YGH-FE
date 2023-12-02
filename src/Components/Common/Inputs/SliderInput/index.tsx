import React, { useEffect, useMemo, useRef, useState } from 'react';
import "./Slider.scss";

interface IProps{
  getRange: ( range: { from: number, to: number, max: number } ) => void;
  rangeConfiguration?: {
    step: number;
    range: { min: number, max: number };
    init:{from:number, to: number};
  };
  label?: Function[2];
}
function RangeSliderComponent( props: IProps ): React.JSX.Element{
  let timer;
  const step = props.rangeConfiguration?.step ?? 1;
  const { min, max } = props.rangeConfiguration?.range ?? { min: 0, max: 100 };
  const [ leftValue, setLeftValue ] = useState<number>( props.rangeConfiguration?.init?.from??25 );
  const [ rightValue, setRightValue ] = useState<number>( props.rangeConfiguration?.init?.to??75 );
  const calculateLeftStyles = useMemo( () => `${ ((leftValue - min) / (max+step - min)) * 100 }%`
    , [ leftValue ] );
  const calculateRightStyles = useMemo( () => `${ 100 - ((rightValue - min) / (max+step - min)) * 100 }%`
    , [ rightValue ] );
  ;
  const handleLeftChange = ( event: React.ChangeEvent<HTMLInputElement> ) => {
    slide(parseInt(event.target.value), leftValue, leftRef);
    setLeftValue( Math.min( parseInt( event.target.value ), rightValue - step ) );
  };
  const handleRightChange = ( event: React.ChangeEvent<HTMLInputElement> ) => {
    slide(parseInt(event.target.value), rightValue, rightRef);
    setRightValue( Math.max( parseInt( event.target.value ), leftValue + step ) );
  };
  useEffect( () => {
    props.getRange( { from: leftValue, to: rightValue , max: max} );
  }, [ leftValue, rightValue ] );
  const stop = (ref) => {
    ref?.current?.classList.remove("up", "down");
  };
  const slide = (currentValue, previousValue, ref) => {
    const delta = -(previousValue - currentValue);
    if (delta > 0) {
      ref?.current?.classList.add("up");
      ref?.current?.classList.remove("down");
    } else {
      ref?.current?.classList.add("down");
      ref?.current?.classList.remove("up");
    }
    clearTimeout(timer);
    timer = setTimeout(()=>{stop(ref)}, 100);
  };
  const leftRef = useRef();
  const rightRef = useRef();
  return (
    <div className = "middle">
      <div className = "multi-range-slider">
        <input
          type = "range"
          id = "input-left"
          min = { min }
          step={step}
          max = { max+step }
          value = { leftValue }
          onChange = { handleLeftChange }
          onMouseOver = { () => {leftRef?.current?.classList?.add( "hover" );} }
          onMouseOut = { () => {leftRef?.current?.classList?.remove( "hover" );} }
        />
        <input
          type = "range"
          id = "input-right"
          step={step}
          min = { min }
          max = { max+step }
          value = { rightValue }
          onChange = { handleRightChange }
          onMouseOver = { () => {rightRef?.current?.classList?.add( "hover" );} }
          onMouseOut = { () => {rightRef?.current?.classList?.remove( "hover" );} }
        />
        <div className = "slider">
          <div className = "track"></div>
          <div className = "range" style = { { left: calculateLeftStyles, right: calculateRightStyles } }></div>
          <div className = "thumb left rangeHandle" style = { { left: calculateLeftStyles } } ref = { leftRef }>
            <span className = { "rangeFloat" }>
              { leftValue }
          </span>
          </div>
          <div className = "thumb right rangeHandle" style = { { right: calculateRightStyles } } ref = { rightRef }>
            <span className = { "rangeFloat" }>
            { rightValue!==(max+step)?rightValue:((rightValue-step)+"+" )}
          </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RangeSliderComponent;
