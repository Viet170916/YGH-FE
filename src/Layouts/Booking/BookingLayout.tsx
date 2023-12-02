import axios, { AxiosResponse } from "axios";
import classNames from "classnames";
import moment from "moment/moment";
import React, { JSX, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ReservationStatus } from "../../Common/Enum/Enum";
import { separateDigitsOfANumber } from "../../Common/Utils/String";
import { Selected } from "../../Components/App/Apartment/Apartment";
import { BedTypeForPost } from "../../Components/App/Icons/Icon";
import ImageFitSize from "../../Components/App/Image/ImageFitSize";
import Calendar from "../../Components/Common/Calendar";
import TextDisplayInput from "../../Components/Common/Inputs/TextDisplayInput";
import { ApartmentDetail, RoomType } from "../../Models/PostDetail";
import Reservation from "../../Models/Reservation";
import ReservationRequest from "../../Models/ReservationRequest";
import "./BookingLayout.scss";
import Swal from "sweetalert2";

interface IProps {}
function BookingLayout(props: IProps): JSX.Element {
  //config
  const [room, setRoom] = useState<ApartmentDetail>(null);
  const [selected, setSelected] = useState<Selected>(null);
  const [reservation, setReservation] = useState<Reservation>(null);
  const { reservationId } = useParams();
  const [userInfo, setUserInfo] = useState();
  const [message, setMessage] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const [acceptPolicies, setAcceptPolicies] = useState<boolean>(false);
  //hooks
  useEffect(getApartment, [reservationId]);
  //handler functions
  function getApartment() {
    axios
      .get("api/apartment/for-booking", {
        params: {
          status: ReservationStatus.DRAFT,
          reservationId: reservationId,
        },
      })
      .then((response: AxiosResponse<ApartmentDetail>) => {
        setRoom(response.data);
        return response.data.bedTypes;
      })
      .then((rooms) => {
        getReservation(rooms);
      })
      .catch(() => {});
  }
  function getReservation(rooms: RoomType[]) {
    axios
      .get("api/booking/first", {
        params: {
          reservationId: reservationId,
          status: ReservationStatus.DRAFT,
        },
      })
      .then((response: AxiosResponse<Reservation>) => {
        setReservation(response.data);
        return response.data;
      })
      .then((response: Reservation) => {
        setUserInfo({
          fullName: response.tenant.name,
          phoneNumber: response.tenant.phone,
        } as any);
        setSelected({
          ...selected,
          rangeDate: {
            since: new Date(response.checkinDate),
            to: new Date(response.checkoutDate),
          },
          roomType: rooms?.find?.(
            (room: RoomType) =>
              room.type === response.accommodation.apartment.typeOfBed
          ),
        });
      })
      .catch((error) => {
        Swal.fire("Failed", error.response?.data.message, "error");
        console.log(error);

        if (error.response.status === 404) {
          setIsError(true);
        }
      });
  }
  //cài lại múi giờ
  function updateReservation() {
    const booking: ReservationRequest = {
      id: reservationId,
      // apartmentId: room.id,
      fromDate: selected.rangeDate?.since,
      toDate: selected.rangeDate?.to,
      bedType: selected.roomType?.type,
      createAt: new Date(),
      user: {
        fullName: userInfo?.["fullName"],
        phoneNumber: userInfo?.["phoneNumber"],
      },
    } as ReservationRequest;
    axios
      .post("api/booking/update", booking)
      .then((response: AxiosResponse<any>) => {
        if (response.data?.["data"]?.["id"]) {
          // window.location.replace( `/booking/${ response.data?.["data"]?.["id"] }` );
          window.location.replace("/dashboard/booking");
        } else {
          setMessage("try again");
        }
      })
      .catch((error) => {
        setMessage(error?.response?.data?.["message"]);
      });
  }

  //render
  if (room && reservation)
    return (
      <div className={classNames("reservation-layout")}>
        <div className={classNames("apartments")}>
          <div className={"summary-post border-bottom-light-color"}>
            <div className={"image"}>
              <ImageFitSize
                src={room?.images?.[0]?.url}
                className={"apartment-image"}
              />
            </div>
            <div className={"apartment-description"}>
              <a href={`/${room.userName}/${room.postId}/${room.id}`}>
                <h2 className={"new-post-title"}>
                  {reservation?.accommodation?.title}
                </h2>
              </a>
              <div className={""}>
                <h3 className={"apartment-name"}>
                  {reservation?.accommodation.apartment.name}
                </h3>
              </div>
            </div>
          </div>
          <div className={"selection"}>
            <div
              className={"bed-type-pre-show-wrapper overflow-x-auto-wrapper"}
            >
              <div className={"bed-type-pre-show inside-overflow-x-auto"}>
                {room?.bedTypes?.map((value) => {
                  return (
                    <div
                      key={value.id}
                      onClick={() => {
                        setSelected({ ...selected, roomType: value });
                      }}
                      className={classNames(
                        selected?.roomType?.id === value?.id ? "selected" : ""
                      )}
                    >
                      <BedTypeForPost id={value.type} key={value.id} />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className={"calendar border-bottom-light-color"}>
              <Calendar
                isMultipleSelecting={true}
                initRage={selected?.rangeDate as any}
                dateRangeFilter={(date) => {
                  setSelected({
                    ...selected,
                    rangeDate: { since: date.since, to: date.to },
                  } as Selected);
                }}
                unavailableDateRanges={selected?.roomType?.unAvailableDates}
              />
            </div>
            <div className={"about-you"}>
              <div className={"label"}>About you</div>
              <div className={"form"}>
                <span></span>
                <TextDisplayInput
                  className={"border-bottom-light-color"}
                  label={"Full name"}
                  setContent={(value) => {
                    setUserInfo({ ...userInfo, fullName: value });
                  }}
                  content={reservation?.tenant?.name}
                />
                <span></span>
                <TextDisplayInput
                  className={"border-bottom-light-color"}
                  label={"Phone number"}
                  setContent={(value) => {
                    setUserInfo({ ...userInfo, phoneNumber: value });
                  }}
                  content={reservation?.tenant?.phone}
                />
                <h4>Email</h4>
                <div className={classNames("border-bottom-light-color")}>
                  <div className={"email-inner-text"}>
                    {reservation?.tenant?.["email"]}
                  </div>
                </div>
              </div>
            </div>
            <div className={"price-displayed"}>
              <span>
                {separateDigitsOfANumber(
                  selected?.roomType?.price *
                    (1 +
                      ((selected.rangeDate?.to as Date) -
                        (selected.rangeDate?.since as Date)) /
                        (1000 * 60 * 60 * 24))
                )}
              </span>
              <span>VND</span>
            </div>
            <div className={"confirmation"}>
              <div>
                <input
                  className={"checkbox"}
                  type={"checkbox"}
                  onChange={() => setAcceptPolicies(!acceptPolicies)}
                />
                <span>
                  I have read <a href={"/policy"}>the policies</a> and accept
                  it
                </span>
              </div>
              <button
                className={classNames(
                  "submit-button base-border-radius",
                  "red-button"
                )}
                onClick={() => {
                  if (acceptPolicies) updateReservation();
                  else setMessage("You have to accept with the policies to book")
                }}
              >
                Book now
              </button>
            </div>
          </div>
          <div className={"error red-text"}>{message}</div>
        </div>
      </div>
    );
}
export default BookingLayout;
