import { withStyles } from "@material-ui/styles";
import React from "react";
import styles from "./styles";
import { StyleSheet, css } from "aphrodite";
import left from "../../img/chevron-left-black.svg";
import right from "../../img/chevron-right-black.svg";

const Quantity = (props) => {
  const { itemNumber, addQuantity, removeQuantity, outerOnClick } = props;

  return (
    <div className={css(styles.plusMinusFlex)} onClick={outerOnClick}>
      <img
        src={left}
        className={css(styles.changePreferenceNumber)}
        alt=""
        onClick={removeQuantity}
      />
      <div className={css(styles.itemQuantityContainer)}>
        <span className={css(styles.itemQuantity)}>{itemNumber || 0}</span>
      </div>
      <img
        src={right}
        className={css(styles.changePreferenceNumber)}
        alt=""
        onClick={addQuantity}
      />
    </div>
  );
};

const memoizedQuantity = React.memo(Quantity);
export { memoizedQuantity as Quantity };
