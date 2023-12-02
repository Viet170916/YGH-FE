import { Container } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProgressBar from "../../../../Components/App/ProgressBar/ProgressBar";
import "./CreatePost.scss";
import Page from "./index";
import { Image } from "./PostImages/PostImages";
import ROLE from "../../../../Common/Enum/Role";
import Swal from "sweetalert2";

interface IProps {
  openMenuClick: () => void;
}
export function createAPost_ClickAction() {
  if (
    localStorage["role"] == ROLE.LANDLORD ||
    localStorage["role"] == ROLE.ADMIN
  ) {
    Swal.fire({
      title: "You wanted to create a new post?",
      icon: "question",
      iconColor: "lightgreen",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post("/api/post/new/new-id")
          .then((response: AxiosResponse<any>) => {
            if (!response.data) {
              //...
            }
            window.location.replace(
              `/new/${response.data?.["postId"]}/${PageCreated.action(
                PageCreated.Code.ESTATE
              )}`
            );
          })
          .catch((error) => {
            // ....
          });
      }
    });
  } else window.location.replace("/dashboard/account/upgrade");
}
function CreatePost(props: IProps) {
  const { postId, page } = useParams();
  const navigate = useNavigate();
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [post, setPost] = useState<AccommodationDTO>();

  useEffect(() => {
    axios
      .post("api/post/id-is-exists", null, {
        params: { postId: postId },
      })
      .then((res: AxiosResponse<boolean>) => {
        // if( !res.data?.["isVerified"] ) window.location.replace( "/error" );
        setIsVerified(res.data["isVerified"]);
        setPost(res.data?.["data"]);
        if (res.data["page"] < PageCreated.actionToCode(page as string)) {
          navigate(
            "/new/" + postId + "/" + PageCreated.action(res.data?.["page"])
          );
        }
      })
      .catch((error) => {
        // window.location.replace( "/error" );
      });
  }, [postId]);
  async function sendData() {
    let imageIdsAxiosRes;
    if (post?.images) {
      const form = new FormData();
      post?.images?.forEach((image) => {
        form.append(`file`, image.data ?? "");
      });
      imageIdsAxiosRes = await axios.post(`/api/publication/add-images`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setPost((prev) => ({
        ...prev,
        accommodationPublications: imageIdsAxiosRes.data.map((imgId) => ({
          mediaId: imgId,
          accommodationId: post.id,
        })),
      }));
    }
    axios
      .post(`/api/post/new/update`, {
        accommodation: {
          ...post,
          accommodationPublications: imageIdsAxiosRes?.data.map((imgId) => ({
            mediaId: imgId,
            accommodationId: post?.id,
          })),
        },
        page: PageCreated.actionToCode(page as string),
        files: post?.images,
      })
      .then((response) => {
        navigate(
          "/new/" + postId + "/" + PageCreated.action(response.data?.["page"])
        );
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          title: "Warning",
          text: error.response.data.message,
          icon: "warning",
        });
      });
  }
  function handleFinishButtonClick() {
    sendData().then();
  }
  if (isVerified)
    return (
      <>
        <div
          className="right-area-upper"
          style={{ position: "fixed", backgroundColor: "white", zIndex: 3 }}
        >
          <div
            style={{
              padding: "0 0.5rem",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "1.3rem",
              display: "flex",
              alignItems: "center",
            }}
            onClick={() => {
              window.location.replace("/");
            }}
            onKeyDown={() => {}}
          >
            Yuugen
          </div>
          <div className="search-part-wrapper">
            <input
              disabled
              className="search-input-nav"
              type="text"
              placeholder="Search videos..."
            />
          </div>
        </div>
        <div
          className="page-right-content create-post-layout"
          style={{ marginTop: "50px" }}
        >
          <div className={classNames("create-post-layout-upper")}>
            <Container
              maxWidth="xl"
              className="app-main-left"
              style={{
                justifyContent: "center",
              }}
            >
              <Page
                code={PageCreated.actionToCode(page as string)}
                state={PageCreated.actionToCode(page as string)}
                post={[post, setPost]}
              />
            </Container>
          </div>
          <ProgressBar
            activeStage={PageCreated.actionToCode(page as string) - 1}
            onFinish={handleFinishButtonClick}
            goToPrev={() => {
              navigate(
                "/new/" +
                  postId +
                  "/" +
                  PageCreated.action(
                    PageCreated.actionToCode(page as string) - 1
                  )
              );
            }}
          />
        </div>
      </>
    );
}
interface AccommodationPublication {
  mediaId: number;
  accommodationId: number;
}
export default CreatePost;
export interface AccommodationDTO {
  id?: number;
  estateTypesId?: number;
  accommodationPublications: AccommodationPublication[];
  images?: Image[];
  title?: string;
  description?: string;
  quality?: number;
  policies?: string;
  expiration?: Date | string;
  longitude?: number;
  latitude?: number;
  address?: number | string;
  status?: number;
}
export interface ApartmentDTO {
  id: number;
  name?: string;
  images?: Image[];
  apartmentPublications?: Image[];
  maxOccupant?: number;
  // quantity?: number;
  amenities?: number[];
  // price?: number;
  area?: number;
  apartmentBedTypes?: TypeOfBed[];
  description?: string;
  // accommodationId: number;
  // ownerId: number;
  // numberOfBed?: number;
}
export interface ApartmentsAmenitiesDTO {
  amenityId: number;
}
export interface TypeOfBed {
  id?: number;
  price?: number;
  quantity?: number;
}
export const PageCreated = {
  Code: {
    ESTATE: 1,
    LOCATION: 2,
    POST_IMAGE: 3,
    TITLE_AND_DESC: 4,
    POLICIES: 5,
    APARTMENTS: 6,
    EXPIRATION: 7,
    DONE: 8,
  },
  action: function (code) {
    return [
      "",
      "structure",
      "location",
      "add-images",
      "formal-info",
      "policies-adding",
      "put-some-apartments",
      "expiration",
      "done",
    ][code];
  },
  actionToCode: function (action: string) {
    return {
      structure: 1,
      location: 2,
      "add-images": 3,
      "formal-info": 4,
      "policies-adding": 5,
      "put-some-apartments": 6,
      expiration: 7,
      done: 8,
    }[action];
  },
};
