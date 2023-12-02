import axios from "axios";
import classNames from "classnames";
import React, { JSX, useState } from "react";
import { getTimeConsume } from "../../../Common/Utils/Timer";
import RentalRequest from "../../../Models/RentalRequest";
import "./RentalCard.scss";

interface IProps{
  userRequest: RentalRequest;
  reload: () => void;
  onSelect: ( event: any ) => void;
  className?: string|null|undefined;
}
function RentalRequestCard( props: IProps ): JSX.Element{
  function completePayment(){
    axios.post( `/api/Reservation/accept-pay-reservation?OwnerId=123&ReservationId=${ props.userRequest?.id }`, {}, {} )
         .then( ( res ) => {
           props.reload();
         } );
  }
  function accept() {
    axios
      .post(
        `/api/Reservation/accept-request-reservation?OwnerId=123&ReservationId=${props.userRequest?.id}`,
        {},
        {}
      )
      .then((res) => {
        props.reload();
      });
  }
  function reject() {
    axios
      .post(
        `/api/Reservation/reject-request-reservation?OwnerId=123&ReservationId=${props.userRequest?.id}`,
        {},
        {}
      )
      .then((res) => {
        props.reload();
      });
  }
  const [errorImg, setErrorImg] = useState<boolean>(false);
  return (
    <div
      className={"card-wrapper-list main-card-list"}
      onClick={props.onSelect}
    >
      <div
        className={classNames("card-list", props.className ?? "")}
        onClick={() => {}}
      >
        <div className="card-image-wrapper-list">
          <img
            src={props?.userRequest?.tenant?.avatarUrl ?? ""}
            alt={"small-home-card"}
            onError={(event) => {
              const defaultImg: HTMLImageElement =
                document.createElement("img");
              defaultImg.src = "/assets/default-avatar-profile-icon.jpeg";
              defaultImg.alt = "small-home-card";
              event.currentTarget.parentNode.replaceChildren( defaultImg );
            } }
          />
        </div>
        <div className="card-info-list">
          <div className="card-text big cardText-js">
            {props?.userRequest.tenant.name}
          </div>
          <div className="card-text small">
            {props?.userRequest.accommodation.title}
          </div>
          <div className="card-text small">
            <span className="card-price">
              {getTimeConsume(props.userRequest.createAt)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default RentalRequestCard;
