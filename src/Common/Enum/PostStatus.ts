export enum PostStatus{
  WAITING = 0,
  EXPIRED = 1,
  APPROVED = 2,
  ACTIVATED = 3,
  REJECTED = 4,
  DELETED = 5,
  DRAFT = 6,
  ACTIVATED_STR = "Activated",
  APPROVED_TSR = "Approved",
  DELETED_TSR = "Deleted",
  APPROVAL_WAITING_STR = "Approval waiting",
  EXPIRED_STR = "Expired posts",
  REJECT_STR = "Rejected post",
  DRAFT_STR = "Draft"
}
export class PostStatusFunc{
  static isActivated( valueToCheck: number ): boolean{
    return valueToCheck === PostStatus.ACTIVATED;
  }
  static isExpired( valueToCheck: number ): boolean{
    return valueToCheck === PostStatus.EXPIRED;
  }
  static isRejected( valueToCheck: number ): boolean{
    return valueToCheck === PostStatus.REJECTED;
  }
  static isWaitedApproval( valueToCheck: number ): boolean{
    return valueToCheck === PostStatus.WAITING;
  }
  static isApproved( valueToCheck: number ): boolean{
    return valueToCheck === PostStatus.APPROVED;
  }
  static isDeleted( valueToCheck: number ): boolean{
    return valueToCheck === PostStatus.DELETED;
  }
  static statusString( valueToCheck: number ){
    return [
      PostStatus.ACTIVATED_STR,
      PostStatus.APPROVAL_WAITING_STR,
      PostStatus.APPROVED_TSR,
      PostStatus.EXPIRED_STR,
      PostStatus.REJECT_STR,
      PostStatus.DELETED_TSR ][valueToCheck];
  }
  static isInclude( valueToCheck: number ): boolean{
    const enumValues = Object.values( PostStatus );
    return enumValues.includes( valueToCheck );
  }
  static understandUrl( valueToCheck: string | undefined ): number | null{
    return ({ waiting: 0, expired: 1, approve: 2, activated: 3, rejected: 4, deleted: 5 })[valueToCheck];
  }
}
