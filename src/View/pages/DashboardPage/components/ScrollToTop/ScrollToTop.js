/* eslint-disable jsx-a11y/alt-text */
import { withStyles } from "@material-ui/styles";
import React from "react";
import styles from "./styles";
import { StyleSheet, css } from "aphrodite";
import { navigate, useLocation, Router } from "@reach/router";
import rightArrowBlack from "../../../../common/img/chevron-right-black.svg";

const ScrollToTop = (props) => {
  const [scrollPos, setScrollPos] = React.useState(0);

  React.useEffect(() => {
    window.addEventListener("scroll", function (event) {
      if (document?.documentElement) {
        setScrollPos(document.documentElement?.scrollTop || 0);
      }
    });
  }, []);

  return (
    <>
      {scrollPos > 150 && (
        <img
          src={rightArrowBlack}
          className={css(styles.el)}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        />
      )}
    </>
  );
};

export default ScrollToTop;
