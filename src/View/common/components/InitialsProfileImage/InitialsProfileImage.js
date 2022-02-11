import React from "react";
import { StyleSheet, css } from "aphrodite";
import styles from "./styles";

const InitialsProfileImage = (props) => {
  const { name, width, height } = props;
  const parseName = () => {
    if(!name) {
      return '';
    }
    if (name.length <= 3) {
      return name;
    } else {
      const splitName = name.split(" ");
      if (splitName.length === 1) {
        return splitName[0].substring(0, 3);
      } else {
        return (splitName[0][0] || "") + (splitName[1][0] || "");
      }
    }
  };
  return <div className={css(styles.profileImage)}>{parseName()}</div>;
};

export default InitialsProfileImage;
