import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v1 as uuidv1 } from "uuid";
import Dialog from "@material-ui/core/Dialog";
import { StyleSheet, css } from "aphrodite";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { Navbar } from "../../common/components";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { navigate, useLocation, Router } from "@reach/router";

import { safeRound } from "../../../Utils/utilities";
import { withStyles } from "@material-ui/styles";

import { Button } from "../../common/components";
import {
  EditUserInfo,
  Addresses,
  Invoices,
  PaymentMethods,
} from "./components";
import styles from "./styles";

const StyledDialog = withStyles({
  paperScrollPaper: {
    height: "100%",
    width: "100%",
    maxHeight: 900,
    // backgroundColor: "red",
  },
})(Dialog);

const UserSettings = (props) => {
  const { setOrderInfo, orderInfo } = props;
  const theme = useTheme();
  const fullScreen = useMediaQuery("(max-width:768px)"); // previously in the parenthesis it was (theme.breakpoints.down('sm'))
  const location = useLocation();
  const {
    displaySettings,
    addresses,
    paymentMethods,
    userSettings,
    invoices,
    isComingFromSidebar,
  } = location.state;

  const handleClose = () => {
    window.history.back();
  };
  if (!displaySettings) {
    return null;
  }

  const updatePreferedPaymentMethod = (paymentMethod) => {
    localStorage.setItem("prefered-payment-method", paymentMethod);
    window.history.back();
  };
  const updatePreferedInvoice = (invoice) => {
    localStorage.setItem("prefered-invoice", invoice?.vat);
    window.history.back();
  };
  const updatePreferedAddress = (address) => {
    localStorage.setItem("prefered-address", JSON.stringify(address));
    window.history.back();
  };

  const selectCard = (card) => {
    setOrderInfo({
      ...orderInfo,
      paymentMethod: card,
    });
    window.history.back();
  };
  const selectAddress = (address) => {
    setOrderInfo({
      ...orderInfo,
      deliveryAddress: address,
      addressComments: address.comment,
    });
    window.history.back();
  };
  const selectInvoice = (invoice) => {
    setOrderInfo({
      ...orderInfo,
      selectedInvoice: invoice,
    });
    window.history.back();
  };

  const returnTitle = () => {
    if (addresses) {
      return "Delivery Point";
    } else if (paymentMethods) {
      return "Payment Methods";
    } else if (invoices) {
      return "Invoices";
    } else {
      return "Profile Settings";
    }
  };

  return (
    <StyledDialog
      fullScreen={fullScreen}
      open
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <div className={css(styles.pageContainer)}>
        <Navbar onClose={handleClose} title={returnTitle()} />
        {userSettings && (
          <div className={css(styles.container)}>
            <EditUserInfo
              onCancel={handleClose}
              isComingFromSidebar={isComingFromSidebar}
            />
          </div>
        )}
        {addresses && (
          <Addresses
            onClick={
              isComingFromSidebar ? updatePreferedAddress : selectAddress
            }
            isComingFromSidebar={isComingFromSidebar}
            orderInfo={orderInfo}
          />
        )}
        {invoices && (
          <Invoices
            onClick={
              isComingFromSidebar ? updatePreferedInvoice : selectInvoice
            }
            isComingFromSidebar={isComingFromSidebar}
            orderInfo={orderInfo}
          />
        )}
        {paymentMethods && (
          <PaymentMethods
            onClick={
              isComingFromSidebar ? updatePreferedPaymentMethod : selectCard
            }
            isComingFromSidebar={isComingFromSidebar}
            orderInfo={orderInfo}
          />
        )}
      </div>
    </StyledDialog>
  );
};

const memoizedUserSettings = React.memo(UserSettings);
export { memoizedUserSettings as UserSettings };
