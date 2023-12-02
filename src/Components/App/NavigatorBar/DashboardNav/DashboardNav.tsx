import React, { ForwardedRef, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Torus from "../../../../DefaultComponent/Torus";
import "../NavigatorBar.scss";
import { DashNavConfig, navConfig } from "./DashboardNav.config";
import axios, { AxiosResponse } from "axios";
import PersonalProfile from "../../../../Models/PersonalProfile";
import Swal from "sweetalert2";
import { AccountStatus } from "../../../../Common/Enum/AccountStatus";
import ROLE from "../../../../Common/Enum/Role";

interface IProps {}
const DashboardNav = React.forwardRef(
  (props: IProps, ref?: ForwardedRef<any>) => {
    const url = useLocation();
    const navigator = useNavigate();
    const ended = url.pathname.split("/")[2];
    const [userInfo, setUserInfo] = useState<PersonalProfile>();
    useEffect(() => {
      axios
        .get("/api/profile/private")
        .then((response: AxiosResponse<PersonalProfile>) => {
          if (
            response.data.accountStatus == AccountStatus.Active ||
            response.data.accountStatus == AccountStatus.Verified
          )
            setUserInfo(response.data);
          else {
            localStorage.clear();
            window.location.replace("/");
          }
        })
        .catch((error) => {
          Swal.fire("Error", error.response.data.message, "error");
        });
    }, []);

    const handleLogout = () => {
      localStorage.clear();
      window.location.replace("/login");
    };
    return (
      <div className="dashboard-nav left-area hide-on-mobile" ref={ref}>
        <div className="app-header">
          {/*<div*/}
          {/*  className={"logo-here"}*/}
          {/*  style={{ width: "60px", height: "60px" }}*/}
          {/*  onClick={() => navigator("/")}*/}
          {/*>*/}
          {/*  <Torus stopRotate={true} size={30} backgroundColor={"#f5f5f5"} />*/}
          {/*</div>*/}
          {/*<Logo />*/}
          <span
            style={{
              display: "flex",
              alignItems: "center",
              paddingLeft: "10px",
            }}
            onClick={() => navigator("/")}
          >
            Yuu
            <span className="inner-text" onClick={() => navigator("/")}>
              Gen
            </span>
          </span>
          <button
            className="close-menu"
            onClick={(event: any) => {
              event.currentTarget.parentNode.parentNode?.classList.add(
                "hide-on-mobile"
              );
            }}
          >
            <IoClose className={"feather feather-x"} />
          </button>
        </div>
        <div className="left-area-content">
          <div className="profile">
            <img
              src={
                userInfo?.avatarUrl ??
                "/assets/default-avatar-profile-icon.jpeg"
              }
              alt=""
            />
            <div className="profile-info">
              <span className="profile-name">{userInfo?.userName}</span>
            </div>
          </div>
          {navConfig.map((value: DashNavConfig) => {
            return (
              <div className={""} key={value.labelName}>
                <div className="list-header">
                  <span className="">{value.labelName}</span>
                </div>
                <div className="page-link-list">
                  {value.configure.map((config) =>
                    config?.["onClick"] ? (
                      <div
                        key={config.name}
                        className={"item-link "}
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          if (
                            localStorage["role"] == ROLE.LANDLORD ||
                            localStorage["role"] == ROLE.ADMIN
                          ) {
                            config.onClick();
                          } else {
                            navigator("/dashboard/account/upgrade");
                          }
                        }}
                        onKeyDown={() => {}}
                      >
                        {config.icon}
                        {config.name}
                      </div>
                    ) : (
                      <Link
                        to={
                          localStorage["role"] == ROLE.LANDLORD ||
                          config.name == "My Profile" ||
                          config.name == "Manage account"
                            ? config.redirectTo
                            : "/dashboard/account/upgrade"
                        }
                        className={`item-link ${
                          ended === config?.redirectTo?.split("/")[1]
                            ? "active"
                            : ""
                        }`}
                        id="pageLink"
                        key={value.labelName + "-" + config.name}
                      >
                        {config.icon}
                        {config.name}
                      </Link>
                    )
                  )}
                </div>
                {window["IoClose"]}
              </div>
            );
          })}
        </div>
        <button
          className="red-button base-border-radius button logout-button"
          onClick={handleLogout}
        >
          Log Out
        </button>
      </div>
    );
  }
);
export default DashboardNav;
