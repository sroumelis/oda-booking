/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import styles from "./styles";
import { StyleSheet, css } from "aphrodite";
import { useDispatch, useSelector } from "react-redux";
import noImageAvailable from "../../../../common/img/no-image-available.jpg";
import alergies from "./img/alergies.png";
import { formatMoney } from "../../../../../Utils/utilities";
import { selectedTabSelectors } from "../../../../../State/modules/selectedTab/";
import kcal from "./img/kcal.png";
import { Quantity } from "../";

const ItemDescription = (props) => {
  const { name, description, pictureUri } = props;
  return (
    <div className={css(styles.itemInfoContainer)}>
      <div className={css(styles.positionRelative)}>
        <img
          className={css(styles.itemHeaderImage)}
          src={pictureUri || noImageAvailable}
          alt=""
        />
        <div className={css(styles.imageOverlay)} />
      </div>
      <div className={css(styles.itemInfo)}>
        <span className={css(styles.itemName, styles.marginBottom4)}>
          {name || "Product name is missing"}
        </span>
        <span className={css(styles.descriptionText)}>
          {description || "There is no description yet"}
        </span>
        {/* <div className={css(styles.infoFlex)}>
          <span className={css(styles.itemName)}>
            {formatMoney(item?.[0]?.totalPrice) || "0.00"}
          </span>
        </div> */}
      </div>
    </div>
  );
};

const memoizedItemDescription = React.memo(ItemDescription);
export { memoizedItemDescription as ItemDescription };
