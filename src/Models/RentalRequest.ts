  export interface UserResponse{
    id: string;
    "name": string;
    "avatarUrl": string;
    "phone": string;
  }
  export interface AccommodationResponse{
    "id": string;
    "title": string;
    "apartment": ApartmentResponse;


  }
  export interface ApartmentResponse{
    "id": string;
    "name": string;
    // "image"?: string;

  }
  export default interface RentalRequest{
    id: number;
    "createAt": string;
    "checkinDate": string;
    "checkoutDate": string;
    "status": number;
    // "paymentStatus": boolean;
    "tenant": UserResponse;
    "accommodation": AccommodationResponse;
  }










  