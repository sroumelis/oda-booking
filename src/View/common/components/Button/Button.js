import { Button as MuiButton } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import React from "react";
import styled from "styled-components";
import oda from "../../../common/theme/oda.js";

const CustomButton = withStyles({
  root: {
    fontSize: oda.fonts.normal,
    height: 32,
    padding: "7px 16px 6px 16px",
    backgroundColor: oda.colors.primary,
    color: oda.colors.surface,
    fontFamily: oda.fontFamilies.labels,
  },
})(MuiButton);

const Button = (props) => {
  const { onClick, children, className, style, type, isDisabled } = props;
  return (
    <CustomButton
      onClick={!isDisabled ? onClick : () => {}}
      type={type}
      className={className}
      style={style}
      variant="contained"
      color="primary"
    >
      {children}
    </CustomButton>
  );
};

export default Button;
