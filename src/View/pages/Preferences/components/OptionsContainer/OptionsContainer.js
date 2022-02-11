import { withStyles } from "@material-ui/styles";
import React from "react";
import styles from "./styles";
import { StyleSheet, css } from "aphrodite";
import { Checkbox as CustomCheckbox } from "@material-ui/core";
import { RadioButton } from "../";
import { Title } from "../";
import { Group } from "./components";
import { useSelector } from "react-redux";
import { getSelectedTab } from "../../../../../State/modules/selectedTab/selectors";
const OptionsContainer = (props) => {
  const { items, changeProductQuantity, toggleProduct, shouldBeRendered } =
    props;
  const selectedTab = useSelector(getSelectedTab);

  return (
    <>
      {items.map((group, i) => {
        const shouldRender =
          shouldBeRendered(group?.modifiers, 1) ||
          shouldBeRendered(group?.subGroups, 1);
        if (shouldRender) {
          return (
            <Group
              item={group}
              key={i}
              toggleProduct={toggleProduct}
              shouldBeRendered={shouldBeRendered}
              changeProductQuantity={changeProductQuantity}
            />
          );
        }
      })}
    </>
  );
};

export default OptionsContainer;
