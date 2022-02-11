import { withStyles } from "@material-ui/styles";
import React from "react";
import styles from "./styles";
import { StyleSheet, css } from "aphrodite";
import { TextButton } from "../../../../common/components";
import { Button } from "../../../../common/components";

const PreferenceFooter = (props) => {
  const {
    addQuantity,
    addToBasket,
    totalQuantity,
  } = props;

  return (
    <div className={css(styles.quantityContainer)}>
      <TextButton onClick={addQuantity}>Add portion</TextButton>
      <Button onClick={addToBasket}>
        {`(${totalQuantity}) add`}
        <span className={css(styles.odaText)}>oda</span>
      </Button>
    </div>
  );
};

const memoizedPreferenceFooter = React.memo(PreferenceFooter);
export { memoizedPreferenceFooter as PreferenceFooter };
