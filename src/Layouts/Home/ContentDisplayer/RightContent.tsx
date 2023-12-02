import React, { JSX, useEffect, useState } from "react";
import CardInList from "../../../Components/App/Post/CardInList";
import Post_MainLayout from "../../../Models/Post_MainLayout";

interface IProps{
}
function RightContent( props: IProps ): JSX.Element{
//config
  let a: Post_MainLayout[] =
    [
      {
        image: "string",
        title: "string",
        location: {
          id: "",
          country: "string",
          city: "string",
          district: "string",
          commune: "string",
          displayName: "string",
          longitude: "string",
          latitude: "string",
        },
        price: {
          "from": 0,
          "to": 0,
          "max": 0,
        },
        id: 0,
        quality: 0,
        reviews: {
          rate: [ 0 ],
          count: 0,
          fiveTaken: [ {
            id: "string",
            "name": "string",
            "avatarUrl": "string",
            "phone": "string",
          }]
        },
        follower: {
          count:0,
          fiveTaken: [ {
            id: "string",
            "name": "string",
            "avatarUrl": "string",
            "phone": "string",

          }],
        },
        isFollowed: true,
        userName: "string",
      },
    ];
//hooks
  const [ data, set ] = useState();
  useEffect(
    () => {
    }
    , [] );
//handler functions
  function handle(){
  }
//render
  return (
    <div className = "app-main-right cards-area">
      <div className = "app-main-right-header">
        <span>Latest Deals</span>
        <a href = "">See More</a>
      </div>
      { a.map( ( post: Post_MainLayout, index: number ) => {
        return (<CardInList post = { post } key = { post?.id || index } />);
      } )
      }
    </div>
  );
}
export default RightContent;
