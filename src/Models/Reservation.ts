import { UserResponse } from "./RentalRequest";

class Reservation{
  public id: number;
  public owner: UserResponse;
  public "createAt": string;
  public "checkinDate": string;
  public "checkoutDate": string;
  public "status": number;
  public "tenant": UserResponse;
  public "accommodation": AccommodationDetailResponse;
}
export interface AccommodationDetailResponse{
  "id": number;
  "title": string;
  "images": string[];
  "apartment": ApartmentDetailResponse;
}
export interface ApartmentDetailResponse{
  "id": number;
  "name": string;
  "thumbnailUrl": string;
  "typeOfBed": number;
  "price": number;
}
export default Reservation;
