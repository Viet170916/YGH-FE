import { JSX } from "react";
import { useLocation } from "../../../Common/Hooks/LocationHook";
import SearchBar_Hint from "../../Common/Search_Input_Autocomplete";
import "./FilterDropDown.scss";

interface IProps{
}
function LocationFilter( props: IProps ): JSX.Element{
  const {
    status,
    getLocation,
  } = useLocation();
  return (
    <div className = { "frame-drop" }>
      <SearchBar_Hint placeholder = { "type your location" } baseHintUrl = { "" } endPoint = { "" } />
      <div
        className = { "get-current-location" } onClick = {
        () => {
        }
      }
      >Get your location
      </div>
    </div>
  );
}
export default LocationFilter;
