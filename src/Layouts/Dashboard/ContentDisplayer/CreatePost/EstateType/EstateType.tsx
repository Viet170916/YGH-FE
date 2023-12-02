import { Card, Container } from "@mui/material";
import React from "react";
import "../CreatePost.scss";
import { CreatePostProps } from "../index";
import estateList from "./EstateTypeList";

function EstateType( props: CreatePostProps ){
  const [ post, setPost ] = props.post;
  function handleFieldChange( value: number ){
    setPost( { ...post, estateTypesId: value } );
  }
  return (
    <Container maxWidth = { "md" }>
      <h1 className = "new-post-title">Which of these best describes your place?</h1>
      <div
        className = "estate-card-container" style = { {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '20px',
      } }
      >
        { estateList.map( ( estate ) => (
          <Card
            onClick = { ( event ) => handleFieldChange( estate.id ) }
            key = { estate.id }
            style = { {
              outline: post?.estateTypesId === estate.id ? '3px solid var(--buttons-color-secondary)' : '1px solid gray',
              userSelect: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            } }
          >
            <div className = { "big-logo" } style = { { fontSize: "80px", color: post?.estateTypesId === estate.id ? "var(--buttons-color-primary)" : "gray" } }>{ estate.logo }</div>
            <div style = { {  color: (post?.estateTypesId === estate.id ? "var(--buttons-color-primary)" : "gray") , margin: '10px 0', fontSize: '1.1rem' } }>{ estate.type }</div>
          </Card>
        ) ) }
      </div>
    </Container>
  );
}
export default EstateType;
