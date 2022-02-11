import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import React from "react";
import styled from "styled-components";
import refreshImage from "../../img/refresh.svg";
import { StyleSheet, css } from "aphrodite";
import styles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo } from "../../../../State/modules/user/userInfo/actions";
import { setLoader } from "../../../../State/modules/globalLoader/actions";

const ReloadComponent = (props) => {
  const { refreshFunction, text } = props;
  const dispatch = useDispatch();

  const refreshData = async () => {
    try {
      dispatch(setLoader(true));
      const data = await dispatch(fetchUserInfo(true));
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setLoader(false));
    }
  };

  const _refreshFunction = () => {
    if (refreshFunction) {
      refreshFunction();
    } else {
      refreshData();
    }
  };

  return (
    <div className={css(styles.disabledText)} onClick={_refreshFunction}>
      {text || "Failed to fetch data. Please press the button bellow to reload"}
      <img src={refreshImage} className={css(styles.refreshImage)} alt="" />
    </div>
  );
};

export default ReloadComponent;
