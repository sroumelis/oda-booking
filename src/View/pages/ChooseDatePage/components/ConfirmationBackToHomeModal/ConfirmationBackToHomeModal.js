import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { css } from "aphrodite";
import styles from "./styles";
import { useLocation, navigate } from "@reach/router";
import Checkbox from "@material-ui/core/Checkbox";
import Dialog from "@material-ui/core/Dialog";
import { withStyles } from "@material-ui/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { Button } from "../../../../common/components";
import { isMobile } from "react-device-detect";

import { parseWeekday } from "../../../../../Utils/utilities";

import oda from "../../../../common/theme/oda";
const StyledDialog = withStyles({
  paperScrollPaper: {
    height: isMobile ? "25%" : "22%",
    width: "70%",
    maxWidth: 768,
    maxHeight: 900,
    backgroundColor: oda.colors.surface,
    borderRadius: "25px",
    border: `4px solid ${oda.colors.primary}`,
    // backgroundColor: "red",
  },
})(Dialog);
const ConfirmationBackToHomeModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { showBackToHomeModal } = location.state;
  const theme = useTheme();
  const fullScreen = useMediaQuery("(max-width:768px)"); // previously in the parenthesis it was (theme.breakpoints.down('sm'))

  const handleClose = () => {
    console.log("close");
    // window.history.back();

    navigate(location.pathname, {
      state: {
        showBackToHomeModal: false,
      },
      replace: true,
    });
  };

  const handleGoBack = () => {
    if (onClose) {
      onClose();
    }
    navigate("/catalogue", {
      state: {
        showBackToHomeModal: false,
      },
      replace: true,
    });
  };

  const _handleCheck = (e) => {
    if (e.target.checked) {
      localStorage.dontShowOnHoldConfirmation = "1";
    } else {
      localStorage.dontShowOnHoldConfirmation = "0";
    }
  };

  if (!showBackToHomeModal) {
    return null;
  }
  return (
    <StyledDialog
      // fullScreen={fullScreen}
      open
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      {/* <Navbar onClose={handleClose} title="Store Info" /> */}
      <div className={css(styles.pageContainer)}>
        <div className={css(styles.title)}>Your tables will be released</div>
        <div className={css(styles.wrapper)}>
          <div style={{ textAlign: "center" }}>Are you sure?</div>
        </div>

        <div
          style={{
            width: "100%",
            position: "relative",
            top: 16,
            display: "flex",
            gap: 20,
          }}
        >
          <Button
            style={{ backgroundColor: "#e0e0e0", color: "black", width: "30%" }}
            onClick={handleClose}
          >
            No
          </Button>
          <Button style={{ width: "100%" }} onClick={handleGoBack}>
            Yes
          </Button>
        </div>
      </div>
    </StyledDialog>
  );
};

const memoizedConfirmationBackToHomeModal = React.memo(
  ConfirmationBackToHomeModal
);
export { memoizedConfirmationBackToHomeModal as ConfirmationBackToHomeModal };
