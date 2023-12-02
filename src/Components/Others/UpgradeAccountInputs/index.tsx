import PhoneInput from "react-phone-input-2";
import { UpgradeAccountInformation } from "../../../Models/AccountInformation";
import TextDisplayInput from "../../Common/Inputs/TextDisplayInput";
import "./UpgradeAccountInputs.scss";
import { useEffect, useRef, useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import axios, { AxiosResponse } from "axios";
import Swal from "sweetalert2";
import ROLE from "../../../Common/Enum/Role";

export default function UpdateAccountInputs() {
  const [loading, setLoading] = useState<boolean>(false);
  const [userInformation, setUserInformation] =
    useState<UpgradeAccountInformation>();
  const [editPhone, setEditPhone] = useState<boolean>(false);
  const [responseInformation, setResponseInformation] = useState<{
    status: boolean;
    message: string;
  }>();

  const inputPhoneRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (editPhone) {
      inputPhoneRef.current?.focus();
    }
  }, [editPhone]);
  useEffect(() => {
    const abortController = new AbortController();
    setLoading(true);
    axios
      .get("/api/update-info", { signal: abortController.signal })
      .then((response: AxiosResponse<UpgradeAccountInformation>) => {
        setUserInformation(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);

        setResponseInformation({ status: false, message: error.message });
        setLoading(false);
      });
    return () => {
      abortController.abort();
      setLoading(false);
    };
  }, []);

  function sendData() {
    const abortController = new AbortController();
    if (
      userInformation &&
      (userInformation.address?.length == 0 ||
        userInformation.fullname?.length == 0 ||
        userInformation.phoneNumber?.length == 0)
    )
      setResponseInformation({
        status: false,
        message: "You must enter all required fields (Fields with *)",
      });
    else {
      if (loading) abortController.abort();
      setLoading(true);
      axios
        .post("/api/upgrade-account", userInformation, {
          signal: abortController.signal,
        })
        .then((response) => {
          if (response.data) {
            Swal.fire({
              title: response.data.message,
              timer: 2000,
              icon: "success",
            });
            localStorage["role"] = ROLE.LANDLORD;
            window.location.replace("/dashboard/account");
          }
          setLoading(false);
        })
        .catch((error) => {
          Swal.fire("Failed", error.message, "error");
          setLoading(false);
        });
    }
  }
  if (userInformation)
    return (
      <div className="information-container">
        <div className="form-header">Register as Landlord</div>
        <div className="detail-informations">
          <TextDisplayInput
            required
            label="* Full name"
            maxLength={150}
            content={userInformation.fullname}
            setContent={(value: string) => {
              setUserInformation({ ...userInformation, fullname: value });
            }}
          />
          <TextDisplayInput
            required
            label="* Email"
            isEmail
            maxLength={100}
            content={userInformation.email}
          />
          <label style={{ fontWeight: "bold" }}>* Phone</label>
          <div className="phone-wrapper">
            <PhoneInput
              onBlur={() => {
                setEditPhone(false);
              }}
              inputClass="input-phone"
              inputProps={{ required: true, ref: inputPhoneRef }}
              disableDropdown
              disableCountryCode
              {...(editPhone ? { disabled: false } : { disabled: true })}
              onlyCountries={["vn"]}
              value={userInformation.phoneNumber}
              onChange={(phone) => {
                setUserInformation({
                  ...userInformation,
                  phoneNumber: phone,
                });
              }}
              containerClass="input-container"
              containerStyle={{ width: "90%" }}
              inputStyle={{
                paddingLeft: "4px",
                border: "none",
                backgroundColor: "transparent",
                outline: "none",
                height: "20px",
                fontWeight: "600",
              }}
              buttonStyle={{
                display: "none",
              }}
              placeholder="Enter your number"
            />
            <span
              className="edit-icon"
              onClick={() => {
                setEditPhone(true);
              }}
            >
              <FiEdit3 />
            </span>
          </div>
          <TextDisplayInput
            label="* Address"
            required
            maxLength={200}
            content={userInformation.address}
            setContent={(value: string) => {
              setUserInformation({ ...userInformation, address: value });
            }}
          />
          <TextDisplayInput
            label="Introduce your self"
            maxLength={500}
            content={userInformation.introduce}
            setContent={(value: string) => {
              setUserInformation({ ...userInformation, introduce: value });
            }}
          />
          <button className="red-button base-border-radius btn-register" onClick={sendData}>
            Register
          </button>
          <div
            className={
              "message " + (responseInformation?.status ? "success" : "failure")
            }
          >
            {responseInformation?.message}
          </div>
        </div>
      </div>
    );
  else
    return (
      <div
        className={
          "message " + (responseInformation?.status ? "success" : "failure")
        }
      >
        {responseInformation?.message}
      </div>
    );
}
