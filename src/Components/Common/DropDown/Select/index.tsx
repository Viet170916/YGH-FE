import classNames from "classnames";
import React, { JSX, useEffect, useState } from "react";
import { BsCaretDown } from "react-icons/bs";
import { LuUsers2 } from "react-icons/lu";
import { useClickOutsideElement } from "../../../../Common/Hooks/EventHook";
import "./Select.scss";

export interface Option{
  id: number;
  title: string;
}
interface IProps<T extends Option>{
  options: Option[] | T[];
  solve?: ( id: number | null | undefined | T ) => void;
  customList?: ( prop: any ) => (React.JSX.Element);
  initValue: Option | T;
  children?: JSX.Element;
  customRenderValue?: React.JSX.Element;
}
function Select<T extends Option>( props: IProps<T | Option> ): JSX.Element{
  const [ value, setValue ] = useState<Option | T>();
  const hintList = useClickOutsideElement( () => {hintList.current.classList.remove( "show" );} );
  // useEffect( () => {
  //   props?.solve?.( value?.id as number );
  // }, [ value ] );
  useEffect( () => {
    setValue( props.initValue );
  }, [ props.initValue ] );
  return (
    <div className = { "select-filter" }>
      <button className = { classNames( "filter-btn", props.customRenderValue ? "custom" : null ) } onClick = { () => {hintList.current.classList.toggle( "show" );} }>
        { props.customRenderValue ??
          <>
            <div className = "filter-icon">
              { props?.children ?? <LuUsers2 className = { "btn-icon" } /> }
            </div>
            <span className = "filter-text">{ props.initValue?.title }</span>
            <BsCaretDown />
          </>
        }
      </button>
      <div className = { "result dropdown is-active" } ref = { hintList }>
        <ul className = { classNames( "white-background-shadow" ) }>
          { props?.options?.map( ( option: T | Option ) => {
            return (
              <li
                className = { classNames( props.initValue?.id === option.id ? "u-r-here" : "" ) }
                key = { option?.id }
                onClick = { () => {
                  if( option?.id === value?.id ){
                    props?.solve?.( null );
                  }else{
                    props?.solve?.( option?.id );
                  }
                  hintList.current.classList.remove( "show" );
                } }
              >{
                (!props?.customList) ? option?.title
                  : <props.customList { ...option } /> }
              </li>
            );
          } ) }
        </ul>
      </div>
    </div>
  );
}
export default Select;
















