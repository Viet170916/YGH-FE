import FormControl from '@mui/material/FormControl';
// import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Theme } from '@mui/material/styles';
import * as React from "react";
import { useEffect, useState } from "react";
import { BsPlusSquareDotted } from "react-icons/bs";
import { TextBox } from "../../../../Layouts/Dashboard/ContentDisplayer/CreatePost/ApartmentCollection/Apartment";
import { RoomType } from "../../../../Models/PostDetail";
import { BedTypeForPost } from "../../../App/Icons/Icon";
import Select from "../../DropDown/Select";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
function getStyles( name: string, personName: readonly string[], theme: Theme ){
  return {
    fontWeight:
      personName?.indexOf( name ) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
interface IProps{
  value: RoomType[];
  options: RoomType[];
  onChange: ( inputValue: RoomType[] ) => void;
}
export default function MultipleSelectChip( _props: IProps ){
  const [ selectOptionList, setSelectOptionList ] = React.useState<RoomType[]>( _props.value );
  console.log( "apartmentBedType", _props.value );
  const [ save, setSave ] = useState<boolean>( true );
  useEffect( () => {
    _props.onChange( selectOptionList.filter( ( apartment: RoomType ) => apartment.quantity > 0 && apartment.type && apartment.price ) );
  }, [ save ] );
  return (
    <div>
      <FormControl sx = { { m: 1, width: '100%' } }>
        <Select<RoomType>
          solve = { ( id: number ) => {
            if( selectOptionList?.map( ( value: RoomType ) => value.type ).includes( id ) ){
              setSelectOptionList( selectOptionList.filter( ( a: RoomType ) => a.type !== id ) );
              setSave(!save);
            }else{
              setSelectOptionList( [ ...selectOptionList, { id: id, type: id } ] );
            }
          } }
          initValue = { { id: null, title: "" } }
          options = { _props.options }
          customList = { BedTypeForPost }
          customRenderValue = { <>
            { selectOptionList?.map( ( value: RoomType, index: number ) => (
              <RoomOption
                key = { index }
                room = { value }
                setRoom = { ( room: RoomType ) => {
                  setSelectOptionList( [ ...selectOptionList.slice( 0, index ), room, ...selectOptionList.slice( index + 1 ) ] );
                  setSave( !save );
                } }
                type = { value?.type as number }
              />
            ) ) }
            <div style = { { fontSize: "3em" } }><BsPlusSquareDotted /></div>
          </>
          }
        />
      </FormControl>
    </div>
  );
}
export function RoomOption( { type, setRoom, room }: { type: number, setRoom: ( value: RoomType ) => void, room: RoomType } ){
  const [ theRoom, setTheRoom ] = useState<RoomType>( room );
  useEffect( () => {
    // if( theRoom.price  && theRoom.type && theRoom.quantity )
    setRoom( theRoom );
  }, [ theRoom ] );
  return (<div
    className = { "room-option-wrapper" }
    onClick = { ( e ) => e.stopPropagation() }
    style = { { display: "grid", gridTemplateColumns: "70px 1fr", gap: "10px", alignItems: "center" } }
  >
    <div className = { "bed-icon-wrapper" }><BedTypeForPost id = { type } /></div>
    <div
      className = { "content base-border-radius border-light-color" }
      style = { { width: "100%", height: "70px", display: "grid", gridTemplateColumns: "1fr .5fr", gap: "50px", alignItems: "center", padding: "0 10px" } }
    >
      <div>
        <label htmlFor = "">Price(VND)</label>
        <TextBox
          inputProps = { {
            // className: "hide-spin-buttons",
            min: 0,
            step: 100000,
          } }
          type = { "number" }
          setValue = { value => {setTheRoom( { ...theRoom, price: value } ); } } value = { theRoom.price }
        />
      </div>
      <div>
        <label htmlFor = "">Quantity(Room)</label>
        <TextBox
          inputProps = { {
            // className: "hide-spin-buttons",
            min: 0,
            step: 1,
          }
          } type = { "int-number" } setValue = { value => {setTheRoom( { ...theRoom, quantity: value } ); } } value = { theRoom.quantity }
        />
      </div>
    </div>
  </div>);
}
