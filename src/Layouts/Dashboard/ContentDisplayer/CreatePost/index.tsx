import classNames from "classnames";
import React from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import Address from "./Address/Address";
import ApartmentsCollection from "./ApartmentCollection/ApartmentCollection";
import { AccommodationDTO } from "./CreatePost";
import EstateType from "./EstateType/EstateType";
import Expiration from "./Expiration/Expiration";
import Policies from "./Policies/Policies";
import PostImages from "./PostImages/PostImages";
import TitleAndDescription from "./TitleAndDescription/TitleAndDescription";

export default function Page( props: { code: number, state, post: [] } ): JSX.Element{
  const commonProps = { currentStage: props.state, post: props.post, display: "accommodation" };
  switch( props.code ){
    case 1:
      return <EstateType { ...commonProps } />;
    case 2:
      return <Address { ...commonProps } />;
    case 3:
      return <PostImages { ...commonProps } />;
    case 4:
      return <TitleAndDescription { ...commonProps } />;
    case 5:
      return <Policies { ...commonProps } />;
    case 6:
      return <ApartmentsCollection { ...commonProps } />;
    case 7:
      return <Expiration { ...commonProps } />;
    case 8:
      return <div
        style = { {
          position: "relative",
          width: "100%",
          height: "70vh",
          display: "grid",
          gridTemplateRows: "100px 50px",
          top: "100px",
        } }
      ><h3 style = { { fontSize: "2em" } }>Create your listing</h3>
        <div style = { { display: "flex", gap: "10px" } }><span style = { { color: "var(--base-green)" } }><BsFillCheckCircleFill /></span><span>Complete</span></div>
      <div onClick={()=>{window.location.replace("/")}} className={classNames("button base-border-radius red-button border-light-color")}>Done</div>
      </div>;
    default:
      return <div>Component không tồn tại</div>;
  }
}
export interface CreatePostProps{
  currentStage: number;
  completed: boolean[];
  setStageError: Function;
  setCompleted: Function;
  post: [ AccommodationDTO, ( value: AccommodationDTO ) => void ];
}
