import { withStyles } from "@material-ui/styles";
import React from "react";
import styles from "./styles";
import { StyleSheet, css } from "aphrodite";

const Wrapper = (props) => {
  const {
    header,
    children,
    hasMarginTop,
    style,
    hideShadowOnResponsive,
    useSpecialHeader,
  } = props;
  return (
    <div
      style={style}
      className={css(
        styles.container,
        hasMarginTop && styles.marginTop24,
        hideShadowOnResponsive && styles.hideBoxShadowUnder768,
        useSpecialHeader && styles.containerStyleForSpecialHeader
      )}
    >
      {header && (
        <span
          className={css(
            styles.textHeader,
            useSpecialHeader && styles.specialTextHeader
          )}
        >
          {header}
        </span>
      )}
      {children}
    </div>
  );
};

export default Wrapper;
