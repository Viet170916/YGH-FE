import BalconyIcon from '@mui/icons-material/Balcony';
import classNames from "classnames";
import React, { JSX, LegacyRef } from "react";
import { BiBuildingHouse, BiCctv, BiFridge, BiSolidCoffeeBean } from "react-icons/bi";
import { BsHouseUp, BsTaxiFront, BsWifi1 } from "react-icons/bs";
import { FaCaravan, FaChild, FaRegTired, FaShower, FaStarHalf } from "react-icons/fa";
import { FaBanSmoking, FaKitchenSet, FaPersonSkiingNordic, FaPersonSwimming, FaStar } from "react-icons/fa6";
import { GiAncientSword, GiGasMask, GiGymBag, GiPayMoney, GiPoolTriangle, GiReceiveMoney, GiSpeedBoat, GiWoodPile } from "react-icons/gi";
import { IoCashOutline, IoRestaurantOutline } from "react-icons/io5";
import { LiaGolfBallSolid, LiaHotTubSolid, LiaPercentSolid, LiaRestroomSolid, LiaSwimmingPoolSolid, LiaWaterSolid } from "react-icons/lia";
import { LuBed, LuBedDouble, LuBedSingle, LuCigarette, LuHotel, LuParkingCircleOff, LuSunDim } from "react-icons/lu";
import { MdApartment, MdNightlightRound, MdOutlineAirportShuttle, MdOutlineBathroom, MdOutlineBathtub, MdOutlineBreakfastDining, MdOutlineCancel, MdOutlineDinnerDining, MdOutlineHouseboat, MdOutlineLunchDining, MdOutlineNoDrinks, MdOutlineWorkOff, MdOutlineYard } from "react-icons/md";
import { PiDog, PiFireExtinguisher, PiFirstAidKit, PiHouseBold, PiHouseDuotone, PiLightbulbFilamentBold, PiParkLight, PiPianoKeys, PiSunHorizonBold, PiTelevision } from "react-icons/pi";
import { RiAlarmWarningLine, RiCustomerService2Line, RiHotelBedLine, RiTempColdLine } from "react-icons/ri";
import { TbBeach, TbDisabled, TbDoor, TbIroningOff, TbMeatOff, TbSofaOff, TbSpeedboat, TbWashMachine } from "react-icons/tb";
import { BedFunc } from "../../../Common/Enum/Enum";
import "./Icon.scss";

