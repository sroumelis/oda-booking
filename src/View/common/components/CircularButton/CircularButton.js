import { Button as MuiButton } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import React from "react";
import styled from "styled-components";
import oda from "../../../common/theme/oda.js";

const CustomButton = withStyles({
  root: {
    fontSize: oda.fonts.normal,
    fontFamily: oda.fontFamilies.labels,
    background: "transparent",
    width: 118,
    height: 118,
    borderRadius: "50%",
    fontWeight: 'bold',
    color: oda.colors.primary,
    border: "14px solid " + oda.colors.primary,
  },
})(MuiButton);

const CircularButton = (props) => {
  const { onClick, children, className, style, type } = props;
  return (
    <CustomButton
      onClick={onClick}
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

export default CircularButton;
