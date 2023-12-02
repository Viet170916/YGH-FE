import axios from "axios";
import React, { ChangeEvent, JSX, useEffect, useState } from "react";
import { CiCircleRemove } from "react-icons/ci";
import { useClickOutsideElement } from "../../../../Common/Hooks/EventHook";
import "../Generral.scss";
import "./AutoComplete.scss";

interface IRequestConfiguration{
  endPoint: string;
  baseUrl?: string;
  paramsName: string;
  paramsDefault?: any;
}
interface IProps{
  requestConfig: IRequestConfiguration;
  searchPlaceholder?: string;
  attributeNameDisplayInHints: string;
  getData: Function;
}
function AutoCompleteInputBar<T>( props: IProps ): JSX.Element{
  const [ hints, setHints ] = useState<T[]>( [] );
  const [ textSearch, setTextSearch ] = useState<string>( "" );
  const [ typeList, setTypeList ] = useState<T[]>( [] );
  const clickOut_Target = useClickOutsideElement( () => {
      setHints( [] );
    },
  );
  const source = axios.CancelToken?.source();

  useEffect( () => {
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
    return ()=>{source?.cancel()};
  }, [ textSearch ] );
  useEffect( () => {
    props.getData( typeList );
  }, [ typeList ] );
  return (
    <div className = { "search-bar " }>
      <div className = { "options" }>
        { typeList.map( ( type, index ) => {
          return (
            <div key = { index } className = { "type-option" }>
              <p>
                { type[props.attributeNameDisplayInHints] }
              </p>
              <button
                className = { "delete-option" }
                onClick = { () => {setTypeList( typeList.filter( ( oldType ) => oldType !== type ) );} }
              ><CiCircleRemove /></button>
            </div>);
        } ) }
      </div>
      <div className = { "search-area" }>
        <input
          type = "text"
          placeholder = { props.searchPlaceholder || "search" }
          value = { textSearch }
          onChange = { ( event: ChangeEvent<HTMLInputElement> ) => {setTextSearch( event.target.value );} }
        />
      </div>
      <div className = { "hint-list" }>
        <ul ref = { clickOut_Target }>
          { hints.map(
            ( hint, index ) =>
              (<li key = { index }>
                <div
                  className = { "option" }
                  onClick = { () => {
                    setHints( [] );
                    setTypeList( [ ...typeList, hint ] );
                    setTextSearch( "" );
                  } }
                >{ hint[props.attributeNameDisplayInHints] }
                </div>
              </li>) ) }
        </ul>
      </div>
    </div>
  );
}
export default AutoCompleteInputBar;
