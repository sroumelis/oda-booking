import { withStyles } from "@material-ui/styles";
import React from "react";
import styles from "./styles";
import { StyleSheet, css } from "aphrodite";

const Container = (props) => {
  const {
    header,
    children,
    hasMarginTop,
    style,
    headerImage,
    hideShadowOnResponsive,
    hideNavbar,
    fullWidth,
    removePadding,
    minWidth220,
  } = props;
  return (
    <div
      style={style}
      className={css(
        styles.container,
        hasMarginTop && styles.marginTop24,
        hideShadowOnResponsive && styles.hideBoxShadowUnder768,
        removePadding && styles.removePadding,
        fullWidth && styles.fullWidth,
        minWidth220 && styles.minWidth220,
        hideNavbar && styles.normalPaddingTop
      )}
    >
      {!hideNavbar && header && (
        <div className={css(styles.headerDiv)}>
          {headerImage && (
            <img className={css(styles.headerImage)} alt="" src={headerImage} />
          )}
          <span className={css(styles.textHeader)}>{header}</span>
        </div>
      )}
      {children}
    </div>
  );
};

export default Container;
