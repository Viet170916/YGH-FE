// import "./";
import axios from "axios";
import React, { JSX, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { CgMoreO } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useClickOutsideElement } from "../../../Common/Hooks/EventHook";
import { ConvertQualityToStar } from "../../../Common/Utils/ConvertQualityToStar";
import { separateDigitsOfANumber } from "../../../Common/Utils/String";
import { PageCreated } from "../../../Layouts/Dashboard/ContentDisplayer/CreatePost/CreatePost";
import Post_MainLayout from "../../../Models/Post_MainLayout";
import { RateStar } from "../Icons/Icon";
import ImageFitSize from "../Image/ImageFitSize";
import "./Post.scss";

interface IProps {
  post: Post_MainLayout;
  isDraft?: boolean;
  url?: string;
  redirectToPostLayout?: () => void;
}
function CardInMainLayout(props: IProps): JSX.Element {
  const clickOutTarget = useClickOutsideElement<HTMLDivElement>(() => {
    clickOutTarget.current?.classList.remove("see");
  });
  const [post, setPost] = useState<Post_MainLayout>(props.post);
  const navigator = useNavigate();
  function followPost() {
    axios
      .post(`/api/Follow/follow-post`, {}, { params: { postId: post.id } })
      .then((response) => {
        if (response.data.code === 200) {
          setPost((prev) => ({ ...prev, isFollowed: true }));
        } else {
          Swal.fire("Failed", response.data.message, "error");
        }
      });
  }
  function unfollowPost() {
    axios
      .post("/api/Follow/unfollow-post", {}, { params: { postId: post.id } })
      .then((response) => {
        if (response.data.code === 200) {
          setPost((prev) => ({ ...prev, isFollowed: false }));
        } else {
          Swal.fire("Failed", response.data.message, "error");
        }
      });
  }

  function deletePost() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Enter your password",
          input: "password",
          inputAttributes: {
            autocapitalize: "off",
          },
          showCancelButton: true,
          confirmButtonText: "Submit",
          showLoaderOnConfirm: true,
          preConfirm: (password: string) => {
            if (password == "" || password == null) {
              Swal.showValidationMessage("You must enter your password!");
            } else {
              return axios
                .post("/api/post/delete", {
                  postId: post.id,
                  password: password,
                })
                .then((response) => {
                  if (response.data.code != 200) {
                    Swal.showValidationMessage(response.data.message);
                  }
                })
                .catch((error) => {
                  if (error.response) {
                    console.log(error);

                    Swal.showValidationMessage(
                      `${error.response.data.message}`
                    );
                  } else Swal.showValidationMessage("Wrong password");
                });
            }
          },
          allowOutsideClick: () => !Swal.isLoading(),
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              "Post Deleted",
              "Your listing has been deleted",
              "success"
            );
            window.location.reload();
          }
        });
      }
    });
  }

  return (
    <div className="card-wrapper main-card ">
      <a
        className="cardItemjs"
        href={
          props.isDraft
            ? `/draft/${post?.id}/${PageCreated.action(
                PageCreated.Code.ESTATE
              )}`
            : `/${post?.["userName"]}/${post?.id}`
        }
      >
        <div className="card-image-wrapper2 base-border-radius">
          <ImageFitSize src={post?.image} className={"img"} />
          {/*<img src = {  } alt = { post?.title } />*/}
        </div>
        <div className="card-info">
          <div className={" card-text big cardText-js"}>
            <div className=" card-text-contain no-wrap in-1-line ">
              {post?.title}
            </div>
          </div>
          <div className="card-text small no-wrap in-1-line">
            {post?.location.displayName}
          </div>
          <div className={"under-post"}>
            <div className="card-text small price-card-wrapper">
              <span className="card-price no-wrap in-1-line">
                {post?.price.from !== post?.price.to
                  ? separateDigitsOfANumber(post?.price.from as number) +
                    " - " +
                    separateDigitsOfANumber(post?.price.to as number)
                  : separateDigitsOfANumber(post?.price.from as number)}
                {" VND"}
              </span>
            </div>
            <div className={"review-amount"}>
              {ConvertQualityToStar(post?.quality)?.map((value) => (
                <RateStar rate={value} key={post.id} />
              ))}
            </div>
          </div>
        </div>
      </a>
      {post.userName !== localStorage["userName"] && (
        <div
          className={"follower-list"}
          style={{ color: "var(--red)" }}
          onClick={() => {
            if (
              localStorage["KeyHeaderToken"] != "undefined" &&
              localStorage["KeyHeaderToken"] != null
            )
              if (post.isFollowed) {
                unfollowPost();
              } else followPost();
            else navigator("/login");
          }}
          onKeyDown={() => {}}
        >
          {post?.isFollowed ? <AiFillHeart /> : <AiOutlineHeart />}
        </div>
      )}
      <div className={"post-option-wrapper"}>
        {localStorage["KeyHeaderToken"] != "undefined" &&
          localStorage["KeyHeaderToken"] != null &&
          localStorage["userName"] == post.userName && (
            <button
              className={"see-more-button"}
              onClick={() => {
                clickOutTarget?.current?.classList.add("see");
              }}
            >
              <CgMoreO className={"see-more"} />
            </button>
          )}
        <div className={"post-option-list"} ref={clickOutTarget}>
          <ul>
            <li>
              <Link
                className={"item-link"}
                to={`/dashboard/order?postId=${post.id}`}
              >
                Rental request
              </Link>
            </li>
            <li>
              <Link
                className={"item-link"}
                to={`/update/${post.id}/${PageCreated.action(
                  PageCreated.Code.ESTATE
                )}`}
              >
                Edit
              </Link>
            </li>
            <li>
              <Link
                className={"item-link"}
                to={`/update/${post.id}/expiration`}
              >
                Extend
              </Link>
            </li>
            <li>
              <a
                className={"item-link"}
                onClick={(e) => {
                  e.preventDefault();
                  deletePost();
                }}
                onKeyDown={() => {}}
              >
                Delete
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default CardInMainLayout;
