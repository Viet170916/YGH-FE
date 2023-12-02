import axios from "axios";
import { UserNotification } from "../../../Models/NotificationResponse/Notification";
import "./NotificationList.scss";
import SingleNotification from "./SingleNotification";
import Swal from "sweetalert2";

interface IProps {
  notifications?: UserNotification[];
  className?: string;
  updateNotificationStatus: () => void;
  closeNotification: () => void;
}

export default function NotificationList(props: IProps) {
  function markAllAsRead() {
    axios
      .post("/api/Notification/read-all")
      .then((response) => {
        if (response.data.code == 200) props.updateNotificationStatus();
        else
          Swal.fire({
            title: "Failed",
            text: response.data.message,
            icon: "error",
          });
      })
      .catch((error) => {
        Swal.fire({
          title: "Failed",
          text: error.message,
          icon: "error",
        });
      });
  }

  return (
    <div
      className={"notification-over-lay" + ` ${props.className ?? ""}`}
      onClick={props.closeNotification}
      onKeyDown={() => {}}
    >
      <div
        className={"notification-list-container"}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={() => {}}
      >
        <div className="notification-list-header">
          <h2 className={"notification-list-title"}>Notifications</h2>
          <h4
            className={"mark-as-read-btn"}
            onClick={markAllAsRead}
            onKeyDown={() => {}}
          >
            Mark all as read
          </h4>
        </div>
        <div className="notifications">
          {props.notifications != undefined && props.notifications?.length > 0
            ? props.notifications.map((noti) => {
                return (
                  <SingleNotification
                    notification={noti}
                    key={noti.id}
                    updateNotificationStatus={props.updateNotificationStatus}
                  />
                );
              })
            : "You don't have any notifications"}
        </div>
      </div>
    </div>
  );
}
