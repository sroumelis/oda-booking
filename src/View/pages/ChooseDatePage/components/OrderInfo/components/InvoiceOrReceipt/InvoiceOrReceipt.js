import { withStyles } from "@material-ui/styles";
import React from "react";
import styles from "./styles";
import { StyleSheet, css } from "aphrodite";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import oda from "../../../../../../common/theme/oda";
import { CheckBox } from "../../../CheckBox";
import { hideCardNumbers } from "../../../../../../../Utils/utilities";
import rightArrow from "../../img/right-arrow.svg";
import { RadioButton } from "../../../../../Preferences/components";
import { Container } from "../../../../../../common/components/";
import OrderInfoGenericSkeleton from "../OrderInfoGenericSkeleton/OrderInfoGenericSkeleton";

const InvoiceOrReceipt = (props) => {
  const { orderInfo, setOrderInfo, openInvoicesModal, isLoading } = props;
  return (
    <>
      {!isLoading ? (
        <div className={css(styles.section)}>
          <>
            <div
              className={css(styles.flex)}
              onClick={() => setOrderInfo({ ...orderInfo, isInvoice: false })}
            >
              <RadioButton hidePrice checked={!orderInfo?.isInvoice} radioButtonOnly />
              <span className={css(styles.fieldValue)}>Receipt</span>
            </div>
            <div
              className={css(styles.flex)}
              onClick={() => setOrderInfo({ ...orderInfo, isInvoice: true })}
            >
              <RadioButton hidePrice checked={orderInfo?.isInvoice} radioButtonOnly />
              <span className={css(styles.fieldValue)}>Invoice</span>
            </div>
          </>
        </div>
      ) : (
        <OrderInfoGenericSkeleton marginTopOnFirst />
      )}
    </>
  );
};

export default InvoiceOrReceipt;
