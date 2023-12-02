import axios, { AxiosResponse } from "axios";
import React, { JSX, useEffect, useState } from "react";
import { BiBell } from "react-icons/bi";
import { FiMoreVertical } from "react-icons/fi";
import { LuMenu } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { ReservationStatus } from "../../../Common/Enum/Enum";
import { urlParamsStringify } from "../../../Common/Utils/String";
import ShortPost from "../../../Components/App/ShortContentPost";
import Select, { Option } from "../../../Components/Common/DropDown/Select";
import ShortContentPost from "../../../Models/ShortContentPost";
import { UserNotification } from "../../../Models/NotificationResponse/Notification";
import { NotificationResponse } from "../../../Models/NotificationResponse/NotificationResponse";
import NotificationList from "../../../Components/App/NotificationList/NotificationList";
import { createAPost_ClickAction } from "../ContentDisplayer/CreatePost/CreatePost";
import ROLE from "../../../Common/Enum/Role";

interface IProps {
  params: {
    status: string | null;
    postId: string | null;
  };
  openMenuClick: () => void;
}
function RentalRequestFilterBar(props: IProps): JSX.Element {
  const defaultOption = {
    id: null,
    title: "no selection",
  };
  //config
  let status: Option[];
  status = [
    {
      id: ReservationStatus.PENDING,
      title: ReservationStatus.PENDING_STR,
    },
    {
      id: ReservationStatus.PAYMENT_WAITING,
      title: ReservationStatus.PAYMENT_WAITING_STR,
    },
    {
      id: ReservationStatus.CANCELLED,
      title: ReservationStatus.CANCELLED_STR,
    },
    {
      id: ReservationStatus.PAID,
      title: ReservationStatus.PAID_STR,
    },
    {
      id: ReservationStatus.REJECT,
      title: ReservationStatus.REJECT_STR,
    },
  ];
  //hooks
  const navigate = useNavigate();
  const [shortContentPost, setPosts] = useState<ShortContentPost[]>([]);
  // const [postOptions, setPostOptions] = useState();

  const [notificationNumber, setNotificationNumber] = useState<number>(0);
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [notificationPage, setNotificationPage] = useState<number>(1);
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<UserNotification[]>();
  const navigator = useNavigate();
  useEffect(() => {
    axios
      .get("/api/post/option")
      .then((response) => {
        console.log(response);
        setPosts(response.data as ShortContentPost[]);
      })
      .catch((error) => {
        console.log(error);
      });
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
  //handler functions
  const changeStatusParams = (value: number) =>
    urlParamsStringify({ ...props.params, status: value ?? null });
  const changePostParams = (value: number) =>
    urlParamsStringify({ ...props.params, postId: value ?? null });
  //render
  if (shortContentPost)
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
          {/*<Link className = "menu-links" to = { `` }>All</Link>*/}
          <Select
            initValue={
              !props.params?.postId
                ? (defaultOption as ShortContentPost)
                : shortContentPost?.find(
                    (currenPost: ShortContentPost) =>
                      currenPost.id + "" === props.params.postId
                  )
            }
            options={shortContentPost ?? []}
            solve={(value) => {
              navigate(changePostParams(value));
            }}
            customList={ShortPost}
          />
          <Select
            initValue={
              !props.params?.status
                ? (defaultOption as Option)
                : status.find(
                    (currentStatus) =>
                      currentStatus.id === parseInt(props.params.status)
                  )
            }
            options={status}
            solve={(value: number) => {
              navigate(changeStatusParams(value));
            }}
          />
          <button className="more-button">
            <FiMoreVertical className={"feather feather-more-vertical"} />
          </button>
          <ul className="more-menu-list hide">
            <li>
              <Link to={``}>All</Link>
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
export default RentalRequestFilterBar;
