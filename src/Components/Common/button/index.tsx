import React, { JSX } from "react";
import "./Button.scss";
interface IProps {
  content: string;
  main_button?: boolean;
  second_button?: boolean;
}
function index(props: IProps): JSX.Element {
  return (
    <>
      <div className="button-container">
        <button
          className={`button ${props.main_button ? "button--main" : ""} ${
            props.second_button ? "button--second" : ""
          }`}
        >
          {props.content}
        </button>
      </div>
    </>
  );
}
export default index;
