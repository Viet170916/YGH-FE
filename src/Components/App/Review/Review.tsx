import axios from "axios";
import classNames from "classnames";
import { JSX, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";
import { ConvertQualityToStar } from "../../../Common/Utils/ConvertQualityToStar";
import { getTimeConsume } from "../../../Common/Utils/Timer";
import { TextBox } from "../../../Layouts/Dashboard/ContentDisplayer/CreatePost/ApartmentCollection/Apartment";
import { Review } from "../../../Models/PostDetail";
import { RateStar } from "../Icons/Icon";
import ImageFitSize from "../Image/ImageFitSize";
import "./Review.scss";

interface IProps{
  reviews: Review[];
  review: {
    count: number;
    rate: number;
    description: string;
  };
}
function ReviewComponent( props: IProps ): JSX.Element{
//config
//hooks
  const [ reviews, setReviews ] = useState<Review[]>( props.reviews );
  useEffect(
    () => {
    }
    , [] );
//handler functions
  function handle(){
  }
//render
  return (
    <div className = { classNames( "review-component-wrapper" ) }>
      <div className = { "label border-bottom-light-color" }>
        <h3>Review</h3>
        <div className = { "text" }>
          <span>{ props.review.count }</span>
          <span>{ props.review.count > 1 ? "reviews" : "review" }</span>
        </div>
        <div className = { "star" }><span className = { "red-text" }><FaStar /></span><span>{ props.review.rate }</span></div>
      </div>
      <div className = { "reviews-display" }>
        {
          reviews.map( (review, index) => {
            return (<Comment review = { review } key = {index+""+review}/>);
          } )
        }
      </div>
    </div>
  );
}
export default ReviewComponent;
export function Comment( { review }: { review: Review } ){
  const [ text, setText ] = useState( review.content );
  const [ rate, setRate ] = useState<number>( review.rate );
  const stars = [ 1, 2, 3, 4, 5 ];
  function update(){
    axios.post( "/api/review/update-review", null, { params: { reservationId: review.reservation.id, rate: null, comment: text } } )
         .then( (
                  res,
                ) => {} ).catch();
  }
  return (<div className = { "comment border-light-color base-border-radius" }>
    <div className = { "user-introduce" }>
      <div className = { "user-content" }>
        <div className = { "image" }>
          <ImageFitSize src = { review.user.avatarUrl } />
        </div>
        <div>
          <div className = { "user-name" }><h3>{ review.user.username }</h3></div>
          <span className = { "star-vote" }>
            { ConvertQualityToStar( rate )
            .map( ( value, index ) => <span key={value}><RateStar rate = { value } /></span> )
            }
            <div className={"overlay-overlays"}>
            { stars.map( ( value, index ) => (
              <div className = { "overlay-star" } style = { { width: "1em", height: "1em" } } key={value}>
              <div style = { { width: "50%", height: "100%"} } onMouseEnter = { () => {setRate( index + 0.5 );} }></div>
              <div style = { { width: "50%", height: "100%" } } onMouseEnter = { () => {setRate( index + 1 );} }></div>
            </div>) ) }
              </div>
          </span>
        </div>
      </div>
    </div>
    <div className = { "review-content" }>
      <div className = { "review-comment" }>
        <TextBox setValue = { () => {} } type = { "text" } value = { review.content ?? "..." } />
      </div>
      <div className = { "review-footer" }>
        <span>{ getTimeConsume( review.createAt ) }</span>
        {/*<div className = { "button base-border-radius border-light-color red-button" } style = { { fontSize: ".7em" } }>Save</div>*/}
      </div>
    </div>
  </div>);
}
