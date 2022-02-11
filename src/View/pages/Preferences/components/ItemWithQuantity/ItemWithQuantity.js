import { withStyles } from "@material-ui/styles";
import React from "react";
import styles from "./styles";
import { StyleSheet, css } from "aphrodite";
import { Checkbox as CustomCheckbox } from "@material-ui/core";
import { Quantity } from "../../../../common/components";
import { formatMoney } from "../../../../../Utils/utilities";
const StyledCheckbox = withStyles({
  root: {
    padding: 8,
    color: "#253141",
    width: "36px",
    height: "36px",
  },
})(CustomCheckbox);

const ItemWithQuantity = (props) => {
  const {
    text,
    onCheckboxClick,
    itemNumber,
    increaseQuantity,
    decreaseQuantity,
    name,
    price,
    checked,
    maxQuantity,
  } = props;

  return (
    <div className={css(styles.horizontalFlex)}>
      <div
        className={css(
          styles.checkboxAndTextFlex,
          !checked && styles.cursorPointer
        )}
      >
        <StyledCheckbox
          name={name}
          checked={checked}
          onChange={onCheckboxClick}
        />
        {text && <span className={css(styles.checkboxText)}>{text}</span>}
        {checked && itemNumber !== 0 && (
          <div className={css(styles.quantityPadding)}>
            <Quantity
              itemNumber={itemNumber}
              addQuantity={maxQuantity > itemNumber && increaseQuantity}
              removeQuantity={decreaseQuantity}
            />
          </div>
        )}
      </div>
      <span
        className={css(
          price && styles.checkboxText,
          !price && styles.checkboxTextGray,
          styles.price
        )}
      >
        {formatMoney((checked ? itemNumber || 1 : 1) * price || 0)}
      </span>
    </div>
  );
};

const memoizedItemWithQuantity = React.memo(ItemWithQuantity);
export { memoizedItemWithQuantity as ItemWithQuantity };