interface IProps{
  id?: number;
  code?: string;
}
export function AmenityIcon( props: IProps ): JSX.Element{
  const icon = [
    <TbDoor />,
    <BalconyIcon />,
    <FaPersonSwimming />,
    <FaKitchenSet />,
    <LiaRestroomSolid />,
    <TbSofaOff />,
    <LuBed />,
    <MdOutlineBathroom />,
    <MdOutlineBathtub />,
    <RiTempColdLine />,
    <TbWashMachine />,
    <BiSolidCoffeeBean />,
    <LuSunDim />,
    <TbIroningOff />,
    <BsWifi1 />,
    <BiFridge />,
    <PiTelevision />,
    <LuParkingCircleOff />,
    <GiPoolTriangle />,
    <RiCustomerService2Line />,
    <LiaSwimmingPoolSolid />,
    <GiWoodPile />,
    <LiaHotTubSolid />,
    <MdOutlineNoDrinks />,
    <PiPianoKeys />,
    <MdOutlineAirportShuttle />,
    <FaPersonSkiingNordic />,
    <PiParkLight />,
    <FaBanSmoking />,
    <TbMeatOff />,
    <LiaWaterSolid />,
    <MdOutlineHouseboat />,
    <IoRestaurantOutline />,
    <GiGymBag />,
    <MdOutlineYard />,
    <LiaGolfBallSolid />
    , <FaRegTired />
    , <FaChild />,
    <GiAncientSword />,
    <TbDisabled />,
    <MdOutlineWorkOff />,
    <FaShower />,
    <MdOutlineBreakfastDining />
    , <MdOutlineLunchDining />
    , <MdOutlineDinnerDining />
    , <BsTaxiFront />
    , <PiSunHorizonBold />,
    <MdNightlightRound />,
    <LiaPercentSolid />,
    <GiPayMoney />,
    <IoCashOutline />,
    <MdOutlineCancel />, //??? database nhay ID len 82
    <PiFireExtinguisher />,
    <PiFirstAidKit />,
    <BiCctv />,
    <RiAlarmWarningLine />,
    <GiGasMask />,
    <PiDog />,
    <LuCigarette />,
  ];
  //config
  //render
  switch( props ){
  }
  return (
    <>
      { props.id ? (icon[props.id - 1] ?? <BsHouseUp />) : <BsHouseUp /> }
    </>
  );
}
export function EstateIcon( props: IProps ): JSX.Element{
  const icon = [ <PiHouseDuotone />, <MdApartment />, <PiHouseBold />, <FaCaravan />, <TbBeach />, <BiBuildingHouse />, <LuHotel />, <GiSpeedBoat />, <TbSpeedboat /> ];
  //config
  //render
  switch( props ){
  }
  return (<>
      { props.id ? (icon[props.id] ?? icon[0]) : icon[0] }
      <FaRegTired />
    </>
  );
}
const bedIcon: JSX.Element[] = [
  <RiHotelBedLine />,
  <LuBedSingle />,
  <LuBedDouble />,
  <div className = { "multi-bed-icon" }><LuBedSingle /><span>x2</span></div>,
  <div className = { "multi-bed-icon" }><LuBedDouble /><span>x2</span></div>,
  <div className = { "multi-bed-icon" }><LuBedSingle />, <LuBedDouble /></div>,
  <div className = { "multi-bed-icon" }><LuBedSingle /><span>x3</span></div>,
  <div className = { "multi-bed-icon" }><LuBedSingle />, <LuBedDouble /><span>x2</span></div>,
  <div className = { "multi-bed-icon" }><LuBedSingle /><span>x2</span>, <LuBedDouble /></div>,
  <div className = { "multi-bed-icon" }><LuBedDouble /><span>x3</span></div>,
];
export function BedType( props: IProps ){
  return (
    <span className = { "bed-icon-wrapper normal" }>
      <span className = { "bed-icon" }>
        { props.id ? (bedIcon[props.id] ?? bedIcon[0]) : bedIcon[0] }
      </span>
      <span className = { "bed-type-content" }>{ BedFunc.typeOfBedValue( props.id ) }</span>
    </span>
  );
}
export function BedTypeForPost( props: IProps ){
  return (
    <span className = { "bed-icon-wrapper for-post" }>
      <span className = { "bed-icon" }>
        { props.id ? (bedIcon[props.id] ?? bedIcon[0]) : bedIcon[0] }
      </span>
      <span className = { "bed-type-content" }>{ BedFunc.typeOfBedValue( props.id ) }</span>
    </span>
  );
}
export function IconWrapper( props: { className?: string, title?: string | JSX.Element, children: JSX.Element } ): JSX.Element{
  return <span className = { classNames( "icon-wrapper", !props.title ? "active-grid" : "", (props.className ?? "") ) }>
    <span className = { "icon" }>
      { props.children }
    </span>
    { props.title ? <span className = { "icon-type-content" }>{ props.title }</span> : <></> }

  </span>;
}
export function RateStar( props: { rate: number } ): JSX.Element{
  return (props.rate === 1 ? <FaStar /> : <FaStarHalf />);
}
export function Amenity( props: { id: number; text: string; onSelect?: ( event?: any ) => void; className?: string; ref?: LegacyRef<HTMLDivElement>; numberOfAvailablePost?: number } ): JSX.Element{
  const amenities: React.JSX.Element[] = [ <PiLightbulbFilamentBold /> ];
  return (
    <div className = { "icon-amenity " + props.className }>
      <button className = "filter-btn" onClick = { () => { props.onSelect?.(); } }>
        <div className = "filter-icon">
          { amenities[props.id] ?? amenities[0] }
        </div>
        <span className = "filter-text">{ props.text }({ props.numberOfAvailablePost ?? 0 })</span>
      </button>
    </div>
  );
}
export function FormatPrice( props: { number: string | number } ): JSX.Element{
  const number = props.number + "";
  const groups = [];
  for( let i = number.length; i > 0; i -= 3 ){
    groups.unshift( number.slice( Math.max( 0, i - 3 ), i ) );
  }
  const formattedNumber = [];
  for( let index = 0; index < groups.length; index++ ){
    const className = index === 0 ? 'big-digits' : 'small-digits';
    formattedNumber.push(
      <span key = { `digits-${ index }` } className = { className }>
        { groups[index] }
      </span>,
    );
    if( index < groups.length - 1 ){
      formattedNumber.push(
        <span key = { `dot-${ index }` } className = "dot">
          .
        </span>,
      );
    }
  }
  return <>{ formattedNumber }</>;
}
