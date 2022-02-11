import { withStyles } from "@material-ui/styles";
import React from "react";
import styles from "./styles";
import { StyleSheet, css } from "aphrodite";
import { Checkbox as CustomCheckbox } from "@material-ui/core";
import { RadioButton } from "../";

const Title = (props) => {
  const { title } = props;
  return <span className={css(styles.categoryTitle)}>{title || "-"}</span>;
};

export default Title;
