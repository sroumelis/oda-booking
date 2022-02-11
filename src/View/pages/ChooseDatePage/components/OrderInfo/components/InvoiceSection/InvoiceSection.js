import { withStyles } from "@material-ui/styles";
import React from "react";
import styles from "./styles";
import { StyleSheet, css } from "aphrodite";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import oda from "../../../../../../common/theme/oda";
import { CheckBox } from "../../../CheckBox";
import { hideCardNumbers } from "../../../../../../../Utils/utilities";
import rightArrow from "../../img/right-arrow.svg";

const InvoiceSection = (props) => {
  const { orderInfo, openPaymentsModal } = props;
  return (
    <div className={css(styles.section)} onClick={openPaymentsModal}>
      <div className={css(styles.flex)}>
        <span
          className={css(
            orderInfo?.selectedInvoice?.vat && styles.fieldValue,
            !orderInfo?.selectedInvoice?.vat && styles.disabledText
          )}
        >
          {orderInfo?.selectedInvoice?.vat
            ? "VAT: " + orderInfo?.selectedInvoice?.vat
            : "Click here to select an invoice"}
        </span>
        <img src={rightArrow} alt="" />
      </div>
    </div>
  );
};

export default InvoiceSection;
