import { TextField as MuiTextField } from "@material-ui/core/";
import { withStyles } from "@material-ui/styles";
import React from "react";
import styled from "styled-components";
import oda from "../../../common/theme/oda.js";
import styles from "./styles";
import { StyleSheet, css } from "aphrodite";
import showPasswordImage from "./img/show-password.svg";
import hidePasswordImage from "./img/hide-password.svg";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";

const CustomTextField = withStyles({
  root: {
    backgroundColor: oda.colors.surface,
    color: oda.colors.primary,
    borderRadius: "4px",
    outlineWidth: "0px",
    fontSize: oda.fonts.large,
    lineHeight: oda.lineHeights.large,
    "& input": {
      padding: "10px 32px 11px 16px",
      fontFamily: oda.fontFamilies.normal,
    },
    "& textarea": {
      fontFamily: oda.fontFamilies.normal,
    },
    "& label[data-shrink=true]": {
      fontFamily: oda.fontFamilies.normal,
      transform: "translate(17px, -6px) scale(0.75)",
    },
    "& fieldset:focus": {
      border: "1px solid " + oda.colors.primary,
      borderRadius: "4px",
    },
  },
})(MuiTextField);

const CustomIconButton = withStyles({
  root: {
    position: "absolute",
    right: 2,
    top: "50%",
    transform: "translateY(-50%)",
    height: 36,
    width: 36,
  },
})(IconButton);

const TextField = (props) => {
  const {
    name,
    error,
    label,
    setFieldValue,
    type,
    outerClassName,
    outerOnClick,
    onClick,
    withoutFormik,
    predictions,
  } = props;

  const [showPassword, setShowPassword] = React.useState(false);
  const [showPredictions, setShowPredictions] = React.useState(false);
  const returnInputType = () => {
    if (type === "password") {
      return showPassword ? "" : "password";
    } else {
      return type;
    }
  };
  return (
    <div className={outerClassName} onClick={outerOnClick}>
      <div style={{ position: "relative" }}>
        <CustomTextField
          style={{
            width: "100%",
          }}
          InputProps={{ disableUnderline: true }}
          variant="outlined"
          size="small"
          {...props}
          onClick={(e) => {
            setShowPredictions(true);
            if (onClick) {
              onClick(e);
            }
          }}
          type={returnInputType()}
          name={name}
          label={label}
        />
        {type === "password" && (
          <CustomIconButton
            aria-label="toggle password visibility"
            onClick={() => setShowPassword(!showPassword)}
          >
            <img
              src={showPassword ? hidePasswordImage : showPasswordImage}
              alt="show password icon"
            />
          </CustomIconButton>
        )}
        {predictions?.length !== 0 && showPredictions && (
          <>
            <div
              onClick={() => setShowPredictions(false)}
              className={css(styles.invisiblePredictionsBg)}
            />
            <div className={css(styles.predictionsContainer)}>
              {predictions?.map((prediction) => (
                <div
                  className={css(styles.prediction)}
                  onClick={() => {
                    if (setFieldValue) {
                      // alert(name + prediction)
                      props.setFieldValue(name, prediction);
                    } else if (withoutFormik && props.onChange) {
                      props.onChange(prediction);
                    }
                    setShowPredictions(false);
                  }}
                >
                  {prediction}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      {error && <span className={css(styles.errorText)}>{error}</span>}
    </div>
  );
};

export default TextField;
