import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import React from "react";
import styled from "styled-components";
import oda from "../../../common/theme/oda.js";

const CustomButton = withStyles({
  root: {
    fontSize: oda.fonts.normal,
    height: 32,
    fontFamily: oda.fontFamilies.labels,
    textDecoration: 'underline',
    padding: "7px 8px 6px 8px",
    textTransform: "none",
  },
  textPrimary: { color: oda.colors.primary },
})(Button);

const TextButton = (props) => {
  const { onClick, children, className, style } = props;
  return (
    <CustomButton
      onClick={onClick}
      className={className}
      style={style}
      variant="text"
      color="primary"
    >
      {children}
    </CustomButton>
  );
};

export default TextButton;
