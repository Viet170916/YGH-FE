import axios from "axios";
import React, { ChangeEvent, JSX, useEffect, useState } from "react";
import { useClickOutsideElement } from "../../../../Common/Hooks/EventHook";
import "../../DropDown/Select/Select.scss";
import "../AutoCompleteInputBar/AutoComplete.scss";
import "../Generral.scss";

interface IRequestConfiguration {
  endPoint: string;
  baseUrl?: string;
  paramsName: string;
  paramsDefault?: any;
}
interface IProps {
  className?: string;
  requestConfig: IRequestConfiguration;
  searchPlaceholder?: string;
  attributeNameDisplayInHints: string;
  getData: Function;
  inputClassName?: string;
  init?: string;
}
function SelectInputBar<T>(props: IProps): JSX.Element {
  const [hints, setHints] = useState<T[]>([]);
  const [textSearch, setTextSearch] = useState<string>("");
  useEffect(() => {
    console.log(props.init);
    setTextSearch(props.init ?? "");
  }, [props.init]);
  //click outside <ul> handler
  const clickOut_Target = useClickOutsideElement(() => {
    setHints([]);
  });
  useEffect(() => {
    const source = axios.CancelToken.source();
    axios
      .get(props.requestConfig.endPoint, {
        baseURL: props.requestConfig?.baseUrl,
        cancelToken: source?.token,
        params: {
          [props.requestConfig?.paramsName]: textSearch,
          ...props.requestConfig?.paramsDefault,
        },
      })
      .then((response) => {
        setHints(textSearch ? response.data.data : []);
      })
      .catch(() => {
        setHints([]);
      });
    return () => {
      source.cancel();
    };
  }, [textSearch]);
  return (
    <div className={`search-bar select-filter${props.className}`}>
      <div className={"search-area border-bottom-light-color"}>
        <input
          className={"search-input "}
          type="text"
          placeholder={props.searchPlaceholder || "search"}
          value={textSearch}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            clickOut_Target?.current?.classList.add("show");
            setTextSearch(event.target.value);
          }}
          // onBlur = { () => {setHints( [] );} }
        />
      </div>
      <div className={"result dropdown is-active show"} ref={clickOut_Target}>
        <ul>
          {hints?.map((hint, index) => (
            <li key={index}>
              <div
                className={"option"}
                onClick={(event) => {
                  clickOut_Target?.current?.classList.remove("show");
                  props.getData(hint);
                  setTextSearch(
                    hint?.[props.attributeNameDisplayInHints] as string
                  );
                  setTimeout(() => {
                    setHints([]);
                    source?.cancel();
                  }, 600);
                }}
                onKeyDown={() => {}}
              >
                {hint[props.attributeNameDisplayInHints]}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default SelectInputBar;
