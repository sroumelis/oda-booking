import { withStyles } from "@material-ui/styles";
import React from "react";
import styles from "./styles";
import { StyleSheet, css } from "aphrodite";
import { Checkbox as CustomCheckbox } from "@material-ui/core";
import oda from "../../../../common/theme/oda.js";
import { formatMoney } from "../../../../../Utils/utilities";
import Radio from "@material-ui/core/Radio";

const StyledRadioButton = withStyles({
  root: {
    padding: 8,
    color: oda.colors.primary + "!important",
    width: 36,
    height: 36,
    cursor: "pointer",
  },
})(Radio);

const RadioButton = (props) => {
  const { text, checked, onClick, name, price, hidePrice } = props;

  return (
    <div className={css(styles.horizontalFlex)}>
      <div className={css(styles.checkboxAndTextFlex)} onClick={onClick}>
        <StyledRadioButton checked={checked} name={name} />
        <span className={css(styles.checkboxText)}>{text}</span>
      </div>
      {!hidePrice && (
        <span>
          <span
            className={css(
              price && styles.checkboxText,
              !price && styles.checkboxTextGray,
              styles.price
            )}
          >
            {formatMoney(price || 0)}
          </span>
        </span>
      )}
    </div>
  );
};

export default RadioButton;
