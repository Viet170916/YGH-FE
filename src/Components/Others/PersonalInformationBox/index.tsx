import axios, { AxiosResponse } from "axios";
import { useEffect, useRef, useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import PersonalProfile from "../../../Models/PersonalProfile";
import TextDisplayInput from "../../Common/Inputs/TextDisplayInput";
import UsernameDisplay from "../../Common/Inputs/TextDisplayInput/UsernameDisplay";
import "./PersonalInformationBox.scss";
import Swal from "sweetalert2";
import RichTextEditor from "../../Common/Inputs/RichTextEditor";
import parse from "html-react-parser";
import { BsGear } from "react-icons/bs";

function PersonalInformationBox() {
  useEffect(() => {
    const abortController = new AbortController();
    setLoading(true);
    axios
      .get("/api/profile/private", {
        signal: abortController.signal,
      })
      .then((response: AxiosResponse<PersonalProfile>) => {
        setProfileInfo(response.data);
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

  const [loading, setLoading] = useState<boolean>(false);
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const [profileInfo, setProfileInfo] = useState<PersonalProfile>();
  const [editPhone, setEditPhone] = useState<boolean>(false);
  const [editIntroduce, setEditIntroduce] = useState<boolean>(false);
  const [responseInformation, setResponseInformation] = useState<{
    status: boolean;
    message: string;
  }>();

  const avatarWidth: string = "200px";
  const avatarHeight: string = "200px";

  const inputPhoneRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (editPhone) {
      inputPhoneRef.current?.focus();
    }
  }, [editPhone]);

  function sendData() {
    const abortController = new AbortController();
    if (loading) {
      abortController.abort();
      setLoading(false);
    }
    setLoading(true);
    axios
      .post("/api/profile/update-profile", profileInfo, {
        signal: abortController.signal,
      })
      .then((response) => {
        if (response.data) {
          setIsChanged(false);
          Swal.fire({
            title: response.data.message,
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);

        Swal.fire("Failed", error.response.data.message, "error");
        setLoading(false);
      });
  }

  if (profileInfo)
    return (
      <div className="information-container">
        <div
          className="formal-information"
          style={{
            backgroundImage: "url(" + profileInfo.backgroundImageUrl + ")",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div
            className="border-light-color avatar-container base-border-radius"
            style={{
              backgroundImage:
                "url(" +
                (profileInfo?.avatarUrl ??
                  "/assets/default-avatar-profile-icon.jpeg") +
                ")",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: avatarWidth,
              height: avatarHeight,
            }}
          ></div>
          <UsernameDisplay
            editable
            content={profileInfo.userName}
            setContent={(value: string) => {
              setProfileInfo({ ...profileInfo, userName: value });
              setIsChanged(true);
            }}
          />
          {!editIntroduce ? (
            <div className="introduce-container">
              <div className="introduce-content">
                {parse(
                  profileInfo.introduce &&
                    profileInfo.introduce?.trim().length > 0
                    ? profileInfo.introduce
                    : "No introduction"
                )}
              </div>
              <span
                className="edit-icon"
                style={{ fontSize: ".8em" }}
                onClick={() => {
                  setEditIntroduce(true);
                }}
                onKeyDown={() => {}}
              >
                <BsGear />
              </span>
            </div>
          ) : (
            <div className="introduce-container">
              <RichTextEditor
                value={profileInfo.introduce ?? ""}
                onBlur={(value: string) => {
                  setProfileInfo({ ...profileInfo, introduce: value });
                  setIsChanged(true);
                }}
              />
              <div
                className="red-button base-border-radius button"
                onClick={() => {
                  setEditIntroduce(false);
                }}
                onKeyDown={() => {}}
              >
                save
              </div>
            </div>
          )}
        </div>
        <div className="detail-informations">
          <TextDisplayInput
            label="Full name"
            content={profileInfo.fullName}
            setContent={(value: string) => {
              setProfileInfo({ ...profileInfo, fullName: value });
              setIsChanged(true);
            }}
            maxLength={150}
          />
          <TextDisplayInput
            label="Address"
            content={profileInfo.address}
            setContent={(value: string) => {
              setProfileInfo({ ...profileInfo, address: value });
              setIsChanged(true);
            }}
            maxLength={200}
          />
          <h2 style={{ fontWeight: "bold" }}>Contact</h2>
          <label style={{ fontWeight: "bold" }}>Phone</label>
          <div className="phone-wrapper">
            <PhoneInput
              inputClass="input-phone"
              inputProps={{ ref: inputPhoneRef }}
              onBlur={() => setEditPhone(false)}
              disableDropdown
              disableCountryCode
              {...(editPhone ? { disabled: false } : { disabled: true })}
              onlyCountries={["vn"]}
              value={profileInfo.contact.phoneNumber ?? ""}
              onChange={(phone) => {
                setProfileInfo({
                  ...profileInfo,
                  contact: { ...profileInfo.contact, phoneNumber: phone },
                });
                setIsChanged(true);
              }}
              containerClass="input-container"
              containerStyle={{ width: "90%" }}
              inputStyle={{
                paddingLeft: "4px",
                border: "none",
                backgroundColor: "transparent",
                outline: "none",
                height: "20px",
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
              onKeyDown={() => {}}
            >
              <FiEdit3 />
            </span>
          </div>
          <TextDisplayInput
            label="Email"
            isEmail={true}
            content={profileInfo.contact.email}
            setContent={(value: string) => {
              setProfileInfo({
                ...profileInfo,
                contact: {
                  ...profileInfo.contact,
                  email: value,
                },
              });
              setIsChanged(true);
            }}
            maxLength={100}
          />
        </div>
        {isChanged && (
          <button
            className="save-change-btn red-button base-border-radius"
            onClick={() => {
              sendData();
            }}
          >
            Save Change
          </button>
        )}
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
export default PersonalInformationBox;
