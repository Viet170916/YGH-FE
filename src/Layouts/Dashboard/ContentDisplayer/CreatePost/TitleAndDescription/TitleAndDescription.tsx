import { Container } from "@mui/material";
import React from "react";
import RichTextEditor from "../../../../../Components/Common/Inputs/RichTextEditor";
import TextareaInput from "../../../../../Components/Common/Inputs/TextareaInput";
import { CreatePostProps } from "../index";

function TitleAndDescription( props: CreatePostProps ){
  const [ post, setPost ] = props.post;
  function handleFieldChange( event: React.ChangeEvent<HTMLInputElement> ){
    return setPost( { ...post, title: event.target.value } );
  }
  function handleDesFieldChange( value ){
    return setPost( { ...post, description: value } );
  }
  return (
    <Container maxWidth = { "md" }>
      <h1 className = "new-post-title">Let give your place a title and description</h1>
      <div>
        <TextareaInput labelText = "Title" maxLength = { 200 } rows = { 4 } name = "title" textValue = { post?.title } onChange = { handleFieldChange } />
        <br />
        <RichTextEditor value = { post?.description } onBlur = { ( value ) => handleDesFieldChange( value ) } />
      </div>
    </Container>
  );
}
export default TitleAndDescription;
