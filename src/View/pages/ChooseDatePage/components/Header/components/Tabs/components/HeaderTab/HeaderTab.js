import { withStyles } from "@material-ui/styles";
import React from "react";
import styles from "./styles";
import { StyleSheet, css } from "aphrodite";

const HeaderTab = (props) => {
  const {
    upperText,
    redText,
    yellowText,
    image,
    changeSelectedTab,
    isSelected,
    selectedImage,
  } = props;
  return (
    <div
      className={css(
        styles.textAlignCenter,
        styles.tabClass,
        isSelected && styles.selectedTab
      )}
      onClick={changeSelectedTab}
    >
      <div
        style={{ position: "relative", zIndex: 3 }}
        className={css(styles.tabBottomRow)}
      >
        <img
          src={isSelected ? selectedImage : image}
          className={css(styles.tabImageSmall)}
          alt=""
        />
        <span
          style={{ position: "relative", zIndex: 3 }}
          className={css(
            styles.subtitleText,
            isSelected && styles.selectedText
          )}
        >
          {upperText}
        </span>
      </div>
    </div>
  );
};

export default HeaderTab;
