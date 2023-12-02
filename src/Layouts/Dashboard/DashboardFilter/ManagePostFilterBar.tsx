import { JSX, useEffect, useState } from "react";
import { BiBell } from "react-icons/bi";
import { FiMoreVertical } from "react-icons/fi";
import { LuMenu } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import "../ContentDisplayer/ContentDisplayer.scss";
import axios, { Axios, AxiosResponse } from "axios";
import { UserNotification } from "../../../Models/NotificationResponse/Notification";
import { NotificationResponse } from "../../../Models/NotificationResponse/NotificationResponse";
import NotificationList from "../../../Components/App/NotificationList/NotificationList";
import { createAPost_ClickAction } from "../ContentDisplayer/CreatePost/CreatePost";
import ROLE from "../../../Common/Enum/Role";

interface IProps {
  openMenuClick: () => void;
}
function ManagePostFilterBar(props: IProps): JSX.Element {
  const [notificationNumber, setNotificationNumber] = useState<number>(0);
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [notificationPage, setNotificationPage] = useState<number>(1);
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<UserNotification[]>();
  const navigator = useNavigate();
  useEffect(() => {
    getNotifications();
  }, []);

  useEffect(() => {
    setNotificationNumber(0);
    if (notifications != undefined)
      notifications.forEach((notification) => {
        if (!notification.isRead) {
          setNotificationNumber((prev) => prev + 1);
        }
      });
  }, [notifications]);

  function getNotifications() {
    const abortController = new AbortController();
    if (isLoading) {
      abortController.abort();
      setIsloading(false);
    } else {
      axios
        .get(`/api/Notification/get-all-notification`, {
          signal: abortController.signal,
          params: {
            pageSize: 10,
            pageIndex: notificationPage,
          },
        })
        .then((response: AxiosResponse<NotificationResponse>) => {
          setNotifications(response.data.results);
          setIsloading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsloading(false);
        });
    }
  }

  const viewNotifications = () => {
    if (!showNotifications) {
      getNotifications();
    }
    setShowNotifications(!showNotifications);
  };
  return (
    <div className="right-area-upper">
      <button className="menu-button" onClick={props.openMenuClick}>
        <LuMenu />
      </button>
      <div className="search-part-wrapper">
        <input
          disabled
          className="search-input-nav"
          type="text"
          placeholder="Search..."
        />
        <Link className="menu-links" to={`./activated`}>
          Activated
        </Link>
        <Link className="menu-links" to={`./expired`}>
          Expired
        </Link>
        {/* <Link className="menu-links" to={`./waiting`}>
          Approval waiting
        </Link>
        <Link className="menu-links" to={`./rejected`}>
          Rejected
        </Link> */}
        <button className="more-button">
          <FiMoreVertical className={"feather feather-more-vertical"} />
        </button>
        <ul className="more-menu-list hide">
          <li>
            <Link to={`./activated`}>Activated</Link>
          </li>
          <li>
            <Link to={`./expired`}>Expired</Link>
          </li>
          <li>
            <Link to={`./waiting`}>Approval waiting</Link>
          </li>
          <li>
            <Link to={`./rejected`}>Rejected</Link>
          </li>
          <li>
            <button className="action-buttons btn-record">Create</button>
          </li>
          <li>
            <button className="action-buttons btn-upload">Upload</button>
          </li>
        </ul>
      </div>
      <button className="btn-notification" onClick={viewNotifications}>
        <BiBell className={"feather feather-bell"} />
        <span>{notificationNumber}</span>
      </button>
      <NotificationList
        notifications={notifications}
        className={showNotifications ? undefined : "hide"}
        updateNotificationStatus={getNotifications}
        closeNotification={() => {
          setShowNotifications(!showNotifications);
        }}
      />
      <div className="action-buttons-wrapper">
        <button
          className="red-button base-border-radius"
          onClick={() => {
            if (
              localStorage["role"] == ROLE.LANDLORD ||
              localStorage["role"] == ROLE.ADMIN
            ) {
              createAPost_ClickAction();
            } else {
              navigator("/dashboard/account/upgrade");
            }
          }}
        >
          New Post
        </button>
      </div>
    </div>
  );
}
export default ManagePostFilterBar;
