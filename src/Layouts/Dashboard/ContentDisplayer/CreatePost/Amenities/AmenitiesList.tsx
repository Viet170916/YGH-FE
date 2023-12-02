import BalconyIcon from '@mui/icons-material/Balcony';
import BalconyTwoToneIcon from '@mui/icons-material/BalconyTwoTone';
import { AiOutlineWifi } from "react-icons/ai";
import { BiCctv, BiFridge, BiHappyAlt, BiSolidCctv, BiSolidCoffeeBean, BiSolidFridge, BiSolidWasher, BiWater } from "react-icons/bi";
import { BsTaxiFront, BsTaxiFrontFill, BsWifi1 } from "react-icons/bs";
import { FaBed, FaChild, FaHotTub, FaRegTired, FaRestroom, FaShower, FaSmoking, FaSwimmer } from "react-icons/fa";
import { FaBanSmoking, FaKitchenSet, FaPersonSkiing, FaPersonSkiingNordic, FaPersonSwimming } from "react-icons/fa6";
import { GiAncientSword, GiCampfire, GiDrinking, GiDrippingSword, GiGasMask, GiGolfFlag, GiGymBag, GiKitchenKnives, GiNightSleep, GiPayMoney, GiPoisonGas, GiPoolDive, GiPoolTableCorner, GiPoolTriangle, GiReceiveMoney, GiShower, GiWeightLiftingUp, GiWoodPile } from "react-icons/gi";
import { IoCashOutline, IoCashSharp, IoRestaurantOutline, IoRestaurantSharp, IoSunny } from "react-icons/io5";
import { LiaGolfBallSolid, LiaHotTubSolid, LiaPercentageSolid, LiaPercentSolid, LiaRestroomSolid, LiaSwimmingPoolSolid, LiaWaterSolid } from "react-icons/lia";
import { LuBed, LuCigarette, LuCigaretteOff, LuParkingCircle, LuParkingCircleOff, LuSofa, LuSunDim } from "react-icons/lu";
import { MdAirportShuttle, MdBathroom, MdBathtub, MdBreakfastDining, MdCoffeeMaker, MdDinnerDining, MdFreeCancellation, MdHouseboat, MdLunchDining, MdNightlightRound, MdOutlineAirportShuttle, MdOutlineBathroom, MdOutlineBathtub, MdOutlineBreakfastDining, MdOutlineCancel, MdOutlineDinnerDining, MdOutlineHouseboat, MdOutlineLunchDining, MdOutlineNoDrinks, MdOutlineWorkHistory, MdOutlineWorkOff, MdOutlineYard, MdYard } from "react-icons/md";
import { PiDog, PiDogBold, PiFireExtinguisher, PiFireExtinguisherFill, PiFirstAidKit, PiParkFill, PiParkLight, PiPianoKeys, PiPianoKeysFill, PiSunDimBold, PiSunHorizonBold, PiTelevision, PiTelevisionFill, PiThermometerColdBold } from "react-icons/pi";
import { RiAlarmWarningFill, RiAlarmWarningLine, RiCustomerService2Fill, RiCustomerService2Line, RiFirstAidKitFill, RiTempColdLine } from "react-icons/ri";
import { TbDisabled, TbDisabled2, TbDoor, TbDoorExit, TbIroningOff, TbIroningSteam, TbMeat, TbMeatOff, TbSofaOff, TbWashMachine } from "react-icons/tb";

interface IAmenities{

