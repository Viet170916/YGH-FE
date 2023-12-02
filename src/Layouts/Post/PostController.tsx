import axios, { AxiosResponse } from "axios";
import parse from "html-react-parser";
import { JSX, useEffect, useState } from "react";
import { GiRoundStar } from "react-icons/gi";
import { useNavigate, useParams } from "react-router-dom";
import { getFirstParagraph } from "../../Common/Utils/String";
import Accommodation from "../../Components/App/AccomInfoForAPost/AccomInfoForAPost";
import Apartment from "../../Components/App/Apartment/Apartment";
import { Amenity } from "../../Components/App/Icons/Icon";
import ImageFitSize from "../../Components/App/Image/ImageFitSize";
import ReviewComponent from "../../Components/App/Review/Review";
import PostDetail, { ApartmentDetail } from "../../Models/PostDetail";
import "./PostController.scss";

interface IProps { }
// @ts-ignore
function PostController(props: IProps): JSX.Element {
  //config
  //hooks
  const redirect = useNavigate();
  const [showFullDescription, setFullShowDescription] = useState(false);
  const [staste, set] = useState();
  const { user, id, apartmentIdParam } = useParams();
  const [post, setPost] = useState<PostDetail>();
  const [apartments, setApartments] = useState<ApartmentDetail[]>();
  const [accommodationAmenties, setAccommodationAmenities] = useState<{
    id: number;
    name: string;
    type: number;
    count: number;
  }[]>([]);
  useEffect(() => {
    // console.log(id + user);
    axios
      .get(`api/post/${user}`, { params: { postId: id } })
      .then((response: AxiosResponse<PostDetail>) => {
        setPost(response.data);
      })
      .catch((error) => {
        // window.location.replace("/error");
      });
  }, [user]);
  useEffect(() => {
    axios
      .get("api/apartment/public", {
        params: {
          postId: id,
          user: user,
        },
      })
      .then((response: AxiosResponse<ApartmentDetail[]>) => {
        setApartments(response.data);
      })
      .catch((error) => {
        console.log(error);
        // window.location.replace("/error");
      });
  }, []);


  useEffect(() => {
    const newAccommodationAmenities = [...accommodationAmenties]
    apartments?.forEach(apartment => {
      apartment.amenities.forEach(amenity => {
        if (!newAccommodationAmenities?.some(ame => ame.id === amenity.id)) {
          newAccommodationAmenities.push({ ...amenity, count: 1 })
        } else {
          const existedAmenity = newAccommodationAmenities?.find(ame => ame.id === amenity.id)
          if (existedAmenity && existedAmenity.count) {
            existedAmenity.count++;
          }
        }
      })
    })
    setAccommodationAmenities(newAccommodationAmenities)
    return () => {
      setAccommodationAmenities([])
    }
  }, [apartments])
  //handler functions
  function GetPost() { }
  function handle() { }
  //render
  if( post )
    return (
      <div className={"post-content-page"}>
        <Accommodation post={post} />
        <div className="head-of-post">
          <div className={"detail-accommodation-information"}>
            <h1 className={"accommodation-title-post no-wrap in-1-line"}>
              {post.title}
            </h1>
            <div className="short-introduction">
              <section>
                <div className="some-amenities">
                  {post.amenities.map((amenity, index) => (
                    <span key={amenity.id}>
                      {amenity.name + `(${amenity.roomCount ?? 0})`}
                      {index < post?.amenities.length - 1 ? (
                        <span> . </span>
                      ) : (
                        <></>
                      )}
                    </span>
                  ))}
                </div>
                <div className="rating">
                  <span className="review-rate">
                    {post.review.rate ? (
                      <span>
                        Review <GiRoundStar />{" "}
                        {post?.review.rate +
                          "/5" +
                          `(${post.review.count} reviews)`}
                      </span>
                    ) : (
                      <div>Still has no review yet</div>
                    )}
                  </span>
                  <span className="quality">
                    {
                      <div>
                        Quality <GiRoundStar /> {post?.quality}
                      </div>
                    }
                  </span>
                </div>
              </section>
            </div>
            <section className={"accommodation-description"}>
              {showFullDescription ? parse(post.description) : parse(getFirstParagraph(post.description) ?? "")}
            </section>
            <div className={"show-more"} onClick={() => setFullShowDescription(!showFullDescription)}>
              {showFullDescription ? "Show less" : "Show more"}
            </div>
            <div className="owner-information ">
              <div className="avatar-and-name ">
                <div style={{ margin: "10px" }}>
                  <ImageFitSize
                    src={post.owner?.avatarUrl}
                    className={"avatar-post "}
                  />
                </div>
                <div className="name-and-summary-info">
                  <span className={"name"}>Host by {post.owner?.userName}</span>
                  <span className={"post-number"}>
                    {post.owner?.count ?? 0} post
                    {post.owner?.count > 1 ? "s" : ""}
                  </span>
                  <span className={"apartment-number"}>
                    {", " + (post.owner?.apartmentCount ?? 0)} apartment
                    {post.owner?.apartmentCount > 1 ? "s" : ""}{" "}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={"amenities-list-filter white-background-shadow"} id="amenities-section">
          <span className={"title"}>
            <h3 className={"title-content"}>title</h3>
          </span>
          <span className={"filter-selection"}>
            {
              accommodationAmenties?.map((amenity, index) => {
                return (
                  <Amenity id={amenity.id} text={amenity.name} numberOfAvailablePost={amenity.count} className={""} key={index} />
                )
              })
            }
          </span>
        </div>
        <div className="apartments-container" id="apartment-section">
          <div className="left-apartment-container">
            {apartments?.map((apartment: ApartmentDetail, index: number) => (
              <div className={"apartment-child-wrapper"} key={apartment.id}>
                <Apartment
                  unhirable={post.owner.userName === localStorage["userName"]}
                  apartment={apartment}
                  index={index}
                  isShownByUrl={
                    parseInt(apartmentIdParam ?? "") === apartment.id
                  }
                />
              </div>
            ) ) }
          </div>
        </div>
        <div className = { "accommodation-reviews" }>
          <ReviewComponent review = { post.review } reviews = { post.reviews } />
        </div>
        {/*<Apartment/>*/}
      </div>
    );
}
export default PostController;
