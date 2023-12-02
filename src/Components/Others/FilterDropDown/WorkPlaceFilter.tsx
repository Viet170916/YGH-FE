import { JSX } from "react";
import Select from "../../Common/Inputs/SelectInputBar";
import "./FilterDropDown.scss";

interface IProps{
}
function WorkPlaceFilter( props: IProps ): JSX.Element{
  return (
    <div className = { "frame-drop" }>
      <Select baseUrl_option = { "https://jsonplaceholder.typicode.com" } endpoint_option = { "/users" } getData = { (data) => {console.log(data);} } />
    </div>
  );
}
export default WorkPlaceFilter;