  id: number,
  label: JSX.Element
  value: string
  uncheckedIcon?: JSX.Element
  checkedIcon?: JSX.Element
}
export const RoomAmenitiesOptions: IAmenities[] = [
  {
    id: 1,
    label:
      <div>Balcony</div>,
    value: "Balcony",
    uncheckedIcon: <TbDoor />,
    checkedIcon: <TbDoorExit />,
  },
  {
    id: 2,
    label:
      <div>Terrace</div>,
    value: "Terrace",
    uncheckedIcon: <BalconyIcon />,
    checkedIcon: <BalconyTwoToneIcon />,
  },
  {
    id: 3,
    label:
      <div>Private Pool</div>,
    value: "Private Pool",
    uncheckedIcon: <FaPersonSwimming />,
    checkedIcon: <FaSwimmer />,
  },
  {
    id: 4,
    label:
      <div>Kitchen</div>,
    value: "Kitchen",
    uncheckedIcon: <FaKitchenSet />,
    checkedIcon: <GiKitchenKnives />,
  },
  {
    id: 5,
    label:
      <div>Restroom</div>,
    value: "Restroom",
    uncheckedIcon: <LiaRestroomSolid />,
    checkedIcon: <FaRestroom />,
  },
  {
    id: 6,
    label:
      <div>Living<br />Room</div>,
    value: "Living Room",
    uncheckedIcon: <TbSofaOff />,
    checkedIcon: <LuSofa />,
  },
  {
    id: 7,
    label:
      <div>Bedroom</div>,
    value: "Bedroom",
    uncheckedIcon: <LuBed />,
    checkedIcon: <FaBed />,
  },
  {
    id: 8,
    label:
      <div>Bathroom</div>,
    value: "Bathroom",
    uncheckedIcon: <MdOutlineBathroom />,
    checkedIcon: <MdBathroom />,
  },
];
export const FurnitureAmenitiesOptions: IAmenities[] = [
  {
    id: 9,
    label:
      <div>Bathtub</div>,
    value: "Bathtub",
    uncheckedIcon: <MdOutlineBathtub />,
    checkedIcon: <MdBathtub />,
  },
  {
    id: 10,
    label:
      <div>Air Condi-<br />tioner</div>,
    value: "Air Conditioner",
    uncheckedIcon: <RiTempColdLine />,
    checkedIcon: <PiThermometerColdBold />,
  },
  {
    id: 11,
    label:
      <div>Washing<br />Machine</div>,
    value: "Washing Machine",
    uncheckedIcon: <TbWashMachine />,
    checkedIcon: <BiSolidWasher />,
  },
  {
    id: 12,
    label:
      <div>Coffee<br />Machine</div>,
    value: "Coffee Machine",
    uncheckedIcon: <BiSolidCoffeeBean />,
    checkedIcon: <MdCoffeeMaker />,
  },
  {
    id: 13,
    label:
      <div>Heater</div>,
    value: "Heater",
    uncheckedIcon: <LuSunDim />,
    checkedIcon: <IoSunny />,
  },
  {
    id: 14,
    label:
      <div>Laundry<br />Service</div>,
    value: "Laundry Service",
    uncheckedIcon: <TbIroningOff />,
    checkedIcon: <TbIroningSteam />,
  },
  {
    id: 15,
    label:
      <div>Wifi</div>,
    value: "Wifi",
    uncheckedIcon: <BsWifi1 />,
    checkedIcon: <AiOutlineWifi />,
  },
  {
    id: 16,
    label:
      <div>Fridge</div>,
    value: "Fridge",
    uncheckedIcon: <BiFridge />,
    checkedIcon: <BiSolidFridge />,
  },
  {
    id: 17,
    label:
      <div>TV</div>,
    value: "TV",
    uncheckedIcon: <PiTelevision />,
    checkedIcon: <PiTelevisionFill />,
  },
];
export const FacilityAmenitiesOptions: IAmenities[] = [
  {
    id: 18,
    label:
      <div>Parking</div>,
    value: "Parking",
    uncheckedIcon: <LuParkingCircleOff />,
    checkedIcon: <LuParkingCircle />,
  },
  {
    id: 19,
    label:
      <div>Pool table</div>,
    value: "Pool table",
    uncheckedIcon: <GiPoolTriangle />,
    checkedIcon: <GiPoolTableCorner />,
  },
  {
    id: 20,
    label:
      <div>Customer<br />Service</div>,
    value: "Customer Service",
    uncheckedIcon: <RiCustomerService2Line />,
    checkedIcon: <RiCustomerService2Fill />,
  },
  {
    id: 21,
    label:
      <div>Public Pool</div>,
    value: "Public Pool",
    uncheckedIcon: <LiaSwimmingPoolSolid />,
    checkedIcon: <GiPoolDive />,
  },
  {
    id: 22,
    label:
      <div>Campfire</div>,
    value: "Campfire",
    uncheckedIcon: <GiWoodPile />,
    checkedIcon: <GiCampfire />,
  },
  {
    id: 23,
    label:
      <div>Hot Tub</div>,
    value: "Hot Tub",
    uncheckedIcon: <LiaHotTubSolid />,
    checkedIcon: <FaHotTub />,
  },
  {
    id: 24,
    label:
      <div>Nightclub</div>,
    value: "Nightclub",
    uncheckedIcon: <MdOutlineNoDrinks />,
    checkedIcon: <GiDrinking />,
  },
  {
    id: 25,
    label:
      <div>Piano</div>,
    value: "BioLock",
    uncheckedIcon: <PiPianoKeys />,
    checkedIcon: <PiPianoKeysFill />,
  },
  {
    id: 26,
    label:
      <div>Airport<br />Transport</div>,
    value: "Airport Transport",
    uncheckedIcon: <MdOutlineAirportShuttle />,
    checkedIcon: <MdAirportShuttle />,
  },
  {
    id: 27,
    label:
      <div>Ski Track</div>,
    value: "Ski Track",
    uncheckedIcon: <FaPersonSkiingNordic />,
    checkedIcon: <FaPersonSkiing />,
  },
  {
    id: 28,
    label:
      <div>Picnic</div>,
    value: "Picnic",
    uncheckedIcon: <PiParkLight />,
    checkedIcon: <PiParkFill />,
  },
  {
    id: 29,
    label:
      <div>Smoking<br />Area</div>,
    value: "Smoking Area",
    uncheckedIcon: <FaBanSmoking />,
    checkedIcon: <FaSmoking />,
  },
  {
    id: 30,
    label:
      <div>BBQ</div>,
    value: "BBQ",
    uncheckedIcon: <TbMeatOff />,
    checkedIcon: <TbMeat />,
  },
  {
    id: 31,
    label:
      <div>Seaview</div>,
    value: "Seaview",
    uncheckedIcon: <LiaWaterSolid />,
    checkedIcon: <BiWater />,
  },
  {
    id: 32,
    label:
      <div>Lakeview</div>,
    value: "Lakeview",
    uncheckedIcon: <MdOutlineHouseboat />,
    checkedIcon: <MdHouseboat />,
  },
  {
    id: 33,
    label:
      <div>Restaurant</div>,
    value: "Restaurant",
    uncheckedIcon: <IoRestaurantOutline />,
    checkedIcon: <IoRestaurantSharp />,
  },
  {
    id: 34,
    label:
      <div>Gym</div>,
    value: "Gym",
    uncheckedIcon: <GiGymBag />,
    checkedIcon: <GiWeightLiftingUp />,
  },
  {
    id: 35,
    label:
      <div>Yard</div>,
    value: "Yard",
    uncheckedIcon: <MdOutlineYard />,
    checkedIcon: <MdYard />,
  },
  {
    id: 36,
    label:
      <div>Golf Field</div>,
    value: "Golf Field",
    uncheckedIcon: <LiaGolfBallSolid />,
    checkedIcon: <GiGolfFlag />,
  },
  {
    id: 37,
    label:
      <div>Spa/Sauna</div>,
    value: "Spa/Sauna",
    uncheckedIcon: <FaRegTired />,
    checkedIcon: <BiHappyAlt />,
  },
  {
    id: 38,
    label:
      <div>Family<br />Friendly</div>,
    value: "Family Friendly",
    uncheckedIcon: <FaChild />,
    checkedIcon: <FaChild />,
  },
  {
    id: 39,
    label:
      <div>Workout<br />Equipment</div>,
    value: "Workout Equipment",
    uncheckedIcon: <GiAncientSword />,
    checkedIcon: <GiDrippingSword />,
  },
  {
    id: 40,
    label:
      <div>Disability<br />Friendly</div>,
    value: "Disability Friendly",
    uncheckedIcon: <TbDisabled />,
    checkedIcon: <TbDisabled2 />,
  },
  {
    id: 41,
    label:
      <div>Working<br />Friendly</div>,
    value: "Working Friendly",
    uncheckedIcon: <MdOutlineWorkOff />,
    checkedIcon: <MdOutlineWorkHistory />,
  },
  {
    id: 42,
    label:
      <div>Outdoor<br />Shower</div>,
    value: "Outdoor Shower",
    uncheckedIcon: <FaShower />,
    checkedIcon: <GiShower />,
  },
];
export const RoomOfferAmenitiesOptions: IAmenities[] = [
  {
    id: 43,
    label:
      <div>Breakfast</div>,
    value: "Breakfast",
    uncheckedIcon: <MdOutlineBreakfastDining />,
    checkedIcon: <MdBreakfastDining />,
  },
  {
    id: 44,
    label:
      <div>Lunch</div>,
    value: "Lunch",
    uncheckedIcon: <MdOutlineLunchDining />,
    checkedIcon: <MdLunchDining />,
  },
  {
    id: 45,
    label:
      <div>Dinner</div>,
    value: "Dinner",
    uncheckedIcon: <MdOutlineDinnerDining />,
    checkedIcon: <MdDinnerDining />,
  },
  {
    id: 46,
    label:
      <div>Free<br />Transport</div>,
    value: "Outdoor Shower",
    uncheckedIcon: <BsTaxiFront />,
    checkedIcon: <BsTaxiFrontFill />,
  },
  {
    id: 47,
    label:
      <div>Early<br />checkin</div>,
    value: "Outdoor Shower",
    uncheckedIcon: <PiSunHorizonBold />,
    checkedIcon: <PiSunDimBold />,
  },
  {
    id: 48,
    label:
      <div>Late<br />checkout</div>,
    value: "Outdoor Shower",
    uncheckedIcon: <MdNightlightRound />,
    checkedIcon: <GiNightSleep />,
  },
];
export const PaymentAmenitiesOptions: IAmenities[] = [
  {
    id: 49,
    label:
      <div>Advance<br />Payment</div>,
    value: "Advance Payment",
    uncheckedIcon: <LiaPercentSolid />,
    checkedIcon: <LiaPercentageSolid />,
  },
  {
    id: 50,
    label:
      <div>Deffered<br />Payment</div>,
    value: "Deffered Payment",
    uncheckedIcon: <GiPayMoney />,
    checkedIcon: <GiReceiveMoney />,
  },
  {
    id: 51,
    label:
      <div>Pay at<br />Service</div>,
    value: "Pay at Service",
    uncheckedIcon: <IoCashOutline />,
    checkedIcon: <IoCashSharp />,
  },
  {
    id: 52,
    label:
      <div>Free<br />Cancelation</div>,
    value: "Free Cancelation",
    uncheckedIcon: <MdOutlineCancel />,
    checkedIcon: <MdFreeCancellation />,
  },
];
export const SafetyAmenitiesOptions: IAmenities[] = [
  {
    id: 53,
    label:
      <div>Fire<br />Extinguisher</div>,
    value: "Fire Extinguisher",
    uncheckedIcon: <PiFireExtinguisher />,
    checkedIcon: <PiFireExtinguisherFill />,
  },
  {
    id: 54,
    label:
      <div>Medical Kit</div>,
    value: "MedicalKit",
    uncheckedIcon: <PiFirstAidKit />,
    checkedIcon: <RiFirstAidKitFill />,
  },
  {
    id: 55,
    label:
      <div>CCTV</div>,
    value: "CCTV",
    uncheckedIcon: <BiCctv />,
    checkedIcon: <BiSolidCctv />,
  },
  {
    id: 56,
    label:
      <div>Smoke Alarm</div>,
    value: "SmokeAlarm",
    uncheckedIcon: <RiAlarmWarningLine />,
    checkedIcon: <RiAlarmWarningFill />,
  },
  {
    id: 57,
    label:
      <div>CO Detector</div>,
    value: "CO Detector",
    uncheckedIcon: <GiGasMask />,
    checkedIcon: <GiPoisonGas />,
  },
];
export const PoliciesAmenitiesOptions: IAmenities[] = [
  {
    id: 58,
    label:
      <div>Allow Pets</div>,
    value: "Allow Pets",
    uncheckedIcon: <PiDog />,
    checkedIcon: <PiDogBold />,
  },
  {
    id: 59,
    label:
      <div>No Smoking</div>,
    value: "No Smoking",
    uncheckedIcon: <LuCigarette />,
    checkedIcon: <LuCigaretteOff />,
  },
];
export const AllAmenitiesOptions: IAmenities[][] =
  [ RoomAmenitiesOptions, FurnitureAmenitiesOptions, FacilityAmenitiesOptions, RoomOfferAmenitiesOptions, PaymentAmenitiesOptions, SafetyAmenitiesOptions, PoliciesAmenitiesOptions ];
