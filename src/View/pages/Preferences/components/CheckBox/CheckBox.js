import { withStyles } from "@material-ui/styles";
import React from "react";
import styles from "./styles";
import { StyleSheet, css } from "aphrodite";
import { Checkbox as CustomCheckbox } from "@material-ui/core";
import { formatMoney } from "../../../../../Utils/utilities";

const StyledCheckbox = withStyles({
  root: {
    color: "#253141",
    width: "36px",
    padding: 8,
    height: "36px",
  },
})(CustomCheckbox);

const CheckBox = (props) => {
  const { text, checked, onChange, name, price, hidePrice } = props;

  return (
    <div className={css(styles.horizontalFlex)}>
      <div className={css(styles.checkboxAndTextFlex)} onClick={onChange}>
        <StyledCheckbox name={name} checked={checked} />
        <span className={css(styles.checkboxText)}>{text}</span>
      </div>
      {!hidePrice && (
        <span
          className={css(
            price && styles.checkboxText,
            !price && styles.checkboxTextGray,
            styles.price
          )}
        >
          {formatMoney(price || 0)}
        </span>
      )}
    </div>
  );
};

const memoizedCheckBox = React.memo(CheckBox);
export { memoizedCheckBox as CheckBox };
