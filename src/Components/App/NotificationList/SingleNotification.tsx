import axios from "axios";
import Swal from "sweetalert2";
import {
  NotificationMessage,
  NotificationType,
} from "../../../Common/Enum/NotificationType";
import { UserNotification } from "../../../Models/NotificationResponse/Notification";
import "./NotificationList.scss";
import { ReservationStatus } from "../../../Common/Enum/Enum";
import { useEffect, useState } from "react";

interface IProps {
  notification: UserNotification;
  updateNotificationStatus: () => void;
}
export default function SingleNotification(props: IProps) {
  const notification = props.notification;
  function readNotification() {
    if (!notification.isRead)
      axios
        .post(`/api/Notification/read-noti`, null, {
          params: { notificationId: notification.id },
        })
        .then((response) => {
          if (response.data.code == 200) props.updateNotificationStatus();
          else
            Swal.fire({
              title: "Error",
              text: response.data.message,
              icon: "error",
            });
        })
        .catch((error) =>
          Swal.fire({ title: "Error", text: error.message, icon: "error" })
        );
    if (notification.type == NotificationType.Reservation_LandLord)
      window.location.href = "/dashboard/order";
    else if (notification.type == NotificationType.Review_LandLord)
      window.location.href = `/${localStorage["userName"]}/${notification}`;
  }
  const [reservationNotificationMessage, setReservationNotificationMessage] =
    useState<string>("");
  useEffect(() => {
    if (notification.type == NotificationType.Reservation_Tenant) {
      switch (notification.reservation?.status) {
        case ReservationStatus.PAYMENT_WAITING:
          setReservationNotificationMessage("has confirmed your reservation.");
          break;
        case ReservationStatus.CANCELLED:
          setReservationNotificationMessage("has canceled your reservation.");
          break;
        case ReservationStatus.PAID:
          setReservationNotificationMessage(
            "has confirmed your payment for reservation."
          );
          break;
        case ReservationStatus.REJECT:
          setReservationNotificationMessage("has rejected your reservation.");
          break;
        case ReservationStatus.PENDING:
          setReservationNotificationMessage("has received your reservation.");
          break;
        default:
          setReservationNotificationMessage(
            "has changed the status of your reservation!"
          );
      }
    }
  }, []);

  return (
    <div
      className={
        "notification-container" + `${notification.isRead ? "" : " unread"}`
      }
      onClick={readNotification}
      onKeyDown={(e) => console.log(e)}
    >
      <div>
        <strong>{notification.author} </strong>
        {notification.type == NotificationType.Follow_LandLord && (
          <span>{NotificationMessage.Follow_LandLord}</span>
        )}
        {notification.type == NotificationType.Reservation_LandLord && (
          <span>{NotificationMessage.Reservation_LandLord}</span>
        )}
        {notification.type == NotificationType.Reservation_Tenant && (
          <span>{reservationNotificationMessage}</span>
        )}
        {notification.type == NotificationType.Review_LandLord && (
          <span>{NotificationMessage.Review_LandLord}</span>
        )}
      </div>
      <div>
        {/*{notification}*/}
      </div>


    </div>
  );
}
