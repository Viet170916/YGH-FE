import IYGLocation from "./YG_Location";

export interface Image{
  "id"?: number;
  "url"?: string;
  "description"?: string;
}
export default interface PostDetail{
  id: number;
  description: string;
  title: string;
  quality: string;
  location: IYGLocation;
  images: Image[];
  estateType: {
    id: number;
    name: string;
  };
  priceRange: {
    from: number;
    to: number;
  };
  policies: string;
  review: {
    count: number;
    rate: number;
    description: string;
  };
  amenities: {
    id: number;
    name: string;
    roomCount: number;
  }[];
  filterAmenities: { id: number; name: string; numberOfAvailableApartment }[];
  owner: {
    id: number;
    userName: string;
    avatarUrl: string;
    about: string;
    coverImageUrl: string;
    count: number;
    apartmentCount: number;
  };
  reviews: Review[];
}
export interface Review{
  rate: number;
  id: number;
  title: string;
  type: number;
  content: string;
  isRent: boolean;
  createAt: string;
  user: {
    id: number;
    username: string;
    avatarUrl: string;
    createAt?: string;
    highlight?: Highlight[];
  };
  reservation: {
    id: number;
    time: {
      night: number;
      inMonth: string;
    }
    apartment: {
      id: number;
      name: string;
      bedType: number;
    }
  };
}
export interface ApartmentDetail{
  id: number;
  name: number;
  postId?: number,
  userName?: string,
  area: number;
  available: number;
  description: string;
  images: Image[];
  numberOfReservation: number;
  amenities: {
    id: number;
    name: string;
    type: number;
  }[];
  amenitiesPayment: {
    id: number;
    name: string;
    type: number;
  }[];
  amenitiesRoom: {
    id: number;
    name: string;
    type: number;
  }[];
  bedTypes: RoomType[];
  benefit: { id: number; name: string; applyingUntilDate: string; }[];
}
export interface Highlight{
  type: number;
  description: string;
  createAt: string;
}
export interface RoomType{
  id?: number;
  type?: number;
  price?: number;
  unAvailableDates?: { since: string | Date; to: string | Date }[],
  quantity?: number
}
