import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './RichTextEditor.scss';

interface IProps{
  value: string;
  setValue?: ( newValue: string ) => void;
  style?: React.CSSProperties;
  onBlur?: ( value: string ) => void;
  ref?: React.LegacyRef<ReactQuill> | undefined
}
function RichTextEditor( props: IProps ){
  const [ value, setValue ] = useState<string>( props.value );
  const modules = {
    toolbar: [
      [ { 'header': [ 1, 2, 3, false ] } ],
      [ { 'font': [] } ],
      [ { 'color': [] }, { 'background': [] } ],
      [ 'bold', 'italic', 'underline', 'strike' ],
      [ 'link' ],
      [ { 'list': 'ordered' }, { 'list': 'bullet' } ],
      [ { 'align': [] } ],
      [ 'clean' ],
    ],
  };
  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'indent', 'align',
    'color', 'background', 'font',
    'link', 'image',
  ];
  return (
    <ReactQuill ref={props.ref} theme = "snow" value = { value } onBlur = { () => {props.onBlur?.( value );} } onChange = { setValue } modules = { modules } formats = { formats } style = { props.style } />
  );
}
export default RichTextEditor;
