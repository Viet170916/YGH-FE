import axios, { AxiosResponse } from "axios";
import React, { ChangeEvent, JSX, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SignUpRequest } from "../../../Models/AccountInformation";
// import "../Login/Login.scss";
// import "./SignIn.scss";
import "../Auth.scss";
import PersonalProfile from "../../../Models/PersonalProfile";
import { ImageList, ImageListItem } from "@mui/material";
import { AuthBannerImageList } from "../AuthBannerImageList";
import { AccountStatus } from "../../../Common/Enum/AccountStatus";
import Swal from "sweetalert2";

interface IProps {}
function SignUp(): JSX.Element {
  const [user, setUser] = useState<SignUpRequest>();
  const [isSuccess, setSuccess] = useState(false);
  const [message, setMessage] = useState<SignUpRequest>();
  const [token, setToken] = useState<string>();

  useEffect(() => {
    axios
      .get("/api/profile/private")
      .then((response: AxiosResponse<PersonalProfile>) => {
        if (response.data.accountStatus == AccountStatus.Active)
          window.location.replace("/");
        if (response.data.accountStatus == AccountStatus.InputNickname) {
          setUser({ ...user, username: response.data.userName });
          setToken(localStorage["KeyHeaderToken"]);
          setSuccess(true);
        }
      })
      .catch((error) => {
        localStorage.clear();
      });
  }, []);

  function register() {
    axios
      .post("/api/register", {
        gmail: user?.email,
        password: user?.password,
        rePassword: user?.rePassword,
      })
      .then((response) => {
        if (response.data.code == 200) {
          setMessage(null);
          const userRes = response.data?.["data"];

          localStorage["userName"] = userRes?.["usernameSuggest"];
          setUser({ ...user, username: userRes?.["usernameSuggest"] });
          Swal.fire({
            title: "Please check your email for verification",
            icon: "success",
          }).then(() => {
            window.location.replace("/login");
          });
        } else if (response.data?.code == 400) {
          setMessage(response.data.message);
        }
      })
      .catch((error) => {
        const Err = error.response?.data;
        if (Err.errors?.["Username"]) {
          setMessage(Err.errors["Gmail"]);
        } else if (Err.errors?.["Password"]) {
          setMessage(Err.errors["Password"]);
        } else if (Err.errors?.["RePassword"]) {
          setMessage(Err.errors["RePassword"]);
        } else {
          setMessage(Err["message"]);
        }
      });
  }
  async function updateUsername() {
    try {
      if (token) {
        const response = await axios.post("/api/input-username", null, {
          params: { username: user?.username },
          headers: { YghRentalToken: token },
        });
        if (response.data?.data?.token) {
          const userResponse = response.data?.["data"];
          localStorage["KeyHeaderToken"] = userResponse?.token;
          localStorage["userName"] = userResponse?.userName;
          localStorage["email"] = "";
          localStorage["role"] = userResponse?.role;
          localStorage["status"] = userResponse?.status;
          window.location.replace("/");
        } else {
          console.log(response);
          setMessage(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      // setMessage(error);
    }
  }

  return (
    <div className="auth-page">
      <ImageList
        sx={{ width: 800, height: "100vh" }}
        variant="woven"
        cols={3}
        gap={8}
        className="image-list"
      >
        {AuthBannerImageList.map((item) => (
          <ImageListItem key={item.img}>
            <img
              srcSet={`${item.img}?w=161&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.img}?w=161&fit=crop&auto=format`}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
      <div className={"auth-container"}>
        <div className="signIn">
          <div className="title">Sign Up</div>
          {!isSuccess ? (
            <div className="signIn__input form-authentication ">
              <div className="input__block">
                <input
                  placeholder={"Email"}
                  type={"text"}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    setUser({ ...user, email: event.target.value });
                  }}
                />
                <input
                  placeholder={"Password"}
                  type={"password"}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    setUser({ ...user, password: event.target.value });
                  }}
                />
                <input
                  placeholder={"Re-enter password"}
                  type={"password"}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    setUser({ ...user, rePassword: event.target.value });
                  }}
                />
              </div>
              <div className="signIn-foot page2">
                <div className="signIn__checkbox">
                  <div className="checkbox">
                    <input type="checkbox" id="checkbox" />
                    <label className="sign-in-confirm">
                      <strong>
                        By selecting the button below, I agree to the
                      </strong>{" "}
                      <a href="/policies">
                        <i> System Policies</i>
                      </a>
                    </label>
                  </div>
                </div>
                <div className="signIn__button">
                  <Link to="/login">
                    <button className={"button1"}>Back to login</button>
                  </Link>
                  <button className={"button2"} onClick={register}>
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="signIn__input form-authentication ">
              <div className="input__block">
                <label htmlFor="input-username">Enter your username</label>
                <input
                  id={"input-username"}
                  placeholder={"User name"}
                  type={"text"}
                  value={user?.username ?? ""}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    setUser({ ...user, username: event.target.value });
                  }}
                />
              </div>
              <div className="signIn-foot center-button">
                <button
                  className={
                    "border-light-color base-border-radius red-button "
                  }
                  onClick={updateUsername}
                >
                  Sign Up
                </button>
              </div>
            </div>
          )}
          <div className={"error red-text"}>{message}</div>
        </div>
      </div>
    </div>
  );
}
export default SignUp;
