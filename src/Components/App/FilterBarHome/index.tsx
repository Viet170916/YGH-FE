  import React, { JSX, useEffect, useState } from "react";
  import { HiOutlineLocationMarker } from "react-icons/hi";
  import { LuBedSingle } from "react-icons/lu";
  import { MdOutlineBed } from "react-icons/md";
  import { HomeFilter } from "../../../Models/HomeFilter";
  import IYGLocation from "../../../Models/YG_Location";
  import Select from "../../Common/DropDown/Select";
  import Select_2 from "../../Common/Inputs/SelectInputBar";
  import AmenitiesSelector from "./FilterPropComponents/AmenitiesSelector";
  import CalendarSelector from "./FilterPropComponents/CalendarSelector";

  import EstateTypesSelector from "./FilterPropComponents/EstateTypesSelector";
  import PriceSliceBar from "./FilterPropComponents/PriceSliceBar";
  import "../../Common/DropDown/Select/Select.scss";



  interface IProps{
    initFilter: HomeFilter;
    onchangeFilter: ( filter?: HomeFilter ) => void;
  }
  function HomeFilterBar( props: IProps ): JSX.Element{
    const [ inerFilter, setInerFilter ] = useState<HomeFilter>( props.initFilter );
    //config
    const bedOptions = [ { id: 1, title: "1 Twin Bed", icon: <LuBedSingle /> }, { id: 2, title: "2 Twin Beds", icon: <LuBedSingle /> }, { id: 3, title: "1 Double Bed", icon: <MdOutlineBed /> }, { id: 4, title: "2 Double Beds", icon: <MdOutlineBed /> } ];
    //hooks
    const { initFilter, onchangeFilter } = props;
    useEffect( () => {console.log( inerFilter );}, [ inerFilter ] );
    function setAvailableDate( availableDate: { since: Date | string, to: Date | string } ){
      setInerFilter( { ...initFilter, availableDate: { since: availableDate.since, to: availableDate.to } } );
    }
    function setNumberOfBed( bed: number ){
      setInerFilter( { ...initFilter, numberOfBed: bed } );
    }
    function setPriceRange( range: { from: number, to: number, max: number } ){
      setInerFilter( { ...initFilter, price: range } );
    }
    return (
      <section className = "app-actions">
        <div className = "app-actions-line">
          <div className = "search-wrapper">
            <button className = "location-btn">
              <HiOutlineLocationMarker className = { "btn-icon" } />
            </button>
            {/*<input type = "text" className = "search-input" value = "San Francisco, Stockton Street" onChange = { () => {} } />*/ }
            <Select_2<IYGLocation>
              className = { "select-location search-input" }
              attributeNameDisplayInHints = { "displayName" }
              getData = { ( data: IYGLocation ) => {console.log( data );} }
              requestConfig = { { endPoint: "/api/location/search", paramsName: "q" } }
              searchPlaceholder = { "Vd: Hà Nội" }
            />
            <button className = "search-btn">Find Hotel</button>
          </div>
        </div>
        <div className = "app-actions-line filter-line">
          <div className = "filter-action-buttons">
            <CalendarSelector getSelectedDate = { setAvailableDate } />
            <Select options = { bedOptions } initValue = { bedOptions[0] } solve = { setNumberOfBed } customList = { OptionBed }>
              <LuBedSingle />
            </Select>
            <PriceSliceBar getPriceRange = { setPriceRange } />
            <AmenitiesSelector setAmenitiesSelected = { () => {} } />
            <EstateTypesSelector setEstateTypesSelected = { () => {} } />
          </div>
        </div>
      </section>
    );
  }
  export default HomeFilterBar;
  function OptionBed( bedContent: { id: number, title: string, icon: React.JSX.Element } ): JSX.Element{
    return (
      <div className = { "bed-option-wrapper" }>
        <span className = { "bed-icon" }>{ bedContent.icon }</span>
        <span className = { "bed-title" }>{ bedContent.title }</span>
      </div>
    );
  }





















  