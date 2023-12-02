import { JSX } from "react";
import AutoCompleteInputBar from "../../Common/Inputs/AutoCompleteInputBar";
import "./FilterDropDown.scss";

interface IProps{
}
function TypeFilter( props: IProps ): JSX.Element{
  return (
    <div className = { "frame-drop" }>
      <AutoCompleteInputBar
        hintEndPoint = { "/comments" }
        baseHintUrl = { "https://jsonplaceholder.typicode.com" }
        params = { "postId" }
        searchIcon = { <></> }
        searchPlaceholder = { "ReactJS" }
        getData={()=>{}}
      />
    </div>
  );
}
export default TypeFilter;
