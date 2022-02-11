import { withStyles } from "@material-ui/styles";
import React from "react";
import styles from "./styles";
import { StyleSheet, css } from "aphrodite";
import { RadioButton, ItemWithQuantity, CheckBox } from "../../../";
import { Title } from "../../../";
import { Group as Group2 } from "../";
import { useSelector } from "react-redux";
import { getSelectedTab } from "../../../../../../../State/modules/selectedTab/selectors";

const Group = (props) => {
  const {
    item,
    selectedProducts,
    toggleProduct,
    isSingle,
    shouldBeRendered,
    changeProductQuantity,
    parentId,
  } = props;
  const selectedTab = useSelector(getSelectedTab);
  const isPlainItem = !item?.subGroups?.length && !item?.modifiers?.length;
  const findIfItemIsChecked = () => {
    if (isSingle) {
      return selectedProducts?.[parentId]?.id === item?.id ? true : false;
    } else {
      return selectedProducts?.[item?.id] ? true : false;
    }
  };
  return (
    <div>
      {!isPlainItem && (
        <Title title={item?.name + (item?.mandatory ? " *" : "")} />
      )}
      {item?.modifiers?.map((obj, i) => {
        let shouldRender = shouldBeRendered(obj);
        if (shouldRender) {
          return (
            <div key={i} className={css(styles.horizontalPadding)}>
              <Group2
                item={obj}
                toggleProduct={toggleProduct}
                selectedProducts={selectedProducts}
                isSingle={isSingle || obj?.selectionBehavior === "Single"}
                parentId={parentId || obj?.id ? parentId || obj?.id : false}
                shouldBeRendered={shouldBeRendered}
                changeProductQuantity={changeProductQuantity}
              />
            </div>
          );
        }
      })}
      {item?.subGroups?.map((obj, i) => {
        let shouldRender = shouldBeRendered(obj);
        if (shouldRender) {
          return (
            <div key={i} className={css(styles.horizontalPadding)}>
              <Group2
                item={obj}
                toggleProduct={toggleProduct}
                selectedProducts={selectedProducts}
                isSingle={isSingle || obj?.selectionBehavior === "Single"}
                parentId={parentId || obj?.id ? parentId || obj?.id : false}
                shouldBeRendered={shouldBeRendered}
                changeProductQuantity={changeProductQuantity}
              />
            </div>
          );
        }
      })}
      {isPlainItem && !item?.hasQuantity && (
        // item?.parentSelectionBehavior !== "Single" && (
        <CheckBox
          text={item?.name}
          checked={item?.isSelected}
          onChange={() => {
            toggleProduct(item);
          }}
          name={item?.name}
          price={item?.price}
        />
      )}
      {/* in case this obj is an item WITH a quantity variable */}
      {isPlainItem && item?.hasQuantity && (
        <ItemWithQuantity
          itemNumber={item?.selectedQuantity || 0}
          item={item}
          checked={item?.isSelected}
          onCheckboxClick={() => toggleProduct(item)}
          increaseQuantity={() => {
            changeProductQuantity(item, +1);
          }}
          text={item?.name}
          price={item?.price}
          decreaseQuantity={() => changeProductQuantity(item, -1)}
          maxQuantity={item?.maxQuantity || 5}
        />
      )}
    </div>
  );
};

export default Group;
