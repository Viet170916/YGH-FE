export default interface ReservationRequest {
  id?: number;
  userId?: number;
  apartmentId: number;
  fromDate: string;
  toDate: string;
  status?: number;
  isDeleted?: boolean;
  ownerId?: number;
  bedType?: number;
  user?: User | null;
}

export interface User {
  id?: number;
  fullName?: string;
  phoneNumber?: string;
}
