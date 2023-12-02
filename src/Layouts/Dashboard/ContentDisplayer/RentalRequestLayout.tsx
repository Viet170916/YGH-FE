import axios, { AxiosResponse } from "axios";
import classNames from "classnames";
import React, {
  JSX,
  LegacyRef,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { CgClose } from "react-icons/cg";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import {
  ReservationStatus,
  ReservationStatusFunc,
} from "../../../Common/Enum/Enum";
import {
  formatPhoneNumber,
  separateDigitsOfANumber,
} from "../../../Common/Utils/String";
import { getTimeConsume } from "../../../Common/Utils/Timer";
import { BedType } from "../../../Components/App/Icons/Icon";
import ImageFitSize from "../../../Components/App/Image/ImageFitSize";
import RentalRequestCard from "../../../Components/Common/CardInDashboard/RentalRequestCard";
import RentalRequest from "../../../Models/RentalRequest";
import Reservation from "../../../Models/Reservation";
import { api_updateStatus } from "../Configuration/RentalLayout.config";
import RentalRequestFilterBar from "../DashboardFilter/RentalRequestFilterBar";
import "./ContentDisplayer.scss";

interface IProps {
  openMenuClick: () => void;
}
function RentalRequestLayout(props: IProps): JSX.Element {
  const [page, setPage] = useState<number>(1);
  const location = useLocation();
  const [confirmation, setConfirmation] = useState<boolean>(false);
  const params = useMemo(() => {
    const queryParams = new URLSearchParams(location.search);
    return {
      status: queryParams.get("status"),
      postId: queryParams.get("postId"),
      reservationId: queryParams.get("reservation"),
    };
  }, [location]);
  // Lấy giá trị của một query parameter cụ thể
  // const { status } = useParams();
  const [userRequests, setUserRequests] = useState<RentalRequest[]>([]);
  const [reservationSelected, setReservationSelected] =
    useState<Reservation | null>();
  const getDataByStatus = (setIdOfFirst: (id: number) => void) => {
    if (params) {
      console.log("params", params);
      axios
        .get(`/api/order/paging`, {
          params: {
            ...params,
            page: page,
          },
        })
        .then((response) => {
          const result: RentalRequest[] = response?.data;
          if (result) {
            setUserRequests(result as RentalRequest[]);
            setIdOfFirst(
              params.reservationId
                ? parseInt(params.reservationId)
                : result[0].id
            );
          }
        })
        .catch((error) => {
          console.log(error);
          setReservationSelected(null);
        });
    }
    return () => {
      setUserRequests([]);
    };
  };
  function getReservation(id: number) {
    axios
      .get("/api/order/first", {
        params: {
          id: id,
        },
      })
      .then((response) => {
        console.log(response);
        setReservationSelected(response?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    getDataByStatus(getReservation);
  }, [location, confirmation]);
  const responsiveReservation = useRef<HTMLDivElement>();
  function closeReservation() {
    responsiveReservation.current?.classList.remove("reservation-expand-y");
  }
  function statusUpdate(status: number | string | null) {
    let url = api_updateStatus.url;
    if (status === ReservationStatus.DELETE) {
      url = ReservationStatus.DELETE;
      status = null;
    }
    axios
      .post(url, { status: status, reservationId: reservationSelected?.id })
      .then((response: AxiosResponse<UpdateResponse<any>>) => {
        console.log(response);
        setConfirmation(!confirmation);
        if (response.data.status) {
          getReservation(reservationSelected!.id);
        }
      })
      .catch((error) => {
        if (!error.data.status) {
          Swal.fire({
            title: "Failed",
            text: error.data.message,
            icon: "error",
          });
        }
      });
  }
  return (
    <div className="right-area">
      <RentalRequestFilterBar
        params={params}
        openMenuClick={props.openMenuClick}
      />
      <div className={"rental-request-layout"}>
        <div
          className={"rental-request-lower-left rental-request-lower-listing"}
          onScroll={() => {}}
        >
          {userRequests.map((request, index) => {
            return (
              <RentalRequestCard
                userRequest={request}
                key={index + "-" + request.id}
                reload={() => {
                  getDataByStatus(getReservation);
                }}
                onSelect={() => {
                  getReservation(request.id);
                  responsiveReservation.current?.classList.add(
                    "reservation-expand-y"
                  );
                }}
                className={classNames(
                  request.id == reservationSelected?.id
                    ? "selected-request"
                    : ""
                )}
              />
            );
          })}
        </div>
        {reservationSelected ? (
          <div
            className={"reservation-can-be-hidden-wrapper"}
            ref={responsiveReservation as LegacyRef<any>}
          >
            <div
              className={
                "rental-request-layout-lower-right rental-request-layout-lower-detail-content reservation-can-be-hidden "
              }
            >
              <div className={"reservation-background"}>
                <button
                  className={"close-reservation-responsive"}
                  onClick={closeReservation}
                >
                  <CgClose />
                </button>
              </div>
              <div className={"reservation-main-content-wrapper"}>
                <div className={"reservation-main-content"}>
                  <div className={"tenant-information"}>
                    <h3 className={"tenant-name"}>
                      Tenant: {reservationSelected?.tenant.name}
                    </h3>
                    <span className={"tenant-phone"}>
                      Phone:{" "}
                      {formatPhoneNumber(reservationSelected?.tenant.phone)}
                    </span>
                  </div>
                  <div className={"accommodation-information"}>
                    <div className={"accommodation-image-wrapper"}>
                      {reservationSelected?.accommodation.images.map(
                        (image, index) => (
                          <ImageFitSize
                            src={image}
                            style={{ gridArea: `img-${index + 1}` }}
                            key={image + index}
                          />
                        )
                      )}
                    </div>
                    <h3 className={"accommodation-title"}>
                      {reservationSelected?.accommodation.title}
                    </h3>
                    <div className={"apartment-information"}>
                      <div className={"apartment-image-wrapper"}>
                        <ImageFitSize
                          src={
                            reservationSelected?.accommodation.apartment
                              .thumbnailUrl
                          }
                        />
                      </div>
                      <div className={"apartment-content-wrapper"}>
                        <h4 className={"apartment-title"}>
                          {reservationSelected?.accommodation.apartment.name}
                        </h4>
                        <span className={"type-of-bed"}>
                          <span className={"bed-type-icon"}></span>
                          <span className={"bed-type-value"}>
                            {
                              <BedType
                                id={
                                  reservationSelected?.accommodation.apartment
                                    .typeOfBed
                                }
                              />
                            }
                          </span>
                        </span>
                        <span className={"apartment-price"}>
                          <span className={"apartment-price-icon"}>
                            <RiMoneyDollarCircleLine />
                          </span>
                          {separateDigitsOfANumber(
                            reservationSelected?.accommodation.apartment.price
                          )}{" "}
                          VND
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className={"reservation-content"}>
                    <div className={"date-wrapper"}>
                      <span className={"checkin-date-display"}>
                        <span className={"label-content"}>Checkin date: </span>
                        <span className={"main-content"}>
                          {new Date(
                            reservationSelected?.checkinDate ?? ""
                          ).toDateString()}
                        </span>
                      </span>
                      <span className={"checkout-date-display"}>
                        <span className={"label-content"}>Checkout date: </span>
                        <span className={"main-content"}>
                          {new Date(
                            reservationSelected?.checkoutDate ?? ""
                          ).toDateString()}
                        </span>
                      </span>
                    </div>
                    <div className={"status-confirmation"}>
                      <span className={"status-display"}>
                        {ReservationStatusFunc.statusValue(
                          reservationSelected?.status
                        )}
                      </span>
                      <div className={"confirm-buttons"}>
                        <ButtonConfirm
                          value={reservationSelected.status}
                          onSubmit={statusUpdate}
                        />
                      </div>
                    </div>
                    <span className={"sent-date"}>
                      {getTimeConsume(reservationSelected?.createAt ?? "")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>has no reservation</div>
        )}
        {/*<Route path = { "*" } element = { <Navigate to = { "/error" } /> } />*/}
      </div>
    </div>
  );
}
function ButtonConfirm(props: {
  value: number;
  onSubmit: (statusSubmit: ReservationStatus) => void;
}): React.JSX.Element {
  switch (props.value) {
    case ReservationStatus.PENDING:
      return (
        <>
          <button
            className={"red-button base-border-radius"}
            onClick={() => {
              props.onSubmit(ReservationStatus.PAYMENT_WAITING);
            }}
          >
            <strong>Confirm</strong>
          </button>
          <button
            className={"confirm-button red-button base-border-radius"}
            onClick={() => {
              props.onSubmit(ReservationStatus.REJECT);
            }}
          >
            <strong>Reject</strong>
          </button>
        </>
      );
    case ReservationStatus.PAYMENT_WAITING:
      return (
        <>
          <button
            className={"confirm-button red-button base-border-radius"}
            onClick={() => {
              props.onSubmit(ReservationStatus.PAID);
            }}
          >
            <strong>Paid</strong>
          </button>
          <button
            className={"confirm-button red-button base-border-radius"}
            onClick={() => {
              props.onSubmit(ReservationStatus.CANCELLED);
            }}
          >
            <strong>Not Paid</strong>
            <span style={{ fontSize: "0.8em" }}>(Cancel)</span>
          </button>
        </>
      );
    case ReservationStatus.CANCELLED:
    case ReservationStatus.REJECT:
      return (
        <>
          <button
            className={"confirm-button red-button base-border-radius"}
            onClick={() => {
              props.onSubmit(ReservationStatus.DELETE);
            }}
          >
            <strong>Delete</strong>
          </button>
        </>
      );
    case ReservationStatus.PAID:
      return (
        <>
          <button
            className={"confirm-button red-button base-border-radius"}
            onClick={() => {
              props.onSubmit(ReservationStatus.CANCELLED);
            }}
          >
            <strong>Cancel</strong>
          </button>
        </>
      );
    // case ReservationStatus.REJECT:
    //   return (
    //     <>
    //       <button
    //         className={"confirm-button red-button base-border-radius"}
    //         onClick={() => {
    //           props.onSubmit(ReservationStatus.DELETE);
    //         }}
    //       >
    //         <strong>Delete</strong>
    //       </button>
    //     </>
    //   );
    default:
      return <></>;
  }
}
export default RentalRequestLayout;
