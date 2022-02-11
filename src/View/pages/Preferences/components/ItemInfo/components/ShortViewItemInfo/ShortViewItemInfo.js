/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import styles from "./styles";
import { StyleSheet, css } from "aphrodite";
import closeImage from "../../../../../../common/img/close.svg";
import { Quantity } from "../../../../../../common/components";
import { formatMoney } from "../../../../../../../Utils/utilities";

const ShortViewItemInfo = (props) => {
  const {
    shortView,
    price,
    instructions,
    removeItem,
    index,
    getAllSelectedNodes,
    item,
    itemNumber,
    addQuantity,
    removeQuantity,
    canBeRemoved,
  } = props;

  const [selectedItemsText, setSelectedItemsText] = React.useState("");

  React.useEffect(() => {
    if (item) {
      const selectedNodes = getAllSelectedNodes();
      let str = "";
      selectedNodes.forEach((it) => {
        str += it?.name + ", ";
      });
      instructions.forEach((it) => {
        if (it.isSelected) {
          str += it?.name + ", ";
        }
      });
      if (item?.comment) {
        str += str !== "" ? ", " : "";
        str += (item?.comment || "").substring(0, 15);
      }
      setSelectedItemsText(str);
    }
  }, [item]);

  return (
    <div className={css(styles.container)}>
      <div className={css(styles.paddingContainer)}>
        <div className={css(styles.horizontalHeaderFlex)}>
          <div className={css(styles.smallFlex)}>
            <Quantity
              outerOnClick={(e) => e.stopPropagation()} // stop header from expanding
              itemNumber={itemNumber}
              addQuantity={(e) => {
                e.stopPropagation();
                addQuantity();
              }}
              removeQuantity={(e) => {
                e.stopPropagation();
                removeQuantity();
              }}
            />
            <span className={css(styles.selectedItemIngredients)}>
              {selectedItemsText || 'No additional ingredients'}
            </span>
          </div>
          <div className={css(styles.smallFlex)}>
            <span className={css(styles.itemPrice)}>
              {formatMoney(price || 0) || "0.00€"}
            </span>
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
      </div>
    </div>
  );
};

const memoizedShortViewItemInfo = React.memo(ShortViewItemInfo);
export { memoizedShortViewItemInfo as ShortViewItemInfo };
