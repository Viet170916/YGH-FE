import { JSX } from "react";
import Location_Search from "../../../Models/Location_Search";
import AutoCompleteInputBar from "../../Common/Inputs/AutoCompleteInputBar";

interface IProps{
}
function index( props: IProps ): JSX.Element{
  return (
    <>
      <AutoCompleteInputBar<Location_Search>
        getData = { ( chosen ) => {console.log( chosen );} }
        searchPlaceholder = { "Location" }
        requestConfig = { {
          endPoint: "/api/location/search",
          // baseUrl: "https://nominatim.openstreetmap.org",
          paramsName: "q",
          paramsDefault: {
            polygon_geojson: 1,
            format: "jsonv2",
          },
        } }
        attributeNameDisplayInHints = { "displayName" }
      />
    </>
  );
}
export default index;
