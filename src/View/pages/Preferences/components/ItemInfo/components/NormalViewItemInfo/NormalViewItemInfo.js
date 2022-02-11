/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import styles from "./styles";
import { StyleSheet, css } from "aphrodite";
import closeImage from "../../../../../../common/img/close.svg";
import { Quantity } from "../../../../../../common/components";
import { formatMoney } from "../../../../../../../Utils/utilities";

const NormalViewItemInfo = (props) => {
  const {
    removeItem,
    itemNumber,
    price,
    addQuantity,
    removeQuantity,
    canBeRemoved,
  } = props;

  return (
    <div
      className={css(styles.itemInfoContainer)}
      style={{ padding: "8px 12px" }}
    >
      <div className={css(styles.expandedItemFlex)}>
        <div className={css(styles.smallFlex)}>
          <Quantity
            itemNumber={itemNumber}
            addQuantity={addQuantity}
            removeQuantity={removeQuantity}
          />{" "}
          <span className={css(styles.itemPrice)}>
            {formatMoney(price || 0) || "0.00€"}
          </span>
        </div>
        {canBeRemoved && (
          <img
            src={closeImage}
            style={{
              padding: "8px 4px",
            }}
            onClick={(e) => {
              e.stopPropagation();
              removeItem();
            }}
          />
        )}
      </div>
    </div>
  );
};

const memoizedNormalViewItemInfo = React.memo(NormalViewItemInfo);
export { memoizedNormalViewItemInfo as NormalViewItemInfo };
