import { forwardRef } from "react";

const SlidePreview = forwardRef( ( props: { styles: any, click: any, id: string, number: number, description: string, index : number }, ref ) => {
  return (
    <div
      className = "overlay-slide-preview"
      style = { props.styles }
      onClick = { ()=>{ props.click(props.index) } }
      ref = { ref }
      id = { props.id }
    >
      <h4 className = "overlay-preview-title">
        <span className = "overlay-preview-title-number">{ props.number }</span>
        <span className = "overlay-preview-title-text">{ props.description }</span>
      </h4>
    </div>
  );
} );
export default SlidePreview;
