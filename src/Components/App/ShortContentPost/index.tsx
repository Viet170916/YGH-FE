import React from "react";
import { FaHouseUser } from "react-icons/fa6";
import ShortContentPost from "../../../Models/ShortContentPost";
import "./ShortContentPost.scss";

function ShortPost(props: ShortContentPost): React.JSX.Element {
  //config
  const post = props;
  //hooks
  //handler functions
  //render
  if (!post) return <></>;
  return (
    <div className={"summary-post"}>
      <div className={"summary-post-image-wrapper"}>
        <img
          src={post?.thumbnailUrl ?? "/assets/default-post.png"}
          alt={post.title + " " + "image"}
        />
      </div>
      <div className={"summary-post-content"}>
        <h3 className={"summary-post-title no-wrap"}>
          <strong>{post?.title}</strong>
        </h3>
        <span className={"summary-post-number-of-apartment  no-wrap"}>
          {post?.numberOfPost ?? 0} rooms
        </span>
        <span className={"summary-post-number-of-order"}>
          <FaHouseUser />
          <span className={" no-wrap"}>
            {post?.numberOfOrder ?? 0} apartment
          </span>
        </span>
      </div>
    </div>
  );
}
export default ShortPost;
