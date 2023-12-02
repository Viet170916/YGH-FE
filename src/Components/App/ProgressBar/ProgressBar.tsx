import { Button, Step, StepLabel, Stepper, Typography } from "@mui/material";
import React from "react";
import stages from "../../../Layouts/Dashboard/ContentDisplayer/CreatePost/Stages";
import "./SplitProgressBar.scss";

interface IProps {
  activeStage: number;
  goToPrev: () => void;
  onFinish?: () => void;
}
function ProgressBar(props: IProps): JSX.Element {
  const handleBackButtonClick = (): void => {
    props.goToPrev();
  };
  const handleNextButtonClick = (): void => {
    props?.onFinish();
  };
  return (
    <div className="progress-bar-container background-blur">
      <Stepper activeStep={props.activeStage} alternativeLabel>
        {stages.map((stageObject, index) => {
          const labelProps: {
            optional?: React.ReactNode;
            error?: boolean;
          } = {};
          if (props.activeStage === index) {
            labelProps.optional = (
              <Typography variant="caption" color="error">
              </Typography>
            );
            labelProps.error = true;
          }
          return (
            <Step key={index}>
              <StepLabel {...labelProps}>{stageObject.label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {props.activeStage === stages.length ? (
        <Typography sx={{ mt: 2, mb: 1 }}>
          All steps completed - you&apos;re finished
        </Typography>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            paddingBottom: "10px",
            paddingLeft: "40px",
            paddingRight: "40px",
            paddingTop: "20px",
          }}
        >
          <div>
            {(props.activeStage >= 1) && (
              <div
                // disabled = { props.activeStage === 0 }
                onClick={handleBackButtonClick}
                className="red-button button base-border-radius border-light-color"
                onKeyDown={()=>{}}
              >
                Previous
              </div>
            )}
          </div>
          <div style={{ flex: "1 1 auto" }} />
          {props.activeStage === stages.length - 1 ? (
            <Button
              onClick={props.onFinish}
              className="button"
              id="Next"
              // disabled = { !props.isStageSuccess( props.activeStage ) }
            >
              Finish
            </Button>
          ) : (
            <div
              onClick={handleNextButtonClick}
              className="red-button button base-border-radius border-light-color"
              id="Next"
              // disabled = { !props.isStageSuccess( props.activeStage ) }
              onKeyDown={()=>{}}
            >
              Next
            </div>
          )}
        </div>
      )}
    </div>
  );
}
export default ProgressBar;
