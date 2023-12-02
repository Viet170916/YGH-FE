import React, { JSX } from "react";
import FilterBar from "../../Components/FilterBar";
import NavigatorBar from "../../Components/NavigatorBar";
import "./Controller.scss";
import Home from "./Home/Home";

interface IProps{
}
function Controller( props: IProps ): JSX.Element{
  return (
    <div className = "app-container">
      <NavigatorBar selected = { "" } />
      <Home />
    </div>
  );
}
export default Controller;
