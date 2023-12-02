import React, { JSX } from "react";
import { Link } from "react-router-dom";
import "./PaymentConfirm.scss";
import NormalInput from "../../../src/Components/Common/Inputs/NormalInput";
import Button from "../../../src/Components/Common/button";
import ManagePostFilterBar from "../Dashboard/DashboardFilter/ManagePostFilterBar";

interface IProps {}
function PaymentConfirm(props: IProps): JSX.Element {
  return (
    <>
      <ManagePostFilterBar />
      <div className="payment">
        <div className="title">Payment Confirmation</div>
        <div className="payment-body">
          <div className="info">
            <div className="price">Price per day</div>
            <div className="expire-date">
              <div className="date">Expire date</div>
              <div>expire date to automatically cancel payments the post</div>
            </div>
          </div>
          <div className="conditions">
            <div>
              <i>Policies and Conditions</i>
            </div>
            <div className="payment__checkbox">
              <div className="checkbox">
                <input type="checkbox" id="checkbox" />
                <label htmlFor="checkbox">
                  <strong>I have read </strong> <i>Policies and Conditions</i>{" "}
                  <strong>and accept it. i agree to make the payment</strong>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="payment-foot">
          <div className="payment__contact">contact: 0123456789</div>
          <div className="payment__button">
            <div className="info">
              Fees will be deducted from your balance until the expiration date
            </div>
            <Button content="Complete" main_button />
          </div>
        </div>
      </div>
    </>
  );
}
export default PaymentConfirm;
