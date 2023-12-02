import axios, { AxiosResponse } from "axios";
import React, { JSX, useEffect, useState } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import { PostStatusFunc } from "../../../Common/Enum/PostStatus";
import CardInMainLayout from "../../../Components/App/Post/CardInMainLayout";
import Post_MainLayout from "../../../Models/Post_MainLayout";
import ManagePostFilterBar from "../DashboardFilter/ManagePostFilterBar";
import "./ContentDisplayer.scss";

interface IProps{
  openMenuClick: () => void;
}
function ManagePost( props: IProps ): JSX.Element{
  // const [ filter, setFilter ] = useState<HomeFilter>();
  return (
    <div className = "right-area">
      <ManagePostFilterBar openMenuClick = { props.openMenuClick } />
      <div className = "page-right-content">
        <Routes>
          <Route
            path = { "/:status" } element = {
            <ListPersonalPosts />
          }
          />
          {/*<Route path={"*"} element={<Navigate to={"/error"}/>}/>*/ }
        </Routes>
      </div>
    </div>
  );
}
export default ManagePost;
function ListPersonalPosts(): JSX.Element{
  const [ page, setPage ] = useState<number>( 1 );
  const { status } = useParams();
  const [ message, setMessage ] = useState<string>();
  const [ posts, setPosts ] = useState<Post_MainLayout[]>( [] );
  useEffect( () => {
    axios.get( `api/post/yours/${ PostStatusFunc.understandUrl( status ) }`, {
      params: {
        page: page,
      },
    } ).then( ( response: AxiosResponse<Post_MainLayout[]> ) => {
      if( response.data ){
        setPosts( response.data );
      }
      ;
    } ).catch( error => {
      setPosts( null );
      setMessage( error.data?.message );
    } );
  }, [ status ] );
  useEffect( () => {
    axios.get( `api/post/yours/${ PostStatusFunc.understandUrl( status ) }`, {
      params: {
        page: page,
      },
    } ).then( ( response: AxiosResponse<Post_MainLayout[]> ) => {
      if( response.data ){
        setPosts( [ ...posts, ...response.data ] );
      }
      ;
    } ).catch( error => {
      setPosts( null );
      setMessage( error.data?.message );
    } );
  }, [ page ] );
  if( posts )
    return (
      <div className = "app-main-left cards-area">
        { posts?.map( ( post: Post_MainLayout ) => {
          return (<CardInMainLayout
            key = { post.id } post = { post }
            redirectToPostLayout = { () => {} }
          />);
        } ) }
      </div>
    );
  else return <div> has no post</div>;
}
