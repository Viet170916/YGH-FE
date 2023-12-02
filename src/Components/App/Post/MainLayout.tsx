// import "./";
import React, { JSX } from "react";
import Post_MainLayout from "../../Models/Post_MainLayout";

interface IProps {
  post: Post_MainLayout;
  redirectToPostLayout: Function;
}
function MainLayout(props: IProps): JSX.Element {
  return (
    <div className="card-wrapper main-card">
      <a
        className="card cardItemjs"
        onClick={(event) => {
          event.preventDefault();
        }}
      >
        <div className="card-image-wrapper">
          <img src={props.post.image} alt={props.post.title} />
        </div>
        <div className="card-info">
          <div className="card-text big cardText-js">{props.post.title}</div>
          <div className="card-text small">{props.post.location}</div>
          <div className="card-text small">
            Price:
            <span className="card-price">{props.post.price}</span>
          </div>
        </div>
      </a>
    </div>
  );
}
export default MainLayout;
