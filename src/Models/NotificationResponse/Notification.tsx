import { Bed, ReservationStatus } from "../../Common/Enum/Enum";
import { NotificationType } from "../../Common/Enum/NotificationType";

export interface UserNotification {
  userId: number;
  id: number;
  type: NotificationType;
  author: string;
  isRead: boolean;
  follow?: Follow;
  reservation?: Reservation;
  review?: Review;
}
// tam thoi chua biet notification co cac truong nao

export interface Reservation {
  id: number;
  userId: number;
  apartmentId: number;
  fromDate: Date;
  toDate: Date;
  status: ReservationStatus;
  ownerId: number;
  bedType: Bed;
  createdAt: Date;
  modifiedAt: Date;
  isDeleted: boolean;
}
export interface Follow {
  id: number;
  userId: number;
  accomodationId: number;
  createdAt: Date;
  modifiedAt: Date;
  isDeleted: boolean;
}
export interface Review {}
