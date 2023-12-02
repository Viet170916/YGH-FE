export enum ReservationStatus {
  PENDING = 0,
  PAYMENT_WAITING = 1,
  CANCELLED = 2,
  PAID = 3,
  DONE = 4,
  REJECT= 5,
  DRAFT = 6,
  PENDING_STR = "Pending",
  PAYMENT_WAITING_STR = "Payment waiting",
  CANCELLED_STR = "Canceled",
  PAID_STR = "Paid",
  REJECT_STR = "Reject",
  DELETE = "api/order/update/delete",
}
export class ReservationStatusFunc {
  static isReject(valueToCheck: number): boolean {
    return valueToCheck === ReservationStatus.REJECT;
  };
  static isPending(valueToCheck: number): boolean {
    return valueToCheck === ReservationStatus.PENDING;
  };
  static isPaymentWaiting(valueToCheck: number): boolean {
    return valueToCheck === ReservationStatus.PAYMENT_WAITING;
  };
  static isPaid(valueToCheck: number): boolean {
    return valueToCheck === ReservationStatus.PAID;
  };
  static isCanceled(valueToCheck: number): boolean {
    return valueToCheck === ReservationStatus.CANCELLED;
  };
  static statusValue(valueToCheck: number | undefined): string {
    return ["Pending", "Payment waiting", "Canceled", "Paid", "Reject"][valueToCheck];
  };
}
export enum Bed {
  TWIN_BED = 1,
  DOUBLE_BED = 2,
  TWO_TWIN = 3,
  TWO_DOUBLE = 4,
  TWIN_DOUBLE = 5,
  THREE_TWIN = 6,
  TWIN_TWO_DOUBLE = 7,
  TWO_TWIN_DOUBLE = 8,
  THREE_DOUBLE = 9,
}
export class BedFunc {
  static isTwin(valueToCheck: number): boolean {
    return valueToCheck === Bed.TWIN_BED;
  }
  ;
  static isDouble(valueToCheck: number): boolean {
    return valueToCheck === Bed.DOUBLE_BED;
  };
  static isTwoTwin(valueToCheck: number): boolean {
    return valueToCheck === Bed.TWO_TWIN;
  };
  static isTwoDouble(valueToCheck: number): boolean {
    return valueToCheck === Bed.TWO_DOUBLE;
  };
  static isTwinDouble(valueToCheck: number): boolean {
    return valueToCheck === Bed.TWIN_DOUBLE;
  };
  static isThreeTwins(valueToCheck: number): boolean {
    return valueToCheck === Bed.THREE_TWIN;
  };
  static isTwinTwoDouble(valueToCheck: number): boolean {
    return valueToCheck === Bed.TWIN_TWO_DOUBLE;
  };
  static isTwoTwinDouble(valueToCheck: number): boolean {
    return valueToCheck === Bed.TWO_TWIN_DOUBLE;
  };
  static isThreeDouble(valueToCheck: number): boolean {
    return valueToCheck === Bed.THREE_DOUBLE;
  };
  static typeOfBedValue(valueToCheck: number | undefined): string {
    return ["Twin bed", "Double bed", "2 twin beds", "2 double beds", "1 twin and 1 double", "3 twins", "1 twin and 2 doubles", "2 twins and 1 double", "3 doubles"][valueToCheck - 1];
  };
}
