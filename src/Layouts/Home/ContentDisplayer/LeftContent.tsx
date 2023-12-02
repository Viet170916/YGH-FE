import axios, { AxiosResponse } from "axios";
import React, { JSX, useEffect, useState } from "react";
import CardInMainLayout from "../../../Components/App/Post/CardInMainLayout";
import { HomeFilter } from "../../../Models/HomeFilter";
import Post_MainLayout from "../../../Models/Post_MainLayout";

interface IProps {
  filter: HomeFilter;
}
function LeftContent(props: IProps): JSX.Element {
  const [posts, setPosts] = useState<Post_MainLayout[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const abortController = new AbortController();
    setLoading(true);
    fetchData();
    return () => {
      abortController.abort();
    };
  }, [props.filter]);
  function fetchData() {
    const abortController = new AbortController();
    if (loading) {
      abortController.abort();
      setLoading(false);
    }
    setLoading(true);
    axios
      .post(
        "api/post/public",
        {
          page: page,
          // filter: props.filter,
        },
        { signal: abortController.signal }
      )
      .then((response) => {
        changePostsState(response);
        setLoading(false);
      })
      .catch((error) => {
        handleError(error);
        setLoading(false);
      });
  }
  function changePostsState(
    axiosResponse: AxiosResponse<Post_MainLayout[]>
  ): void {
    setPosts(axiosResponse.data);
  }
  function handleError(error: any) {
    console.log(error);
  }
  return (
    <div className="app-main-left cards-area">
      {posts?.map((post, index) => {
        return (
          <CardInMainLayout
            key={post?.id || index}
            post={post}
            redirectToPostLayout={() => {}}
          />
        );
      })}
    </div>
  );
}
export default LeftContent;
