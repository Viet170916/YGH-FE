import { BsHouse } from "react-icons/bs";
import { FaCampground } from "react-icons/fa6";
import { GiHutsVillage, GiWoodCabin } from "react-icons/gi";
import { LuHotel } from "react-icons/lu";
import { MdApartment, MdOutlineBroadcastOnHome, MdOutlineBungalow, MdOutlineCastle, MdOutlineHolidayVillage } from "react-icons/md";
import { TbBuildingCottage } from "react-icons/tb";

export interface EstateType {
    id: number;
    type: string;
    logo: JSX.Element;
}


const estateList: EstateType[] = [
    {
        id: 1,
        type: "House",
        logo: <BsHouse/>
    },
    {
        id: 2,
        type: "Villa",
        logo: <GiHutsVillage/>
    },
    {
        id: 3,
        type: "Apartment",
        logo: <MdApartment/>
    },
    {
        id: 4,
        type: "Hotel",
        logo: <LuHotel/>
    },
    {
        id: 5,
        type: "Motel",
        logo: <MdOutlineBroadcastOnHome/>
    },
    {
        id: 6,
        type: "Duplex",
        logo: <MdOutlineHolidayVillage/>
    },
    {
        id: 7,
        type: "Cottage",
        logo: <TbBuildingCottage/>
    },
    {
        id: 8,
        type: "Bungalow",
        logo: <MdOutlineBungalow/>
    },
    {
        id: 9,
        type: "Cabin",
        logo: <GiWoodCabin/>
    },
    {
        id: 10,
        type: "Campground",
        logo: <FaCampground/>
    },
    {
        id: 11,
        type: "Resort",
        logo: <MdOutlineCastle/>
    },
];

export default estateList;
