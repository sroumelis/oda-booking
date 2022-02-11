import { Button as MuiButton } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import React from "react";
import { StyleSheet, css } from "aphrodite";
import { useSelector } from "react-redux";
import styled from "styled-components";
import oda from "../../../common/theme/oda.js";
import styles from "./styles";
import { getIsLoaderVisible } from "../../../../State/modules/globalLoader/selectors";

const Loader = (props) => {
  const isVisible = useSelector(getIsLoaderVisible);
  return isVisible ? (
    <div className={css(styles.container)}>
      <div className={css(styles.loader)} />
    </div>
  ) : (
    <> </>
  );
};

export default Loader;
