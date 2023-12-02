  import IYGLocation from "./YG_Location";

  export interface HomeFilter{
    location: IYGLocation;
    availableDate: {
      since: Date|string;
      to: Date|string;
    };
    price: {
      from: number;
      to: number;
      max: number;
    };
    numberOfBed: number;
    estateTypes: EstateType[];
    amenities: Amenity[];
  }
  export interface EstateType{
    id: number,
    name: string
  }
  export interface Amenity{
    id: number,
    name: string
  }









  
