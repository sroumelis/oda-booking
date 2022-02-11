import { withStyles } from "@material-ui/styles";
import React from "react";
import styles from "./styles";
import { StyleSheet, css } from "aphrodite";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import oda from "../../../../common/theme/oda";
const CustomStepper = withStyles({
  root: {
    backgroundColor: "transparent",
    padding: "16px",
    maxWidth: "1024px",
    margin: "auto",
    marginBottom: 8,
    marginTop: 12,
  },
})(Stepper);

const CustomStepLabel = withStyles({
  completed: {
    color: oda.colors.disabled +'!important',
  },
  iconContainer: {
    "& svg.MuiStepIcon-completed": {
      // color: oda.colors.primary,
      color: oda.colors.success,
      border: 0,
    },
    "& svg.MuiStepIcon-active": {
      color: oda.colors.primary,
      border: 0,
    },
    "& svg.MuiStepIcon-active text": {
      fill: oda.colors.secondary,
      fontWeight: 'bold',
      border: 0,
      fontSize: oda.fonts.small,
      lineHeight: oda.lineHeights.small,
    },
    "& svg": {
      color: "transparent",
      border: "1px solid " + oda.colors.primary,
      borderRadius: "50%",
    },
  },
})(StepLabel);

const StepsHeader = (props) => {
  const { activeStep, setActiveStep } = props;

  const getSteps = () => {
    return [
      "Account Setup",
      "Personal Info",
      // "Payment Method"
    ];
  };
  const steps = getSteps();

  return (
    <>
      <CustomStepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <CustomStepLabel>{label}</CustomStepLabel>
          </Step>
        ))}
      </CustomStepper>
    </>
  );
};

export default StepsHeader;
