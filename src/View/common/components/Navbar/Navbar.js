import React from "react";
import styles from "./styles";
import { StyleSheet, css } from "aphrodite";
import BackArrowWhite from "../../img/back-arrow-white.svg";
import CloseModal from "../../../common/img/close-white.svg";

const Navbar = (props) => {
  const { onClose, title } = props;
  return (
    <div className={css(styles.navbarContainer)}>
      <img
        src={BackArrowWhite}
        alt=""
        className={css(styles.itemPrefLeftCloseButton)}
        onClick={() => {
          onClose();
        }}
      />
      <span className={css(styles.navbarTitle)}>{title || "Preferences"}</span>
      <img
        src={CloseModal}
        alt=""
        className={css(styles.itemPrefRightCloseButton)}
        onClick={() => {
          onClose();
        }}
      />
      {/* <img src={Settings} alt="" /> */}
    </div>
  );
};

const memoizedNavbar = React.memo(Navbar);
export { memoizedNavbar as Navbar };
