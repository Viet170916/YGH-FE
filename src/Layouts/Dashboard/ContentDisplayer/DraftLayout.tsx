import axios, { AxiosResponse } from "axios";
import React, { JSX, useEffect, useState } from "react";
import { PostStatus } from "../../../Common/Enum/PostStatus";
import CardInMainLayout from "../../../Components/App/Post/CardInMainLayout";
import Post_MainLayout from "../../../Models/Post_MainLayout";
import ManagePostFilterBar from "../DashboardFilter/ManagePostFilterBar";

interface IProps{
  openMenuClick: () => void;
}
function DraftLayout( props: IProps ): JSX.Element{
//config
  const [ posts, setPosts ] = useState<Post_MainLayout[]>( [] );
  const [ page, setPage ] = useState<number>( 1 );
//hooks
  useEffect(
    () => {
      axios.get( `api/post/yours/${ PostStatus.DRAFT }`, {
        params: {
          page: page,
        },
      } ).then( ( response: AxiosResponse<Post_MainLayout[]> ) => {
        if( response.data ) setPosts( [ ...posts, ...response.data ] );
      } ).catch( ( error ) => {
        console.log( error );
      } );
    }
    , [ page ] );
//handler functions
  function handle(){
  }
//render
  return (
    <div className = "right-area">
      <ManagePostFilterBar openMenuClick = { props.openMenuClick } />
      <div className = "page-right-content">
        <div className = "app-main-left cards-area">
          { posts?.map( ( post: Post_MainLayout ) =>
                          <CardInMainLayout
                            isDraft = { true }
                            post = { post }
                            key = { post.id }
                          /> ) }
        </div>
      </div>
    </div>
  );
}
export default DraftLayout;
