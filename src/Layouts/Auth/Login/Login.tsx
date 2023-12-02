import axios, { AxiosResponse } from "axios";
import React, { ChangeEvent, JSX, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../Auth.scss"
import { ImageList, ImageListItem } from "@mui/material";
import { AuthBannerImageList } from "../AuthBannerImageList";
import { AccountStatus } from "../../../Common/Enum/AccountStatus";
import PersonalProfile from "../../../Models/PersonalProfile";

interface IProps { }
function Login(props: IProps): JSX.Element {
  const [userName, setUserName] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [message, setMessage] = useState<string>();

  useEffect(() => {
    axios
      .get("/api/profile/private")
      .then((response: AxiosResponse<PersonalProfile>) => {
        if (response.data.accountStatus == AccountStatus.Active)
          window.location.replace("/");
        if (response.data.accountStatus == AccountStatus.InputNickname)
          localStorage.clear();
      })
      .catch((error) => {
        localStorage.clear();
      });
  }, []);
  
  function login() {
    axios
      .post("/api/login", { username: userName, password: password })
      .then((response: AxiosResponse) => {
        if (response.data.code === 200) {
          setMessage("");
          const user = response.data?.["data"];
          localStorage["KeyHeaderToken"] = user?.token;
          localStorage["userName"] = user?.userName;
          localStorage["email"] = "";
          localStorage["role"] = user?.role;
          localStorage["status"] = user?.status;
          if (user.status == AccountStatus.InputNickname)
            window.location.replace("/sign-up");
          else if (user.status == AccountStatus.Active)
            window.location.replace("/");
        } else if (response.data.code === 401) {
          setMessage(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
        
        const Err = error.response?.data;
        if (Err.errors?.["Username"]) {
          setMessage(Err.errors["Username"]);
        } else if (Err.errors?.["Password"]) {
          setMessage(Err.errors["Password"]);
        } else {
          setMessage(Err["message"]);
        }
      });
  }
  return (
    <div className="auth-page">
      <ImageList sx={{ width: 800, height: '100vh' }} variant="woven" cols={3} gap={8} className="image-list">
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
        <div className="login">
          <div className="title">Login</div>
          <div className="login__input form-authentication">
            <div className="input__block">
              <input
                placeholder={"Username"}
                type={"text"}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  setUserName(event.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key == "Enter") login();
                }}
              />
              <input
                placeholder={"Password"}
                type={"password"}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  setPassword(event.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key == "Enter") login();
                }}
              />
            </div>
          </div>
          <div className="login__button">
            <Link to="/sign-up">
              <button
                className={"button1"}
              >
                Sign up
              </button>
            </Link>
            <button
              className={"button2"}
              onClick={login}
            >
              Login
            </button>
          </div>
          <span className={"error red-text"}>{message}</span>
        </div>
      </div>
    </div>
  );
}
export default Login;
