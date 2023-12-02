import React, { JSX, useState } from "react";
import "./ChangePassword.scss";
import NormalInput from "../../../src/Components/Common/Inputs/NormalInput";
import Button from "../../../src/Components/Common/button";
interface IProps {}
function ChangePassword(props: IProps): JSX.Element {
  const [isFormVisible, setFormVisibility] = useState(true);

  const handleNextClick = () => {
    setFormVisibility(false);
  };
  const handleBackClick = () => {
    setFormVisibility(true);
  };

  return (
    <>
      {isFormVisible && (
        <div className="changePassword">
          <div className="title">Change password</div>
          <div className="changePassword__input">
            <NormalInput placeHolder={"Email"} />
            <NormalInput placeHolder={"Verification code"} password_type />
          </div>
          <div className="changePassword__checkbox">
            <div className="checkbox">
              <input type="checkbox" id="checkbox" />
              <label htmlFor="checkbox">Im not a robot (capcha)</label>
            </div>
            <a href="#">Resend code</a>
          </div>
          <div className="changePassword__button">
            <Button content="Log in" second_button />
            <div onClick={handleNextClick}>
              <Button content="Next" main_button />
            </div>
          </div>
        </div>
      )}
      {!isFormVisible && (
        <div className="changePassword">
          <div className="title">Change password</div>
          <div className="changePassword__input">
            <NormalInput placeHolder={"New password"} password_type />
            <NormalInput placeHolder={"Confirm new password"} password_type />
          </div>
          <div className="changePassword__checkbox">
            <div className="checkbox">
              <input type="checkbox" id="checkbox" />
              <label htmlFor="checkbox">Im not a robot (capcha)</label>
            </div>
          </div>
          <div className="changePassword__button">
            <div onClick={handleBackClick}>
              <Button content="Back" second_button />
            </div>
            <Button content="Save" main_button />
          </div>
        </div>
      )}
    </>
  );
}
export default ChangePassword;
