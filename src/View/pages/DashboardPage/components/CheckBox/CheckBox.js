import { withStyles } from "@material-ui/styles";
import React from "react";
import styles from "./styles";
import { StyleSheet, css } from "aphrodite";
import { Checkbox as CustomCheckbox } from "@material-ui/core";

const StyledCheckbox = withStyles({
  root: {
    color: "#253141",
    width: "32px",
    padding: 6,
    height: "32px",
  },
})(CustomCheckbox);

const SmallStyledCheckbox = withStyles({
  root: {
    color: "#253141",
    width: "28px",
    padding: 6,
    height: "28px",
  },
})(CustomCheckbox);

const CheckBox = (props) => {
  const { text, checked, onChange, smallCheckbox, name } = props;

  return (
    <div className={css(styles.horizontalFlex)}>
      <div className={css(styles.checkboxAndTextFlex)} onClick={onChange}>
        {!smallCheckbox && <StyledCheckbox name={name} checked={checked} />}
        {smallCheckbox && <SmallStyledCheckbox name={name} checked={checked} />}
        <span className={css(styles.checkboxText)}>{text}</span>
      </div>
    </div>
  );
};

export default CheckBox;
