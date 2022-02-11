import { withStyles } from "@material-ui/styles";
import React from "react";
import styles from "./styles";
import { StyleSheet, css } from "aphrodite";
import noImage from "../../../../../../common/img/no-image-available.jpg";
import { navigate, useLocation, Router } from "@reach/router";
const Item = (props) => {
  const { item, parsedPrice } = props;
  const location = useLocation();
  // return <div style={{ display: "block" }}>{item?.name || "aaa"}</div>;openPreferences={() =>
  const openPreferences = () => {
    navigate(location.pathname, {
      state: {
        item: {...item},
      },
    });
  };
  return (
    <div
      className={css(
        styles.itemContainerFlex,
        // !parsedPrice && styles.reducedOpacity
      )}
      // onClick={parsedPrice && openPreferences}
      onClick={ openPreferences}
    >
      <div className={css(styles.itemInfoFlex)}>
        <span className={css(styles.itemTitle)}>{item?.name}</span>
        <span className={css(styles.itemDescription)}>
          {item?.description || "There is no description yet"}
        </span>
        <span className={css(styles.itemPrice)}>
          {/* {parsedPrice || "Το αντικείμενο δεν είναι διαθέσιμο"} */}
          {parsedPrice || "0,00€"}
        </span>
      </div>
      <img
        className={css(styles.itemImage)}
        src={item?.pictureUri || noImage}
        alt=""
      />
    </div>
  );
};

export default Item;
