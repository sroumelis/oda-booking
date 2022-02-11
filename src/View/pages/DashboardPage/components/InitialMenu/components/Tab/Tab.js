import { withStyles } from "@material-ui/styles";
import React from "react";
import styles from "./styles";
import { StyleSheet, css } from "aphrodite";

const Tab = (props) => {
  const { onClick, src, leftText, rightText, bottomText } = props;

  return (
    <div className={css(styles.initialTabContainer)} onClick={onClick}>
      <img src={src} alt="" className={css(styles.initialTabImage)} />
      {/* <div>
        <span className={css(styles.fancyRedText)}>{leftText}</span>
        <span className={css(styles.fancyYellowText)}>{rightText}</span>
      </div> */}
      <span className={css(styles.subtitleText)}>{bottomText}</span>
    </div>
  );
};

export default Tab;
