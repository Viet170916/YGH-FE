  import axios from "axios";
  import React, { JSX, useEffect, useState } from "react";
  import { Link } from "react-router-dom";
  import useScriptInject from "../../../Common/Hooks/ScriptHandlerHook";
  import Banner from "../../../Models/Banner";
  import "./Banner.scss";

interface IProps{
  banners: Banner[],
  getBannerApi: string;
}
function index( props: IProps ): JSX.Element{
  const [ banners, setBanners ] = useState<Banner[]>( props.banners );
  // useEffect( () => {
  //   axios.get( props.getBannerApi, {
  //     baseURL: "ll",
  //   } )
  //   .then( ( response ) => {
  //     setBanners( response.data );
  //   } ).catch( ( error ) => {
  //     // console.log( error );
  //     setBanners( props.banners );
  //   } );
  //   return () => {
  //     setBanners( [] );
  //   };
  // }, [] );
  useScriptInject( "/assets/Banner.js",  [banners]);

    return (
      <div className = "page-wrap">
        <div className = "page-header banner">
          <Link to = { "#" }>
            <main>
              {
                banners.map( ( banner: Banner, index: number ) => {
                  return (
                    <article id = { `hero-${ index + 1 }` } key = { banner.bannerUrls??index }>
                      <div className = "hero-info">
                        <h2>{ banner.firstPartTitle }</h2>
                        <h1>{ banner.secondPartTitle }</h1>
                        <h3>{ banner.location }</h3>
                      </div>
                      <div
                        className = { `hero-image hi-${ index + 1 }` }
                        style = { { backgroundImage: `url("${ banner.bannerUrls }")` } }
                      ></div>
                    </article>
                  );
                } )
              }
            </main>
          </Link>
        </div>
      </div>
    );
  }
  export default index;










