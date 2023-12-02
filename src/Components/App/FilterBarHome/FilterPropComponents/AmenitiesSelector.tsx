  import axios from "axios";
  import React, { JSX, useEffect, useState } from "react";
  import { useClickOutsideElement } from "../../../../Common/Hooks/EventHook";
  import { Amenity } from "../../../../Models/HomeFilter";
  import "../FilterBar.scss";
  import { AmenityIcon } from "../../Icons/Icon";

  interface IProps {
    setAmenitiesSelected: ( amenitySelected: Amenity[] ) => void;
  }
  function AmenitySelector( props: IProps ): JSX.Element{
  //config
    const initAmenities: Amenity[] = [
      { id: 1, name: "Pool", isChecked: false },
      { id: 2, name: "Gym", isChecked: false },
      { id: 3, name: "Breakfast", isChecked: false },
      { id: 4, name: "TV", isChecked: false },
      { id: 5, name: "Air condition", isChecked: false },
    ];
    const initEstate = { id: 0, name: "no selection" };
  //hooks
    const [ amenities, setAmenities ] = useState<{ id: number, name: string, isChecked: boolean }[]>();
    const amenityRef = useClickOutsideElement( () => {amenityRef?.current?.classList?.remove( "expand-y" );} );
    useEffect(
      () => {
        axios.get( "#" )
            .then( response => {
              setAmenities( (response.data?.data?.map( origin => ({ ...origin, isChecked: false }) )) ?? initAmenities );
            } ).catch( error => {
          setAmenities(  initAmenities );
          console.log( error );
        } );
      }
      , [] );
    useEffect( () => {
      props?.setAmenitiesSelected?.( amenities?.filter( amenity => amenity.isChecked ) );
    }, [ amenities ] );
  //handler functions
    function toggleSelector( event: HTMLButtonElement ){
      if( amenityRef?.current?.classList?.contains( "expand-y" ) ){
        amenityRef?.current?.classList?.remove( "expand-y" );
      }else{
        amenityRef?.current?.classList?.add( "expand-y" );
      }
    }
  //render
    return (
      <div className = { "amenities-selector-wrapper selector-wrapper" }>
        <button className = "filter-btn" onClick = { toggleSelector }>
          <span className = { "filter-icon" }><AmenityIcon id = { 0 } /></span>
          <span className = { "filter-text" }>
            {
              amenities?.filter( e => e.isChecked ).length > 0 ?
                (amenities?.filter( e => e.isChecked )?.map( ( amenity, index:number ) => {
                    return <span className = "filter-element" key = { amenity.name + amenity.id }>{(( amenities?.[index-1])?", ":"") +amenity.name }</span>;
                } )) : <span className = "filter-element">{ "no selection" }</span>
            }
            </span>
        </button>
        <div className = { "amenities-content-selector-wrapper content-selector-wrapper can-be-hidden-wrapper" } ref = { amenityRef }>
          <div className = { "amenities-content-selector content-selector can-be-hidden" }>
            {
              amenities?.map( ( amenity, index ) => (
                <div className = { `amenity-checkbox -checkbox ${amenity.isChecked&&"checked"}`} key = { amenity.name + amenity.id }>
                  <input
                    type = "checkbox"
                    id = { amenity.name + "-" + amenity.id }
                    onChange = { () => {setAmenities( amenities?.map( ( amenityPrepareToSet ) => {return amenity !== amenityPrepareToSet ? amenityPrepareToSet : { ...amenityPrepareToSet, isChecked: !amenityPrepareToSet.isChecked };} ) );} }
                    checked = { amenity.isChecked }
                  />
                  <label htmlFor = { amenity.name + "-" + amenity.id } className = { "amenity-element -element" }>
                    <span className = { "amenity-icon -icon" }><AmenityIcon id = { amenity.id } /></span>
                    <span className = { "amenity-content -content" }>{ amenity.name }</span>
                  </label>
                </div>
              ) )
            }
          </div>
        </div>
      </div>
    );
  }
  export default AmenitySelector;










