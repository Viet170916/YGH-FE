import "./Post.scss";
import React, { JSX } from "react";
import Post_MainLayout from "../../../Models/Post_MainLayout";

interface IProps {
  post: Post_MainLayout;
}
function CardInList(props: IProps): JSX.Element {
  return (
    <div className="card-wrapper main-card">
      <a className="card cardItemjs" onClick={() => {}}>
        <div className="card-image-wrapper">
          <img src={props.post?.image} alt={"small-home-card"} />
        </div>
        <div className="card-info">
          <div className="card-text big cardText-js">{props.post?.title}</div>
          <div className="card-text small">
            {props.post?.location.displayName}
          </div>
          <div className="card-text small">
            Price:
            <span className="card-price">${props.post?.price.max}/night</span>
          </div>
        </div>
      </a>
    </div>
  );
}
export default CardInList;
