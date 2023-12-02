import axios from "axios";
import React, { ChangeEvent, JSX, useEffect, useState } from "react";
import { useClickOutsideElement } from "../../../../Common/Hooks/EventHook";
import "../../Search_Input_Autocomplete/SearchBar_Hint.scss";
import "../AutoCompleteInputBar/AutoComplete.scss";

interface IRequestConfiguration{
  endPoint: string;
  baseUrl?: string;
  paramsName: string;
  paramsDefault?: any;
}
interface IProps{
  className?: string;
  requestConfig: IRequestConfiguration;
  searchPlaceholder?: string;
  attributeNameDisplayInHints: string;
  getData: Function;
}
function Select<T>( props: IProps ): JSX.Element{

  const [ hints, setHints ] = useState<T[]>( [] );
  const [ textSearch, setTextSearch ] = useState<string>( "" );
  const [ result, setResult ] = useState<T>();
  //click outside <ul> handler
  const clickOut_Target = useClickOutsideElement( () => {
                                                    setHints( [] );
                                                  },
  );
  useEffect( () => {
    const source = axios.CancelToken?.source();
    axios.get( props.requestConfig.endPoint, {
      baseURL: props.requestConfig?.baseUrl,
      cancelToken: source?.token,
      params: {
        [props.requestConfig?.paramsName]: textSearch,
        ...props.requestConfig?.paramsDefault,
      },
    } ).then( ( response ) => {
      setHints( textSearch ? response.data.data : [] );
    } ).catch( () => {
      setHints( [] );
    } );
    return () => {source?.cancel();};
  }, [ textSearch ] );
  useEffect( () => {
    props.getData( result );
  }, [ result ] );
  return (
    <div className = { `search-bar ${ props.className }` }>
      <div className = { "search-area" }>
        <input
          type = "text"
          placeholder = { props.searchPlaceholder || "search" }
          value = { textSearch }
          onChange = { ( event: ChangeEvent<HTMLInputElement> ) => {
            clickOut_Target?.current?.classList.remove("hidden");
            setTextSearch( event.target.value );} }
          // onBlur = { () => {setHints( [] );} }
        />
      </div>
      <div className = { "hint-list" } >
        <ul ref = { clickOut_Target }>
          { hints?.map(
            ( hint, index ) =>
              (<li key = { index }>
                <div
                  className = { "option" }
                  onClick = { (event) => {
                    clickOut_Target?.current?.classList.add("hidden");
                    setResult( hint );
                    setTextSearch( hint?.[props.attributeNameDisplayInHints] );
                    setTimeout( () => {setHints( [] ); source?.cancel()}, 600 );
                  } }
                >{ hint[props.attributeNameDisplayInHints] }
                </div>
              </li>) ) }
        </ul>
      </div>
    </div>
  );
}
export default Select;
