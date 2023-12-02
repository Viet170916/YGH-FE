    import axios from "axios";
    import React, { JSX, useEffect, useState } from "react";
    import { useClickOutsideElement } from "../../../../Common/Hooks/EventHook";
    import { EstateType } from "../../../../Models/HomeFilter";
    import "../FilterBar.scss";
    import { EstateIcon } from "../../Icons/Icon";

    interface IProps{
        setEstateTypesSelected: ( estateSelected: EstateType[] ) => void;
    }
    function EstateTypesSelector( props: IProps ): JSX.Element{
    //config
        const initAmenities: EstateType[] = [
        { id: 1, name: "Apartment", isChecked: false },
        { id: 2, name: "House", isChecked: false },
        { id: 3, name: "Mobile Home", isChecked: false },
        { id: 4, name: "Vacation Rental", isChecked: false },
        { id: 5, name: "Penthouse", isChecked: false },
        { id: 6, name: "Hotel", isChecked: false },
        { id: 7, name: "Floating House", isChecked: false },
        { id: 8, name: "Houseboat", isChecked: false },
        ];
        const initEstate = { id: 0, name: "no selection" };
    //hooks
        const [ estates, setAmenities ] = useState<{ id: number, name: string, isChecked: boolean }[]>();
        const estateRef = useClickOutsideElement( () => {estateRef?.current?.classList?.remove( "expand-y" );} );
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
            props?.setAmenitiesSelected?.( estates?.filter( estate => estate.isChecked ) );
        }, [ estates ] );
    //handler functions
        function toggleSelector( event: HTMLButtonElement ){
            if( estateRef?.current?.classList?.contains( "expand-y" ) ){
                estateRef?.current?.classList?.remove( "expand-y" );
            }else{
                estateRef?.current?.classList?.add( "expand-y" );
            }
        }
    //render
        return (
        <div className = { "estates-selector-wrapper selector-wrapper" }>
            <button className = "filter-btn" onClick = { toggleSelector }>
                <span className = { "filter-icon" }><EstateIcon id = { 0 } /></span>
                <span className = { "filter-text" }>
            {
                estates?.filter( e => e.isChecked ).length > 0 ?
                    (estates?.filter( e => e.isChecked )?.map( ( estate, index ) => {
                            return <span className = "filter-element" key = { estate.name + estate.id }>{ (( estates?.[index-1])?", ":"")+estate.name }</span>;
                    } )) : <span className = "filter-element">{ "no selection" }</span>
            }
            </span>
            </button>
            <div className = { "estates-content-selector-wrapper content-selector-wrapper can-be-hidden-wrapper" } ref = { estateRef }>
                <div className = { "estates-content-selector content-selector can-be-hidden" }>
                    {
                        estates?.map( ( estate, index ) => (
                            <div className = { `estate-checkbox -checkbox ${estate.isChecked&&"checked"}`} key = { estate.name + estate.id }>
                                <input
                                type = "checkbox"
                                id = { estate.name + "-" + estate.id }
                                onChange = { () => {setAmenities( estates?.map( ( estatePrepareToSet ) => {return estate !== estatePrepareToSet ? estatePrepareToSet : { ...estatePrepareToSet, isChecked: !estatePrepareToSet.isChecked };} ) );} }
                                checked = { estate.isChecked }
                                />
                                <label htmlFor = { estate.name + "-" + estate.id } className = { "estate-element -element" }>
                                    <span className = { "estate-icon -icon" }><EstateIcon id = { estate.id } /></span>
                                    <span className = { "estate-content -content" }>{ estate.name }</span>
                                </label>
                            </div>
                        ) )
                    }
                </div>
            </div>
        </div>
        );
    }
    export default EstateTypesSelector;










    