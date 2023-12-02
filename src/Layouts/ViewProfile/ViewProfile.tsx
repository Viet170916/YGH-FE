import React, { JSX } from "react";
import "./ViewProfile.scss";
import Post_MainLayout from "../../Models/Post_MainLayout";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { TbBrandFacebookFilled, TbBrandTwitterFilled } from "react-icons/tb";
interface IProps {}
let a: Post_MainLayout[] = [
  {
    image: "https://source.unsplash.com/featured/1200x900/?sculpture,hotel",
    title: "The Grand Budapest Hotel",
    location: "Stockton Street",
    price: 1000,
    id_Token: "1",
  },
  {
    image: "https://source.unsplash.com/featured/1200x900/?sculpture,hotel",
    title: "The Grand Budapest Hotel",
    location: "Stockton Street",
    price: 1000,
    id_Token: "1",
  },
  {
    image: "https://source.unsplash.com/featured/1200x900/?sculpture,hotel",
    title: "The Grand Budapest Hotel",
    location: "Stockton Street",
    price: 1000,
    id_Token: "1",
  },
  {
    image: "https://source.unsplash.com/featured/1200x900/?sculpture,hotel",
    title: "The Grand Budapest Hotel",
    location: "Stockton Street",
    price: 1000,
    id_Token: "1",
  },
];
function ViewProfile(props: IProps): JSX.Element {
  return (
    <>
      {a.slice(0, 1).map((post: Post_MainLayout, index: number) => {
        return (
          <div className={"profile-image"} key={post.id}>
            <div className={"image--left"}>
              <img src={post.image} alt={"small-home-card"} />
            </div>
            <div className={"image--right"}>
              <img src={post.image} alt={"small-home-card"} />
            </div>
          </div>
        );
      })}
      <div className={"other-info"}>(Bio)</div>
      <div className={"about"}>
        <h2 className={"label"}>About</h2>
        <div className={"info"}>
          <div className={"info--left"}>
            <div className={"field"}>
              Phone number : <div className={"value"}>1324</div>
            </div>
            <div className={"field"}>
              Address
              <HiOutlineLocationMarker className={"btn-icon"} /> :
              <div className={"value"}>1324</div>
            </div>
          </div>
          <div className={"info--right"}>
            <div className={"field"}>
              Email : <div className={"value"}>1324</div>
            </div>
          </div>
        </div>
        <div className={"divider"}>
          <div className={"row"}></div>
        </div>

        {a.slice(0, 1).map((post: Post_MainLayout, index: number) => {
          return (
            <div className={"location"} key={post.id}>
              <div className={"location--left"}>
                <div className={"location__image"}>
                  <img src={post.image} alt={"small-home-card"} />
                </div>
                <div className={"location__info"}>
                  <div className={"name"}>Location name</div>
                  <div className={"description"}>Location description</div>
                </div>
              </div>
              <div className={"location--right"}>
                <div className={"location__image"}>
                  <img src={post.image} alt={"small-home-card"} />
                </div>
                <div className={"location__info"}>
                  <div className={"name"}>Location name</div>
                  <div className={"description"}>Location description</div>
                </div>
              </div>
            </div>
          );
        })}
        <div className={"divider"}>
          <div className={"row"}></div>
        </div>
        <div className={"accommodations"}>
          <h2 className={"label"}>Accommodations</h2>
          <div className={"accommodations__location"}>
            {a.map((post: Post_MainLayout, index: number) => {
              return (
                <div className={"detail"}>
                  <div className="image">
                    <img src={post.image} alt={"small-home-card"} />
                  </div>
                  <div className={"info"}>
                    <div className={"name"}>Location name</div>
                    <div className={"description"}>Location description</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
export default ViewProfile;
