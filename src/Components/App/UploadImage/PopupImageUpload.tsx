  import { Card, TextField } from '@mui/material';
  import Button from '@mui/material/Button';
  import Dialog from '@mui/material/Dialog';
  import DialogActions from '@mui/material/DialogActions';
  import DialogContent from '@mui/material/DialogContent';
  import DialogTitle from '@mui/material/DialogTitle';
  import * as React from 'react';
  import { MdAddPhotoAlternate } from 'react-icons/md';
  import { Image } from '../../../Layouts/Dashboard/ContentDisplayer/CreatePost/PostImages/PostImages';
  import AfterUploadImage from './AfterUploadImage';
  import UploadImage from './UploadImage';

  interface IProps{
    postImages: Image[];
    setPostImages: Function;
  }
  export default function PopupImageUpload( props: IProps ){
    const [ open, setOpen ] = React.useState( false );
    const handleClickOpen = () => {
      setOpen( true );
    };
    const handleClose = ( event: React.SyntheticEvent<unknown>, reason?: string ) => {
      if( reason !== 'backdropClick' ){
        setOpen( false );
      }
    };
    function handleImageChange( newImage: Image ){
      props.setPostImages( 'images', props.postImages.map( image => image.id === newImage.id ? newImage : image ) );
    }
    return (
      <div>
        <Button onClick = { handleClickOpen } variant = "outlined" style = { { width: '100%' } }><MdAddPhotoAlternate />Image</Button>
        <Dialog disableEscapeKeyDown open = { open } onClose = { handleClose }>
          <DialogTitle>Add the images</DialogTitle>
          <DialogContent>
            <div
              className = "card-container" style = { {
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '15px',
            } }
            >
              { props.postImages?.map( ( postImage, index ) => {
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
                      { !postImage.data ?
                        <UploadImage key = { index } setPostImages = { handleImageChange } display = { 'apartment' } /> :
                        <AfterUploadImage key = { index } postImage = { postImage } setPostImage = { handleImageChange }  setPostImages={()=>{}}/>
                      }
                    </Card>
                    <TextField
                      label = "Caption" variant = "filled" value = { postImage.caption }
                      onChange = { ( event ) => handleImageChange( { ...postImage, caption: event.currentTarget.value } ) }
                      style = { { width: '100%', marginTop: '20px', position: 'absolute', bottom: 0, visibility: postImage.data === "" ? 'hidden' : 'visible' } }
                    />
                  </div>
                );
              } ) }
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick = { handleClose }>Cancel</Button>
            <Button onClick = { handleClose }>Ok</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }





















  