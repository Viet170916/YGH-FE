  import DeleteIcon from '@mui/icons-material/Delete';
  import MoreVertIcon from '@mui/icons-material/MoreVert';
  import { Button, MenuItem, Popover } from "@mui/material";
  import classNames from "classnames";
  import React, { useState } from "react";
  import { Image } from "../../../Layouts/Dashboard/ContentDisplayer/CreatePost/PostImages/PostImages";
  import ImageFitSize from "../Image/ImageFitSize";

  interface IProps{
    postImage: Image;
    className?: string;
    setPostImages: ( newImages?: ( prev ) => Image[] ) => void;
  }
  function AfterUploadImage( props: IProps ){
    const [ anchorEl, setAnchorEl ] = useState<HTMLButtonElement | null>( null );
    const handleClick = ( event: React.MouseEvent<HTMLButtonElement> ) => {
      setAnchorEl( event.currentTarget );
    };
    const handleClose = () => {
      setAnchorEl( null );
    };
    const open = Boolean( anchorEl );
    const id = open ? 'image-popover' : undefined;
    return (
      <div className = "image-container">
        {/*<div className={"image"}>*/ }
        <ImageFitSize
          component = "img"
          className = { classNames( props.className ) }
          src = { props.postImage.data ? URL.createObjectURL( (props.postImage.data as File) ) : props.postImage?.["url"] }
          alt = { props.postImage.caption }
        />
        {/*</div>*/ }
        <div className = "popover-container">
          <Button
            variant = "text" onClick = { handleClick } sx = { {
            color: "gray",
          } }
          >
            <MoreVertIcon />
          </Button>
          <Popover
            id = { id }
            open = { open }
            anchorEl = { anchorEl }
            onClose = { handleClose }
            anchorOrigin = { {
              vertical: 'bottom',
              horizontal: 'left',
            } }
            transformOrigin = { {
              vertical: 'top',
              horizontal: 'center',
            } }
            // key={index}
          >
            {/* <MenuItem onClick={editAccomImage}>Edit Image</MenuItem> */ }
            <MenuItem
              onClick = { () => {
                props.setPostImages?.( prev => { return prev.filter( ( image ) => {return (image as Image).data?.name !== props.postImage.data?.name || (image as Image)?.["url"] !== props.postImage?.["url"];} ); } );
                handleClose();
              } }
            >
              <DeleteIcon />
              Delete Image
            </MenuItem>
          </Popover>
        </div>
      </div>
    );
  }
  export default AfterUploadImage;
















  
