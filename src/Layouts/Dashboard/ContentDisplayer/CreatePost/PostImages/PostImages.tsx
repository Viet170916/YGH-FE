import { Card, Container, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import AfterUploadImage from "../../../../../Components/App/UploadImage/AfterUploadImage";
import UploadImage from "../../../../../Components/App/UploadImage/UploadImage";
import { AccommodationDTO } from "../CreatePost";
import "../CreatePost.scss";

export interface Image{
  caption?: string;
  data: File | null;
  url?: string;
}
interface IProps{
  post: [ AccommodationDTO, ( value: AccommodationDTO ) => void ];
  display: 'accommodation' | 'apartment';
}
function PostImages( props: IProps ){
  const [ post, setPost ] = props.post;
  const [ images, setImages ] = useState<Image[]>( [] );
  useEffect( () => {
    setImages( post.accommodationPublications?.map( ( img ) => ({ id: img.mediaId, url: img?.["url"] }) ) );
  }, [] );
  useEffect( () => {
    setPost( { ...post, images: images } );
  }, [ images ] );
  return (
    <Container maxWidth = { "md" }>
      { props.display === 'accommodation' && <h1 className = "new-post-title">An image is more powerful than thousand words</h1> }
      <div
        className = "card-container" style = { {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '15px',
      } }
      >
        { images?.map( ( postImage, index ) => {
          return (
            <div
              className = "post-image" key = { index } style = { {
              gridColumn: index === 0 ? '1/3' : '',
              position: 'relative',
            } }
            >
              <Card style = { { overflow: 'auto', justifyContent: 'center' } } key = { index }>
                { index === 0 && <div
                  style = { {
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    background: 'black',
                    color: 'white',
                    borderRadius: '10px',
                    padding: '8px',
                  } }
                >Cover Image</div> }
                {
                  <AfterUploadImage className = { "accommodation-image" } key = { postImage.data?.name } postImage = { postImage } setPostImages = { setImages } />
                }
              </Card>
              <TextField
                label = "Caption" variant = "filled" value = { postImage.caption }
                // onChange = { ( event ) => setPostImage( { ...postImage, caption: event.currentTarget.value } ) }
                style = { { width: '100%', marginTop: '20px', position: 'absolute', bottom: 0, visibility: postImage.data === "" ? 'hidden' : 'visible' } }
              />
            </div>
          );
        } ) }
      </div>
      <UploadImage postImages = { images } setPostImages = { setImages } display = { props.display } /> :
    </Container>
  );
}
export default PostImages;
