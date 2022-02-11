/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import styles from "./styles";
import { StyleSheet, css } from "aphrodite";
import closeImage from "../../../../common/img/close.svg";
import { ShortViewItemInfo, NormalViewItemInfo } from "./components";
import { Quantity } from "../";

const ItemInfo = (props) => {
  const {
    item,
    changeDishQuantity,
    canRemoveItems,
    getAllSelectedNodes,
    removeItem,
    index,
    instructions,
  } = props;

  return item?.isExpanded ? (
    <NormalViewItemInfo
      shortView={false}
      removeItem={() => removeItem(index)}
      index={index}
      itemNumber={item?.selectedQuantity || 0}
      addQuantity={() => changeDishQuantity(item, +1)}
      removeQuantity={() => changeDishQuantity(item, -1)}
      canBeRemoved={canRemoveItems}
      price={
        item?.totalPrice
          ? item?.totalPrice * (item?.selectedQuantity || 1)
          : "0.00€"
      }
    />
  ) : (
    <ShortViewItemInfo
      shortView={true}
      price={
        item?.totalPrice
          ? item?.totalPrice * (item?.selectedQuantity || 1)
          : "0.00€"
      }
      removeItem={() => removeItem(index)}
      index={index}
      getAllSelectedNodes={getAllSelectedNodes}
      item={item}
      itemNumber={item?.selectedQuantity || 0}
      instructions={instructions}
      addQuantity={() => changeDishQuantity(item, +1)}
      removeQuantity={() => changeDishQuantity(item, -1)}
      canBeRemoved={canRemoveItems}
    />
  );
};

const memoizedItemInfo = React.memo(ItemInfo);
export { memoizedItemInfo as ItemInfo };
