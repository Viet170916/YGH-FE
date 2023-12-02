  import { UserResponse } from "./RentalRequest";
  import IYGLocation from "./YG_Location";



  interface PostMainLayout{
    image: string;
    title: string;
    location: IYGLocation;
    price: {
      "from": number,
      "to": number,
      "max": number
    };
    id: number;
    quality: number;
    reviews: Review;
    follower: Follower;
    isFollowed: boolean;
    userName?: string;
  }
  export default PostMainLayout;
  export interface Review{
    rate: number[];
    count: number,
    fiveTaken: UserResponse[];
  }
  export interface Follower{
    count: number;
    fiveTaken: UserResponse[];
  }













  
