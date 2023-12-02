import { UserNotification } from "./Notification";

export interface NotificationResponse {
  currentPage: number;
  firstRowOnPage: number;
  lastRowOnPage: number;
  maxSetting: number;
  pageCount: number;
  pageSize: number;
  results: UserNotification[];
  rowCount: number;
}
