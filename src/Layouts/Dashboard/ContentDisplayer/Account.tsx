import { useEffect, useState } from "react";
import UsernameDisplay from "../../../Components/Common/Inputs/TextDisplayInput/UsernameDisplay";
import {
  AccountInformation,
  ChangePassword,
} from "../../../Models/AccountInformation";
import MyProfileFilterBar from "../DashboardFilter/MyProfileFilterBar";
import TextDisplayInput from "../../../Components/Common/Inputs/TextDisplayInput";
import { Link, useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import Swal from "sweetalert2";
import { separateDigitsOfANumber } from "../../../Common/Utils/String";
import ROLE from "../../../Common/Enum/Role";

interface IProps {
  openMenuClick: () => void;
}
export default function Account(props: IProps) {
  const maxPasswordLength = 50;

  const [account, setAccount] = useState<AccountInformation>();
  const [changePasswordRequest, setChangePasswordRequest] =
    useState<ChangePassword>();
  const [loading, setLoading] = useState<boolean>(false);
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const [changePassword, setChangePassword] = useState<boolean>(false);
  const [responseInformation, setResponseInformation] = useState<{
    status: boolean;
    message: string;
  }>();

  const navigator = useNavigate();

  const handleDeposit = () => {
    // Swal.fire({
    //   text: "Scan QR code to go to the deposit site.",
    //   imageUrl: "https://qrcode-gen.com/images/qrcode-default.png",
    //   imageHeight: 200,
    //   imageAlt: "Custom image",
    // });
    window.location.href = "/deposit";
  };

  useEffect(() => {
    const abortController = new AbortController();
    setLoading(true);
    axios
      .get("/api/account", {
        signal: abortController.signal,
      })
      .then((response: AxiosResponse<AccountInformation>) => {
        setAccount(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setResponseInformation({ status: false, message: error.message });
        setLoading(false);
      });
    return () => {
      abortController.abort();
    };
  }, []);
  useEffect(() => {
    if (
      changePasswordRequest &&
      changePasswordRequest.newPassword !== changePasswordRequest.rePassword
    ) {
      setResponseInformation({
        status: false,
        message: "New password and re-enter password are not match",
      });
    } else setResponseInformation({ status: true, message: "" });
  }, [changePasswordRequest]);

  const sendData = () => {
    const abortController = new AbortController();
    if (loading) {
      abortController.abort();
      setLoading(false);
    } else if (
      changePasswordRequest?.rePassword.length == 0 ||
      changePasswordRequest?.newPassword.length == 0
    ) {
      setResponseInformation({
        status: false,
        message: "New password and re-enter password cannot empty",
      });
    } else {
      axios
        .post("/api/change-password", changePasswordRequest, {
          signal: abortController.signal,
        })
        .then((response) => {
          Swal.fire({
            title: response.data.message,
            timer: 2000,
            icon: "success",
          });
          setIsChanged(false);
          setChangePassword(false);
          setLoading(false);
        })
        .catch((error) => {
          Swal.fire("Failed", error.response.data.message, "error");
          setLoading(false);
        });
    }
  };

  const handleDeleteAccount = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Enter your password",
          input: "password",
          inputAttributes: {
            autocapitalize: "off",
          },
          showCancelButton: true,
          confirmButtonText: "Submit",
          showLoaderOnConfirm: true,
          preConfirm: (password: string) => {
            if (password == "" || password == null) {
              Swal.showValidationMessage("You must enter your password!");
            } else
              return axios
                .post(`/api/delete-account?password=${password}`)
                .then()
                .catch((error) => {
                  if (error.response)
                    Swal.showValidationMessage(
                      `${error.response.data.message}`
                    );
                  else Swal.showValidationMessage(error.message);
                });
          },
          allowOutsideClick: () => !Swal.isLoading(),
        }).then((result) => {
          if (result.isConfirmed) {
            localStorage.clear();
            Swal.fire(
              "Account Deleted",
              "Your account has been deleted",
              "success"
            );
            navigator("/");
          }
        });
      }
    });
  };

  return (
    <div className="right-area">
      <MyProfileFilterBar openMenuClick={props.openMenuClick} />
      <div className="page-right-content">
        {account && (
          <div style={{ display: "grid", gridTemplateRows: "1fr 100px" }}>
            <div className="information-container">
              <div className="formal-information">
                <div className="account-balance-container">
                  <UsernameDisplay content={account.username} />
                  {account.role == ROLE.LANDLORD && (
                    <>
                      <h2 className="balance">
                        Balance: {separateDigitsOfANumber(account.balance)} VNĐ
                      </h2>
                      <button
                        className="red-button base-border-radius btn-deposit"
                        onClick={handleDeposit}
                      >
                        Deposit
                      </button>
                      {/* <button className="red-button base-border-radius btn-payment-history">
                        Payment History
                      </button> */}
                    </>
                  )}
                </div>
              </div>
              <div className="detail-informations">
                <TextDisplayInput
                  label="Email"
                  isEmail={true}
                  content={account.email}
                  setContent={(value: string) => {
                    setAccount({ ...account, email: value });
                    setIsChanged(true);
                  }}
                />
                <div className="account-buttons">
                  {!changePassword && (
                    <div
                      className="change-password-btn"
                      onClick={() => {
                        setChangePassword(true);
                        setChangePasswordRequest({
                          currentPassword: "",
                          newPassword: "",
                          rePassword: "",
                        });
                      }}
                      onKeyDown={() => {}}
                    >
                      Change password
                    </div>
                  )}
                  {account.role == ROLE.TENANT && (
                    <Link
                      to={"upgrade "}
                      className={"upgrade-account change-password-btn"}
                    >
                      Register as Landlord
                    </Link>
                  )}
                </div>

                {changePassword && changePasswordRequest && (
                  <div className={"change-password"}>
                    <h3>Change Password</h3>
                    <TextDisplayInput
                      label="Enter current password"
                      isPassword
                      required
                      content={changePasswordRequest?.currentPassword ?? ""}
                      setContent={(value: string) => {
                        setChangePasswordRequest({
                          ...changePasswordRequest,
                          currentPassword: value,
                        });
                        setIsChanged(true);
                      }}
                      maxLength={maxPasswordLength}
                    />
                    <TextDisplayInput
                      label="Enter new password"
                      isPassword
                      required
                      content={changePasswordRequest.newPassword}
                      setContent={(value: string) => {
                        setChangePasswordRequest({
                          ...changePasswordRequest,
                          newPassword: value,
                        });
                        setIsChanged(true);
                      }}
                      maxLength={maxPasswordLength}
                    />
                    <TextDisplayInput
                      label="Confirm password"
                      isPassword
                      required
                      content={changePasswordRequest.rePassword}
                      setContent={(value: string) => {
                        setChangePasswordRequest({
                          ...changePasswordRequest,
                          rePassword: value,
                        });
                        setIsChanged(true);
                      }}
                      maxLength={maxPasswordLength}
                    />
                  </div>
                )}
                <div
                  className={"buttons"}
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  {changePassword && (
                    <button
                      className={"red-button base-border-radius"}
                      onClick={() => setChangePassword(false)}
                    >
                      Cancel
                    </button>
                  )}
                  {isChanged && (
                    <button
                      className={
                        "red-button base-border-radius save-change-btn"
                      }
                      onClick={sendData}
                    >
                      Save change
                    </button>
                  )}
                </div>
              </div>
            </div>
            <button
              className="red-button base-border-radius delete-account-button"
              onClick={handleDeleteAccount}
            >
              Delete Account
            </button>
          </div>
        )}
        {!account && (
          <div
            className={
              "message " + (responseInformation?.status ? "success" : "failure")
            }
          >
            {responseInformation?.message}
          </div>
        )}
      </div>
    </div>
  );
}
