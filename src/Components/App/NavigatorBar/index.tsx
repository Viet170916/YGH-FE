// import "./NavigatorBar.scss";
import axios, { AxiosResponse } from "axios";
import { JSX, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { AccountStatus } from "../../../Common/Enum/AccountStatus";
import PersonalProfile from "../../../Models/PersonalProfile";

interface IProps {
  selected: string;
}

function NavigatorBar(_props: IProps): JSX.Element {
  const locationUrl = useLocation();
  const url = locationUrl.pathname;
  const [userInfo, setUserInfo] = useState<PersonalProfile>();
  useEffect(() => {
    if (
      localStorage["KeyHeaderToken"] != "undefined" &&
      localStorage["KeyHeaderToken"] != null
    )
      axios
        .get("/api/profile/private")
        .then((response: AxiosResponse<PersonalProfile>) => {
          if (
            response.data.accountStatus == AccountStatus.Active ||
            response.data.accountStatus == AccountStatus.Verified
          )
            setUserInfo(response.data);
          else localStorage.clear();
        });
  }, []);
  return (
    <section className="navigation">
      <span
        style={{
          display: "flex",
          alignItems: "center",
          paddingLeft: "10px",
          cursor: "pointer",
          fontSize: "20px",
          fontWeight:"500"
        }}
        onClick={() => window.location.replace("/")}
        onKeyDown={() => {}}
      >
        Yuu
        <span className="inner-text">Gen</span>
      </span>

      <div className="navigation-links">
        <Link to="/" className={`nav-link ${url === "/" ? "active" : ""}`}>
          Home
        </Link>
        {/* <Link
          to = "/attraction"
          className = { `nav-link ${ url === "/attraction" ? "active" : "" }` }
        >
          Attraction
        </Link> */}
        <Link
          to={userInfo ? "/dashboard/order" : "/login"}
          className={`nav-link ${url === "/dashboard" ? "active" : ""}`}
        >
          Dashboard
        </Link>
        <Link
          to="/policy"
          className={`nav-link ${url === "/policy" ? "active" : ""}`}
        >
          Policies
        </Link>
      </div>
      <div className="nav-right-side">
        {userInfo ? (
          <Link className="profile-btn" to={"/dashboard/my-profile"}>
            <span>{userInfo?.userName}</span>
            <img
              src={
                userInfo?.avatarUrl ??
                "/assets/default-avatar-profile-icon.jpeg"
              }
              alt="pp"
            />
          </Link>
        ) : (
          <>
            <button
              className="red-text hover-light"
              onClick={() => {
                window.location.href = "/login";
              }}
            >
              Login
            </button>
            <button
              className="red-text hover-light"
              onClick={() => {
                window.location.href = "/sign-up";
              }}
            >
              Register
            </button>
          </>
        )}
      </div>
    </section>
  );
}
export default NavigatorBar;
